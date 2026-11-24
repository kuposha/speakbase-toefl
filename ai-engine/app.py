import json
import os
import secrets
import tempfile
from pathlib import Path
from typing import Literal

import requests
from fastapi import FastAPI, File, Form, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from starlette.concurrency import run_in_threadpool

from openpronounce import assess, load_audio
from scoring import repeat_practice_estimate

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434").rstrip("/")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen3:4b")
AI_TOKEN = os.getenv("SPEAKBASE_AI_TOKEN", "")
CORS_ORIGINS = [value.strip() for value in os.getenv(
    "SPEAKBASE_CORS_ORIGINS",
    "https://kuposha.github.io,http://localhost:4173,http://127.0.0.1:4173",
).split(",") if value.strip()]

app = FastAPI(title="Speakbase Local AI Engine", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "X-Speakbase-Token"],
)


class WritingPayload(BaseModel):
    task_type: Literal["write_email", "academic_discussion"]
    prompt: str = Field(min_length=8, max_length=6000)
    response: str = Field(min_length=5, max_length=12000)


class SpeakingTextPayload(BaseModel):
    task_type: Literal["interview", "listen_repeat"]
    prompt: str = Field(min_length=3, max_length=4000)
    transcript: str = Field(min_length=2, max_length=8000)
    expected_text: str = Field(default="", max_length=2000)


def require_token(token: str | None):
    if not AI_TOKEN:
        raise HTTPException(503, "The local AI token has not been configured.")
    if not token or not secrets.compare_digest(token, AI_TOKEN):
        raise HTTPException(401, "Invalid local AI token.")


def rubric_for(task_type: str):
    if task_type == "write_email":
        return (
            "Use the current TOEFL iBT 2026 Write an Email task guide. Evaluate whether the response "
            "fulfils the communicative purpose and all requested points; whether details are developed; "
            "whether information is organised and social conventions/register are appropriate; and the "
            "range and accuracy of grammar and vocabulary."
        ), ["task_fulfilment", "elaboration", "organization_register", "grammar", "vocabulary"]
    if task_type == "academic_discussion":
        return (
            "Use the current TOEFL iBT 2026 Write for an Academic Discussion task guide. Evaluate relevance "
            "to the discussion, clarity of the contribution, elaboration with reasons/examples/details, "
            "syntactic variety, precise word choice, and lexical/grammatical accuracy."
        ), ["relevance", "elaboration", "coherence", "grammar", "vocabulary"]
    if task_type == "interview_text":
        return (
            "Assess only the transcript of a TOEFL iBT 2026 Take an Interview response. Evaluate whether "
            "it answers the question, develops ideas coherently, and uses an effective range and accuracy "
            "of grammar and vocabulary. Do not score pronunciation, rhythm, intonation or speaking pace "
            "because no audio is available."
        ), ["task_response", "elaboration", "coherence", "grammar_vocabulary"]
    return (
        "Use the current TOEFL iBT 2026 Take an Interview task guide. Evaluate whether the response answers "
        "the question and develops it coherently; conversational pace and pauses; intelligibility, "
        "pronunciation, rhythm and intonation; and range and accuracy of grammar and vocabulary. "
        "Acoustic metrics are supplied separately; do not infer pronunciation from the transcript alone."
    ), ["task_response", "elaboration", "fluency_pace", "pronunciation_intelligibility", "grammar_vocabulary"]


def response_schema(criteria: list[str]):
    return {
        "type": "object",
        "properties": {
            "practice_estimate": {"type": "integer", "minimum": 0, "maximum": 5},
            "criteria": {
                "type": "object",
                "properties": {name: {"type": "integer", "minimum": 0, "maximum": 5} for name in criteria},
                "required": criteria,
                "additionalProperties": False,
            },
            "strengths": {"type": "array", "items": {"type": "string"}, "maxItems": 4},
            "issues": {
                "type": "array",
                "maxItems": 6,
                "items": {
                    "type": "object",
                    "properties": {
                        "quote": {"type": "string"},
                        "issue": {"type": "string"},
                        "suggestion": {"type": "string"},
                    },
                    "required": ["quote", "issue", "suggestion"],
                    "additionalProperties": False,
                },
            },
            "next_steps": {"type": "array", "items": {"type": "string"}, "maxItems": 4},
        },
        "required": ["practice_estimate", "criteria", "strengths", "issues", "next_steps"],
        "additionalProperties": False,
    }


def call_ollama(task_type: str, prompt: str, response: str, acoustic_metrics=None):
    rubric, criteria = rubric_for(task_type)
    system = (
        "You are a careful English-language assessor for a TOEFL iBT 2026 preparation app. "
        "Give a conservative practice estimate from 0 to 5 for this task only. "
        "Use the task-specific rubric below. Do not convert it to a TOEFL section band (1-6) or an overall score. "
        "This is an independent practice estimate, never an official ETS score. "
        "Do not reward length by itself. Do not invent errors. Every issue quote must be copied exactly from the response. "
        "If evidence is insufficient, say so in strengths or next_steps. Keep feedback concise and actionable.\n\n"
        + rubric
    )
    user = (
        "TASK PROMPT:\n" + prompt + "\n\nRESPONSE / TRANSCRIPT:\n" + response
        + "\n\nACOUSTIC METRICS (may be absent):\n"
        + json.dumps(acoustic_metrics or {}, ensure_ascii=False)
        + "\n\nReturn only the required structured assessment."
    )
    payload = {
        "model": OLLAMA_MODEL,
        "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
        "format": response_schema(criteria),
        "stream": False,
        "think": False,
        "keep_alive": 0,
        "options": {"temperature": 0, "num_predict": 900},
    }
    try:
        result = requests.post(f"{OLLAMA_URL}/api/chat", json=payload, timeout=240)
        result.raise_for_status()
        content = result.json()["message"]["content"]
        parsed = json.loads(content)
    except requests.RequestException as exc:
        raise HTTPException(503, f"Local language model is unavailable: {exc}") from exc
    except (KeyError, ValueError, TypeError) as exc:
        raise HTTPException(502, "The local language model returned an invalid assessment.") from exc

    return {
        **parsed,
        "task_type": task_type,
        "model": OLLAMA_MODEL,
        "score_scale": "practice task estimate 0-5",
        "disclaimer": "AI practice estimate only; not an official ETS score or TOEFL section-band prediction.",
    }


def compact_pronunciation(result: dict):
    scores = result.get("scores") or {}
    differences = result.get("differences") or {}
    errors = differences.get("errors", []) if isinstance(differences, dict) else differences
    safe_scores = {}
    for key in ("accuracy", "fluency", "prosodic"):
        value = scores.get(key)
        if isinstance(value, (int, float)):
            safe_scores[key] = float(value)
    safe_errors = [str(value)[:400] for value in errors[:10]] if isinstance(errors, list) else []
    reasons = result.get("reasons") or []
    return {
        "reliable": bool(result.get("reliable", True)),
        "reasons": [str(value)[:300] for value in reasons[:5]] if isinstance(reasons, list) else [str(reasons)[:300]],
        "scores": safe_scores,
        "transcript": str(result.get("transcribe") or result.get("transcript") or ""),
        "word_errors": safe_errors,
    }


@app.get("/health")
def health():
    try:
        tags = requests.get(f"{OLLAMA_URL}/api/tags", timeout=2).json().get("models", [])
        ollama_available = True
        model_ready = any(model.get("name", "").split(":")[0] == OLLAMA_MODEL.split(":")[0] for model in tags)
    except Exception:
        ollama_available, model_ready = False, False
    return {
        "ok": True,
        "token_configured": bool(AI_TOKEN),
        "ollama_available": ollama_available,
        "language_model_ready": model_ready,
        "language_model": OLLAMA_MODEL,
        "pronunciation_engine": "OpenPronounce local engine; model files download on first assessment",
    }


@app.post("/api/writing")
def evaluate_writing(payload: WritingPayload, x_speakbase_token: str | None = Header(default=None, alias="X-Speakbase-Token")):
    require_token(x_speakbase_token)
    return call_ollama(payload.task_type, payload.prompt, payload.response)


@app.post("/api/speaking-text")
def evaluate_speaking_text(payload: SpeakingTextPayload, x_speakbase_token: str | None = Header(default=None, alias="X-Speakbase-Token")):
    require_token(x_speakbase_token)
    if payload.task_type == "listen_repeat" and payload.expected_text:
        estimate = repeat_practice_estimate(payload.expected_text, payload.transcript, None)
        return {
            **estimate,
            "task_type": payload.task_type,
            "pronunciation_assessed": False,
            "disclaimer": "Text-only repetition estimate; pronunciation and intelligibility were not assessed.",
        }
    return {
        **call_ollama("interview_text", payload.prompt, payload.transcript),
        "pronunciation_assessed": False,
        "delivery_note": "No audio was available, so pronunciation, rhythm and speaking pace were not assessed.",
    }


@app.post("/api/speaking")
async def evaluate_speaking(
    file: UploadFile = File(...),
    task_type: Literal["listen_repeat", "interview"] = Form(...),
    prompt: str = Form(default=""),
    expected_text: str = Form(default=""),
    x_speakbase_token: str | None = Header(default=None, alias="X-Speakbase-Token"),
):
    require_token(x_speakbase_token)
    raw = await file.read()
    if not raw:
        raise HTTPException(422, "The recording is empty.")
    if len(raw) > 20 * 1024 * 1024:
        raise HTTPException(413, "The recording is larger than 20 MB.")
    suffix = Path(file.filename or "recording.webm").suffix or ".webm"
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
            temp.write(raw)
            temp_path = temp.name
        audio = await run_in_threadpool(load_audio, temp_path)
        if task_type == "listen_repeat":
            result = await run_in_threadpool(assess, audio, expected_text)
        else:
            result = await run_in_threadpool(assess, audio)
        pronunciation = compact_pronunciation(result)
    except Exception as exc:
        raise HTTPException(422, f"Could not assess this recording: {exc}") from exc
    finally:
        if temp_path:
            try:
                os.unlink(temp_path)
            except OSError:
                pass

    if not pronunciation["reliable"]:
        return {
            "task_type": task_type,
            "reliable": False,
            "practice_estimate": None,
            "pronunciation": pronunciation,
            "disclaimer": "No score was produced because the recording was not reliable enough to assess.",
        }

    transcript = pronunciation["transcript"]
    if task_type == "listen_repeat":
        estimate = repeat_practice_estimate(expected_text, transcript, pronunciation["scores"].get("accuracy"))
        return {
            **estimate,
            "task_type": task_type,
            "reliable": True,
            "pronunciation": pronunciation,
            "transcript": transcript,
            "disclaimer": "Heuristic practice estimate from exactness and local pronunciation analysis; not an official ETS score.",
        }

    if not transcript.strip():
        raise HTTPException(422, "The recording could not be transcribed clearly enough for content feedback.")
    feedback = call_ollama("interview", prompt, transcript, pronunciation["scores"])
    return {
        **feedback,
        "reliable": True,
        "transcript": transcript,
        "pronunciation": pronunciation,
        "pronunciation_assessed": True,
    }

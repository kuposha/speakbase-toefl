# Speakbase Local AI Engine

This optional service provides free, local feedback for open Writing and Speaking responses.

## Models and privacy

- Writing and interview-language feedback: Qwen3 4B through Ollama.
- Pronunciation, fluency and prosody: OpenPronounce, running locally.
- No paid API, API key or subscription is used. After the one-time model downloads, inference runs on this computer. Recordings and responses are sent only to this local service for assessment; they are not sent to a commercial AI API.
- The engine is separate from the static GitHub Pages app. Its local API is protected by a random token.
- OpenPronounce 1.1.0 is AGPL-3.0; this separate engine directory is intended to remain source-available. Qwen3 model weights use their own published model licence.

## Requirements

- Docker Desktop for Windows, started before use.
- About 5–6 GB of initial model and container downloads.
- A computer with at least 16 GB RAM is recommended. CPU inference works; a compatible GPU may improve speed.

## First setup

From this directory, run this in PowerShell:

~~~powershell
.\setup-ai.ps1
~~~

The script starts Docker Compose, creates a local random access token in .env, and downloads qwen3:4b. OpenPronounce downloads its pronunciation models on the first Speaking assessment.

Check:

~~~text
http://127.0.0.1:8765/health
~~~

The Speakbase interface needs the API address and token. The token is stored in the browser on that device only; it is not synced to Supabase.

## Using from a phone

The service binds to localhost and is not exposed directly to the network. To use it from the GitHub Pages site on a phone, a secure HTTPS tunnel is required. Do not forward ports 8765 or 11434 directly to the public internet. A free temporary Cloudflare Tunnel can be used while the computer is on; its HTTPS address must be entered in Speakbase AI settings.

## Scoring

- Writing Email and Academic Discussion: an AI practice estimate from 0 to 5 with task fulfilment, elaboration, organisation/register, grammar and vocabulary feedback.
- Take an Interview: an AI practice estimate from 0 to 5 based on the transcript and acoustic delivery metrics, with pronunciation, fluency and prosody shown separately.
- Listen and Repeat: a heuristic 0-to-5 practice estimate based on word-level exactness and local pronunciation analysis.
- These are practice estimates, not official ETS scores. The service does not calculate TOEFL section bands (1–6) or predict an official result.

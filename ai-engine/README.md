# Speakbase Local AI Engine

This optional service provides free, local feedback for open Writing and Speaking responses. It does not call a paid AI API.

## Models and privacy

- Writing and Interview content/language feedback: Qwen3 4B Instruct through Ollama (Apache 2.0 model licence).
- Pronunciation, transcription and prosody: OpenPronounce 1.1.0, running locally on CPU (AGPL-3.0).
- OpenPronounce uses two speech models of about 1.2 GB each. Qwen3 4B Instruct is about 2.5 GB. Expect roughly 5 to 6 GB of first-time downloads, including containers and dependencies.
- The service binds to localhost. Recordings are analysed on this computer and are not sent to a commercial AI API. `OPENPRONOUNCE_TTS=piper` prevents the default Google speech-synthesis request for a reference voice.
- The API is protected by a random local token. The token is stored in the browser on that device only and is not synced to Supabase.

## Licence note

The AI service in this folder is licensed under AGPL-3.0 because it uses OpenPronounce. The no-paid route requires keeping the corresponding Speakbase source publicly available under the applicable AGPL terms. If the repository must remain private, do not run this engine; replace OpenPronounce with a permissively licensed alternative with less-established pronunciation scoring. Qwen3 model weights are Apache 2.0.

## Accuracy limits

- Writing and Interview language estimates come from a general local language model, not an ETS-trained or ETS-calibrated model. The 0 to 5 value is a practice estimate, not an official score or a TOEFL section-band prediction.
- OpenPronounce evaluates sounds, fluency and prosody. Its published human-rater validation is based on Mandarin-accented English read sentences; it is not calibrated specifically for Russian-accented learners or spontaneous TOEFL interviews. Treat interview pronunciation indicators as experimental hints.
- The model may confuse accent-related differences with microphone noise or recognition errors. Always listen to the recording before treating a flagged word as a mistake.
- A recording marked `reliable: false` receives no score. The interface shows the reason and any useful word-level feedback instead.

## Requirements

- Docker Desktop for Windows, started before use.
- About 5 to 6 GB of one-time downloads.
- At least 16 GB RAM recommended. CPU inference works; a compatible GPU may improve speed.

## First setup

From this directory, run in PowerShell:

~~~powershell
.\setup-ai.ps1
~~~

The script starts Docker Compose, creates a private random access token in `.env`, and downloads `qwen3:4b-instruct`. OpenPronounce downloads its two speech models on the first pronunciation assessment.

Check:

~~~text
http://127.0.0.1:8765/health
~~~

## Using from a phone

The service is not exposed directly to the local network. To use it from the GitHub Pages site on a phone, a secure HTTPS tunnel is required. Start the optional tunnel with `docker compose --profile phone up -d cloudflared`, then read its URL with `docker compose logs -f cloudflared`. A free temporary Cloudflare Quick Tunnel provides a `trycloudflare.com` URL without an account or domain. The URL changes when the tunnel restarts; anyone who knows it can reach the token-protected API, so keep the API token secret. The audio travels through Cloudflare's relay to your computer, but is not sent to an AI provider or stored by Speakbase in Cloudflare. Stop it with `docker compose stop cloudflared`. Do not forward ports 8765 or 11434 directly to the public internet.

## Scoring

- Write an Email and Academic Discussion: 0 to 5 practice estimate with task fulfilment, elaboration, organisation/register, grammar and vocabulary feedback.
- Take an Interview: 0 to 5 content/language practice estimate. OpenPronounce acoustic indicators are displayed separately and are experimental for spontaneous speech.
- Listen and Repeat: heuristic 0 to 5 estimate combining exact word match and local pronunciation accuracy. It is not an ETS score.
- The service does not calculate TOEFL section bands (1 to 6) or predict an official result.

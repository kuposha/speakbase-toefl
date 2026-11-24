$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  throw "Docker Desktop is not installed."
}

docker info *> $null
if ($LASTEXITCODE -ne 0) {
  $desktop = Join-Path $env:ProgramFiles "Docker\Docker\Docker Desktop.exe"
  if (-not (Test-Path $desktop)) { throw "Start Docker Desktop, then run this script again." }
  Start-Process $desktop
  Write-Host "Waiting for Docker Desktop..."
  $ready = $false
  for ($i = 0; $i -lt 60; $i++) {
    Start-Sleep -Seconds 5
    docker info *> $null
    if ($LASTEXITCODE -eq 0) { $ready = $true; break }
  }
  if (-not $ready) { throw "Docker Desktop did not become ready in time." }
}

if (-not (Test-Path ".env")) {
  $token = [guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N")
  @(
    "SPEAKBASE_AI_TOKEN=$token"
    "SPEAKBASE_CORS_ORIGINS=https://kuposha.github.io,http://localhost:4173,http://127.0.0.1:4173"
  ) | Set-Content -Encoding ascii ".env"
  Write-Host "Created a private local AI token in ai-engine/.env"
}

docker compose up -d --build
if ($LASTEXITCODE -ne 0) { throw "Could not start the local AI containers." }

$ollamaReady = $false
for ($i = 0; $i -lt 30; $i++) {
  Start-Sleep -Seconds 2
  docker compose exec -T ollama ollama list *> $null
  if ($LASTEXITCODE -eq 0) { $ollamaReady = $true; break }
}
if (-not $ollamaReady) { throw "Ollama did not become ready." }

docker compose exec ollama ollama pull qwen3:4b-instruct
if ($LASTEXITCODE -ne 0) { throw "Could not download qwen3:4b-instruct." }

Write-Host "AI engine is starting at http://127.0.0.1:8765"
Write-Host "The pronunciation model downloads on its first Speaking assessment."

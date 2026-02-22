# Sunya installer for Windows
# Run: irm https://raw.githubusercontent.com/13x54n/sunya-landing-page/main/package/bin/install.ps1 | iex

$ErrorActionPreference = "Stop"
$Version = if ($env:SUNYA_VERSION) { $env:SUNYA_VERSION } else { "main" }
$Repo = if ($env:SUNYA_REPO) { $env:SUNYA_REPO } else { "https://raw.githubusercontent.com/13x54n/sunya-landing-page" }
$BaseUrl = "$Repo/$Version/package/bin"
$BinDir = if ($env:SUNYA_BIN_DIR) { $env:SUNYA_BIN_DIR } else { "$env:LOCALAPPDATA\sunya\bin" }
$InstallDir = "$env:LOCALAPPDATA\sunya"

Write-Host "Sunya - Static analysis for EVM smart contracts"
Write-Host ""

# Check Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js is required. Install from https://nodejs.org"
  exit 1
}

# Create directories
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
New-Item -ItemType Directory -Force -Path $BinDir | Out-Null

# Download sunya.js
Write-Host "Downloading sunya..."
$sunyaJs = "$InstallDir\sunya.js"
Invoke-WebRequest -Uri "$BaseUrl/sunya.js" -OutFile $sunyaJs -UseBasicParsing

# Create sunya.cmd launcher
$sunyaCmd = "$BinDir\sunya.cmd"
@"
@echo off
node "$sunyaJs" %*
"@ | Set-Content -Path $sunyaCmd -Encoding ASCII

Write-Host "Installed: $sunyaCmd"
Write-Host ""

# Add to PATH if needed
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$BinDir*") {
  Write-Host "Adding to PATH..."
  [Environment]::SetEnvironmentVariable("Path", "$userPath;$BinDir", "User")
  Write-Host "Added $BinDir to your PATH. You may need to restart your terminal."
  Write-Host ""
}

# Install Slither
Write-Host "Setting up Slither..."
if (!(Get-Command python -ErrorAction SilentlyContinue) -and !(Get-Command python3 -ErrorAction SilentlyContinue)) {
  Write-Host "Python is required for Slither. Install from https://python.org"
  Write-Host "Ensure 'Add Python to PATH' is checked during installation."
  exit 1
}

$pip = if (Get-Command pip -ErrorAction SilentlyContinue) { "pip" } else { "pip3" }
try {
  & $pip install slither-analyzer 2>$null
} catch {
  Write-Host "Could not install Slither automatically. Run: pip install slither-analyzer"
}

Write-Host ""
Write-Host "Done! Run: sunya scan"
Write-Host ""
Write-Host "Usage:"
Write-Host "  cd your-contracts-project"
Write-Host "  sunya scan"
Write-Host "  sunya install"
Write-Host "  sunya uninstall"
Write-Host ""

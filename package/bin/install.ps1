# Sunya installer for Windows
# Run: irm https://raw.githubusercontent.com/13x54n/sunya-v1/main/package/bin/install.ps1 | iex

$ErrorActionPreference = "Stop"
$Version = if ($env:SUNYA_VERSION) { $env:SUNYA_VERSION } else { "main" }
$Repo = if ($env:SUNYA_REPO) { $env:SUNYA_REPO } else { "https://raw.githubusercontent.com/13x54n/sunya-v1" }
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

$slitherInstalled = $false
foreach ($cmd in @("python", "python3")) {
  if (Get-Command $cmd -ErrorAction SilentlyContinue) {
    try {
      & $cmd -m pip install --quiet slither-analyzer 2>$null
      if ($LASTEXITCODE -eq 0) { $slitherInstalled = $true; break }
    } catch {}
  }
}
if (-not $slitherInstalled) {
  foreach ($cmd in @("pip3", "pip")) {
    if (Get-Command $cmd -ErrorAction SilentlyContinue) {
      try {
        & $cmd install --quiet slither-analyzer 2>$null
        if ($LASTEXITCODE -eq 0) { $slitherInstalled = $true; break }
      } catch {}
    }
  }
}
if (-not $slitherInstalled) {
  Write-Host "Could not install Slither automatically. Run: python -m pip install slither-analyzer"
}

# Add Python Scripts to PATH so sunya can find slither
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$scriptsAdded = $false
foreach ($cmd in @("python", "python3")) {
  if (Get-Command $cmd -ErrorAction SilentlyContinue) {
    try {
      $scriptsDir = & $cmd -c "import sysconfig; print(sysconfig.get_path('scripts'))" 2>$null
      if ($scriptsDir -and (Test-Path $scriptsDir) -and ($userPath -notlike "*$scriptsDir*")) {
        [Environment]::SetEnvironmentVariable("Path", "$userPath;$scriptsDir", "User")
        $env:Path = "$env:Path;$scriptsDir"
        Write-Host "Added Python Scripts to PATH: $scriptsDir"
        $scriptsAdded = $true
        break
      }
    } catch {}
  }
}
if ($scriptsAdded) {
  Write-Host "Restart your terminal for PATH changes to take effect."
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

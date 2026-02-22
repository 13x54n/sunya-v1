# Sunya

Static analysis for EVM smart contracts. Install with curl, analyze with one command.

## Install

### Linux & macOS

```bash
curl -sSL https://raw.githubusercontent.com/13x54n/sunya-landing-page/main/package/bin/install | sh
```

Add `~/.local/bin` to PATH if needed:

```bash
# macOS (zsh)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc

# Linux (bash)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
```

**Requirements:** Bash, Node.js (recommended) or Python. Slither is installed automatically.

### Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/13x54n/sunya-landing-page/main/package/bin/install.ps1 | iex
```

**Requirements:** Node.js, Python (for Slither).

## Usage

```bash
# From a project with Solidity contracts
cd your-project
sunya scan
```

Scans `./contracts` or `./src` for `.sol` files and runs Slither.

### Commands

| Command | Description |
|---------|-------------|
| `sunya scan [dir]` | Analyze contracts in dir (default: ./contracts or ./src) |
| `sunya install` | Install or update Slither |
| `sunya uninstall [-y]` | Remove sunya from your system |
| `sunya --help` | Show usage |

### Options

- `SUNYA_CONTRACTS_DIR` — Directory to scan (default: ./contracts)
- `SUNYA_CONFIG` — Config file path (default: sunya.config.json)

### Config

Create `sunya.config.json` in your project root. Use `./src` for Foundry projects, `./contracts` for others:

```json
{
  "contractsDir": "./src",
  "output": { "format": "table" }
}
```

## Requirements

| Platform | Requirements |
| -------- | ------------ |
| Linux    | Bash, Node.js (recommended) or Python, Python 3 (for Slither) |
| macOS    | Bash, Node.js (recommended) or Python, Python 3 (for Slither) |
| Windows  | Node.js, Python (for Slither) |

## Example

```bash
# Foundry project
forge init my-token && cd my-token
curl -sSL https://raw.githubusercontent.com/13x54n/sunya-landing-page/main/package/bin/install | sh
sunya scan
```

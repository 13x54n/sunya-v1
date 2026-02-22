# Sunya

Static analysis for EVM smart contracts. Install with curl, analyze with one command.

## Install (curl)

```bash
curl -sSL https://raw.githubusercontent.com/13x54n/sunya-landing-page/main/package/bin/install | sh
```

Add `~/.local/bin` to your PATH if needed:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

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

- Bash
- Python 3 (for Slither)
- [uv](https://github.com/astral-sh/uv) (optional, installed automatically by the installer)

## Example

```bash
# Foundry project
forge init my-token && cd my-token
curl -sSL https://raw.githubusercontent.com/13x54n/sunya-landing-page/main/package/bin/install | sh
sunya scan
```

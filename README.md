# Sunya Documentation

Documentation site for **Sunya**, static analysis for EVM smart contracts.

## About Sunya

Sunya scans your `contracts/` or `src/` directory and runs Slither for vulnerability analysis. Cross-platform: Linux, macOS, Windows.

```bash
# Linux & macOS
curl -sSL https://raw.githubusercontent.com/13x54n/sunya-landing-page/main/package/bin/install | sh

# Windows (PowerShell)
irm https://raw.githubusercontent.com/13x54n/sunya-landing-page/main/package/bin/install.ps1 | iex

sunya scan
```

See the [package README](./package/README.md) for full details.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 18, Tailwind CSS |
| **Components** | Radix UI, Lucide React |
| **Content** | MDX with remark-gfm, rehype-slug |
| **Code blocks** | Shiki (one-dark-pro), rehype-pretty-code |
| **Animation** | Framer Motion |

### Key features

- **MDX** — Documentation written in Markdown with JSX support
- **Syntax highlighting** — Shiki-powered, VS Code-quality themes
- **Sidebar navigation** — Version switcher, search, active state routing
- **Dark mode** — Optimized for code-heavy docs

## Development

```bash
# Install dependencies
npm install

# Start dev server (Webpack — required for MDX)
npm run dev

# Build
npm run build

# Production
npm run start
```

> **Note:** The dev server uses `--webpack` instead of Turbopack because MDX plugins require serializable options.

## Project Structure

```
├── package/           # Sunya CLI (curl-installable)
├── src/
│   ├── app/           # Next.js App Router
│   │   └── docs/      # Documentation pages (MDX)
│   ├── components/    # UI components, sidebar
│   ├── data/          # Navigation, site config
│   └── lib/           # Rehype plugins (code header, copy button)
```

## License

MIT © Ming Open Web Headquarters

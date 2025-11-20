# Signal Forge Studio · Nuxt + Tailwind

Nuxt 4 landing-page template with a fully themed dark/light experience, Tailwind v4, and a GitHub Pages-ready static build pipeline.

## Prerequisites

- Node.js 20+
- npm 10+

Install dependencies once:

```bash
npm install
```

## Local Development

Hot-reload dev server (http://localhost:3000):

```bash
npm run dev
```

## Production Builds

SSR build for traditional hosting:

```bash
npm run build
npm run preview
```

Static export for GitHub Pages / any CDN:

```bash
# base URL defaults to "/" for local preview
npm run generate

# to mimic Pages locally (replace nuxt with your repo name)
NUXT_PUBLIC_BASE_URL=/nuxt/ npm run generate
```

The generated site lives in `.output/public`.

## GitHub Pages Deployment

This repo ships with `.github/workflows/deploy.yml`, which:

1. Runs on every push to `master` (and via manual dispatch).
2. Installs dependencies, runs `npm run generate`, and uploads `.output/public`.
3. Deploys the static artifact via `actions/deploy-pages`.

Environment details:

- `NUXT_PUBLIC_BASE_URL` is automatically set to `/<repository-name>/` so asset paths resolve correctly on Pages.
- `nitro.preset` is forced to `github-pages` during CI so that CSS, JS, and payload files are emitted in the structure Pages expects.

### Custom base URL locally

If you need to preview the exact GitHub Pages origin in development, export the same env var before running Nuxt:

```bash
set NUXT_PUBLIC_BASE_URL=/nuxt/& npm run dev        # Windows (cmd)

$env:NUXT_PUBLIC_BASE_URL="/nuxt/"; npm run dev    # PowerShell

NUXT_PUBLIC_BASE_URL=/nuxt/ npm run dev             # macOS/Linux
```

## Useful Links

- [Nuxt docs](https://nuxt.com/docs)
- [Tailwind v4 docs](https://tailwindcss.com/docs)

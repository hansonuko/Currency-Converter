# CLAUDE.md

Guidance for Claude Code (or any engineer) working in this repo.

## What this is
A lite, modern, responsive currency converter web app. Single screen: amount input, two currency selectors, swap button, live result. No accounts, no backend, no database.

Full spec lives in `docs/`:
- [`docs/01-blueprint.md`](docs/01-blueprint.md) — product scope, user stories, NFRs
- [`docs/02-design-system.md`](docs/02-design-system.md) — color tokens, type scale, components, spacing, motion
- [`docs/03-architecture.md`](docs/03-architecture.md) — stack, data flow, folder structure
- [`docs/04-build-plan.md`](docs/04-build-plan.md) — phased build plan (source of truth for what phase we're on)

Read the relevant doc before making a change that touches scope, visuals, or structure — don't improvise around them without flagging it.

## Stack
- **Vite + TypeScript**, vanilla (no UI framework) — deliberate choice for a lite, single-screen app. See `docs/03-architecture.md §1` before introducing React/Vue/etc.
- Plain CSS with custom properties as design tokens (no Tailwind/CSS-in-JS) — tokens defined in `src/style.css`, must match `docs/02-design-system.md`.
- Exchange rates: [Frankfurter API](https://api.frankfurter.dev) — free, no key.
- Persistence: `localStorage` only (last-used currency pair, last-good rates for offline fallback).

## Commands
```
npm install       # install deps
npm run dev       # dev server — MUST stay on http://localhost:3009 (strictPort in vite.config.ts)
npm run build     # production build to /dist
npm run preview   # serve the production build locally
npm test          # Vitest — unit tests for src/lib/
```

## Conventions
- Dev server port is pinned to **3009**. Don't let it silently fall back to another port — `strictPort: true` in `vite.config.ts` should stay set.
- Keep business logic in `src/lib/*.ts` (pure functions, easy to unit test) separate from `src/components/*.ts` (DOM wiring).
- Debounce user input (250ms) before hitting the rate API — never fire a request per keystroke.
- Every network call needs a fallback path: on failure, use the last cached rate from `localStorage` and surface the stale-data status banner (see design system §6) — never a blank/broken screen.
- No new runtime dependencies without a reason — this app is meant to stay lite. Prefer inline SVG over an icon library, system fonts over webfonts.
- Match new UI to the tokens/scale in `docs/02-design-system.md` rather than eyeballing new colors/sizes.

## Workflow
- Work happens on branches named after the build-plan phase (e.g. `phase-0-setup`), opened as a PR against `main`.
- **Do not merge PRs.** Open them, then wait for explicit review/merge approval.
- Current phase and what's done/outstanding: track against `docs/04-build-plan.md`.

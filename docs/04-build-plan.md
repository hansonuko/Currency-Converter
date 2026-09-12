# Build Plan — Currency Converter

Phased so you can review/redirect after each stage if you want. Estimates assume "lite" scope, one engineer, AI-assisted.

## Phase 0 — Project setup
- Scaffold Vite + TypeScript project.
- Configure `vite.config.ts` to serve dev on `localhost:3009` (`strictPort: true`).
- Set up `package.json` scripts (`dev`, `build`, `preview`, `test`).
- Add ESLint + Prettier (minimal config) for consistency.
- **Deliverable:** empty app running at `localhost:3009` with a blank styled page.

## Phase 1 — Static UI shell
- Build the markup + CSS for the full layout using the Design System tokens: card, amount input, two currency selectors, swap button, result display — with placeholder/static data.
- Implement responsive behavior (mobile ↔ desktop) and dark-mode via `prefers-color-scheme`.
- **Deliverable:** pixel-close, responsive, non-functional UI — good checkpoint to sign off on visual design before wiring logic.

## Phase 2 — Core conversion logic
- `lib/api.ts`: fetch wrapper for Frankfurter API.
- `lib/convert.ts`: conversion math, in-memory rate caching (10 min TTL), currency-pair swap logic.
- `lib/storage.ts`: persist last used currency pair + last good rates to `localStorage`.
- Wire components to real data; debounce input.
- **Deliverable:** fully working converter against live rates.

## Phase 3 — Resilience & polish
- Offline / API-failure fallback to cached data + status banner.
- Loading state (skeleton/subtle spinner on first load only).
- Swap button animation, result-update micro-transition.
- Accessibility pass: labels, focus states, `aria-live` result region, contrast check.
- **Deliverable:** production-quality UX matching all NFRs in the Blueprint.

## Phase 4 — Testing & QA
- Vitest unit tests for `convert.ts` and `storage.ts`.
- Manual cross-browser + responsive checklist (Chrome, Safari, Firefox, Edge, one mobile browser).
- Lighthouse pass (target ≥ 90 Performance/Accessibility/Best Practices).
- **Deliverable:** signed-off, tested build.

## Phase 5 — Deploy (only once you approve)
- `npm run build`, deploy `/dist` to your hosting choice of preference (Vercel/Netlify/GitHub Pages — TBD with you).
- **Deliverable:** live public URL.

---

## What happens next
This plan, along with the Blueprint, Design System, and Architecture docs, is ready for your review. **No code will be written until you give the call.** When you're ready:
- Approve as-is → we start at Phase 0.
- Flag changes → we revise the relevant doc(s) first.
- Fast-track → tell us to collapse phases (e.g., build UI + logic together) if you'd rather see a working version sooner and polish after.

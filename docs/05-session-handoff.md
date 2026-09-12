# Session Handoff — 12 Sep 2026

Snapshot of project state for whoever (or whichever Claude session) picks this up next. Read this alongside `CLAUDE.md` and `docs/04-build-plan.md` (source of truth for phase status).

## Where things stand

| | |
|---|---|
| Repo | [github.com/hansonuko/Currency-Converter](https://github.com/hansonuko/Currency-Converter) — public |
| Live deploy | **https://hansonuko-currencyconverter.netlify.app** |
| Dev server | `npm run dev` → `localhost:3009` |
| Merged | Phase 0 (setup), Phase 1 (static UI shell + African currency expansion) |
| Open | This handoff doc (PR pending) |
| Not started | Phase 2 (live rates, persistence) — not yet scoped |

## What's built

A single-screen currency converter: amount input, two searchable currency selectors (46 currencies — major world currencies plus 16 African currencies added per direct request, including Nigeria/NGN), swap button, result display, status banner. Dark mode via `prefers-color-scheme`. Vanilla TypeScript + Vite, no framework, no backend.

**Everything currently runs on placeholder data** (`src/lib/placeholderRates.ts`) — there is no live API call yet. This is Phase 1 by design; see `docs/04-build-plan.md` Phase 2.

## Decisions made this session (not just in the docs)

- **Stack:** Vite + vanilla TypeScript, confirmed over React — see `docs/03-architecture.md` §1 flagged decision. Revisit only if the app is expected to grow past one screen.
- **Currency list:** expanded from 30 to 46 currencies to add African coverage (Nigeria, Ghana, Cameroon, Botswana, Rwanda, Kenya, Egypt, Morocco, Tanzania, Uganda, Ethiopia, Senegal/XOF, Zambia, Namibia, Mauritius, Algeria — South Africa was already present). Full list in `src/lib/currencies.ts`.
- **Netlify site name:** `currencyconverter` and `currencyconverter-app` were both already taken globally on Netlify; live site is `hansonuko-currencyconverter.netlify.app`.
- **Netlify site visibility:** the "AIJMR JOURNAL" Netlify account (the one behind the deploy token used) has an account-wide SSO/visitor-access policy that gates sites by default. Overrode `sso_login: false` on **this one site only** via the Netlify API — the account-wide policy itself was left untouched. If the site ever starts requiring login again, check `https://api.netlify.com/api/v1/sites/c92f9b54-8e06-4041-8fcd-b77760f8799a` — `sso_login` should read `false`.

## Known issues, flagged not fixed

- **Dev-dependency advisories:** `npm audit` flags moderate/high issues in `esbuild`/`vite`/`vitest` — dev-server-only, not in the production build output. Fixing needs a breaking major bump (Vite 5→8, Vitest 2→5). See PR #1 for details. Still unresolved.
- **Status banner:** currently shown by default with a placeholder message, purely so its design could be reviewed in Phase 1. Needs real `navigator.onLine` / fetch-failure wiring in Phase 2 — see the note at the top of `src/components/statusBanner.ts`.
- **Responsive check incomplete:** the single 480px breakpoint was never confirmed via an actual narrow-viewport screenshot (the browser automation tool's window resize wasn't taking effect reliably in that session). Low risk — it's one plain CSS media query — but worth a manual phone-width check.

## Operational notes

- **Netlify deploy token:** was pasted directly in chat and used only as an ephemeral shell env var for that session's CLI/API calls — never written to any file or committed. It is **not** stored anywhere in this repo. If recurring/CI deploys are wanted, set the token up as a GitHub Actions secret or in Netlify's own build settings, not in the repo.
- **`.netlify/` and `.claude/`** directories are local tooling state (Netlify CLI site link, Claude Code session settings) — now gitignored, never committed.
- **Workflow reminder** (from `CLAUDE.md`): work happens on phase/topic branches, opened as PRs against `main`. No self-merge unless explicitly told to merge.

## Suggested next step

Phase 2 needs scoping: wire `src/lib/api.ts` to the Frankfurter API, replace `placeholderRates.ts`, add `localStorage` persistence and real offline/error handling for the status banner. Not started — flag when ready to scope it.

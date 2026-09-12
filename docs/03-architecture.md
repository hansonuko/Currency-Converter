# Architecture — Currency Converter

"Lite" architecture: static front-end, no backend server, no database, no build complexity beyond a bundler.

## 1. Stack decision

| Layer | Choice | Why |
|---|---|---|
| Tooling | **Vite** | Instant dev server, zero-config, fast HMR, tiny prod bundle |
| Language | **TypeScript**, vanilla (no framework) | The app is a handful of interactive elements — React/Vue would be extra weight for no real benefit at this scope. TS gives type safety on the conversion math and API response shape without framework overhead. |
| Styling | Plain CSS with custom properties (design tokens from the Design System doc) | No Tailwind/CSS-in-JS needed for a single-screen app; keeps it lite and directly maps to the token table |
| Exchange rate data | **Frankfurter API** (`https://api.frankfurter.dev`) | Free, no API key required, no rate-limit signup friction, backed by the European Central Bank. Good fit for a "lite" build with zero config. |
| Persistence | `localStorage` only | Cache last-fetched rates + last-used currency pair for offline fallback and returning-user convenience. No backend/db needed. |
| Hosting | Static hosting (Vercel/Netlify/GitHub Pages) — deploy step is out of scope until you approve the build | Whole app is static files after `vite build` |

**Flagged decision for your review:** vanilla TS vs. React. Vanilla keeps bundle size and complexity minimal, which fits "lite." If you anticipate growing this app a lot (accounts, many screens), say so and we switch to React now rather than later.

## 2. High-level data flow

```
User input (amount / currency A / currency B)
        │
        ▼
  debounce (250ms)
        │
        ▼
  Conversion Engine ──► checks in-memory rate cache (valid < 10 min?)
        │                         │
        │ (cache miss/expired)    │ (cache hit)
        ▼                         │
  Frankfurter API fetch           │
        │                         │
        ▼                         │
  Update cache + localStorage ◄───┘
        │
        ▼
  Compute result (amount × rate)
        │
        ▼
  Render result + "updated Xm ago" + persist last pair to localStorage
```

On fetch failure: fall back to last cached rate in `localStorage`, show the "stale data" status banner (see Design System §6).

## 3. Folder structure

```
currency-converter-app/
├── docs/                     # this documentation set
├── index.html
├── src/
│   ├── main.ts                # app bootstrap/wiring
│   ├── style.css              # design tokens + global styles
│   ├── components/
│   │   ├── amountInput.ts
│   │   ├── currencySelector.ts
│   │   ├── swapButton.ts
│   │   ├── resultDisplay.ts
│   │   └── statusBanner.ts
│   ├── lib/
│   │   ├── api.ts             # Frankfurter fetch wrapper
│   │   ├── convert.ts         # pure conversion math + caching logic
│   │   ├── storage.ts         # localStorage read/write helpers
│   │   └── currencies.ts      # curated currency list (code, name, flag)
│   └── types.ts
├── public/
│   └── favicon.svg
├── vite.config.ts             # dev server pinned to port 3009
├── tsconfig.json
├── package.json
└── README.md
```

## 4. Dev environment
- `npm run dev` → Vite dev server on **`http://localhost:3009`** (configured via `server.port` in `vite.config.ts`, `strictPort: true` so it never silently jumps to another port).
- `npm run build` → production static bundle to `/dist`.
- `npm run preview` → serve the production build locally for a final check.

## 5. Error handling & edge cases
- API unreachable / non-200 → use cached rate if available (any age), else show inline error with retry.
- Invalid/empty amount input → treat as 0, no crash, no request spam.
- Same currency selected on both sides → show 1:1 instantly, skip network call.
- Debounce all input so we don't fire a request per keystroke.

## 6. Testing approach (lite)
- Unit tests (Vitest) on the pure logic in `lib/convert.ts` and `lib/storage.ts` — the parts most likely to have bugs.
- Manual QA checklist for UI/responsive/accessibility (covered in Build Plan, Phase 4).
- No E2E framework for v1 — adds setup overhead disproportionate to app size.

## 7. Security & privacy
- No user data collected, no cookies, no analytics by default (can be added later if you want usage data).
- All storage is local to the browser (`localStorage`), nothing sent anywhere except the public exchange-rate API call.

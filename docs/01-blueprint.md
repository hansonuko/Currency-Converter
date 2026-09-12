# Product Blueprint — Currency Converter

## 1. Vision
A fast, no-friction currency converter web app. Open it, type an amount, pick two currencies, see the result — no login, no clutter, no ads. Works great on mobile and desktop.

## 2. Target user
Anyone who needs a quick conversion: travelers, online shoppers, freelancers invoicing abroad. Single persona, no accounts, no personalization beyond remembering last-used currencies.

## 3. Core user stories (MVP)
1. As a user, I can enter an amount and instantly see it converted between two currencies.
2. As a user, I can swap the "from" and "to" currencies with one click.
3. As a user, I can pick from a searchable list of ~30 common currencies (not all 150+ — lite scope).
4. As a user, I can see the current exchange rate ("1 USD = 0.92 EUR") and when it was last updated.
5. As a user, if I'm offline or the API fails, I still see my last successful conversion (cached) with a clear "stale data" notice, instead of a broken page.
6. As a user, the app looks and works well on my phone as well as my laptop.

## 4. Stretch goals (post-MVP, explicitly out of scope for v1)
- Conversion history / favorites list
- Dark mode toggle (system-preference dark mode IS in MVP, see Design System)
- Multi-currency comparison (1 amount → many currencies at once)
- PWA / installable offline app
- Historical rate chart

## 5. Non-functional requirements
- **Performance:** first meaningful paint < 1s on a typical connection; no heavy frameworks.
- **Responsive:** usable from 320px (small phone) up to large desktop; single codebase, no separate mobile site.
- **Accessible:** keyboard-operable, proper form labels, sufficient color contrast (WCAG AA), screen-reader-friendly live region for the result.
- **Resilient:** graceful handling of API failure/rate limits/offline — never a blank or broken screen.
- **No backend required:** static site, deployable anywhere (Vercel/Netlify/GitHub Pages).

## 6. Success criteria for v1
- User can complete a conversion in under 10 seconds on first visit, with zero instructions.
- Works correctly on the latest Chrome, Safari, Firefox, Edge, and one mobile browser (iOS Safari or Android Chrome).
- Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices.

## 7. Open decisions flagged for your review
- **List of currencies:** proposing a curated ~30 (major world currencies) rather than the full ISO 4217 list, to keep the picker fast and simple. Confirm or expand.
- **Stretch goals:** confirm none of these need pulling into v1.

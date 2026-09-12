# Design System — Currency Converter

Lite design system: enough tokens and components to build a consistent, modern UI without a heavyweight component library.

## 1. Design principles
- **One primary action, obvious.** The conversion result is the hero — biggest, boldest element on screen.
- **Calm surface.** Lots of whitespace, one accent color, no visual noise.
- **Instant feedback.** Typing updates the result live (debounced), no "Convert" button required.

## 2. Color tokens

Light theme (default) and dark theme (via `prefers-color-scheme`), same accent.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--bg` | `#F7F8FA` | `#0F1115` | Page background |
| `--surface` | `#FFFFFF` | `#1A1D24` | Card / panel background |
| `--surface-alt` | `#EEF0F3` | `#232631` | Input backgrounds, subtle blocks |
| `--text` | `#12141A` | `#F2F3F5` | Primary text |
| `--text-muted` | `#6B7280` | `#9AA0AC` | Labels, secondary text, timestamps |
| `--border` | `#E2E4E9` | `#2C2F3A` | Dividers, input borders |
| `--accent` | `#4F46E5` (indigo) | `#818CF8` | Buttons, focus rings, links |
| `--accent-contrast` | `#FFFFFF` | `#0F1115` | Text on accent background |
| `--success` | `#16A34A` | `#4ADE80` | Positive/updated state |
| `--error` | `#DC2626` | `#F87171` | Errors, stale-data warning |

## 3. Typography

- Font: system font stack (no web-font download = faster, lighter): `-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
- Scale:
  | Role | Size | Weight |
  |---|---|---|
  | Result display | 2.5rem (mobile) / 3.5rem (desktop) | 700 |
  | Page title | 1.25rem | 600 |
  | Body / inputs | 1rem | 400–500 |
  | Labels / meta | 0.8125rem | 500 |

## 4. Spacing & layout
- 4px base unit; scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Single centered card, max-width 480px, on a full-viewport background.
- Radius: 16px on the card, 12px on inputs/buttons — soft, modern, not sharp.
- Shadow: one soft elevation shadow on the card only (`0 8px 30px rgba(0,0,0,0.08)`), none on dark theme (use border instead).

## 5. Breakpoints
| Name | Width | Behavior |
|---|---|---|
| Mobile | < 480px | Card fills viewport with 16px margin, stacked layout |
| Tablet/Desktop | ≥ 480px | Centered card, fixed 480px width |

Only one real breakpoint needed — the card layout itself already adapts.

## 6. Core components

**Amount Input**
- Large numeric input, right-aligned digits, currency symbol prefix.
- Focus state: 2px accent ring.

**Currency Selector**
- Button showing flag emoji + ISO code (e.g. "🇺🇸 USD") that opens a searchable dropdown/list.
- Search filters by code or currency name.

**Swap Button**
- Circular icon button between the "from" and "to" rows; 180° rotate animation on click; swaps both currency and re-runs conversion.

**Result Display**
- Large converted amount + "1 USD = 0.9234 EUR" line beneath it + "Updated 2 min ago" timestamp in muted text.
- `aria-live="polite"` region so screen readers announce updates.

**Status/Error Banner**
- Slim inline banner (not a modal) for "You're offline — showing last known rates" or "Couldn't refresh rates, try again" with a retry action.

## 7. Motion
- Keep minimal: 150–200ms ease-out transitions on swap rotation, result value change (subtle fade), and dropdown open/close. No decorative animation.

## 8. Iconography
- Inline SVG icons only (swap arrows, search, chevron), no icon font/library dependency — keeps bundle lite.

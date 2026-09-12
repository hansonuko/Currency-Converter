/**
 * PHASE 1 PLACEHOLDER ONLY.
 *
 * Static, made-up rates (relative to 1 USD) so the UI has something
 * believable to render. Delete this file in Phase 2 and replace call
 * sites with the real Frankfurter API client (docs/03-architecture.md §1).
 */
export const PLACEHOLDER_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CHF: 0.88,
  CAD: 1.36,
  AUD: 1.52,
  NZD: 1.66,
  CNY: 7.24,
  HKD: 7.82,
  SGD: 1.34,
  INR: 83.3,
  KRW: 1330.0,
  MXN: 18.2,
  BRL: 5.1,
  ZAR: 18.6,
  SEK: 10.45,
  NOK: 10.6,
  DKK: 6.86,
  PLN: 3.98,
  TRY: 34.2,
  RUB: 92.5,
  AED: 3.67,
  SAR: 3.75,
  THB: 35.8,
  IDR: 15750.0,
  MYR: 4.68,
  PHP: 56.2,
  VND: 24500.0,
  ILS: 3.7,
};

export const PLACEHOLDER_UPDATED_AT = new Date();

export function placeholderConvert(
  amount: number,
  from: string,
  to: string,
): number {
  const fromRate = PLACEHOLDER_RATES[from] ?? 1;
  const toRate = PLACEHOLDER_RATES[to] ?? 1;
  return (amount / fromRate) * toRate;
}

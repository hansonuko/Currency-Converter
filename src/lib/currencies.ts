import type { Currency } from "../types";

// Curated list — ~30 major currencies rather than the full ISO 4217 set,
// to keep the picker fast and simple. Flagged for review in
// docs/01-blueprint.md §7 — expand here (and in the design doc) if needed.
export const CURRENCIES: Currency[] = [
  { code: "USD", name: "United States Dollar", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", symbol: "¥" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", symbol: "Fr" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", symbol: "$" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿", symbol: "$" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", symbol: "$" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", symbol: "$" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", symbol: "₹" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷", symbol: "₩" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽", symbol: "$" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", symbol: "R$" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦", symbol: "R" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰", symbol: "kr" },
  { code: "PLN", name: "Polish Zloty", flag: "🇵🇱", symbol: "zł" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷", symbol: "₺" },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", symbol: "₽" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", symbol: "﷼" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾", symbol: "RM" },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭", symbol: "₱" },
  { code: "VND", name: "Vietnamese Dong", flag: "🇻🇳", symbol: "₫" },
  { code: "ILS", name: "Israeli Shekel", flag: "🇮🇱", symbol: "₪" },
];

export function findCurrency(code: string): Currency {
  const match = CURRENCIES.find((c) => c.code === code);
  if (!match) throw new Error(`Unknown currency code: ${code}`);
  return match;
}

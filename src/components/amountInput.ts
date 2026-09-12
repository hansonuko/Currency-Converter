import type { Currency } from "../types";

export interface AmountInputHandle {
  element: HTMLDivElement;
  setCurrency: (currency: Currency) => void;
  getValue: () => number;
}

export function createAmountInput(opts: {
  currency: Currency;
  initialValue: number;
  onChange: (value: number) => void;
}): AmountInputHandle {
  const root = document.createElement("div");
  root.className = "amount-field";
  root.innerHTML = `
    <span class="amount-symbol" aria-hidden="true">${opts.currency.symbol}</span>
    <input
      class="amount-input"
      type="text"
      inputmode="decimal"
      autocomplete="off"
      aria-label="Amount to convert"
      value="${opts.initialValue}"
    />
  `;

  const symbolEl = root.querySelector<HTMLSpanElement>(".amount-symbol")!;
  const inputEl = root.querySelector<HTMLInputElement>(".amount-input")!;

  inputEl.addEventListener("input", () => {
    // Allow only digits and a single decimal point while typing.
    const cleaned = inputEl.value.replace(/[^\d.]/g, "");
    if (cleaned !== inputEl.value) inputEl.value = cleaned;
    const parsed = parseFloat(cleaned);
    opts.onChange(Number.isFinite(parsed) ? parsed : 0);
  });

  return {
    element: root,
    setCurrency: (currency) => {
      symbolEl.textContent = currency.symbol;
    },
    getValue: () => {
      const parsed = parseFloat(inputEl.value);
      return Number.isFinite(parsed) ? parsed : 0;
    },
  };
}

import type { Currency } from "../types";

export interface ResultDisplayHandle {
  element: HTMLDivElement;
  update: (opts: {
    from: Currency;
    to: Currency;
    convertedAmount: number;
    rate: number;
    updatedAt: Date;
  }) => void;
}

function formatAmount(value: number, symbol: string): string {
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

function formatRelativeTime(date: Date): string {
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return "Updated just now";
  const minutes = Math.floor(seconds / 60);
  return `Updated ${minutes}m ago`;
}

export function createResultDisplay(): ResultDisplayHandle {
  const root = document.createElement("div");
  root.className = "result";
  root.setAttribute("aria-live", "polite");
  root.innerHTML = `
    <div class="result-amount"></div>
    <div class="result-rate"></div>
    <div class="result-updated"></div>
  `;

  const amountEl = root.querySelector<HTMLDivElement>(".result-amount")!;
  const rateEl = root.querySelector<HTMLDivElement>(".result-rate")!;
  const updatedEl = root.querySelector<HTMLDivElement>(".result-updated")!;

  return {
    element: root,
    update: ({ from, to, convertedAmount, rate, updatedAt }) => {
      amountEl.textContent = formatAmount(convertedAmount, to.symbol);
      rateEl.textContent = `1 ${from.code} = ${rate.toFixed(4)} ${to.code}`;
      updatedEl.textContent = formatRelativeTime(updatedAt);
    },
  };
}

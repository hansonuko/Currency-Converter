import "./style.css";
import { createAmountInput } from "./components/amountInput";
import { createCurrencySelector } from "./components/currencySelector";
import { createSwapButton } from "./components/swapButton";
import { createResultDisplay } from "./components/resultDisplay";
import { createStatusBanner } from "./components/statusBanner";
import { findCurrency } from "./lib/currencies";
import {
  placeholderConvert,
  PLACEHOLDER_UPDATED_AT,
} from "./lib/placeholderRates";
import type { ConverterState } from "./types";

// Phase 1 — static UI shell. Conversion math below runs against
// PLACEHOLDER_RATES, not a live API. See docs/04-build-plan.md Phase 2
// for wiring the real Frankfurter client and localStorage persistence.

const state: ConverterState = {
  amount: 100,
  from: "USD",
  to: "EUR",
};

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("#app root not found");

const card = document.createElement("div");
card.className = "card";

const header = document.createElement("header");
header.className = "card-header";
header.innerHTML = `<h1>Currency Converter</h1>`;

const fromRow = document.createElement("div");
fromRow.className = "field-row";

const amountInput = createAmountInput({
  currency: findCurrency(state.from),
  initialValue: state.amount,
  onChange: (value) => {
    state.amount = value;
    renderResult();
  },
});

const fromSelector = createCurrencySelector({
  label: "From",
  selected: findCurrency(state.from),
  onSelect: (currency) => {
    state.from = currency.code;
    amountInput.setCurrency(currency);
    renderResult();
  },
});

fromRow.append(amountInput.element, fromSelector.element);

const swapButton = createSwapButton(() => {
  const prevFrom = state.from;
  state.from = state.to;
  state.to = prevFrom;
  fromSelector.setSelected(findCurrency(state.from));
  toSelector.setSelected(findCurrency(state.to));
  amountInput.setCurrency(findCurrency(state.from));
  renderResult();
});
const swapRow = document.createElement("div");
swapRow.className = "swap-row";
swapRow.appendChild(swapButton);

const toRow = document.createElement("div");
toRow.className = "field-row field-row-single";

const toSelector = createCurrencySelector({
  label: "To",
  selected: findCurrency(state.to),
  onSelect: (currency) => {
    state.to = currency.code;
    renderResult();
  },
});
toRow.appendChild(toSelector.element);

const resultDisplay = createResultDisplay();
const statusBanner = createStatusBanner();

card.append(
  header,
  fromRow,
  swapRow,
  toRow,
  resultDisplay.element,
  statusBanner.element,
);
app.appendChild(card);

function renderResult() {
  const fromCurrency = findCurrency(state.from);
  const toCurrency = findCurrency(state.to);
  const convertedAmount = placeholderConvert(
    state.amount,
    state.from,
    state.to,
  );
  const rate = placeholderConvert(1, state.from, state.to);

  resultDisplay.update({
    from: fromCurrency,
    to: toCurrency,
    convertedAmount,
    rate,
    updatedAt: PLACEHOLDER_UPDATED_AT,
  });
}

renderResult();

// Placeholder banner shown for visual review only — see statusBanner.ts.
statusBanner.show(
  "Showing example rates — live data connects in Phase 2.",
  "offline",
);

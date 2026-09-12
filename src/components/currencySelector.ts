import { CURRENCIES } from "../lib/currencies";
import type { Currency } from "../types";

export interface CurrencySelectorHandle {
  element: HTMLDivElement;
  setSelected: (currency: Currency) => void;
}

const chevronIcon = `
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const searchIcon = `
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 12L9.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;

export function createCurrencySelector(opts: {
  label: string;
  selected: Currency;
  onSelect: (currency: Currency) => void;
}): CurrencySelectorHandle {
  const root = document.createElement("div");
  root.className = "currency-selector";
  root.innerHTML = `
    <span class="currency-selector-label">${opts.label}</span>
    <button type="button" class="currency-trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="flag" aria-hidden="true"></span>
      <span class="code"></span>
      ${chevronIcon}
    </button>
    <div class="currency-dropdown" hidden>
      <div class="currency-search-field">
        ${searchIcon}
        <input type="text" class="currency-search" placeholder="Search currency" aria-label="Search currency" />
      </div>
      <ul class="currency-list" role="listbox"></ul>
    </div>
  `;

  const trigger = root.querySelector<HTMLButtonElement>(".currency-trigger")!;
  const flagEl = root.querySelector<HTMLSpanElement>(".flag")!;
  const codeEl = root.querySelector<HTMLSpanElement>(".code")!;
  const dropdown = root.querySelector<HTMLDivElement>(".currency-dropdown")!;
  const searchInput = root.querySelector<HTMLInputElement>(".currency-search")!;
  const listEl = root.querySelector<HTMLUListElement>(".currency-list")!;

  let current = opts.selected;

  function renderTrigger() {
    flagEl.textContent = current.flag;
    codeEl.textContent = current.code;
  }

  function renderList(filter: string) {
    const query = filter.trim().toLowerCase();
    const matches = CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(query) ||
        c.name.toLowerCase().includes(query),
    );

    listEl.innerHTML = matches
      .map(
        (c) => `
          <li role="option" class="currency-option${c.code === current.code ? " selected" : ""}" data-code="${c.code}" aria-selected="${c.code === current.code}">
            <span class="flag" aria-hidden="true">${c.flag}</span>
            <span class="option-code">${c.code}</span>
            <span class="option-name">${c.name}</span>
          </li>`,
      )
      .join("");

    if (matches.length === 0) {
      listEl.innerHTML = `<li class="currency-empty">No currencies match "${filter}"</li>`;
    }
  }

  function open() {
    dropdown.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    searchInput.value = "";
    renderList("");
    searchInput.focus();
  }

  function close() {
    dropdown.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  trigger.addEventListener("click", () => {
    if (dropdown.hidden) open();
    else close();
  });

  searchInput.addEventListener("input", () => renderList(searchInput.value));

  listEl.addEventListener("click", (e) => {
    const optionEl = (e.target as HTMLElement).closest<HTMLLIElement>(
      ".currency-option",
    );
    if (!optionEl) return;
    const code = optionEl.dataset.code!;
    const match = CURRENCIES.find((c) => c.code === code);
    if (!match) return;
    current = match;
    renderTrigger();
    close();
    opts.onSelect(match);
  });

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target as Node)) close();
  });

  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
      trigger.focus();
    }
  });

  renderTrigger();

  return {
    element: root,
    setSelected: (currency) => {
      current = currency;
      renderTrigger();
    },
  };
}

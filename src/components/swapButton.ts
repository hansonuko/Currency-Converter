const swapIcon = `
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4 6.5H14M14 6.5L11 3.5M14 6.5L11 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 11.5H4M4 11.5L7 8.5M4 11.5L7 14.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

export function createSwapButton(onSwap: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "swap-button";
  button.setAttribute("aria-label", "Swap currencies");
  button.innerHTML = swapIcon;

  let rotation = 0;
  button.addEventListener("click", () => {
    rotation += 180;
    button.style.transform = `rotate(${rotation}deg)`;
    onSwap();
  });

  return button;
}

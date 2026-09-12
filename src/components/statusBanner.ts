export type BannerTone = "offline" | "error";

export interface StatusBannerHandle {
  element: HTMLDivElement;
  show: (message: string, tone: BannerTone, onRetry?: () => void) => void;
  hide: () => void;
}

/**
 * Slim inline status banner — see docs/02-design-system.md §6.
 *
 * PHASE 1 NOTE: not wired to real network/offline detection yet (that's
 * Phase 2). It's shown by default here, with a placeholder message, purely
 * so the design can be reviewed. Phase 2 should call `.hide()` on init and
 * only `.show()` it on an actual fetch failure or `navigator.onLine` change.
 */
export function createStatusBanner(): StatusBannerHandle {
  const root = document.createElement("div");
  root.className = "status-banner";
  root.setAttribute("role", "status");
  root.innerHTML = `
    <span class="status-message"></span>
    <button type="button" class="status-retry" hidden>Retry</button>
  `;

  const messageEl = root.querySelector<HTMLSpanElement>(".status-message")!;
  const retryEl = root.querySelector<HTMLButtonElement>(".status-retry")!;

  return {
    element: root,
    show: (message, tone, onRetry) => {
      root.hidden = false;
      root.dataset.tone = tone;
      messageEl.textContent = message;
      retryEl.hidden = !onRetry;
      retryEl.onclick = onRetry ?? null;
    },
    hide: () => {
      root.hidden = true;
    },
  };
}

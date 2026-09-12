import "./style.css";

// Phase 0 — scaffold only. This confirms the dev server, TypeScript, and
// design tokens are wired up correctly. The real UI shell (amount input,
// currency selectors, swap button, result display) lands in Phase 1 —
// see docs/04-build-plan.md.
const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <div class="scaffold-card">
      <h1>Currency Converter</h1>
      <p>Project scaffold is running.</p>
      <p>Dev server: <strong>localhost:3009</strong></p>
      <span class="scaffold-status">Phase 0 complete</span>
    </div>
  `;
}

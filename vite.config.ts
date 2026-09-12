import { defineConfig } from "vite";

// Dev server is pinned to localhost:3009 — see CLAUDE.md and docs/03-architecture.md §4.
// strictPort ensures it fails loudly instead of silently moving to another port.
export default defineConfig({
  server: {
    port: 3009,
    strictPort: true,
  },
  preview: {
    port: 3009,
    strictPort: true,
  },
});

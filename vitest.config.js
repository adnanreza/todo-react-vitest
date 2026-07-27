import { defineConfig } from "vitest/config";

// Test-only config, kept separate from vite.config.js on purpose: the
// app's build setup and the test setup stay independent, and each file
// does exactly one job. No React plugin here: Vite compiles JSX on its
// own, and the plugin exists mainly for Fast Refresh, which tests never
// use. Leaving it out also keeps the output free of the deprecation
// warnings the app's pinned plugin version emits under Vitest's newer
// Vite.
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});

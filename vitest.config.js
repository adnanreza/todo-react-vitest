import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Test-only config, kept separate from vite.config.js on purpose: the
// app's build setup and the test setup stay independent, and each file
// does exactly one job.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
  },
});

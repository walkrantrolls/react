import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" ? "/react/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "index.html"),
        tabsDemo: resolve(projectRoot, "tabs-demo.html"),
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/testSetup.js",
    restoreMocks: true,
  },
});

import { defineConfig } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.dirname(fileURLToPath(import.meta.url));
const evidencias = path.resolve(raiz, "..", "Evidencias_Playwright");
const viendo = process.argv.includes("--headed");

export default defineConfig({
  testDir: "./e2e",
  outputDir: path.join(evidencias, "artefactos"),
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 90_000,
  expect: { timeout: 8_000 },
  reporter: [
    ["list"],
    ["html", { outputFolder: path.join(evidencias, "reporte"), open: "never" }]
  ],
  use: {
    baseURL: "http://localhost:5173",
    channel: "chrome",
    headless: true,
    slowMo: viendo ? 400 : 0,
    viewport: { width: 1440, height: 900 },
    video: "on",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 120_000
  }
});

import { defineConfig, devices } from "@playwright/test";

const port = 4173;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],
  use: {
    baseURL: `http://localhost:${port}`,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    // Serves the real static export, so the audit sees exactly what ships.
    command: "node scripts/serve-static.mjs",
    port,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});

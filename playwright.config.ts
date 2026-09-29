import { defineConfig } from '@playwright/test';
import 'dotenv/config';

/**
 * API tests target the OpenAPI server prefix (`/dev`) by default.
 * Override the complete URL with API_BASE_URL when running against another environment.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: '**/api-1/**/*.spec.ts',
      use: {
        baseURL: process.env.API_BASE_URL ?? 'http://localhost:3000/dev/',
        extraHTTPHeaders: {
          Accept: 'application/json',
          ...(process.env.API_TOKEN
            ? { Authorization: `Bearer ${process.env.API_TOKEN}` }
            : {}),
        },
      },
    },
    {
      name: 'ui',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        baseURL: process.env.DEV_URL ?? process.env.UI_BASE_URL ?? 'http://localhost:3000/',
      },
    },
  ],
  outputDir: 'test-results',
});

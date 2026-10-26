
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();


const isCI = Boolean(process.env.CI);

// Browser execution mode
const headless = process.env.HEADLESS === 'true';

// Environment selection
const environment = (process.env.TEST_ENV || 'qa').toLowerCase();

const environmentUrls = {
  qa: process.env.QA_BASE_URL,
  sit: process.env.SIT_BASE_URL,
};

const baseURL = environmentUrls[environment];

if (!baseURL) {
  throw new Error(
    `Invalid TEST_ENV="${environment}". Use qa, sit, or uat.`
  );
}

export default defineConfig({
  // Test discovery
  testDir: './tests',
  testMatch: '**/*.spec.js',
  outputDir: 'test-results',

  // Timeout configuration (milliseconds)
  timeout: 30000,
  globalTimeout: 60 * 60 * 1000,

  expect: {
    timeout: 5_000,
  },

  // Execution configuration
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  maxFailures: isCI ? 10 : 0,

  // Reporting
  reporter: [
    ['list'],

    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],

    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
      },
    ],
  ],

  // Shared browser and test settings
  use: {
    baseURL,

    // HEADLESS=false in .env opens the browser UI
    headless,

    viewport: {
      width: 1366,
      height: 768,
    },

    // Action and navigation timeouts
    actionTimeout: 10000,
    navigationTimeout: 30000,

    // Failure diagnostics
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    // Browser behavior
    acceptDownloads: true,
    ignoreHTTPSErrors: false,
  },

  // Select the browser using --project
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },

    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    },
  ],
});

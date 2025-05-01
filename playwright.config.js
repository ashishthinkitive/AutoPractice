// @ts-check
const { defineConfig } = require('@playwright/test');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config/config.properties');

// Environment configuration
const environment = properties.get('executionEnvironment') || 'DEV';
const baseUrl = properties.get(`${environment.toLowerCase()}Url`);
const browser = properties.get('browser') || 'chromium';
const headless = properties.get('headless') === 'true';
const slowMo = parseInt(properties.get('slowMo') || '0');
const defaultTimeout = parseInt(properties.get('defaultTimeout') || '30000');
const screenshotOnFailure = properties.get('screenshotOnFailure') === 'true';
const videoRecording = properties.get('videoRecording') === 'true';
const traceOnFailure = properties.get('traceOnFailure') === 'true';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: defaultTimeout,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['list'],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }]
  ],
  /* Configure projects for major browsers */
  projects: [
    {
      name: browser,
      use: {
        browserName: browser,
        headless: headless,
        slowMo: slowMo,
        /* Base URL to use in actions like \`await page.goto('/')\` */
        baseURL: baseUrl,
        /* Collect trace when retrying the failed test */
        trace: traceOnFailure ? 'on-first-retry' : 'off',
        /* Capture screenshot on failure */
        screenshot: screenshotOnFailure ? 'only-on-failure' : 'off',
        /* Record video for failed tests */
        video: videoRecording ? 'on-first-retry' : 'off',
      },
    },
  ],
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',
});
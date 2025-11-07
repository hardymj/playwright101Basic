// @ts-check
import { defineConfig, devices } from '@playwright/test';

const ltUsername = "hardymj";
const ltAccessKey = "LT_YAuPpGTm3gO71xmcvMKxESKEE1sKZGWQ27UPu0SyZc44Oia";

const ltChromeCapabilities = {
  browserName: 'pw-chromium', // can be 'firefox' or 'webkit'
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'Windows 11',
    build: 'Playwright Build 1',
    name: 'Chrome Tests',
    user: ltUsername,
    accessKey: ltAccessKey,
    visual: true,
    video: true,
    network: true,
  }
};
const ltWebKitCapabilities = {
  browserName: 'pw-webkit', // can be 'firefox' or 'webkit'
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'macOS Ventura',
    build: 'Playwright Build 1',
    name: 'WebKit Tests',
    user: ltUsername,
    accessKey: ltAccessKey,
    visual: true,
    video: true,
    network: true,
  }
};

const chromeCapsEncoded = encodeURIComponent(JSON.stringify(ltChromeCapabilities));
const webKitCapsEncoded = encodeURIComponent(JSON.stringify(ltWebKitCapabilities));
const ltChromeWsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${chromeCapsEncoded}`;
const ltWebKitWsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${webKitCapsEncoded}`;
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: true, // run tests without opening the browser window
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'LambdaTest Chromium',
      use: {
        connectOptions: { wsEndpoint: ltChromeWsEndpoint },
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        browserName: 'chromium',
      },
    },
    {
      name: 'LambdaTest Webkit',
      use: {
        connectOptions: { wsEndpoint: ltWebKitWsEndpoint },
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        browserName: 'webkit',
      },
    },
    /*{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

  ],
});


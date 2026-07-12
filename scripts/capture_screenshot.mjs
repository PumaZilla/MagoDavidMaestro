#!/usr/bin/env node
/**
 * Capture screenshots using Playwright for visual analysis.
 */
import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

async function captureScreenshots(url, outputDir, viewportConfigs) {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();

  for (const config of viewportConfigs) {
    const { name, width, height } = config;

    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: name === 'mobile' ? 2 : 1,
    });

    const page = await context.newPage();

    // Navigate and wait for network idle
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for images to load
    await page.waitForTimeout(2000);

    // Full page screenshot
    const screenshotPath = join(outputDir, `${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Captured: ${screenshotPath}`);

    // Above-the-fold screenshot
    const aboveFoldPath = join(outputDir, `${name}_above_fold.png`);
    await page.screenshot({ path: aboveFoldPath, fullPage: false });
    console.log(`Captured above-fold: ${aboveFoldPath}`);

    await context.close();
  }

  await browser.close();
}

// Parse command line arguments
const args = process.argv.slice(2);
const url = args[0] || 'https://magodavidmaestro.com';
const outputDir = args[1] || 'screenshots';

const viewportConfigs = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

console.log(`Capturing screenshots for ${url}...`);
captureScreenshots(url, outputDir, viewportConfigs)
  .then(() => console.log('Done!'))
  .catch(console.error);

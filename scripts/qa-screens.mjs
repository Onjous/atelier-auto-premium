// Responsive QA: full-page screenshots + console errors + horizontal overflow.
// Usage: node scripts/qa-screens.mjs <outDir> <baseUrl> <path,...> [width,...]
// Uses Playwright WebKit by default (QA_ENGINE=chromium to switch); browsers live in
// .cache/ms-playwright via PLAYWRIGHT_BROWSERS_PATH. Chromium's headless shell cannot
// capture screenshots on this macOS build, so WebKit is the default.
import { chromium, webkit } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const [outDir, baseUrl = 'http://localhost:3000', paths = '/', widths = '1440,390'] = process.argv.slice(2);
if (!outDir) {
  console.error('Usage: node scripts/qa-screens.mjs <outDir> [baseUrl] [paths] [widths]');
  process.exit(1);
}
await fs.mkdir(outDir, { recursive: true });

const engine = process.env.QA_ENGINE === 'chromium' ? chromium : webkit;
const browser = await engine.launch();
const report = [];

for (const width of widths.split(',').map(Number)) {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
    hasTouch: width < 768,
  });
  for (const route of paths.split(',')) {
    const page = await context.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(baseUrl + route, { waitUntil: 'networkidle' });
    // Scroll through so reveal and lazy images trigger, then return to top.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 500) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const name = `${route === '/' ? 'home' : route.slice(1).replace(/\W+/g, '_')}-${width}.jpg`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true, type: 'jpeg', quality: 60, timeout: 180_000, animations: 'disabled' });
    report.push({ route, width, overflow, errors });
    await page.close();
  }
  await context.close();
}
await browser.close();
for (const r of report) {
  console.log(`${r.route} @${r.width}: overflow=${r.overflow}px errors=${r.errors.length}${r.errors.length ? `\n  ${r.errors.slice(0, 5).join('\n  ')}` : ''}`);
}

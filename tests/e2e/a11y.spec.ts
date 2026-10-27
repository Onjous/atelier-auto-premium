import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/', '/services', '/services/ceramic-coating', '/portfolio', '/portfolio/ferrari-enzo-concours', '/pricing', '/about', '/journal', '/journal/interior-leather-care', '/faq', '/contact', '/book', '/privacy', '/no-such-page'];

for (const route of routes) {
  test(`no WCAG 2.2 A/AA violations on ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    // Reveal everything so contrast is measured on final states, not mid-transition.
    await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.setAttribute('data-revealed', '')));
    await page.waitForTimeout(500);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} — ${v.nodes[0]?.target.join(' ')}`);
    expect(summary).toEqual([]);
  });
}

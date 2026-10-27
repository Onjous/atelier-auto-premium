import { expect, test, type Page } from '@playwright/test';

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 768;

test.describe('home', () => {
  test('renders the hero and has no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Beyond the');
    await expect(page.getByRole('link', { name: 'Book a Consultation' }).first()).toBeVisible();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test('before/after slider responds to the keyboard', async ({ page }) => {
    await page.goto('/');
    const slider = page.getByRole('slider', { name: /before and after/i });
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2200); // let the one-time hint animation finish
    await slider.focus();
    await page.keyboard.press('Home');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
    await page.keyboard.press('End');
    await expect(slider).toHaveAttribute('aria-valuenow', '100');
    await page.keyboard.press('ArrowLeft');
    await expect(slider).toHaveAttribute('aria-valuenow', '98');
  });

  test('protection cross-section stays visible through every layer selection', async ({ page }) => {
    await page.goto('/');
    const list = page.getByRole('list', { name: 'Paint system layers' });
    await list.scrollIntoViewIfNeeded();
    const figure = page.locator('div').filter({ has: list }).last();
    const bands = figure.locator('[data-reveal="up"]');
    await expect(bands).toHaveCount(6);
    // Regression: re-renders used to strip the reveal marker and hide bands permanently.
    const visibility = () =>
      bands.evaluateAll((els) =>
        els.map((el) => {
          // Effective opacity of the band: product down the element chain.
          let opacity = 1;
          for (let node: Element | null = el; node; node = node.firstElementChild) opacity *= +getComputedStyle(node).opacity;
          return Math.round(opacity * 100) / 100;
        }),
      );

    const names = ['Paint protection film', 'Ceramic coating', 'Clear coat', 'Base coat', 'Primer', 'Panel'];
    for (const name of [...names, ...names, names[0]!]) await list.getByRole('button', { name: new RegExp(name) }).click();
    await expect.poll(visibility, { timeout: 4000 }).toEqual([1, 0.45, 0.45, 0.45, 0.45, 0.45]);

    await list.getByRole('button', { name: /Panel/ }).click();
    await expect.poll(visibility, { timeout: 4000 }).toEqual([0.45, 0.45, 0.45, 0.45, 0.45, 1]);
    await expect(figure.getByRole('button', { name: /Panel/ })).toHaveAttribute('aria-pressed', 'true');
  });

  test('FAQ accordion expands and collapses', async ({ page }) => {
    await page.goto('/faq');
    const q = page.getByRole('button', { name: /Do I need a consultation/ });
    await expect(q).toHaveAttribute('aria-expanded', 'false');
    await q.click();
    await expect(q).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText('take depth readings and agree the scope')).toBeVisible();
    await q.click();
    await expect(q).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('navigation', () => {
  test('primary navigation reaches services and a service detail page', async ({ page }) => {
    await page.goto('/');
    if (isMobile(page)) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('dialog', { name: 'Site menu' }).getByRole('link', { name: /Services/ }).click();
    } else {
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Services' }).click();
    }
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Crafted to protect');
    await page.getByRole('link', { name: 'Explore Ceramic' }).click();
    await expect(page).toHaveURL(/\/services\/ceramic-coating$/);
    await expect(page.getByRole('heading', { name: /What it will not do/i })).toBeVisible();
  });

  test('mobile menu closes with Escape', async ({ page }) => {
    test.skip(!isMobile(page), 'mobile only');
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  test('unknown routes show the custom 404', async ({ page }) => {
    const res = await page.goto('/no-such-page');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Wrong');
  });
});

test.describe('portfolio', () => {
  test('filters by marque, searches, and shows an empty state', async ({ page }) => {
    await page.goto('/portfolio');
    const status = page.getByRole('status').filter({ hasText: 'Showing' });
    await expect(status).toContainText('Showing 17 of 17');

    await page.getByRole('button', { name: /^Ferrari/ }).click();
    await expect(page).toHaveURL(/brand=ferrari/);
    await expect(status).toContainText('Showing 4 of 17');

    await page.getByRole('button', { name: /^PPF/ }).click();
    await expect(status).toContainText('Showing 1 of 17');
    await expect(page.getByRole('heading', { name: 'Ferrari LaFerrari' })).toBeVisible();

    await page.getByRole('button', { name: 'Clear' }).click();
    await page.getByRole('searchbox').fill('huracan');
    await expect(status).toContainText('Showing 1 of 17');

    await page.getByRole('searchbox').fill('no such car');
    await expect(page.getByText('No projects match these filters.')).toBeVisible();
    await page.getByRole('button', { name: 'Show all projects' }).click();
    await expect(status).toContainText('Showing 17 of 17');
  });

  test('restores filters from the URL', async ({ page }) => {
    await page.goto('/portfolio?brand=audi');
    await expect(page.getByRole('status').filter({ hasText: 'Showing' })).toContainText('Showing 2 of 17');
  });

  test('lightbox opens, navigates and closes', async ({ page }) => {
    await page.goto('/portfolio');
    await page.getByRole('button', { name: /View larger image: Porsche 911 Turbo S/ }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Porsche 911 Turbo S');
    await dialog.getByRole('button', { name: 'Next image' }).first().click();
    await expect(dialog).toContainText('Porsche 911 GT3 RS');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('case study links through to the next study', async ({ page }) => {
    await page.goto('/portfolio/porsche-911-turbo-s-graphite');
    await expect(page.getByText('Demonstration case study.')).toBeVisible();
    await page.getByRole('link', { name: /Next study/ }).click();
    await expect(page).toHaveURL(/porsche-911-gt3-rs-track-pack/);
  });
});

test.describe('pricing', () => {
  test('builds an itemised estimate that reacts to size and condition', async ({ page }) => {
    await page.goto('/pricing');
    await page.getByRole('button', { name: /Add Paint Protection Film — Front Protection to estimate/ }).click();
    const summary = page.getByRole('complementary', { name: 'Estimate summary' });
    await expect(summary).toContainText('Front Protection');
    await expect(summary).toContainText(/6\s900\sPLN\s–\s7\s750\sPLN/);

    await page.locator('#estimate').getByText('SUV', { exact: true }).click();
    await expect(summary).toContainText(/8\s950\sPLN/);

    await page.locator('#estimate').getByRole('button', { name: 'Two-Step Correction' }).click();
    await page.locator('#estimate').getByText('Needs attention').click();
    await expect(summary).toContainText('3400 × 1.3 (SUV) × 1.35 (Needs attention)');

    await summary.getByRole('button', { name: 'Reset' }).click();
    await expect(summary).toContainText('Add packages');
  });

  test('preselects a package from the URL', async ({ page }) => {
    await page.goto('/pricing?package=ceramic-advanced#estimate');
    await expect(page.getByRole('complementary', { name: 'Estimate summary' })).toContainText('Advanced');
  });
});

test.describe('booking', () => {
  test('completes the demonstration inquiry with validation and back navigation', async ({ page }) => {
    await page.goto('/book?service=ppf&package=ppf-track&size=sedan');
    await expect(page.getByRole('heading', { name: 'What can we do for you?' })).toBeVisible();
    await expect(page.getByLabel('Track Pack')).toBeChecked();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Tell us about the car.' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'Please check' })).toContainText('Select or enter the vehicle make.');
    await page.getByLabel('Make', { exact: true }).selectOption('Porsche');
    await page.getByLabel('Model').fill('911 GT3 Touring');
    await expect(page.getByLabel(/Sedan/)).toBeChecked();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'When suits you?' })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByLabel('Model')).toHaveValue('911 GT3 Touring');
    await page.getByRole('button', { name: 'Continue' }).click();

    const day = page.locator('button[data-date][aria-disabled="false"]').first();
    await day.click();
    await expect(day).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'How do we reach you?' })).toBeVisible();
    await page.getByLabel('Full name').fill('Alex Example');
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('not-an-email');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'Please check' })).toContainText('valid email');
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('alex@example.com');
    await page.getByLabel(/I agree to be contacted/).check();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Review your inquiry.' })).toBeVisible();
    await expect(page.getByText('Paint Protection Film — Track Pack')).toBeVisible();
    await expect(page.getByText('Porsche 911 GT3 Touring')).toBeVisible();
    await page.getByRole('button', { name: 'Send inquiry (demo)' }).click();

    await expect(page.getByText('Demonstration complete')).toBeVisible();
    await expect(page.getByText(/no booking exists/)).toBeVisible();
    await expect(page.getByText(/DEMO-[0-9A-Z]{6}/)).toBeVisible();
  });
});

test.describe('journal', () => {
  test('filters by category, searches body text, opens an article', async ({ page }) => {
    await page.goto('/journal');
    await page.getByRole('group', { name: 'Filter articles by category' }).getByRole('button', { name: 'Interior' }).click();
    await expect(page.getByRole('status').filter({ hasText: 'article' })).toContainText('1 article in Interior');
    await page.getByRole('group', { name: 'Filter articles by category' }).getByRole('button', { name: 'All' }).click();
    await page.getByRole('searchbox').fill('fingernail');
    await expect(page.getByRole('status').filter({ hasText: 'article' })).toContainText('1 article');
    await page.getByRole('link', { name: /How Paint Correction Works/ }).click();
    await expect(page.getByRole('navigation', { name: 'In this article' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Why we measure first', exact: true })).toBeVisible();
  });
});

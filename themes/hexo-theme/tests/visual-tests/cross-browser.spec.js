const { test, expect } = require('@playwright/test');

test.describe('Cross-browser Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for fonts to load
    await page.addInitScript(() => {
      document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
      });
    });
  });

  test('Homepage renders consistently across browsers', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('Sidebar component renders consistently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const sidebar = page.locator('.developer-sidebar, .sidebar');
    await expect(sidebar).toHaveScreenshot('sidebar-component.png', {
      threshold: 0.2,
    });
  });

  test('Navigation component renders consistently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const nav = page.locator('nav, .navigation');
    await expect(nav).toHaveScreenshot('navigation-component.png', {
      threshold: 0.2,
    });
  });

  test('Content cards render consistently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const cards = page.locator('.card, .post-card, article').first();
    if (await cards.count() > 0) {
      await expect(cards).toHaveScreenshot('content-card.png', {
        threshold: 0.2,
      });
    }
  });
});
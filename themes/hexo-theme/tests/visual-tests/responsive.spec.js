const { test, expect } = require('@playwright/test');

test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1024, height: 768 },
    { name: 'large-desktop', width: 1440, height: 900 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`Layout adapts correctly on ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(`${name}-layout.png`, {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test(`Sidebar behavior on ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const sidebar = page.locator('.developer-sidebar, .sidebar');
      if (await sidebar.count() > 0) {
        await expect(sidebar).toHaveScreenshot(`${name}-sidebar.png`, {
          threshold: 0.2,
        });
      }
    });
  });

  test('Mobile menu functionality', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Look for mobile menu trigger
    const menuTrigger = page.locator('.menu-toggle, .hamburger, [aria-label*="menu"]');
    if (await menuTrigger.count() > 0) {
      await menuTrigger.click();
      await page.waitForTimeout(300);
      
      await expect(page).toHaveScreenshot('mobile-menu-open.png', {
        threshold: 0.2,
      });
    }
  });
});
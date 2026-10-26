import { test, expect } from '@playwright/test';

test('Verify Playwright homepage title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Playwright/);
});
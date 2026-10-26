
import { test, expect } from '@playwright/test';
import { getTestData } from '../utility/testdata.js';

test('Login scenario', async ({ page }) => {
  const data = getTestData('TC002'); // Change TC ID here

  await page.goto('/');

  await page.locator('[data-test="username"]').fill(data.username);
  await page.locator('[data-test="password"]').fill(data.password);
  await page.locator('[data-test="login-button"]').click();

  if (data.expectedResult === 'success') {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log('User successfully logged in');
  } else {
    console.log('Test case:', data.tcId);
console.log('Expected message:', data.expectedResult);
    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(data.expectedResult);

    console.log(`Expected error verified: ${data.scenario}`);
  }
});

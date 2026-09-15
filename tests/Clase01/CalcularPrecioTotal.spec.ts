import { test, expect } from '@playwright/test';

test('Cálculo de precio total en checkout', async ({ page }) => {
  const username = 'standard_user';
  const password = 'secret_sauce';
  const firstName = 'Alex';
  const lastName = 'Guia';
  const postalCode = 'Peru';

  await page.goto('https://www.saucedemo.com');

  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/\/inventory\.html$/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/\/cart\.html$/);

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(page.locator('[data-test="total-label"]')).toContainText('$43.18');
});
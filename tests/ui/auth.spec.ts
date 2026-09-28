import { test } from '@playwright/test';

test.describe('Auth UI', () => {
  test.fixme('logs in with valid credentials', async ({ page }) => {});
  // page.getByRole('textbox', { name: 'Email address' }).fill('nath@gmail.com')
  test.fixme('rejects invalid credentials', async ({ page }) => {});
  test.fixme('logs out successfully', async ({ page }) => {});
  test.fixme('changes the password', async ({ page }) => {});
});

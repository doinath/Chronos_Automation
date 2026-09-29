import { expect, test } from '@playwright/test';
import { AuthWorkflow } from '../workflow/auth.workflow';

test.use({
  channel: process.env.LOGIN_BROWSER_CHANNEL ?? (process.platform === 'win32' ? 'chrome' : undefined),
  permissions: ['notifications'],
});

test.describe('Auth E2E', () => {
  test('logs in with valid credentials', async ({ page }) => {
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;
    if (!email || !password) {
      throw new Error('Set TEST_EMAIL and TEST_PASSWORD in .env to run the login E2E test.');
    }

    const flow = new AuthWorkflow(page);
    await flow.open();
    await flow.login(email, password);

    const allowNotifications = page.getByRole('button', { name: 'Allow Notifications' });
    const dashboardUrl = /\/dashboard\/?(?:[?#]|$)/;

    await expect.poll(async () => {
      if (await allowNotifications.isVisible()) return 'notification modal';
      if (dashboardUrl.test(page.url())) return 'dashboard';
      return 'waiting';
    }, { timeout: 30_000 }).not.toBe('waiting');

    if (await allowNotifications.isVisible()) {
      await allowNotifications.click();
    } else {
      await expect(page).toHaveURL(dashboardUrl);
    }
    await expect(page).toHaveURL(dashboardUrl);
  });

  test('rejects invalid credentials', async ({ page }) => {
    const flow = new AuthWorkflow(page);
    await flow.open();
    await flow.login('nonexistent@example.com', 'WrongPassword123!');

    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('requires an email address', async ({ page }) => {
    const flow = new AuthWorkflow(page);
    await flow.open();
    await flow.login('', 'WrongPassword123!');

    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('requires a password', async ({ page }) => {
    const email = process.env.TEST_EMAIL;
    if (!email) throw new Error('Set TEST_EMAIL in .env to run the empty-password test.');

    const flow = new AuthWorkflow(page);
    await flow.open();
    await flow.login(email, '');

    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('rejects a malformed email address', async ({ page }) => {
    const flow = new AuthWorkflow(page);
    await flow.open();
    await flow.login('not-an-email', 'WrongPassword123!');

    await expect(page.getByText('Invalid email.', { exact: true })).toBeVisible();
  });
});

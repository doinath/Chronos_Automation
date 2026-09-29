import { expect, test, type Page } from '@playwright/test';
import { AuthWorkflow } from '../workflow/auth.workflow';

test.use({
  channel:
    process.env.LOGIN_BROWSER_CHANNEL ?? (process.platform === 'win32' ? 'chrome' : undefined),
  permissions: ['notifications'],
});

async function loginAndExpectDashboard(page: Page, email: string, password: string): Promise<void> {
  const flow = new AuthWorkflow(page);
  await flow.open();
  await flow.login(email, password);

  const allowNotifications = page.getByRole('button', { name: 'Allow Notifications' });
  const dashboardUrl = /\/dashboard\/?(?:[?#]|$)/;

  await expect
    .poll(
      async () => {
        if (await allowNotifications.isVisible()) return 'notification modal';
        if (dashboardUrl.test(page.url())) return 'dashboard';
        return 'waiting';
      },
      { timeout: 30_000 },
    )
    .not.toBe('waiting');

  if (await allowNotifications.isVisible()) {
    await allowNotifications.click();
  } else {
    await expect(page).toHaveURL(dashboardUrl);
  }
  await expect(page).toHaveURL(dashboardUrl);

  const toggleNavigation = page.getByRole('button', { name: 'Toggle Navigation' });
  if (await toggleNavigation.isVisible()) await toggleNavigation.click();
  const dashboardLink = page.getByRole('link', { name: 'Dashboard' });
  await expect(dashboardLink).toBeVisible();
  await expect(dashboardLink).toHaveClass(/(?:^|\s)bg-accent-500(?:\s|$)/);
}

test.describe('Auth E2E', () => {
  test('logs in as admin', async ({ page }) => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.TEST_PASSWORD;
    if (!email || !password) {
      throw new Error('Set ADMIN_EMAIL and TEST_PASSWORD in .env to run the admin login test.');
    }

    await loginAndExpectDashboard(page, email, password);
  });

  test('logs in as employee', async ({ page }) => {
    const email = process.env.EMPLOYEE_EMAIL;
    const password = process.env.EMPLOYEE_PASSWORD;
    if (!email || !password) {
      test.skip(
        true,
        'Employee account is not available yet. Set EMPLOYEE_EMAIL and EMPLOYEE_PASSWORD when ready.',
      );
      return;
    }

    await loginAndExpectDashboard(page, email, password);
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
    const email = process.env.ADMIN_EMAIL;
    if (!email) throw new Error('Set ADMIN_EMAIL in .env to run the empty-password test.');

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

import { expect, test } from '@playwright/test';
import { AuthWorkflow } from '../../auth/workflow/auth.workflow';
import { AttendancesWorkflow } from '../workflow/attendances.workflow';

test.use({
  channel:
    process.env.LOGIN_BROWSER_CHANNEL ?? (process.platform === 'win32' ? 'chrome' : undefined),
  permissions: ['notifications'],
});

test.describe('Attendances E2E', () => {
  test('shows the attendance table headers for admin', async ({ page }) => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.TEST_PASSWORD;
    if (!email || !password) {
      throw new Error('Set ADMIN_EMAIL and TEST_PASSWORD in .env to run the attendance test.');
    }

    const auth = new AuthWorkflow(page);
    await auth.open();
    await auth.login(email, password);

    const allowNotifications = page.getByRole('button', { name: 'Allow Notifications' });
    await expect
      .poll(
        async () => {
          if (await allowNotifications.isVisible()) return 'notification modal';
          if (/\/dashboard\/?(?:[?#]|$)/.test(page.url())) return 'dashboard';
          return 'waiting';
        },
        { timeout: 30_000 },
      )
      .not.toBe('waiting');

    if (await allowNotifications.isVisible()) await allowNotifications.click();
    await expect(page).toHaveURL(/\/dashboard\/?(?:[?#]|$)/);

    const flow = new AttendancesWorkflow(page);
    await flow.open();
    await flow.list();
  });
});

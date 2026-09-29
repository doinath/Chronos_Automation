import { test } from '@playwright/test';
import { NotificationsWorkflow } from '../workflow/notifications.workflow';
test.describe('Notifications E2E', () => {
  test.fixme('opens the notifications module', async ({ page }) => {
    await new NotificationsWorkflow(page).open();
  });
});

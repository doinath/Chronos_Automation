import { test } from '@playwright/test';
import { RequestsWorkflow } from '../workflow/requests.workflow';
test.describe('Requests E2E', () => {
  test.fixme('opens and lists requests', async ({ page }) => {
    const flow = new RequestsWorkflow(page);
    await flow.open();
    await flow.list();
  });
});

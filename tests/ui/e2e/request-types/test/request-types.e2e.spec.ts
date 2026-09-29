import { test } from '@playwright/test';
import { RequestTypesWorkflow } from '../workflow/request-types.workflow';
test.describe('Request Types E2E', () => {
  test.fixme('opens and lists request types', async ({ page }) => {
    const flow = new RequestTypesWorkflow(page);
    await flow.open();
    await flow.list();
  });
});

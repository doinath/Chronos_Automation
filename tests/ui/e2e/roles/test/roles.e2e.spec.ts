import { test } from '@playwright/test';
import { RolesWorkflow } from '../workflow/roles.workflow';
test.describe('Roles E2E', () => {
  test.fixme('opens and lists roles', async ({ page }) => {
    const flow = new RolesWorkflow(page);
    await flow.open();
    await flow.list();
  });
});

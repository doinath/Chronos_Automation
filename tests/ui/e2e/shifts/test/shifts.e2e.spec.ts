import { test } from '@playwright/test';
import { ShiftsWorkflow } from '../workflow/shifts.workflow';
test.describe('Shifts E2E', () => {
  test.fixme('opens and lists shifts', async ({ page }) => {
    const flow = new ShiftsWorkflow(page);
    await flow.open();
    await flow.list();
  });
});

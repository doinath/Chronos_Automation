import { test } from '@playwright/test';
import { EmploymentTypesWorkflow } from '../workflow/employment-types.workflow';
test.describe('Employment Types E2E', () => {
  test.fixme('opens and lists employment types', async ({ page }) => {
    const flow = new EmploymentTypesWorkflow(page);
    await flow.open();
    await flow.list();
  });
});

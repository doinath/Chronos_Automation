import { test } from '@playwright/test';
import { DepartmentsWorkflow } from '../workflow/departments.workflow';

test.describe('Departments E2E', () => {
  test.fixme('creates, views, updates, and deletes a department', async ({ page }) => {
    const departments = new DepartmentsWorkflow(page);

    await departments.open();
    await departments.createDepartment({ name: 'QA Department', description: 'E2E test data' });
    await departments.viewDepartment('QA Department');
    await departments.updateDepartment('QA Department', { description: 'Updated E2E test data' });
    await departments.deleteDepartment('QA Department');
  });
});

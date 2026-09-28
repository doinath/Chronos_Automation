import { test } from '@playwright/test';
import { EmployeesWorkflow } from '../workflow/employees.workflow';
test.describe('Employees E2E', () => { test.fixme('opens and lists employees', async ({ page }) => { const flow = new EmployeesWorkflow(page); await flow.open(); await flow.list(); }); });

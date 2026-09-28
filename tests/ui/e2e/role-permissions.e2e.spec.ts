import { test } from '@playwright/test';
import { RolePermissionsWorkflow } from '../workflow/role-permissions.workflow';
test.describe('Role Permissions E2E', () => { test.fixme('opens and lists role permissions', async ({ page }) => { const flow = new RolePermissionsWorkflow(page); await flow.open(); await flow.list(); }); });

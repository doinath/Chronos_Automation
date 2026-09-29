import { test } from '@playwright/test';
import { PermissionsWorkflow } from '../workflow/permissions.workflow';
test.describe('Permissions E2E', () => { test.fixme('opens and lists permissions', async ({ page }) => { const flow = new PermissionsWorkflow(page); await flow.open(); await flow.list(); }); });

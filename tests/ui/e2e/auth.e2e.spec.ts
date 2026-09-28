import { test } from '@playwright/test';
import { AuthWorkflow } from '../workflow/auth.workflow';
test.describe('Auth E2E', () => { test.fixme('logs in and logs out', async ({ page }) => { const flow = new AuthWorkflow(page); await flow.open(); await flow.login('user@example.com', 'password'); await flow.logout(); }); });

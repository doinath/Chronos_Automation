import { test } from '@playwright/test';
import { AppWorkflow } from '../workflow/app.workflow';
test.describe('App E2E', () => { test.fixme('loads the application shell', async ({ page }) => { await new AppWorkflow(page).open(); }); });

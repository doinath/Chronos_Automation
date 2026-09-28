import { test } from '@playwright/test';
import { ExportsWorkflow } from '../workflow/exports.workflow';
test.describe('Exports E2E', () => { test.fixme('opens the exports module', async ({ page }) => { await new ExportsWorkflow(page).open(); }); });

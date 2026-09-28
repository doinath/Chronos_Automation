import { test } from '@playwright/test';
import { InternshipDetailsWorkflow } from '../workflow/internship-details.workflow';
test.describe('Internship Details E2E', () => { test.fixme('opens and lists internship details', async ({ page }) => { const flow = new InternshipDetailsWorkflow(page); await flow.open(); await flow.list(); }); });

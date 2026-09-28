import { test } from '@playwright/test';
import { AttendancesWorkflow } from '../workflow/attendances.workflow';
test.describe('Attendances E2E', () => { test.fixme('opens and lists attendances', async ({ page }) => { const flow = new AttendancesWorkflow(page); await flow.open(); await flow.list(); }); });

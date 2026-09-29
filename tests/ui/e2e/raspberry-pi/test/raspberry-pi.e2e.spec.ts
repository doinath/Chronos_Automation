import { test } from '@playwright/test';
import { RaspberryPiWorkflow } from '../workflow/raspberry-pi.workflow';
test.describe('Raspberry Pi E2E', () => {
  test.fixme('opens the Raspberry Pi module', async ({ page }) => {
    await new RaspberryPiWorkflow(page).open();
  });
});

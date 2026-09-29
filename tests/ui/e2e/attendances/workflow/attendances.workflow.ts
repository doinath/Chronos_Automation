import { expect, type Page } from '@playwright/test';
import { ModuleWorkflow } from '../../shared/module.workflow';

export class AttendancesWorkflow extends ModuleWorkflow {
  constructor(private readonly page: Page) {
    super(page, '/dashboard/attendance');
  }

  override async list(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard\/attendance\/?(?:[?#]|$)/);
    const table = this.page.locator('div.table-body-overlay-host');
    await expect(table).toBeVisible();
    await expect(table.getByRole('columnheader')).toHaveText(
      [
        '#',
        'Employee',
        'Department',
        'Date',
        'Clock In',
        'Clock Out',
        'Total Hours',
        'Status',
        'Remarks',
        'Actions',
      ].map((header) => new RegExp(`^\\s*${header}\\s*$`)),
    );
  }
}

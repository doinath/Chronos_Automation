import type { Page } from '@playwright/test';
import { Workflow } from '../../shared/workflow';
export class AppWorkflow extends Workflow {
  constructor(page: Page) {
    super(page);
  }
  async open(): Promise<void> {
    await this.basePage.goto('/');
  }
}

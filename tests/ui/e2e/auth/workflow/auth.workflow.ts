import type { Page } from '@playwright/test';
import { Workflow } from '../../shared/workflow';

export class AuthWorkflow extends Workflow {
  constructor(page: Page) {
    super(page);
  }
  async open(): Promise<void> {
    await this.basePage.goto('/login');
  }
  async login(email: string, password: string): Promise<void> {
    await this.basePage.fillByRole('textbox', 'Email address', email);
    await this.basePage.fillByLabel('Password', password);
    await this.basePage.clickByRole('button', 'Login');
  }
  async logout(): Promise<void> {
    /* TODO: open account menu and sign out. */
  }
}

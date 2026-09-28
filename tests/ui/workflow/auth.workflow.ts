import type { Page } from '@playwright/test';
import { Workflow } from './workflow';
export class AuthWorkflow extends Workflow {
  constructor(page: Page) { super(page); }
  async open(): Promise<void> { await this.basePage.goto('/login'); }
  async login(email: string, password: string): Promise<void> { /* TODO: fill and submit login form. */ void email; void password; }
  async logout(): Promise<void> { /* TODO: open account menu and sign out. */ }
}

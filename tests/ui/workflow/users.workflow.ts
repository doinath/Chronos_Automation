import type { Page } from '@playwright/test';
import { Workflow } from './workflow';

export type UserData = {
  name: string;
  email: string;
  password?: string;
};

export class UsersWorkflow extends Workflow {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    // TODO: replace with the confirmed UI route.
    await this.basePage.goto('/users');
  }

  async createUser(data: UserData): Promise<void> {
    // TODO: add navigation, form filling, submit, and success assertions.
    void data;
  }

  async viewUser(name: string): Promise<void> {
    // TODO: add the row/card navigation for the user.
    void name;
  }

  async updateUser(name: string, data: Partial<UserData>): Promise<void> {
    // TODO: add edit flow and assertions.
    void name;
    void data;
  }

  async deleteUser(name: string): Promise<void> {
    // TODO: add delete flow and confirmation assertions.
    void name;
  }
}

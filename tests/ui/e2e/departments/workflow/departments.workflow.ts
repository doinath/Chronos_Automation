import type { Page } from '@playwright/test';
import { Workflow } from '../../shared/workflow';

export type DepartmentData = {
  name: string;
  description?: string;
};

export class DepartmentsWorkflow extends Workflow {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    // TODO: replace with the confirmed UI route.
    await this.basePage.goto('/departments');
  }

  async createDepartment(data: DepartmentData): Promise<void> {
    // TODO: add navigation, form filling, submit, and success assertions.
    void data;
  }

  async viewDepartment(name: string): Promise<void> {
    // TODO: add the row/card navigation for the department.
    void name;
  }

  async updateDepartment(name: string, data: Partial<DepartmentData>): Promise<void> {
    // TODO: add edit flow and assertions.
    void name;
    void data;
  }

  async deleteDepartment(name: string): Promise<void> {
    // TODO: add delete flow and confirmation assertions.
    void name;
  }
}

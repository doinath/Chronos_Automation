import type { Page } from '@playwright/test';
import { Workflow } from './workflow';

export class ModuleWorkflow extends Workflow {
  constructor(
    page: Page,
    private readonly route: string,
  ) {
    super(page);
  }

  async open(): Promise<void> {
    // TODO: replace with the confirmed UI route.
    await this.basePage.goto(this.route);
  }

  async list(): Promise<void> {
    // TODO: add list/table assertions.
  }

  async create(data?: unknown): Promise<void> {
    // TODO: add create form actions and assertions.
    void data;
  }

  async view(identifier: string): Promise<void> {
    // TODO: add row/card navigation and assertions.
    void identifier;
  }

  async update(identifier: string, data?: unknown): Promise<void> {
    // TODO: add edit actions and assertions.
    void identifier;
    void data;
  }

  async remove(identifier: string): Promise<void> {
    // TODO: add delete actions, confirmation, and assertions.
    void identifier;
  }
}

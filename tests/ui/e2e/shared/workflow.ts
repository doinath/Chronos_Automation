import type { Page } from '@playwright/test';
import { BasePage } from '../../pages/base-page';

/** Shared foundation for module workflows. */
export abstract class Workflow {
  protected readonly basePage: BasePage;

  constructor(page: Page) {
    this.basePage = new BasePage(page);
  }
}

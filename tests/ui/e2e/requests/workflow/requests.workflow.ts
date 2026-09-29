import type { Page } from '@playwright/test';
import { ModuleWorkflow } from '../../shared/module.workflow';
export class RequestsWorkflow extends ModuleWorkflow {
  constructor(page: Page) {
    super(page, '/requests');
  }
}

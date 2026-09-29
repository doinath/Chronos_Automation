import type { Page } from '@playwright/test';
import { ModuleWorkflow } from '../../shared/module.workflow';
export class RolePermissionsWorkflow extends ModuleWorkflow {
  constructor(page: Page) {
    super(page, '/role-permissions');
  }
}

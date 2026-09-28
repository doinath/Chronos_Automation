import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class RolePermissionsWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/role-permissions'); } }

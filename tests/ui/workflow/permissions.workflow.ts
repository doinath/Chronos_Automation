import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class PermissionsWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/permissions'); } }

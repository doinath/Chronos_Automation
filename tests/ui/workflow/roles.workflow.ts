import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class RolesWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/roles'); } }

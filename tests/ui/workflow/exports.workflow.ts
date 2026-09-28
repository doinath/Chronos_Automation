import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class ExportsWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/exports'); } }

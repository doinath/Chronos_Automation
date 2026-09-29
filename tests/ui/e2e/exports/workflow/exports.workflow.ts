import type { Page } from '@playwright/test';
import { ModuleWorkflow } from '../../shared/module.workflow';
export class ExportsWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/exports'); } }

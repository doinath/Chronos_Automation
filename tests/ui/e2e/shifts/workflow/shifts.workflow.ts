import type { Page } from '@playwright/test';
import { ModuleWorkflow } from '../../shared/module.workflow';
export class ShiftsWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/shifts'); } }

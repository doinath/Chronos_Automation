import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class AttendancesWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/attendances'); } }

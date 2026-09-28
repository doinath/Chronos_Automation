import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class EmploymentTypesWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/employment-types'); } }

import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class EmployeesWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/employees'); } }

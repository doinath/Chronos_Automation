import type { Page } from '@playwright/test';
import { ModuleWorkflow } from '../../shared/module.workflow';
export class InternshipDetailsWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/internship-details'); } }

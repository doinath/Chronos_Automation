import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class RequestsWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/requests'); } }

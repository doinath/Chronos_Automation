import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class RequestTypesWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/request-types'); } }

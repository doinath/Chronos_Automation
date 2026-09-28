import type { Page } from '@playwright/test';
import { ModuleWorkflow } from './module.workflow';
export class RaspberryPiWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/raspi'); } }

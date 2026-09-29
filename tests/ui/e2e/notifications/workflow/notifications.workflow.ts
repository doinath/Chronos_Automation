import type { Page } from '@playwright/test';
import { ModuleWorkflow } from '../../shared/module.workflow';
export class NotificationsWorkflow extends ModuleWorkflow { constructor(page: Page) { super(page, '/notifications'); } }

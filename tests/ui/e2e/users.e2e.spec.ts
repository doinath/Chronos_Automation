import { test } from '@playwright/test';
import { UsersWorkflow } from '../workflow/users.workflow';

test.describe('Users E2E', () => {
  test.fixme('creates, views, updates, and deletes a user', async ({ page }) => {
    const users = new UsersWorkflow(page);

    await users.open();
    await users.createUser({
      name: 'E2E Test User',
      email: 'e2e.user@example.com',
      password: 'ChangeMe123!',
    });
    await users.viewUser('E2E Test User');
    await users.updateUser('E2E Test User', { name: 'Updated E2E Test User' });
    await users.deleteUser('Updated E2E Test User');
  });
});

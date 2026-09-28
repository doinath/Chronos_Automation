import { test as base, expect, type APIRequestContext } from '@playwright/test';

type ApiFixtures = {
  api: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  api: async ({ request }, use) => {
    await use(request);
  },
});

export { expect };

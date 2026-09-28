import { test, expect } from '../fixtures';

test.describe('API-1 smoke checks', () => {
  test('GET /api is available', async ({ api }) => {
    const response = await api.get('api');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});

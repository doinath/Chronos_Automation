import { test, expect } from '../fixtures';
import { getModuleOperations, validateOperation } from './support/module-contract';
const moduleName = 'EmploymentTypes';
const operations = getModuleOperations(moduleName);
test.describe(`${moduleName} module contract`, () => {
  test('is present in the API definition', () => expect(operations.length).toBeGreaterThan(0));
  for (const item of operations)
    test(`${item.method.toUpperCase()} ${item.route}`, () =>
      validateOperation(item.operation, moduleName, expect));
});

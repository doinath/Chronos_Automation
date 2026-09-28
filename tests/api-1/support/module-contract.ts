import fs from 'node:fs';
import path from 'node:path';
type OpenApiOperation = {
  operationId?: string;
  tags?: string[];
  parameters?: Array<{ name?: string; in?: string }>;
  responses?: Record<string, unknown>;
};

type OpenApiDocument = {
  paths: Record<string, Record<string, OpenApiOperation | unknown>>;
};

const methods = new Set(['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace']);
const documentPath = path.resolve(process.cwd(), 'api-1 (4).json');
const document = JSON.parse(fs.readFileSync(documentPath, 'utf8')) as OpenApiDocument;

export type ModuleOperation = {
  route: string;
  method: string;
  operation: OpenApiOperation;
};

export function getModuleOperations(moduleName: string): ModuleOperation[] {
  return Object.entries(document.paths).flatMap(([route, pathItem]) =>
    Object.entries(pathItem)
      .filter(([method]) => methods.has(method))
      .map(([method, operation]) => ({
        route,
        method,
        operation: operation as OpenApiOperation,
      }))
      .filter(({ operation }) => operation.tags?.includes(moduleName)),
  );
}

export function validateOperation(operation: ModuleOperation['operation'], moduleName: string, expect: any) {
  expect(operation.operationId, 'operationId is required').toBeTruthy();
  expect(operation.tags).toContain(moduleName);
  expect(operation.responses, 'operation must define responses').toBeTruthy();
  expect(Object.keys(operation.responses ?? {}).length).toBeGreaterThan(0);

  const parameters = operation.parameters ?? [];
  const parameterKeys = parameters.map((parameter) => `${parameter.in}:${parameter.name}`);
  expect(new Set(parameterKeys).size, 'operation has duplicate parameters').toBe(parameterKeys.length);
}

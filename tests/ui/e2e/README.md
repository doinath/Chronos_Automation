# Workflow-driven E2E tests

Each feature lives under `tests/ui/e2e/<feature>/`:

```text
<feature>/
  workflow/<feature>.workflow.ts
  test/<feature>.e2e.spec.ts
```

Feature tests import their sibling workflow. Shared `Workflow` and `ModuleWorkflow` bases live in `tests/ui/e2e/shared/`, and reusable page helpers remain in `tests/ui/pages/`.

Keep test data and scenarios in the spec; put reusable actions in the feature workflow.

Run a single module with `npm run test:ui:<module>` (for example, `npm run test:ui:attendances`). API modules use `npm run test:api:<module>`. The existing `npm run test:login` shortcut still runs the UI auth tests. Many UI module specs are currently marked `test.fixme`, so their scripts will report skipped tests until those workflows are implemented.

To run the login tests, set `DEV_URL`, `ADMIN_EMAIL`, and `TEST_PASSWORD` in the root `.env` file, then run `npm run test:login`. The admin test uses those credentials. The employee test is skipped until `EMPLOYEE_EMAIL` and `EMPLOYEE_PASSWORD` are set. On Windows, the tests use installed Chrome by default and grant notification permission in the browser context. The `--debug` script runs headed, so using Playwright's bundled Chromium instead requires the full browser installed with `npx playwright install chromium` (not `--only-shell`).

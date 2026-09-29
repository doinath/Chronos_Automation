# Workflow-driven E2E tests

E2E specs should compose actions from `tests/ui/workflow/` rather than repeating navigation and form interactions.

Recommended pattern:

1. Add reusable actions to a module workflow.
2. Keep test data and business scenarios in the E2E spec.
3. Put page-specific locators and assertions in the workflow or a page object.

To run the login test, set `DEV_URL`, `TEST_EMAIL`, and `TEST_PASSWORD` in the root `.env` file, then run `npm run test:login`. On Windows, this uses the installed Chrome by default; the test grants notification permission in its browser context. The `--debug` script runs headed, so using Playwright's bundled Chromium instead requires the full browser installed with `npx playwright install chromium` (not `--only-shell`).

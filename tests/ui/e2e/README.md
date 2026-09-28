# Workflow-driven E2E tests

E2E specs should compose actions from `tests/ui/workflow/` rather than repeating navigation and form interactions.

Recommended pattern:

1. Add reusable actions to a module workflow.
2. Keep test data and business scenarios in the E2E spec.
3. Put page-specific locators and assertions in the workflow or a page object.

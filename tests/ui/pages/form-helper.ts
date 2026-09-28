import { expect, type AriaRole, type Locator, type Page } from '@playwright/test';

export type Role = AriaRole;

export class FormHelper {
  constructor(protected readonly page: Page) {}

  async expectIsVisible(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await expect(element).toBeVisible();
  }

  async click(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click();
  }

  async checkForError(errorTexts: string[]): Promise<boolean> {
    for (const errorText of errorTexts) {
      if (await this.page.getByText(errorText, { exact: true }).isVisible().catch(() => false)) {
        return true;
      }
    }
    return false;
  }

  async checkIfEmpty(role: Role, fieldName: string): Promise<boolean> {
    const field = this.page.getByRole(role, { name: fieldName, exact: true });
    return (await field.inputValue().catch(() => '')).trim() === '';
  }

  async handleInputField(role: Role, fieldName: string, value = ''): Promise<void> {
    const field = this.page.getByRole(role, { name: fieldName, exact: true });
    await field.fill(value);
  }
}

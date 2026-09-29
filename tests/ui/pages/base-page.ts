import { expect, type Locator, type Page } from '@playwright/test';
import { FormHelper, type Role } from './form-helper';

export type FieldRole = 'textbox' | 'combobox' | 'checkbox' | 'radio' | 'spinbutton';
export type FieldHandlerType = 'input' | 'dropdown';

export interface fieldMapping {
  errorTexts: string[];
  role: FieldRole;
  fieldName: string;
  value?: string;
  handler: FieldHandlerType;
  optionName?: string;
  [key: string]: unknown;
}

// PascalCase alias for consumers that prefer conventional TypeScript naming.
export type FieldMapping = fieldMapping;

export class BasePage extends FormHelper {
  protected readonly baseURL: string;

  constructor(page: Page) {
    super(page);
    this.baseURL = process.env.DEV_URL ?? '';
  }

  async goto(path = ''): Promise<void> {
    if (!path) {
      await this.page.goto(this.baseURL || '/');
      return;
    }

    if (/^https?:\/\//i.test(path)) {
      await this.page.goto(path);
      return;
    }

    const normalizedBase = this.baseURL.replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    await this.page.goto(this.baseURL ? `${normalizedBase}${normalizedPath}` : normalizedPath);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForFullLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToModule(moduleName: string, options?: { role?: Role; timeout?: number }): Promise<void> {
    const moduleLink = this.page.getByRole(options?.role ?? 'link', { name: moduleName });
    await expect(moduleLink).toBeVisible({ timeout: options?.timeout ?? 10_000 });
    await moduleLink.click();
    await this.waitForNetworkIdle();
  }

  async expectToBeDisabled(locator: Locator, timeout = 5000): Promise<void> {
    await expect(locator).toBeDisabled({ timeout });
  }

  async triggerSinglePageNav(locator: Locator): Promise<void> {
    await this.expectIsVisible(locator);
    await this.click(locator);
    await this.waitForNetworkIdle();
  }

  async handlePopup(triggerAction: () => Promise<void>): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup');
    await triggerAction();
    return popupPromise;
  }

  async click(locator: Locator | string, timeout = 30_000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
  }

  async clickByRole(role: Role, name: string): Promise<void> {
    await this.click(this.page.getByRole(role, { name }));
  }

  async fillByRole(role: Role, name: string, text: string, exact = false): Promise<void> {
    const element = this.page.getByRole(role, { name, exact });
    await element.fill(text);
  }

  async fillByLabel(name: string, text: string): Promise<void> {
    await this.page.getByLabel(name, { exact: true }).fill(text);
  }

  async fill(locator: Locator | string, text: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.fill(text);
  }

  async enter(locator: Locator, text: string): Promise<void> {
    await this.fill(locator, text);
    await locator.press('Enter');
    await expect(locator).toHaveValue(text);
  }

  async selectFromDropdown(dropdownTrigger: Locator | string, option: Locator): Promise<void> {
    const trigger = typeof dropdownTrigger === 'string' ? this.page.locator(dropdownTrigger) : dropdownTrigger;
    await trigger.click();
    await option.click();
  }

  async getText(locator: Locator | string): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return (await element.textContent()) || '';
  }

  async clickGetText(text: string): Promise<void> {
    await this.page.getByText(text).click();
  }

  async clickButtonInModal(modalLocator: Locator, name: string, role: 'button' | 'link' = 'button'): Promise<void> {
    const element = modalLocator.getByRole(role, { name });
    await expect(element).toBeVisible();
    await element.click();
  }

  async isVisible(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return element.isVisible();
  }

  async expectIsVisible(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await expect(element).toBeVisible();
  }

  async waitForInvisibility(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'hidden' });
  }

  async expectToBeHidden(locator: Locator | string, timeout = 30_000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'hidden', timeout });
    await expect(element).toBeHidden();
  }

  async isEnabled(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return element.isEnabled();
  }

  async waitForElement(locator: Locator | string, options?: { timeout?: number }): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout: options?.timeout ?? 10_000 });
  }

  async checkLocatorVisible(locator: string): Promise<void> {
    await expect(this.page.locator(locator).first()).toBeVisible();
  }

  async checkRoleVisible(role: Role, name = ''): Promise<void> {
    await expect(this.page.getByRole(role, { name }).nth(0)).toBeVisible();
  }

  async checkByText(name = ''): Promise<void> {
    await expect(this.page.getByText(name, { exact: true })).toBeVisible();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async checkAndResolveErrors(mappings: FieldMapping[] | Record<string, FieldMapping[]>): Promise<void> {
    const steps = Array.isArray(mappings) ? { default: mappings } : mappings;
    for (const fields of Object.values(steps)) {
      for (const mapping of fields) {
        if (await this.checkForError(mapping.errorTexts) || await this.checkIfEmpty(mapping.role, mapping.fieldName)) {
          await this.handleMappedField(mapping);
        }
      }
    }
  }

  async handleMappedField(mapping: FieldMapping): Promise<void> {
    if (mapping.handler === 'input') {
      await this.handleInputField(mapping.role, mapping.fieldName, mapping.value);
      return;
    }
    if (mapping.handler === 'dropdown') {
      const dropdown = this.page.getByRole(mapping.role, { name: mapping.fieldName, exact: true });
      await dropdown.click();
      if (mapping.value) await dropdown.fill(mapping.value);
      if (mapping.optionName) await this.page.getByRole('option', { name: mapping.optionName }).click();
      return;
    }
    throw new Error(`Unsupported field handler: ${mapping.handler}`);
  }
}

import { expect, Page } from '@playwright/test';
import { dashboard_locator } from './locators';

export class HelperFunctions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async safeGoto(url: string) {
    try {
      await this.page.goto(url);
      await this.page.waitForLoadState('networkidle');
    } catch (err) {
      console.error(`Failed to navigate to ${url}:`);
    }
  }

  async safeClick(selector: string) {
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 15000 });
      await element.click();
      //await this.page.waitForLoadState('networkidle');
    } catch (err) {
      console.error(`Failed to click on ${selector}:`);
    }
  }

  async safeHover(selector: string) {
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 15000 });
      await element.hover();

    } catch (err) {
      console.error(`Failed to hover on ${selector}:`);
    }
  }
  async clickByText(selector: string) {
    try {
      const element = this.page.getByText(selector);
      await element.waitFor({ state: 'visible', timeout: 15000 });
      await element.click();
    } catch (err) {
      console.error(`Failed to hover on ${selector}:`);
    }
  }

  async safeFill(selector: string, value: string) {
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 15000 });
      await element.fill(value);

    } catch (err) {
      console.error(`Failed to fill input ${selector}:`);
    }
  }

  async skipBilling() {
    try {
      await this.page.waitForSelector(dashboard_locator.skip_billing, { state: 'visible', timeout: 5000 });
      const skipBillingLocator = this.page.locator(dashboard_locator.skip_billing);
      const isInViewport = await skipBillingLocator.isVisible();
      if (isInViewport) {
        await skipBillingLocator.click();
      }
    } catch (error) {
      console.log('Free Product');
    }
  }

}

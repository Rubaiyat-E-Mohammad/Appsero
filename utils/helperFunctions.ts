import { expect, Page } from '@playwright/test';
import { dashboard_locator } from './locators';

export class HelperFunctions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async skipBilling() {
    try {
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForSelector(dashboard_locator.skip_billing, { state: 'visible', timeout: 3000 });
      const skipBillingLocator = this.page.locator(dashboard_locator.skip_billing);
      const isInViewport = await skipBillingLocator.isVisible();

      if (isInViewport) {
        await skipBillingLocator.click();
      }
    } catch (err) {

      console.log('');
    }
  }



}
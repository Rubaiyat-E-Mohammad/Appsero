import { Page, expect } from '@playwright/test';
import { bundle_locator, product_finding_locator } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions.ts';
import { URL } from '../utils/locators';

export class BundleUpdate {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async bundle_update(updateable_bundle_name, new_bundle_name) {

    await this.page.goto(URL as string);
    await this.page.locator(product_finding_locator.bundle_navigate).click();
    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(updateable_bundle_name);
    await this.page.locator('(//h3[text()="' + updateable_bundle_name + '"])[1]').click();

    const helper = new HelperFunctions(this.page);
    await helper.skipBilling();
    
    await this.page.locator(product_finding_locator.settings).click();
    await this.page.locator(product_finding_locator.edit).click();
    await this.page.locator(product_finding_locator.name).fill(new_bundle_name);
    await this.page.locator(product_finding_locator.update_bundle).click();

  }
}
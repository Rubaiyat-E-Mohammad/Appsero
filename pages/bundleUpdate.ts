import { Page, expect } from '@playwright/test';
import { product_finding_locator } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions.ts';
import { URL } from '../utils/locators';

export class BundleUpdate {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async bundle_update(updateable_bundle_name, new_bundle_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);
    await helper.safeClick(product_finding_locator.bundle_navigate);
    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, updateable_bundle_name);
    await helper.safeClick('(//h3[text()="' + updateable_bundle_name + '"])[1]');
    await helper.skipBilling();
    await helper.safeClick(product_finding_locator.settings);
    await helper.safeClick(product_finding_locator.edit);
    await helper.safeFill(product_finding_locator.name, new_bundle_name);
    await helper.safeClick(product_finding_locator.update_bundle);

  }
}
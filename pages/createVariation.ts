import { expect, Page } from '@playwright/test';
import { product_finding_locator, variation_locator } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';
import { URL } from '../utils/locators';

export class CreateVariationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async create_variation(product_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);
    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, product_name);
    await helper.safeClick('//h3[text()="' + product_name + '"]');
    await helper.skipBilling();
    await this.page.locator(product_finding_locator.settings).click();
    await helper.safeClick(variation_locator.pricing);
    await this.page.getByText(variation_locator.add_new).nth(1).click();
    await helper.safeFill(variation_locator.variation_name, "Test Variation");
    await helper.safeFill(variation_locator.site_limit, "10");
    await helper.safeFill(variation_locator.variation_price, "1");
    await helper.safeFill(variation_locator.recurring_times, "100");
    await helper.safeClick(variation_locator.submit);
    await expect(await this.page.locator(variation_locator.success_message).innerText()).toEqual("Variations has been updated.");
  }
  

}
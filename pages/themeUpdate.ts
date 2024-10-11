import { Page, expect } from '@playwright/test';
import { product_finding_locator } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions.ts';
import { URL } from '../utils/locators';


export class ThemeUpdate {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async free_theme_update(updateable_theme_name, new_theme_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);
    await helper.safeClick(product_finding_locator.theme_navigate);
    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, updateable_theme_name);
    await helper.safeClick('(//h3[text()="' + updateable_theme_name + '"])[1]');
    await this.page.waitForLoadState("networkidle");
    await helper.skipBilling();
    await helper.safeClick(product_finding_locator.settings);
    await helper.safeClick(product_finding_locator.edit);

    await helper.safeFill(product_finding_locator.name, new_theme_name);
    await helper.safeClick(product_finding_locator.update_theme);

  };

  async pro_theme_update(updateable_theme_name, new_theme_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);
    await helper.safeClick(product_finding_locator.theme_navigate);
    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, updateable_theme_name);
    await helper.safeClick('(//h3[text()="' + updateable_theme_name + '"])[1]');
    await this.page.waitForLoadState("networkidle");
    await helper.skipBilling();
    await helper.safeClick(product_finding_locator.settings);
    await helper.safeClick(product_finding_locator.edit);

    await helper.safeFill(product_finding_locator.name, new_theme_name);
    await helper.safeClick(product_finding_locator.update_theme);

  };

}
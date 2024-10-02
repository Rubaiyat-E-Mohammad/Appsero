import { expect, Page } from '@playwright/test';
import { plugin_locator, product_finding_locator } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions.ts';
import { URL } from '../utils/locators';
class PluginUpdate{
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  

  async plugin_update(plugin_name, new_plugin_name) {

    await this.page.goto(URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.plugin_navigate).click();
    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(plugin_name);
    await this.page.locator('(//h3[text()="' + plugin_name + '"])[1]').click();
    const helper = new HelperFunctions(this.page);
    await helper.skipBilling();
    await this.page.locator(product_finding_locator.settings).click();
    await this.page.locator(product_finding_locator.edit).click();

    await this.page.locator(plugin_locator.name).fill(new_plugin_name);
    await this.page.locator(product_finding_locator.update_plugin).click();
    

  };

}


export { PluginUpdate };
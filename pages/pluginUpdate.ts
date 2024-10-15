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

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);

    await helper.safeClick(product_finding_locator.plugin_navigate);
    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, plugin_name);
    await helper.safeClick('(//h3[text()="' + plugin_name + '"])[1]');
    await helper.skipBilling();
    await this.page.locator(product_finding_locator.settings).click();
    await helper.safeClick(product_finding_locator.edit);

    await helper.safeFill(plugin_locator.name, new_plugin_name);
    await helper.safeClick(product_finding_locator.update_plugin);
    

  };

}


export { PluginUpdate };
import { expect, Page } from '@playwright/test';
import { plugin_locator } from '../utils/locators';
import { URL } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';
class PluginCreate{
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async free_plugin_create(plugin_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);

    await helper.safeClick(plugin_locator.navigate);
    await helper.safeClick(plugin_locator.add_plugin);
    await helper.safeClick(plugin_locator.free_plugin);
    await helper.safeClick(plugin_locator.manual_entry);

    await helper.safeFill(plugin_locator.name, plugin_name);
    await helper.safeFill(plugin_locator.slug, (((plugin_name.split(" ")).join("_")).toLowerCase()));

    await helper.safeClick(plugin_locator.submit);
    await helper.safeClick(plugin_locator.skip);
    //await helper.safeClick(plugin_locator.skip);
    await helper.safeClick(plugin_locator.next);
    await helper.safeClick(plugin_locator.done);
    await helper.safeClick(plugin_locator.complete);

    await expect(await this.page.locator(plugin_locator.check_product)).toHaveText("Get Started");

  };


  async pro_plugin_create(plugin_name, website_url, product_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);

    await helper.safeClick(plugin_locator.navigate);
    await helper.safeClick(plugin_locator.add_plugin);
    await helper.safeClick(plugin_locator.pro_plugin);

    await helper.safeFill(plugin_locator.name, plugin_name);
    await helper.safeFill(plugin_locator.slug, (((plugin_name.split(" ")).join("_")).toLowerCase()));

    await helper.safeClick(plugin_locator.submit);

    await helper.safeClick(plugin_locator.yes);
    await helper.safeClick(plugin_locator.wcom_map);
    await helper.safeClick(plugin_locator.use_appsero);
    await helper.safeClick(plugin_locator.select_website);
    await helper.safeClick('//li[contains(text(),"' + website_url + '")]');
    await helper.safeClick(plugin_locator.select_product);
    await helper.safeClick('//li[contains(text(),"' + product_name + '")]');

    await helper.safeClick(plugin_locator.next);
    await expect(this.page.locator('//h2[text()="Installation Method"]')).toHaveText("Installation Method");
    await helper.safeClick(plugin_locator.next);

    await helper.safeClick(plugin_locator.done);
    await helper.safeClick(plugin_locator.complete);

    await expect(await this.page.locator(plugin_locator.check_product)).toHaveText("Get Started");

    await helper.skipBilling();
  };

}


export { PluginCreate };
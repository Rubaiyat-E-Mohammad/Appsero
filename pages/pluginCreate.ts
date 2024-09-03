import { expect, Page } from '@playwright/test';
import { plugin_locator, product_finding_locator } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';

class PluginCreate{
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async free_plugin_create(plugin_name) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(plugin_locator.navigate).click();
    await this.page.locator(plugin_locator.add_plugin).click();
    await this.page.locator(plugin_locator.free_plugin).click();
    await this.page.locator(plugin_locator.manual_entry).click();
    //await this.page.pause();

    await this.page.locator(plugin_locator.name).fill(plugin_name);
    await this.page.locator(plugin_locator.slug).fill(((plugin_name.split(" ")).join("_")).toLowerCase());

    await this.page.locator(plugin_locator.submit).click()
    await this.page.locator(plugin_locator.skip).click();
    await this.page.locator(plugin_locator.skip).click();
    await this.page.locator(plugin_locator.next).click();
    await this.page.locator(plugin_locator.done).click();
    await this.page.locator(plugin_locator.complete).click();

    await expect(await this.page.locator(plugin_locator.check_product)).toHaveText("Get Started");

  };


  async pro_plugin_create(plugin_name, website_url, product_name) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(plugin_locator.navigate).click();
    await this.page.locator(plugin_locator.add_plugin).click();
    await this.page.locator(plugin_locator.pro_plugin).click();

    await this.page.locator(plugin_locator.name).fill(plugin_name);
    await this.page.locator(plugin_locator.slug).fill(((plugin_name.split(" ")).join("_")).toLowerCase());

    await this.page.locator(plugin_locator.submit).click();

    await this.page.locator(plugin_locator.yes).click();
    await this.page.locator(plugin_locator.wcom_map).click();
    await this.page.locator(plugin_locator.use_appsero).click();
    await this.page.locator(plugin_locator.select_website).click();
    await this.page.locator('//li[contains(text(),"' + website_url + '")]').click();
    await this.page.locator(plugin_locator.select_product).click();
    await this.page.locator('//li[contains(text(),"' + product_name + '")]').click();

    await this.page.locator(plugin_locator.next).click();
    await expect(this.page.locator('//h2[text()="Installation Method"]')).toHaveText("Installation Method");
    await this.page.locator(plugin_locator.next).click();

    await this.page.locator(plugin_locator.done).click();
    await this.page.locator(plugin_locator.complete).click();

    await expect(await this.page.locator(plugin_locator.check_product)).toHaveText("Get Started");
  };

}


export { PluginCreate };
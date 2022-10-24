import { expect, Page } from '@playwright/test';
import { base_url, plugin_data } from '../utils/data';
import { plugin_locator, product_finding_locator } from '../utils/locators';

class PluginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async free_plugin_create(plugin_name) {

    await this.page.goto(base_url);
    await this.page.locator(plugin_locator.navigate).click();
    await this.page.locator(plugin_locator.add_plugin).click();
    await this.page.locator(plugin_locator.free_plugin).click();
    await this.page.locator(plugin_locator.manual_entry).click();

    await this.page.locator(plugin_locator.name).fill(plugin_name);
    await this.page.locator(plugin_locator.slug).fill(((plugin_name.split(" ")).join("_")).toLowerCase());

    await this.page.locator(plugin_locator.plugin_version).fill(plugin_data.plugin_version);
    await this.page.locator(plugin_locator.php_version_select).click();
    await this.page.locator(plugin_locator.php_version).fill(plugin_data.php_version);
    await this.page.keyboard.press('Enter');
    await this.page.locator(plugin_locator.wp_version_select).click();
    await this.page.locator(plugin_locator.wp_version).fill(plugin_data.wp_version);
    await this.page.keyboard.press('Enter');
    await this.page.locator(plugin_locator.tested_upto_version_select).click();
    await this.page.locator(plugin_locator.tested_upto_version).fill(plugin_data.tested_upto_version);
    await this.page.keyboard.press('Enter');

    await this.page.locator(plugin_locator.submit).click();
    await this.page.locator(plugin_locator.skip).click();
    await this.page.locator(plugin_locator.skip).click();
    await this.page.locator(plugin_locator.next).click();
    await this.page.locator(plugin_locator.done).click();
    await this.page.locator(plugin_locator.complete).click();
  };


  async pro_plugin_create(plugin_name, website_url, product_name) {

    await this.page.goto(base_url);
    await this.page.locator(plugin_locator.navigate).click();
    await this.page.locator(plugin_locator.add_plugin).click();
    await this.page.locator(plugin_locator.pro_plugin).click();

    await this.page.locator(plugin_locator.name).fill(plugin_name);
    await this.page.locator(plugin_locator.slug).fill(((plugin_name.split(" ")).join("_")).toLowerCase());
    await this.page.locator(plugin_locator.plugin_version).fill(plugin_data.plugin_version);

    await this.page.locator(plugin_locator.php_version_select).click();
    await this.page.locator(plugin_locator.php_version).fill(plugin_data.php_version);
    await this.page.keyboard.press('Enter');
    await this.page.locator(plugin_locator.wp_version_select).click();
    await this.page.locator(plugin_locator.wp_version).fill(plugin_data.wp_version);
    await this.page.keyboard.press('Enter');
    await this.page.locator(plugin_locator.tested_upto_version_select).click();
    await this.page.locator(plugin_locator.tested_upto_version).fill(plugin_data.tested_upto_version);
    await this.page.keyboard.press('Enter');

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
  };


  async plugin_update(data, plugin_name, new_plugin_name) {

    await this.page.goto(base_url);
    await this.page.locator(product_finding_locator.plugin_navigate).click();
    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(plugin_name);
    await this.page.locator('(//h3[text()="' + plugin_name + '"])[1]').click();
    await this.page.locator(product_finding_locator.settings).click();
    await this.page.locator(product_finding_locator.edit).click();

    await this.page.locator(product_finding_locator.name).fill(new_plugin_name);
    await this.page.locator(product_finding_locator.version).fill(data.plugin_version);
    await this.page.locator(product_finding_locator.php_version_select).click();
    await this.page.locator(product_finding_locator.php_version).fill(data.php_version);
    await this.page.keyboard.press('Enter');
    await this.page.locator(product_finding_locator.wp_version_select).click();
    await this.page.locator(product_finding_locator.wp_version).fill(data.wp_version);
    await this.page.keyboard.press('Enter');
    await this.page.locator(product_finding_locator.tested_upto_version_select).click();
    await this.page.locator(product_finding_locator.tested_upto_version).fill(data.tested_upto_version);
    await this.page.keyboard.press('Enter');

    await this.page.locator(product_finding_locator.update_plugin).click();

  };

}


export { PluginPage };
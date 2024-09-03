import { expect, Page } from '@playwright/test';
import * as faker from 'faker';
import { dashboard_locator, product_finding_locator } from '../utils/locators';
import { generateVersionNumber } from '../utils/locators';
import { plugin_locator } from '../utils/locators';
import path from 'path';
import { HelperFunctions } from '../utils/helperFunctions';

export class ProductPage{
  readonly page: Page;
  //const path = require('path');
  constructor(page: Page) {
    this.page = page;
  }

  async release_create(product_name) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    const helper = new HelperFunctions(this.page);
    await helper.skipBilling();

    await this.page.locator(product_finding_locator.releases).click();
    await this.page.locator(product_finding_locator.new_release).click();

    const version: string = generateVersionNumber.major + "." + generateVersionNumber.minor + "." + generateVersionNumber.patch
    await this.page.locator(product_finding_locator.release_version).fill(version);
    await this.page.locator(product_finding_locator.release_date).click();
    await this.page.locator(product_finding_locator.date).click();
    await this.page.locator(plugin_locator.php_version_select).click();
    await this.page.locator(plugin_locator.php_version).click();
    await this.page.locator(plugin_locator.wp_version_select).click();
    await this.page.locator(plugin_locator.wp_version).click();
    await this.page.locator(plugin_locator.tested_upto_version_select).click();
    await this.page.getByText(plugin_locator.tested_upto_version).nth(1).click();
    await this.page.locator(product_finding_locator.change_log).fill("Test Release");
    await this.page.locator(product_finding_locator.required_plugin).click();
    await (await this.page.waitForSelector(product_finding_locator.req_plugin_slug)).fill('woocommerce');
    await (await this.page.waitForSelector(product_finding_locator.req_plugin_version)).fill('9.2.3');
    await this.page.mouse.wheel(0, 1000);

    const fileInputLocator = this.page.locator(product_finding_locator.choosefile);
    const count = await fileInputLocator.count();
    const locatornumber: number = (count/2)+1;
    const locatorstring : string = locatornumber.toString();
    const fileupload : string = product_finding_locator.choosefile + "[" + locatorstring + "]";

    await expect(this.page.locator(fileupload)).toBeHidden;
    await this.page.locator(fileupload).setInputFiles(path.join(__dirname, '../uploads/WooCommercePluginTest.zip'));

    await this.page.locator(product_finding_locator.termscheckbox).click();
    await (await this.page.waitForSelector(product_finding_locator.publish_release)).click();

    await this.page.waitForLoadState("networkidle");
    await expect(await this.page.locator(product_finding_locator.check_release)).toHaveText(version);

    return version;

  };


  async release_update(product_name, version) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    const helper = new HelperFunctions(this.page);
    await helper.skipBilling();

    await this.page.locator(product_finding_locator.releases).click();

    const find_release: string = product_finding_locator.update_release_pre + version + product_finding_locator.update_release_post;
    await this.page.locator(find_release).click();

    const new_version: string = generateVersionNumber.major + "." + generateVersionNumber.minor + "." + generateVersionNumber.patch

    await this.page.locator(product_finding_locator.release_version).fill("");
    await this.page.locator(product_finding_locator.release_version).fill(new_version);
    await this.page.locator(product_finding_locator.release_date).click();
    await this.page.locator(product_finding_locator.date).click();
    await this.page.locator(plugin_locator.php_version_select).click();
    await this.page.locator(plugin_locator.php_version).click();
    await this.page.locator(plugin_locator.wp_version_select).click();
    await this.page.locator(plugin_locator.wp_version).click();
    await this.page.locator(plugin_locator.tested_upto_version_select).click();
    await this.page.getByText(plugin_locator.tested_upto_version).nth(1).click();
    await this.page.locator(product_finding_locator.change_log).fill("Updated Test Release");
    await this.page.locator(product_finding_locator.required_plugin).click();
    await (await this.page.waitForSelector(product_finding_locator.req_plugin_slug)).fill('woocommerce');
    await (await this.page.waitForSelector(product_finding_locator.req_plugin_version)).fill('9.2.3');
    await this.page.mouse.wheel(0, 100);

    const fileInputLocator = this.page.locator(product_finding_locator.choosefile);
    const count = await fileInputLocator.count();
    const locatornumber: number = (count/2)+1;
    const locatorstring : string = locatornumber.toString();
    const fileupload : string = product_finding_locator.choosefile + "[" + locatorstring + "]";

    await expect(this.page.locator(fileupload)).toBeHidden;
    await this.page.locator(fileupload).setInputFiles(path.join(__dirname, '../uploads/WooCommercePluginTest.zip'));
    
    await this.page.locator(product_finding_locator.termscheckbox).click();
    await (await this.page.waitForSelector(product_finding_locator.update_release)).click();;

    await this.page.waitForLoadState("networkidle");
    await expect(await this.page.locator('//strong[text()="' + new_version + '"]')).toHaveText(new_version);

    return new_version;

  };


  async release_delete(product_name, version) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    const helper = new HelperFunctions(this.page);
    await helper.skipBilling();

    await this.page.locator(product_finding_locator.releases).click();

    const find_release: string = product_finding_locator.find_release_pre + version + product_finding_locator.find_release_post;
    await this.page.locator(find_release).click();
    await this.page.locator(product_finding_locator.yes).click();

    await this.page.waitForLoadState("networkidle");
    await expect(this.page.locator(find_release)).toBeHidden();

  };


  async license_create(product_name) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    const helper = new HelperFunctions(this.page);
    await helper.skipBilling();

    await this.page.locator(product_finding_locator.releases).click();
    await this.page.locator(product_finding_locator.new_release).click();

    const version: string = faker.finance.amount(0, 9, 1);
    await this.page.locator(product_finding_locator.release_version).fill(version);
    await this.page.locator(product_finding_locator.release_date).click();

    await this.page.locator(product_finding_locator.date).click();

    await this.page.locator(product_finding_locator.change_log).fill("2022-10-12");
    await this.page.locator(product_finding_locator.termscheckbox).click();
    await this.page.locator(product_finding_locator.publish_release).click();

    await expect(await this.page.locator(product_finding_locator.check_release)).toHaveText(version);

  };


  async license_update(product_name) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    const helper = new HelperFunctions(this.page);
    await helper.skipBilling();

    await this.page.locator(product_finding_locator.releases).click();
    await this.page.locator(product_finding_locator.new_release).click();

    const version: string = faker.finance.amount(0, 9, 1);
    await this.page.locator(product_finding_locator.release_version).fill(version);
    await this.page.locator(product_finding_locator.release_date).click();

    await this.page.locator(product_finding_locator.date).click();

    await this.page.locator(product_finding_locator.change_log).fill("2022-10-12");
    await this.page.locator(product_finding_locator.termscheckbox).click();
    await this.page.locator(product_finding_locator.publish_release).click();

    await expect(await this.page.locator(product_finding_locator.check_release)).toHaveText(version);

  };


  async license_delete(product_name) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    const helper = new HelperFunctions(this.page);
    await helper.skipBilling();

    await this.page.locator(product_finding_locator.releases).click();
    await this.page.locator(product_finding_locator.new_release).click();

    const version: string = faker.finance.amount(0, 9, 1);
    await this.page.locator(product_finding_locator.release_version).fill(version);
    await this.page.locator(product_finding_locator.release_date).click();

    await this.page.locator(product_finding_locator.date).click();

    await this.page.locator(product_finding_locator.change_log).fill("2022-10-12");
    await this.page.locator(product_finding_locator.termscheckbox).click();
    await this.page.locator(product_finding_locator.publish_release).click();

    await expect(await this.page.locator(product_finding_locator.check_release)).toHaveText(version);

  };

  async product_delete(product_name) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    const helper = new HelperFunctions(this.page);
    await helper.skipBilling();

    await this.page.locator(product_finding_locator.settings).click();
    await this.page.locator(product_finding_locator.edit).click();
    await this.page.locator(product_finding_locator.delete).click();
    await this.page.locator(product_finding_locator.yes).click();

  };

}
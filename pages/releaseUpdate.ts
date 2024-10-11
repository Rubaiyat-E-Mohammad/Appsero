import { expect, Page } from '@playwright/test';
import * as faker from 'faker';
import { product_finding_locator } from '../utils/locators';
import { generateVersionNumber } from '../utils/locators';
import { plugin_locator } from '../utils/locators';
import path from 'path';
import { HelperFunctions } from '../utils/helperFunctions';
import { URL } from '../utils/locators';

export class ReleaseUpdate{
  readonly page: Page;
  //const path = require('path');
  constructor(page: Page) {
    this.page = page;
  }


  async free_release_update(product_name, version) {

    const helper = new HelperFunctions(this.page);
    await this.page.goto(URL as string);

    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, product_name);
    await helper.safeClick('//h3[text()="' + product_name + '"]');

    await helper.safeClick(product_finding_locator.releases);

    const find_release: string = product_finding_locator.update_release_pre + version + product_finding_locator.update_release_post;
    await helper.safeClick(find_release);

    const new_version: string = generateVersionNumber.major + "." + generateVersionNumber.minor + "." + generateVersionNumber.patch

    await helper.safeFill(product_finding_locator.release_version, "");
    await helper.safeFill(product_finding_locator.release_version, new_version);
    await helper.safeClick(product_finding_locator.release_date);
    await helper.safeClick(product_finding_locator.date);
    await helper.safeClick(plugin_locator.php_version_select);
    await helper.safeClick(plugin_locator.php_version);
    await helper.safeClick(plugin_locator.wp_version_select);
    await helper.safeClick(plugin_locator.wp_version);
    await helper.safeClick(plugin_locator.tested_upto_version_select);
    await this.page.getByText(plugin_locator.tested_upto_version_change).nth(1).click();
    await helper.safeFill(product_finding_locator.change_log, "Updated Test Release");
    await helper.safeClick(product_finding_locator.required_plugin);
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
    
    await helper.safeClick(product_finding_locator.termscheckbox);
    await (await this.page.waitForSelector(product_finding_locator.update_release)).click();;

    await this.page.waitForLoadState("networkidle");
    await expect(await this.page.locator('//strong[text()="' + new_version + '"]')).toHaveText(new_version);

    return new_version;

  };

  async pro_release_update(product_name, version) {

    const helper = new HelperFunctions(this.page);
    await this.page.goto(URL as string);

    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, product_name);
    await helper.safeClick('//h3[text()="' + product_name + '"]');

    await helper.skipBilling();

    await helper.safeClick(product_finding_locator.releases);

    const find_release: string = product_finding_locator.update_release_pre + version + product_finding_locator.update_release_post;
    await helper.safeClick(find_release);

    const new_version: string = generateVersionNumber.major + "." + generateVersionNumber.minor + "." + generateVersionNumber.patch

    await helper.safeFill(product_finding_locator.release_version, "");
    await helper.safeFill(product_finding_locator.release_version, new_version);
    await helper.safeClick(product_finding_locator.release_date);
    await helper.safeClick(product_finding_locator.date);
    await helper.safeClick(plugin_locator.php_version_select);
    await helper.safeClick(plugin_locator.php_version);
    await helper.safeClick(plugin_locator.wp_version_select);
    await helper.safeClick(plugin_locator.wp_version);
    await helper.safeClick(plugin_locator.tested_upto_version_select);
    await this.page.getByText(plugin_locator.tested_upto_version_change).nth(1).click();
    await helper.safeFill(product_finding_locator.change_log, "Updated Test Release");
    await helper.safeClick(product_finding_locator.required_plugin);
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
    
    await helper.safeClick(product_finding_locator.termscheckbox);
    await (await this.page.waitForSelector(product_finding_locator.update_release)).click();;

    await this.page.waitForLoadState("networkidle");
    await expect(await this.page.locator('//strong[text()="' + new_version + '"]')).toHaveText(new_version);

    return new_version;

  };

}
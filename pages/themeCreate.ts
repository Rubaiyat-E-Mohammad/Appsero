import { expect, Page } from '@playwright/test';
import { theme_locator } from '../utils/locators';
import { URL } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';


export class ThemeCreate {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async free_theme_create(theme_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);
    await helper.safeClick(theme_locator.navigate);
    await helper.safeClick(theme_locator.add_theme);
    await helper.safeClick(theme_locator.free_theme);
    await helper.safeClick(theme_locator.manual_entry);

    await helper.safeFill(theme_locator.name, theme_name);
    await helper.safeFill(theme_locator.slug, (((theme_name.split(" ")).join("_")).toLowerCase()));

    await helper.safeClick(theme_locator.submit);
    await helper.safeClick(theme_locator.skip);
    //await helper.safeClick(theme_locator.skip);
    await helper.safeClick(theme_locator.next);
    await helper.safeClick(theme_locator.done);
    await helper.safeClick(theme_locator.complete);

    await expect(await this.page.locator(theme_locator.check_product)).toHaveText("Get Started");
  };


  async pro_theme_create(theme_name, website_url, product_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);
    await helper.safeClick(theme_locator.navigate);
    await helper.safeClick(theme_locator.add_theme);
    await helper.safeClick(theme_locator.pro_theme);

    await helper.safeFill(theme_locator.name, theme_name);
    await helper.safeFill(theme_locator.slug, (((theme_name.split(" ")).join("_")).toLowerCase()));
    await helper.safeClick(theme_locator.submit);

    await helper.safeClick(theme_locator.yes);
    await helper.safeClick(theme_locator.wcom_map);
    await helper.safeClick(theme_locator.use_appsero);
    await helper.safeClick(theme_locator.select_website);
    await helper.safeClick('//li[contains(text(),"' + website_url + '")]');
    await helper.safeClick(theme_locator.select_product);
    await helper.safeClick('//li[contains(text(),"' + product_name + '")]');

    await helper.safeClick(theme_locator.next);
    await expect(this.page.locator('//h2[text()="Installation Method"]')).toHaveText("Installation Method");
    await helper.safeClick(theme_locator.next);
    await helper.safeClick(theme_locator.done);
    await helper.safeClick(theme_locator.complete);

    await expect(await this.page.locator(theme_locator.check_product)).toHaveText("Get Started");
    
    await helper.skipBilling();
  };

}
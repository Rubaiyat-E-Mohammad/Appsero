import { expect, Page } from '@playwright/test';
import { theme_locator } from '../utils/locators';
import { URL } from '../utils/locators';


export class ThemeCreate {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async free_theme_create(theme_name) {

    await this.page.goto(URL as string);
    await this.page.locator(theme_locator.navigate).click();
    await this.page.locator(theme_locator.add_theme).click();
    await this.page.locator(theme_locator.free_theme).click();
    await this.page.locator(theme_locator.manual_entry).click();

    await this.page.locator(theme_locator.name).fill(theme_name);
    await this.page.locator(theme_locator.slug).fill(((theme_name.split(" ")).join("_")).toLowerCase());

    await this.page.locator(theme_locator.submit).click();
    await this.page.locator(theme_locator.skip).click();
    await this.page.locator(theme_locator.skip).click();
    await this.page.locator(theme_locator.next).click();
    await this.page.locator(theme_locator.done).click();
    await this.page.locator(theme_locator.complete).click();

    await expect(await this.page.locator(theme_locator.check_product)).toHaveText("Get Started");
  };


  async pro_theme_create(theme_name, website_url, product_name) {

    await this.page.goto(URL as string);
    await this.page.locator(theme_locator.navigate).click();
    await this.page.locator(theme_locator.add_theme).click();
    await this.page.locator(theme_locator.pro_theme).click();

    await this.page.locator(theme_locator.name).fill(theme_name);
    await this.page.locator(theme_locator.slug).fill(((theme_name.split(" ")).join("_")).toLowerCase());
    await this.page.locator(theme_locator.submit).click();

    await this.page.locator(theme_locator.yes).click();
    await this.page.locator(theme_locator.wcom_map).click();
    await this.page.locator(theme_locator.use_appsero).click();
    await this.page.locator(theme_locator.select_website).click();
    await this.page.locator('//li[contains(text(),"' + website_url + '")]').click();
    await this.page.locator(theme_locator.select_product).click();
    await this.page.locator('//li[contains(text(),"' + product_name + '")]').click();

    await this.page.locator(theme_locator.next).click();
    await expect(this.page.locator('//h2[text()="Installation Method"]')).toHaveText("Installation Method");
    await this.page.locator(theme_locator.next).click();
    await this.page.locator(theme_locator.done).click();
    await this.page.locator(theme_locator.complete).click();

    await expect(await this.page.locator(theme_locator.check_product)).toHaveText("Get Started");

  };

}
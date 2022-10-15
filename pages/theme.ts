import { Page } from '@playwright/test';
import { base_url, theme_data } from '../utils/data';
import { theme_locator, product_finding_locator } from '../utils/locators';


export class ThemePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async free_theme_create() {

    await this.page.goto(base_url);
    await this.page.locator(theme_locator.navigate).click();
    await this.page.locator(theme_locator.add_theme).click();
    await this.page.locator(theme_locator.free_theme).click();
    await this.page.locator(theme_locator.manual_entry).click();

    await this.page.locator(theme_locator.name).fill(theme_data.theme_name);
    await this.page.locator(theme_locator.slug).fill(theme_data.slug_name);
    await this.page.locator(theme_locator.theme_version).fill(theme_data.theme_version);

    await this.page.locator(theme_locator.submit).click();
    await this.page.locator(theme_locator.skip).click();
    await this.page.locator(theme_locator.skip).click();
    await this.page.locator(theme_locator.next).click();
    await this.page.locator(theme_locator.done).click();
    await this.page.locator(theme_locator.complete).click();
  };


  async pro_theme_create(website_url, product_name) {

    await this.page.goto(base_url);
    await this.page.locator(theme_locator.navigate).click();
    await this.page.locator(theme_locator.add_theme).click();
    await this.page.locator(theme_locator.pro_theme).click();

    await this.page.locator(theme_locator.name).fill(theme_data.theme_name);
    await this.page.locator(theme_locator.slug).fill(theme_data.slug_name);
    await this.page.locator(theme_locator.theme_version).fill(theme_data.theme_version);

    await this.page.locator(theme_locator.submit).click();

    await this.page.locator(theme_locator.yes).click();
    await this.page.locator(theme_locator.wcom_map).click();
    await this.page.locator(theme_locator.use_appsero).click();
    await this.page.locator(theme_locator.select_website).click();
    await this.page.locator('//li[contains(text(),"' + website_url + '")]').click();
    await this.page.locator(theme_locator.select_product).click();
    await this.page.locator('//li[contains(text(),"' + product_name + '")]').click();

    await this.page.locator(theme_locator.next).click();
    await this.page.locator(theme_locator.next).click();
    await this.page.locator(theme_locator.done).click();
    await this.page.locator(theme_locator.complete).click();

  };


  async theme_update(data, name) {

    await this.page.goto(base_url);
    await this.page.locator(product_finding_locator.theme_navigate).click();
    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(name);
    await this.page.locator('(//h3[text()="' + name + '"])[1]').click();
    await this.page.locator(product_finding_locator.settings).click();
    await this.page.locator(product_finding_locator.edit).click();

    await this.page.locator(product_finding_locator.name).fill(data.theme_name);
    await this.page.locator(product_finding_locator.version).fill(data.theme_version);
    await this.page.locator(product_finding_locator.update_theme).click();

  };
}
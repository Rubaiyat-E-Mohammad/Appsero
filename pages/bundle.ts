import { Page } from '@playwright/test';
import { base_url } from '../utils/data';
import { bundle_locator, product_finding_locator } from '../utils/locators';


export class BundlePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async bundle_create(data) {

    await this.page.goto(base_url);
    await this.page.locator(bundle_locator.navigate).click();
    await this.page.locator(bundle_locator.add_bundle).click();
    await this.page.locator(bundle_locator.name).fill(data.bundle_name);
    await this.page.locator(bundle_locator.slug).fill(data.slug_name);

    await this.page.locator(bundle_locator.select_products).click();
    for (let i: number = 0; i < data.products_name.length; i++) {
      await this.page.locator('//div[text()=" ' + data.products_name[i] + ' "]').click();
    }

    await this.page.locator(bundle_locator.submit).click();
    await this.page.locator(bundle_locator.yes).click();
    await this.page.locator(bundle_locator.wcom_map).click();
    await this.page.locator(bundle_locator.use_appsero).click();
    await this.page.locator(bundle_locator.select_website).click();
    await this.page.locator('//li[contains(text(),"' + data.website_url + '")]').click();
    await this.page.locator(bundle_locator.select_product).click();
    await this.page.locator('//li[contains(text(),"' + data.product_name + '")]').click();

    await this.page.locator(bundle_locator.next).click();

  };


  async bundle_update(data, name) {

    await this.page.goto(base_url);
    await this.page.locator(product_finding_locator.bundle_navigate).click();
    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(name);
    await this.page.locator('(//h3[text()="' + name + '"])[1]').click();
    await this.page.locator(product_finding_locator.settings).click();
    await this.page.locator(product_finding_locator.edit).click();
    await this.page.locator(product_finding_locator.name).fill(data.bundle_name);
    await this.page.locator(product_finding_locator.update_bundle).click();

  }
}
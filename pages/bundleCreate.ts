import { Page, expect } from '@playwright/test';
import { bundle_locator, product_finding_locator } from '../utils/locators';


export class BundleCreate {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async bundle_create(bundle_name, website_url, product_name, bundle_products) {

    await this.page.goto(process.env.BASE_URL as string);
    await this.page.locator(bundle_locator.navigate).click();
    await this.page.locator(bundle_locator.add_bundle).click();
    await this.page.locator(bundle_locator.name).fill(bundle_name);
    await this.page.locator(bundle_locator.slug).fill(((bundle_name.split(" ")).join("_")).toLowerCase());

    for (let i: number = 0; i < bundle_products.length; i++) {
      await this.page.locator(bundle_locator.select_products).click();
      await this.page.locator('//div[text()=" ' + bundle_products[i] + ' "]').click();
      (await this.page.waitForSelector(bundle_locator.select_variation)).click();
      await this.page.getByText('month').click();
    }

    await this.page.locator(bundle_locator.submit).click();
    await this.page.locator(bundle_locator.yes).click();
    await this.page.locator(bundle_locator.wcom_map).click();
    await this.page.locator(bundle_locator.use_appsero).click();
    await this.page.locator(bundle_locator.select_website).click();
    await this.page.locator('//li[contains(text(),"' + website_url + '")]').click();
    await this.page.locator(bundle_locator.select_product).click();
    await this.page.locator('//li[contains(text(),"' + product_name + '")]').click();

    await this.page.locator(bundle_locator.next).click();

  };

}
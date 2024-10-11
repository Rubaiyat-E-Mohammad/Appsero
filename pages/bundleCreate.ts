import { Page } from '@playwright/test';
import { bundle_locator} from '../utils/locators';
import { URL } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';

export class BundleCreate {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async bundle_create(bundle_name, website_url, product_name, bundle_products) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);
    await helper.safeClick(bundle_locator.navigate);
    await helper.safeClick(bundle_locator.add_bundle);
    await helper.safeFill(bundle_locator.name, bundle_name);
    await helper.safeFill(bundle_locator.slug, (((bundle_name.split(" ")).join("_")).toLowerCase()));

    for (let i: number = 0; i < bundle_products.length; i++) {
      await helper.safeClick(bundle_locator.select_products);
      await this.page.locator('//div[text()=" ' + bundle_products[i] + ' "]').click();
      await this.page.waitForLoadState('networkidle');
      (await this.page.waitForSelector(bundle_locator.select_variation)).click();
      await helper.clickByText('month');
    }

    await helper.safeClick(bundle_locator.submit);
    await helper.safeClick(bundle_locator.yes);
    await helper.safeClick(bundle_locator.wcom_map);
    await helper.safeClick(bundle_locator.use_appsero);
    await helper.safeClick(bundle_locator.select_website);
    await helper.safeClick('//li[contains(text(),"' + website_url + '")]');
    await helper.safeClick(bundle_locator.select_product);
    await helper.safeClick('//li[contains(text(),"' + product_name + '")]');

    await helper.safeClick(bundle_locator.next);

  };

}
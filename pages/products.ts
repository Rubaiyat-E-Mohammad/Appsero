import { Page } from '@playwright/test';
import { base_url } from '../utils/data';
import { product_finding_locator } from '../utils/locators';


export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async product_delete(product_name) {

    await this.page.goto(base_url);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();
    await this.page.locator(product_finding_locator.settings).click();
    await this.page.locator(product_finding_locator.edit).click();
    await this.page.locator(product_finding_locator.delete).click();
    await this.page.locator(product_finding_locator.yes).click();
    await this.page.waitForRequest(request => request.method() === 'GET')

  };

}
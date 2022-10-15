import type { Page } from '@playwright/test';
import { base_url } from '../utils/data';
import { product_finding_locator } from '../utils/locators';


export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async product_delete(name) {

    await this.page.goto(base_url);
    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(name);
    await this.page.locator('//h3[text()="' + name + '"]').click();
    await this.page.locator(product_finding_locator.settings).click();
    await this.page.locator(product_finding_locator.edit).click();
    await this.page.locator(product_finding_locator.delete).click();
    await this.page.locator(product_finding_locator.yes).click();

  };

}
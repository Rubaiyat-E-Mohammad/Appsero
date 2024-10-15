import { expect, Page } from '@playwright/test';
import * as faker from 'faker';
import { product_finding_locator } from '../utils/locators';
import { generateVersionNumber } from '../utils/locators';
import { plugin_locator } from '../utils/locators';
import path from 'path';
import { HelperFunctions } from '../utils/helperFunctions';
import { URL } from '../utils/locators';

export class ReleaseDelete{
  readonly page: Page;
  //const path = require('path');
  constructor(page: Page) {
    this.page = page;
  }
  
  async release_delete(product_name, version) {

    const helper = new HelperFunctions(this.page);
    await this.page.goto(URL as string);

    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, product_name);
    await helper.safeClick('//h3[text()="' + product_name + '"]');

    await helper.skipBilling();

    await helper.safeClick(product_finding_locator.releases);

    const find_release: string = product_finding_locator.find_release_pre + version + product_finding_locator.find_release_post;
    await helper.safeClick(find_release);
    await helper.safeClick(product_finding_locator.yes);

    await expect(this.page.locator(find_release)).toBeHidden();

  };

}
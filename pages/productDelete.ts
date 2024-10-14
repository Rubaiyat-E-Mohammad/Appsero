import { expect, Page } from '@playwright/test';
import * as faker from 'faker';
import { product_finding_locator } from '../utils/locators';
import { generateVersionNumber } from '../utils/locators';
import { plugin_locator } from '../utils/locators';
import path from 'path';
import { HelperFunctions } from '../utils/helperFunctions';
import { URL } from '../utils/locators';

export class ProductDelete{
  readonly page: Page;
  //const path = require('path');
  constructor(page: Page) {
    this.page = page;
  }

  async free_product_delete(product_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);

    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, product_name);
    await helper.safeClick('//h3[text()="' + product_name + '"]');
    await helper.skipBilling();
    await helper.safeClick(product_finding_locator.settings);
    await helper.safeClick(product_finding_locator.edit);
    await helper.safeClick(product_finding_locator.delete);
    await helper.safeClick(product_finding_locator.yes);

  };

  async pro_product_delete(product_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);

    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, product_name);
    await helper.safeClick('//h3[text()="' + product_name + '"]');
    await helper.skipBilling();
    await helper.safeClick(product_finding_locator.settings);
    await helper.safeClick(product_finding_locator.edit);
    await helper.safeClick(product_finding_locator.delete);
    await helper.safeClick(product_finding_locator.yes);

  };

}
import { expect, Page } from '@playwright/test';
import * as faker from 'faker';
import { product_finding_locator, orders_locator } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';
import { URL } from '../utils/locators';

export class OrderPage{
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async order_create(product_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);

    await helper.safeHover(product_finding_locator.search);
    //await helper.safeClick(product_finding_locator.search_project);
    await helper.safeFill(product_finding_locator.search_project, product_name);
    await helper.safeClick('//h3[text()="' + product_name + '"]');
    await helper.skipBilling();
    await helper.safeClick(orders_locator.sales);
    await helper.safeClick(orders_locator.orders);
    await helper.safeClick(orders_locator.create_order);
    await helper.safeClick(orders_locator.select_variation);
    await helper.safeClick(orders_locator.day);
    await helper.safeFill(orders_locator.customer_name, "John Doe");
    await helper.safeFill(orders_locator.email, "johndoe@gmail.com");
    await helper.safeFill(orders_locator.customer_phone, "+8801689925465");
    await helper.safeFill(orders_locator.price, "10");
    await helper.clickByText(orders_locator.submit);
    await helper.safeClick(orders_locator.order_view);
    const key : string = await this.page.locator(orders_locator.license_key).innerText();
    await helper.safeClick(orders_locator.licenses);
    const license: string = await this.page.locator(orders_locator.license_key).innerText();
    await expect(license).toEqual(key);

  };


  async variation_upgrade(product_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);

    await helper.safeHover(product_finding_locator.search);
    //await helper.safeClick(product_finding_locator.search_project);
    await helper.safeFill(product_finding_locator.search_project, product_name);
    await helper.safeClick('//h3[text()="' + product_name + '"]');
    await helper.skipBilling();
    await helper.safeClick(orders_locator.sales);
    await helper.safeClick(orders_locator.orders);
    await helper.safeClick(orders_locator.order_view);
    await helper.safeClick(orders_locator.license_key);
    await helper.safeClick(orders_locator.upgrade);
    await helper.safeClick(orders_locator.select_variation);
    await helper.safeClick(orders_locator.week);
    await helper.clickByText(orders_locator.submit);
  };


  async order_delete(product_name) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);
    await helper.safeHover(product_finding_locator.search);
    await helper.safeFill(product_finding_locator.search_project, product_name);
    await helper.safeClick('//h3[text()="' + product_name + '"]');
    await helper.skipBilling();
    await helper.safeClick(orders_locator.sales);
    await helper.safeClick(orders_locator.orders);

    await helper.safeClick(orders_locator.order_view);
    await helper.safeClick(orders_locator.delete);
    await helper.safeClick(orders_locator.yes);

  };
  

}
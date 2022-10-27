import { expect, Page } from '@playwright/test';
import * as faker from 'faker';
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
    await this.page.waitForNavigation();

  };


  async release_create(product_name) {

    await this.page.goto(base_url);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    await this.page.locator(product_finding_locator.releases).click();
    await this.page.locator(product_finding_locator.new_release).click();

    const version: string = faker.finance.amount(0, 9, 1);
    await this.page.locator(product_finding_locator.release_version).fill(version);
    await this.page.locator(product_finding_locator.release_date).click();
    await this.page.locator(product_finding_locator.date).click();
    await this.page.locator(product_finding_locator.change_log).fill("Test Release");
    await this.page.locator(product_finding_locator.checkbox).click();
    await this.page.locator(product_finding_locator.publish_release).click();

    await this.page.waitForLoadState("networkidle");
    await expect(await this.page.locator(product_finding_locator.check_release)).toHaveText(version);

    return version;

  };


  async release_update(product_name, version) {

    await this.page.goto(base_url);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    await this.page.locator(product_finding_locator.releases).click();

    const find_release: string = product_finding_locator.update_release_pre + version + product_finding_locator.update_release_post;
    await this.page.locator(find_release).click();

    const new_version: string = faker.finance.amount(0, 9, 1);

    await this.page.locator(product_finding_locator.release_version).fill("");
    await this.page.locator(product_finding_locator.release_version).fill(new_version);
    await this.page.locator(product_finding_locator.release_date).click();
    await this.page.locator(product_finding_locator.date).click();
    await this.page.locator(product_finding_locator.change_log).fill("Updated Test Release");
    await this.page.locator(product_finding_locator.checkbox).click();
    await this.page.locator(product_finding_locator.update_release).click();

    await this.page.waitForLoadState("networkidle");
    await expect(await this.page.locator('//strong[text()="' + new_version + '"]')).toHaveText(new_version);

    return new_version;

  };


  async release_delete(product_name, version) {

    await this.page.goto(base_url);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    await this.page.locator(product_finding_locator.releases).click();

    const find_release: string = product_finding_locator.find_release_pre + version + product_finding_locator.find_release_post;
    await this.page.locator(find_release).click();
    await this.page.locator(product_finding_locator.yes).click();

    await this.page.waitForLoadState("networkidle");
    await expect(this.page.locator(find_release)).toBeHidden();

  };


  async license_create(product_name) {

    await this.page.goto(base_url);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    await this.page.locator(product_finding_locator.releases).click();
    await this.page.locator(product_finding_locator.new_release).click();

    const version: string = faker.finance.amount(0, 9, 1);
    await this.page.locator(product_finding_locator.release_version).fill(version);
    await this.page.locator(product_finding_locator.release_date).click();

    await this.page.locator(product_finding_locator.date).click();

    await this.page.locator(product_finding_locator.change_log).fill("2022-10-12");
    await this.page.locator(product_finding_locator.checkbox).click();
    await this.page.locator(product_finding_locator.publish_release).click();

    await expect(await this.page.locator(product_finding_locator.check_release)).toHaveText(version);

  };


  async license_update(product_name) {

    await this.page.goto(base_url);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    await this.page.locator(product_finding_locator.releases).click();
    await this.page.locator(product_finding_locator.new_release).click();

    const version: string = faker.finance.amount(0, 9, 1);
    await this.page.locator(product_finding_locator.release_version).fill(version);
    await this.page.locator(product_finding_locator.release_date).click();

    await this.page.locator(product_finding_locator.date).click();

    await this.page.locator(product_finding_locator.change_log).fill("2022-10-12");
    await this.page.locator(product_finding_locator.checkbox).click();
    await this.page.locator(product_finding_locator.publish_release).click();

    await expect(await this.page.locator(product_finding_locator.check_release)).toHaveText(version);

  };


  async license_delete(product_name) {

    await this.page.goto(base_url);
    await this.page.waitForLoadState("networkidle");

    await this.page.locator(product_finding_locator.search).hover();
    await this.page.locator(product_finding_locator.search_project).click();
    await this.page.locator(product_finding_locator.search_project).fill(product_name);
    await this.page.locator('//h3[text()="' + product_name + '"]').click();

    await this.page.locator(product_finding_locator.releases).click();
    await this.page.locator(product_finding_locator.new_release).click();

    const version: string = faker.finance.amount(0, 9, 1);
    await this.page.locator(product_finding_locator.release_version).fill(version);
    await this.page.locator(product_finding_locator.release_date).click();

    await this.page.locator(product_finding_locator.date).click();

    await this.page.locator(product_finding_locator.change_log).fill("2022-10-12");
    await this.page.locator(product_finding_locator.checkbox).click();
    await this.page.locator(product_finding_locator.publish_release).click();

    await expect(await this.page.locator(product_finding_locator.check_release)).toHaveText(version);

  };

}
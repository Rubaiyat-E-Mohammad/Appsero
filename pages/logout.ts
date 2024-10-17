import { Page } from "@playwright/test";
import { logout_locator } from "../utils/locators";
import { URL } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';

export class LogoutPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  async logout() {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);

    await helper.safeClick(logout_locator.avater_button);
    await helper.safeClick(logout_locator.logout_button);
    await this.page.context().clearCookies();
    await this.page.evaluate(() => localStorage.clear());



  }
}
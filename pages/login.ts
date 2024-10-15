import { Page } from "@playwright/test";
import { login_locator } from "../utils/locators";
import { URL } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';

export class LoginPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  async login(user_name, password) {

    const helper = new HelperFunctions(this.page);
    await helper.safeGoto(URL as string);

    await helper.safeFill(login_locator.email, user_name);
    await helper.safeFill(login_locator.pass, password);
    await this.page.locator(login_locator.submit).click();
    await this.page.waitForTimeout(3000);
    await this.page.context().storageState({ path: 'state.json' });


  }
}
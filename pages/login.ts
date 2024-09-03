import { Page } from "@playwright/test";
import { login_locator } from "../utils/locators";


export class LoginPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  async login(user_name, password) {

    await this.page.goto(process.env.BASE_URL as string);

    await this.page.locator(login_locator.email).fill(user_name);
    await this.page.locator(login_locator.pass).fill(password);
    await this.page.locator(login_locator.submit).click();

    await this.page.waitForLoadState("networkidle");

    await this.page.context().storageState({ path: 'state.json' });

  }
}
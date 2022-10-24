import { chromium } from "@playwright/test";
import { base_url } from "../utils/data";
import { login_locator } from "../utils/locators";
import * as fs from "fs";


export class LoginPage {

  async login(user_name, password) {

    fs.writeFile('state.json', '{"cookies":[],"origins": []}', function () { });

    const browser = await chromium.launch({});
    const page = await browser.newPage();

    await page.goto(base_url);
    await page.locator(login_locator.email).fill(user_name);
    await page.locator(login_locator.pass).fill(password);
    await page.locator(login_locator.submit).click();

    await page.waitForLoadState("networkidle")

    await page.context().storageState({ path: 'state.json' });

    await browser.close();

  }
}
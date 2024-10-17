import { expect, Page } from '@playwright/test';
import { product_finding_locator, email_locator } from '../utils/locators';
import { URL } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';

export class EmailsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async email_digest(plugin_name) {

        const helper = new HelperFunctions(this.page);
        await helper.safeGoto(URL as string);

        await helper.safeClick(product_finding_locator.plugin_navigate);
        await helper.safeHover(product_finding_locator.search);
        await helper.safeFill(product_finding_locator.search_project, plugin_name);
        await helper.safeClick('(//h3[text()="' + plugin_name + '"])[1]');
        await helper.skipBilling();

        await helper.safeClick(email_locator.email_navigate);
        await helper.safeClick(email_locator.email_digest);
        await helper.safeClick(email_locator.add_email_digest);
        await helper.safeFill(email_locator.send_to, 'tons2468@gmail.com, trubaiyatemohammad@gmail.com');
        await helper.safeClick(email_locator.frequency);
        await helper.safeClick(email_locator.weekly);
        await helper.safeClick(email_locator.send_on);
        await helper.safeClick(email_locator.send_on_day);
        await helper.safeClick(email_locator.send_at);
        await helper.safeClick(email_locator.send_at_time);
        await helper.safeFill(email_locator.digest_name, 'Test Digest');
        await helper.safeClick(email_locator.submit);
        await expect(await this.page.locator(email_locator.success_message).innerText()).toBe('Email digest created successfully.');



    };
}
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

    async deactivation_reason(plugin_name) {
        const helper = new HelperFunctions(this.page);
        await helper.safeGoto(URL as string);

        await helper.safeClick(product_finding_locator.plugin_navigate);
        await helper.safeHover(product_finding_locator.search);
        await helper.safeFill(product_finding_locator.search_project, plugin_name);
        await helper.safeClick('(//h3[text()="' + plugin_name + '"])[1]');
        await helper.skipBilling();

        await this.page.locator(product_finding_locator.settings).click();
        await helper.safeClick(email_locator.deactivation_reasons);
        await helper.safeClick(email_locator.add_new_reason);
        await helper.safeFill(email_locator.deactivation_title, 'Test Reason');
        await helper.safeClick(email_locator.update_reasons);
        await expect(await this.page.locator(email_locator.success_message).innerText())
            .toBe('Deactivation reasons updated successfully.');
    }

    async auto_responder_settings(plugin_name) {
        const helper = new HelperFunctions(this.page);
        await helper.safeGoto(URL as string);

        await helper.safeClick(product_finding_locator.plugin_navigate);
        await helper.safeHover(product_finding_locator.search);
        await helper.safeFill(product_finding_locator.search_project, plugin_name);
        await helper.safeClick('(//h3[text()="' + plugin_name + '"])[1]');
        await helper.skipBilling();

        await helper.safeClick(email_locator.email_navigate);
        await helper.safeClick(email_locator.auto_responder);
        await helper.safeClick(email_locator.turn_on_responder);
        await this.page.waitForTimeout(2000);
        expect(await this.page.locator(email_locator.success_message).innerText())
            .toBe('Deactivation auto responder enabled successfully');
        await this.page.waitForTimeout(2000);
        await helper.safeFill(email_locator.reply_to, 'tons2468@gmail.com');
        await helper.safeClick(email_locator.update_mail);
        expect(await this.page.locator(email_locator.success_message).innerText())
            .toBe('Reply to email updated successfully');
        await this.page.pause();
        for (let i = 3; i < 12; i++) {
            await helper.safeClick(email_locator.reason_on + '[' + i + ']');
            expect(await this.page.locator(email_locator.reason_on + '[' + i + ']').isChecked());
        }   
    }
}
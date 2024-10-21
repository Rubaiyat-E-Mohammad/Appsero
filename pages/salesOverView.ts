import { Page } from '@playwright/test';
import { sales_overview_locator, product_finding_locator, orders_locator } from '../utils/locators';
import * as fs from 'fs';
import { URL } from '../utils/locators';
import { HelperFunctions } from '../utils/helperFunctions';

class SalesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async overview_details(product_name) {

        const overview_stats: {
            net_revenue, completed_orders, refunds, average_order_value, new_customer, refunded, new_subscriptions,
            renewal_orders, active_subscriptions, not_renewed: string
        }[] = [];

        const helper = new HelperFunctions(this.page);
        await helper.safeGoto(URL as string);

        await helper.safeHover(product_finding_locator.search);
        await helper.safeFill(product_finding_locator.search_project, product_name);
        await helper.safeClick('//h3[text()="' + product_name + '"]');
        await helper.skipBilling();
        await helper.safeClick(orders_locator.sales);
        await helper.safeClick(orders_locator.overview);

        /* ---- Data Scrapping ---- */
        // let x: string = await this.page.locator('').innerText();

        let net_revenue: string = await this.page.locator(sales_overview_locator.net_revenue).isVisible() ?
            await this.page.locator(sales_overview_locator.net_revenue).innerText() : "Not Available";

        let completed_orders: string = await this.page.locator(sales_overview_locator.completed_orders).isVisible() ?
        await this.page.locator(sales_overview_locator.completed_orders).innerText() : "Not Available";

        let refunds: string = await this.page.locator(sales_overview_locator.refunds).isVisible() ?
        await this.page.locator(sales_overview_locator.refunds).innerText() : "Not Available";

        let average_order_value: string = await this.page.locator(sales_overview_locator.average_order_value).isVisible() ?
        await this.page.locator(sales_overview_locator.average_order_value).innerText() : "Not Available";

        let new_customer: string = await this.page.locator(sales_overview_locator.new_customer).isVisible() ?
        await this.page.locator(sales_overview_locator.new_customer).innerText() : "Not Available";

        let refunded: string = await this.page.locator(sales_overview_locator.refunded).isVisible() ?
        await this.page.locator(sales_overview_locator.refunded).innerText() : "Not Available";

        let new_subscriptions: string = await this.page.locator(sales_overview_locator.new_subscriptions).isVisible() ?
        await this.page.locator(sales_overview_locator.new_subscriptions).innerText() : "Not Available";

        let renewal_orders: string = await this.page.locator(sales_overview_locator.renewal_orders).isVisible() ?
        await this.page.locator(sales_overview_locator.renewal_orders).innerText() : "Not Available";

        let active_subscriptions: string = await this.page.locator(sales_overview_locator.active_subscriptions).isVisible() ?
        await this.page.locator(sales_overview_locator.active_subscriptions).innerText() : "Not Available";

        let not_renewed: string = await this.page.locator(sales_overview_locator.not_renewed).isVisible() ?
        await this.page.locator(sales_overview_locator.not_renewed).innerText() : "Not Available";


        overview_stats.push({
            net_revenue, completed_orders, refunds, average_order_value, new_customer, refunded, new_subscriptions,
            renewal_orders, active_subscriptions, not_renewed
        });

        let data: string = JSON.stringify(overview_stats, null, "\t");

        fs.writeFile('sales overview.json', data, function () { });
    };
}

export { SalesPage };
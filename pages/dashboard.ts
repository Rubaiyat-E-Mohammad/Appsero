import { Page } from '@playwright/test';
import { base_url } from '../utils/data';
import { dashboard_locator } from '../utils/locators';
import * as fs from 'fs';

class DashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async overview_details() {

        const overview_stats: {
            total_plugins, total_themes, total_bundles, net_revenue, number_of_orders, total_active_licenses, deactivations,
            refunds, top_selling_product, top_deactivation_reason, new_installs, total_installs, revenue_via_coupon, avg_order_value,
            todays_revenue, todays_new_subscriptions, todays_new_orders, todays_refunds: string
        }[] = [];

        await this.page.goto(base_url, { waitUntil: 'networkidle' });

        /* ---- Data Scrapping ---- */
        // let x: string = await this.page.locator('').innerText();

        await this.page.waitForLoadState("networkidle");

        let total_plugins: string = await this.page.locator(dashboard_locator.plugin_count).innerText();
        let total_themes: string = await this.page.locator(dashboard_locator.theme_count).innerText();
        let total_bundles: string = await this.page.locator(dashboard_locator.bundle_count).innerText();

        let net_revenue: string = await this.page.locator(dashboard_locator.net_revenue).innerText();
        let number_of_orders: string = await this.page.locator(dashboard_locator.number_of_orders).innerText();
        let total_active_licenses: string = await this.page.locator(dashboard_locator.total_active_licenses).innerText();
        let deactivations: string = await this.page.locator(dashboard_locator.deactivations).innerText();
        let refunds: string = await this.page.locator(dashboard_locator.refunds).innerText();

        let top_selling_product: string = await this.page.locator(dashboard_locator.top_selling_product).isVisible() ?
            await this.page.locator(dashboard_locator.top_selling_product).innerText() : "Not Available";
        let top_deactivation_reason: string = await this.page.locator(dashboard_locator.top_deactivation_reason).isVisible() ?
            await this.page.locator(dashboard_locator.top_deactivation_reason).innerText() : "Not Available";

        let new_installs: string = await this.page.locator(dashboard_locator.new_installs).innerText();
        let total_installs: string = await this.page.locator(dashboard_locator.total_installs).innerText();
        let revenue_via_coupon: string = await this.page.locator(dashboard_locator.revenue_via_coupon).innerText();
        let avg_order_value: string = await this.page.locator(dashboard_locator.avg_order_value).innerText();

        let todays_revenue: string = await this.page.locator(dashboard_locator.todays_revenue).innerText();
        let todays_new_subscriptions: string = await this.page.locator(dashboard_locator.todays_new_subscriptions).innerText();
        let todays_new_orders: string = await this.page.locator(dashboard_locator.todays_new_orders).innerText();
        let todays_refunds: string = await this.page.locator(dashboard_locator.todays_refunds).innerText();

        overview_stats.push({
            total_plugins, total_themes, total_bundles, net_revenue, number_of_orders, total_active_licenses, deactivations, refunds,
            top_selling_product, top_deactivation_reason, new_installs, total_installs, revenue_via_coupon, avg_order_value,
            todays_revenue, todays_new_subscriptions,
            todays_new_orders, todays_refunds
        });

        let data: string = JSON.stringify(overview_stats, null, "\t");

        fs.writeFile('overview stats.json', data, function () { });
    };
}

export { DashboardPage };
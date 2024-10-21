import * as faker from 'faker';

import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let URL = process.env.STAGING === '0' ? process.env.PRODUCTION_URL : process.env.STAGING_URL;
let SITE = process.env.STAGING === '0' ? process.env.PRODUCTION_SITE : process.env.STAGING_SITE;

let login_locator: { email, pass, submit: string } = {
    email: '//input[@type="email"]',
    pass: '//input[@type="password"]',
    submit: '.appsero__submit_btn',
};

let plugin_locator: {
    navigate, add_plugin, free_plugin, pro_plugin, manual_entry, name, slug, plugin_version, php_version_select, php_version,
    wp_version_select, wp_version, tested_upto_version_select, tested_upto_version, tested_upto_version_change, submit, yes, wcom_map, use_appsero,
    select_website, website_click, select_product, product_click, skip, next, done, complete, check_product: string
} = {

    navigate: '//span[text()="Plugins"]',
    add_plugin: '(//span[text()="Add Plugins"])[1]',
    free_plugin: '//button[contains(text(), "No, It\'s a free plugin")]',
    pro_plugin: '//button[contains(text(), "Yes, It\'s a premium plugin")]',
    manual_entry: '//a[contains(text(), "Manual Entry")]',
    name: '#name',
    slug: '#slug',
    plugin_version: '#version',

    php_version_select: '(//div[@class="ant-select-selection__rendered"])[4]',
    php_version: '//li[contains(text(), "7.4")]',
    wp_version_select: '(//div[@class="ant-select-selection__rendered"])[5]',
    wp_version: '//li[contains(text(), "4.9")]',
    tested_upto_version_select: '(//div[@class="ant-select-selection__rendered"])[6]',
    tested_upto_version: '6.5',
    tested_upto_version_change: '6.6',
    submit: '//span[text()="Next"]',
    yes: '//span[text()="Yes"]',
    wcom_map: '//p[text()="WooCommerce + WooCommerce API Manager"]',
    use_appsero: '//strong[text()="Use Appsero"]',
    select_website: '//div[text()="Select Website"]',
    website_click: '//li[text()=" https://auto-appsero.s3-tastewp.com "]',
    select_product: '//div[text()="Select Product"]',
    product_click: '//li[text()=" Test Product 1 "]',
    skip: '//a[contains(text(), "Skip")]',
    next: '//span[normalize-space(text())="Next"]',
    done: '//button[contains(text(), "Done")]',
    complete: '//span[contains(text(), "Done")]',
    check_product: '//h1[text()="Get Started"]',
};

let theme_locator: {
    navigate, add_theme, free_theme, pro_theme, manual_entry, name, slug, theme_version, submit, yes, wcom_map, use_appsero,
    select_website, select_product, skip, next, done, complete, check_product: string
} = {

    navigate: '//span[text()="Themes"]',
    add_theme: '(//span[text()="Add Themes"])[1]',
    free_theme: '//button[contains(text(), "No, It\'s a free theme")]',
    pro_theme: '//button[contains(text(), "Yes, It\'s a premium theme")]',
    manual_entry: '//a[contains(text(), "Manual Entry")]',
    name: '#name',
    slug: '#slug',
    theme_version: '#version',
    submit: '//span[text()="Next"]',

    yes: '//span[text()="Yes"]',
    wcom_map: '//p[text()="WooCommerce + WooCommerce API Manager"]',
    use_appsero: '//strong[text()="Use Appsero"]',
    select_website: '//div[text()="Select Website"]',
    select_product: '//div[text()="Select Product"]',

    skip: '//a[contains(text(), "Skip")]',
    next: '//span[contains(text(), "Next")]',
    done: '//button[contains(text(), "Done")]',
    complete: '//span[contains(text(), "Done")]',
    check_product: '//h1[text()="Get Started"]'
};

let bundle_locator: {
    navigate, add_bundle, name, slug, select_products, select_variation, submit, yes, wcom_map, use_appsero,
    select_website, select_product, next: string
} = {

    navigate: '//span[text()="Bundles"]',
    add_bundle: '(//span[text()="Add Bundles"])[1]',
    name: '#name',
    slug: '#slug',
    select_products: '(//div[@class="ant-select-selection__rendered"])[1]',
    select_variation: '(//div[@class="ant-select-selection__rendered"])[2]',
    submit: '//span[text()="Next"]',

    yes: '//span[text()="Yes"]',
    wcom_map: '//p[text()="WooCommerce + WooCommerce API Manager"]',
    use_appsero: '//strong[text()="Use Appsero"]',
    select_website: '//div[text()="Select Website"]',
    select_product: '//div[text()="Select Product"]',

    next: '//span[contains(text(), "Next")]',
};

let product_finding_locator: {
    search, search_project, settings, edit, update_plugin, plugin_navigate, update_theme, theme_navigate, update_bundle,
    bundle_navigate, name, version, php_version_select, php_version, wp_version_select, wp_version, tested_upto_version_select,
    tested_upto_version, delete, yes, releases, new_release, release_version, release_date, date, change_log, required_plugin,
    req_plugin_slug, req_plugin_version, filepath, choosefile, termscheckbox, publish_release, update_release, check_release,
    update_release_pre, update_release_post, find_release_pre, find_release_post: string
} = {

    search: '.header-project-switch',
    search_project: '//input[@placeholder="Search Project"]',
    settings: '//span[text()="Settings"]',
    edit: '//a[contains(text(),"Edit")]',

    update_plugin: '//span[text()="Update plugin"]',
    plugin_navigate: '//span[text()="Plugins"]',
    update_theme: '//span[text()="Update theme"]',
    theme_navigate: '//span[text()="Themes"]',
    update_bundle: '//span[text()="Update bundle"]',
    bundle_navigate: '//span[text()="Bundles"]',
    name: '#name',
    version: '#version',
    php_version_select: '(//div[@class="ant-select-selection__rendered"])[1]',
    php_version: '(//input[@autocomplete="off"])[1]',
    wp_version_select: '(//div[@class="ant-select-selection__rendered"])[2]',
    wp_version: '(//input[@autocomplete="off"])[2]',
    tested_upto_version_select: '(//div[@class="ant-select-selection__rendered"])[3]',
    tested_upto_version: '(//input[@autocomplete="off"])[3]',

    delete: '//span[text()="Delete"]',
    yes: '//span[text()="Yes"]',

    releases: '//span[text()="Releases"]',
    new_release: '//span[text()="Add New Release"]',
    release_version: '(//input[@placeholder="Enter version"])[2]',
    release_date: '(//input[@placeholder="Select release date"])[2]',
    date: '//div[text()="15"]',
    change_log: '(//textarea[@placeholder="Write changelog about this release here."])[2]',
    required_plugin: '(//span[contains(text(),"Add Required Plugin")])[2]',
    req_plugin_slug: '(//input[@placeholder="Enter plugin slug"])[1]',
    req_plugin_version: '(//input[@placeholder="Enter plugin version"])[1]',
    filepath: 'File Path',
    choosefile: '(//input[@type="file"])',
    termscheckbox: '(//span[contains(text(),"I have added a")])[2]',
    publish_release: '//span[text()="Publish Release"]',
    update_release: '//span[text()="Update Release"]',
    check_release: '//sup[@title="Current"]/../../strong',
    update_release_pre: '//strong[text()="',
    update_release_post: '"]/../..//../td[4]/button[@class="mr-8 ant-btn"]',
    find_release_pre: '//strong[text()="',
    find_release_post: '"]/../..//../td[4]/button[@class="ant-btn ant-btn-danger"]',

};

let dashboard_locator: {
    plugin_count, theme_count, bundle_count, net_revenue, number_of_orders, total_active_licenses, deactivations, refunds,
    top_selling_product, top_deactivation_reason, new_installs, total_installs, revenue_via_coupon, avg_order_value, todays_revenue,
    todays_new_subscriptions, todays_new_orders, todays_refunds, skip_billing: string
} = {

    plugin_count: '//p[text()="Plugins"]/../h3[@class="project-number"]',
    theme_count: '//p[text()="Themes"]/../h3[@class="project-number"]',
    bundle_count: '//p[text()="Bundles"]/../h3[@class="project-number"]',

    net_revenue: '//h2[text()="Net Revenue"]/../h1',
    number_of_orders: '//h2[text()="Number of Orders"]/../h1',
    total_active_licenses: '//h2[text()="Total Active Licenses"]/../h1',
    deactivations: '//h2[text()="Deactivations"]/../h1',
    refunds: '//h2[text()="Refunds"]/../h1',

    top_selling_product: '(//h4[contains(text(), "Top Selling Products")]/../div//tr[1]/td)[1]',
    top_deactivation_reason: '//h4[contains(text(), "Top Deactivation Reasons")]/..//li[1]//span[1]',

    new_installs: '//h2[text()="New Installs"]/../div/h1',
    total_installs: '//h2[text()="Total Installs"]/../div/h1',
    revenue_via_coupon: '//h2[text()="Revenue via Coupon"]/../div/h1',
    avg_order_value: '//h2[text()="Avg Order Value"]/../div/h1',

    todays_revenue: '//h2[text()="Revenue"]/../div/span',
    todays_new_subscriptions: '//h2[text()="New Subscriptions"]/../div/span',
    todays_new_orders: '//h2[text()="New Orders"]/../div/span',
    todays_refunds: '(//h2[text()="Refunds"]/../div/span)[2]',

    skip_billing: '//span[normalize-space()="Skip for now"]'

};

let generateVersionNumber: { major, minor, patch: string } = {
    major: faker.datatype.number({ min: 0, max: 9 }),
    minor: faker.datatype.number({ min: 0, max: 9 }),
    patch: faker.datatype.number({ min: 0, max: 9 })
};

let orders_locator: {
    sales, orders, overview, create_order, select_variation, day, customer_name, email, customer_phone, price, submit,
    order_view, license_key, licenses, upgrade, week, delete, yes
} = {
    sales: '//span[text()="Sales"]',
    orders: '//a[normalize-space()="Orders"]',
    overview: '//a[normalize-space()="Overview"]',
    create_order: '//span[text()="Create Order"]',
    select_variation: '//div[@id="variation"]',
    day: '//li[normalize-space()="day"]',
    customer_name: '//input[@id="name"]',
    email: '//input[@id="email"]',
    customer_phone: '//input[@id="phone"]',
    price: '//input[@id="price"]',
    submit: 'submit',
    order_view: '//button[@class="mr-8 ant-btn"][1]',
    license_key: '//td[@class="tcol-license-key col-primary"][1]',
    licenses: '//span[normalize-space(text())="Licenses"]',
    upgrade: '//span[text()="Upgrade Variation"]',
    week: '//li[normalize-space()="week"]',
    delete: '//span[text()="Delete"]',
    yes: '//span[text()="Yes"]'

};

let email_locator: {
    email_navigate, email_digest, add_email_digest, send_to, frequency, weekly, send_on, send_on_day, send_at, send_at_time,
    digest_name, submit, success_message
} = {
    email_navigate: '//span[text()="Email"]',
    email_digest: '(//span[text()="Email Digest"])[1]',
    add_email_digest: '//span[text()="Add Email Digest"]',
    send_to: '//input[@id="send_to"]',
    frequency: '//div[@id="frequency"]',
    weekly: '//li[normalize-space()="Weekly"]',
    send_on: '//div[@id="send_on"]',
    send_on_day: '//li[normalize-space()="Wednesday"]',
    send_at: '//div[@id="send_at"]',
    send_at_time: '//li[normalize-space()="07:00 am"]',
    digest_name: '//input[@id="name"]',
    submit: '//span[text()="Submit"]',
    success_message: '//div[@class="ant-notification-notice-message"]'
};

let variation_locator: {
    pricing, add_new, variation_name, site_limit, variation_price, recurring_times, submit,
    success_message
} = {
    pricing: '//a[contains(text(),"Pricing")]',
    add_new: 'Add New',
    variation_name: '(//input[@placeholder="Enter variation name"])[5]',
    site_limit: '(//input[@placeholder="How many sites can be active"])[5]',
    variation_price: '(//input[@placeholder="Enter variation price"])[5]',
    recurring_times: '(//input[@placeholder="Recurring Times"])[5]',
    submit: '//span[contains(text(),"Submit")]',
    success_message: '//div[@class="ant-notification-notice-message"]',
};

let logout_locator: { avater_button, logout_button } = {
    avater_button: '//a[contains(@class,"ant-dropdown-link profile-menu")]',
    logout_button: '//a[normalize-space(text())="Logout"]',
};

let sales_overview_locator: {
    net_revenue, completed_orders, refunds, average_order_value, new_customer, refunded, new_subscriptions,
    renewal_orders, active_subscriptions, not_renewed: string
} = {
    net_revenue: '(//h3[@class="project-number"]//span)[1]',
    completed_orders: '(//h3[@class="project-number"]//span)[2]',
    refunds: '(//h3[@class="project-number"]//span)[3]',
    average_order_value: '(//h3[@class="project-number"]//span)[4]',
    new_customer: '(//h3[@class="project-number"]//span)[5]',
    refunded: '(//h3[@class="project-number"]//span)[6]',
    new_subscriptions: '(//h3[@class="project-number"]//span)[7]',
    renewal_orders: '(//h3[@class="project-number"]//span)[8]',
    active_subscriptions: '(//h3[@class="project-number"]//span)[9]',
    not_renewed: '(//h3[@class="project-number"]//span)[10]'
}

export { URL, SITE, login_locator, plugin_locator, theme_locator, bundle_locator, product_finding_locator, 
    dashboard_locator, generateVersionNumber, orders_locator, email_locator, logout_locator, variation_locator,  
    sales_overview_locator };
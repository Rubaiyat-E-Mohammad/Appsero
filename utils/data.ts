import * as faker from 'faker';

let base_url: string = "https://staging.appsero.com";

let plugin_data: {
    plugin_name, slug_name, plugin_version, php_version, wp_version, tested_upto_version,
    website_url, product_name: string
} = {

    plugin_name: "Free Plugin N2 xyz bdbknd asfdsadsad hfgh",
    slug_name: "free_plugin_n2_bodnldnl_dsad_asdada_ghfhfg",
    plugin_version: faker.finance.amount(0, 9, 1),
    php_version: "7.4",
    wp_version: "5.6",
    tested_upto_version: "5.8",
    website_url: "https://auto-appsero.s3-tastewp.com",
    product_name: "Test Product 1",

};

let theme_data: { theme_name, slug_name, theme_version, website_url, product_name: string } = {

    theme_name: "Free Theme n2 abc jvfhdsfhdsjf",
    slug_name: "free_theme_2_kbkbjkdsn",
    theme_version: faker.finance.amount(0, 9, 1),
    website_url: "https://auto-appsero.s3-tastewp.com",
    product_name: "Test Product 1",

};

let bundle_data: { bundle_name, slug_name, website_url, product_name: string, products_name: string[] } = {

    bundle_name: "Automated Bundle",
    slug_name: "automated_bundle",
    products_name: ["Automated Plugin 2", "Automated Theme 2"],
    website_url: "https://auto-appsero.s3-tastewp.com",
    product_name: "Test Product 1",

};

export { base_url, plugin_data, theme_data, bundle_data };
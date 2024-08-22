import * as faker from 'faker';

let base_url: string = "https://staging.appsero.com";

let plugin_data: { plugin_version, php_version, wp_version, tested_upto_version: string } = {

    plugin_version: faker.finance.amount(0, 9, 1),
    php_version: "7.4",
    wp_version: "4.9",
    tested_upto_version: "6.6",

};

export { base_url, plugin_data };
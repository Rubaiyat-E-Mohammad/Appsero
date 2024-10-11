import { test } from "@playwright/test";
import * as faker from 'faker';
import * as fs from "fs";
import * as dotenv from 'dotenv';
import { SITE } from '../utils/locators';

dotenv.config();

import { LoginPage } from "../pages/login";
import { DashboardPage } from "../pages/dashboard";
import { PluginCreate } from "../pages/pluginCreate";
import { ThemeCreate } from "../pages/themeCreate";
import { BundleCreate } from "../pages/bundleCreate";
import { BundleUpdate } from "../pages/bundleUpdate";
import { ProductDelete } from "../pages/productDelete";
import { PluginUpdate } from "../pages/pluginUpdate";
import { ThemeUpdate } from "../pages/themeUpdate";
import { OrderPage } from "../pages/orders";
import { ReleaseCreate } from "../pages/releaseCreate";
import { ReleaseUpdate } from "../pages/releaseUpdate";
import { ReleaseDelete } from "../pages/releaseDelete";


const plugins_name: string[] = [];
const themes_name: string[] = [];
const bundles_name: string[] = [];
const release_versions: string[] = [];
const updated_release_versions: string[] = [];
fs.writeFile('state.json', '{"cookies":[],"origins": []}', function () { });


/* ------------------------ Login ------------------------ */
test("Login", async ({ page }) => {

    const login = new LoginPage(page);
    await login.login(process.env.USER_NAME, process.env.PASSWORD);


});


/* ------------------------ Getting Dashboard Details ------------------------ */
test("Getting Dashboard Overview Details", async ({ page }) => {

    const dashboard = new DashboardPage(page);
    await dashboard.overview_details();

});


/* ------------------------ Free Plugin Create------------------------ */
test("Free Plugin Create", async ({ page }) => {

    const plugin = new PluginCreate(page);
    const free_plugin_name: string = faker.lorem.words(2); //Auto generated plugin name

    await plugin.free_plugin_create(free_plugin_name);
    plugins_name.push(free_plugin_name);

})

/* ------------------------ Pro Plugin Create------------------------ */
test("Pro Plugin Create", async ({ page }) => {

    const plugin = new PluginCreate(page);
    const pro_plugin_name: string = faker.lorem.words(2); //Auto generated plugin name
    const product_name: string = "WooCommercePluginTest"; //Product Name which will be connected with this plugin

    await plugin.pro_plugin_create(pro_plugin_name, SITE, product_name);
    plugins_name.push(pro_plugin_name);
})

/* ------------------------ Free Plugin Update------------------------ */
test("Free Plugin Update", async ({ page }) => {

    const plugin = new PluginUpdate(page);

    const new_plugin_name: string = faker.lorem.words(2);
    await plugin.free_plugin_update(plugins_name[0], new_plugin_name);
    plugins_name[0] = new_plugin_name;
})

/* ------------------------ Pro Plugin Update------------------------ */
test("Pro Plugin Update", async ({ page }) => {

    const plugin = new PluginUpdate(page);
    const new_plugin_name: string = faker.lorem.words(2);
    await plugin.pro_plugin_update(plugins_name[1], new_plugin_name);
    plugins_name[1] = new_plugin_name;
})


/* ------------------------ Free Theme Create ------------------------ */
test("Free Theme Create", async ({ page }) => {

    const theme = new ThemeCreate(page);
    const free_theme_name: string = faker.lorem.words(2); //Auto generated theme name
    await theme.free_theme_create(free_theme_name);
    themes_name.push(free_theme_name);

})

/* ------------------------ Pro Theme Create ------------------------ */
test("Pro Theme Create", async ({ page }) => {

    const theme = new ThemeCreate(page);
    const pro_theme_name: string = faker.lorem.words(2); //Auto generated theme name
    const theme_name: string = "WooCommerceThemeTest"; //Product Name which will be connected with this theme

    await theme.pro_theme_create(pro_theme_name, SITE, theme_name);
    themes_name.push(pro_theme_name);

})

/* ------------------------Free Theme Update------------------------ */
test("Free Theme Update", async ({ page }) => {

    const theme = new ThemeUpdate(page);
    const new_theme_name: string = faker.lorem.words(2);
    await theme.free_theme_update(themes_name[0], new_theme_name);
    themes_name[0] = new_theme_name;
})

/* ------------------------Pro Theme Update------------------------ */
test("Pro Theme Update", async ({ page }) => {

    const theme = new ThemeUpdate(page);
    const new_theme_name: string = faker.lorem.words(2);
    await theme.pro_theme_update(themes_name[1], new_theme_name);
    themes_name[1] = new_theme_name;
})


/* ------------------------ Bundle Create ------------------------ */
test("Bundle Create", async ({ page }) => {

    const bundle = new BundleCreate(page);

    const bundle_name: string = faker.lorem.words(2); //Auto generated bundle name
    const product_name: string = "WooCommerceBundleTest"; //Product Name which will be connected with this bundle
    const bundle_products: string[] = ["WooCommercePluginTest", "WooCommerceThemeTest"];

    await bundle.bundle_create(bundle_name, SITE, product_name, bundle_products);
    bundles_name.push(bundle_name);


})

/* ------------------------ Bundle Update ------------------------ */
test("Bundle Update", async ({ page }) => {

    const bundle = new BundleUpdate(page);

    let new_bundle_name: string = faker.lorem.words(2); //new bundle name
    await bundle.bundle_update(bundles_name[0], new_bundle_name);

    bundles_name[0] = new_bundle_name;

})


/* ------------------------Release Create of Free Plugin------------------------ */
test("Release Create of free plugin", async ({ page }) => {

    const product = new ReleaseCreate(page);

    release_versions.push(await product.free_release_create(plugins_name[0]));

})

/* ------------------------Release Create of Pro Plugin------------------------ */
test("Release Create of pro plugin", async ({ page }) => {

    const product = new ReleaseCreate(page);

    release_versions.push(await product.pro_release_create(plugins_name[1]));

})

/* ------------------------ Release Update of Free Plugin------------------------ */
test("Release Update of free plugin", async ({ page }) => {

    const product = new ReleaseUpdate(page);

    updated_release_versions.push(await product.free_release_update(plugins_name[0], release_versions[0]));

})

/* ------------------------ Release Update of Pro Plugin------------------------ */
test("Release Update of pro plugin", async ({ page }) => {

    const product = new ReleaseUpdate(page);

    updated_release_versions.push(await product.pro_release_update(plugins_name[1], release_versions[1]));

})

/* ------------------------ Order Create ------------------------ */
test("Order create", async ({ page }) => {
    const order = new OrderPage(page);
    await order.order_create(plugins_name[1]);
});

/* ------------------------ Variation Upgrade ------------------------ */
test("Variation Upgrade", async ({ page }) => {
    const order = new OrderPage(page);
    await order.variation_upgrade(plugins_name[1]);
});

/* ------------------------ Release Delete of free plugin------------------------ */
test("Release Delete of free plugin", async ({ page }) => {

    const product = new ReleaseDelete(page);
    await product.free_release_delete(plugins_name[0], updated_release_versions[0]);

})

/* ------------------------ Release Delete of pro plugin------------------------ */
test("Release Delete of pro plugin", async ({ page }) => {

    const product = new ReleaseDelete(page);
    await product.pro_release_delete(plugins_name[1], updated_release_versions[1]);

})

/* ------------------------ Order Delete ------------------------ */
test("Order delete", async ({ page }) => {
    const order = new OrderPage(page);
    await order.order_delete(plugins_name[1]);
});


/* ------------------------Free Plugin Delete ------------------------ */
test("Free Plugin Delete", async ({ page }) => {

    const product = new ProductDelete(page);

    await product.free_product_delete(plugins_name[0]);

})

/* ------------------------Pro Plugin Delete ------------------------ */
test("Pro Plugin Delete", async ({ page }) => {

    const product = new ProductDelete(page);

    await product.pro_product_delete(plugins_name[1]);

})

/* ------------------------Free Theme Delete ------------------------ */
test("Free Theme Delete", async ({ page }) => {

    const product = new ProductDelete(page);

    await product.free_product_delete(themes_name[0]);

})

/* ------------------------Pro Theme Delete ------------------------ */
test("Pro Theme Delete", async ({ page }) => {

    const product = new ProductDelete(page);

    await product.pro_product_delete(themes_name[1]);

})

/* ------------------------ Bundle Delete ------------------------ */
test("Bundle Delete", async ({ page }) => {

    const product = new ProductDelete(page);
    await product.pro_product_delete(bundles_name[0]);

})
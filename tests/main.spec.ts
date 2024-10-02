import { test } from "@playwright/test";
import * as faker from 'faker';
import * as fs from "fs";
import * as dotenv from 'dotenv';
import { SITE } from '../utils/locators';

// Load environment variables from .env file
dotenv.config();

import { LoginPage } from "../pages/login";
import { DashboardPage } from "../pages/dashboard";
import { PluginCreate } from "../pages/pluginCreate";
import { ThemeCreate } from "../pages/themeCreate";
import { BundleCreate } from "../pages/bundleCreate";
import { BundleUpdate } from "../pages/bundleUpdate";
import { ProductPage } from "../pages/products";
import { PluginUpdate } from "../pages/pluginUpdate";
import { ThemeUpdate } from "../pages/themeUpdate";


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

/* ------------------------ Plugin Update------------------------ */
test("Plugin Update", async ({ page }) => {

    const plugin = new PluginUpdate(page);
    for (let i: number = 0; i < plugins_name.length; i++) {
        const new_plugin_name: string = faker.lorem.words(2);
        await plugin.plugin_update(plugins_name[i], new_plugin_name);
        plugins_name[i] = new_plugin_name;
    }
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

/* ------------------------ Theme Update------------------------ */
test("Theme Update", async ({ page }) => {

    const theme = new ThemeUpdate(page);
    for (let i: number = 0; i < themes_name.length; i++) {
        const new_theme_name: string = faker.lorem.words(2);
        await theme.theme_update(themes_name[i], new_theme_name);
        themes_name[i] = new_theme_name;
    }
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


/* ------------------------ Release Create ------------------------ */
test("Release Create", async ({ page }) => {

    const product = new ProductPage(page);

    for (let i: number = 0; i < plugins_name.length; i++) {
        release_versions.push(await product.release_create(plugins_name[i]));
    }

})

/* ------------------------ Release Update ------------------------ */
test("Release Update", async ({ page }) => {

    const product = new ProductPage(page);

    for (let i: number = 0; i < plugins_name.length; i++) {
        updated_release_versions.push(await product.release_update(plugins_name[i], release_versions[i]));
    }

})

/* ------------------------ Release Delete ------------------------ */
test("Release Delete", async ({ page }) => {

    const product = new ProductPage(page);

    for (let i: number = 0; i < plugins_name.length; i++) {
        await product.release_delete(plugins_name[i], updated_release_versions[i]);
    }

})


/* ------------------------ License CRUD ------------------------ */
// test("License CRUD", async ({ page }) => {

//     const product = new ProductPage(page);

//     /* -------- License Create -------- */
//     for (let i: number = 0; i < products_name.length; i++) {
//         await product.license_create(products_name[i]);
//     }

//     /* -------- License Update -------- */
//     for (let i: number = 0; i < products_name.length; i++) {
//         await product.license_update(products_name[i]);
//     }

//     /* -------- License Delete -------- */
//     for (let i: number = 0; i < products_name.length; i++) {
//         await product.license_delete(products_name[i]);
//     }

// })


/* ------------------------ Plugin Delete ------------------------ */
test("Plugin Delete", async ({ page }) => {

    const product = new ProductPage(page);

    for (let i: number = 0; i < plugins_name.length; i++) {
        await product.product_delete(plugins_name[i]);
    }

})

/* ------------------------ Theme Delete ------------------------ */
test("Theme Delete", async ({ page }) => {

    const product = new ProductPage(page);

    for (let i: number = 0; i < themes_name.length; i++) {
        await product.product_delete(themes_name[i]);
    }

})

/* ------------------------ Bundle Delete ------------------------ */
test("Bundle Delete", async ({ page }) => {

    const product = new ProductPage(page);

    for (let i: number = 0; i < bundles_name.length; i++) {
        await product.product_delete(bundles_name[i]);
    }

})
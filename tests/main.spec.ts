import { test } from "@playwright/test";
import * as data from "../utils/data";

import { LoginPage } from "../pages/login";
import { DashboardPage } from "../pages/dashboard";
import { PluginPage } from "../pages/plugin";
import { ThemePage } from "../pages/theme";
import { BundlePage } from "../pages/bundle";
import { ProductPage } from "../pages/products";


/* ------------------------ Login ------------------------ */
test("Login", async ({ page }) => {

    const login = new LoginPage();
    await login.login(process.env.USER_NAME, process.env.PASSWORD);

});


/* ------------------------ Getting Dashboard Details ------------------------ */
test("Getting Dashboard Overview Details", async ({ page }) => {

    const dashboard = new DashboardPage(page);
    await dashboard.overview_details();
});


// test("Plugin Create & Details", async ({ page }) => {

//     const plugin = new PluginPage(page);

//     await plugin.free_plugin_create();
//     await plugin.pro_plugin_create(data.plugin_data.website_url, data.plugin_data.product_name);

//     /* -------- Plugin Update -------- */
//     /**
//      * plugin_name = Any valid plugin name and this plugin will be updated
//      * data.plugin_data = this "plugin_name" plugin will be updated with this new data
//      */

//     let plugin_name: string = "Automated Plugin"; //Any valid updateable plugin name
//     await plugin.plugin_update(data.plugin_data, plugin_name);

// })


// /* ------------------------ Theme ------------------------ */
// test("Theme Create & Details", async ({ page }) => {

//     const theme = new ThemePage(page);

//     theme.free_theme_create();
//     theme.pro_theme_create(data.theme_data.website_url, data.theme_data.product_name);

//     /* -------- Theme Update -------- */
//     /**
//      * theme_name = Any valid theme name and this theme will be updated
//      * data.theme_data = this "theme_name" theme will be updated with this new data
//      */

//     let theme_name: string = "Automated Theme 2";
//     await theme.theme_update(data.theme_data, theme_name);

// })


// /* ------------------------ Bundle ------------------------ */
// test("Bundle Create & Details", async ({ page }) => {

//     const bundle = new BundlePage(page);

//     await bundle.bundle_create(data.bundle_data);

//     /* -------- Bundle Update -------- */
//     /**
//      * bundle_name = Any valid bundle name and this bundle will be updated
//      * data.bundle_data = this "bundle_name" bundle will be updated with this new data
//      */

//     let bundle_name: string = "Automated Bundle"; //Any valid updateable bundle name
//     await bundle.bundle_update(data.bundle_data, bundle_name);

// })


// /* ------------------------ Products Delete ------------------------ */
// test("Prodcut Delete", async ({ page }) => {

//     const product = new ProductPage(page);
//     let product_name: string = data.plugin_data.plugin_name; // Product Name could be any valid Plugin/Theme/Bundle name;
//     product.product_delete(product_name);

// })

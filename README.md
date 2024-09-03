# Appsero (Playwright)

Appsero UI Automation Test Suite using Playwright

## Table of contents

-   [Pre-requisites](#pre-requisites)
    -   [Install Node.js](#install-node.js)
    -   [Install NVM](#install-nvm)
-   [Running tests](#running-tests)
    -   [Pre work for running the tests](#pre-work-for-running-the-tests)
    -   [How to run tests](#how-to-run-tests)

## Pre-requisites

### Install Node.js

Follow [instructions on the node.js site](https://nodejs.org/en/download/) to install Node.js.

### Install NVM

Follow instructions in the [NVM repository](https://github.com/nvm-sh/nvm) to install NVM.

## Running tests

### Pre work for running the tests

Clone this repository

-   `git clone https://github.com/Rubaiyat-E-Mohammad/Appsero.git`

Run the followings in a terminal/command line window

```bash
cd tests
```

-   `npm install` to install the required dependencies (@playwright/test, dotenv, @faker-js/faker)

Make a .env file according to .env.example file

### How to run tests

To run the tests suite, use the following command:

```bash
npx playwright test
```

const { Given, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

// Tell Cucumber to wait up to 60 seconds for steps to finish
setDefaultTimeout(60 * 1000); 

let browser;
let page;

Before(async function () {
    // Adding extra launch arguments makes the background browser open much faster
    browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    page = await browser.newPage();
});

Given('I open the browser and go to google', async function () {
    await page.goto('https://www.google.com');
});

After(async function () {
    // This safety check prevents the "Cannot read properties of undefined (reading 'close')" error
    if (page) await page.close();
    if (browser) await browser.close();
});
const puppeteer = require('puppeteer-extra');
const { launchStealthBrowser } = require('../stealth');

const scrapeData = async (url, selector) => {
    try {
        const browser = await launchStealthBrowser();
        const page = await browser.newPage();
        await page.goto(url);

        const result = await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            return element ? element.innerText : null;
        }, selector);

        await browser.close();
        return result;
    } catch (error) {
        console.error('Error during scraping:', error);
        throw new Error('Scraping failed');
    }
};

module.exports = { scrapeData };

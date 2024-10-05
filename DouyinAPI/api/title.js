const puppeteer = require('puppeteer');

async function getTitle(videoUrl) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(videoUrl, { waitUntil: 'networkidle2' });

        // Scrape title
        const title = await page.evaluate(() => {
            let titleElement = document.querySelector('.title-selector'); // Replace with actual selector
            return titleElement ? titleElement.innerText : '';
        });

        await browser.close();
        return title;
    } catch (error) {
        console.error("Error fetching title:", error);
        throw error;
    }
}

module.exports = { getTitle };

const puppeteer = require('puppeteer');

async function getShares(videoUrl) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(videoUrl, { waitUntil: 'networkidle2' });

        // Scrape shares logic
        const sharesCount = await page.evaluate(() => {
            let sharesElement = document.querySelector('.shares-selector'); // Replace with actual selector
            return sharesElement ? sharesElement.innerText : '0';
        });

        await browser.close();
        return sharesCount;
    } catch (error) {
        console.error("Error fetching shares:", error);
        throw error;
    }
}

module.exports = { getShares };

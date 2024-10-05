const puppeteer = require('puppeteer');

async function getTrending() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://www.douyin.com/trending', { waitUntil: 'networkidle2' });

        // Scrape trending topics
        const trendingTopics = await page.evaluate(() => {
            let trendElements = document.querySelectorAll('.trending-item-selector'); // Replace with actual selector
            return Array.from(trendElements).map(el => el.innerText);
        });

        await browser.close();
        return trendingTopics;
    } catch (error) {
        console.error("Error fetching trending topics:", error);
        throw error;
    }
}

module.exports = { getTrending };

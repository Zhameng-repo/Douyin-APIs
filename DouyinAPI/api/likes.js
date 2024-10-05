const puppeteer = require('puppeteer');

async function getLikes(videoUrl) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(videoUrl, { waitUntil: 'networkidle2' });

        // Scrape likes logic
        const likesCount = await page.evaluate(() => {
            let likesElement = document.querySelector('.likes-selector'); // Replace with actual selector
            return likesElement ? likesElement.innerText : '0';
        });

        await browser.close();
        return likesCount;
    } catch (error) {
        console.error("Error fetching likes:", error);
        throw error;
    }
}

module.exports = { getLikes };

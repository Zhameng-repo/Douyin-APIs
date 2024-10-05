const puppeteer = require('puppeteer');

async function getComments(videoUrl) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(videoUrl, { waitUntil: 'networkidle2' });

        // Scrape comments logic
        const comments = await page.evaluate(() => {
            let commentElements = document.querySelectorAll('.comment-element-selector'); // Replace with actual selector
            return Array.from(commentElements).map(el => el.innerText);
        });

        await browser.close();
        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

module.exports = { getComments };

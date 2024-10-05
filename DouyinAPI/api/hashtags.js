const puppeteer = require('puppeteer-extra');
const { launchStealthBrowser } = require('../stealth/stealth');

const getHashtags = async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).json({ success: false, message: 'URL is required' });
    }

    try {
        const browser = await launchStealthBrowser();
        const page = await browser.newPage();
        await page.goto(videoUrl);

        const hashtags = await page.evaluate(() => {
            // Scrape hashtag dari video
            return Array.from(document.querySelectorAll('.hashtag')).map(tag => tag.innerText);
        });
        await browser.close();

        res.json({ success: true, hashtags });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve hashtags', error });
    }
};

module.exports = { getHashtags };

const puppeteer = require('puppeteer-extra');
const { launchStealthBrowser } = require('../stealth/stealth');

const downloadVideo = async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).json({ success: false, message: 'URL is required' });
    }

    try {
        const browser = await launchStealthBrowser();
        const page = await browser.newPage();
        await page.goto(videoUrl);

        const videoSrc = await page.evaluate(() => document.querySelector('video').src);
        await browser.close();

        res.json({ success: true, videoUrl: videoSrc });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to download video', error });
    }
};

module.exports = { downloadVideo };

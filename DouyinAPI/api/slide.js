const puppeteer = require('puppeteer-extra');
const { launchStealthBrowser } = require('../stealth/stealth');

const downloadSlide = async (req, res) => {
    const slideUrl = req.query.url;
    if (!slideUrl) {
        return res.status(400).json({ success: false, message: 'URL is required' });
    }

    try {
        const browser = await launchStealthBrowser();
        const page = await browser.newPage();
        await page.goto(slideUrl);

        const slideSrc = await page.evaluate(() => {
            // Scraping slide di sini
            return document.querySelector('img').src;  // Contoh untuk gambar slide
        });
        await browser.close();

        res.json({ success: true, slideUrl: slideSrc });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to download slide', error });
    }
};

module.exports = { downloadSlide };

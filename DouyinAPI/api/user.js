const puppeteer = require('puppeteer-extra');
const { launchStealthBrowser } = require('../stealth/stealth');

const getUserInfo = async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required' });
    }

    try {
        const browser = await launchStealthBrowser();
        const page = await browser.newPage();
        await page.goto(`https://www.douyin.com/user/${username}`);

        const userInfo = await page.evaluate(() => {
            return {
                name: document.querySelector('.username').innerText,
                followers: document.querySelector('.followers').innerText,
                likes: document.querySelector('.likes').innerText,
                totalVideos: document.querySelector('.total-videos').innerText,
            };
        });

        await browser.close();
        res.json({ success: true, data: userInfo });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve user info', error });
    }
};

module.exports = { getUserInfo };

const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');

async function getSound(videoUrl) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(videoUrl, { waitUntil: 'networkidle2' });

        // Scrape sound URL
        const soundUrl = await page.evaluate(() => {
            let soundElement = document.querySelector('.sound-selector'); // Replace with actual selector
            return soundElement ? soundElement.src : null;
        });

        if (!soundUrl) throw new Error('Sound not found');

        // Download sound
        const response = await axios.get(soundUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream('sound.mp3');
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await browser.close();
        return 'sound.mp3';
    } catch (error) {
        console.error("Error fetching sound:", error);
        throw error;
    }
}

module.exports = { getSound };

const puppeteer = require('puppeteer')
const fs = require('fs')

const args = process.env.IS_DOCKER ? [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--blink-settings=imagesEnabled=true',
] : [
    '--blink-settings=imagesEnabled=true',
];

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 100;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
};

const getPdfFromUrl = async (req, res) => {
    const { url, name, size } = req.body;
    try {
        let nameFile;
        if (name) nameFile = name
        else nameFile = `pdf_${Date.now()}`

        const browser = await puppeteer.launch({ headless: true, args });
        const page = await browser.newPage();
        try {
            try {
                await page.goto(url, { waitUntil: 'networkidle0' });
            } catch (e) {
                await page.goto("http://" + url, { waitUntil: 'networkidle0' });
            }
        } catch (e) {
            res.status(404).json({ error: "Page not found" });
        }
        await autoScroll(page);
        const pdf = await page.pdf({
            format: size || 'A2',
            printBackground: true
        });
        await browser.close();

        const route = `documents/${nameFile}.pdf`;
        fs.writeFileSync(route, pdf, 'binary');
        res.status(200).download(route);
    }
    catch (e) {
        console.log("Error: ", e);
        res.status(500).json({ error: "Internal Error" })
    }
}

module.exports = { getPdfFromUrl }
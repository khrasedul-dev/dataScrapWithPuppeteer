const puppeteer = require('puppeteer')
const express = require('express')


const app = express()


app.get("/", async (req, res) => {

    const url = 'https://facebook.com/100032541319962/posts/575774756850563'

    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 20,
        args: [
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    })
    
    const page = await browser.newPage()

    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36')
    
    page.setDefaultNavigationTimeout(100000)

    page.setViewport({width: 1000,height: 600})

    await page.goto('https://facebook.com',{waitUntil: "networkidle2"})

    await page.waitForSelector('#email')

    await page.type(`#email`,"rasedul@zetmail.com")

    await page.type('#pass',"rps1234@")


    await page.click(`[type="submit"]`)

    await page.goto(url,{waitUntil: "networkidle2"})

    const data = await page.$eval('*',(el)=>el.innerText)

    res.json({data: data })


    await browser.close()
});


app.listen(process.env.PORT || 8080)
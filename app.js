const puppeteer = require('puppeteer')
const express = require('express')


const app = express()


app.get("/", async (req, res) => {

    const url = 'https://www.facebook.com/100032541319962/posts/575774756850563'

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
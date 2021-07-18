const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const file = 'result-puppetter.json';
var obj = {
    table: []
 };

async function scrape() {
    const browser = await puppeteer.launch({
        //args: ['--proxy-server=socks5://127.0.0.1:' + port]
        headless: false
    });

    const page = await browser.newPage();
    await page.goto('https://www.ebay.co.uk/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=car&_sacat=0&LH_TitleDesc=0&_odkw=playstation+1&_osacat=0');
    const content = await page.content();

    const $ = cheerio.load(content);
    $('.s-item').each((i, el) => {
        $('.LIGHT_HIGHLIGHT').remove();

        const titles = $(el)
        .find(".s-item__title")
        .text()
        .replace(/,/,' ')
        //.replace(remove, '')

        const price = $(el)
        .find('.s-item__price')
        .eq(0)
        .text()
        .replace(/\s\s+/g, '')
        .replace(/,/,' ');

        if (titles  === "") {
            console.log("Removing empty value from " + file)
        }
        else {
            obj.table.push({"title": titles, "price": price});
            console.log(titles, price)
        }

    });

    fs.writeFile(file , JSON.stringify(obj), err => {
        if (err) throw err; 
       
        console.log("Writing done");
    });

}

async function main() {

    console.log(await scrape())
}

main();
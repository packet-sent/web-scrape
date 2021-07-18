const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const file = 'result-cheerio.json';
var obj = {
    table: []
 };


request('https://www.ebay.co.uk/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=car&_sacat=0&LH_TitleDesc=0&_odkw=playstation+1&_osacat=0', (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
        
        
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

    
} );
const path = require('path');
const puppeteer = require('puppeteer');
const parser = require('node-html-parser');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const filePath = path.join(__dirname, 'index.html');

    (async () => {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(filePath, {waitUntil: 'networkidle0'});
        const html = await page.content(); // serialized HTML of page DOM.

        const testPNG = parser.parse(html).querySelector('img').getAttribute('src')
        console.log(testPNG);
        context.log(testPNG);
      
        context.res = {
            // headers: {
            //     "Content-Type": "image/png"
            // },
            // isRaw: true,
            // status: 200, /* Defaults to 200 */
            body: testPNG
            // body: body.getElementById("chart_div")
        };

        await browser.close();
        return html;
      })();

      //Could return response here but it's not working
    // context.res = {
    //     // headers: {
    //     //     "Content-Type": "image/png"
    //     // },
    //     // isRaw: true,
    //     // status: 200, /* Defaults to 200 */
    //     body: responseMessage
    //     // body: body.getElementById("chart_div")
    // };
}
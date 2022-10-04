const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const parser = require('node-html-parser');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    let body = {}

    // Read an HTML file in the directory and return the contents /////DONEST WORK CAUSE CHROME ISN"T HIT 
    // // let test = fs.readFile(path.resolve(__dirname, 'index.html'), 'UTF-8', (err, htmlContent) => {

    // //     if (err) {
    // //         console.log(err);
    // //     }
    // //     body = htmlContent;

    // //     console.log(body);

    // //     console.log(body.getElementById("chart_div"));
    // //     // context.done(null, res);
    // // });
    // // console.log(test);
    


    const filePath = path.join(__dirname, 'index.html');

    (async () => {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(filePath, {waitUntil: 'networkidle0'});
        const html = await page.content(); // serialized HTML of page DOM.

        const testPNG = parser.parse(html).querySelector('img').getAttribute('src')
        console.log(testPNG);
        // context.res = {
        //     headers: {
        //         "Content-Type": "image/png"
        //     },
        //     isRaw: true,
        //     status: 200, /* Defaults to 200 */
        //     // body: responseMessage
        //     body: testPNG
        // };
        
        
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



    // axios.get(filePath).then(function(response){
    //     this.markDownData = response.data
    // });

    // (async () => {
    //     const text = await fetch(filePath);
    //     body = text;
    //     console.log(body);

    //     console.log(body.getElementById("chart_div"));
    // })();

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
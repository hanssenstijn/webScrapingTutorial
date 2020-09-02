const puppeteer = require('puppeteer');

async function scrapeProduct(url) {

  // start browser
  const browser = await puppeteer.launch();

  // set up blank page
  const page = await browser.newPage();
  await page.goto(url);

  // $x way to select by xpath
  // select image
  const [el] = await page.$x('//*[@id="imgBlkFront"]');
  const src = await el.getProperty('src');
  const imageURL = await src.jsonValue();

  // select title
  const [el2] = await page.$x('//*[@id="productTitle"]');
  const txt = await el2.getProperty('textContent');
  const title = await txt.jsonValue();

  // select prize
  const [el3] = await page.$x('//*[@id="a-autoid-9-announce"]/span[2]/span');
  const txt2 = await el3.getProperty('textContent');
  const prize = await txt2.jsonValue();

  console.log({ imageURL, title, prize });

  browser.close();
}

scrapeProduct('https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X');


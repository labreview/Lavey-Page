import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#555">
<img id="g" src="http://localhost:3000/brand_assets/Teambeats%20Studio/Screenshot_20-6-2026_16318_.jpeg" style="width:1325px;display:block;">
</body></html>`;
await page.setContent(html);
await page.waitForSelector("#g");
await new Promise(r => setTimeout(r, 3000));

const imgH = await page.evaluate(() => document.querySelector("#g").getBoundingClientRect().height);
console.log("image display height:", imgH);

const steps = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000];
for (const y of steps) {
  await page.evaluate(y => window.scrollTo(0, y), y);
  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: `temporary screenshots/map_${y}.png` });
}
await browser.close();
console.log("done");

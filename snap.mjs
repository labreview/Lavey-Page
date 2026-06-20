import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/teambeats.html", { waitUntil: "networkidle2", timeout: 30000 });
await new Promise(r => setTimeout(r, 1000));

// scroll slowly to trigger lazy-loading and GSAP
for (let y = 0; y <= 5000; y += 300) {
  await page.evaluate(y => window.scrollTo(0, y), y);
  await new Promise(r => setTimeout(r, 80));
}

// Section 2 settled (Sapporo)
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.3));
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: "temporary screenshots/tb_sap.png" });

// Lower in Sapporo section
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.7));
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: "temporary screenshots/tb_sap2.png" });

await browser.close();
console.log("done");

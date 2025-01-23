import * as fs from'fs'
fs.readdirSync("./dist/assets").map((file)=>{
    if(file=='.git'){
        return
    }if(file=='projet'){
        return
    }
    if(file=='situation'){
        return
    }

    fs.writeFileSync("./dist/assets/"+file,fs.readFileSync("./dist/assets/"+file).toString().replace("]]>"," >"))
})
import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://thomas-iniguez-visioli.github.io/portfolio/test.html', { waitUntil: 'load' }); // Remplacez par l'URL que vous souhaitez scraper
  await page.pdf({ path: 'public/cv_stage_bts.pdf', format: 'A4' }); 
  await page.pdf({ path: 'dist/cv_stage_bts.pdf', format: 'A4' }); 
  await browser.close();
})();


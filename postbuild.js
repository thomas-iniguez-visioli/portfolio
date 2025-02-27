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

    fs.writeFileSync("./docs/assets/"+file,fs.readFileSync("./docs/assets/"+file).toString().replace("]]>"," >"))
})/*
import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://thomas-iniguez-visioli.github.io/portfolio/test.html', { waitUntil: 'load' }); // Remplacez par l'URL que vous souhaitez scraper
  if (fs.existsSync('public/cv_stage_bts.pdf')) {
    fs.unlinkSync('public/cv_stage_bts.pdf');
  }
  await page.pdf({ path: 'public/cv_stage_bts.pdf',  margin: { top: '1px', right: '1px', bottom: '1px', left: '1px' } }); 
  if (fs.existsSync('dist/cv_stage_bts.pdf')) {
    fs.unlinkSync('dist/cv_stage_bts.pdf');
  }
  await page.pdf({ path: 'dist/cv_stage_bts.pdf',  margin: { top: '1px', right: '1px', bottom: '1px', left: '1px' } }); 
  await browser.close();
})();*/


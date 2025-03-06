import * as fs from'fs'
const config=JSON.parse(fs.readFileSync('./config.json'))

console.log("test")
const getlayout=(title)=>{
  if(title=="projet"){
    return "journal"
  }else{
    return "reading-note"
  }
}
fs.writeFileSync("./.github/workflows/main.yml",fs.readFileSync("./.github/workflows/main.yml").toString().replace("githubname",config.githubname).replace("githubrepo",config.githubrepo))
const tobuild=fs.readdirSync("./public/static", { withFileTypes: true }).filter(de => de.isDirectory()).map((file)=>{


 fs.readdirSync("./public/static/"+file.name).map((item)=>{
    fs.writeFileSync(`./src/source/_posts/${file.name.toLowerCase()}-${item.replace(".txt","")}.md`,`---
title: ${item.replace(".txt","")}
date: ${new Date().toISOString()}
tags:
layout: '${getlayout(file.name.toLowerCase())}'
category: 
  - ${getlayout(file.name.toLowerCase())}
---
${fs.readFileSync("./public/static/"+file.name+"/"+item).toString()}`)
      return fs.readFileSync("./public/static/"+file.name+"/"+item).toString()
    }).join("")
})
console.log(tobuild)
import * as https from 'node:https'
import * as dns from 'dns'

const staticDnsAgent = (resolvconf) => new https.Agent({
  lookup: (hostname, opts, cb) => {
    console.log(resolvconf[0].address)
    console.log(hostname)
    console.log(opts)
  console.log(  cb(null, resolvconf[0].address, resolvconf[0].family))
  }
});
var resolvConf=[]
resolvConf.push({
  address: '82.67.8.211', 
  family: 4,
})
function curlEquivalent(url) {
  const filePath = `./public/feed.xml`;
  const file = fs.createWriteStream(filePath+".new");
  const request = https.get(url,  /*{agent: staticDnsAgent(resolvConf)},*/response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(fs.readdirSync("./public"))
      fs.renameSync('./public/feed.xml.new','./public/feed.xml')
      console.log(`File downloaded and saved to ${filePath}`);
    });
    file.on("error",((err)=>{console.log(err)}))
  }).on('error', err => {
   //fs.unlinkSync(filePath);
    console.log(err.message);
  });
}
curlEquivalent("https://feed-blush.vercel.app/atom.xml")


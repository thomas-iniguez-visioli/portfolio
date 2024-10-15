import * as fs from "fs"
const banned=[".git"]
const old=fs.readdirSync("./dist")
fs.readdirSync("./dist").map((item)=>{
  console.log(item)
  if(banned.includes(item)){return}
  fs.writeFileSync("./dist/"+item,fs.readFileSync("./dist/"+item).toString().replace(item,item.split(".")[0].split("-")[0]+"."+item.split(".")[1])
  fs.renameSync("./dist/"+item,"./dist/"+item.split(".")[0].split("-")[0]+"."+item.split(".")[1])
})

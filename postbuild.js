import * as fs from "fs"
const banned=[".git"]
const old=fs.readdirSync("./dist")
fs.readdirSync("./dist").map((item)=>{
  console.log(item)
  if(banned.includes(item)){return}
    old.map((ech)=>{
  fs.writeFileSync("./dist/"+item,fs.readFileSync("./dist/"+item).toString().replace(ech,ech.split(".")[0].split("-")[0]+"."+ech.split(".")[1]))}
  fs.renameSync("./dist/"+item,"./dist/"+item.split(".")[0].split("-")[0]+"."+item.split(".")[1])
})

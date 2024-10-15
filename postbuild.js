import * as fs from "fs"
fs.readdirSync("./dist").map((item)=>{
  console.log(item)
  fs.renameSync("./dist/"+item,item.split(".")[0].split("-")[0]+"."+item.split(".")[1])
})

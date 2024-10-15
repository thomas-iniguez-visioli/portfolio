import * as fs from "fs"
fs.readDirSync("./dist").map((item)=>{
  console.log(item)
})

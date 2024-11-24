import * as fs from'fs'
fs.readdirSync("./dist").map((file)=>{
    fs.writeFileSync("./dist"+file,fs.readFileSync("./dist"+file).toString().replace("]]>"," "))
})
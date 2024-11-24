import * as fs from'fs'
fs.readdirSync("./dist").map((file)=>{
    if(file=='.git'){
        return
    }

    fs.writeFileSync("./dist/"+file,fs.readFileSync("./dist/"+file).toString().replace("]]>"," >"))
})
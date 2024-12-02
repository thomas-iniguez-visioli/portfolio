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
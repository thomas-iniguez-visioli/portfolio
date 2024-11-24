import * as fs from'fs'
fs.readdirSync("./dist").map((file)=>{
    if(file=='.git'){
        return
    }if(file=='projet'){
        return
    }
    if(file=='situation'){
        return
    }

    fs.writeFileSync("./dist/"+file,fs.readFileSync("./dist/"+file).toString().replace("]]>"," >"))
})
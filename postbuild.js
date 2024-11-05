const fs = require("fs")
const config=require("./config.json")
const banned=[".git"]
const old=fs.readdirSync("./public/projet")
fs.writeFileSync("./index.html",fs.readFileSync("./index.html").toString().replace("peoplename",config.name))
fs.writeFileSync("./src/App.vue",fs.readFileSync("./src/App.vuel").toString().replace("peoplename",config.name))
fs.writeFileSync("./.github/workflows/main.yml",fs.readFileSync("./.github/workflows/main.yml").toString().replace("githubname",config.githubname).replace("githubrepo",config.githubrepo))
fs.writeFileSync("./src/components/TheWelcome.vue",`
<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'

</script>

<template>
${old.map((item)=>{
  return `<p></p><p></p>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>${item.split(".")[0]}</template>

   
  </WelcomeItem>`
})}
  
  
</template>
`)


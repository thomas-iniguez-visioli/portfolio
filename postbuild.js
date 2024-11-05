import * as fs from "fs"
const banned=[".git"]
const old=fs.readdirSync("./public/projet")
fs.writeFileSync("./src\\components\\TheWelcome.vue",`
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


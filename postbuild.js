import * as fs from'fs'
const config=JSON.parse(fs.readFileSync('./config.json'))
const banned=[".git"]

fs.writeFileSync("./index.html",fs.readFileSync("./index.html").toString().replace("peoplename",config.name))
fs.writeFileSync("./src/App.vue",fs.readFileSync("./src/App.vue").toString().replace("peoplename",config.name))
fs.writeFileSync("./.github/workflows/main.yml",fs.readFileSync("./.github/workflows/main.yml").toString().replace("githubname",config.githubname).replace("githubrepo",config.githubrepo))
fs.readdirSync("./public/", { withFileTypes: true }).filter(de => de.isDirectory()).map((file)=>{
  fs.writeFileSync(`./src/components/${file.name.toLowerCase()}.vue`,`
    <script setup>
    import WelcomeItem from './${file.name}Item.vue'
    import DocumentationIcon from './icons/IconDocumentation.vue'
    
    </script>
    
    <template>
    ${fs.readdirSync("./public/"+file.name).map((item)=>{
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
    fs.writeFileSync(`./src/components/${file.name}Item.vue`,`
     <script setup>
import { RouterLink} from 'vue-router'
import {  onMounted } from 'vue'
import * as c from '../temp'
const log=c.default.setup()
console.log(log)
onMounted(() => {
 
Object.keys(document.getElementsByTagName("a")).map((ite)=>{
  const item=document.getElementsByTagName("a")[ite]
  console.log(item.href)
  if(item.id){
    //console.log(item.parentElement)
    log.info(item.href.includes("${file.name}"))
    if(!item.href.includes("${file.name}")){
      item.href=item.href+"portfolio/local/${file.name}/"+item.textContent.split("/")[item.textContent.split("/").length-1]
    }
    
    log.info(item.href)
    //item.text=item.parentElement.name.tex
    //return item
  }
  
})})

</script>
<script>

</script>
<template>
 
          <a href="/" id="redirect"> <slot name="heading" id ="name"></slot></a>
       
     
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>

      `)
})



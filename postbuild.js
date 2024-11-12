import * as fs from'fs'
const config=JSON.parse(fs.readFileSync('./config.json'))
const banned=[".git"]

fs.writeFileSync("./index.html",fs.readFileSync("./index.html").toString().replace("peoplename",config.name))
fs.writeFileSync("./src/App.vue",fs.readFileSync("./src/App.vue").toString().replace("peoplename",config.name))
fs.writeFileSync("./.github/workflows/main.yml",fs.readFileSync("./.github/workflows/main.yml").toString().replace("githubname",config.githubname).replace("githubrepo",config.githubrepo))
fs.writeFileSync("./src/components/TheWelcome.vue",`
  <script setup>
  import WelcomeItem from './WelcomeItem.vue'
  import DocumentationIcon from './icons/IconDocumentation.vue'
  
  </script>
  
  <template>
  ${fs.readdirSync("./public/projet").map((item)=>{
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
  fs.writeFileSync("./src/components/situation.vue",`
    <script setup>
    import WelcomeItem from './situationItem.vue'
    import DocumentationIcon from './icons/IconDocumentation.vue'
    
    </script>
    
    <template>
    ${fs.readdirSync("./public/situation").map((item)=>{
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


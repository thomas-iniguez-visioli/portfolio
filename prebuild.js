import * as fs from'fs'
const config=JSON.parse(fs.readFileSync('./config.json'))

console.log("test")
fs.writeFileSync("./index.html",fs.readFileSync("./index.html").toString().replace("peoplename",config.name))
fs.writeFileSync("./src/App.vue",fs.readFileSync("./src/App.vue").toString().replace("peoplename",config.name))
fs.writeFileSync("./.github/workflows/main.yml",fs.readFileSync("./.github/workflows/main.yml").toString().replace("githubname",config.githubname).replace("githubrepo",config.githubrepo))
const tobuild=fs.readdirSync("./public/", { withFileTypes: true }).filter(de => de.isDirectory()).map((file)=>{
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
        <template #heading>${item.split(".")[0].replace("-",'')}</template>
    
       
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

onMounted(() => {
 
Object.keys(document.getElementsByTagName("a")).map((ite)=>{
  const item=document.getElementsByTagName("a")[ite]
  console.log(item.href)
  if(item.id){
    //console.log(item.parentElement)
    log.info(item.href.includes("${file.name}"))

      item.href=window.location.href+"${file.name}/"+item.textContent.split("/")[item.textContent.split("/").length-1]
    item.href=item.href.replace("situationsituation",'situation').replace("projetprojet",'projet')
    
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
      return file.name
})
fs.writeFileSync("./src/router/index.js",`import { createRouter,createWebHistory} from 'vue-router'


const gen=(p,type)=>{
  console.log(type+"/"+p+".txt")
return type+"/"+p+".txt"
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:() => import('../views/HomeView.vue')
    }, {
      path: '/situation',
      name: 'situation',
      component:() => import('../views/situation.vue')
    },{
      path: '/suivi',
      name: 'veille',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/suiviView.vue')
    },
    {
      path: '/cv',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }, ${tobuild.map((folder)=>{
      return fs.readdirSync(`./public/${folder}`).map((file)=>{
return `{
      path: '/${folder}/${file.split(".")[0].replace("-",'')}',
      name: '${folder}-${file.split(".")[0]}',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:()=>{return {name:gen("${file.split(".")[0]}",'${folder}')}}
    }`
      }).join(",")
    }).join(",\n")}
  ]
})

export default router
`)
import * as https from 'node:https'
import * as dns from 'dns'
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const staticDnsAgent = (resolvconf) => new https.Agent({
  lookup: (hostname, opts, cb) => {
    console.log(resolvconf)
    console.log(hostname)
    console.log(opts)
    cb(null, resolvconf, undefined)
  }
});
var resolvConf=[]
resolvConf.push({
  address: '82.67.8.211', 
  family: 4,
})
function curlEquivalent(url) {
  const filePath = `public/${url.split('/').pop()}`;
  const file = fs.createWriteStream(filePath+".new");
  const request = https.get(url,  {agent: staticDnsAgent(resolvConf)},response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      fs.renameSync('public/feed.xml.new','public/feed.xml')
      console.log(`File downloaded and saved to ${filePath}`);
    });
  }).on('error', err => {
   //fs.unlinkSync(filePath);
    console.log(err.message);
  });
}
curlEquivalent("https://bonjourlafuite.eu.org/feed.xml")


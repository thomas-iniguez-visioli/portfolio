<script setup>
import { RouterLink, RouterView } from 'vue-router'
import VueRssFeed from "./VueRssFeed.vue";
  import{onMounted}from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import * as c from './temp'
const log=c.default.setup()
//console.log(log)

//console.log(log)
onMounted(() => {
log.info(window.location.href
)
async function fetchRSSFeed(url) {
    try {
        const response = await fetch(url, { mode: 'no-cors'});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rssText = await response.text();
        console.log(rssText); // Output raw XML text
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, "application/xml");
    const items = xmlDoc.querySelectorAll('item');
    console.log(items)
    const rssContent = Array.from(items).map((item,id,ar) => {
      const cod=new DOMParser().parseFromString(item.outerHTML);
      const title = cod.querySelector('title').textContent;
      const link = cod.querySelector('link').textContent;
      const description = cod.querySelector('description').textContent;
      return `<a href="${link}" target="_blank">fuite numéro ${ar.length-id}:${title}</a><br>${description}`;
    }).join('');
    document.querySelector('.rss').innerHTML = rssContent;
    } catch (error) {
        console.error('Error type 2 fetching RSS feed:', error);
    }
}

// Example RSS feed URL
const rssUrl = 'https://thomas-iniguez-visioli.github.io/portfolio/feed.xml';
fetchRSSFeed(rssUrl);
})

</script>

<template>

  <header>
    <img alt="Vue logo" class="logo" src="/photo.jpg" width="125" height="auto" />

    <div class="wrapper">
      <HelloWorld msg="thomas iniguez visioli" />
     
      
      <nav>
        <RouterLink to="/">accueil</RouterLink>
        <RouterLink to="/cv">cv</RouterLink>
        <RouterLink to="/situation">situation professionelle</RouterLink>
      </nav>
      <h1> suivis des fuite de donnée</h1>
      <div class="rss"></div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

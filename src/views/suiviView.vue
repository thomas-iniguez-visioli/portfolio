<template>

<div class="rss"></div>
</template>
<script setup>
  import{onMounted}from 'vue'
onMounted(() => {

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
   // console.log(items)
    const rssContent = Array.from(items).slice(5).map((item,id,ar) => {
     
      const cod=new DOMParser().parseFromString(item.outerHTML,"text/html");
      console.log(cod.documentElement.querySelector)
      const title = cod.documentElement.querySelector('title').textContent;
      console.log(title)
      const link = url;
      console.log(link)
      const description = cod.documentElement.querySelector('description').textContent.replace("<li>","<br>").replace("</li>","<br>");
      console.log(description)
      return `<a href="${link}" target="_blank">fuite numéro ${ar.length-id}:${title}</a><br>${description}<br>`;
    }).join('<br>');
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
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

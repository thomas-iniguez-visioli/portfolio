<template>
<main>
  <div class="rss">
    <h6>chargement en cours ...   </h6>
  </div>
</main>

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
    const xmlDoc = parser.parseFromString(rssText, "text/xml");
    const items = xmlDoc.querySelectorAll('item');
   // console.log(items)
    const rssContent = Array.from(items).map((item,id,ar) => {
     
      const cod=new DOMParser().parseFromString(item.outerHTML,"text/html");
      console.log(cod.documentElement.querySelector)
      const title = cod.documentElement.querySelector('title').textContent;
      console.log(title)
      const link = "https://bonjourlafuite.eu.org";
      console.log(link)
      const description = cod.documentElement.querySelector('description').innerHTML.replace("<!--[CDATA[","").replace(";","").replace("]]-->","").replace("--"," ");;
      console.log(description)
      return `<a href="${link}" target="_blank">fuite numéro ${ar.length-id}:  ${title}</a><br>${description.replace("]]&gt","")}><br>`;
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

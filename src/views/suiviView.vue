<template>
  <main>
    <div class="rss">
      <h6>chargement en cours ...</h6>
    </div>
  </main>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  async function fetchRSSFeed(url) {
    try {
      const response = await fetch(url, { mode: 'no-cors' })
      if (!response.ok) {
        console.log(response)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const rssText = await response.text()
      // console.log(rssText); // Output raw XML text
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(rssText, 'text/xml')
      const items = xmlDoc.querySelectorAll('entry')
      console.log(items)
      const rssContent = Array.from(items)
        .map((item, id, ar) => {
          const cod = new DOMParser().parseFromString(item.outerHTML, 'text/xml')
          //  console.log(cod.documentElement.querySelector)

          //  console.log(title)
          const link = cod.documentElement.querySelector('link').nextSibling.textContent
          console.log(link)
          console.log(cod.documentElement.querySelector('link').nextSibling)
          var description = cod.documentElement
            .querySelector('content')
            .innerHTML.replace('<!--[CDATA[', '')
            .replace(';', '')
            .replace(']]', '')
          if (cod.documentElement.querySelector('content').innerHTML == '<!--[CDATA[]]-->') {
            description = '<ul><li>inconnu</li></ul>'
          }
          //console.log(description)
          return `${description}<hr>`
        })
        .join('<br>')
      document.querySelector('.rss').innerHTML = rssContent
    } catch (error) {
      console.error('Error type 2 fetching RSS feed:', error)
    }
  }

  // Example RSS feed URL
  const rssUrl = '/portfolio/feed.xml'
  fetchRSSFeed(rssUrl)
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

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
      //console.log(items)
      const d = ['p', 'div']
      const rssContent = Array.from(items)
        .map((item) => {
          //console.log(item.CDATA_SECTION_NODE)
          const cod = new DOMParser().parseFromString(item.outerHTML, 'text/xml')

          var description = cod.documentElement
            .querySelector('content')
            .innerHTML.replace(']]>', '')
          console.log(
            new DOMParser()
              .parseFromString(description, 'text/html')
              .documentElement.querySelector('a')
              .href.split('#')[1]
              .split('-')
              .slice(-3)
              .join('-')
          )
          if (cod.documentElement.querySelector('content').innerHTML == '<!--[CDATA[]]-->') {
            description = '<ul><li>inconnu</li></ul>'
          }
          d.forEach((item) => {
            description = description.replace(`]]>`, ` `)
          })
          //console.log(description)
          return {
            content: `<hr/>${new DOMParser()
              .parseFromString(description, 'text/html')
              .documentElement.querySelector('a')
              .href.split('#')[1]
              .split('-')
              .slice(-3)
              .join('-')}<br/>
              ${
                new DOMParser()
                  .parseFromString(description, 'text/html')
                  .documentElement.querySelector('a')
                  .href.split('#')[1]
                  .split('-')[0]
              }<br/>${description}`,
            date: new DOMParser()
              .parseFromString(description, 'text/html')
              .documentElement.querySelector('a')
              .href.split('#')[1]
              .split('-')
              .slice(-3)
              .join('-')
          }
        })
        .map((item) => {
          var data = item.date.split('-')
          var date = `${data[0]}-${data[1]}-${data[2]}`
          item.date = date
          return item
        })
        .sort((a, b) => {
          return b.date - a.date
        })
        .map((item) => {
          console.log(item.content)
          return item.content
        })
        .join('<hr/><br/>')
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

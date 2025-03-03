<template>
  <div class="about">
    <p class="log"></p>

    <i hidden="true">
      <slot name="name">{{ name }}</slot>
    </i>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import * as c from '../temp'
const log = {

  info: console.log,
  error: console.error
}
//console.log(log) //
function streamToString(stream) {
  return JSON.parse(stream)
}

onMounted(() => {
  console.log(

    '/portfolio/static/' +
      document
        .getElementsByClassName('about')
        ['0'].attributes.getNamedItem('name')
        .textContent.replace('/portfolio/', '')
  )
  fetch(
    '/portfolio/static/' +
      document
        .getElementsByClassName('about')
        ['0'].attributes.getNamedItem('name')
        .textContent.replace('/portfolio/', '')
  )
    .then((response) => {
      const data = response.body
        .getReader()
        .read()
        .then(({ value, done }) => {
          if (done || !value) return ''

          // Convertir les données en texte
          const text = new TextDecoder().decode(value)

          console.log('📜 Contenu chargé :', text)
          return text
        })
      return data
    })
    .then((data) => {
      document.getElementsByClassName('about')['0'].innerHTML = data.toString()

      console.log(data)
    })
    .catch((error) => log.error(error))
})

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: auto;
    display: grid;
    align-items: center;
  }
}
</style>

<template>
    <div class="about">
      <p class="log"></p>
        {{ aboutContent}}

     
      <i hidden="true">
      <slot name="name"></slot>
    </i>
    </div>
</template>
<script setup>
import {  onMounted } from 'vue'
import * as c from '../temp'
const log=c.default.setup()
//console.log(log)


onMounted(() => {
  log.info(document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent.replace("/projet",""))
  fetch("/portfolio/"+document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent)
    .then(response => response.text())
    .then(data => document.getElementsByClassName("about")["0"].innerHTML = data)
    .catch(error => log.error(error))
})
/*

*/
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
  

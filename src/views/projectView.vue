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
import { ref, onMounted } from 'vue'

const aboutContent = ref('')

onMounted(() => {
  console.log(document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent.replace("/project",""))
  fetch("/portfolio/"+document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent.replace("/project",""))
    .then(response => response.text())
    .then(data => document.getElementsByClassName("about")["0"].innerHTML = data)
    .catch(error => console.error(error))
})
/*

*/
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
  

<template>

  <div class="about">
 
    <img src="../../public/cv.png" alt="mon cv " >

  </div>
</template>
<script setup>
/*
fetch("/portfolio/cv.txt").then(response => response.text())
    .then(data => document.getElementsByClassName("about")["0"].innerHTML = data.replace("thomas.iniguez@free.fr","thomas.iniguez+<le nom de votre entreprise>@free.fr"))
    .catch(error => console.error(error))*/
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

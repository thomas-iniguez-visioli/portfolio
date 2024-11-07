<template>

  <div class="about">
 
    <pdf src="../../public/cv_stage_bts.pdf" alt="mon cv " ></pdf>

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

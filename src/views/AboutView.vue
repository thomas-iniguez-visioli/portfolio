<template>
  <button @click="downloadCV">Télécharger le CV</button>
</template>
<script setup>
const downloadCV = () => {
  var url = 'cv_stage_bts.pdf'
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'cv_stage_bts.pdf';
      link.click();
    })
    .catch(error => console.error('Erreur de téléchargement du PDF:', error));
}
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

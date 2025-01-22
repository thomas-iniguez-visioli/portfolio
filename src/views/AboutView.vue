<template>
  <div ref="cv"></div>
</template>
<script setup>

import { ref } from 'vue';

const cvContent = ref('cv');

const iframe = document.createElement('iframe');
iframe.src = "/portfolio/test.html";

document.body.appendChild(iframe);
/*
fetch("/portfolio/test.html").then(response => response.text()).then((data) => {
  setTimeout(() => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF(); // Utiliser la bibliothèque jsPDF qui est déjà incluse dans le projet
    console.log(doc)
    doc.html(data, {
      callback: function (doc) {
        doc.save();
      }, filename: "cv_stage_bts.pdf", 
      autoPaging: false ,html2canvas:{
        windowWidth:"210mm",
        windowHeight:"297mm",scale:1
      }
    });
    doc.save('cv_stage_bts.pdf');
   // document.body.removeChild(iframe);
  }, 1000);
})
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

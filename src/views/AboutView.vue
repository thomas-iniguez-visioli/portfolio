<template>
  <a href="cv_stage_bts.pdf"><canvas id="the-canvas"></canvas></a>
</template>
<script setup>
var url = 'cv_stage_bts.pdf'

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var { pdfjsLib } = globalThis

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.mjs'

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument(url)
loadingTask.promise.then(
  function (pdf) {
    console.log('PDF loaded')

    // Fetch the first page
    var pageNumber = 1
    pdf.getPage(pageNumber).then(function (page) {
      console.log('Page loaded')

      var scale = 1
      var viewport = page.getViewport({ scale: scale })

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById('the-canvas')
      var context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      console.log(canvas)
      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      }
      var renderTask = page.render(renderContext)
      renderTask.promise.then(function () {
        console.log('Page rendered')
      })
    })
  },
  function (reason) {
    // PDF loading error
    console.error(reason)
  }
)
/*import { ref } from 'vue';

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

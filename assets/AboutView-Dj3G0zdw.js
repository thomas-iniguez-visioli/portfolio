import { c as createElementBlock, b as createBaseVNode, a as openBlock } from "./index-DOgHjRqw.js";
const _hoisted_1 = { href: "cv_stage_bts.pdf" };
const _sfc_main = {
  __name: "AboutView",
  setup(__props) {
    var url = "cv_stage_bts.pdf";
    var { pdfjsLib } = globalThis;
    pdfjsLib.GlobalWorkerOptions.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.mjs";
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      console.log("PDF loaded");
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function(page) {
        console.log("Page loaded");
        var scale = 1;
        var viewport = page.getViewport({ scale });
        var canvas = document.getElementById("the-canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        console.log(canvas);
        var renderContext = {
          canvasContext: context,
          viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
          console.log("Page rendered");
        });
      });
    }, function(reason) {
      console.error(reason);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", _hoisted_1, _cache[0] || (_cache[0] = [
        createBaseVNode("canvas", { id: "the-canvas" }, null, -1)
      ]));
    };
  }
};
export {
  _sfc_main as default
};

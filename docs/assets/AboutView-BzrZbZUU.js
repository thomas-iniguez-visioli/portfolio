import { c as createElementBlock, o as openBlock } from "./index-COQq6X_y.js";
const _sfc_main = {
  __name: "AboutView",
  setup(__props) {
    const downloadCV = () => {
      const url = "cv_stage_bts.pdf";
      fetch(url).then((response) => response.blob()).then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "cv_stage_bts.pdf";
        link.click();
      }).catch((error) => console.error("Erreur de téléchargement du PDF:", error));
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", { onClick: downloadCV }, "Télécharger le CV");
    };
  }
};
export {
  _sfc_main as default
};

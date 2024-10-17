import { c as createElementBlock, b as createBaseVNode, a as openBlock } from "./index-ca2SkwRt.js";
const _hoisted_1 = { class: "about" };
const _sfc_main = {
  __name: "AboutView",
  setup(__props) {
    fetch("/portfolio/cv.txt").then((response) => response.text()).then((data) => document.getElementsByClassName("about")["0"].innerHTML = data.replace("thomas.iniguez@free.fr", "thomas.iniguez+<le nom de votre entreprise>@free.fr")).catch((error) => console.error(error));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, _cache[0] || (_cache[0] = [
        createBaseVNode("h1", null, "This is an about page", -1),
        createBaseVNode("canvas", {
          id: "myCanvas",
          width: "200",
          height: "100"
        }, null, -1)
      ]));
    };
  }
};
export {
  _sfc_main as default
};

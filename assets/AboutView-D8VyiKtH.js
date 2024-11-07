import { c as createElementBlock, d as createVNode, a as openBlock, f as resolveComponent } from "./index-C1_g7ZDA.js";
const _hoisted_1 = { class: "about" };
const _sfc_main = {
  __name: "AboutView",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_pdf = resolveComponent("pdf");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_pdf, {
          src: "/portfolio/cv_stage_bts.pdf",
          alt: "mon cv "
        })
      ]);
    };
  }
};
export {
  _sfc_main as default
};

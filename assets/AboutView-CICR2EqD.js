import { _ as _export_sfc, o as onMounted, c as createElementBlock, b as createBaseVNode, a as openBlock } from "./index-DPF99vLx.js";
onMounted(() => {
  var { pdfjsLib } = globalThis;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;
});
const _sfc_main = {};
const _hoisted_1 = { class: "about" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _cache[0] || (_cache[0] = [
    createBaseVNode("h1", null, "This is an about page", -1)
  ]));
}
const AboutView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AboutView as default
};

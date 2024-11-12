import { c as createElementBlock, b as createBaseVNode, e as createTextVNode, F as Fragment, a as openBlock } from "./index-C3AOgci3.js";
const _sfc_main = {
  __name: "AboutView",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[0] || (_cache[0] = createBaseVNode("h1", null, "PDF.js 'Hello, world!' example", -1)),
        _cache[1] || (_cache[1] = createBaseVNode("p", null, [
          createTextVNode("Please use "),
          createBaseVNode("a", { href: "https://mozilla.github.io/pdf.js/getting_started/#download" }, [
            createBaseVNode("i", null, "official releases")
          ]),
          createTextVNode(" in production environments.")
        ], -1)),
        _cache[2] || (_cache[2] = createBaseVNode("canvas", { id: "the-canvas" }, null, -1))
      ], 64);
    };
  }
};
export {
  _sfc_main as default
};

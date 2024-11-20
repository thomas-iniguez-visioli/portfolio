import { t as temp, o as onMounted, c as createElementBlock, b as createBaseVNode, e as createTextVNode, f as toDisplayString, r as renderSlot, a as openBlock } from "./index-BUQvZNv2.js";
const _hoisted_1 = { class: "about" };
const _hoisted_2 = { hidden: "true" };
const _sfc_main = {
  __name: "projectView",
  setup(__props) {
    const log = temp.setup();
    onMounted(() => {
      log.info(document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent.replace("/projet", ""));
      fetch("/portfolio/" + document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent.replace("/projet", "")).then((response) => response.text()).then((data) => document.getElementsByClassName("about")["0"].innerHTML = data).catch((error) => log.error(error));
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[0] || (_cache[0] = createBaseVNode("p", { class: "log" }, null, -1)),
        createTextVNode(" " + toDisplayString(_ctx.aboutContent) + " ", 1),
        createBaseVNode("i", _hoisted_2, [
          renderSlot(_ctx.$slots, "name")
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};

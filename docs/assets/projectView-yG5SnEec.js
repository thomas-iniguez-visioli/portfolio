import { t as temp, d as onMounted, c as createElementBlock, e as createBaseVNode, a as createTextVNode, f as toDisplayString, r as renderSlot, o as openBlock } from "./index-COQq6X_y.js";
const _hoisted_1 = { class: "about" };
const _hoisted_2 = { hidden: "true" };
const _sfc_main = {
  __name: "projectView",
  setup(__props) {
    const log = temp.setup();
    onMounted(() => {
      log.info(
        document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent.replace("/projet", "")
      );
      fetch(
        "/portfolio/" + document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent
      ).then((response) => response.text()).then((data) => document.getElementsByClassName("about")["0"].innerText = data).catch((error) => log.error(error));
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

import { r as ref, b as onMounted, c as createElementBlock, a as createBaseVNode, d as createVNode, w as withCtx, e as renderSlot, f as resolveComponent, o as openBlock, g as createBlock, h as resolveDynamicComponent } from "./index-CYKwjNzl.js";
const _hoisted_1 = { class: "about" };
const _hoisted_2 = { hidden: "true" };
const _sfc_main = {
  __name: "projectView",
  setup(__props) {
    const aboutContent = ref("");
    onMounted(() => {
      console.log(document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent.replace("/project", ""));
      fetch("/portfolio/" + document.getElementsByClassName("about")["0"].attributes.getNamedItem("name").textContent.replace("/project", "")).then((response) => response.text()).then((data) => aboutContent.value = data).catch((error) => console.error(error));
    });
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[0] || (_cache[0] = createBaseVNode("p", { class: "log" }, null, -1)),
        createVNode(_component_router_view, null, {
          default: withCtx(({ aboutContent: aboutContent2 }) => [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.Component)))
          ]),
          _: 1
        }),
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

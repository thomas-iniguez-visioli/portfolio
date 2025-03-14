import { _ as _export_sfc, t as temp, d as onMounted, c as createElementBlock, r as renderSlot, o as openBlock, e as createBaseVNode, b as createVNode, a as createTextVNode, w as withCtx, F as Fragment } from "./index-COQq6X_y.js";
import { D as DocumentationIcon } from "./IconDocumentation-llKkw-gj.js";
const _hoisted_1 = {
  href: "/",
  id: "redirect"
};
const _sfc_main$1 = {
  __name: "situationItem",
  setup(__props) {
    const log = temp.setup();
    onMounted(() => {
      Object.keys(document.getElementsByTagName("a")).map((ite) => {
        const item = document.getElementsByTagName("a")[ite];
        console.log(item.href);
        if (item.id) {
          log.info(item.href.includes("situation"));
          item.href = window.location.href + "situation/" + item.textContent.split("/")[item.textContent.split("/").length - 1];
          item.href = item.href.replace("situationsituation", "situation").replace("projetprojet", "projet");
          log.info(item.href);
        }
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", _hoisted_1, [
        renderSlot(_ctx.$slots, "heading", { id: "name" }, void 0, true)
      ]);
    };
  }
};
const WelcomeItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-952c2865"]]);
const _sfc_main = {
  __name: "situation",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[2] || (_cache[2] = createBaseVNode("p", null, null, -1)),
        _cache[3] || (_cache[3] = createBaseVNode("p", null, null, -1)),
        createVNode(WelcomeItem, null, {
          icon: withCtx(() => [
            createVNode(DocumentationIcon)
          ]),
          heading: withCtx(() => _cache[0] || (_cache[0] = [
            createTextVNode("tp")
          ])),
          _: 1
        }),
        _cache[4] || (_cache[4] = createTextVNode(",")),
        _cache[5] || (_cache[5] = createBaseVNode("p", null, null, -1)),
        _cache[6] || (_cache[6] = createBaseVNode("p", null, null, -1)),
        createVNode(WelcomeItem, null, {
          icon: withCtx(() => [
            createVNode(DocumentationIcon)
          ]),
          heading: withCtx(() => _cache[1] || (_cache[1] = [
            createTextVNode("tp1")
          ])),
          _: 1
        })
      ], 64);
    };
  }
};
export {
  _sfc_main as default
};

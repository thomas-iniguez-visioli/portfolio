import { _ as _export_sfc, t as temp, o as onMounted, a as openBlock, c as createElementBlock, r as renderSlot, b as createBaseVNode, d as createVNode, w as withCtx, e as createTextVNode, F as Fragment } from "./index-C_IvrGzR.js";
import { D as DocumentationIcon } from "./IconDocumentation-CuchEite.js";
const _hoisted_1 = {
  href: "/",
  id: "redirect"
};
const _sfc_main$2 = {
  __name: "projetItem",
  setup(__props) {
    const log = temp.setup();
    onMounted(() => {
      Object.keys(document.getElementsByTagName("a")).map((ite) => {
        const item = document.getElementsByTagName("a")[ite];
        console.log(item.href);
        if (item.id) {
          log.info(item.href.includes("projet"));
          item.href = window.location.href + "projet/" + item.textContent.split("/")[item.textContent.split("/").length - 1];
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
const WelcomeItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6b13e6e2"]]);
const _sfc_main$1 = {
  __name: "projet",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[3] || (_cache[3] = createBaseVNode("p", null, null, -1)),
        _cache[4] || (_cache[4] = createBaseVNode("p", null, null, -1)),
        createVNode(WelcomeItem, null, {
          icon: withCtx(() => [
            createVNode(DocumentationIcon)
          ]),
          heading: withCtx(() => _cache[0] || (_cache[0] = [
            createTextVNode("RGPD")
          ])),
          _: 1
        }),
        _cache[5] || (_cache[5] = createTextVNode(",")),
        _cache[6] || (_cache[6] = createBaseVNode("p", null, null, -1)),
        _cache[7] || (_cache[7] = createBaseVNode("p", null, null, -1)),
        createVNode(WelcomeItem, null, {
          icon: withCtx(() => [
            createVNode(DocumentationIcon)
          ]),
          heading: withCtx(() => _cache[1] || (_cache[1] = [
            createTextVNode("francenuit")
          ])),
          _: 1
        }),
        _cache[8] || (_cache[8] = createTextVNode(",")),
        _cache[9] || (_cache[9] = createBaseVNode("p", null, null, -1)),
        _cache[10] || (_cache[10] = createBaseVNode("p", null, null, -1)),
        createVNode(WelcomeItem, null, {
          icon: withCtx(() => [
            createVNode(DocumentationIcon)
          ]),
          heading: withCtx(() => _cache[2] || (_cache[2] = [
            createTextVNode("uptime")
          ])),
          _: 1
        })
      ], 64);
    };
  }
};
const _sfc_main = {
  __name: "HomeView",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("main", null, [
        _cache[0] || (_cache[0] = createTextVNode(" bien le bonjour voici mes différent projet ")),
        createVNode(_sfc_main$1)
      ]);
    };
  }
};
export {
  _sfc_main as default
};

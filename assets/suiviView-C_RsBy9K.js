import { o as onMounted, c as createElementBlock, b as createBaseVNode, a as openBlock } from "./index-CcMtjlg1.js";
const _sfc_main = {
  __name: "suiviView",
  setup(__props) {
    onMounted(() => {
      async function fetchRSSFeed(url) {
        try {
          const response = await fetch(url, { mode: "no-cors" });
          if (!response.ok) {
            console.log(response);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const rssText = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(rssText, "text/xml");
          const items = xmlDoc.querySelectorAll("entry");
          console.log(items);
          const rssContent = Array.from(items).map((item) => {
            const cod = new DOMParser().parseFromString(item.outerHTML, "text/xml");
            const link = cod.documentElement.querySelector("link").nextSibling.textContent;
            console.log(link);
            console.log(cod.documentElement.querySelector("link").nextSibling);
            var description = cod.documentElement.querySelector("content").innerHTML.replace("<!--[CDATA[", "").replace(";", "").replace("]]", "");
            if (cod.documentElement.querySelector("content").innerHTML == "<!--[CDATA[]]-->") {
              description = "<ul><li>inconnu</li></ul>";
            }
            return `${description}<hr>`;
          }).join("<br>");
          document.querySelector(".rss").innerHTML = rssContent;
        } catch (error) {
          console.error("Error type 2 fetching RSS feed:", error);
        }
      }
      const rssUrl = "/portfolio/feed.xml";
      fetchRSSFeed(rssUrl);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("main", null, _cache[0] || (_cache[0] = [
        createBaseVNode("div", { class: "rss" }, [
          createBaseVNode("h6", null, "chargement en cours ...")
        ], -1)
      ]));
    };
  }
};
export {
  _sfc_main as default
};

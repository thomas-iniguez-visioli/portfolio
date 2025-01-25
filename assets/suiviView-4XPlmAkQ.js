import { d as onMounted, c as createElementBlock, e as createBaseVNode, o as openBlock } from "./index-QRkA0Mfy.js";
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
          const d = ["p", "div"];
          const rssContent = Array.from(items).map((item) => {
            const cod = new DOMParser().parseFromString(item.outerHTML, "text/xml");
            var description = cod.documentElement.querySelector("content").innerHTML.replace("]]>", "");
            console.log(
              new DOMParser().parseFromString(description, "text/html").documentElement.querySelector("a").href.split("#")[1].split("-").slice(-3).join("-")
            );
            if (cod.documentElement.querySelector("content").innerHTML == "<!--[CDATA[]]-->") {
              description = "<ul><li>inconnu</li></ul>";
            }
            d.forEach((item2) => {
              description = description.replace(`]]>`, ` `);
            });
            return {
              content: `<hr/>${new DOMParser().parseFromString(description, "text/html").documentElement.querySelector("a").href.split("#")[1].split("-").slice(-3).join("-")}<br/>${description}`,
              date: new DOMParser().parseFromString(description, "text/html").documentElement.querySelector("a").href.split("#")[1].split("-").slice(-3).join("-")
            };
          }).sort((a, b) => {
            return b.date - a.date;
          }).map((item) => {
            return item.content;
          }).join("<hr/><br/>");
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

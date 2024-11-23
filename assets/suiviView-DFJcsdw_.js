import { o as onMounted, c as createElementBlock, a as openBlock } from "./index-7n44yQXy.js";
const _hoisted_1 = { class: "rss" };
const _sfc_main = {
  __name: "suiviView",
  setup(__props) {
    onMounted(() => {
      async function fetchRSSFeed(url) {
        try {
          const response = await fetch(url, { mode: "no-cors" });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const rssText = await response.text();
          console.log(rssText);
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(rssText, "application/xml");
          const items = xmlDoc.querySelectorAll("item");
          const rssContent = Array.from(items).slice(5).map((item, id, ar) => {
            const cod = new DOMParser().parseFromString(item.outerHTML, "text/html");
            console.log(cod.documentElement.querySelector);
            const title = cod.documentElement.querySelector("title").textContent;
            console.log(title);
            const link = url;
            console.log(link);
            const description = cod.documentElement.querySelector("description").textContent;
            console.log(description);
            return `<a href="${link}" target="_blank">fuite numéro ${ar.length - id}:${title}</a><br\\>${description}<br\\>`;
          }).join("<br\\>");
          document.querySelector(".rss").innerHTML = rssContent;
        } catch (error) {
          console.error("Error type 2 fetching RSS feed:", error);
        }
      }
      const rssUrl = "https://thomas-iniguez-visioli.github.io/portfolio/feed.xml";
      fetchRSSFeed(rssUrl);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1);
    };
  }
};
export {
  _sfc_main as default
};

import { o as onMounted, c as createElementBlock, a as openBlock } from "./index-DTsPldS_.js";
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
          console.log(items);
          const rssContent = Array.from(items).slice(5).map((item, id, ar) => {
            const cod = new DOMParser().parseFromString(item.outerHTML, "text/html");
            const title = cod.querySelector("title").textContent;
            const link = cod.querySelector("link").textContent;
            const description = cod.querySelector("description").textContent;
            return `<a href="${link}" target="_blank">fuite numéro ${ar.length - id}:${title}</a><br>${description}`;
          }).join("");
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

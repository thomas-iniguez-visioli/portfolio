(() => {
  "use strict";
  var e,
    r,
    t,
    n,
    f,
    s = {},
    i = {};
  function c(e) {
    var r = i[e];
    if (void 0 !== r) return r.exports;
    var t = (i[e] = { id: e, loaded: !1, exports: {} });
    return s[e].call(t.exports, t, t.exports, c), (t.loaded = !0), t.exports;
  }
  (c.m = s),
    (c.amdD = function () {
      throw new Error("define cannot be used indirect");
    }),
    (c.amdO = {}),
    (e = []),
    (c.O = (r, t, n, f) => {
      if (!t) {
        var s = 1 / 0;
        for (u = 0; u < e.length; u++) {
          for (var [t, n, f] = e[u], i = !0, a = 0; a < t.length; a++)
            if (
              (!1 & f || s >= f) &&
              Object.keys(c.O).every((e) => c.O[e](t[a]))
            )
              t.splice(a--, 1);
            else if (((i = !1), f < s)) s = f;
          if (i) {
            e.splice(u--, 1);
            var o = n();
            if (void 0 !== o) r = o;
          }
        }
        return r;
      } else {
        f = f || 0;
        for (var u = e.length; u > 0 && e[u - 1][2] > f; u--) e[u] = e[u - 1];
        e[u] = [t, n, f];
      }
    }),
    (c.n = (e) => {
      var r = e && e.__esModule ? () => e.default : () => e;
      return c.d(r, { a: r }), r;
    }),
    (t = Object.getPrototypeOf
      ? (e) => Object.getPrototypeOf(e)
      : (e) => e.__proto__),
    (c.t = function (e, n) {
      if (1 & n) e = this(e);
      if (8 & n) return e;
      if ("object" == typeof e && e) {
        if (4 & n && e.__esModule) return e;
        if (16 & n && "function" == typeof e.then) return e;
      }
      var f = Object.create(null);
      c.r(f);
      var s = {};
      r = r || [null, t({}), t([]), t(t)];
      for (var i = 2 & n && e; "object" == typeof i && !~r.indexOf(i); i = t(i))
        Object.getOwnPropertyNames(i).forEach((r) => (s[r] = () => e[r]));
      return (s.default = () => e), c.d(f, s), f;
    }),
    (c.d = (e, r) => {
      for (var t in r)
        if (c.o(r, t) && !c.o(e, t))
          Object.defineProperty(e, t, { enumerable: !0, get: r[t] });
    }),
    (c.f = {}),
    (c.e = (e) =>
      Promise.all(Object.keys(c.f).reduce((r, t) => (c.f[t](e, r), r), []))),
    (c.u = (e) => {
      if (5412 === e) return "fc206674fec63bf9.js";
      if (869 === e) return "f85e844dc76e573a.js";
      if (2429 === e) return "121a4f45c9f08234.js";
      if (2928 === e) return "a6a7c77d84c63ae2.js";
      if (4400 === e) return "0c1b3154e4749648.vendor.js";
      if (5486 === e) return "6deae931d603ab27.js";
      if (4043 === e) return "4b686f63c53900e5.vendor.js";
      if (1761 === e) return "63b5d1e48591bd18.vendor.js";
      if (336 === e) return "c71e4041b4d40c87.js";
      if (5447 === e) return "9e77df5aea4f98ac.js";
      if (6566 === e) return "9862ba9dc8be182c.js";
      if (4667 === e) return "2dce66d3fe9e7182.js";
      if (8058 === e) return "019b5a7f1b513cd8.js";
      if (4874 === e) return "14c3c34fe50de252.js";
      if (7833 === e) return "b68eb56905a05043.js";
      if (4995 === e) return "91770e56c9317b09.js";
      if (1434 === e) return "32d5e7ad790f1459.js";
      if (7970 === e) return "3af29b43f28daea4.js";
      if (6559 === e) return "5981378e91a75131.js";
      if (5654 === e) return "52f4dadf4190608b.js";
      if (6061 === e) return "0b3db0ad13739726.js";
      if (7972 === e) return "e5732dc5094546e4.js";
      if (7628 === e) return "a2741bce810a09c9.js";
      if (7717 === e) return "6792aa54535bcdd1.js";
      if (1481 === e) return "8adc701605be61cd.js";
      if (8272 === e) return "5c5900b648824447.js";
      if (5234 === e) return "dbada605beba2e0d.vendor.js";
      if (1500 === e) return "bb6eb577d535021e.js";
      if (1277 === e) return "9d806e7fa287aa1c.js";
      if (6405 === e) return "2e3daf54ffc7cbe7.js";
      if (7406 === e) return "4bca6654b5308ed1.js";
      if (368 === e) return "6d606625418b5ec8.js";
      if (1132 === e) return "5fce490d51cdbb5c.js";
      if (1758 === e) return "ade9fe347b5e046d.js";
      if (5196 === e) return "fc052e7c81069d46.js";
      if (2780 === e) return "37a20057836e7633.js";
      if (5024 === e) return "d304500f3495f0c3.js";
      if (6966 === e) return "25c5b90e650b1888.js";
      if (382 === e) return "d80c1c1d6989cb57.js";
      if (2933 === e) return "bc102a5ee7d0bd55.vendor.js";
      if (1169 === e) return "fdf0df6e22516b73.js";
      if (9222 === e) return "e68e2de901f4d39e.js";
      if (5665 === e) return "0bdf034859eb56eb.js";
      if (7363 === e) return "25a6dbef57a40bf3.js";
      if (4143 === e) return "87bb38c345e348fd.js";
      if (574 === e) return "e575656d90047ddc.js";
      if (9091 === e) return "5a2dac70f8c37db6.js";
      if (4492 === e) return "27d2c0f3a29924a2.js";
      if (4283 === e) return "6e40d11215b3f0fc.js";
      if (2921 === e) return "68e1625dfde6c30d.js";
      if (8701 === e) return "d2f006f79022b413.js";
      if (4411 === e) return "c21501bdd87336ea.js";
      if (781 === e) return "2be2298b49f5c49f.js";
      if (1327 === e) return "8e1107d00ac62901.js";
      if (8226 === e) return "f324ce08f2f90159.js";
      if (4450 === e) return "34e4ad8897b86c79.js";
      if (2911 === e) return "7541dd48b8da5a26.js";
      if (2104 === e) return "a1f87bd0597ae7eb.js";
      if (9927 === e) return "348c31d8ce21e836.js";
      if (6674 === e) return "bd3c64b3f8c3a6a7.js";
      if (419 === e) return "a0a1f7340e5c2134.js";
      if (631 === e) return "88134e92ab09c6b0.js";
      if (7351 === e) return "13eaba859ff9cbd9.vendor.js";
      if (5706 === e) return "72f3e9d39b535513.js";
      if (1869 === e) return "27474b526a9fa47b.js";
      if (9189 === e) return "a5a6c7715ea13111.js";
      if (3441 === e) return "be1421f250667f35.js";
      if (1923 === e) return "6226544be63ce9cd.js";
      if (8889 === e) return "bc12b255093e6a18.js";
      if (9482 === e) return "30c7c955b36f25ba.js";
      if (1904 === e) return "fd2ca6e5b6ced89c.js";
      if (7437 === e) return "1965bcc16ac3c567.js";
      if (1078 === e) return "fea9cab2348bed16.js";
      if (7592 === e) return "9a626da9b91633a6.js";
      if (6763 === e) return "ad57dad3d8bf4052.js";
      if (371 === e) return "d42a5888a017bbbb.js";
      if (3103 === e) return "2d237a273d5cb147.js";
      if (3607 === e) return "cddcc8624f575704.js";
      if (2188 === e) return "734b451c8fe09ecd.js";
      if (364 === e) return "76f91aa94bc9178b.js";
      if (6420 === e) return "7e6402017abfe6ef.js";
      if (9552 === e) return "cd70dd0669ccf1d1.js";
      if (4161 === e) return "21084e085d850ee4.js";
      if (9443 === e) return "19384f8b149e9cb1.js";
      if (7831 === e) return "8723460a9087a9d0.js";
      if (3962 === e) return "48bc5dc5fd85f0ff.js";
      if (2758 === e) return "f7f2973cfe03d59f.js";
      if (7533 === e) return "e8264137c9f83676.js";
      if (6889 === e) return "4119114cfc7300b0.js";
      if (3496 === e) return "f15609f4e1a56b85.js";
      if (6069 === e) return "9bd8aec46a5bac3e.js";
      if (1597 === e) return "c36ad222465492cb.js";
    }),
    (c.miniCssF = (e) => {
      if (5412 === e) return "cb6e5b88a3c73636.ltr.css";
      if (869 === e) return "d7cf0aba64e1b2d4.ltr.css";
      if (
        {
          2429: 1,
          5486: 1,
          336: 1,
          5447: 1,
          6566: 1,
          4667: 1,
          4874: 1,
          7833: 1,
          4995: 1,
          1434: 1,
          6559: 1,
          6061: 1,
          7972: 1,
          7628: 1,
          7717: 1,
          1500: 1,
          1277: 1,
          6405: 1,
          368: 1,
          1132: 1,
          1758: 1,
          5196: 1,
          2780: 1,
          6966: 1,
          9222: 1,
          5665: 1,
          9091: 1,
          4492: 1,
          4283: 1,
          2921: 1,
          4411: 1,
          781: 1,
          8226: 1,
          4450: 1,
          2911: 1,
          2104: 1,
          9927: 1,
          6674: 1,
          419: 1,
          631: 1,
          9189: 1,
          3441: 1,
          1923: 1,
          8889: 1,
          9482: 1,
          1904: 1,
          7437: 1,
          1078: 1,
          7592: 1,
          6763: 1,
          371: 1,
          3103: 1,
          3607: 1,
          2188: 1,
          364: 1,
          6420: 1,
          9552: 1,
          4161: 1,
          9443: 1,
          7831: 1,
          3962: 1,
          2758: 1,
          7533: 1,
          6889: 1,
          3496: 1,
          6069: 1,
          1597: 1,
        }[e]
      )
        return "ef46db3751d8e999.ltr.css";
      if (2928 === e) return "58d44ed12f55addb.ltr.css";
      if ({ 4400: 1, 4043: 1, 1761: 1, 5234: 1, 2933: 1, 7351: 1 }[e])
        return "ef46db3751d8e999.vendor.ltr.css";
      if (8058 === e) return "c9bf091720f7f1c3.ltr.css";
      if (7970 === e) return "ca10385ab7f3657c.ltr.css";
      if (5654 === e) return "71dec1f5d11e3f66.ltr.css";
      if (1481 === e) return "f8678f5d2a496896.ltr.css";
      if (8272 === e) return "aed61a49fdfc513b.ltr.css";
      if (7406 === e) return "5b2241d885919c07.ltr.css";
      if (5024 === e) return "35a3a289b0e33843.ltr.css";
      if (382 === e) return "5b7fe8f909b06739.ltr.css";
      if (1169 === e) return "44ce630fa966dd23.ltr.css";
      if (7363 === e) return "13d99414f410f430.ltr.css";
      if (4143 === e) return "8dd0cb1e0979d988.ltr.css";
      if (574 === e) return "638e8938c76a575e.ltr.css";
      if (8701 === e) return "248b089e27881dcd.ltr.css";
      if (1327 === e) return "489dec8cbb9570e2.ltr.css";
      if (5706 === e) return "0f9dd805f1221e62.ltr.css";
      if (1869 === e) return "da210214fd5a61ff.ltr.css";
    }),
    (c.miniCssFRtl = (e) => {
      if (8581 === e) return "c166e5d20ad58f4e.runtime.rtl.css";
      if ({ 2653: 1, 4400: 1, 4043: 1, 1761: 1, 5234: 1, 2933: 1, 7351: 1 }[e])
        return "c166e5d20ad58f4e.vendor.rtl.css";
      if (5436 === e) return "8e54262212aed57f.vendor.rtl.css";
      if (1389 === e) return "e5a4ec3dbce192b5.rtl.css";
      if (5412 === e) return "18732a7ce0850a40.rtl.css";
      if (869 === e) return "cb3538416979fc60.rtl.css";
      if (
        {
          2429: 1,
          5486: 1,
          336: 1,
          5447: 1,
          6566: 1,
          4667: 1,
          4874: 1,
          7833: 1,
          4995: 1,
          1434: 1,
          6559: 1,
          6061: 1,
          7972: 1,
          7628: 1,
          7717: 1,
          1500: 1,
          1277: 1,
          6405: 1,
          368: 1,
          1132: 1,
          1758: 1,
          5196: 1,
          2780: 1,
          6966: 1,
          9222: 1,
          5665: 1,
          9091: 1,
          4492: 1,
          4283: 1,
          2921: 1,
          4411: 1,
          781: 1,
          8226: 1,
          4450: 1,
          2911: 1,
          2104: 1,
          9927: 1,
          6674: 1,
          419: 1,
          631: 1,
          9189: 1,
          3441: 1,
          1923: 1,
          8889: 1,
          9482: 1,
          1904: 1,
          7437: 1,
          1078: 1,
          7592: 1,
          6763: 1,
          371: 1,
          3103: 1,
          3607: 1,
          2188: 1,
          364: 1,
          6420: 1,
          9552: 1,
          4161: 1,
          9443: 1,
          7831: 1,
          3962: 1,
          2758: 1,
          7533: 1,
          6889: 1,
          3496: 1,
          6069: 1,
          1597: 1,
        }[e]
      )
        return "c166e5d20ad58f4e.rtl.css";
      if (2928 === e) return "54f5ae379482a07f.rtl.css";
      if (8058 === e) return "49dcf4c456be0dd9.rtl.css";
      if (7970 === e) return "be92cdc2c813e15f.rtl.css";
      if (5654 === e) return "7cf7805937173758.rtl.css";
      if (1481 === e) return "29bdbb1d75c8c7a3.rtl.css";
      if (8272 === e) return "7dac84e36568326f.rtl.css";
      if (7406 === e) return "3759df5a77daebac.rtl.css";
      if (5024 === e) return "8cc048da50540270.rtl.css";
      if (382 === e) return "b197b394e4f55ce1.rtl.css";
      if (1169 === e) return "8ec5819b5639aca4.rtl.css";
      if (7363 === e) return "b9ec1237e067a990.rtl.css";
      if (4143 === e) return "eaf9987ddc748d09.rtl.css";
      if (574 === e) return "1e246b15020f607d.rtl.css";
      if (8701 === e) return "a22abbff6d4042d7.rtl.css";
      if (1327 === e) return "7974d5bbdf33c24b.rtl.css";
      if (5706 === e) return "e6a9f3c1d9fbcab0.rtl.css";
      if (1869 === e) return "dd4f397bdc4982dc.rtl.css";
    }),
    (c.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (c.hmd = (e) => {
      if (!(e = Object.create(e)).children) e.children = [];
      return (
        Object.defineProperty(e, "exports", {
          enumerable: !0,
          set: () => {
            throw new Error(
              "ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " +
                e.id
            );
          },
        }),
        e
      );
    }),
    (c.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
    (n = {}),
    (f = "@canva/web:"),
    (c.l = (e, r, t, s) => {
      if (!n[e]) {
        var i, a;
        if (void 0 !== t)
          for (
            var o = document.getElementsByTagName("script"), u = 0;
            u < o.length;
            u++
          ) {
            var d = o[u];
            if (
              d.getAttribute("src") == e ||
              d.getAttribute("data-webpack") == f + t
            ) {
              i = d;
              break;
            }
          }
        if (!i) {
          if (
            ((a = !0),
            ((i = document.createElement("script")).charset = "utf-8"),
            (i.timeout = 120),
            c.nc)
          )
            i.setAttribute("nonce", c.nc);
          i.setAttribute("data-webpack", f + t), (i.src = e);
        }
        n[e] = [r];
        var l = (r, t) => {
            (i.onerror = i.onload = null), clearTimeout(b);
            var f = n[e];
            if (
              (delete n[e],
              i.parentNode && i.parentNode.removeChild(i),
              f && f.forEach((e) => e(t)),
              r)
            )
              return r(t);
          },
          b = setTimeout(
            l.bind(null, void 0, { type: "timeout", target: i }),
            12e4
          );
        (i.onerror = l.bind(null, i.onerror)),
          (i.onload = l.bind(null, i.onload)),
          a && document.head.appendChild(i);
      } else n[e].push(r);
    }),
    (c.r = (e) => {
      if ("undefined" != typeof Symbol && Symbol.toStringTag)
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
      Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (c.nmd = (e) => {
      if (((e.paths = []), !e.children)) e.children = [];
      return e;
    }),
    (() => {
      const e = c.e,
        r = function e(r, t, n) {
          return r().catch(function (f) {
            return 0 === n
              ? Promise.reject(f)
              : ((s = t),
                new Promise(function (e) {
                  setTimeout(e, s);
                })).then(function () {
                  return e(r, t, n - 1);
                });
            var s;
          });
        };
      c.e = function (t) {
        return r(
          function () {
            return e(t);
          },
          1e3,
          5
        );
      };
    })(),
    (c.p = ""),
    (() => {
      if (self.__batch_chunks__)
        !(function (e, r, t, n, f, s, i, c, a) {
          const o = e.l;
          let u = [],
            d = [];
          const l = [];
          for (const k of document.head.querySelectorAll(
            'link[rel="prefetch"][href]'
          )) {
            const e = k.getAttribute("href");
            e && l.push(e);
          }
          let b = (e) => document.head.appendChild(e);
          (e.l = function (e, r, f, i) {
            for (let t = 0; t < l.length; t++)
              if (l[t].endsWith(e)) return l.splice(t, 1), o(e, r, f, i);
            if (t) {
              if (0 === u.length)
                Promise.resolve().then(() => {
                  E(u, p), (u = []), (j = 0);
                });
              const r = y(e);
              if ((u.length >= 1 && j + r > s) || u.length >= n)
                E(u, p), (u = []), (j = 0);
              j += r;
            } else {
              if (h++ < 10) return o(e, r, f, i);
              if (0 === u.length) setTimeout(() => w(u, p), 1);
            }
            u.push({
              src: e,
              callback: function (t) {
                if ("load" === t.type) r(t);
                else o(e, r, f, i);
              },
              originalLoad: () => {
                o(e, r, f, i);
              },
            });
          }),
            (e.loadCss = function (e, r) {
              const f = e.getAttribute("href");
              if (((b = r || b), t)) {
                if (0 === d.length)
                  Promise.resolve().then(() => {
                    E(d, v), (d = []), (m = 0);
                  });
                const e = y(f);
                if ((d.length >= 1 && m + e > s) || d.length >= n)
                  E(d, v), (d = []), (m = 0);
                m += e;
              } else {
                if (g++ < 15) return r(e);
                if (0 === d.length) setTimeout(() => w(d, v), 1);
              }
              d.push({
                src: f,
                callback: (t) => {
                  if ("load" === t.type) e.onload && e.onload(t);
                  else r(e);
                },
                originalLoad: () => {
                  r(e);
                },
              });
            });
          let h = 0,
            j = 0;
          function p(e, t) {
            const n = document.createElement("script");
            let f;
            const s = (e) => {
              (n.onerror = n.onload = null),
                clearTimeout(f),
                n.parentNode && n.parentNode.removeChild(n),
                t("string" == typeof e ? { type: "error", target: {} } : e);
            };
            (n.onload = n.onerror = s),
              (n.src = e),
              (n.async = !1),
              (f = setTimeout(() => s({ type: "timeout", target: n }), r)),
              document.head.appendChild(n);
          }
          let g = 0,
            m = 0;
          function v(e, r) {
            const t = document.createElement("link");
            (t.onload = t.onerror = (e) => r(e)),
              (t.href = e),
              (t.rel = "stylesheet"),
              b(t);
          }
          function y(e) {
            const r = f(),
              t = e.substring(r.length);
            return t ? i[t] || 0 : 0;
          }
          function _() {
            const e = f(),
              r = new URL(window.location.href);
            if (null == e ? void 0 : e.startsWith("http")) {
              const { protocol: r, host: t } = new URL(e);
              return `${r}//chunk-composing.${t
                .split(".")
                .slice(-2)
                .join(".")}`;
            } else if (
              ["localhost", "127.0.0.1"].includes(r.hostname) &&
              r.searchParams.get("pageLoadWorkerUrl")
            )
              return r.searchParams.get("pageLoadWorkerUrl");
            else return r.origin;
          }
          async function w(e, r) {
            const t = f();
            let o,
              u = 0,
              d = [];
            try {
              o = self.navigator.serviceWorker;
            } catch {}
            const l =
              c && (null == o ? void 0 : o.controller)
                ? await (async function (e) {
                    const r = await caches.open(a),
                      t = [];
                    for (const n of e)
                      if (await r.match(n.src)) n.originalLoad();
                      else t.push(n);
                    return t;
                  })(e)
                : e;
            for (const f of l) {
              const e = f.src.substring(t.length),
                r = e ? i[e] || 0 : 0;
              if ((d.length >= 1 && u + r > s) || d.length >= n)
                b(d), (d = []), (u = 0);
              d.push(f), (u += r);
            }
            function b(e) {
              if (1 === e.length) return void e[0].originalLoad();
              const n = _(),
                f = e.map(({ src: e }) => e.substring(t.length)).join("+");
              r(`${n}/chunk-batch/${f}`, (r) => {
                for (const { callback: t, src: n } of e)
                  t({ type: r.type, target: { src: n, href: n } });
              });
            }
            d.length && b(d), (e.length = 0);
          }
          function E(e, r) {
            if (0 === e.length) return;
            const t = f();
            if (1 !== e.length)
              r(
                `${_()}/chunk-batch/${e
                  .map(({ src: e }) => e.substring(t.length))
                  .join("+")}`,
                (r) => {
                  for (const { callback: t, src: n } of e)
                    t({ type: r.type, target: { src: n, href: n } });
                }
              );
            else e[0].originalLoad();
          }
        })(
          c,
          12e4,
          self.__sync_batch_chunks__,
          40,
          () => c.p,
          10485760,
          {
            "ae7ed2ff200b8887.ltr.css": 437158,
            "3d19d39b35b0f692.js": 14206410,
            "e5a4ec3dbce192b5.rtl.css": 437172,
            "37365a3758fb699d.runtime.js": 64893,
            "a0684b0780c739e9.vendor.ltr.css": 15361,
            "d804d847f5d321a3.vendor.js": 2947657,
            "8e54262212aed57f.vendor.rtl.css": 15361,
            "8bf99e1463b687f7.vendor.js": 696791,
            "cb6e5b88a3c73636.ltr.css": 4103,
            "fc206674fec63bf9.js": 275709,
            "18732a7ce0850a40.rtl.css": 4103,
            "d7cf0aba64e1b2d4.ltr.css": 248,
            "f85e844dc76e573a.js": 5431,
            "cb3538416979fc60.rtl.css": 248,
            "0c1b3154e4749648.vendor.js": 171323,
            "6deae931d603ab27.js": 85999,
            "58d44ed12f55addb.ltr.css": 5748,
            "a6a7c77d84c63ae2.js": 548844,
            "54f5ae379482a07f.rtl.css": 5748,
            "4b686f63c53900e5.vendor.js": 115884,
            "63b5d1e48591bd18.vendor.js": 158513,
            "c71e4041b4d40c87.js": 73192,
            "9e77df5aea4f98ac.js": 173027,
            "121a4f45c9f08234.js": 9454,
            "9862ba9dc8be182c.js": 97980,
            "2dce66d3fe9e7182.js": 225049,
            "c9bf091720f7f1c3.ltr.css": 233,
            "019b5a7f1b513cd8.js": 97206,
            "49dcf4c456be0dd9.rtl.css": 233,
            "14c3c34fe50de252.js": 113391,
            "32d5e7ad790f1459.js": 17646,
            "71dec1f5d11e3f66.ltr.css": 360,
            "52f4dadf4190608b.js": 519028,
            "7cf7805937173758.rtl.css": 360,
            "5981378e91a75131.js": 281008,
            "ca10385ab7f3657c.ltr.css": 354,
            "3af29b43f28daea4.js": 578499,
            "be92cdc2c813e15f.rtl.css": 354,
            "0b3db0ad13739726.js": 90551,
            "e5732dc5094546e4.js": 122599,
            "a2741bce810a09c9.js": 237649,
            "6792aa54535bcdd1.js": 243220,
            "f8678f5d2a496896.ltr.css": 355,
            "8adc701605be61cd.js": 244924,
            "29bdbb1d75c8c7a3.rtl.css": 355,
            "aed61a49fdfc513b.ltr.css": 355,
            "5c5900b648824447.js": 269793,
            "7dac84e36568326f.rtl.css": 355,
            "bb6eb577d535021e.js": 196700,
            "dbada605beba2e0d.vendor.js": 32309,
            "9d806e7fa287aa1c.js": 199854,
            "2e3daf54ffc7cbe7.js": 354557,
            "5b2241d885919c07.ltr.css": 360,
            "4bca6654b5308ed1.js": 149487,
            "3759df5a77daebac.rtl.css": 360,
            "6d606625418b5ec8.js": 241216,
            "5fce490d51cdbb5c.js": 40637,
            "ade9fe347b5e046d.js": 40591,
            "fc052e7c81069d46.js": 24713,
            "35a3a289b0e33843.ltr.css": 9315,
            "d304500f3495f0c3.js": 598635,
            "8cc048da50540270.rtl.css": 9315,
            "25c5b90e650b1888.js": 41208,
            "5b7fe8f909b06739.ltr.css": 913,
            "d80c1c1d6989cb57.js": 60552,
            "b197b394e4f55ce1.rtl.css": 913,
            "bc102a5ee7d0bd55.vendor.js": 648073,
            "44ce630fa966dd23.ltr.css": 607,
            "fdf0df6e22516b73.js": 68594,
            "8ec5819b5639aca4.rtl.css": 607,
            "e68e2de901f4d39e.js": 182583,
            "0bdf034859eb56eb.js": 452696,
            "8dd0cb1e0979d988.ltr.css": 5557,
            "87bb38c345e348fd.js": 218324,
            "eaf9987ddc748d09.rtl.css": 5557,
            "13d99414f410f430.ltr.css": 319,
            "25a6dbef57a40bf3.js": 5624,
            "b9ec1237e067a990.rtl.css": 319,
            "638e8938c76a575e.ltr.css": 412,
            "e575656d90047ddc.js": 158993,
            "1e246b15020f607d.rtl.css": 414,
            "5a2dac70f8c37db6.js": 17002,
            "27d2c0f3a29924a2.js": 9219,
            "6e40d11215b3f0fc.js": 61189,
            "88134e92ab09c6b0.js": 9877,
            "68e1625dfde6c30d.js": 11132,
            "248b089e27881dcd.ltr.css": 123575,
            "d2f006f79022b413.js": 2895280,
            "a22abbff6d4042d7.rtl.css": 123580,
            "13eaba859ff9cbd9.vendor.js": 52565,
            "0f9dd805f1221e62.ltr.css": 18794,
            "72f3e9d39b535513.js": 190855,
            "e6a9f3c1d9fbcab0.rtl.css": 18795,
            "da210214fd5a61ff.ltr.css": 9349,
            "27474b526a9fa47b.js": 228329,
            "dd4f397bdc4982dc.rtl.css": 9349,
            "fea9cab2348bed16.js": 209141,
            "9a626da9b91633a6.js": 3316,
            "ad57dad3d8bf4052.js": 68023,
            "d42a5888a017bbbb.js": 229737,
            "2d237a273d5cb147.js": 299029,
            "cddcc8624f575704.js": 102754,
            "734b451c8fe09ecd.js": 561089,
            "76f91aa94bc9178b.js": 46329,
            "7e6402017abfe6ef.js": 214698,
            "cd70dd0669ccf1d1.js": 4456,
            "21084e085d850ee4.js": 2785,
            "19384f8b149e9cb1.js": 1496,
            "8723460a9087a9d0.js": 3787,
            "48bc5dc5fd85f0ff.js": 2749,
            "f7f2973cfe03d59f.js": 2614,
            "e8264137c9f83676.js": 2048,
            "4119114cfc7300b0.js": 2759,
            "f15609f4e1a56b85.js": 3036,
            "9bd8aec46a5bac3e.js": 4016,
            "c36ad222465492cb.js": 6118,
            "a5a6c7715ea13111.js": 2854,
            "be1421f250667f35.js": 4390,
            "6226544be63ce9cd.js": 4851,
            "bc12b255093e6a18.js": 3101,
            "30c7c955b36f25ba.js": 11030,
            "c21501bdd87336ea.js": 11133,
            "2be2298b49f5c49f.js": 34499,
            "489dec8cbb9570e2.ltr.css": 6905,
            "8e1107d00ac62901.js": 97821,
            "7974d5bbdf33c24b.rtl.css": 6905,
            "f324ce08f2f90159.js": 59569,
            "34e4ad8897b86c79.js": 1945,
            "7541dd48b8da5a26.js": 72663,
            "fd2ca6e5b6ced89c.js": 6520,
            "1965bcc16ac3c567.js": 38729,
            "a1f87bd0597ae7eb.js": 1428,
          },
          self.__check_cache_batch_chunks__,
          "assets-2"
        );
    })(),
    (c.g.BUILD_VARIABLES = Object.assign(c.g.BUILD_VARIABLES || {}, {
      PREFERRED_REACT_RENDERER: "concurrent",
    })),
    (() => {
      const e = JSON.parse(
          '{"10764":9189,"26998":9222,"41491":6966,"57517":6763,"66661":4874,"77259":1904,"107775":4667,"115405":7833,"144616":4043,"147538":7831,"199008":5486,"201096":1761,"240224":419,"254583":7533,"257521":5447,"264195":9482,"265639":3607,"278947":4995,"304461":7628,"306217":1078,"306961":1169,"311765":1869,"351159":4411,"355195":1132,"370555":5706,"373557":3496,"376699":5024,"381976":4492,"414142":781,"417920":7717,"432200":5412,"441361":7972,"459569":371,"462341":4143,"463051":6674,"471678":4450,"491976":3441,"523808":2911,"529244":7406,"546981":6069,"550043":382,"553839":4283,"556664":2188,"558104":2928,"573895":6566,"583870":2104,"590359":2921,"606885":2758,"607514":8272,"612125":1481,"616748":1758,"627433":7351,"646953":9091,"656395":1500,"671835":5196,"673857":368,"674646":631,"702632":3103,"704519":7437,"704965":5412,"733196":336,"737852":8226,"755160":1327,"775716":869,"800198":6061,"802911":1597,"803930":6420,"808818":4161,"847775":1923,"880419":3962,"880916":1169,"896202":8701,"930272":6405,"940223":9927,"941542":9443,"955185":8889,"957134":9552,"963992":6889,"966460":364,"975382":1277,"978829":5665,"984464":7592,"985387":2780}'
        ),
        r = JSON.parse(
          '{"336":[],"364":[7363],"368":[7970],"371":[7363],"382":[],"419":[],"574":[2429],"631":[574],"781":[],"869":[5412],"1078":[7363],"1132":[6559],"1169":[2429,2933],"1277":[5234,7970],"1327":[],"1389":[],"1434":[8058],"1481":[6559],"1500":[5234,7970],"1597":[],"1758":[2928],"1761":[],"1869":[2928,574],"1904":[2928],"1923":[],"2104":[],"2188":[7363],"2429":[],"2653":[],"2758":[],"2780":[],"2911":[2928],"2921":[5412],"2928":[2429],"2933":[],"3103":[7363],"3441":[],"3496":[],"3607":[7363],"3962":[],"4043":[4400],"4143":[2928,7363],"4161":[],"4283":[2429,5412],"4400":[],"4411":[],"4450":[],"4492":[],"4667":[],"4874":[2928,8058],"4995":[2928],"5024":[],"5196":[],"5234":[4400],"5412":[],"5436":[],"5447":[2429],"5486":[2928,4400],"5654":[6559],"5665":[2928],"5706":[2928,5412,574],"6061":[5654],"6069":[],"6405":[7970],"6420":[7363],"6559":[7970],"6566":[2429],"6674":[],"6763":[7363],"6889":[],"6966":[2928],"7351":[4400],"7363":[2933],"7406":[6559],"7437":[],"7533":[],"7592":[],"7628":[7970],"7717":[6559],"7831":[],"7833":[2928],"7970":[1434,2928],"7972":[5654],"8058":[],"8226":[],"8272":[6559],"8701":[2928,4400,5412],"8889":[],"9091":[574],"9189":[],"9222":[2429],"9443":[],"9482":[],"9552":[],"9927":[]}'
        ),
        t = (e, n, f) => {
          if (!f.has(e))
            return f.add(e), r[e].forEach((e) => t(e, n, f)), n.push(e), n;
        };
      c.me = function (r) {
        const n = e[r];
        if (null == n) return Promise.resolve(c(r));
        const f = t(n, [], new Set());
        return Promise.all(f.map((e) => c.e(e))).then(() => c(r));
      };
    })(),
    (() => {
      const e = {};
      c.f.locale = function (r, t) {
        !(function (e, r, t) {
          if (null == r[e]) {
            const t = self.cmsg;
            if (!t || !t.assets) return;
            const n = t.loaded,
              f = t.locale || "en";
            if (n && n[e + "_" + f]) return;
            const s = t.assets[f] && t.assets[f][e] && t.assets[f][e].js;
            if (!s) return;
            r[e] = Promise.all(
              s.map(
                (t) =>
                  new Promise((n, f) => {
                    const s = c.p + t;
                    c.l(
                      s,
                      (s) => {
                        if ("load" === s.type) (r[e] = 0), n();
                        else
                          delete r[e],
                            f(new Error(`Fail to load message files@${t}`));
                      },
                      "ensure-locale-" + e,
                      e
                    );
                  })
              )
            );
          }
          const n = r[e];
          if (n) t.push(n);
        })(r, e, t);
      };
    })(),
    (() => {
      let e =
        "undefined" != typeof self && void 0 !== self.document
          ? self.document.body.parentElement.getAttribute("dir")
          : "ltr";
      if ("ltr" !== e && "rtl" !== e)
        console.warn(
          "Could not determine the direction of text, please check that the dir attribute is set on the html tag"
        ),
          (e = "ltr");
      if ("rtl" === e) c.miniCssF = c.miniCssFRtl;
    })(),
    (() => {
      if ("undefined" != typeof document) {
        var e = (e) =>
            new Promise((r, t) => {
              var n = c.miniCssF(e),
                f = c.p + n;
              if (
                ((e, r) => {
                  for (
                    var t = document.getElementsByTagName("link"), n = 0;
                    n < t.length;
                    n++
                  ) {
                    var f =
                      (i = t[n]).getAttribute("data-href") ||
                      i.getAttribute("href");
                    if ("stylesheet" === i.rel && (f === e || f === r))
                      return i;
                  }
                  var s = document.getElementsByTagName("style");
                  for (n = 0; n < s.length; n++) {
                    var i;
                    if (
                      (f = (i = s[n]).getAttribute("data-href")) === e ||
                      f === r
                    )
                      return i;
                  }
                })(n, f)
              )
                return r();
              ((e, r, t, n, f) => {
                var s = document.createElement("link");
                (s.rel = "stylesheet"),
                  (s.type = "text/css"),
                  (s.onerror = s.onload =
                    (t) => {
                      if (((s.onerror = s.onload = null), "load" === t.type))
                        n();
                      else {
                        var i = t && ("load" === t.type ? "missing" : t.type),
                          c = (t && t.target && t.target.href) || r,
                          a = new Error(
                            "Loading CSS chunk " + e + " failed.\n(" + c + ")"
                          );
                        if (
                          ((a.code = "CSS_CHUNK_LOAD_FAILED"),
                          (a.type = i),
                          (a.request = c),
                          s.parentNode)
                        )
                          s.parentNode.removeChild(s);
                        f(a);
                      }
                    }),
                  (s.href = r),
                  (function (e) {
                    const r = (e) => {
                      document.head.appendChild(e);
                    };
                    if (c.loadCss) c.loadCss(e, r);
                    else r(e);
                  })(s);
              })(e, f, 0, r, t);
            }),
          r = { 8581: 0 };
        c.f.miniCss = (t, n) => {
          if (r[t]) n.push(r[t]);
          else if (
            0 !== r[t] &&
            {
              382: 1,
              574: 1,
              869: 1,
              1169: 1,
              1327: 1,
              1481: 1,
              1869: 1,
              2928: 1,
              4143: 1,
              5024: 1,
              5412: 1,
              5654: 1,
              5706: 1,
              7363: 1,
              7406: 1,
              7970: 1,
              8058: 1,
              8272: 1,
              8701: 1,
            }[t]
          )
            n.push(
              (r[t] = e(t).then(
                () => {
                  r[t] = 0;
                },
                (e) => {
                  throw (delete r[t], e);
                }
              ))
            );
        };
      }
    })(),
    (() => {
      var e = { 8581: 0 };
      (c.f.j = (r, t) => {
        var n = c.o(e, r) ? e[r] : void 0;
        if (0 !== n)
          if (n) t.push(n[2]);
          else if (8581 != r) {
            var f = new Promise((t, f) => (n = e[r] = [t, f]));
            t.push((n[2] = f));
            var s = c.p + c.u(r),
              i = new Error();
            c.l(
              s,
              (t) => {
                if (c.o(e, r)) {
                  if (0 !== (n = e[r])) e[r] = void 0;
                  if (n) {
                    var f = t && ("load" === t.type ? "missing" : t.type),
                      s = t && t.target && t.target.src;
                    (i.message =
                      "Loading chunk " +
                      r +
                      " failed.\n(" +
                      f +
                      ": " +
                      s +
                      ")"),
                      (i.name = "ChunkLoadError"),
                      (i.type = f),
                      (i.request = s),
                      n[1](i);
                  }
                }
              },
              "chunk-" + r,
              r
            );
          } else e[r] = 0;
      }),
        (c.O.j = (r) => 0 === e[r]);
      var r = (r, t) => {
          var n,
            f,
            [s, i, a] = t,
            o = 0;
          if (s.some((r) => 0 !== e[r])) {
            for (n in i) if (c.o(i, n)) c.m[n] = i[n];
            if (a) var u = a(c);
          }
          if (r) r(t);
          for (; o < s.length; o++) {
            if (((f = s[o]), c.o(e, f) && e[f])) e[f][0]();
            e[f] = 0;
          }
          return c.O(u);
        },
        t = (self.webpackChunk_canva_web = self.webpackChunk_canva_web || []);
      t.forEach(r.bind(null, 0)), (t.push = r.bind(null, t.push.bind(t)));
    })();
})();
//# sourceMappingURL=sourcemaps/37365a3758fb699d.runtime.js.map

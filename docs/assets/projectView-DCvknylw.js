import { r as s, b as n, c as r, a as t, t as l, d as c, o as m } from './index-CJKU-QGw.js'
const u = { class: 'about' },
  d = { hidden: 'true' },
  _ = {
    __name: 'projectView',
    setup(p) {
      const o = s('')
      return (
        n(() => {
          console.log(
            document
              .getElementsByClassName('about')[0]
              .attributes.getNamedItem('name')
              .textContent.replace('/project', '')
          ),
            fetch(
              '/' +
                document
                  .getElementsByClassName('about')[0]
                  .attributes.getNamedItem('name')
                  .textContent.replace('/project', '')
            )
              .then((e) => e.text())
              .then((e) => (o.value = e))
              .catch((e) => console.error(e))
        }),
        (e, a) => (
          m(),
          r('div', u, [
            a[0] || (a[0] = t('p', { class: 'log' }, null, -1)),
            t('h1', null, l(o.value), 1),
            t('i', d, [c(e.$slots, 'name')])
          ])
        )
      )
    }
  }
export { _ as default }

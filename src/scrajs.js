
import { h } from 'small-cup'
import * as bootstrap from 'bootstrap'

const isVisible = (d) => !['script', 'style'].some(dd => d.selector.startsWith(dd))

export const onload = async (el) => {

  const $api = h('input', {type: 'url', value: 'http://localhost:4000' })
  const $url = h('input', {type: 'url', value: 'https://quotes.toscrape.com' })
  const $preview = h('div')
  h(el, {}, [
    h('p', {}, ['api: ', $api]),
    h('p', {}, ['url: ', $url]),
    h('p', {}, [
      h('button', {
        className: 'btn btn-primary',
        onclick: async (e) => {
          e.target.textContent = 'Loading'
          e.target.disabled = true
          try {
            await onupdate()
          } catch (err) {
            console.error(err)
          }
          e.target.textContent = 'preview'
          e.target.disabled = false
        }
      }, 'preview')
    ]),
    $preview,
  ])

  const onupdate = async () => {
    const query = `
    query show  {
    page(url: "${$url.value}") {
      show
    }
    }
    `

    const res = await fetch($api.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    }).then(res => res.json())

    h($preview, {}, res.data.page.show.map(d => {
      if (!isVisible(d)) {
        return
      }
      const span = h('span', {
        className: 'text-success mx-1',
      }, d.selector)
      new bootstrap.Popover(span, {
        html: true,
        sanitize: false,
        title: d.selector,
        content: `<div class="table-responsive"><table class='table'><tbody>${d.attributes.map(dd => `<tr><th>${dd.name}</th><td>${dd.value}</td></tr>`).join('')}</tbody></table></div>`,
        trigger: 'hover',
      })

      return h('div', {
        attributes: {
          'd-selector': d.selector,
        },
      }, [
        h('span', {innerHTML: '|&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(d.level)}),
        h('input', { type: 'checkbox', onchange: (e) => {
          for (const matched of el.querySelectorAll(`div[d-selector="${d.selector}"]`)) {
            matched.style.color= e.target.checked ? 'red' : ''
          }
        } }),
        span,
        h('span', { className: 'border-bottom' }, d.text),
      ])

    }))
  }
}

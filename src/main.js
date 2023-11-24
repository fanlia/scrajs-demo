
import './index.css'
import { run } from './scrapper.js'
import { getEditor } from './editor.js'

import demo from '../spiders/demo.js?raw'
import macaudaily from '../spiders/macaudaily.js?raw'

const $run = document.querySelector("#run")
const $doc = document.querySelector("#doc")
const $result = document.querySelector("#result tbody")

const docs = {
  demo: demo,
  demo2: macaudaily,
}

const editor = getEditor({
  doc: docs.demo,
  parent: document.querySelector("#editor"),
})

$doc.onchange = async (e) => {
  const name = e.target.value
  editor.setDoc(docs[name])
  $result.innerHTML = ''
}

const getModule = async (doc) => {
  const body = doc.replace(/export\s+const\s+/g, 'exports.')
  const exports = {}
  new Function('exports', body)(exports)
  return exports
}

const worker = ({event, data}) => {
  if (event === 'item') {
    if (data.count === 1) {
      const $tr = document.createElement('tr')
      $result.appendChild($tr)
      $tr.innerHTML = Object.keys(data.data).map(d => `<th>${d}</th>`).join('')
    }
    const $tr = document.createElement('tr')
    $result.appendChild($tr)
    $tr.innerHTML = Object.values(data.data).map(d => `<td>${d}</td>`).join('')
  } else if (event === 'end') {
    $run.textContent = 'run'
    $run.disabled = false

  } else if (event === 'start') {
    $run.textContent = 'loading'
    $run.disabled = true
  }
}

const url = 'http://localhost:4000'

$run.onclick = async () => {
  const doc = editor.getDoc()
  const options = await getModule(doc)
  await run(url, {
    ...options,
    workers: [worker],
  })
}

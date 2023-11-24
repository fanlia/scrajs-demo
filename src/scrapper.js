
import { runSpider } from '../src/request.js'

const gbuild = (url) => async (data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())

  return res
}

export const run = async (url, options) => {
  const g = gbuild(url)
  return runSpider(options, g, {})
}

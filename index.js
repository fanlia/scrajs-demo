
import * as demo from './spiders/demo.js'
import { run } from './src/scrapper.js'

const spiderName = process.argv[2]

if (!spiderName) {
  console.error('spiderName required')
  proces.exit()
}

const options = await import('./spiders/' + spiderName + '.js')

const workers = [
  console.log,
]

const url = 'http://localhost:4000'

const spider = {
  ...options,
  workers,
}

await run(url, spider)



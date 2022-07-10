import { Low, JSONFile } from 'lowdb'

import { resolve, dirname } from 'path'

import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = resolve(__dirname, '../data/db.json')

const adapter = new JSONFile(file)

const db = new Low(adapter)

await db.read()

db.data ||= {
  bill: [],
  categories: []
}

await db.write()

export default function (options = {}) {

  return async function (ctx, next) {

    ctx.db = db

    await next()

  }

}

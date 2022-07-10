import _ from 'lodash'

import { readFile } from 'fs/promises'

import parseCsv from '../lib/parse.mjs'

const query = async function (ctx) {

  const { db, resolve } = ctx

  const isEmptyCategory = _.isEmpty(db.data.categories)

  if (isEmptyCategory) {

    const realPath = resolve('./csv/categories.csv')
    const fileBuffer = await readFile(realPath)
    const csvContent = fileBuffer.toString()

    db.data.categories = parseCsv(csvContent)

    db.write()

  }

  ctx.success(db.data.categories)

}

export default { query }

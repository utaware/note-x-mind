const query = async function (ctx) {

  const { db } = ctx

  ctx.success(db.data.bill)

}

const insert = async function (ctx) {

  const { db } = ctx

  const list = ctx.request.body

  await db.read()

  db.data.bill.push(...list)

  await db.write()

  ctx.success()

}

const clear = async function (ctx) {

  const { db } = ctx

  await db.read()

  db.data.bill = []

  await db.write()

  ctx.success()

}

export default { query, insert, clear }

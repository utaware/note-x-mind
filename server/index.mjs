import Koa from 'koa'

import bodyParser from 'koa-bodyparser'

const app = new Koa()

import router from './router/index.mjs'

import middlewareRes from './middleware/res.mjs'
import middlewareDb from './middleware/db.mjs'
import middlewareResolve from './middleware/resolve.mjs'

app.use(middlewareRes())
app.use(middlewareDb())
app.use(middlewareResolve())
app.use(bodyParser())
app.use(router.routes())

app.listen(9000, () => {
  console.log('server is running at 9000')
})


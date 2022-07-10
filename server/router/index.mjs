import Router from 'koa-router'

const router = new Router({ prefix: '/api' })

import routeCategories from './categories.mjs'
import routeBill from './bill.mjs'

router.get('/categories', routeCategories.query)
router.get('/bill', routeBill.query)
router.post('/bill', routeBill.insert)
router.delete('/bill', routeBill.clear)

export default router

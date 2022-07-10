export default function (options = {}) {

  return async function (ctx, next) {

    const {
      type = 'json',
    } = options

    ctx.type = type

    ctx.fail = function (options) {
      const defaultOptions = { msg: 'fail' , code: 0, erorr: {} }
      ctx.body = Object.assign(defaultOptions, options)
    }

    ctx.success = function (data = null) {
      ctx.body = { msg: 'success', code: 200, data }
    }

    await next()

  }

}

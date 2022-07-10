import { resolve } from 'path'

const rootDir = process.cwd()

const serverDir = resolve(rootDir, 'server')

export default function (options = {}) {

  return async function (ctx, next) {

    ctx.resolve = function (...args) {
      return resolve(serverDir, ...args)
    }

    await next()

  }

}

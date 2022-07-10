import { resolve } from 'path'

export const rootDir = process.cwd()

export const serverDir = resolve(rootDir, 'server')

export const serverDirWith = function (...args) {
  return resolve(serverDir, ...args)
}

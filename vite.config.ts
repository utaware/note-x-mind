import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import { resolve } from 'path'

function resolvePath (...args: string[]): string {
  return resolve(__dirname, ...args)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolvePath('src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000'
      }
    }
  }
})

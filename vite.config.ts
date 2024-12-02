import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
/// <reference types="vitest" />
import type { UserConfig as VitestUserConfig } from 'vitest/config'

// interface 대신 type을 직접 사용
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://15.165.4.143:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  publicDir: path.resolve(__dirname, 'public'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public')
    }
  }
} as VitestUserConfig)
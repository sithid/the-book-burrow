import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    //host: true,
    //port: 5173,
    // proxy stuff to get around cors issues with the google books api
    proxy: {
      '/google-books-api': {
        target: 'https://www.googleapis.com', // the real api endpoint
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/google-books-api/, ''), // strip the prefix we added and add it to the target
        secure: false,
      },
    },
  },
  resolve: {
    // replace @ with ./src for convienence
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

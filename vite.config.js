import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base:"/porfolio/",
  plugins: [
    vue(),
  ],
  build: {
    assetsInlineLimit:50,
    manifest:true,
    ssrManifest:true,
    rollupOptions: {
     // assetsInlineLimit:500,
      // https://rollupjs.org/guide/en/#big-list-of-options
    }
  },
  resolve: {
    
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'project':fileURLToPath(new URL('./project', import.meta.url))
    }
  }
})

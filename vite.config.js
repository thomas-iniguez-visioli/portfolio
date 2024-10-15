import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base:"/porfolio",
  plugins: [
    vue(),
  ],
  build: {
    minify:false,
      rollupOption:{
      output:{
          assetFileNames: "assets/[name].[ext]",
            entryFileNames: chunk => {

                        if (chunk.facadeModuleId.endsWith('.js')) {
                            return '[name].js'
                        }
                        

                    }
      }
      }
    
    

  },
  resolve: {
    
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'project':fileURLToPath(new URL('./project', import.meta.url))
    }
  }
})

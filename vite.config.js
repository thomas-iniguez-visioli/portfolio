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
	  base:"/porfolio",
      rollupOption:{
      output:{
          assetFileNames: "[name].[ext]",
            entryFileNames: chunk => {

                        if (chunk.facadeModuleId.endsWith('.js')) {
                            return '[name].js'
                        }
                        

                    },
           chunkFileNames: (chunkInfo) => {
	 	console.log(chunkInfo.name.toLowerCase())
          return `${chunkInfo.name.toLowerCase()}.js`;
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

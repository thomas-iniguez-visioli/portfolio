import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 import vueMd from 'vite-vue-md'
// https://vitejs.dev/config/
export default defineConfig({
    base:"/portfolio",
  plugins: [
    vue({
             include: [/\.vue$/, /\.md$/] // ← Treat MD files as Vue components
          }),vueMd()
  ],configureWebpack:{
    mode: 'development',
    devtool: true,
    optimization: {
      splitChunks: {
        
           
        chunks: 'all',
        minSize: 150,
        maxSize: 2500,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        
      },
    
     
    },   proxy: {
      '^/feed': {
        target: 'https://bonjourlafuite.eu.org/',
        ws: true,
        changeOrigin: true
      },
    }

  },
  build: {
    minify:false,
	  base:"/portfolio",
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
     
    }
  }
})

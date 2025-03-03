import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
appType :"mpa",
    base:"/portfolio/",
	
  plugins: [
    vue({
             include: [/\.vue$/, /\.md$/] // ← Treat MD files as Vue components
          })
  ],configureWebpack:{
    mode: 'production',
    devtool: true,
      proxy: {
      '^/feed': {
        target: 'https://bonjourlafuite.eu.org/',
        ws: true,
        changeOrigin: true
      },
    }

  },
  build: {
	  appType :"mpa",
	  emitAssets:true,
	  ssrEmitAssets :true,
    minify:false,
	  base:"/portfolio/",
	  
    emptyOutDir: false, 
      rollupOption:{
	      input:{
		      main:"./index.html",
		      projet:"./index.html"
	      },
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

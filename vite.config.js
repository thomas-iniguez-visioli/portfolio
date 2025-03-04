import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import routes from './src/router/index'
import vue from '@vitejs/plugin-vue'

// Plugin pour désactiver esbuild en interceptant la transformation
const disableEsbuildPlugin = {
    name: 'disable-esbuild',
    enforce: 'pre',
    transform(code, id) {
      console.log(id)
        if (id.endsWith('.js') || id.endsWith('.ts')|| id.endsWith('.vue')) {
            return { code, map: null }; // Ne modifie pas le code
        }
    }
}

export default defineConfig({
    base: "/portfolio/",
    plugins: [
        vue,
        disableEsbuildPlugin, // Ajout du plugin pour désactiver esbuild
    ],
    optimizeDeps: {
        disabled: true // Empêche le pré-build avec esbuild
    },
    build: {
        minify: false,
        base: "/portfolio/",
        emptyOutDir: false,
        rollupOptions: {
            input: {
                ...Object.fromEntries(
                    routes.getRoutes.map(route => [
                        route.name,
                        resolve(__dirname, `index.html`)
                    ])
                )
            },
            output: {
                assetFileNames: "[name].[ext]",
                entryFileNames: chunk => {
                    if (chunk.facadeModuleId && chunk.facadeModuleId.endsWith('.js')) {
                        return '[name].js'
                    }
                },
                chunkFileNames: (chunkInfo) => {
                    console.log(chunkInfo.name.toLowerCase())
                    return `${chunkInfo.name.toLowerCase()}.js`;
                }
            },
            plugins: [disableEsbuildPlugin] // Ajout du plugin aussi pour le build
        },
        commonjsOptions: {
            transformMixedEsModules: true // Force Rollup à gérer les modules JS/TS sans esbuild
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    server: {
        proxy: {
            '^/feed': {
                target: 'https://bonjourlafuite.eu.org/',
                ws: true,
                changeOrigin: true
            },
        }
    }
})

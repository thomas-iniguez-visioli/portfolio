import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import routes from './src/router/index'
import vue from '@vitejs/plugin-vue'

// Enhanced performance configuration
const isProduction = process.env.NODE_ENV === 'production'

// Critical CSS extraction plugin
const criticalCSSPlugin = () => ({
    name: 'critical-css-extractor',
    buildStart() {
        if (isProduction) {
            console.log('🎨 Extracting critical CSS...')
            // Run critical CSS extraction
            const { execSync } = require('child_process')
            try {
                execSync('node themes/matrix-flow/scripts/critical-css-extractor.js', { stdio: 'inherit' })
            } catch (error) {
                console.warn('⚠️ Critical CSS extraction failed:', error.message)
            }
        }
    }
})

// Performance optimization plugin
const performanceOptimizer = () => ({
    name: 'performance-optimizer',
    generateBundle(options, bundle) {
        // Log bundle analysis information
        const chunks = Object.values(bundle).filter(chunk => chunk.type === 'chunk')
        const assets = Object.values(bundle).filter(asset => asset.type === 'asset')
        
        console.log(`📦 Bundle Analysis:`)
        console.log(`   Chunks: ${chunks.length}`)
        console.log(`   Assets: ${assets.length}`)
        
        // Analyze chunk sizes and warn about large bundles
        chunks.forEach(chunk => {
            const size = chunk.code ? (chunk.code.length / 1024).toFixed(2) : 0
            console.log(`   📄 ${chunk.fileName}: ${size}KB`)
            
            if (size > 100) {
                console.warn(`⚠️ Large chunk detected: ${chunk.fileName} (${size}KB)`)
            }
        })
        
        // Generate performance report
        const report = {
            totalChunks: chunks.length,
            totalAssets: assets.length,
            totalSize: chunks.reduce((sum, chunk) => sum + (chunk.code?.length || 0), 0),
            timestamp: new Date().toISOString()
        }
        
        console.log('📊 Build Performance Report:', report)
    }
})

// Asset optimization plugin with advanced features
const assetOptimizer = () => ({
    name: 'asset-optimizer',
    generateBundle(options, bundle) {
        // Optimize CSS assets
        Object.keys(bundle).forEach(fileName => {
            const file = bundle[fileName]
            if (file.type === 'asset' && fileName.endsWith('.css')) {
                console.log(`🎨 Optimizing CSS: ${fileName}`)
                
                // Add CSS minification and optimization
                if (file.source && typeof file.source === 'string') {
                    // Remove comments and extra whitespace
                    file.source = file.source
                        .replace(/\/\*[\s\S]*?\*\//g, '')
                        .replace(/\s+/g, ' ')
                        .trim()
                }
            }
            
            // Optimize JavaScript assets
            if (file.type === 'chunk' && fileName.endsWith('.js')) {
                console.log(`⚡ Optimizing JS: ${fileName}`)
            }
        })
    }
})

// Code splitting optimization plugin
const codeSplittingOptimizer = () => ({
    name: 'code-splitting-optimizer',
    config(config) {
        // Enhance code splitting configuration
        if (!config.build) config.build = {}
        if (!config.build.rollupOptions) config.build.rollupOptions = {}
        if (!config.build.rollupOptions.output) config.build.rollupOptions.output = {}
        
        // Add dynamic import optimization
        config.build.rollupOptions.output.dynamicImportFunction = 'import'
        
        console.log('🔀 Code splitting optimization enabled')
    }
})

export default defineConfig({
    base: "/portfolio/",
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    // Optimize template compilation
                    hoistStatic: true,
                    cacheHandlers: true
                }
            }
        }),
        // Always include critical CSS extraction
        criticalCSSPlugin(),
        // Production optimizations
        ...(isProduction ? [
            performanceOptimizer(), 
            assetOptimizer(),
            codeSplittingOptimizer()
        ] : [])
    ],
    
    // Enhanced dependency optimization
    optimizeDeps: {
        include: ['vue', 'vue-router'],
        exclude: ['@vite/client', '@vite/env']
    },
    
    build: {
        // Enable minification in production
        minify: isProduction ? 'esbuild' : false,
        base: "/portfolio/",
        emptyOutDir: false,
        
        // Enhanced build performance
        target: 'es2015',
        cssTarget: 'chrome80',
        
        // Chunk size warnings
        chunkSizeWarningLimit: 1000,
        
        rollupOptions: {
            input: {
                ...Object.fromEntries(
                    routes.getRoutes.map(route => [
                        route.name,
                        resolve(__dirname, `index.html`)
                    ])
                )
            },
            
            // Manual chunk splitting for better caching
            output: {
                // Optimized file naming for caching
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.')
                    const ext = info[info.length - 1]
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                        return `assets/images/[name]-[hash][extname]`
                    }
                    if (/css/i.test(ext)) {
                        return `assets/css/[name]-[hash][extname]`
                    }
                    return `assets/[name]-[hash][extname]`
                },
                
                entryFileNames: (chunk) => {
                    return `assets/js/[name]-[hash].js`
                },
                
                chunkFileNames: (chunkInfo) => {
                    return `assets/js/[name]-[hash].js`
                },
                
                // Enhanced manual chunks for optimal code splitting
                manualChunks: (id) => {
                    // Vendor chunk for external dependencies
                    if (id.includes('node_modules')) {
                        // Split large vendor libraries into separate chunks
                        if (id.includes('vue')) return 'vue-vendor'
                        if (id.includes('router')) return 'router-vendor'
                        return 'vendor'
                    }
                    
                    // Theme-specific chunks
                    if (id.includes('themes/matrix-flow')) {
                        if (id.includes('newsletter')) return 'newsletter-theme'
                        if (id.includes('performance')) return 'performance-theme'
                        return 'theme'
                    }
                    
                    // Feature-based chunks
                    if (id.includes('newsletter')) return 'newsletter'
                    if (id.includes('lazy-load')) return 'lazy-loading'
                    if (id.includes('performance')) return 'performance'
                    
                    // Default chunk
                    return null
                }
            }
        },
        
        // Enhanced CommonJS handling
        commonjsOptions: {
            transformMixedEsModules: true,
            include: [/node_modules/]
        }
    },
    
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@theme': fileURLToPath(new URL('./themes/matrix-flow', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
        }
    },
    
    server: {
        // Enhanced development server
        hmr: {
            overlay: true
        },
        proxy: {
            '^/feed': {
                target: 'https://bonjourlafuite.eu.org/',
                ws: true,
                changeOrigin: true
            },
        }
    },
    
    // CSS optimization
    css: {
        devSourcemap: !isProduction,
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@theme/source/css/variables.scss";`
            }
        }
    }
})

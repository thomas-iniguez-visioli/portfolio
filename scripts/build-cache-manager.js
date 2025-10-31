/**
 * Build Cache Manager
 * Intelligent cache management system for faster rebuilds
 */

import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE_DIR = path.resolve(__dirname, '../.cache')
const CACHE_MANIFEST = path.join(CACHE_DIR, 'manifest.json')

class BuildCacheManager {
    constructor() {
        this.manifest = new Map()
        this.stats = {
            hits: 0,
            misses: 0,
            invalidations: 0,
            buildTime: 0
        }
    }

    /**
     * Initialize cache system
     */
    async init() {
        try {
            await fs.mkdir(CACHE_DIR, { recursive: true })
            await this.loadManifest()
            console.log('🚀 Build cache initialized')
        } catch (error) {
            console.warn('⚠️ Cache initialization failed:', error.message)
        }
    }

    /**
     * Load cache manifest
     */
    async loadManifest() {
        try {
            const data = await fs.readFile(CACHE_MANIFEST, 'utf8')
            const manifest = JSON.parse(data)
            this.manifest = new Map(Object.entries(manifest))
        } catch (error) {
            // Manifest doesn't exist or is corrupted, start fresh
            this.manifest = new Map()
        }
    }

    /**
     * Save cache manifest
     */
    async saveManifest() {
        try {
            const manifestObj = Object.fromEntries(this.manifest)
            await fs.writeFile(CACHE_MANIFEST, JSON.stringify(manifestObj, null, 2))
        } catch (error) {
            console.warn('⚠️ Failed to save cache manifest:', error.message)
        }
    }

    /**
     * Generate file hash for cache key
     */
    async getFileHash(filePath) {
        try {
            const content = await fs.readFile(filePath)
            return crypto.createHash('sha256').update(content).digest('hex')
        } catch (error) {
            return null
        }
    }

    /**
     * Check if file is cached and valid
     */
    async isCached(filePath) {
        const hash = await this.getFileHash(filePath)
        if (!hash) return false

        const cacheKey = path.relative(process.cwd(), filePath)
        const cached = this.manifest.get(cacheKey)

        if (cached && cached.hash === hash) {
            this.stats.hits++
            return true
        }

        this.stats.misses++
        return false
    }

    /**
     * Add file to cache
     */
    async addToCache(filePath, outputPath = null) {
        const hash = await this.getFileHash(filePath)
        if (!hash) return false

        const cacheKey = path.relative(process.cwd(), filePath)
        const stats = await fs.stat(filePath)

        this.manifest.set(cacheKey, {
            hash,
            timestamp: stats.mtime.getTime(),
            outputPath,
            size: stats.size
        })

        await this.saveManifest()
        return true
    }

    /**
     * Invalidate cache for specific file or pattern
     */
    async invalidate(pattern = null) {
        if (!pattern) {
            // Clear all cache
            this.manifest.clear()
            this.stats.invalidations++
            console.log('🗑️ Cache cleared completely')
        } else {
            // Clear matching files
            const regex = new RegExp(pattern)
            const keysToDelete = []

            for (const key of this.manifest.keys()) {
                if (regex.test(key)) {
                    keysToDelete.push(key)
                }
            }

            keysToDelete.forEach(key => this.manifest.delete(key))
            this.stats.invalidations += keysToDelete.length

            console.log(`🗑️ Invalidated ${keysToDelete.length} cache entries matching: ${pattern}`)
        }

        await this.saveManifest()
    }

    /**
     * Get cache statistics
     */
    getStats() {
        const totalRequests = this.stats.hits + this.stats.misses
        const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests * 100).toFixed(2) : 0

        return {
            ...this.stats,
            hitRate: `${hitRate}%`,
            cacheSize: this.manifest.size,
            totalRequests
        }
    }

    /**
     * Clean up old cache entries
     */
    async cleanup(maxAge = 7 * 24 * 60 * 60 * 1000) { // 7 days default
        const now = Date.now()
        const keysToDelete = []

        for (const [key, entry] of this.manifest.entries()) {
            if (now - entry.timestamp > maxAge) {
                keysToDelete.push(key)
            }
        }

        keysToDelete.forEach(key => this.manifest.delete(key))
        
        if (keysToDelete.length > 0) {
            console.log(`🧹 Cleaned up ${keysToDelete.length} old cache entries`)
            await this.saveManifest()
        }
    }

    /**
     * Monitor file changes for automatic invalidation
     */
    watchForChanges(watchPaths = ['src', 'themes']) {
        const chokidar = require('chokidar')
        
        const watcher = chokidar.watch(watchPaths, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            persistent: true
        })

        watcher.on('change', async (filePath) => {
            const relativePath = path.relative(process.cwd(), filePath)
            if (this.manifest.has(relativePath)) {
                console.log(`📝 File changed, invalidating cache: ${relativePath}`)
                this.manifest.delete(relativePath)
                await this.saveManifest()
            }
        })

        return watcher
    }
}

export default BuildCacheManager
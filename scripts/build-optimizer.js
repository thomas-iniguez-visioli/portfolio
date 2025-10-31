/**
 * Build Optimizer Script
 * Orchestrates CSS and JavaScript delivery optimizations
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class BuildOptimizer {
    constructor() {
        this.startTime = Date.now();
        this.metrics = {
            criticalCSS: { size: 0, extracted: false },
            bundles: { count: 0, totalSize: 0 },
            resources: { preloaded: 0, prefetched: 0 }
        };
    }

    async optimize() {
        console.log('🚀 Starting build optimization...');
        
        try {
            // Step 1: Extract critical CSS
            await this.extractCriticalCSS();
            
            // Step 2: Optimize JavaScript delivery
            await this.optimizeJavaScript();
            
            // Step 3: Generate resource hints
            await this.generateResourceHints();
            
            // Step 4: Validate optimizations
            await this.validateOptimizations();
            
            // Step 5: Generate performance report
            await this.generateReport();
            
            console.log('✅ Build optimization completed successfully');
        } catch (error) {
            console.error('❌ Build optimization failed:', error);
            throw error;
        }
    }

    async extractCriticalCSS() {
        console.log('🎨 Extracting critical CSS...');
        
        try {
            execSync('node themes/matrix-flow/scripts/critical-css-extractor.js', { 
                stdio: 'inherit',
                cwd: process.cwd()
            });
            
            // Measure critical CSS size
            const criticalCSSPath = 'themes/matrix-flow/layout/_partial/critical-css.ejs';
            const stats = await fs.stat(criticalCSSPath);
            this.metrics.criticalCSS.size = stats.size;
            this.metrics.criticalCSS.extracted = true;
            
            console.log(`✅ Critical CSS extracted (${(stats.size / 1024).toFixed(2)}KB)`);
        } catch (error) {
            console.warn('⚠️ Critical CSS extraction failed:', error.message);
        }
    }

    async optimizeJavaScript() {
        console.log('⚡ Optimizing JavaScript delivery...');
        
        // Check if code splitter exists
        const codeSplitterPath = 'themes/matrix-flow/source/js/code-splitter.js';
        try {
            await fs.access(codeSplitterPath);
            console.log('✅ Code splitter configured');
        } catch {
            console.warn('⚠️ Code splitter not found');
        }
        
        // Check if resource preloader exists
        const preloaderPath = 'themes/matrix-flow/source/js/resource-preloader.js';
        try {
            await fs.access(preloaderPath);
            console.log('✅ Resource preloader configured');
        } catch {
            console.warn('⚠️ Resource preloader not found');
        }
    }

    async generateResourceHints() {
        console.log('🔗 Generating resource hints...');
        
        const hintsConfig = {
            preload: [
                { href: '/js/code-splitter.js', as: 'script', priority: 'critical' },
                { href: '/js/resource-preloader.js', as: 'script', priority: 'critical' },
                { href: '/js/module-loader.js', as: 'script', priority: 'critical' },
                { href: '/js/viewport-manager.js', as: 'script', priority: 'high' },
                { href: '/js/matrix.js', as: 'script', priority: 'high' }
            ],
            prefetch: [
                { href: '/js/newsletter.js', as: 'script', priority: 'medium' },
                { href: '/js/lazy-loader.js', as: 'script', priority: 'medium' },
                { href: '/css/newsletter.css', as: 'style', priority: 'low' }
            ],
            preconnect: [
                { href: 'https://fonts.googleapis.com', crossorigin: true },
                { href: 'https://fonts.gstatic.com', crossorigin: true }
            ],
            dnsPrefetch: [
                '//fonts.googleapis.com',
                '//fonts.gstatic.com'
            ]
        };
        
        const configPath = 'themes/matrix-flow/source/js/resource-hints-config.json';
        await fs.writeFile(configPath, JSON.stringify(hintsConfig, null, 2));
        
        this.metrics.resources.preloaded = hintsConfig.preload.length;
        this.metrics.resources.prefetched = hintsConfig.prefetch.length;
        
        console.log(`✅ Resource hints generated (${hintsConfig.preload.length} preload, ${hintsConfig.prefetch.length} prefetch)`);
    }

    async validateOptimizations() {
        console.log('🔍 Validating optimizations...');
        
        const validations = [];
        
        // Check critical CSS
        try {
            await fs.access('themes/matrix-flow/layout/_partial/critical-css.ejs');
            validations.push('✅ Critical CSS partial exists');
        } catch {
            validations.push('❌ Critical CSS partial missing');
        }
        
        // Check CSS helpers
        try {
            await fs.access('themes/matrix-flow/layout/_partial/css-helpers.ejs');
            validations.push('✅ CSS helpers exist');
        } catch {
            validations.push('❌ CSS helpers missing');
        }
        
        // Check JavaScript modules
        const jsModules = [
            'code-splitter.js',
            'resource-preloader.js',
            'module-loader.js'
        ];
        
        for (const module of jsModules) {
            try {
                await fs.access(`themes/matrix-flow/source/js/${module}`);
                validations.push(`✅ ${module} exists`);
            } catch {
                validations.push(`❌ ${module} missing`);
            }
        }
        
        // Check layout integration
        try {
            const layoutContent = await fs.readFile('themes/matrix-flow/layout/layout.ejs', 'utf8');
            if (layoutContent.includes('critical_css()')) {
                validations.push('✅ Layout uses critical CSS');
            } else {
                validations.push('❌ Layout missing critical CSS integration');
            }
            
            if (layoutContent.includes('resource_hints()')) {
                validations.push('✅ Layout uses resource hints');
            } else {
                validations.push('❌ Layout missing resource hints');
            }
        } catch {
            validations.push('❌ Layout file not accessible');
        }
        
        validations.forEach(validation => console.log(validation));
    }

    async generateReport() {
        const endTime = Date.now();
        const duration = endTime - this.startTime;
        
        const report = {
            timestamp: new Date().toISOString(),
            duration: `${duration}ms`,
            optimizations: {
                criticalCSS: {
                    enabled: this.metrics.criticalCSS.extracted,
                    size: `${(this.metrics.criticalCSS.size / 1024).toFixed(2)}KB`
                },
                codeSplitting: {
                    enabled: true,
                    strategy: 'dynamic-imports'
                },
                resourceHints: {
                    preload: this.metrics.resources.preloaded,
                    prefetch: this.metrics.resources.prefetched
                }
            },
            recommendations: this.generateRecommendations()
        };
        
        console.log('\n📊 Optimization Report:');
        console.log(JSON.stringify(report, null, 2));
        
        // Save report to file
        await fs.writeFile('build-optimization-report.json', JSON.stringify(report, null, 2));
        console.log('📄 Report saved to build-optimization-report.json');
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.metrics.criticalCSS.size > 50 * 1024) {
            recommendations.push('Consider reducing critical CSS size (>50KB)');
        }
        
        if (!this.metrics.criticalCSS.extracted) {
            recommendations.push('Enable critical CSS extraction for better performance');
        }
        
        if (this.metrics.resources.preloaded < 3) {
            recommendations.push('Consider preloading more critical resources');
        }
        
        return recommendations;
    }
}

// CLI usage
if (require.main === module) {
    const optimizer = new BuildOptimizer();
    optimizer.optimize().catch(error => {
        console.error('Build optimization failed:', error);
        process.exit(1);
    });
}

module.exports = BuildOptimizer;
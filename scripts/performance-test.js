/**
 * Performance Test Script
 * Validates CSS and JavaScript delivery optimizations
 */

const fs = require('fs').promises;
const path = require('path');

class PerformanceTest {
    constructor() {
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            warnings: 0
        };
    }

    async runTests() {
        console.log('🧪 Running performance optimization tests...\n');

        // Test critical CSS extraction
        await this.testCriticalCSS();
        
        // Test JavaScript code splitting
        await this.testCodeSplitting();
        
        // Test resource hints
        await this.testResourceHints();
        
        // Test layout integration
        await this.testLayoutIntegration();
        
        // Test file sizes
        await this.testFileSizes();
        
        // Generate test report
        this.generateTestReport();
    }

    async testCriticalCSS() {
        console.log('🎨 Testing Critical CSS...');
        
        try {
            // Check if critical CSS partial exists
            const criticalCSSPath = 'themes/matrix-flow/layout/_partial/critical-css.ejs';
            await fs.access(criticalCSSPath);
            
            // Check file size
            const stats = await fs.stat(criticalCSSPath);
            const sizeKB = stats.size / 1024;
            
            if (sizeKB > 50) {
                this.addWarning(`Critical CSS size is large: ${sizeKB.toFixed(2)}KB (recommended: <50KB)`);
            } else {
                this.addPass(`Critical CSS size is optimal: ${sizeKB.toFixed(2)}KB`);
            }
            
            // Check content quality
            const content = await fs.readFile(criticalCSSPath, 'utf8');
            
            if (content.includes(':root')) {
                this.addPass('Critical CSS includes CSS variables');
            } else {
                this.addWarning('Critical CSS missing CSS variables');
            }
            
            if (content.includes('.fullscreen-container')) {
                this.addPass('Critical CSS includes layout styles');
            } else {
                this.addFail('Critical CSS missing layout styles');
            }
            
            if (content.includes('@keyframes')) {
                this.addPass('Critical CSS includes animations');
            } else {
                this.addWarning('Critical CSS missing animations');
            }
            
        } catch (error) {
            this.addFail(`Critical CSS test failed: ${error.message}`);
        }
    }

    async testCodeSplitting() {
        console.log('\n⚡ Testing JavaScript Code Splitting...');
        
        const jsModules = [
            'code-splitter.js',
            'resource-preloader.js',
            'module-loader.js'
        ];
        
        for (const module of jsModules) {
            try {
                const modulePath = `themes/matrix-flow/source/js/${module}`;
                await fs.access(modulePath);
                
                const stats = await fs.stat(modulePath);
                const sizeKB = stats.size / 1024;
                
                if (sizeKB > 100) {
                    this.addWarning(`${module} is large: ${sizeKB.toFixed(2)}KB`);
                } else {
                    this.addPass(`${module} size is good: ${sizeKB.toFixed(2)}KB`);
                }
                
                // Check module content
                const content = await fs.readFile(modulePath, 'utf8');
                
                if (content.includes('class ')) {
                    this.addPass(`${module} uses ES6 classes`);
                }
                
                if (content.includes('async ') || content.includes('await ')) {
                    this.addPass(`${module} uses async/await`);
                }
                
                if (content.includes('import(')) {
                    this.addPass(`${module} supports dynamic imports`);
                }
                
            } catch (error) {
                this.addFail(`${module} test failed: ${error.message}`);
            }
        }
    }

    async testResourceHints() {
        console.log('\n🔗 Testing Resource Hints...');
        
        try {
            // Check resource hints configuration
            const configPath = 'themes/matrix-flow/source/js/resource-hints-config.json';
            await fs.access(configPath);
            
            const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
            
            if (config.preload && config.preload.length > 0) {
                this.addPass(`Resource preload configured (${config.preload.length} resources)`);
            } else {
                this.addFail('No preload resources configured');
            }
            
            if (config.prefetch && config.prefetch.length > 0) {
                this.addPass(`Resource prefetch configured (${config.prefetch.length} resources)`);
            } else {
                this.addWarning('No prefetch resources configured');
            }
            
            if (config.preconnect && config.preconnect.length > 0) {
                this.addPass(`Preconnect configured (${config.preconnect.length} origins)`);
            } else {
                this.addWarning('No preconnect origins configured');
            }
            
            // Check for critical resources
            const criticalResources = ['module-loader.js', 'viewport-manager.js'];
            const preloadedResources = config.preload.map(r => r.href);
            
            criticalResources.forEach(resource => {
                if (preloadedResources.some(href => href.includes(resource))) {
                    this.addPass(`Critical resource preloaded: ${resource}`);
                } else {
                    this.addWarning(`Critical resource not preloaded: ${resource}`);
                }
            });
            
        } catch (error) {
            this.addFail(`Resource hints test failed: ${error.message}`);
        }
    }

    async testLayoutIntegration() {
        console.log('\n🏗️ Testing Layout Integration...');
        
        try {
            // Check main layout
            const layoutPath = 'themes/matrix-flow/layout/layout.ejs';
            const layoutContent = await fs.readFile(layoutPath, 'utf8');
            
            // Check critical CSS integration
            if (layoutContent.includes('critical_css()')) {
                this.addPass('Layout includes critical CSS function');
            } else {
                this.addFail('Layout missing critical CSS integration');
            }
            
            // Check resource hints integration
            if (layoutContent.includes('resource_hints()')) {
                this.addPass('Layout includes resource hints function');
            } else {
                this.addFail('Layout missing resource hints integration');
            }
            
            // Check non-critical CSS loading
            if (layoutContent.includes('non_critical_css(')) {
                this.addPass('Layout uses non-critical CSS loading');
            } else {
                this.addFail('Layout missing non-critical CSS loading');
            }
            
            // Check optimized font loading
            if (layoutContent.includes('preload_fonts()')) {
                this.addPass('Layout uses optimized font loading');
            } else {
                this.addWarning('Layout could use optimized font loading');
            }
            
            // Check JavaScript optimization
            if (layoutContent.includes('code-splitter.js')) {
                this.addPass('Layout includes code splitter');
            } else {
                this.addFail('Layout missing code splitter');
            }
            
            if (layoutContent.includes('resource-preloader.js')) {
                this.addPass('Layout includes resource preloader');
            } else {
                this.addFail('Layout missing resource preloader');
            }
            
            // Check CSS helpers
            const helpersPath = 'themes/matrix-flow/layout/_partial/css-helpers.ejs';
            await fs.access(helpersPath);
            this.addPass('CSS helpers partial exists');
            
        } catch (error) {
            this.addFail(`Layout integration test failed: ${error.message}`);
        }
    }

    async testFileSizes() {
        console.log('\n📏 Testing File Sizes...');
        
        const filesToCheck = [
            { path: 'themes/matrix-flow/source/css/style.css', maxSize: 200, type: 'CSS' },
            { path: 'themes/matrix-flow/source/js/code-splitter.js', maxSize: 100, type: 'JS' },
            { path: 'themes/matrix-flow/source/js/resource-preloader.js', maxSize: 100, type: 'JS' },
            { path: 'themes/matrix-flow/layout/_partial/critical-css.ejs', maxSize: 50, type: 'Critical CSS' }
        ];
        
        for (const file of filesToCheck) {
            try {
                const stats = await fs.stat(file.path);
                const sizeKB = stats.size / 1024;
                
                if (sizeKB <= file.maxSize) {
                    this.addPass(`${file.type} size is good: ${sizeKB.toFixed(2)}KB (max: ${file.maxSize}KB)`);
                } else {
                    this.addWarning(`${file.type} size is large: ${sizeKB.toFixed(2)}KB (max: ${file.maxSize}KB)`);
                }
                
            } catch (error) {
                this.addWarning(`Could not check ${file.type} size: ${error.message}`);
            }
        }
    }

    addPass(message) {
        console.log(`✅ ${message}`);
        this.results.passed++;
    }

    addFail(message) {
        console.log(`❌ ${message}`);
        this.results.failed++;
    }

    addWarning(message) {
        console.log(`⚠️ ${message}`);
        this.results.warnings++;
    }

    generateTestReport() {
        console.log('\n📊 Performance Test Report:');
        console.log('================================');
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`⚠️ Warnings: ${this.results.warnings}`);
        console.log(`📈 Total: ${this.results.passed + this.results.failed + this.results.warnings}`);
        
        const successRate = (this.results.passed / (this.results.passed + this.results.failed)) * 100;
        console.log(`🎯 Success Rate: ${successRate.toFixed(1)}%`);
        
        if (this.results.failed === 0) {
            console.log('\n🎉 All critical tests passed! CSS and JavaScript delivery is optimized.');
        } else {
            console.log('\n⚠️ Some tests failed. Please review the issues above.');
        }
        
        // Performance recommendations
        console.log('\n💡 Performance Recommendations:');
        if (this.results.warnings > 0) {
            console.log('- Review warnings above for optimization opportunities');
        }
        console.log('- Monitor Core Web Vitals in production');
        console.log('- Consider implementing service worker for caching');
        console.log('- Test on various devices and network conditions');
        console.log('- Use Lighthouse for comprehensive performance audits');
    }
}

// CLI usage
if (require.main === module) {
    const test = new PerformanceTest();
    test.runTests().catch(error => {
        console.error('Performance test failed:', error);
        process.exit(1);
    });
}

module.exports = PerformanceTest;
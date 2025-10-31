/**
 * CSS Optimization and Delivery System
 * Handles CSS minification, critical path optimization, and delivery strategies
 */

const fs = require('fs');
const path = require('path');

class CSSOptimizer {
    constructor(hexo) {
        this.hexo = hexo;
        this.cssFiles = new Map();
        this.optimizedCSS = new Map();
    }

    // Register CSS optimization filter
    static register(hexo) {
        const optimizer = new CSSOptimizer(hexo);
        
        // Optimize CSS after generation
        hexo.extend.filter.register('after_generate', () => {
            optimizer.optimizeAllCSS();
        });

        // Helper for optimized CSS loading
        hexo.extend.helper.register('optimized_css', function(href, options = {}) {
            return optimizer.generateOptimizedCSSTag(href, options);
        });

        // Helper for CSS preloading
        hexo.extend.helper.register('preload_css', function(href) {
            return `<link rel="preload" href="${href}" as="style">`;
        });
    }

    optimizeAllCSS() {
        const cssDir = path.join(this.hexo.public_dir, 'css');
        
        if (!fs.existsSync(cssDir)) return;

        const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
        
        cssFiles.forEach(file => {
            const filePath = path.join(cssDir, file);
            this.optimizeCSS(filePath);
        });
    }

    optimizeCSS(filePath) {
        try {
            const css = fs.readFileSync(filePath, 'utf8');
            const optimized = this.minifyCSS(css);
            
            // Write optimized version
            fs.writeFileSync(filePath, optimized);
            
            // Generate critical and non-critical versions
            this.generateCriticalCSS(filePath, css);
            
        } catch (error) {
            console.warn(`Failed to optimize CSS: ${filePath}`, error);
        }
    }

    minifyCSS(css) {
        return css
            // Remove comments
            .replace(/\/\*[\s\S]*?\*\//g, '')
            // Remove unnecessary whitespace
            .replace(/\s+/g, ' ')
            // Remove whitespace around selectors and properties
            .replace(/\s*{\s*/g, '{')
            .replace(/;\s*}/g, '}')
            .replace(/;\s*/g, ';')
            .replace(/,\s*/g, ',')
            .replace(/:\s*/g, ':')
            // Remove trailing semicolons
            .replace(/;}/g, '}')
            // Remove empty rules
            .replace(/[^{}]+{\s*}/g, '')
            .trim();
    }

    generateCriticalCSS(filePath, originalCSS) {
        const criticalSelectors = this.getCriticalSelectors();
        const { critical, nonCritical } = this.splitCSS(originalCSS, criticalSelectors);
        
        // Write critical CSS
        const criticalPath = filePath.replace('.css', '.critical.css');
        fs.writeFileSync(criticalPath, this.minifyCSS(critical));
        
        // Write non-critical CSS
        const nonCriticalPath = filePath.replace('.css', '.non-critical.css');
        fs.writeFileSync(nonCriticalPath, this.minifyCSS(nonCritical));
    }

    getCriticalSelectors() {
        return [
            // Layout structure
            'html', 'body', '*',
            '.fullscreen-container',
            '.responsive-grid',
            '.site-header',
            '.logo-glitch',
            '.main-nav',
            
            // Typography
            'h1', 'h2', 'h3', 'p', 'a',
            
            // Critical animations
            '@keyframes',
            
            // Mobile-first
            '@media (max-width: 768px)',
            '@media (max-width: 480px)',
            
            // Accessibility
            '@media (prefers-reduced-motion',
            '@media (prefers-contrast'
        ];
    }

    splitCSS(css, criticalSelectors) {
        const rules = this.parseCSS(css);
        let critical = '';
        let nonCritical = '';
        
        rules.forEach(rule => {
            if (this.isCriticalRule(rule, criticalSelectors)) {
                critical += rule + '\n';
            } else {
                nonCritical += rule + '\n';
            }
        });
        
        return { critical, nonCritical };
    }

    parseCSS(css) {
        const rules = [];
        let currentRule = '';
        let braceCount = 0;
        let inMediaQuery = false;
        let mediaQueryContent = '';
        
        const lines = css.split('\n');
        
        for (let line of lines) {
            line = line.trim();
            if (!line) continue;
            
            // Handle media queries
            if (line.startsWith('@media')) {
                if (currentRule) {
                    rules.push(currentRule.trim());
                    currentRule = '';
                }
                inMediaQuery = true;
                mediaQueryContent = line + '\n';
                braceCount = 0;
                continue;
            }
            
            if (inMediaQuery) {
                mediaQueryContent += line + '\n';
                braceCount += (line.match(/{/g) || []).length;
                braceCount -= (line.match(/}/g) || []).length;
                
                if (braceCount === 0) {
                    rules.push(mediaQueryContent.trim());
                    inMediaQuery = false;
                    mediaQueryContent = '';
                }
                continue;
            }
            
            currentRule += line + '\n';
            braceCount += (line.match(/{/g) || []).length;
            braceCount -= (line.match(/}/g) || []).length;
            
            if (braceCount === 0 && currentRule.trim()) {
                rules.push(currentRule.trim());
                currentRule = '';
            }
        }
        
        if (currentRule.trim()) {
            rules.push(currentRule.trim());
        }
        
        return rules;
    }

    isCriticalRule(rule, criticalSelectors) {
        return criticalSelectors.some(selector => {
            return rule.toLowerCase().includes(selector.toLowerCase());
        });
    }

    generateOptimizedCSSTag(href, options = {}) {
        const {
            critical = false,
            async = true,
            media = 'all',
            importance = 'low'
        } = options;
        
        if (critical) {
            return `<link rel="stylesheet" href="${href}" media="${media}">`;
        }
        
        if (async) {
            return `
                <link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
                <noscript><link rel="stylesheet" href="${href}"></noscript>
            `.trim();
        }
        
        return `<link rel="stylesheet" href="${href}" media="${media}">`;
    }
}

// Auto-register the optimizer
CSSOptimizer.register(hexo);

module.exports = CSSOptimizer;
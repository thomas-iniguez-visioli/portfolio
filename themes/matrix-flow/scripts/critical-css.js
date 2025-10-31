/**
 * Critical CSS extraction and inlining for Matrix Flow Theme
 * Extracts above-the-fold CSS and inlines it for faster rendering
 */

const fs = require('fs');
const path = require('path');

class CriticalCSSExtractor {
    constructor(hexo) {
        this.hexo = hexo;
        this.criticalCSS = '';
        this.nonCriticalCSS = '';
        this.extractCriticalStyles();
    }

    extractCriticalStyles() {
        // Define critical CSS selectors (above-the-fold content)
        const criticalSelectors = [
            // Base styles
            ':root',
            '*',
            'html',
            'body',
            
            // Layout structure
            '.fullscreen-container',
            '.responsive-grid',
            '.site-header',
            '.logo-glitch',
            '.main-nav',
            '.nav-item',
            
            // Matrix background (visible immediately)
            '#matrix-canvas',
            'body::after',
            
            // Typography (for text rendering)
            'h1', 'h2', 'h3',
            'p',
            'a',
            
            // Critical animations
            '@keyframes scan',
            '@keyframes glitch-anim-1',
            '@keyframes glitch-anim-2',
            
            // Mobile-first responsive (most common viewport)
            '@media (max-width: 768px)',
            '@media (max-width: 480px)',
            
            // Accessibility
            '@media (prefers-reduced-motion: reduce)',
            '@media (prefers-contrast: high)'
        ];

        // Read the main CSS file
        const cssPath = path.join(this.hexo.theme_dir, 'source/css/style.css');
        
        if (fs.existsSync(cssPath)) {
            const fullCSS = fs.readFileSync(cssPath, 'utf8');
            this.splitCSS(fullCSS, criticalSelectors);
        }
    }

    splitCSS(css, criticalSelectors) {
        const lines = css.split('\n');
        let currentRule = '';
        let inCriticalRule = false;
        let braceCount = 0;
        
        for (let line of lines) {
            currentRule += line + '\n';
            
            // Count braces to track rule boundaries
            braceCount += (line.match(/{/g) || []).length;
            braceCount -= (line.match(/}/g) || []).length;
            
            // Check if this line starts a new rule
            if (line.includes('{') && braceCount === 1) {
                const selector = line.split('{')[0].trim();
                inCriticalRule = this.isCriticalSelector(selector, criticalSelectors);
            }
            
            // If we've closed all braces, we've finished a rule
            if (braceCount === 0 && currentRule.trim()) {
                if (inCriticalRule) {
                    this.criticalCSS += currentRule;
                } else {
                    this.nonCriticalCSS += currentRule;
                }
                currentRule = '';
                inCriticalRule = false;
            }
        }
    }

    isCriticalSelector(selector, criticalSelectors) {
        return criticalSelectors.some(critical => {
            if (critical.startsWith('@')) {
                return selector.includes(critical);
            }
            return selector.includes(critical) || 
                   selector.match(new RegExp(critical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        });
    }

    getCriticalCSS() {
        // Minify critical CSS
        return this.criticalCSS
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/;\s*}/g, '}') // Remove unnecessary semicolons
            .trim();
    }

    getNonCriticalCSS() {
        return this.nonCriticalCSS;
    }
}

// Register helper for critical CSS inlining
hexo.extend.helper.register('critical_css', function() {
    const extractor = new CriticalCSSExtractor(this);
    const criticalCSS = extractor.getCriticalCSS();
    
    if (criticalCSS) {
        return `<style>${criticalCSS}</style>`;
    }
    return '';
});

// Register helper for non-critical CSS loading
hexo.extend.helper.register('non_critical_css', function(href) {
    return `
    <link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${href}"></noscript>
    `;
});

// Register helper for resource hints
hexo.extend.helper.register('resource_hints', function() {
    const hints = [
        // DNS prefetch for external resources
        '<link rel="dns-prefetch" href="//fonts.googleapis.com">',
        '<link rel="dns-prefetch" href="//fonts.gstatic.com">',
        
        // Preconnect for critical external resources
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        
        // Preload critical assets
        '<link rel="preload" href="/css/style.css" as="style">',
        '<link rel="preload" href="/js/matrix.js" as="script">',
        '<link rel="preload" href="/js/viewport-manager.js" as="script">',
        
        // Prefetch non-critical assets
        '<link rel="prefetch" href="/js/newsletter.js">',
        '<link rel="prefetch" href="/js/lazy-loader.js">',
        '<link rel="prefetch" href="/css/newsletter.css">',
        '<link rel="prefetch" href="/css/lazy-loading.css">'
    ];
    
    return hints.join('\n    ');
});

module.exports = CriticalCSSExtractor;
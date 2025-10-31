/**
 * Critical CSS Extractor for Matrix Flow Theme
 * Extracts and inlines critical above-the-fold CSS for faster rendering
 */

const fs = require('fs');
const path = require('path');

class CriticalCSSExtractor {
    constructor(options = {}) {
        this.options = {
            cssPath: options.cssPath || 'source/css/style.css',
            outputPath: options.outputPath || 'layout/_partial/critical-css.ejs',
            viewport: {
                width: options.viewport?.width || 1200,
                height: options.viewport?.height || 800
            },
            ...options
        };
        
        this.criticalSelectors = [
            // Layout structure
            'html', 'body', '*',
            '.fullscreen-container',
            '.responsive-grid',
            '.site-header',
            '.site-main',
            '.main-content',
            
            // Critical visual elements
            '.logo-glitch',
            '.main-nav',
            '.nav-item',
            '#matrix-canvas',
            
            // Above-the-fold content
            '.post-list-item:first-child',
            '.post-title',
            '.post-meta',
            
            // Essential animations and transitions
            '@keyframes scan',
            '@keyframes glitch-anim-1',
            '@keyframes glitch-anim-2',
            
            // Critical responsive breakpoints
            '@media (max-width: 768px)',
            '@media (max-width: 480px)'
        ];
    }

    async extractCriticalCSS() {
        try {
            const cssContent = await this.readCSSFile();
            const criticalCSS = this.filterCriticalRules(cssContent);
            const optimizedCSS = this.optimizeCriticalCSS(criticalCSS);
            
            await this.generateCriticalCSSPartial(optimizedCSS);
            await this.generateNonCriticalCSSLoader();
            
            console.log('✅ Critical CSS extracted and optimized');
            return optimizedCSS;
        } catch (error) {
            console.error('❌ Critical CSS extraction failed:', error);
            throw error;
        }
    }

    async readCSSFile() {
        const cssPath = path.resolve(this.options.cssPath);
        return fs.promises.readFile(cssPath, 'utf8');
    }

    filterCriticalRules(cssContent) {
        const lines = cssContent.split('\n');
        const criticalLines = [];
        let inCriticalRule = false;
        let braceCount = 0;
        let currentRule = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Check if this line starts a critical rule
            if (this.isCriticalSelector(line)) {
                inCriticalRule = true;
                currentRule = line;
                braceCount = 0;
            }

            if (inCriticalRule) {
                criticalLines.push(lines[i]);
                
                // Count braces to know when rule ends
                braceCount += (line.match(/{/g) || []).length;
                braceCount -= (line.match(/}/g) || []).length;
                
                if (braceCount === 0 && line.includes('}')) {
                    inCriticalRule = false;
                    currentRule = '';
                }
            }
        }

        return criticalLines.join('\n');
    }

    isCriticalSelector(line) {
        // Check for CSS variables (always critical)
        if (line.includes(':root') || line.includes('--')) {
            return true;
        }

        // Check against critical selectors list
        return this.criticalSelectors.some(selector => {
            if (selector.startsWith('@')) {
                return line.includes(selector);
            }
            return line.includes(selector) && (line.includes('{') || line.includes(','));
        });
    }

    optimizeCriticalCSS(css) {
        return css
            // Remove comments
            .replace(/\/\*[\s\S]*?\*\//g, '')
            // Remove extra whitespace
            .replace(/\s+/g, ' ')
            // Remove whitespace around braces and semicolons
            .replace(/\s*{\s*/g, '{')
            .replace(/\s*}\s*/g, '}')
            .replace(/\s*;\s*/g, ';')
            .replace(/\s*,\s*/g, ',')
            // Remove trailing semicolons before closing braces
            .replace(/;}/g, '}')
            .trim();
    }

    async generateCriticalCSSPartial(criticalCSS) {
        const template = `<%
/**
 * Critical CSS Partial - Auto-generated
 * Contains above-the-fold styles for faster rendering
 */
%>
<style>
${criticalCSS}
</style>`;

        const outputPath = path.resolve(this.options.outputPath);
        await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.promises.writeFile(outputPath, template);
        
        console.log(`📝 Critical CSS partial generated: ${outputPath}`);
    }

    async generateNonCriticalCSSLoader() {
        const loaderTemplate = `<%
/**
 * Non-Critical CSS Loader - Auto-generated
 * Loads non-critical CSS asynchronously after page load
 */
function non_critical_css(href) {
    return \`<link rel="preload" href="\${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="\${href}"></noscript>\`;
}

function resource_hints() {
    const hints = [];
    
    // DNS prefetch for external resources
    hints.push('<link rel="dns-prefetch" href="//fonts.googleapis.com">');
    hints.push('<link rel="dns-prefetch" href="//fonts.gstatic.com">');
    
    // Preconnect to critical origins
    hints.push('<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>');
    hints.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
    
    // Preload critical resources
    hints.push(\`<link rel="preload" href="\${url_for('/js/module-loader.js')}" as="script">\`);
    hints.push(\`<link rel="preload" href="\${url_for('/js/viewport-manager.js')}" as="script">\`);
    
    return hints.join('\\n  ');
}

function critical_css() {
    return partial('_partial/critical-css');
}
%>`;

        const helperPath = path.resolve('themes/matrix-flow/scripts/css-helpers.js');
        await fs.promises.mkdir(path.dirname(helperPath), { recursive: true });
        await fs.promises.writeFile(helperPath, loaderTemplate);
        
        console.log(`🔧 CSS helper functions generated: ${helperPath}`);
    }

    async generateOptimizedBuild() {
        // Extract critical CSS
        await this.extractCriticalCSS();
        
        // Generate resource hints configuration
        await this.generateResourceHintsConfig();
        
        console.log('🚀 CSS optimization build completed');
    }

    async generateResourceHintsConfig() {
        const config = {
            preload: [
                { href: '/js/module-loader.js', as: 'script' },
                { href: '/js/viewport-manager.js', as: 'script' },
                { href: '/js/matrix.js', as: 'script' }
            ],
            prefetch: [
                { href: '/js/newsletter.js', as: 'script' },
                { href: '/js/lazy-loader.js', as: 'script' }
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

        const configPath = path.resolve('themes/matrix-flow/source/js/resource-hints-config.json');
        await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
        
        console.log(`⚙️ Resource hints configuration generated: ${configPath}`);
    }
}

module.exports = CriticalCSSExtractor;

// CLI usage
if (require.main === module) {
    const extractor = new CriticalCSSExtractor({
        cssPath: 'themes/matrix-flow/source/css/style.css',
        outputPath: 'themes/matrix-flow/layout/_partial/critical-css.ejs'
    });
    
    extractor.generateOptimizedBuild().catch(console.error);
}
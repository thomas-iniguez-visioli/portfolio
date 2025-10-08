'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Critical CSS extraction and inlining system
 * Identifies and inlines critical above-the-fold CSS
 */

// Define critical CSS selectors that should be inlined
const CRITICAL_SELECTORS = [
  // Layout essentials
  'html', 'body', '.page-grid', '.page-main', '.main-content',
  // Header and navigation
  '.header', '.nav', '.nav-item', '.nav-link',
  // Typography essentials
  'h1', 'h2', 'h3', 'p', 'a',
  // Critical components
  '.hero', '.sidebar', '.container',
  // Font loading
  '@font-face',
  // Variables
  ':root',
  // Above-the-fold specific
  '.critical-above-fold', '.fcp-optimized', '.lcp-optimized'
];

// CSS files that contain critical styles
const CRITICAL_CSS_FILES = [
  'source/css/foundation/reset.css',
  'source/css/foundation/variables.css', 
  'source/css/foundation/typography.css',
  'source/css/layout/grid.css',
  'source/css/layout/header.css',
  'source/css/components/sidebar.css'
];

/**
 * Extract critical CSS from specified files
 */
function extractCriticalCSS() {
  let criticalCSS = '';
  
  CRITICAL_CSS_FILES.forEach(filePath => {
    const fullPath = path.join(hexo.source_dir, '..', 'themes', 'hexo-theme', filePath);
    
    if (fs.existsSync(fullPath)) {
      const cssContent = fs.readFileSync(fullPath, 'utf8');
      
      // Extract critical selectors using simple regex
      // This is a basic implementation - in production you'd use a proper CSS parser
      const criticalRules = cssContent.split('}').filter(rule => {
        return CRITICAL_SELECTORS.some(selector => 
          rule.includes(selector) || rule.includes(selector.replace('.', '\\.')));
      }).map(rule => rule + '}').join('\n');
      
      criticalCSS += criticalRules;
    }
  });
  
  return criticalCSS;
}

/**
 * Minify CSS by removing comments, whitespace, and unnecessary characters
 */
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around specific characters
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim();
}

/**
 * Generate critical CSS inline styles
 */
hexo.extend.helper.register('criticalCSS', function() {
  const criticalCSS = extractCriticalCSS();
  const minifiedCSS = minifyCSS(criticalCSS);
  
  if (minifiedCSS) {
    return `<style id="critical-css">${minifiedCSS}</style>`;
  }
  
  return '';
});

/**
 * Generate non-critical CSS with lazy loading
 */
hexo.extend.helper.register('nonCriticalCSS', function(urls) {
  const v = process.env.npm_package_version;
  
  return urls
    .filter(d => d)
    .map(url => {
      const href = hexo.extend.helper.get('url_for').call(this, url) + `?v=${v}`;
      
      // Use media="print" trick for lazy loading non-critical CSS
      return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${href}"></noscript>`;
    })
    .join('\n');
});

/**
 * Generate optimized font loading with preload and font-display
 */
hexo.extend.helper.register('optimizedFonts', function() {
  const fonts = [
    {
      family: 'Inter',
      weights: ['400', '500', '600'],
      display: 'swap'
    },
    {
      family: 'JetBrains Mono', 
      weights: ['400', '500'],
      display: 'swap'
    }
  ];
  
  let fontHTML = '';
  
  fonts.forEach(font => {
    font.weights.forEach(weight => {
      // Preload critical font files
      fontHTML += `<link rel="preload" href="/fonts/${font.family.replace(' ', '')}-${weight}.woff2" as="font" type="font/woff2" crossorigin>\n`;
    });
    
    // Add font-display: swap for better performance
    fontHTML += `<style>
@font-face {
  font-family: '${font.family}';
  src: url('/fonts/${font.family.replace(' ', '')}-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: ${font.display};
}
</style>\n`;
  });
  
  return fontHTML;
});

/**
 * Generate resource hints for performance optimization
 */
hexo.extend.helper.register('resourceHints', function() {
  const hints = [
    // Preconnect to external domains
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    
    // DNS prefetch for external resources
    '<link rel="dns-prefetch" href="//cdn.jsdelivr.net">',
    '<link rel="dns-prefetch" href="//unpkg.com">',
    
    // Preload critical assets
    '<link rel="preload" href="/assets/icons.svg" as="image">',
    '<link rel="preload" href="/js/performance.js" as="script">'
  ];
  
  return hints.join('\n');
});
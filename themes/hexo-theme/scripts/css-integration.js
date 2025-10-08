'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Enhanced CSS integration system for Hexo developer theme
 * Integrates PostCSS build system with Hexo generation
 * Requirements: 5.1, 5.2, 4.1, 4.3
 */

/**
 * Register enhanced CSS helpers for developer theme
 */
hexo.extend.helper.register('devThemeCSS', function() {
  const v = process.env.npm_package_version || '1.0.0';
  
  // Critical CSS files that should be inlined
  const criticalFiles = [
    'css/foundation/reset.css',
    'css/foundation/variables.css',
    'css/foundation/typography.css',
    'css/critical-performance.css'
  ];
  
  // Developer theme CSS files for lazy loading
  const devThemeFiles = [
    'css/components/sidebar.css',
    'css/components/cards.css', 
    'css/components/buttons.css',
    'css/components/navigation.css',
    'css/layout/grid.css',
    'css/utilities/spacing.css',
    'css/utilities/colors.css',
    'css/animations.css'
  ];
  
  let output = '';
  
  // Inline critical CSS
  criticalFiles.forEach(file => {
    const filePath = path.join(hexo.theme_dir, 'source', 'styles', path.basename(file));
    if (fs.existsSync(filePath)) {
      const cssContent = fs.readFileSync(filePath, 'utf8');
      const minifiedCSS = minifyCSS(cssContent);
      output += `<style id="critical-${path.basename(file, '.css')}">${minifiedCSS}</style>\n`;
    }
  });
  
  // Lazy load developer theme CSS
  devThemeFiles.forEach(file => {
    const stylePath = path.join('styles', path.basename(file));
    const href = hexo.extend.helper.get('url_for').call(this, stylePath) + `?v=${v}`;
    output += `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n`;
    output += `<noscript><link rel="stylesheet" href="${href}"></noscript>\n`;
  });
  
  return output;
});

/**
 * Generate developer theme specific resource hints
 */
hexo.extend.helper.register('devResourceHints', function() {
  const hints = [
    // Preconnect to font services
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    
    // Preload critical developer assets
    '<link rel="preload" href="/fonts/JetBrainsMono-400.woff2" as="font" type="font/woff2" crossorigin>',
    '<link rel="preload" href="/fonts/Inter-400.woff2" as="font" type="font/woff2" crossorigin>',
    '<link rel="preload" href="/assets/dev-icons.svg" as="image">',
    '<link rel="preload" href="/js/dev-theme.js" as="script">',
    
    // DNS prefetch for external resources
    '<link rel="dns-prefetch" href="//cdn.jsdelivr.net">',
    '<link rel="dns-prefetch" href="//unpkg.com">'
  ];
  
  return hints.join('\n');
});

/**
 * Enhanced CSS cache with developer theme support
 */
hexo.extend.helper.register('devCSSCache', function(urls) {
  const v = process.env.npm_package_version || '1.0.0';
  const urlFor = hexo.extend.helper.get('url_for').bind(this);
  
  return (urls || [])
    .filter(url => url)
    .map(url => {
      const href = urlFor(url) + `?v=${v}`;
      return `<link rel="stylesheet" href="${href}">`;
    })
    .join('\n');
});

/**
 * Generate responsive breakpoint CSS variables
 */
hexo.extend.helper.register('responsiveBreakpoints', function() {
  return `<style id="responsive-breakpoints">
:root {
  --breakpoint-mobile: 320px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-large: 1440px;
  --sidebar-width: 300px;
  --sidebar-width-collapsed: 60px;
  --container-max-width: 1200px;
  --grid-gap: 1rem;
  --grid-gap-large: 2rem;
}

@media (max-width: 767px) {
  :root {
    --grid-gap: 0.5rem;
    --sidebar-width: 100%;
  }
}

@media (min-width: 1440px) {
  :root {
    --grid-gap: var(--grid-gap-large);
    --container-max-width: 1400px;
  }
}
</style>`;
});

/**
 * Minify CSS for better performance
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
 * CSS build integration with Hexo generation process
 */
hexo.extend.filter.register('before_generate', function() {
  console.log('🎨 Building developer theme CSS...');
  
  const { execSync } = require('child_process');
  const themePath = hexo.theme_dir;
  
  try {
    // Build CSS with PostCSS
    execSync('npm run build:css', { 
      cwd: themePath,
      stdio: 'inherit'
    });
    
    // Extract critical CSS
    execSync('npm run build:critical', {
      cwd: themePath,
      stdio: 'inherit'
    });
    
    console.log('✅ Developer theme CSS built successfully');
  } catch (error) {
    console.error('❌ CSS build failed:', error.message);
    // Don't fail the build, just warn
  }
});

/**
 * Post-build optimization
 */
hexo.extend.filter.register('after_generate', function() {
  console.log('🚀 Optimizing CSS for production...');
  
  // Additional post-build optimizations can be added here
  // Such as CSS purging, additional minification, etc.
  
  console.log('✅ CSS optimization complete');
});

module.exports = {
  minifyCSS
};
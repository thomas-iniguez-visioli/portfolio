'use strict';

const fs = require('fs');
const path = require('path');
const urlFor = hexo.extend.helper.get('url_for').bind(hexo);

hexo.extend.helper.register('page_css', (page) => {
  const { layouts } = hexo.theme.config.less;
  let files = ['styles/blog.css'];

  if (page.layout === 'post' && hexo.config.layout === 'talks') {
    files = [
      'styles/slides.css',
      `styles/slides/theme-${page.theme || 'thom4'}.css`
    ];
  }
  // photography layouts (as defined in _config.yml)
  else if (layouts[page.layout]) {
    files = files.concat(layouts[page.layout]);
  }

  return files;
});

/**
 * Enhanced CSS cache with critical CSS inlining support
 * Requirement 4.1 - Critical CSS inline, non-critical lazy loaded
 */
hexo.extend.helper.register('cssCache', (urls) => {
  const v = process.env.npm_package_version;

  return urls
    .filter(d => d)
    .map(url => {
      return `<link rel="stylesheet" href="${urlFor(url)}?v=v${v}">`;
    })
    .join("\n");
});

/**
 * Generate optimized CSS loading with critical inlining and lazy loading
 * Requirement 4.1, 4.3 - Performance optimizations
 */
hexo.extend.helper.register('optimizedCSS', function(urls) {
  const v = process.env.npm_package_version;
  
  // Critical CSS files that should be inlined
  const criticalFiles = [
    'css/critical-performance.css',
    'css/foundation/reset.css',
    'css/foundation/variables.css'
  ];
  
  // Non-critical CSS files that should be lazy loaded
  const nonCriticalFiles = [
    'css/animations.css',
    'css/cards.css',
    'css/buttons.css',
    'css/forms.css'
  ];
  
  let output = '';
  
  // Inline critical CSS
  criticalFiles.forEach(file => {
    const filePath = path.join(hexo.theme_dir, 'source', file);
    if (fs.existsSync(filePath)) {
      const cssContent = fs.readFileSync(filePath, 'utf8');
      const minifiedCSS = minifyCSS(cssContent);
      output += `<style id="critical-${file.replace(/[^a-zA-Z0-9]/g, '-')}">${minifiedCSS}</style>\n`;
    }
  });
  
  // Lazy load non-critical CSS
  nonCriticalFiles.forEach(file => {
    const href = urlFor(file) + `?v=${v}`;
    output += `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n`;
    output += `<noscript><link rel="stylesheet" href="${href}"></noscript>\n`;
  });
  
  return output;
});

/**
 * Minify CSS for better compression
 * Requirement 4.3 - CSS minification and compression
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
 * Generate font preload links with optimization
 * Requirement 4.4 - Web font optimization with preload and font-display
 */
hexo.extend.helper.register('optimizedFonts', function() {
  const fonts = [
    { family: 'Inter', weight: '400', file: 'Inter-400.woff2' },
    { family: 'Inter', weight: '500', file: 'Inter-500.woff2' },
    { family: 'Inter', weight: '600', file: 'Inter-600.woff2' },
    { family: 'JetBrains Mono', weight: '400', file: 'JetBrainsMono-400.woff2' },
    { family: 'JetBrains Mono', weight: '500', file: 'JetBrainsMono-500.woff2' }
  ];
  
  let output = '';
  
  // Preload critical fonts
  fonts.slice(0, 3).forEach(font => {
    output += `<link rel="preload" href="/fonts/${font.file}" as="font" type="font/woff2" crossorigin>\n`;
  });
  
  // Add font-face declarations with font-display: swap
  output += '<style id="font-faces">\n';
  fonts.forEach(font => {
    output += `@font-face{font-family:'${font.family}';src:url('/fonts/${font.file}') format('woff2');font-weight:${font.weight};font-style:normal;font-display:swap}\n`;
  });
  output += '</style>\n';
  
  return output;
});

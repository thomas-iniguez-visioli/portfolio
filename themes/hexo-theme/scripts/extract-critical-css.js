#!/usr/bin/env node

/**
 * Critical CSS Extraction Script
 * Extracts and optimizes critical above-the-fold CSS
 * Requirements: 4.1 - Critical CSS inline
 */

const fs = require('fs');
const path = require('path');

// Critical CSS selectors that should be inlined
const CRITICAL_SELECTORS = [
  // Essential HTML elements
  'html', 'body', 'head',
  
  // Layout essentials
  '.page-grid', '.page-main', '.main-content', '.container',
  '.layout-with-sidebar', '.critical-layout',
  
  // Header and navigation (above-the-fold)
  '.header', '.nav', '.nav-item', '.nav-link', '.site-nav',
  
  // Typography essentials (visible immediately)
  'h1', 'h2', 'h3', 'p', 'a', '.critical-typography',
  
  // Critical components
  '.hero', '.sidebar', '.dev-sidebar',
  
  // Font loading
  '@font-face', '.fonts-loading', '.fonts-loaded',
  
  // Variables and reset
  ':root', '*', '::before', '::after',
  
  // Performance markers
  '.critical-above-fold', '.fcp-optimized', '.lcp-optimized', '.cls-stable',
  
  // Grid system essentials
  '.grid', '.grid-item', '.responsive-grid'
];

// CSS files to extract critical styles from
const CSS_FILES = [
  'source/css/foundation/reset.css',
  'source/css/foundation/variables.css',
  'source/css/foundation/typography.css',
  'source/css/layout/grid.css',
  'source/css/layout/header.css',
  'source/css/components/sidebar.css',
  'source/css/critical-performance.css'
];

/**
 * Extract critical CSS rules from a CSS string
 */
function extractCriticalRules(cssContent) {
  const rules = [];
  
  // Split CSS into rules (basic parsing)
  const ruleMatches = cssContent.match(/[^{}]+\{[^{}]*\}/g) || [];
  
  ruleMatches.forEach(rule => {
    const selector = rule.split('{')[0].trim();
    
    // Check if this rule contains critical selectors
    const isCritical = CRITICAL_SELECTORS.some(criticalSelector => {
      if (criticalSelector.startsWith('@')) {
        return rule.includes(criticalSelector);
      }
      
      // Escape special regex characters
      const escapedSelector = criticalSelector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      return selector.includes(criticalSelector) || 
             selector.match(new RegExp(escapedSelector, 'i'));
    });
    
    if (isCritical) {
      rules.push(rule);
    }
  });
  
  return rules.join('\n');
}

/**
 * Minify CSS for production
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
 * Main extraction function
 */
function extractCriticalCSS() {
  console.log('🚀 Extracting critical CSS...');
  
  let criticalCSS = '';
  let processedFiles = 0;
  
  CSS_FILES.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (fs.existsSync(fullPath)) {
      console.log(`📄 Processing: ${filePath}`);
      
      const cssContent = fs.readFileSync(fullPath, 'utf8');
      const criticalRules = extractCriticalRules(cssContent);
      
      if (criticalRules) {
        criticalCSS += `\n/* Critical styles from ${filePath} */\n`;
        criticalCSS += criticalRules;
        processedFiles++;
      }
    } else {
      console.warn(`⚠️  File not found: ${filePath}`);
    }
  });
  
  if (criticalCSS) {
    // Minify the critical CSS
    const minifiedCSS = minifyCSS(criticalCSS);
    
    // Save critical CSS
    const outputPath = path.join(__dirname, '..', 'source', 'css', 'critical-inline.css');
    fs.writeFileSync(outputPath, minifiedCSS, 'utf8');
    
    console.log(`✅ Critical CSS extracted successfully!`);
    console.log(`📊 Processed ${processedFiles} files`);
    console.log(`📏 Critical CSS size: ${(minifiedCSS.length / 1024).toFixed(2)} KB`);
    console.log(`💾 Saved to: ${outputPath}`);
    
    // Also create a version for inlining in HTML
    const inlineVersion = `<style id="critical-css">${minifiedCSS}</style>`;
    const inlinePath = path.join(__dirname, '..', 'layout', '_critical-css.ejs');
    fs.writeFileSync(inlinePath, inlineVersion, 'utf8');
    
    console.log(`🔗 Inline version saved to: ${inlinePath}`);
  } else {
    console.error('❌ No critical CSS found!');
    process.exit(1);
  }
}

/**
 * Generate performance report
 */
function generatePerformanceReport() {
  console.log('\n📈 Performance Optimization Report:');
  console.log('=====================================');
  
  // Check if critical CSS exists
  const criticalPath = path.join(__dirname, '..', 'source', 'css', 'critical-inline.css');
  if (fs.existsSync(criticalPath)) {
    const criticalSize = fs.statSync(criticalPath).size;
    console.log(`✅ Critical CSS: ${(criticalSize / 1024).toFixed(2)} KB`);
    
    if (criticalSize > 14 * 1024) { // 14KB is recommended max for critical CSS
      console.warn(`⚠️  Critical CSS is larger than recommended 14KB`);
    }
  }
  
  // Check if performance JS exists
  const perfJSPath = path.join(__dirname, '..', 'source', 'js', 'performance.js');
  if (fs.existsSync(perfJSPath)) {
    const perfJSSize = fs.statSync(perfJSPath).size;
    console.log(`✅ Performance JS: ${(perfJSSize / 1024).toFixed(2)} KB`);
  }
  
  // Check PostCSS config for minification
  const postcssPath = path.join(__dirname, '..', 'postcss.config.js');
  if (fs.existsSync(postcssPath)) {
    const postcssContent = fs.readFileSync(postcssPath, 'utf8');
    if (postcssContent.includes('cssnano')) {
      console.log('✅ CSS minification: Enabled (cssnano)');
    } else {
      console.warn('⚠️  CSS minification: Not configured');
    }
  }
  
  console.log('\n🎯 Optimization Features:');
  console.log('• Critical CSS inlining');
  console.log('• Non-critical CSS lazy loading');
  console.log('• Font loading optimization (font-display: swap)');
  console.log('• Resource preloading');
  console.log('• CSS minification and compression');
  console.log('• Performance monitoring');
}

// Run the extraction
if (require.main === module) {
  extractCriticalCSS();
  generatePerformanceReport();
}

module.exports = {
  extractCriticalCSS,
  extractCriticalRules,
  minifyCSS
};
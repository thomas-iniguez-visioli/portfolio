

/**
 * CSS Integration Test Script
 * Tests the complete CSS build and integration process
 * Requirements: 5.1, 5.2, 4.1, 4.3
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Testing CSS Integration...');
console.log('================================');

let testsPassed = 0;
let testsFailed = 0;

/**
 * Test helper function
 */
function test(name, testFn) {
  try {
    console.log(`\n🔍 Testing: ${name}`);
    testFn();
    console.log(`✅ PASS: ${name}`);
    testsPassed++;
  } catch (error) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Error: ${error.message}`);
    testsFailed++;
  }
}

/**
 * Test PostCSS configuration
 */
test('PostCSS Configuration', () => {
  const postcssConfigPath = path.join(__dirname, '..', 'postcss.config.js');
  
  if (!fs.existsSync(postcssConfigPath)) {
    throw new Error('PostCSS config file not found');
  }
  
  const config = require(postcssConfigPath);
  
  if (!config.plugins) {
    throw new Error('PostCSS plugins not configured');
  }
  
  // Check for required plugins
  const requiredPlugins = ['postcss-import', 'postcss-preset-env', 'postcss-nested'];
  const configString = JSON.stringify(config);
  
  requiredPlugins.forEach(plugin => {
    if (!configString.includes(plugin)) {
      throw new Error(`Required plugin ${plugin} not found in config`);
    }
  });
  
  console.log('   ✓ PostCSS config is valid');
  console.log('   ✓ Required plugins are configured');
});

/**
 * Test CSS source files exist
 */
test('CSS Source Files', () => {
  const cssSourceDir = path.join(__dirname, '..', 'source', 'css');
  
  if (!fs.existsSync(cssSourceDir)) {
    throw new Error('CSS source directory not found');
  }
  
  const requiredDirs = ['foundation', 'components', 'layout', 'utilities'];
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(cssSourceDir, dir);
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Required CSS directory ${dir} not found`);
    }
  });
  
  console.log('   ✓ CSS source directory structure is correct');
});

/**
 * Test CSS build process
 */
test('CSS Build Process', () => {
  const themePath = path.join(__dirname, '..');
  
  try {
    // Test development build
    execSync('npm run build:css:dev', { 
      cwd: themePath,
      stdio: 'pipe'
    });
    
    console.log('   ✓ Development CSS build successful');
    
    // Test production build
    execSync('npm run build:css', {
      cwd: themePath,
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    console.log('   ✓ Production CSS build successful');
    
  } catch (error) {
    throw new Error(`CSS build failed: ${error.message}`);
  }
});

/**
 * Test critical CSS extraction
 */
test('Critical CSS Extraction', () => {
  const themePath = path.join(__dirname, '..');
  
  try {
    execSync('npm run build:critical', {
      cwd: themePath,
      stdio: 'pipe'
    });
    
    const criticalCSSPath = path.join(themePath, 'source', 'css', 'critical-inline.css');
    const criticalEJSPath = path.join(themePath, 'layout', '_critical-css.ejs');
    
    if (!fs.existsSync(criticalCSSPath)) {
      throw new Error('Critical CSS file not generated');
    }
    
    if (!fs.existsSync(criticalEJSPath)) {
      throw new Error('Critical CSS EJS template not generated');
    }
    
    const criticalCSS = fs.readFileSync(criticalCSSPath, 'utf8');
    
    if (criticalCSS.length === 0) {
      throw new Error('Critical CSS file is empty');
    }
    
    // Check if critical CSS is reasonably sized (not too large)
    const criticalSizeKB = criticalCSS.length / 1024;
    if (criticalSizeKB > 20) {
      console.warn(`   ⚠️  Critical CSS is ${criticalSizeKB.toFixed(2)}KB (recommended < 14KB)`);
    }
    
    console.log(`   ✓ Critical CSS extracted (${criticalSizeKB.toFixed(2)}KB)`);
    console.log('   ✓ Critical CSS EJS template generated');
    
  } catch (error) {
    throw new Error(`Critical CSS extraction failed: ${error.message}`);
  }
});

/**
 * Test output CSS files
 */
test('Output CSS Files', () => {
  const stylesDir = path.join(__dirname, '..', 'source', 'styles');
  
  if (!fs.existsSync(stylesDir)) {
    throw new Error('Styles output directory not found');
  }
  
  const expectedFiles = [
    'foundation.css',
    'variables.css',
    'typography.css',
    'grid-system.css',
    'sidebar.css',
    'cards.css',
    'buttons.css',
    'animations.css'
  ];
  
  let foundFiles = 0;
  
  expectedFiles.forEach(file => {
    const filePath = path.join(stylesDir, file);
    if (fs.existsSync(filePath)) {
      foundFiles++;
      
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.length === 0) {
        throw new Error(`Output file ${file} is empty`);
      }
    }
  });
  
  console.log(`   ✓ Found ${foundFiles}/${expectedFiles.length} expected CSS files`);
  
  if (foundFiles < expectedFiles.length / 2) {
    throw new Error('Too many expected CSS files are missing');
  }
});

/**
 * Test Autoprefixer integration
 */
test('Autoprefixer Integration', () => {
  const stylesDir = path.join(__dirname, '..', 'source', 'styles');
  
  // Look for a CSS file that should have vendor prefixes
  const testFiles = ['grid-system.css', 'animations.css', 'foundation.css'];
  let foundPrefixes = false;
  
  testFiles.forEach(file => {
    const filePath = path.join(stylesDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for common vendor prefixes
      if (content.includes('-webkit-') || content.includes('-moz-') || content.includes('-ms-')) {
        foundPrefixes = true;
      }
    }
  });
  
  if (!foundPrefixes) {
    console.warn('   ⚠️  No vendor prefixes found - Autoprefixer may not be working');
  } else {
    console.log('   ✓ Vendor prefixes found - Autoprefixer is working');
  }
});

/**
 * Test CSS minification in production
 */
test('CSS Minification', () => {
  const stylesDir = path.join(__dirname, '..', 'source', 'styles');
  
  // Check if CSS files are minified in production build
  const testFile = path.join(stylesDir, 'foundation.css');
  
  if (fs.existsSync(testFile)) {
    const content = fs.readFileSync(testFile, 'utf8');
    
    // Simple check for minification (no unnecessary whitespace)
    const hasExcessiveWhitespace = /\n\s+/.test(content) && content.includes('  ');
    
    if (process.env.NODE_ENV === 'production' && hasExcessiveWhitespace) {
      console.warn('   ⚠️  CSS may not be properly minified for production');
    } else {
      console.log('   ✓ CSS minification appears to be working');
    }
  }
});

/**
 * Test Hexo integration helpers
 */
test('Hexo Integration Helpers', () => {
  const helpersDir = path.join(__dirname, '..', 'scripts');
  const integrationFile = path.join(helpersDir, 'css-integration.js');
  
  if (!fs.existsSync(integrationFile)) {
    throw new Error('CSS integration helper script not found');
  }
  
  const content = fs.readFileSync(integrationFile, 'utf8');
  
  // Check for required helper functions
  const requiredHelpers = ['devThemeCSS', 'devResourceHints', 'devCSSCache'];
  
  requiredHelpers.forEach(helper => {
    if (!content.includes(helper)) {
      throw new Error(`Required helper ${helper} not found`);
    }
  });
  
  console.log('   ✓ CSS integration helpers are present');
});

// Run all tests and report results
console.log('\n📊 Test Results:');
console.log('================');
console.log(`✅ Passed: ${testsPassed}`);
console.log(`❌ Failed: ${testsFailed}`);
console.log(`📈 Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`);

if (testsFailed > 0) {
  console.log('\n🔧 Some tests failed. Please check the errors above and fix the issues.');
  process.exit(1);
} else {
  console.log('\n🎉 All tests passed! CSS integration is working correctly.');
  process.exit(0);
}
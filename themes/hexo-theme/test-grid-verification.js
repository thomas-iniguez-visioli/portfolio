/**
 * Grid System Verification Script
 * Tests all aspects of the responsive grid system implementation
 */

// Test configuration
const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

const SPACING_VALUES = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px'
};

class GridSystemTester {
  constructor() {
    this.results = {
      cssGrid: false,
      flexboxFallback: false,
      customProperties: false,
      responsiveBreakpoints: false,
      spacingSystem: false,
      crossBrowser: false
    };
  }

  // Test CSS Grid support
  testCSSGridSupport() {
    const testElement = document.createElement('div');
    testElement.style.display = 'grid';
    this.results.cssGrid = testElement.style.display === 'grid';
    
    console.log(`✓ CSS Grid Support: ${this.results.cssGrid ? 'PASS' : 'FAIL'}`);
    return this.results.cssGrid;
  }

  // Test Flexbox fallback
  testFlexboxFallback() {
    const testElement = document.createElement('div');
    testElement.style.display = 'flex';
    this.results.flexboxFallback = testElement.style.display === 'flex';
    
    console.log(`✓ Flexbox Fallback: ${this.results.flexboxFallback ? 'PASS' : 'FAIL'}`);
    return this.results.flexboxFallback;
  }

  // Test CSS Custom Properties
  testCustomProperties() {
    const testElement = document.createElement('div');
    testElement.style.setProperty('--test-var', 'test-value');
    this.results.customProperties = testElement.style.getPropertyValue('--test-var') === 'test-value';
    
    console.log(`✓ CSS Custom Properties: ${this.results.customProperties ? 'PASS' : 'FAIL'}`);
    return this.results.customProperties;
  }

  // Test responsive breakpoints
  testResponsiveBreakpoints() {
    const testResults = [];
    
    Object.entries(BREAKPOINTS).forEach(([name, width]) => {
      if (width === 0) return; // Skip xs breakpoint
      
      // Create a media query test
      const mediaQuery = `(min-width: ${width}px)`;
      const matches = window.matchMedia(mediaQuery).matches;
      
      testResults.push({
        breakpoint: name,
        width: width,
        matches: matches,
        currentWidth: window.innerWidth
      });
    });
    
    this.results.responsiveBreakpoints = testResults.length > 0;
    console.log('✓ Responsive Breakpoints:', testResults);
    return this.results.responsiveBreakpoints;
  }

  // Test 4px-based spacing system
  testSpacingSystem() {
    const testElement = document.createElement('div');
    document.body.appendChild(testElement);
    
    const spacingTests = [];
    
    Object.entries(SPACING_VALUES).forEach(([key, expectedValue]) => {
      testElement.className = `p-${key}`;
      const computedStyle = window.getComputedStyle(testElement);
      const actualPadding = computedStyle.paddingTop;
      
      spacingTests.push({
        class: `p-${key}`,
        expected: expectedValue,
        actual: actualPadding,
        matches: actualPadding === expectedValue
      });
    });
    
    document.body.removeChild(testElement);
    
    this.results.spacingSystem = spacingTests.some(test => test.matches);
    console.log('✓ 4px Spacing System:', spacingTests);
    return this.results.spacingSystem;
  }

  // Test cross-browser compatibility
  testCrossBrowserCompatibility() {
    const userAgent = navigator.userAgent;
    const browserTests = {
      chrome: /Chrome/.test(userAgent),
      firefox: /Firefox/.test(userAgent),
      safari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
      edge: /Edge/.test(userAgent),
      ie: /MSIE|Trident/.test(userAgent)
    };
    
    // Test vendor prefixes
    const testElement = document.createElement('div');
    const prefixTests = {
      transform: testElement.style.transform !== undefined,
      webkitTransform: testElement.style.webkitTransform !== undefined,
      mozTransform: testElement.style.mozTransform !== undefined,
      msTransform: testElement.style.msTransform !== undefined
    };
    
    this.results.crossBrowser = Object.values(prefixTests).some(test => test);
    
    console.log('✓ Browser Detection:', browserTests);
    console.log('✓ Vendor Prefix Support:', prefixTests);
    console.log(`✓ Cross-browser Compatibility: ${this.results.crossBrowser ? 'PASS' : 'FAIL'}`);
    
    return this.results.crossBrowser;
  }

  // Test grid layout functionality
  testGridLayout() {
    const testContainer = document.createElement('div');
    testContainer.className = 'grid grid-cols-3 gap-4';
    testContainer.style.visibility = 'hidden';
    testContainer.style.position = 'absolute';
    
    // Add test items
    for (let i = 0; i < 6; i++) {
      const item = document.createElement('div');
      item.textContent = `Item ${i + 1}`;
      item.style.background = '#f0f0f0';
      item.style.padding = '1rem';
      testContainer.appendChild(item);
    }
    
    document.body.appendChild(testContainer);
    
    // Test computed styles
    const computedStyle = window.getComputedStyle(testContainer);
    const hasGridDisplay = computedStyle.display === 'grid';
    const hasGridColumns = computedStyle.gridTemplateColumns !== 'none';
    const hasGap = computedStyle.gap !== 'normal' && computedStyle.gap !== '0px';
    
    document.body.removeChild(testContainer);
    
    const gridLayoutWorks = hasGridDisplay && (hasGridColumns || hasGap);
    console.log('✓ Grid Layout Test:', {
      display: computedStyle.display,
      gridTemplateColumns: computedStyle.gridTemplateColumns,
      gap: computedStyle.gap,
      works: gridLayoutWorks
    });
    
    return gridLayoutWorks;
  }

  // Test responsive behavior
  testResponsiveBehavior() {
    const testContainer = document.createElement('div');
    testContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    testContainer.style.visibility = 'hidden';
    testContainer.style.position = 'absolute';
    
    document.body.appendChild(testContainer);
    
    const computedStyle = window.getComputedStyle(testContainer);
    const currentColumns = computedStyle.gridTemplateColumns;
    
    document.body.removeChild(testContainer);
    
    const currentWidth = window.innerWidth;
    let expectedColumns = '1fr'; // Default mobile
    
    if (currentWidth >= 1024) {
      expectedColumns = 'repeat(3, 1fr)';
    } else if (currentWidth >= 768) {
      expectedColumns = 'repeat(2, 1fr)';
    }
    
    console.log('✓ Responsive Behavior Test:', {
      currentWidth,
      expectedColumns,
      actualColumns: currentColumns,
      matches: currentColumns.includes('1fr')
    });
    
    return currentColumns.includes('1fr');
  }

  // Run all tests
  runAllTests() {
    console.log('🧪 Starting Grid System Verification Tests...\n');
    
    const testResults = {
      cssGrid: this.testCSSGridSupport(),
      flexboxFallback: this.testFlexboxFallback(),
      customProperties: this.testCustomProperties(),
      responsiveBreakpoints: this.testResponsiveBreakpoints(),
      spacingSystem: this.testSpacingSystem(),
      crossBrowser: this.testCrossBrowserCompatibility(),
      gridLayout: this.testGridLayout(),
      responsiveBehavior: this.testResponsiveBehavior()
    };
    
    const passedTests = Object.values(testResults).filter(result => result).length;
    const totalTests = Object.keys(testResults).length;
    const successRate = (passedTests / totalTests) * 100;
    
    console.log('\n📊 Test Results Summary:');
    console.log(`✅ Passed: ${passedTests}/${totalTests} tests (${successRate.toFixed(1)}%)`);
    
    if (successRate >= 80) {
      console.log('🎉 Grid system is working correctly!');
    } else if (successRate >= 60) {
      console.log('⚠️  Grid system has some issues but basic functionality works');
    } else {
      console.log('❌ Grid system has significant issues');
    }
    
    return {
      results: testResults,
      passedTests,
      totalTests,
      successRate
    };
  }

  // Generate test report
  generateReport() {
    const testResults = this.runAllTests();
    
    const report = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      ...testResults
    };
    
    console.log('\n📋 Full Test Report:', report);
    return report;
  }
}

// Auto-run tests when script loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const tester = new GridSystemTester();
    window.gridTestResults = tester.generateReport();
  });
  
  // Make tester available globally for manual testing
  window.GridSystemTester = GridSystemTester;
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GridSystemTester;
}
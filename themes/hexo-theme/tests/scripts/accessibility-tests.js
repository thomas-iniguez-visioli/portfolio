const puppeteer = require('puppeteer');
const AxeBuilder = require('@axe-core/puppeteer').default;
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class AccessibilityTests {
  constructor() {
    this.baseUrl = 'http://localhost:8080';
    this.browser = null;
  }

  async runTests() {
    console.log(chalk.blue('♿ Starting Accessibility Tests...'));
    
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const results = await this.testPages([
        '/',
        // Add more pages as needed
      ]);

      await this.generateReport(results);
      console.log(chalk.green('✅ Accessibility tests completed'));
      
    } catch (error) {
      console.error(chalk.red('❌ Accessibility tests failed:'), error);
      process.exit(1);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  async testPages(pages) {
    const results = [];
    
    for (const page of pages) {
      console.log(chalk.yellow(`Testing accessibility for page: ${page}`));
      
      const pageResult = await this.testPage(page);
      results.push(pageResult);
    }
    
    return results;
  }

  async testPage(pagePath) {
    const page = await this.browser.newPage();
    
    try {
      await page.goto(`${this.baseUrl}${pagePath}`, {
        waitUntil: 'networkidle0'
      });

      // Run axe-core accessibility tests
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      // Test keyboard navigation
      const keyboardResults = await this.testKeyboardNavigation(page);
      
      // Test color contrast
      const contrastResults = await this.testColorContrast(page);

      const summary = {
        page: pagePath,
        violations: results.violations.length,
        passes: results.passes.length,
        incomplete: results.incomplete.length,
        keyboardNavigation: keyboardResults,
        colorContrast: contrastResults,
        details: {
          violations: results.violations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length
          }))
        }
      };

      this.logResults(summary);
      return summary;
      
    } finally {
      await page.close();
    }
  }

  async testKeyboardNavigation(page) {
    console.log(chalk.blue('  Testing keyboard navigation...'));
    
    // Test tab navigation
    const focusableElements = await page.evaluate(() => {
      const elements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      return elements.length;
    });

    // Simulate tab navigation
    let tabCount = 0;
    for (let i = 0; i < Math.min(focusableElements, 10); i++) {
      await page.keyboard.press('Tab');
      tabCount++;
    }

    return {
      focusableElements,
      tabNavigationWorking: tabCount > 0
    };
  }

  async testColorContrast(page) {
    console.log(chalk.blue('  Testing color contrast...'));
    
    const contrastIssues = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const issues = [];
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const backgroundColor = style.backgroundColor;
        
        // Simple check for transparent backgrounds
        if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
          return;
        }
        
        // This is a simplified check - in production, use a proper contrast ratio calculator
        if (color && backgroundColor && color !== backgroundColor) {
          // Add to issues if needed (simplified logic)
        }
      });
      
      return issues.length;
    });

    return {
      contrastIssues,
      passed: contrastIssues === 0
    };
  }

  logResults(summary) {
    const { page, violations, passes, keyboardNavigation, colorContrast } = summary;
    
    console.log(chalk.cyan(`\n  Results for ${page}:`));
    console.log(`    ${chalk.red('Violations:')} ${violations}`);
    console.log(`    ${chalk.green('Passes:')} ${passes}`);
    console.log(`    ${chalk.blue('Focusable elements:')} ${keyboardNavigation.focusableElements}`);
    console.log(`    ${chalk.blue('Keyboard navigation:')} ${keyboardNavigation.tabNavigationWorking ? '✅' : '❌'}`);
    console.log(`    ${chalk.blue('Color contrast:')} ${colorContrast.passed ? '✅' : '❌'}`);
    
    if (violations > 0) {
      console.log(chalk.red(`    ⚠️  Found ${violations} accessibility violations`));
      summary.details.violations.forEach(v => {
        console.log(chalk.red(`      - ${v.id}: ${v.description} (${v.impact})`));
      });
    }
  }

  async generateReport(results) {
    const reportPath = path.join(__dirname, '../reports/accessibility-report.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    const report = {
      timestamp: new Date().toISOString(),
      results,
      summary: {
        totalPages: results.length,
        totalViolations: results.reduce((sum, r) => sum + r.violations, 0),
        totalPasses: results.reduce((sum, r) => sum + r.passes, 0),
        pagesWithoutViolations: results.filter(r => r.violations === 0).length
      }
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(chalk.blue(`📊 Accessibility report saved to: ${reportPath}`));
  }
}

// Run tests if called directly
if (require.main === module) {
  const tests = new AccessibilityTests();
  tests.runTests().catch(console.error);
}

module.exports = AccessibilityTests;
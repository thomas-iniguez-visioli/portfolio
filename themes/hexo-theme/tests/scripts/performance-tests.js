const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class PerformanceTests {
  constructor() {
    this.baseUrl = 'http://localhost:8080';
    this.thresholds = {
      'first-contentful-paint': 1500,
      'largest-contentful-paint': 2500,
      'cumulative-layout-shift': 0.1,
      'first-input-delay': 100,
      'speed-index': 3000,
      'total-blocking-time': 200
    };
  }

  async runTests() {
    console.log(chalk.blue('🚀 Starting Performance Tests...'));
    
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance'],
      port: chrome.port,
    };

    try {
      const results = await this.testPages([
        '/',
        // Add more pages as needed
      ]);

      await this.generateReport(results);
      console.log(chalk.green('✅ Performance tests completed'));
      
    } catch (error) {
      console.error(chalk.red('❌ Performance tests failed:'), error);
      process.exit(1);
    } finally {
      await chrome.kill();
    }
  }

  async testPages(pages) {
    const results = [];
    
    for (const page of pages) {
      console.log(chalk.yellow(`Testing page: ${page}`));
      
      const runnerResult = await lighthouse(`${this.baseUrl}${page}`, {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance'],
      });

      const metrics = this.extractMetrics(runnerResult.lhr);
      const passed = this.validateMetrics(metrics);
      
      results.push({
        page,
        metrics,
        passed,
        score: runnerResult.lhr.categories.performance.score * 100
      });
    }
    
    return results;
  }

  extractMetrics(lhr) {
    const audits = lhr.audits;
    return {
      'first-contentful-paint': audits['first-contentful-paint'].numericValue,
      'largest-contentful-paint': audits['largest-contentful-paint'].numericValue,
      'cumulative-layout-shift': audits['cumulative-layout-shift'].numericValue,
      'speed-index': audits['speed-index'].numericValue,
      'total-blocking-time': audits['total-blocking-time'].numericValue,
    };
  }

  validateMetrics(metrics) {
    const results = {};
    
    for (const [metric, value] of Object.entries(metrics)) {
      const threshold = this.thresholds[metric];
      results[metric] = value <= threshold;
      
      const status = results[metric] ? chalk.green('✅') : chalk.red('❌');
      console.log(`  ${status} ${metric}: ${value}ms (threshold: ${threshold}ms)`);
    }
    
    return results;
  }

  async generateReport(results) {
    const reportPath = path.join(__dirname, '../reports/performance-report.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    const report = {
      timestamp: new Date().toISOString(),
      results,
      summary: {
        totalPages: results.length,
        passedPages: results.filter(r => Object.values(r.passed).every(Boolean)).length,
        averageScore: results.reduce((sum, r) => sum + r.score, 0) / results.length
      }
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(chalk.blue(`📊 Performance report saved to: ${reportPath}`));
  }
}

// Run tests if called directly
if (require.main === module) {
  const tests = new PerformanceTests();
  tests.runTests().catch(console.error);
}

module.exports = PerformanceTests;
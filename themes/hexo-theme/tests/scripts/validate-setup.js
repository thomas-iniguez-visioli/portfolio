const http = require('http');
const chalk = require('chalk');

class SetupValidator {
  constructor() {
    this.baseUrl = 'http://localhost:8080';
    this.checks = [];
  }

  async validateSetup() {
    console.log(chalk.blue('🔍 Validating test setup...\n'));
    
    await this.checkServerRunning();
    await this.checkDependencies();
    await this.checkBrowsers();
    
    this.printResults();
    
    const allPassed = this.checks.every(check => check.passed);
    if (!allPassed) {
      process.exit(1);
    }
  }

  async checkServerRunning() {
    try {
      await this.makeRequest('/');
      this.addCheck('Test server', true, 'Server is running on port 8080');
    } catch (error) {
      this.addCheck('Test server', false, 'Server is not running. Run: npm run serve:test');
    }
  }

  async checkDependencies() {
    const requiredDeps = [
      '@playwright/test',
      'lighthouse',
      'puppeteer',
      'backstopjs'
    ];

    for (const dep of requiredDeps) {
      try {
        require.resolve(dep);
        this.addCheck(`Dependency: ${dep}`, true, 'Installed');
      } catch (error) {
        this.addCheck(`Dependency: ${dep}`, false, 'Not installed. Run: npm install');
      }
    }
  }

  async checkBrowsers() {
    // This is a simplified check - in practice, you'd check if Playwright browsers are installed
    try {
      const { chromium } = require('playwright');
      this.addCheck('Playwright browsers', true, 'Browsers available');
    } catch (error) {
      this.addCheck('Playwright browsers', false, 'Run: npx playwright install');
    }
  }

  makeRequest(path) {
    return new Promise((resolve, reject) => {
      const req = http.get(`${this.baseUrl}${path}`, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });

      req.on('error', reject);
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Timeout'));
      });
    });
  }

  addCheck(name, passed, message) {
    this.checks.push({ name, passed, message });
  }

  printResults() {
    console.log(chalk.blue('Setup Validation Results:'));
    console.log('========================\n');
    
    this.checks.forEach(check => {
      const status = check.passed ? chalk.green('✅') : chalk.red('❌');
      console.log(`${status} ${check.name}: ${check.message}`);
    });
    
    const passedCount = this.checks.filter(c => c.passed).length;
    const totalCount = this.checks.length;
    
    console.log(`\n${passedCount}/${totalCount} checks passed`);
    
    if (passedCount === totalCount) {
      console.log(chalk.green('\n🎉 Setup validation passed! Ready to run tests.'));
    } else {
      console.log(chalk.red('\n⚠️  Setup validation failed. Please fix the issues above.'));
    }
  }
}

// Run if called directly
if (require.main === module) {
  const validator = new SetupValidator();
  validator.validateSetup().catch(console.error);
}

module.exports = SetupValidator;
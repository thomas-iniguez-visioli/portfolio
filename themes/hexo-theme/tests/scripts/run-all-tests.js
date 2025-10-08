const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');

class TestRunner {
  constructor() {
    this.testResults = {
      visual: null,
      performance: null,
      accessibility: null,
      regression: null
    };
  }

  async runAllTests() {
    console.log(chalk.blue.bold('🧪 Starting Cross-Browser Test Suite\n'));
    
    try {
      // Run visual tests with Playwright
      console.log(chalk.yellow('1. Running Visual Tests...'));
      await this.runCommand('npm', ['run', 'test:visual']);
      this.testResults.visual = 'passed';
      
      // Run performance tests
      console.log(chalk.yellow('\n2. Running Performance Tests...'));
      await this.runCommand('npm', ['run', 'test:performance']);
      this.testResults.performance = 'passed';
      
      // Run accessibility tests
      console.log(chalk.yellow('\n3. Running Accessibility Tests...'));
      await this.runCommand('npm', ['run', 'test:accessibility']);
      this.testResults.accessibility = 'passed';
      
      // Run regression tests with BackstopJS
      console.log(chalk.yellow('\n4. Running Regression Tests...'));
      await this.runCommand('npm', ['run', 'test:regression']);
      this.testResults.regression = 'passed';
      
      this.printSummary();
      
    } catch (error) {
      console.error(chalk.red('\n❌ Test suite failed:'), error.message);
      this.printSummary();
      process.exit(1);
    }
  }

  runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true,
        ...options
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  printSummary() {
    console.log(chalk.blue.bold('\n📊 Test Results Summary:'));
    console.log('================================');
    
    Object.entries(this.testResults).forEach(([testType, result]) => {
      const status = result === 'passed' ? chalk.green('✅ PASSED') : 
                    result === 'failed' ? chalk.red('❌ FAILED') : 
                    chalk.gray('⏸️  SKIPPED');
      
      console.log(`${testType.padEnd(15)}: ${status}`);
    });
    
    const allPassed = Object.values(this.testResults).every(result => result === 'passed');
    
    if (allPassed) {
      console.log(chalk.green.bold('\n🎉 All tests passed! Theme is ready for cross-browser deployment.'));
    } else {
      console.log(chalk.red.bold('\n⚠️  Some tests failed. Please review the results above.'));
    }
  }
}

// Run if called directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.runAllTests().catch(console.error);
}

module.exports = TestRunner;
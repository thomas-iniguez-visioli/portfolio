#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class TestInstaller {
  async install() {
    console.log(chalk.blue.bold('🚀 Installing Cross-Browser Test Suite\n'));
    
    try {
      // Install npm dependencies
      console.log(chalk.yellow('1. Installing npm dependencies...'));
      await this.runCommand('npm', ['install']);
      
      // Install Playwright browsers
      console.log(chalk.yellow('\n2. Installing Playwright browsers...'));
      await this.runCommand('npx', ['playwright', 'install', '--with-deps']);
      
      // Create reports directory
      console.log(chalk.yellow('\n3. Creating reports directory...'));
      const reportsDir = path.join(__dirname, 'reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }
      
      // Copy environment file
      console.log(chalk.yellow('\n4. Setting up environment...'));
      const envExample = path.join(__dirname, '.env.example');
      const envFile = path.join(__dirname, '.env');
      if (!fs.existsSync(envFile) && fs.existsSync(envExample)) {
        fs.copyFileSync(envExample, envFile);
      }
      
      console.log(chalk.green.bold('\n✅ Installation completed successfully!'));
      console.log(chalk.blue('\nNext steps:'));
      console.log('1. Start your Hexo server: npm run serve:test');
      console.log('2. Run tests: npm test');
      console.log('3. View reports in the reports/ directory');
      
    } catch (error) {
      console.error(chalk.red('\n❌ Installation failed:'), error.message);
      process.exit(1);
    }
  }

  runCommand(command, args) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true
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
}

// Run if called directly
if (require.main === module) {
  const installer = new TestInstaller();
  installer.install().catch(console.error);
}

module.exports = TestInstaller;
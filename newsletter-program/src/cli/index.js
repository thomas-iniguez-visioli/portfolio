#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .name('newsletter')
  .description('Newsletter management system')
  .version('1.0.0');

program
  .command('subscribers', 'Manage subscribers', { executableFile: 'subscriber-cli.js' })
  .command('send', 'Send newsletters', { executableFile: 'newsletter-cli.js' })
  .command('rss', 'Manage RSS feeds', { executableFile: 'rss-cli.js' })
  .command('analytics', 'View analytics', { executableFile: 'analytics-cli.js' })
  .command('export', 'Export data', { executableFile: 'export-cli.js' });

program.parse(process.argv);

#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const { SubscriberFileManager } = require('../core/subscriber-file-manager.js');

const program = new Command();

// Initialize subscriber manager
const subscriberManager = new SubscriberFileManager();

program
  .name('subscriber-cli')
  .description('CLI for managing encrypted subscriber files')
  .version('1.0.0');

// Add subscriber command
program
  .command('add')
  .description('Add a new subscriber')
  .requiredOption('-e, --email <email>', 'subscriber email address')
  .option('-s, --source <source>', 'subscription source', 'cli')
  .option('-f, --frequency <frequency>', 'email frequency (weekly/monthly)', 'weekly')
  .option('-t, --topics <topics>', 'comma-separated list of topics')
  .action(async (options) => {
    try {
      const subscriberData = {
        email: options.email,
        source: options.source,
        frequency: options.frequency,
        topics: options.topics ? options.topics.split(',').map(t => t.trim()) : []
      };
      
      const subscriber = await subscriberManager.addSubscriber(subscriberData);
      console.log('✅ Subscriber added successfully:');
      console.log(`   ID: ${subscriber.id}`);
      console.log(`   Email: ${subscriber.email}`);
      console.log(`   Status: ${subscriber.status}`);
      console.log(`   Subscribed: ${subscriber.subscribedAt}`);
      
    } catch (error) {
      console.error('❌ Error adding subscriber:', error.message);
      process.exit(1);
    }
  });

// List subscribers command
program
  .command('list')
  .description('List all subscribers')
  .option('-s, --status <status>', 'filter by status (active/unsubscribed/bounced)')
  .option('--source <source>', 'filter by source')
  .option('-f, --frequency <frequency>', 'filter by frequency')
  .option('--format <format>', 'output format (table/json)', 'table')
  .action(async (options) => {
    try {
      const filter = {};
      if (options.status) filter.status = options.status;
      if (options.source) filter.source = options.source;
      if (options.frequency) filter.frequency = options.frequency;
      
      const subscribers = await subscriberManager.getSubscribers(filter);
      
      if (options.format === 'json') {
        console.log(JSON.stringify(subscribers, null, 2));
      } else {
        console.log(`\n📧 Subscribers (${subscribers.length} found):`);
        console.log('─'.repeat(80));
        
        if (subscribers.length === 0) {
          console.log('No subscribers found matching the criteria.');
        } else {
          subscribers.forEach(sub => {
            console.log(`ID: ${sub.id}`);
            console.log(`Email: ${sub.email}`);
            console.log(`Status: ${sub.status}`);
            console.log(`Source: ${sub.source}`);
            console.log(`Frequency: ${sub.preferences.frequency}`);
            console.log(`Subscribed: ${sub.subscribedAt}`);
            if (sub.preferences.topics.length > 0) {
              console.log(`Topics: ${sub.preferences.topics.join(', ')}`);
            }
            console.log('─'.repeat(40));
          });
        }
      }
      
    } catch (error) {
      console.error('❌ Error listing subscribers:', error.message);
      process.exit(1);
    }
  });

// Update subscriber command
program
  .command('update')
  .description('Update a subscriber')
  .requiredOption('-i, --id <id>', 'subscriber ID')
  .option('-s, --status <status>', 'new status (active/unsubscribed/bounced)')
  .option('-f, --frequency <frequency>', 'new frequency (weekly/monthly)')
  .option('-t, --topics <topics>', 'comma-separated list of topics')
  .action(async (options) => {
    try {
      const updates = {};
      
      if (options.status) updates.status = options.status;
      if (options.frequency) {
        updates.preferences = { frequency: options.frequency };
      }
      if (options.topics) {
        updates.preferences = updates.preferences || {};
        updates.preferences.topics = options.topics.split(',').map(t => t.trim());
      }
      
      const subscriber = await subscriberManager.updateSubscriber(options.id, updates);
      console.log('✅ Subscriber updated successfully:');
      console.log(`   ID: ${subscriber.id}`);
      console.log(`   Email: ${subscriber.email}`);
      console.log(`   Status: ${subscriber.status}`);
      console.log(`   Frequency: ${subscriber.preferences.frequency}`);
      
    } catch (error) {
      console.error('❌ Error updating subscriber:', error.message);
      process.exit(1);
    }
  });

// Remove subscriber command
program
  .command('remove')
  .description('Remove a subscriber')
  .requiredOption('-i, --id <id>', 'subscriber ID')
  .option('--confirm', 'confirm deletion without prompt')
  .action(async (options) => {
    try {
      if (!options.confirm) {
        const subscriber = await subscriberManager.getSubscriber(options.id);
        if (!subscriber) {
          console.error('❌ Subscriber not found');
          process.exit(1);
        }
        
        console.log(`⚠️  About to remove subscriber: ${subscriber.email}`);
        console.log('Use --confirm flag to proceed with deletion');
        process.exit(1);
      }
      
      const removedSubscriber = await subscriberManager.removeSubscriber(options.id);
      console.log('✅ Subscriber removed successfully:');
      console.log(`   Email: ${removedSubscriber.email}`);
      
    } catch (error) {
      console.error('❌ Error removing subscriber:', error.message);
      process.exit(1);
    }
  });

// Stats command
program
  .command('stats')
  .description('Show subscriber statistics')
  .action(async () => {
    try {
      const stats = await subscriberManager.getStats();
      
      console.log('\n📊 Subscriber Statistics:');
      console.log('─'.repeat(40));
      console.log(`Total Subscribers: ${stats.total}`);
      console.log(`Active: ${stats.active}`);
      console.log(`Unsubscribed: ${stats.unsubscribed}`);
      console.log(`Bounced: ${stats.bounced}`);
      console.log(`Recent (7 days): ${stats.recentSubscriptions}`);
      
      console.log('\n📈 By Source:');
      Object.entries(stats.bySource).forEach(([source, count]) => {
        console.log(`  ${source}: ${count}`);
      });
      
      console.log('\n📅 By Frequency:');
      Object.entries(stats.byFrequency).forEach(([freq, count]) => {
        console.log(`  ${freq}: ${count}`);
      });
      
    } catch (error) {
      console.error('❌ Error getting statistics:', error.message);
      process.exit(1);
    }
  });

// Export command
program
  .command('export')
  .description('Export subscribers to file')
  .option('-f, --format <format>', 'export format (json/csv/txt)', 'json')
  .option('-o, --output <file>', 'output file path')
  .option('-s, --status <status>', 'filter by status')
  .option('--exclude-metadata', 'exclude metadata from export')
  .action(async (options) => {
    try {
      const exportOptions = {};
      if (options.status) exportOptions.status = options.status;
      if (options.excludeMetadata) exportOptions.excludeMetadata = true;
      
      const result = await subscriberManager.exportSubscribers(options.format, exportOptions);
      
      const outputPath = options.output || result.filename;
      fs.writeFileSync(outputPath, result.data);
      
      console.log(`✅ Exported subscribers to: ${outputPath}`);
      console.log(`   Format: ${result.format}`);
      
    } catch (error) {
      console.error('❌ Error exporting subscribers:', error.message);
      process.exit(1);
    }
  });

// Import command
program
  .command('import')
  .description('Import subscribers from file')
  .requiredOption('-f, --file <file>', 'input file path')
  .option('--format <format>', 'import format (json/csv/txt)', 'json')
  .option('--allow-duplicates', 'allow duplicate email addresses')
  .action(async (options) => {
    try {
      if (!fs.existsSync(options.file)) {
        console.error('❌ Input file not found:', options.file);
        process.exit(1);
      }
      
      const data = fs.readFileSync(options.file, 'utf8');
      const importOptions = {
        allowDuplicates: options.allowDuplicates
      };
      
      const result = await subscriberManager.importSubscribers(data, options.format, importOptions);
      
      console.log('✅ Import completed:');
      console.log(`   Total processed: ${result.total}`);
      console.log(`   Successfully imported: ${result.imported}`);
      console.log(`   Skipped (duplicates): ${result.skipped}`);
      
      if (result.errors.length > 0) {
        console.log(`   Errors: ${result.errors.length}`);
        result.errors.forEach(error => console.log(`     - ${error}`));
      }
      
    } catch (error) {
      console.error('❌ Error importing subscribers:', error.message);
      process.exit(1);
    }
  });

// Validate command
program
  .command('validate')
  .description('Validate subscriber file integrity')
  .action(async () => {
    try {
      const validation = await subscriberManager.validateFile();
      
      console.log('\n🔍 File Validation Results:');
      console.log('─'.repeat(40));
      console.log(`Status: ${validation.isValid ? '✅ Valid' : '❌ Invalid'}`);
      
      if (validation.stats) {
        console.log(`Total Subscribers: ${validation.stats.totalSubscribers}`);
        console.log(`Key Version: ${validation.stats.keyVersion}`);
        console.log(`Last Modified: ${validation.stats.lastModified}`);
      }
      
      if (validation.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        validation.warnings.forEach(warning => console.log(`  - ${warning}`));
      }
      
      if (validation.errors.length > 0) {
        console.log('\n❌ Errors:');
        validation.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (!validation.isValid) {
        process.exit(1);
      }
      
    } catch (error) {
      console.error('❌ Error validating file:', error.message);
      process.exit(1);
    }
  });

// Optimize command
program
  .command('optimize')
  .description('Optimize subscriber file (remove duplicates, etc.)')
  .option('--confirm', 'confirm optimization without prompt')
  .action(async (options) => {
    try {
      if (!options.confirm) {
        console.log('⚠️  This will remove duplicate subscribers and optimize the file.');
        console.log('Use --confirm flag to proceed with optimization');
        process.exit(1);
      }
      
      const result = await subscriberManager.optimizeFile();
      
      console.log('✅ File optimization completed:');
      console.log(`   Original count: ${result.originalCount}`);
      console.log(`   Optimized count: ${result.optimizedCount}`);
      console.log(`   Duplicates removed: ${result.duplicatesRemoved}`);
      console.log(`   Optimized at: ${result.optimizedAt}`);
      
    } catch (error) {
      console.error('❌ Error optimizing file:', error.message);
      process.exit(1);
    }
  });

// Key rotation command
program
  .command('rotate-key')
  .description('Rotate encryption key and re-encrypt all data')
  .option('--confirm', 'confirm key rotation without prompt')
  .action(async (options) => {
    try {
      if (!options.confirm) {
        console.log('⚠️  This will generate a new encryption key and re-encrypt all subscriber data.');
        console.log('Use --confirm flag to proceed with key rotation');
        process.exit(1);
      }
      
      const result = await subscriberManager.migrateToNewKey();
      
      console.log('✅ Key rotation completed:');
      console.log(`   New key version: ${result.newKeyVersion}`);
      console.log(`   Subscribers migrated: ${result.subscriberCount}`);
      console.log(`   Migrated at: ${result.migratedAt}`);
      
    } catch (error) {
      console.error('❌ Error rotating key:', error.message);
      process.exit(1);
    }
  });

program.parse();


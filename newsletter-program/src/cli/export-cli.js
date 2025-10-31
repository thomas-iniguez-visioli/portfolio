#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs').promises;
const { SecureExportManager } = require('../core/secure-export');

const program = new Command();
const exportManager = new SecureExportManager();

program
  .name('export')
  .description('Secure data export and GDPR compliance CLI')
  .version('1.0.0');

// Create full export
program
  .command('create')
  .description('Create secure export of all data')
  .option('--no-subscribers', 'Exclude subscriber data')
  .option('--no-analytics', 'Exclude analytics data')
  .option('--anonymize', 'Anonymize sensitive data')
  .option('-o, --output <dir>', 'Output directory')
  .action(async (options) => {
    try {
      const exportOptions = {
        includeSubscribers: options.subscribers,
        includeAnalytics: options.analytics,
        anonymizeData: options.anonymize
      };
      
      if (options.output) {
        exportOptions.exportDir = options.output;
      }
      
      console.log('🔄 Creating secure export...');
      
      const result = await exportManager.createSecureExport(exportOptions);
      
      console.log('✅ Secure export created successfully:');
      console.log(`   Export ID: ${result.exportId}`);
      console.log(`   File: ${result.filename}`);
      console.log(`   Size: ${(result.size / 1024).toFixed(2)} KB`);
      console.log(`   Subscribers: ${result.includeSubscribers ? '✓' : '✗'}`);
      console.log(`   Analytics: ${result.includeAnalytics ? '✓' : '✗'}`);
      console.log(`   Anonymized: ${result.anonymized ? '✓' : '✗'}`);
      console.log(`   Path: ${result.filepath}`);
      
    } catch (error) {
      console.error(`❌ Error creating export: ${error.message}`);
      process.exit(1);
    }
  });

// GDPR export for specific subscriber
program
  .command('gdpr')
  .description('Create GDPR-compliant data export for subscriber')
  .requiredOption('-e, --email <email>', 'Subscriber email address')
  .option('-o, --output <dir>', 'Output directory')
  .action(async (options) => {
    try {
      console.log(`🔄 Creating GDPR export for ${options.email}...`);
      
      const exportOptions = {};
      if (options.output) {
        exportOptions.exportDir = options.output;
      }
      
      const exportManagerWithDir = options.output ? 
        new SecureExportManager(exportOptions) : exportManager;
      
      const result = await exportManagerWithDir.createGDPRExport(options.email);
      
      console.log('✅ GDPR export created successfully:');
      console.log(`   Subscriber ID: ${result.subscriberId}`);
      console.log(`   Email: ${result.email}`);
      console.log(`   File: ${result.filename}`);
      console.log(`   Created: ${result.createdAt}`);
      console.log(`   Path: ${result.filepath}`);
      
      console.log('\n📋 Export includes:');
      console.log('   • All subscriber data');
      console.log('   • Subscription history');
      console.log('   • Email events and interactions');
      console.log('   • Data processing purposes');
      console.log('   • Legal basis and retention policy');
      
    } catch (error) {
      console.error(`❌ Error creating GDPR export: ${error.message}`);
      process.exit(1);
    }
  });

// Anonymized dataset for research
program
  .command('anonymize')
  .description('Create anonymized dataset for research/analysis')
  .option('-o, --output <dir>', 'Output directory')
  .action(async (options) => {
    try {
      console.log('🔄 Creating anonymized dataset...');
      
      const exportOptions = {};
      if (options.output) {
        exportOptions.exportDir = options.output;
      }
      
      const exportManagerWithDir = options.output ? 
        new SecureExportManager(exportOptions) : exportManager;
      
      const result = await exportManagerWithDir.createAnonymizedDataset();
      
      console.log('✅ Anonymized dataset created successfully:');
      console.log(`   File: ${result.filename}`);
      console.log(`   Records: ${result.totalRecords}`);
      console.log(`   Created: ${result.createdAt}`);
      console.log(`   Path: ${result.filepath}`);
      
      console.log('\n🔒 Anonymization details:');
      console.log('   • Email addresses removed');
      console.log('   • IDs hashed with SHA256');
      console.log('   • Personal metadata stripped');
      console.log('   • Only aggregate patterns preserved');
      
    } catch (error) {
      console.error(`❌ Error creating anonymized dataset: ${error.message}`);
      process.exit(1);
    }
  });

// List exports
program
  .command('list')
  .description('List all available exports')
  .option('--format <format>', 'Output format (table/json)', 'table')
  .action(async (options) => {
    try {
      const exports = await exportManager.listExports();
      
      if (options.format === 'json') {
        console.log(JSON.stringify(exports, null, 2));
      } else {
        console.log('\n📁 Available Exports:\n');
        
        if (exports.length === 0) {
          console.log('No exports found.');
        } else {
          console.log('Type                    | File                           | Created    | Size    | Anon');
          console.log('─'.repeat(85));
          
          exports.forEach(exp => {
            const type = exp.type.substring(0, 22).padEnd(22);
            const filename = exp.filename.substring(0, 30).padEnd(30);
            const created = new Date(exp.createdAt).toLocaleDateString().padEnd(10);
            const size = `${(exp.size / 1024).toFixed(1)}KB`.padStart(7);
            const anon = exp.anonymized ? '✓' : '✗';
            
            console.log(`${type} | ${filename} | ${created} | ${size} | ${anon}`);
          });
        }
      }
    } catch (error) {
      console.error(`❌ Error listing exports: ${error.message}`);
      process.exit(1);
    }
  });

// Clean old exports
program
  .command('clean')
  .description('Clean old export files')
  .option('-d, --days <days>', 'Days to keep exports', '30')
  .option('--confirm', 'Confirm cleanup without prompt')
  .action(async (options) => {
    try {
      if (!options.confirm) {
        console.log(`⚠️  This will remove export files older than ${options.days} days.`);
        console.log('Use --confirm flag to proceed with cleanup');
        process.exit(1);
      }
      
      const result = await exportManager.cleanOldExports(parseInt(options.days));
      
      console.log('✅ Export cleanup completed:');
      console.log(`   Files removed: ${result.removedCount}`);
      console.log(`   Cleaned at: ${result.cleanedAt}`);
      
    } catch (error) {
      console.error(`❌ Error cleaning exports: ${error.message}`);
      process.exit(1);
    }
  });

// Verify export integrity
program
  .command('verify')
  .description('Verify export file integrity')
  .requiredOption('-f, --file <file>', 'Export file to verify')
  .action(async (options) => {
    try {
      console.log(`🔍 Verifying export file: ${options.file}`);
      
      const content = await fs.readFile(options.file, 'utf-8');
      const data = JSON.parse(content);
      
      const checks = {
        hasValidStructure: false,
        hasTimestamp: false,
        hasValidData: false,
        isAnonymized: false,
        dataTypes: []
      };
      
      // Check structure
      if (data.createdAt && (data.exportType || data.datasetType)) {
        checks.hasValidStructure = true;
      }
      
      // Check timestamp
      if (data.createdAt && !isNaN(new Date(data.createdAt).getTime())) {
        checks.hasTimestamp = true;
      }
      
      // Check data content
      if (data.data || data.subscribers || data.analytics) {
        checks.hasValidData = true;
        
        if (data.data?.subscribers) checks.dataTypes.push('subscribers');
        if (data.data?.analytics) checks.dataTypes.push('analytics');
        if (data.subscribers) checks.dataTypes.push('subscribers');
        if (data.analytics) checks.dataTypes.push('analytics');
      }
      
      // Check anonymization
      if (data.anonymizeData || data.datasetType === 'ANONYMIZED_RESEARCH_DATASET') {
        checks.isAnonymized = true;
      }
      
      console.log('\n✅ Verification Results:\n');
      console.log(`Structure: ${checks.hasValidStructure ? '✓' : '✗'}`);
      console.log(`Timestamp: ${checks.hasTimestamp ? '✓' : '✗'}`);
      console.log(`Data: ${checks.hasValidData ? '✓' : '✗'}`);
      console.log(`Anonymized: ${checks.isAnonymized ? '✓' : '✗'}`);
      
      if (checks.dataTypes.length > 0) {
        console.log(`Data Types: ${checks.dataTypes.join(', ')}`);
      }
      
      console.log(`\nFile Type: ${data.exportType || data.datasetType || 'Unknown'}`);
      console.log(`Created: ${data.createdAt}`);
      
      const isValid = checks.hasValidStructure && checks.hasTimestamp && checks.hasValidData;
      
      if (isValid) {
        console.log('\n🎉 Export file is valid!');
      } else {
        console.log('\n❌ Export file has issues');
        process.exit(1);
      }
      
    } catch (error) {
      console.error(`❌ Error verifying export: ${error.message}`);
      process.exit(1);
    }
  });

if (require.main === module) {
  program.parse();
}

module.exports = { program, exportManager };
#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs').promises;
const { AnalyticsManager } = require('../core/analytics-manager');

const program = new Command();
const analytics = new AnalyticsManager();

program
  .name('analytics')
  .description('Newsletter analytics and reporting CLI')
  .version('1.0.0');

// Growth report command
program
  .command('growth')
  .description('Generate subscriber growth report')
  .option('-d, --days <days>', 'Number of days to analyze', '30')
  .option('--format <format>', 'Output format (table/json)', 'table')
  .option('-o, --output <file>', 'Save report to file')
  .action(async (options) => {
    try {
      const days = parseInt(options.days);
      const report = await analytics.generateGrowthReport(days);
      
      if (options.format === 'json') {
        const output = JSON.stringify(report, null, 2);
        
        if (options.output) {
          await fs.writeFile(options.output, output);
          console.log(`✅ Growth report saved to: ${options.output}`);
        } else {
          console.log(output);
        }
      } else {
        // Table format
        console.log(`\n📈 Subscriber Growth Report (${days} days)\n`);
        console.log('─'.repeat(80));
        
        console.log(`Period: ${new Date(report.period.startDate).toLocaleDateString()} - ${new Date(report.period.endDate).toLocaleDateString()}`);
        console.log(`Total Subscriptions: ${report.summary.totalSubscriptions}`);
        console.log(`Total Unsubscriptions: ${report.summary.totalUnsubscriptions}`);
        console.log(`Net Growth: ${report.summary.netGrowth}`);
        console.log(`Current Total: ${report.summary.currentTotal}`);
        
        console.log('\n📊 Daily Breakdown:\n');
        console.log('Date       | Subs | Unsubs | Net | Total');
        console.log('─'.repeat(45));
        
        report.dailyStats.slice(-10).forEach(day => {
          const date = new Date(day.date).toLocaleDateString();
          const subs = day.subscriptions.toString().padStart(4);
          const unsubs = day.unsubscriptions.toString().padStart(6);
          const net = (day.net >= 0 ? '+' + day.net : day.net).toString().padStart(4);
          const total = day.total.toString().padStart(5);
          
          console.log(`${date} | ${subs} | ${unsubs} | ${net} | ${total}`);
        });
        
        if (options.output) {
          await fs.writeFile(options.output, JSON.stringify(report, null, 2));
          console.log(`\n✅ Detailed report saved to: ${options.output}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error generating growth report: ${error.message}`);
      process.exit(1);
    }
  });

// Newsletter performance report
program
  .command('newsletters')
  .description('Generate newsletter performance report')
  .option('-d, --days <days>', 'Number of days to analyze', '30')
  .option('--format <format>', 'Output format (table/json)', 'table')
  .option('-o, --output <file>', 'Save report to file')
  .action(async (options) => {
    try {
      const days = parseInt(options.days);
      const report = await analytics.generateNewsletterReport(days);
      
      if (options.format === 'json') {
        const output = JSON.stringify(report, null, 2);
        
        if (options.output) {
          await fs.writeFile(options.output, output);
          console.log(`✅ Newsletter report saved to: ${options.output}`);
        } else {
          console.log(output);
        }
      } else {
        // Table format
        console.log(`\n📧 Newsletter Performance Report (${days} days)\n`);
        console.log('─'.repeat(80));
        
        console.log(`Period: ${new Date(report.period.startDate).toLocaleDateString()} - ${new Date(report.period.endDate).toLocaleDateString()}`);
        console.log(`Total Newsletters: ${report.totalNewsletters}`);
        console.log(`Total Recipients: ${report.totalRecipients}`);
        console.log(`Delivery Rate: ${report.summary.deliveryRate}`);
        
        if (Object.keys(report.bySource).length > 0) {
          console.log('\n📊 By Source:\n');
          Object.entries(report.bySource).forEach(([source, stats]) => {
            console.log(`${source}:`);
            console.log(`  Newsletters: ${stats.count}`);
            console.log(`  Recipients: ${stats.recipients}`);
            console.log(`  Success Rate: ${stats.recipients > 0 ? ((stats.success / stats.recipients) * 100).toFixed(2) : 0}%`);
          });
        }
        
        if (report.newsletters.length > 0) {
          console.log('\n📋 Recent Newsletters:\n');
          console.log('Subject                    | Date       | Recipients | Success Rate');
          console.log('─'.repeat(70));
          
          report.newsletters.slice(-10).forEach(newsletter => {
            const subject = newsletter.subject.substring(0, 25).padEnd(25);
            const date = new Date(newsletter.sentAt).toLocaleDateString().padEnd(10);
            const recipients = newsletter.recipients.toString().padStart(10);
            const rate = newsletter.successRate.padStart(12);
            
            console.log(`${subject} | ${date} | ${recipients} | ${rate}`);
          });
        }
        
        if (options.output) {
          await fs.writeFile(options.output, JSON.stringify(report, null, 2));
          console.log(`\n✅ Detailed report saved to: ${options.output}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error generating newsletter report: ${error.message}`);
      process.exit(1);
    }
  });

// Engagement report
program
  .command('engagement')
  .description('Generate subscriber engagement report')
  .option('--format <format>', 'Output format (table/json)', 'table')
  .option('-o, --output <file>', 'Save report to file')
  .action(async (options) => {
    try {
      const report = await analytics.generateEngagementReport();
      
      if (options.format === 'json') {
        const output = JSON.stringify(report, null, 2);
        
        if (options.output) {
          await fs.writeFile(options.output, output);
          console.log(`✅ Engagement report saved to: ${options.output}`);
        } else {
          console.log(output);
        }
      } else {
        // Table format
        console.log('\n👥 Subscriber Engagement Report\n');
        console.log('─'.repeat(50));
        
        console.log(`Total Subscribers: ${report.totalSubscribers}`);
        console.log(`Active Subscribers: ${report.activeSubscribers}`);
        console.log(`Churn Rate (30 days): ${report.churnRate}`);
        
        console.log('\n📊 By Source:\n');
        Object.entries(report.sourceBreakdown).forEach(([source, stats]) => {
          console.log(`${source}:`);
          console.log(`  Total: ${stats.total}`);
          console.log(`  Active: ${stats.active || 0}`);
          console.log(`  Unsubscribed: ${stats.unsubscribed || 0}`);
          console.log(`  Bounced: ${stats.bounced || 0}`);
        });
        
        console.log('\n📅 Frequency Preferences:\n');
        Object.entries(report.frequencyPreferences).forEach(([freq, count]) => {
          console.log(`${freq}: ${count}`);
        });
        
        if (Object.keys(report.topicPreferences).length > 0) {
          console.log('\n🏷️  Topic Preferences:\n');
          Object.entries(report.topicPreferences)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .forEach(([topic, count]) => {
              console.log(`${topic}: ${count}`);
            });
        }
        
        console.log('\n📈 Recent Activity (30 days):\n');
        console.log(`New Subscriptions: ${report.recentActivity.subscriptionsLast30Days}`);
        console.log(`Unsubscriptions: ${report.recentActivity.unsubscribesLast30Days}`);
        
        if (options.output) {
          await fs.writeFile(options.output, JSON.stringify(report, null, 2));
          console.log(`\n✅ Detailed report saved to: ${options.output}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error generating engagement report: ${error.message}`);
      process.exit(1);
    }
  });

// Export analytics data
program
  .command('export')
  .description('Export analytics data')
  .option('-f, --format <format>', 'Export format (json/csv)', 'json')
  .option('-o, --output <file>', 'Output file path')
  .action(async (options) => {
    try {
      const result = await analytics.exportAnalytics(options.format);
      
      const outputPath = options.output || result.filename;
      await fs.writeFile(outputPath, result.data);
      
      console.log(`✅ Analytics data exported to: ${outputPath}`);
      console.log(`   Format: ${result.format}`);
      
    } catch (error) {
      console.error(`❌ Error exporting analytics: ${error.message}`);
      process.exit(1);
    }
  });

// Record newsletter send event
program
  .command('record-send')
  .description('Record a newsletter send event')
  .requiredOption('-s, --subject <subject>', 'Newsletter subject')
  .requiredOption('-r, --recipients <count>', 'Number of recipients')
  .option('--success <count>', 'Number of successful sends')
  .option('--failures <count>', 'Number of failed sends')
  .option('--source <source>', 'Newsletter source (manual/rss/scheduled)', 'manual')
  .action(async (options) => {
    try {
      const recipients = parseInt(options.recipients);
      const success = parseInt(options.success || recipients);
      const failures = parseInt(options.failures || 0);
      
      const record = await analytics.recordNewsletterSent({
        subject: options.subject,
        recipientCount: recipients,
        successCount: success,
        failureCount: failures,
        source: options.source
      });
      
      console.log('✅ Newsletter send event recorded:');
      console.log(`   ID: ${record.id}`);
      console.log(`   Subject: ${record.subject}`);
      console.log(`   Recipients: ${record.recipientCount}`);
      console.log(`   Success Rate: ${((record.successCount / record.recipientCount) * 100).toFixed(2)}%`);
      
    } catch (error) {
      console.error(`❌ Error recording send event: ${error.message}`);
      process.exit(1);
    }
  });

// Clean old data
program
  .command('clean')
  .description('Clean old analytics data')
  .option('-d, --days <days>', 'Days of data to keep', '365')
  .option('--confirm', 'Confirm cleanup without prompt')
  .action(async (options) => {
    try {
      if (!options.confirm) {
        console.log(`⚠️  This will remove analytics data older than ${options.days} days.`);
        console.log('Use --confirm flag to proceed with cleanup');
        process.exit(1);
      }
      
      const result = await analytics.cleanOldData(parseInt(options.days));
      
      console.log('✅ Analytics cleanup completed:');
      console.log(`   Newsletters removed: ${result.newslettersRemoved}`);
      console.log(`   Events removed: ${result.eventsRemoved}`);
      console.log(`   Cleaned at: ${result.cleanedAt}`);
      
    } catch (error) {
      console.error(`❌ Error cleaning analytics data: ${error.message}`);
      process.exit(1);
    }
  });

// Dashboard command
program
  .command('dashboard')
  .description('Show analytics dashboard')
  .action(async () => {
    try {
      console.log('\n📊 Newsletter Analytics Dashboard\n');
      console.log('═'.repeat(50));
      
      // Get all reports
      const [growthReport, newsletterReport, engagementReport] = await Promise.all([
        analytics.generateGrowthReport(7), // Last 7 days
        analytics.generateNewsletterReport(7),
        analytics.generateEngagementReport()
      ]);
      
      // Growth summary
      console.log('\n📈 Growth (Last 7 Days):');
      console.log(`   New Subscriptions: ${growthReport.summary.totalSubscriptions}`);
      console.log(`   Unsubscriptions: ${growthReport.summary.totalUnsubscriptions}`);
      console.log(`   Net Growth: ${growthReport.summary.netGrowth}`);
      console.log(`   Total Subscribers: ${growthReport.summary.currentTotal}`);
      
      // Newsletter performance
      console.log('\n📧 Newsletter Performance (Last 7 Days):');
      console.log(`   Newsletters Sent: ${newsletterReport.totalNewsletters}`);
      console.log(`   Total Recipients: ${newsletterReport.totalRecipients}`);
      console.log(`   Delivery Rate: ${newsletterReport.summary.deliveryRate}`);
      
      // Engagement overview
      console.log('\n👥 Engagement Overview:');
      console.log(`   Active Subscribers: ${engagementReport.activeSubscribers}`);
      console.log(`   Churn Rate: ${engagementReport.churnRate}`);
      
      // Top sources
      const topSources = Object.entries(engagementReport.sourceBreakdown)
        .sort(([,a], [,b]) => b.total - a.total)
        .slice(0, 3);
      
      if (topSources.length > 0) {
        console.log('\n🎯 Top Sources:');
        topSources.forEach(([source, stats]) => {
          console.log(`   ${source}: ${stats.total} subscribers`);
        });
      }
      
      console.log('\n─'.repeat(50));
      console.log('💡 Use specific commands for detailed reports:');
      console.log('   analytics growth --days 30');
      console.log('   analytics newsletters --days 30');
      console.log('   analytics engagement');
      
    } catch (error) {
      console.error(`❌ Error generating dashboard: ${error.message}`);
      process.exit(1);
    }
  });

if (require.main === module) {
  program.parse();
}

module.exports = { program, analytics };
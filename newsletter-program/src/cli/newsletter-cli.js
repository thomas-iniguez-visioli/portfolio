#!/usr/bin/env node

const { Command } = require('commander');
const path = require('path');
const fs = require('fs').promises;
const NewsletterComposer = require('../core/newsletter-composer');
let SubscriberManager
let ResendClient
(async() => {
 SubscriberManager = await import('../core/subscriber-manager.mjs');
 ResendClient = await import('../core/newsletter-sender.mjs');
})().then(()=>{

console.log(SubscriberManager)

const program = new Command();

program
  .name('newsletter')
  .description('Newsletter composition and management CLI')
  .version('1.0.0');

// Initialize components
const composer = new NewsletterComposer();
const subscriberManager = new SubscriberManager();
const resendClient = new ResendClient();

// Create newsletter command
program
  .command('create')
  .description('Create a new newsletter from template')
  .argument('<name>', 'Newsletter file name (without .md extension)')
  .option('-s, --subject <subject>', 'Newsletter subject')
  .option('-d, --date <date>', 'Newsletter date')
  .option('--schedule <datetime>', 'Schedule newsletter for specific date/time')
  .option('--author <author>', 'Newsletter author')
  .action(async (name, options) => {
    try {
      const filePath = await composer.createNewsletterTemplate(name, {
        subject: options.subject,
        date: options.date,
        scheduledAt: options.schedule,
        author: options.author
      });
      
      console.log(`✅ Newsletter template created: ${filePath}`);
      console.log(`📝 Edit the file and run 'newsletter preview ${name}' to see how it looks`);
    } catch (error) {
      console.error(`❌ Error creating newsletter: ${error.message}`);
      process.exit(1);
    }
  });

// Preview newsletter command
program
  .command('preview')
  .description('Generate HTML preview of newsletter')
  .argument('<file>', 'Newsletter markdown file')
  .option('-o, --output <path>', 'Output path for preview file')
  .option('--open', 'Open preview in browser')
  .action(async (file, options) => {
    try {
      const filePath = file.endsWith('.md') ? file : `newsletters/${file}.md`;
      const preview = await composer.generatePreview(filePath, options.output);
      
      console.log(`✅ Preview generated: ${preview.previewPath}`);
      console.log(`📧 Subject: ${preview.subject}`);
      
      if (preview.scheduledAt) {
        console.log(`⏰ Scheduled for: ${preview.scheduledAt.toLocaleString()}`);
      }
      
      if (options.open) {
        const { exec } = require('child_process');
        const command = process.platform === 'win32' ? 'start' : 
                       process.platform === 'darwin' ? 'open' : 'xdg-open';
        exec(`${command} "${preview.previewPath}"`);
      }
    } catch (error) {
      console.error(`❌ Error generating preview: ${error.message}`);
      process.exit(1);
    }
  });

// List newsletters command
program
  .command('list')
  .description('List all newsletters')
  .option('--status <status>', 'Filter by status (draft, scheduled, sent)')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    try {
      let newsletters = await composer.listNewsletters();
      
      if (options.status) {
        newsletters = newsletters.filter(n => n.status === options.status);
      }
      
      if (options.json) {
        console.log(JSON.stringify(newsletters, null, 2));
      } else {
        console.log('\n📧 Newsletters:\n');
        newsletters.forEach(newsletter => {
          const status = newsletter.status === 'scheduled' ? '⏰' : 
                        newsletter.status === 'sent' ? '✅' : '📝';
          console.log(`${status} ${newsletter.subject}`);
          console.log(`   File: ${newsletter.file}`);
          console.log(`   Date: ${newsletter.date}`);
          if (newsletter.scheduledAt) {
            console.log(`   Scheduled: ${newsletter.scheduledAt.toLocaleString()}`);
          }
          console.log('');
        });
      }
    } catch (error) {
      console.error(`❌ Error listing newsletters: ${error.message}`);
      process.exit(1);
    }
  });

// Send newsletter command
program
  .command('send')
  .description('Send newsletter to subscribers')
  .argument('<file>', 'Newsletter markdown file')
  .option('--scheduled', 'Mark as scheduled send (for automation)')
  .option('--force', 'Force send even if not scheduled')
  .option('--test <email>', 'Send test email to specific address')
  .action(async (file, options) => {
    try {
      const filePath = file.endsWith('.md') ? file : `newsletters/${file}.md`;
      const composed = await composer.composeNewsletter(filePath);
      
      // Check if newsletter is scheduled
      if (!options.force && !options.scheduled && composed.scheduledAt && composed.scheduledAt > new Date()) {
        console.log(`⏰ Newsletter is scheduled for ${composed.scheduledAt.toLocaleString()}`);
        console.log('Use --force to send now or wait for scheduled time');
        return;
      }
      
      if (options.test) {
        // Send test email
        await resendClient.sendEmail({
          to: options.test,
          subject: `[TEST] ${composed.subject}`,
          html: composed.htmlContent
        });
        console.log(`✅ Test email sent to ${options.test}`);
        return;
      }
      
      // Get subscribers
      const subscribers = await subscriberManager.getActiveSubscribers();
      
      if (subscribers.length === 0) {
        console.log('⚠️  No active subscribers found');
        return;
      }
      
      console.log(`📧 Sending newsletter to ${subscribers.length} subscribers...`);
      
      // Send to all subscribers
      let sent = 0;
      let failed = 0;
      
      for (const subscriber of subscribers) {
        try {
          await resendClient.sendEmail({
            to: subscriber.email,
            subject: composed.subject,
            html: composed.htmlContent,
            unsubscribeUrl: `${process.env.WEBSITE_URL}/unsubscribe?token=${subscriber.unsubscribeToken}`
          });
          sent++;
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}: ${error.message}`);
          failed++;
        }
      }
      
      console.log(`✅ Newsletter sent successfully!`);
      console.log(`   Sent: ${sent}`);
      if (failed > 0) {
        console.log(`   Failed: ${failed}`);
      }
      
      // Archive newsletter
      await composer.archiveNewsletter(filePath);
      console.log(`📁 Newsletter archived`);
      
    } catch (error) {
      console.error(`❌ Error sending newsletter: ${error.message}`);
      process.exit(1);
    }
  });

// Schedule newsletter command
program
  .command('schedule')
  .description('Schedule newsletter for future sending')
  .argument('<file>', 'Newsletter markdown file')
  .argument('<datetime>', 'Schedule date/time (ISO format or natural language)')
  .action(async (file, datetime, options) => {
    try {
      const filePath = file.endsWith('.md') ? file : `newsletters/${file}.md`;
      const scheduleDate = new Date(datetime);
      
      if (isNaN(scheduleDate.getTime())) {
        throw new Error('Invalid date format. Use ISO format (2024-01-01T10:00:00) or natural language');
      }
      
      if (scheduleDate <= new Date()) {
        throw new Error('Schedule date must be in the future');
      }
      
      // Read and update newsletter file
      const content = await fs.readFile(filePath, 'utf-8');
      const updatedContent = content.replace(
        /scheduled_at:\s*.*/,
        `scheduled_at: ${scheduleDate.toISOString()}`
      ).replace(
        /status:\s*.*/,
        'status: scheduled'
      );
      
      await fs.writeFile(filePath, updatedContent);
      
      console.log(`⏰ Newsletter scheduled for ${scheduleDate.toLocaleString()}`);
      console.log(`📝 File updated: ${filePath}`);
      
    } catch (error) {
      console.error(`❌ Error scheduling newsletter: ${error.message}`);
      process.exit(1);
    }
  });

// Archive management commands
program
  .command('archive')
  .description('Archive management commands')
  .addCommand(
    new Command('list')
      .description('List archived newsletters')
      .action(async () => {
        try {
          const archiveDir = path.join(process.cwd(), 'newsletters/archive');
          const files = await fs.readdir(archiveDir);
          const archived = files.filter(f => f.endsWith('.md'));
          
          console.log('\n📁 Archived Newsletters:\n');
          archived.forEach(file => {
            console.log(`📄 ${file}`);
          });
        } catch (error) {
          console.error(`❌ Error listing archive: ${error.message}`);
        }
      })
  );

if (require.main === module) {
  program.parse();
}
});



module.exports = { program, composer, subscriberManager, resendClient };
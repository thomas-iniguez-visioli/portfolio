#!/usr/bin/env node

import { Command } from 'commander';
import { RSSMonitor } from '../core/rss-monitor.mjs';
import { NewsletterSender } from '../core/newsletter-sender.mjs';
import { SubscriberFileManager } from '../core/subscriber-file-manager.js';
import * as fs  from 'fs'
const program = new Command();

program
    .name('rss-cli')
    .description('CLI for RSS feed monitoring and newsletter generation')
    .version('1.0.0');

// Add RSS feed command
program
    .command('add')
    .description('Add RSS feed to monitoring list')
    .requiredOption('-u, --url <url>', 'RSS feed URL')
    .option('-t, --title <title>', 'feed title (auto-detected if not provided)')
    .option('-d, --description <description>', 'feed description')
    .option('--no-auto-send', 'disable automatic newsletter sending')
    .option('--subject-prefix <prefix>', 'email subject prefix', '[RSS Update]')
    .option('--check-interval <minutes>', 'check interval in minutes', '60')
    .option('--max-items <count>', 'maximum items per newsletter', '5')
    .option('--force', 'skip RSS feed validation')
    .action(async (options) => {
        try {
            const monitor = new RSSMonitor();

            if (options.force) {
                console.log(`⚠️ Forcing addition of RSS feed (skipping validation): ${options.url}`);
            } else {
                console.log(`🔍 Validating RSS feed: ${options.url}`);
            }

            const feed = await monitor.addFeed({
                url: options.url,
                title: options.title,
                description: options.description,
                skipValidation: options.force,
                autoSend: options.autoSend,
                subjectPrefix: options.subjectPrefix,
                checkInterval: parseInt(options.checkInterval),
                maxItemsPerNewsletter: parseInt(options.maxItems)
            });

            console.log('✅ RSS feed added successfully:');
            console.log(`   ID: ${feed.id}`);
            console.log(`   Title: ${feed.title}`);
            console.log(`   URL: ${feed.url}`);
            console.log(`   Auto-send: ${feed.settings.autoSend}`);
            console.log(`   Check interval: ${feed.checkInterval} minutes`);

        } catch (error) {
            console.error('❌ Error adding RSS feed:', error.message);
            process.exit(1);
        }
    });

// List RSS feeds command
program
    .command('list')
    .description('List all RSS feeds')
    .option('--active-only', 'show only active feeds')
    .option('--format <format>', 'output format (table/json)', 'table')
    .action(async (options) => {
        try {
            const monitor = new RSSMonitor();
            const feeds = monitor.getFeeds(!options.activeOnly);

            if (options.format === 'json') {
                console.log(JSON.stringify(feeds, null, 2));
            } else {
                console.log(`\n📡 RSS Feeds (${feeds.length} found):`);
                console.log('─'.repeat(80));

                if (feeds.length === 0) {
                    console.log('No RSS feeds configured.');
                } else {
                    feeds.forEach(feed => {
                        console.log(`ID: ${feed.id}`);
                        console.log(`Title: ${feed.title}`);
                        console.log(`URL: ${feed.url}`);
                        console.log(`Status: ${feed.isActive ? '🟢 Active' : '🔴 Inactive'}`);
                        console.log(`Auto-send: ${feed.settings.autoSend ? '✅ Yes' : '❌ No'}`);
                        console.log(`Check interval: ${feed.checkInterval} minutes`);
                        console.log(`Last checked: ${feed.lastChecked || 'Never'}`);
                        console.log('─'.repeat(40));
                    });
                }
            }

        } catch (error) {
            console.error('❌ Error listing RSS feeds:', error.message);
            process.exit(1);
        }
    });

// Check RSS feeds command
program
    .command('check')
    .description('Check RSS feeds for new items')
    .option('-f, --feed-id <id>', 'check specific feed by ID')
    .option('--force', 'ignore check interval and force check')
    .action(async (options) => {
        try {
            const monitor = new RSSMonitor();

            if (options.feedId) {
                console.log(`🔍 Checking specific feed: ${options.feedId}`);

                const result = await monitor.checkFeed(options.feedId);

                console.log('✅ Feed check completed:');
                console.log(`   Feed: ${result.feed.title}`);
                console.log(`   New items: ${result.newItems.length}`);
                console.log(`   Total items: ${result.totalItems}`);

                if (result.newItems.length > 0) {
                    console.log('\n📰 New items:');
                    result.newItems.forEach((item, index) => {
                        console.log(`   ${index + 1}. ${item.title}`);
                        console.log(`      ${item.link}`);
                        console.log(`      ${new Date(item.pubDate).toLocaleString()}`);
                    });
                }

            } else {
                console.log('🔍 Checking all active RSS feeds...');

                const results = await monitor.checkAllFeeds();

                console.log('✅ RSS check completed:');
                console.log(`   Total feeds: ${results.totalFeeds}`);
                console.log(`   Checked feeds: ${results.checkedFeeds}`);
                console.log(`   New items found: ${results.newItems}`);

                if (results.errors.length > 0) {
                    console.log('\n❌ Errors:');
                    results.errors.forEach(error => console.log(`   - ${error}`));
                }
            }

        } catch (error) {
            console.error('❌ Error checking RSS feeds:', error.message);
            process.exit(1);
        }
    });

// Generate newsletter command
program
    .command('generate')
    .description('Generate newsletter from RSS feed')
    .requiredOption('-f, --feed-id <id>', 'RSS feed ID')
    .option('-o, --output <file>', 'output file for newsletter content')
    .option('--send', 'send newsletter to subscribers')
    .action(async (options) => {
        try {
            const monitor = new RSSMonitor();

            console.log(`📰 Generating newsletter for feed: ${options.feedId}`);

            const newsletter = await monitor.generateNewsletterFromItems(options.feedId);

            if (!newsletter) {
         //       console.log('ℹ️ No new items found for newsletter generation');
                return;
            }

//            console.log('✅ Newsletter generated:');
    //        console.log(`   Subject: ${newsletter.subject}`);
         //   console.log(`   Items: ${newsletter.items.length}`);

            if (options.output) {
             
                const content = {
                    subject: newsletter.subject,
                    htmlContent: newsletter.htmlContent,
                    textContent: newsletter.textContent,
                    items: newsletter.items,
                    generatedAt: newsletter.generatedAt
                };

                fs.writeFileSync(options.output, JSON.stringify(content, null, 2));
              //  console.log(`   Saved to: ${options.output}`);
            }

            if (options.send) {
                const sender = new NewsletterSender();
                const subscriberManager = new SubscriberFileManager();

                const subscribers = await subscriberManager.getSubscribers({ status: 'active' });

                if (subscribers.length === 0) {
                  //  console.log('ℹ️ No active subscribers found');
                    return;
                }

               //    console.log(`📧 Sending newsletter to ${subscribers.length} subscribers...`);

                const results = await sender.sendToSubscribers(
                    subscribers,
                    newsletter.subject,
                    newsletter.htmlContent,
                    newsletter.textContent
                );

                console.log('✅ Newsletter sent:');
                console.log(`   Total: ${results.total}`);
                console.log(`   Sent: ${results.sent}`);
                console.log(`   Failed: ${results.failed}`);

                if (results.errors.length > 0) {
                    console.log('❌ Errors:');
                    results.errors.forEach(error => console.log(`   - ${error}`));
                }
            }

        } catch (error) {
            console.error('❌ Error generating newsletter:', error.message);
            process.exit(1);
        }
    });

// Update RSS feed command
program
    .command('update')
    .description('Update RSS feed configuration')
    .requiredOption('-f, --feed-id <id>', 'RSS feed ID')
    .option('--title <title>', 'new title')
    .option('--active <boolean>', 'set active status (true/false)')
    .option('--auto-send <boolean>', 'set auto-send status (true/false)')
    .option('--check-interval <minutes>', 'check interval in minutes')
    .option('--subject-prefix <prefix>', 'email subject prefix')
    .action(async (options) => {
        try {
            const monitor = new RSSMonitor();

            const updates = {};
            if (options.title) updates.title = options.title;
            if (options.active !== undefined) updates.isActive = options.active === 'true';
            if (options.checkInterval) updates.checkInterval = parseInt(options.checkInterval);

            if (options.autoSend !== undefined || options.subjectPrefix) {
                updates.settings = {};
                if (options.autoSend !== undefined) updates.settings.autoSend = options.autoSend === 'true';
                if (options.subjectPrefix) updates.settings.subjectPrefix = options.subjectPrefix;
            }

            const updatedFeed = await monitor.updateFeed(options.feedId, updates);

            console.log('✅ RSS feed updated successfully:');
            console.log(`   ID: ${updatedFeed.id}`);
            console.log(`   Title: ${updatedFeed.title}`);
            console.log(`   Active: ${updatedFeed.isActive}`);
            console.log(`   Auto-send: ${updatedFeed.settings.autoSend}`);

        } catch (error) {
            console.error('❌ Error updating RSS feed:', error.message);
            process.exit(1);
        }
    });

// Remove RSS feed command
program
    .command('remove')
    .description('Remove RSS feed from monitoring')
    .requiredOption('-f, --feed-id <id>', 'RSS feed ID')
    .option('--confirm', 'confirm removal without prompt')
    .action(async (options) => {
        try {
            if (!options.confirm) {
                console.log('⚠️  This will permanently remove the RSS feed from monitoring.');
                console.log('Use --confirm flag to proceed with removal');
                process.exit(1);
            }

            const monitor = new RSSMonitor();
            const removedFeed = await monitor.removeFeed(options.feedId);

            console.log('✅ RSS feed removed successfully:');
            console.log(`   Title: ${removedFeed.title}`);
            console.log(`   URL: ${removedFeed.url}`);

        } catch (error) {
            console.error('❌ Error removing RSS feed:', error.message);
            process.exit(1);
        }
    });

// Stats command
program
    .command('stats')
    .description('Show RSS monitoring statistics')
    .action(async () => {
        try {
            const monitor = new RSSMonitor();
            const stats = monitor.getStats();

            console.log('\n📊 RSS Monitoring Statistics:');
            console.log('─'.repeat(40));
            console.log(`Total Feeds: ${stats.totalFeeds}`);
            console.log(`Active Feeds: ${stats.activeFeeds}`);
            console.log(`Inactive Feeds: ${stats.inactiveFeeds}`);
            console.log(`Total Cached Items: ${stats.totalCachedItems}`);
            console.log(`Last Updated: ${stats.lastUpdated}`);

            if (stats.feedStats.length > 0) {
                console.log('\n📡 Feed Details:');
                stats.feedStats.forEach(feed => {
                    console.log(`  ${feed.title}:`);
                    console.log(`    Status: ${feed.isActive ? '🟢 Active' : '🔴 Inactive'}`);
                    console.log(`    Last checked: ${feed.lastChecked || 'Never'}`);
                    console.log(`    Cached items: ${feed.cachedItems}`);
                });
            }

        } catch (error) {
            console.error('❌ Error getting RSS statistics:', error.message);
            process.exit(1);
        }
    });

program.parse();
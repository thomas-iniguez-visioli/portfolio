#!/usr/bin/env node

/**
 * GitHub Actions RSS Monitor
 * Integrates RSS monitoring with repository-based storage and encrypted subscriber management
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import newsletter program modules
const newsletterProgramPath = path.join(__dirname, '..', '..', 'newsletter-program');
process.chdir(newsletterProgramPath);

import { RSSMonitor } from '../../newsletter-program/src/core/rss-monitor.js';
import { NewsletterSender } from '../../newsletter-program/src/core/newsletter-sender.js';
import { SubscriberFileManager } from '../../newsletter-program/src/core/subscriber-file-manager.js';

class GitHubActionsRSSMonitor {
  constructor() {
    // Use repository data path for GitHub Actions
    this.dataPath = path.join(__dirname, '..', 'data');
    
    // Initialize components with repository data path
    this.rssMonitor = new RSSMonitor(this.dataPath);
    this.newsletterSender = new NewsletterSender();
    this.subscriberManager = new SubscriberFileManager(this.dataPath);
    
    // GitHub Actions environment
    this.isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
    this.shouldSendNewsletter = this.getSendNewsletterSetting();
  }

  /**
   * Determine if newsletters should be sent based on trigger and inputs
   */
  getSendNewsletterSetting() {
    if (process.env.GITHUB_EVENT_NAME === 'workflow_dispatch') {
      return process.env.SEND_NEWSLETTER !== 'false';
    }
    // For scheduled runs, always send newsletters
    return true;
  }

  /**
   * Set GitHub Actions output
   */
  setOutput(name, value) {
    if (this.isGitHubActions) {
      console.log(`${name}=${value}`);
    } else {
      console.log(`Output: ${name}=${value}`);
    }
  }

  /**
   * Main RSS monitoring function for GitHub Actions
   */
  async monitorRSS() {
    try {
      console.log('🔍 Starting RSS monitoring...');
      console.log(`📁 Data path: ${this.dataPath}`);
      console.log(`📧 Send newsletters: ${this.shouldSendNewsletter}`);
      
      // Check all RSS feeds for new items
      const results = await this.rssMonitor.checkAllFeeds();
      
      console.log('📊 RSS Check Results:');
      console.log(`   Total feeds: ${results.totalFeeds}`);
      console.log(`   Checked feeds: ${results.checkedFeeds}`);
      console.log(`   New items found: ${results.newItems}`);
      
      if (results.errors.length > 0) {
        console.log('❌ Errors:');
        results.errors.forEach(error => console.log(`   - ${error}`));
      }
      
      // Set GitHub Actions outputs
      this.setOutput('new_items', results.newItems);
      this.setOutput('total_feeds', results.totalFeeds);
      this.setOutput('checked_feeds', results.checkedFeeds);
      this.setOutput('errors', results.errors.length);
      
      let newslettersSent = 0;
      
      // Generate and send newsletters if there are new items
      if (results.newItems > 0 && this.shouldSendNewsletter) {
        console.log('📧 Processing new RSS items for newsletter generation...');
        
        const feeds = this.rssMonitor.getFeeds(true); // Get active feeds only
        
        for (const feed of feeds) {
          if (!feed.settings.autoSend) {
            console.log(`⏭️ Skipping feed ${feed.title} (auto-send disabled)`);
            continue;
          }
          
          try {
            // Get new items for this specific feed
            const feedResult = await this.rssMonitor.checkFeed(feed.id);
            
            if (feedResult.newItems.length > 0) {
              console.log(`📰 Processing ${feedResult.newItems.length} new items for: ${feed.title}`);
              
              // Generate newsletter from new items
              const newsletter = await this.rssMonitor.generateNewsletterFromItems(
                feed.id, 
                feedResult.newItems
              );
              
              if (newsletter) {
                // Get active subscribers
                const subscribers = await this.subscriberManager.getSubscribers({ 
                  status: 'active' 
                });
                
                if (subscribers.length > 0) {
                  console.log(`📤 Sending newsletter to ${subscribers.length} subscribers...`);
                  
                  // Send newsletter using Resend API
                  const sendResults = await this.newsletterSender.sendToSubscribers(
                    subscribers,
                    newsletter.subject,
                    newsletter.htmlContent,
                    newsletter.textContent
                  );
                  
                  console.log(`✅ Newsletter sent for ${feed.title}:`);
                  console.log(`   Total: ${sendResults.total}`);
                  console.log(`   Sent: ${sendResults.sent}`);
                  console.log(`   Failed: ${sendResults.failed}`);
                  
                  if (sendResults.errors.length > 0) {
                    console.log('❌ Send errors:');
                    sendResults.errors.forEach(error => console.log(`   - ${error}`));
                  }
                  
                  newslettersSent++;
                } else {
                  console.log(`ℹ️ No active subscribers found for ${feed.title}`);
                }
              } else {
                console.log(`⚠️ No newsletter generated for ${feed.title}`);
              }
            } else {
              console.log(`ℹ️ No new items for feed: ${feed.title}`);
            }
            
          } catch (error) {
            console.error(`❌ Error processing feed ${feed.title}:`, error.message);
          }
        }
      } else if (results.newItems === 0) {
        console.log('ℹ️ No new RSS items found');
      } else {
        console.log('ℹ️ Newsletter sending disabled for this run');
      }
      
      this.setOutput('newsletters_sent', newslettersSent);
      
      // Generate summary
      const summary = {
        totalFeeds: results.totalFeeds,
        checkedFeeds: results.checkedFeeds,
        newItems: results.newItems,
        newslettersSent: newslettersSent,
        errors: results.errors.length,
        timestamp: new Date().toISOString()
      };
      
      console.log('📋 Final Summary:');
      console.log(`   Feeds checked: ${summary.checkedFeeds}/${summary.totalFeeds}`);
      console.log(`   New items: ${summary.newItems}`);
      console.log(`   Newsletters sent: ${summary.newslettersSent}`);
      console.log(`   Errors: ${summary.errors}`);
      
      return summary;
      
    } catch (error) {
      console.error('❌ RSS monitoring failed:', error.message);
      console.error('Stack trace:', error.stack);
      
      this.setOutput('error', error.message);
      throw error;
    }
  }

  /**
   * Get RSS monitoring statistics
   */
  async getStats() {
    try {
      const rssStats = this.rssMonitor.getStats();
      const subscriberStats = await this.subscriberManager.getStats();
      
      const stats = {
        rss: rssStats,
        subscribers: subscriberStats,
        timestamp: new Date().toISOString()
      };
      
      console.log('📊 RSS Monitoring Statistics:');
      console.log('─'.repeat(50));
      console.log('RSS Feeds:');
      console.log(`  Total: ${rssStats.totalFeeds}`);
      console.log(`  Active: ${rssStats.activeFeeds}`);
      console.log(`  Inactive: ${rssStats.inactiveFeeds}`);
      console.log(`  Total cached items: ${rssStats.totalCachedItems}`);
      console.log('');
      console.log('Subscribers:');
      console.log(`  Total: ${subscriberStats.total}`);
      console.log(`  Active: ${subscriberStats.active}`);
      console.log(`  Unsubscribed: ${subscriberStats.unsubscribed}`);
      console.log(`  Recent (7 days): ${subscriberStats.recentSubscriptions}`);
      
      return stats;
      
    } catch (error) {
      console.error('❌ Error getting statistics:', error.message);
      throw error;
    }
  }

  /**
   * Validate RSS configuration and subscriber data
   */
  async validateConfiguration() {
    try {
      console.log('🔍 Validating RSS and subscriber configuration...');
      
      const validation = {
        isValid: true,
        errors: [],
        warnings: [],
        rss: null,
        subscribers: null
      };
      
      // Validate RSS feeds
      try {
        const feeds = this.rssMonitor.getFeeds();
        validation.rss = {
          totalFeeds: feeds.length,
          activeFeeds: feeds.filter(f => f.isActive).length,
          errors: [],
          warnings: []
        };
        
        // Check for duplicate URLs
        const urls = feeds.map(feed => feed.url);
        const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
        
        if (duplicateUrls.length > 0) {
          validation.rss.errors.push(`Duplicate RSS feed URLs: ${duplicateUrls.join(', ')}`);
          validation.isValid = false;
        }
        
        // Check for invalid URLs
        feeds.forEach(feed => {
          try {
            new URL(feed.url);
          } catch (error) {
            validation.rss.errors.push(`Invalid URL for feed ${feed.id}: ${feed.url}`);
            validation.isValid = false;
          }
        });
        
      } catch (error) {
        validation.rss = { error: error.message };
        validation.errors.push(`RSS validation failed: ${error.message}`);
        validation.isValid = false;
      }
      
      // Validate subscriber data
      try {
        const subscriberValidation = await this.subscriberManager.validateFile();
        validation.subscribers = subscriberValidation;
        
        if (!subscriberValidation.isValid) {
          validation.isValid = false;
          validation.errors.push(...subscriberValidation.errors);
        }
        
        validation.warnings.push(...subscriberValidation.warnings);
        
      } catch (error) {
        validation.subscribers = { error: error.message };
        validation.errors.push(`Subscriber validation failed: ${error.message}`);
        validation.isValid = false;
      }
      
      console.log(`🔍 Configuration validation: ${validation.isValid ? '✅ Valid' : '❌ Invalid'}`);
      
      if (validation.errors.length > 0) {
        console.log('❌ Errors:');
        validation.errors.forEach(error => console.log(`   - ${error}`));
      }
      
      if (validation.warnings.length > 0) {
        console.log('⚠️ Warnings:');
        validation.warnings.forEach(warning => console.log(`   - ${warning}`));
      }
      
      return validation;
      
    } catch (error) {
      console.error('❌ Configuration validation failed:', error.message);
      throw error;
    }
  }
}

// CLI interface for GitHub Actions
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new GitHubActionsRSSMonitor();
  const command = process.argv[2] || 'monitor';
  
  try {
    switch (command) {
      case 'monitor':
        await monitor.monitorRSS();
        break;
        
      case 'stats':
        await monitor.getStats();
        break;
        
      case 'validate':
        const validation = await monitor.validateConfiguration();
        if (!validation.isValid) {
          process.exit(1);
        }
        break;
        
      default:
        console.log('Usage: node rss-monitor-action.js [command]');
        console.log('Commands:');
        console.log('  monitor   - Monitor RSS feeds and send newsletters (default)');
        console.log('  stats     - Show RSS and subscriber statistics');
        console.log('  validate  - Validate RSS and subscriber configuration');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

export { GitHubActionsRSSMonitor };
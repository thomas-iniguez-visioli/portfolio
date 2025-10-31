#!/usr/bin/env node

/**
 * RSS Feed Management Script for GitHub Actions
 * Provides repository-based RSS feed configuration and monitoring
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class GitHubRSSManager {
  constructor() {
    this.dataPath = path.join(__dirname, '..', 'data');
    this.feedsFile = path.join(this.dataPath, 'rss-feeds.json');
    this.cacheFile = path.join(this.dataPath, 'rss-cache.json');
    
    this.ensureDataDirectory();
  }

  /**
   * Ensure data directory exists
   */
  ensureDataDirectory() {
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }
  }

  /**
   * Load RSS feeds configuration
   */
  loadFeeds() {
    try {
      if (!fs.existsSync(this.feedsFile)) {
        return {
          version: '1.0.0',
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          feeds: []
        };
      }
      return JSON.parse(fs.readFileSync(this.feedsFile, 'utf8'));
    } catch (error) {
      throw new Error(`Failed to load RSS feeds: ${error.message}`);
    }
  }

  /**
   * Save RSS feeds configuration
   */
  saveFeeds(feeds) {
    try {
      feeds.lastModified = new Date().toISOString();
      fs.writeFileSync(this.feedsFile, JSON.stringify(feeds, null, 2));
    } catch (error) {
      throw new Error(`Failed to save RSS feeds: ${error.message}`);
    }
  }

  /**
   * Add RSS feed to repository configuration
   */
  async addFeed(feedConfig) {
    const feeds = this.loadFeeds();
    
    // Check for duplicate URLs
    const existingFeed = feeds.feeds.find(feed => feed.url === feedConfig.url);
    if (existingFeed) {
      throw new Error(`RSS feed with URL ${feedConfig.url} already exists`);
    }

    const feed = {
      id: feedConfig.id || this.generateFeedId(feedConfig.url),
      url: feedConfig.url,
      title: feedConfig.title || 'RSS Feed',
      description: feedConfig.description || '',
      isActive: feedConfig.isActive !== false,
      checkInterval: feedConfig.checkInterval || 60, // minutes
      lastChecked: null,
      lastItemDate: null,
      settings: {
        autoSend: feedConfig.autoSend !== false,
        subjectPrefix: feedConfig.subjectPrefix || '[RSS Update]',
        includeFullContent: feedConfig.includeFullContent !== false,
        maxItemsPerNewsletter: feedConfig.maxItemsPerNewsletter || 5,
        template: feedConfig.template || 'rss-newsletter'
      },
      createdAt: new Date().toISOString()
    };

    feeds.feeds.push(feed);
    this.saveFeeds(feeds);
    
    return feed;
  }

  /**
   * Update RSS feed configuration
   */
  async updateFeed(feedId, updates) {
    const feeds = this.loadFeeds();
    const feedIndex = feeds.feeds.findIndex(feed => feed.id === feedId);
    
    if (feedIndex === -1) {
      throw new Error(`Feed not found: ${feedId}`);
    }

    feeds.feeds[feedIndex] = {
      ...feeds.feeds[feedIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveFeeds(feeds);
    
    return feeds.feeds[feedIndex];
  }

  /**
   * Remove RSS feed
   */
  async removeFeed(feedId) {
    const feeds = this.loadFeeds();
    const feedIndex = feeds.feeds.findIndex(feed => feed.id === feedId);
    
    if (feedIndex === -1) {
      throw new Error(`Feed not found: ${feedId}`);
    }

    const removedFeed = feeds.feeds.splice(feedIndex, 1)[0];
    this.saveFeeds(feeds);
    
    return removedFeed;
  }

  /**
   * List all RSS feeds
   */
  listFeeds(activeOnly = false) {
    const feeds = this.loadFeeds();
    
    if (activeOnly) {
      return feeds.feeds.filter(feed => feed.isActive);
    }
    
    return feeds.feeds;
  }

  /**
   * Generate feed ID from URL
   */
  generateFeedId(url) {
    return url
      .replace(/^https?:\/\//, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
      .substring(0, 50);
  }

  /**
   * Get RSS feed statistics
   */
  getStats() {
    const feeds = this.loadFeeds();
    
    return {
      totalFeeds: feeds.feeds.length,
      activeFeeds: feeds.feeds.filter(f => f.isActive).length,
      inactiveFeeds: feeds.feeds.filter(f => !f.isActive).length,
      lastModified: feeds.lastModified,
      feeds: feeds.feeds.map(feed => ({
        id: feed.id,
        title: feed.title,
        url: feed.url,
        isActive: feed.isActive,
        lastChecked: feed.lastChecked,
        autoSend: feed.settings.autoSend
      }))
    };
  }

  /**
   * Validate RSS feed configuration
   */
  validateConfig() {
    try {
      const feeds = this.loadFeeds();
      const errors = [];
      const warnings = [];

      // Check for duplicate URLs
      const urls = feeds.feeds.map(feed => feed.url);
      const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
      
      if (duplicateUrls.length > 0) {
        errors.push(`Duplicate RSS feed URLs found: ${duplicateUrls.join(', ')}`);
      }

      // Check for duplicate IDs
      const ids = feeds.feeds.map(feed => feed.id);
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
      
      if (duplicateIds.length > 0) {
        errors.push(`Duplicate RSS feed IDs found: ${duplicateIds.join(', ')}`);
      }

      // Check for invalid URLs
      feeds.feeds.forEach(feed => {
        try {
          new URL(feed.url);
        } catch (error) {
          errors.push(`Invalid URL for feed ${feed.id}: ${feed.url}`);
        }
      });

      // Check for missing required fields
      feeds.feeds.forEach(feed => {
        if (!feed.id) errors.push(`Feed missing ID: ${feed.url}`);
        if (!feed.url) errors.push(`Feed missing URL: ${feed.id}`);
        if (!feed.title) warnings.push(`Feed missing title: ${feed.id}`);
      });

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        feedCount: feeds.feeds.length
      };

    } catch (error) {
      return {
        isValid: false,
        errors: [`Configuration validation failed: ${error.message}`],
        warnings: [],
        feedCount: 0
      };
    }
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new GitHubRSSManager();
  const command = process.argv[2];
  
  try {
    switch (command) {
      case 'add':
        const url = process.argv[3];
        const title = process.argv[4];
        if (!url) {
          console.error('Usage: node rss-manager.js add <url> [title]');
          process.exit(1);
        }
        const feed = await manager.addFeed({ url, title });
        console.log('✅ RSS feed added:', feed.id);
        break;
        
      case 'list':
        const feeds = manager.listFeeds();
        console.log(`📡 RSS Feeds (${feeds.length}):`);
        feeds.forEach(feed => {
          console.log(`  ${feed.id}: ${feed.title} (${feed.isActive ? 'active' : 'inactive'})`);
        });
        break;
        
      case 'stats':
        const stats = manager.getStats();
        console.log('📊 RSS Statistics:');
        console.log(`  Total feeds: ${stats.totalFeeds}`);
        console.log(`  Active feeds: ${stats.activeFeeds}`);
        console.log(`  Inactive feeds: ${stats.inactiveFeeds}`);
        break;
        
      case 'validate':
        const validation = manager.validateConfig();
        console.log(`🔍 Configuration validation: ${validation.isValid ? '✅ Valid' : '❌ Invalid'}`);
        if (validation.errors.length > 0) {
          console.log('Errors:');
          validation.errors.forEach(error => console.log(`  - ${error}`));
        }
        if (validation.warnings.length > 0) {
          console.log('Warnings:');
          validation.warnings.forEach(warning => console.log(`  - ${warning}`));
        }
        break;
        
      default:
        console.log('Usage: node rss-manager.js <command>');
        console.log('Commands:');
        console.log('  add <url> [title]  - Add RSS feed');
        console.log('  list              - List all feeds');
        console.log('  stats             - Show statistics');
        console.log('  validate          - Validate configuration');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

export { GitHubRSSManager };
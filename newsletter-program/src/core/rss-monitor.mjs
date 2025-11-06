import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * RSS feed monitoring and processing system
 * Monitors RSS feeds and generates newsletters from new items
 */
export class RSSMonitor {
  constructor(dataPath = './data', options = {}) {
    this.dataPath = dataPath;
    this.feedsFile = path.join(dataPath, 'rss-feeds.json');
    this.cacheFile = path.join(dataPath, 'rss-cache.json');
    this.testMode = options.testMode || false;
    
    this.ensureDataDirectory();
    this.initializeFiles();
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
   * Initialize RSS feeds and cache files
   */
  initializeFiles() {
    if (!fs.existsSync(this.feedsFile)) {
      const initialFeeds = {
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        feeds: []
      };
      fs.writeFileSync(this.feedsFile, JSON.stringify(initialFeeds, null, 2));
    }

    if (!fs.existsSync(this.cacheFile)) {
      const initialCache = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        items: {}
      };
      fs.writeFileSync(this.cacheFile, JSON.stringify(initialCache, null, 2));
    }
  }

  /**
   * Add RSS feed to monitoring list
   */
  async addFeed(feedConfig) {
    const feeds = this.loadFeeds();
    
    let validation = { valid: true, title: feedConfig.title || 'RSS Feed', description: feedConfig.description };
    
    // Validate feed URL unless skipping validation or in test mode
    if (!feedConfig.skipValidation && !this.testMode) {
      validation = await this.validateFeed(feedConfig.url);
      if (!validation.valid) {
        throw new Error(`Invalid RSS feed: ${validation.error}`);
      }
    }

    const feed = {
      id: crypto.randomUUID(),
      url: feedConfig.url,
      title: feedConfig.title || validation.title,
      description: feedConfig.description || validation.description,
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
    feeds.lastModified = new Date().toISOString();
    
    this.saveFeeds(feeds);
    
    return feed;
  }

  /**
   * Remove RSS feed from monitoring
   */
  async removeFeed(feedId) {
    const feeds = this.loadFeeds();
    const feedIndex = feeds.feeds.findIndex(feed => feed.id === feedId);
    
    if (feedIndex === -1) {
      throw new Error(`Feed not found: ${feedId}`);
    }

    const removedFeed = feeds.feeds.splice(feedIndex, 1)[0];
    feeds.lastModified = new Date().toISOString();
    
    this.saveFeeds(feeds);
    
    return removedFeed;
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
    
    feeds.lastModified = new Date().toISOString();
    
    this.saveFeeds(feeds);
    
    return feeds.feeds[feedIndex];
  }

  /**
   * Get all RSS feeds
   */
  getFeeds(activeOnly = false) {
    const feeds = this.loadFeeds();
    
    if (activeOnly) {
      return feeds.feeds.filter(feed => feed.isActive);
    }
    
    return feeds.feeds;
  }

  /**
   * Check all active feeds for new items
   */
  async checkAllFeeds() {
    const feeds = this.getFeeds(true);
    const results = {
      totalFeeds: feeds.length,
      checkedFeeds: 0,
      newItems: 0,
      errors: []
    };

    for (const feed of feeds) {
      try {
        const feedResult = await this.checkFeed(feed.id);
        results.checkedFeeds++;
        results.newItems += feedResult.newItems.length;
        
       // console.log(`✅ Checked feed: ${feed.title} (${feedResult.newItems.length} new items)`);
        
      } catch (error) {
        results.errors.push(`${feed.title}: ${error.message}`);
       // console.error(`❌ Error checking feed ${feed.title}:`, error.message);
      }
    }

    return results;
  }

  /**
   * Check specific feed for new items
   */
  async checkFeed(feedId) {
    const feeds = this.loadFeeds();
    const feed = feeds.feeds.find(f => f.id === feedId);
    
    if (!feed) {
      throw new Error(`Feed not found: ${feedId}`);
    }

    if (!feed.isActive) {
      throw new Error(`Feed is not active: ${feed.title}`);
    }

    // Check if enough time has passed since last check
    if (feed.lastChecked) {
      const lastCheck = new Date(feed.lastChecked);
      const now = new Date();
      const minutesSinceLastCheck = (now - lastCheck) / (1000 * 60);
      
      if (minutesSinceLastCheck < feed.checkInterval) {
        return {
          feed: feed,
          newItems: [],
          message: `Too soon to check again (${Math.round(minutesSinceLastCheck)}/${feed.checkInterval} minutes)`
        };
      }
    }

    // Fetch and parse RSS feed
    const rssData = await this.fetchRSSFeed(feed.url);
    const items = this.parseRSSItems(rssData);
    
    // Filter new items
    const cache = this.loadCache();
    const feedCache = cache.items[feedId] || [];
    const newItems = this.filterNewItems(items, feedCache);

    // Update cache with new items
    cache.items[feedId] = [
      ...newItems.map(item => ({
        guid: item.guid,
        pubDate: item.pubDate,
        title: item.title,
        processedAt: new Date().toISOString()
      })),
      ...feedCache
    ].slice(0, 100); // Keep only last 100 items

    cache.lastUpdated = new Date().toISOString();
    this.saveCache(cache);

    // Update feed last checked time
    feed.lastChecked = new Date().toISOString();
    if (newItems.length > 0) {
      feed.lastItemDate = newItems[0].pubDate;
    }
    
    this.saveFeeds(feeds);

    return {
      feed: feed,
      newItems: newItems,
      totalItems: items.length
    };
  }

  /**
   * Generate newsletter from RSS items
   */
  async generateNewsletterFromItems(feedId, items = null) {
    const feed = this.getFeeds().find(f => f.id === feedId);
    if (!feed) {
      throw new Error(`Feed not found: ${feedId}`);
    }

    // If no items provided, get recent items from cache
    if (!items) {
      const cache = this.loadCache();
      const feedCache = cache.items[feedId] || [];
      
      // Get items from last 24 hours
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      items = feedCache
        .filter(item => new Date(item.processedAt) > oneDayAgo)
        .slice(0, feed.settings.maxItemsPerNewsletter);
    }

    if (items.length === 0) {
      return null;
    }

    // Generate newsletter content
    const newsletter = {
      subject: `${feed.settings.subjectPrefix} ${feed.title} - ${items.length} new item${items.length > 1 ? 's' : ''}`,
      htmlContent: this.generateHTMLContent(feed, items),
      textContent: this.generateTextContent(feed, items),
      items: items,
      generatedAt: new Date().toISOString()
    };

    return newsletter;
  }

  /**
   * Generate HTML content for newsletter
   */
  generateHTMLContent(feed, items) {
    let html = `
    <h1>📰 ${feed.title}</h1>
    <p><em>${feed.description || 'Latest updates from ' + feed.title}</em></p>
    <hr>
    `;

    items.forEach((item, index) => {
      html += `
      <div style="margin-bottom: 30px; padding-bottom: 20px; ${index < items.length - 1 ? 'border-bottom: 1px solid #eee;' : ''}">
        <h2><a href="${item.link}" style="color: #2c3e50; text-decoration: none;">${item.title}</a></h2>
        <p style="color: #666; font-size: 14px; margin: 5px 0;">
          📅 ${new Date(item.pubDate).toLocaleDateString()} 
          ${item.author ? `• ✍️ ${item.author}` : ''}
        </p>
        ${item.description ? `<p>${item.description}</p>` : ''}
        ${feed.settings.includeFullContent && item.content ? `<div>${item.content}</div>` : ''}
        <p><a href="${item.link}" style="color: #3498db;">Read more →</a></p>
      </div>
      `;
    });

    html += `
    <hr>
    <p style="color: #666; font-size: 12px; text-align: center;">
      This newsletter was automatically generated from <a href="${feed.url}">${feed.title}</a>
    </p>
    `;

    return html;
  }

  /**
   * Generate text content for newsletter
   */
  generateTextContent(feed, items) {
    let text = `${feed.title}\n${'='.repeat(feed.title.length)}\n\n`;
    
    if (feed.description) {
      text += `${feed.description}\n\n`;
    }

    items.forEach((item, index) => {
      text += `${index + 1}. ${item.title}\n`;
      text += `   ${new Date(item.pubDate).toLocaleDateString()}`;
      if (item.author) {
        text += ` • ${item.author}`;
      }
      text += `\n`;
      
      if (item.description) {
        text += `   ${item.description.replace(/<[^>]*>/g, '').substring(0, 200)}...\n`;
      }
      
      text += `   Read more: ${item.link}\n\n`;
    });

    text += `---\nThis newsletter was automatically generated from ${feed.title}\n${feed.url}`;

    return text;
  }

  /**
   * Validate RSS feed URL
   */
  async validateFeed(url) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'RSS-Monitor/1.0'
        },
        timeout: 10000
      });

      if (!response.ok) {
        return {
          valid: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const content = await response.text();
      
      // Basic RSS/Atom validation
      if (!content.includes('<rss') && !content.includes('<feed')) {
        return {
          valid: false,
          error: 'Not a valid RSS or Atom feed'
        };
      }

      // Extract basic info
      const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
      const descMatch = content.match(/<description[^>]*>([^<]+)<\/description>/i);

      return {
        valid: true,
        title: titleMatch ? titleMatch[1].trim() : 'Unknown Feed',
        description: descMatch ? descMatch[1].trim() : null
      };

    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  /**
   * Fetch and parse RSS feed (alias for fetchRSSFeed for test compatibility)
   */
  async fetchFeed(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const xmlContent = await response.text();
    const items = this.parseRSSItems(xmlContent);
    console.log(items.length)
    // Extract feed metadata
    const titleMatch = xmlContent.match(/<title[^>]*>(.*?)<\/title>/i);
    const descriptionMatch = xmlContent.match(/<description[^>]*>(.*?)<\/description>/i);
    
    return {
      title: titleMatch ? titleMatch[1].trim() : 'Unknown Feed',
      description: descriptionMatch ? descriptionMatch[1].trim() : '',
      items: items
    };
  }

  /**
   * Update RSS cache for a specific feed
   */
  async updateCache(feedId, cacheData) {
    const cache = this.loadCache();
    cache.items[feedId] = cacheData;
    cache.lastUpdated = new Date().toISOString();
    this.saveCache(cache);
  }

  /**
   * Get RSS cache for a specific feed
   */
  async getCache(feedId) {
    const cache = this.loadCache();
    return cache.items[feedId] || null;
  }

  /**
   * Fetch RSS feed content
   */
  async fetchRSSFeed(url) {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RSS-Monitor/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml'
      },
      timeout: 15000
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: HTTP ${response.status}`);
    }

    return await response.text();
  }

  /**
   * Parse RSS items from XML content
   */
  parseRSSItems(xmlContent) {
    const items = [];
    
    // Simple XML parsing for RSS items
    const itemMatches = xmlContent.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];
    
    itemMatches.forEach(itemXml => {
      const item = this.parseRSSItem(itemXml);
      if (item) {
        items.push(item);
      }
    });

    // Sort by publication date (newest first)
    items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    return items;
  }

  /**
   * Parse individual RSS item
   */
  parseRSSItem(itemXml) {
    try {
      const extractTag = (tagName) => {
        const match = itemXml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
        return match ? match[1].trim() : null;
      };

      const extractCDATA = (content) => {
        if (!content) return null;
        const cdataMatch = content.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
        return cdataMatch ? cdataMatch[1] : content;
      };

      const title = extractCDATA(extractTag('title'));
      const link = extractTag('link');
      const description = extractCDATA(extractTag('description'));
      const pubDate = extractTag('pubDate') || extractTag('published');
      const author = extractTag('author') || extractTag('creator');
      const guid = extractTag('guid') || link;
      const content = extractCDATA(extractTag('content:encoded')) || extractCDATA(extractTag('content'));

      if (!title || !link) {
        return null;
      }

      return {
        title: title,
        link: link,
        description: description,
        content: content,
        pubDate: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        author: author,
        guid: guid || crypto.createHash('md5').update(title + link).digest('hex')
      };

    } catch (error) {
      console.warn('Failed to parse RSS item:', error.message);
      return null;
    }
  }

  /**
   * Filter new items that haven't been processed
   */
  filterNewItems(items, cachedItems) {
    const cachedGuids = new Set(cachedItems.map(item => item.guid));
    return items.filter(item => !cachedGuids.has(item.guid));
  }

  /**
   * Load RSS feeds configuration
   */
  loadFeeds() {
    try {
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
      fs.writeFileSync(this.feedsFile, JSON.stringify(feeds, null, 2));
    } catch (error) {
      throw new Error(`Failed to save RSS feeds: ${error.message}`);
    }
  }

  /**
   * Load RSS cache
   */
  loadCache() {
    try {
      return JSON.parse(fs.readFileSync(this.cacheFile, 'utf8'));
    } catch (error) {
      throw new Error(`Failed to load RSS cache: ${error.message}`);
    }
  }

  /**
   * Save RSS cache
   */
  saveCache(cache) {
    try {
      fs.writeFileSync(this.cacheFile, JSON.stringify(cache, null, 2));
    } catch (error) {
      throw new Error(`Failed to save RSS cache: ${error.message}`);
    }
  }

  /**
   * Get RSS monitoring statistics
   */
  getStats() {
    const feeds = this.getFeeds();
    const cache = this.loadCache();
    
    const stats = {
      totalFeeds: feeds.length,
      activeFeeds: feeds.filter(f => f.isActive).length,
      inactiveFeeds: feeds.filter(f => !f.isActive).length,
      totalCachedItems: Object.values(cache.items).reduce((sum, items) => sum + items.length, 0),
      lastUpdated: cache.lastUpdated,
      feedStats: feeds.map(feed => ({
        id: feed.id,
        title: feed.title,
        isActive: feed.isActive,
        lastChecked: feed.lastChecked,
        cachedItems: cache.items[feed.id]?.length || 0
      }))
    };

    return stats;
  }
}

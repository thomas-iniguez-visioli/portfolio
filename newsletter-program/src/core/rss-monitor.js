const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const striptags = require('striptags');

async function getGeminiLeaksSummary(apiKey, content) {
  if (!apiKey) return null;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = "fait moi et résumée compatible pour un humain normal du contenu suivant :" + content;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error fetching Gemini leaks summary:", error);
    return null;
  }
}

/**
 * RSS feed monitoring and processing system
 * Monitors RSS feeds and generates newsletters from new items
 */
class RSSMonitor {
  constructor(dataPath = './.github/data', options = {}) {
    this.dataPath = path.isAbsolute(dataPath) ? dataPath : path.resolve(process.cwd(), dataPath);
    this.feedsFile = path.join(this.dataPath, 'rss-feeds.json');
    this.cacheFile = path.join(this.dataPath, 'rss-cache.json');
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
    const feedsData = this.loadFeeds();
    let feeds = feedsData.feeds;
    if (activeOnly) {
      feeds = feeds.filter(f => f.isActive);
    }
    return feeds;
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
        if (feedResult) {
          results.checkedFeeds++;
          results.newItems += (feedResult.newItems || []).length;
        }
      } catch (error) {
        results.errors.push(`${feed.title}: ${error.message}`);
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
    
    if (!feed) return null;

    if (!feed.isActive) {
      throw new Error(`Feed is not active: ${feed.title}`);
    }

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

    const rssData = await this.fetchRSSFeed(feed.url);
    const items = this.parseRSSItems(rssData);
    
    const cache = this.loadCache();
    const feedCache = cache.items[feedId] || [];
    const newItems = this.filterNewItems(items, feedCache);

    cache.items[feedId] = [
      ...newItems.map(item => ({
        guid: item.guid,
        published: item.published,
        title: item.title,
        processedAt: new Date().toISOString(),
        content: item.content
      })),
      ...feedCache
    ].slice(0, 2000);

    cache.lastUpdated = new Date().toISOString();
    this.saveCache(cache);

    feed.lastChecked = new Date().toISOString();
    if (newItems.length > 0) {
      feed.lastItemDate = newItems[0].published;
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
    const feeds = this.getFeeds(true);
    const feed = feeds.find(f => f.id === feedId);
    
    if (!feed) return null;

    if (!items) {
      const cache = this.loadCache();
      const feedCache = cache.items[feedId] || [];
      const oneDayAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      items = feedCache
        .filter(item => new Date(item.processedAt) > oneDayAgo)
        .slice(0, feed.settings.maxItemsPerNewsletter);
    }

    if (items.length === 0) return null;

    const newsletter = {
      subject: `${feed.settings.subjectPrefix} ${feed.title} - ${items.length} new item${items.length > 1 ? 's' : ''}`,
      htmlContent: await this.generateHTMLContent(feed, items),
      textContent: this.generateTextContent(feed, items),
      items: items,
      generatedAt: new Date().toISOString()
    };

    return newsletter;
  }

  /**
   * Generate HTML content for newsletter
   */
  async generateHTMLContent(feed, items) {
    const summaryContent = await getGeminiLeaksSummary(process.env.GEMINI_API_KEY, items.map(e => e.content).join("\n"));
    
    let html = `
    <h1>📰 ${feed.title}</h1>
    <p><em>${feed.description || 'Latest updates from ' + feed.title}</em></p>
    ${summaryContent ? `<h2>Résumé Généré par Gemini :</h2><p>${summaryContent}</p><hr>` : ''}
    <hr>
    `;

    items.forEach((item, index) => {
      html += `
      <div style="margin-bottom: 30px; padding-bottom: 20px; ${index < items.length - 1 ? 'border-bottom: 1px solid #eee;' : ''}">
        <h2><a href="${item.guid}" style="color: #2c3e50; text-decoration: none;">${item.title}</a></h2>
        <p style="color: #666; font-size: 14px; margin: 5px 0;">
          📅 ${new Date(item.published).toLocaleDateString()} 
          ${item.author ? `• ✍️ ${item.author}` : ''}
        </p>
        ${item.description ? `<p>${item.description}</p>` : ''}
        ${feed.settings.includeFullContent && item.content ? `<div>${item.content}</div>` : ''}
        <p><a href="${item.guid}" style="color: #3498db;">Read more →</a></p>
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
    let text = `${feed.title}
${'='.repeat(feed.title.length)}

`;
    
    if (feed.description) {
      text += `${feed.description}

`;
    }

    items.forEach((item, index) => {
      text += `${index + 1}. ${item.title}
`;
      text += `   ${new Date(item.published).toLocaleDateString()}`;
      if (item.author) {
        text += ` • ${item.author}`;
      }
      text += `
`;
      
      if (item.description) {
        text += `   ${striptags(item.description).substring(0, 200)}...
`;
      }
      
      text += `   Read more: ${item.guid}

`;
    });

    text += `---
This newsletter was automatically generated from ${feed.title}
${feed.url}`;

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
        }
      });
      if (!response.ok) {
        return {
          valid: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }
      const content = await response.text();

      if (!content.includes('<rss') && !content.includes('<feed')) {
        return {
          valid: false,
          error: 'Not a valid RSS or Atom feed'
        };
      }

      const isAtom = content.includes('<feed');
      const titleTag = '<title>';
      const descTag = isAtom ? '<subtitle>' : '<description>';

      const titleMatch = content.match(new RegExp(`${titleTag}[^>]*>([^<]+)<\/title>`, 'i'));
      const descMatch = content.match(new RegExp(`${descTag}[^>]*>([^<]+)<\/${isAtom ? 'subtitle' : 'description'}`, 'i'));

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

  async fetchRSSFeed(url) {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RSS-Monitor/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: HTTP ${response.status}`);
    }

    return await response.text();
  }

  parseRSSItems(xmlContent) {
    const items = [];
    const isAtom = xmlContent.includes('<feed');
    let itemMatches = isAtom ? 
      (xmlContent.match(/<entry[^>]*>[\s\S]*?<\/entry>/gi) || []) :
      (xmlContent.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || []);

    itemMatches.forEach(itemXml => {
      const item = this.parseRSSItem(itemXml, isAtom);
      if (item) {
        items.push(item);
      }
    });

    items.sort((a, b) => new Date(b.published) - new Date(a.published));
    return items;
  }

  parseRSSItem(itemXml, isAtom = false) {
    try {
      const extractTag = (tagName, atom = false) => {
        let regex;
        if (atom && tagName === 'link') {
          const linkMatch = itemXml.match(/<link[^>]*href=["']([^"']+)["']/i);
          return linkMatch ? linkMatch[1].trim() : null;
        } else {
          regex = new RegExp(`<${tagName}[^>]*>([\s\S]*?)<\/${tagName}>`, 'i');
        }
        const match = itemXml.match(regex);
        return match ? match[1].trim() : null;
      };

      const extractCDATA = (content) => {
        if (!content) return null;
        const cdataMatch = content.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
        return cdataMatch ? cdataMatch[1] : content;
      };

      const title = extractCDATA(extractTag('title', isAtom));
      const link = extractTag('link', isAtom);
      const description = extractCDATA(extractTag(isAtom ? 'summary' : 'description', isAtom));
      const pubDate = extractTag(isAtom ? 'published' : 'pubDate', isAtom) || extractTag('updated', isAtom);
      const author = extractTag('author', isAtom) || extractTag('dc:creator', isAtom);
      const guid = extractTag(isAtom ? 'id' : 'guid', isAtom) || link;
      const content = extractCDATA(extractTag(isAtom ? 'content' : 'content:encoded', isAtom)) || extractCDATA(extractTag('content'));

      if (!link) return null;

      return {
        title: title || 'Sans titre',
        link: link,
        description: description,
        content: content,
        published: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        author: author,
        guid: guid || crypto.createHash('md5').update((title || '') + link).digest('hex')
      };
    } catch (error) {
      return null;
    }
  }

  filterNewItems(items, cachedItems) {
    const cachedGuids = new Set(cachedItems.map(item => item.guid));
    return items.filter(item => !cachedGuids.has(item.guid));
  }

  loadFeeds() {
    return JSON.parse(fs.readFileSync(this.feedsFile, 'utf8'));
  }

  saveFeeds(feeds) {
    fs.writeFileSync(this.feedsFile, JSON.stringify(feeds, null, 2));
  }

  loadCache() {
    return JSON.parse(fs.readFileSync(this.cacheFile, 'utf8'));
  }

  saveCache(cache) {
    fs.writeFileSync(this.cacheFile, JSON.stringify(cache, null, 2));
  }

  getStats() {
    const feeds = this.getFeeds();
    const cache = this.loadCache();
    
    return {
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
  }
}

module.exports = { RSSMonitor };

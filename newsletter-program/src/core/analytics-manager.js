const fs = require('fs').promises;
const path = require('path');
const { SubscriberFileManager } = require('./subscriber-file-manager');

class AnalyticsManager {
  constructor(options = {}) {
    this.subscriberManager = new SubscriberFileManager(options);
    this.analyticsFile = options.analyticsFile || path.join(__dirname, '../data/analytics.json');
  }

  /**
   * Initialize analytics file
   */
  async initializeAnalytics() {
    try {
      await fs.access(this.analyticsFile);
    } catch (error) {
      if (error.code === 'ENOENT') {
        const initialData = {
          version: '1.0.0',
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          newsletters: [],
          events: []
        };
        
        await fs.mkdir(path.dirname(this.analyticsFile), { recursive: true });
        await fs.writeFile(this.analyticsFile, JSON.stringify(initialData, null, 2));
      }
    }
  }

  /**
   * Load analytics data
   */
  async loadAnalytics() {
    await this.initializeAnalytics();
    const data = await fs.readFile(this.analyticsFile, 'utf-8');
    return JSON.parse(data);
  }

  /**
   * Save analytics data
   */
  async saveAnalytics(data) {
    data.lastUpdated = new Date().toISOString();
    await fs.writeFile(this.analyticsFile, JSON.stringify(data, null, 2));
  }

  /**
   * Record newsletter send event
   */
  async recordNewsletterSent(newsletterData) {
    const analytics = await this.loadAnalytics();
    
    const newsletterRecord = {
      id: newsletterData.id || `newsletter-${Date.now()}`,
      subject: newsletterData.subject,
      sentAt: new Date().toISOString(),
      recipientCount: newsletterData.recipientCount || 0,
      successCount: newsletterData.successCount || 0,
      failureCount: newsletterData.failureCount || 0,
      source: newsletterData.source || 'manual', // manual, rss, scheduled
      metadata: newsletterData.metadata || {}
    };
    
    analytics.newsletters.push(newsletterRecord);
    await this.saveAnalytics(analytics);
    
    return newsletterRecord;
  }

  /**
   * Record subscriber event
   */
  async recordSubscriberEvent(eventType, subscriberData) {
    const analytics = await this.loadAnalytics();
    
    const event = {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: eventType, // subscribe, unsubscribe, bounce, update
      timestamp: new Date().toISOString(),
      subscriberId: subscriberData.id,
      email: subscriberData.email,
      source: subscriberData.source,
      metadata: subscriberData.metadata || {}
    };
    
    analytics.events.push(event);
    
    // Keep only last 10000 events to prevent file from growing too large
    if (analytics.events.length > 10000) {
      analytics.events = analytics.events.slice(-10000);
    }
    
    await this.saveAnalytics(analytics);
    
    return event;
  }

  /**
   * Generate subscriber growth report
   */
  async generateGrowthReport(days = 30) {
    const analytics = await this.loadAnalytics();
    const subscribers = await this.subscriberManager.getSubscribers();
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Group subscriptions by day
    const dailyStats = {};
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      dailyStats[dateKey] = {
        date: dateKey,
        subscriptions: 0,
        unsubscriptions: 0,
        net: 0,
        total: 0
      };
    }
    
    // Count subscriptions
    subscribers.forEach(subscriber => {
      const subDate = new Date(subscriber.subscribedAt).toISOString().split('T')[0];
      if (dailyStats[subDate]) {
        dailyStats[subDate].subscriptions++;
      }
    });
    
    // Count unsubscriptions from events
    analytics.events
      .filter(event => event.type === 'unsubscribe')
      .forEach(event => {
        const unsubDate = new Date(event.timestamp).toISOString().split('T')[0];
        if (dailyStats[unsubDate]) {
          dailyStats[unsubDate].unsubscriptions++;
        }
      });
    
    // Calculate running totals and net changes
    let runningTotal = subscribers.filter(s => 
      new Date(s.subscribedAt) < startDate
    ).length;
    
    Object.keys(dailyStats).sort().forEach(date => {
      const day = dailyStats[date];
      day.net = day.subscriptions - day.unsubscriptions;
      runningTotal += day.net;
      day.total = runningTotal;
    });
    
    return {
      period: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      totalDays: days,
      dailyStats: Object.values(dailyStats),
      summary: {
        totalSubscriptions: Object.values(dailyStats).reduce((sum, day) => sum + day.subscriptions, 0),
        totalUnsubscriptions: Object.values(dailyStats).reduce((sum, day) => sum + day.unsubscriptions, 0),
        netGrowth: Object.values(dailyStats).reduce((sum, day) => sum + day.net, 0),
        currentTotal: runningTotal
      }
    };
  }

  /**
   * Generate newsletter performance report
   */
  async generateNewsletterReport(days = 30) {
    const analytics = await this.loadAnalytics();
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const recentNewsletters = analytics.newsletters.filter(newsletter => 
      new Date(newsletter.sentAt) >= startDate
    );
    
    const totalSent = recentNewsletters.reduce((sum, n) => sum + n.recipientCount, 0);
    const totalSuccess = recentNewsletters.reduce((sum, n) => sum + n.successCount, 0);
    const totalFailures = recentNewsletters.reduce((sum, n) => sum + n.failureCount, 0);
    
    // Group by source
    const bySource = {};
    recentNewsletters.forEach(newsletter => {
      const source = newsletter.source || 'manual';
      if (!bySource[source]) {
        bySource[source] = { count: 0, recipients: 0, success: 0, failures: 0 };
      }
      bySource[source].count++;
      bySource[source].recipients += newsletter.recipientCount;
      bySource[source].success += newsletter.successCount;
      bySource[source].failures += newsletter.failureCount;
    });
    
    return {
      period: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      totalNewsletters: recentNewsletters.length,
      totalRecipients: totalSent,
      successRate: totalSent > 0 ? (totalSuccess / totalSent * 100).toFixed(2) : 0,
      summary: {
        sent: totalSent,
        delivered: totalSuccess,
        failed: totalFailures,
        deliveryRate: totalSent > 0 ? ((totalSuccess / totalSent) * 100).toFixed(2) + '%' : '0%'
      },
      bySource,
      newsletters: recentNewsletters.map(n => ({
        subject: n.subject,
        sentAt: n.sentAt,
        recipients: n.recipientCount,
        success: n.successCount,
        failures: n.failureCount,
        successRate: n.recipientCount > 0 ? ((n.successCount / n.recipientCount) * 100).toFixed(2) + '%' : '0%'
      }))
    };
  }

  /**
   * Generate subscriber engagement report
   */
  async generateEngagementReport() {
    const subscribers = await this.subscriberManager.getSubscribers();
    const analytics = await this.loadAnalytics();
    
    // Analyze subscriber sources
    const sourceStats = {};
    subscribers.forEach(subscriber => {
      const source = subscriber.source || 'unknown';
      if (!sourceStats[source]) {
        sourceStats[source] = { total: 0, active: 0, unsubscribed: 0, bounced: 0 };
      }
      sourceStats[source].total++;
      sourceStats[source][subscriber.status]++;
    });
    
    // Analyze subscription frequency preferences
    const frequencyStats = {};
    subscribers.forEach(subscriber => {
      const freq = subscriber.preferences?.frequency || 'weekly';
      frequencyStats[freq] = (frequencyStats[freq] || 0) + 1;
    });
    
    // Analyze topic preferences
    const topicStats = {};
    subscribers.forEach(subscriber => {
      const topics = subscriber.preferences?.topics || [];
      topics.forEach(topic => {
        topicStats[topic] = (topicStats[topic] || 0) + 1;
      });
    });
    
    // Calculate churn rate (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentUnsubscribes = analytics.events.filter(event => 
      event.type === 'unsubscribe' && new Date(event.timestamp) >= thirtyDaysAgo
    ).length;
    
    const activeSubscribers = subscribers.filter(s => s.status === 'active').length;
    const churnRate = activeSubscribers > 0 ? (recentUnsubscribes / activeSubscribers * 100).toFixed(2) : 0;
    
    return {
      totalSubscribers: subscribers.length,
      activeSubscribers,
      churnRate: churnRate + '%',
      sourceBreakdown: sourceStats,
      frequencyPreferences: frequencyStats,
      topicPreferences: topicStats,
      recentActivity: {
        unsubscribesLast30Days: recentUnsubscribes,
        subscriptionsLast30Days: subscribers.filter(s => 
          new Date(s.subscribedAt) >= thirtyDaysAgo
        ).length
      }
    };
  }

  /**
   * Export analytics data
   */
  async exportAnalytics(format = 'json', options = {}) {
    const analytics = await this.loadAnalytics();
    
    let exportData;
    let filename;
    
    switch (format.toLowerCase()) {
      case 'json':
        exportData = JSON.stringify(analytics, null, 2);
        filename = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
        break;
        
      case 'csv':
        // Export newsletter performance as CSV
        const headers = ['Subject', 'Sent At', 'Recipients', 'Success', 'Failures', 'Success Rate'];
        const csvRows = [headers.join(',')];
        
        analytics.newsletters.forEach(newsletter => {
          const successRate = newsletter.recipientCount > 0 ? 
            ((newsletter.successCount / newsletter.recipientCount) * 100).toFixed(2) : 0;
          
          const row = [
            newsletter.subject,
            newsletter.sentAt,
            newsletter.recipientCount,
            newsletter.successCount,
            newsletter.failureCount,
            successRate + '%'
          ];
          csvRows.push(row.map(field => `"${field}"`).join(','));
        });
        
        exportData = csvRows.join('\n');
        filename = `newsletter-analytics-${new Date().toISOString().split('T')[0]}.csv`;
        break;
        
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
    
    return {
      data: exportData,
      format,
      filename
    };
  }

  /**
   * Clean old analytics data
   */
  async cleanOldData(daysToKeep = 365) {
    const analytics = await this.loadAnalytics();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const originalNewsletterCount = analytics.newsletters.length;
    const originalEventCount = analytics.events.length;
    
    // Remove old newsletters
    analytics.newsletters = analytics.newsletters.filter(newsletter => 
      new Date(newsletter.sentAt) >= cutoffDate
    );
    
    // Remove old events
    analytics.events = analytics.events.filter(event => 
      new Date(event.timestamp) >= cutoffDate
    );
    
    await this.saveAnalytics(analytics);
    
    return {
      newslettersRemoved: originalNewsletterCount - analytics.newsletters.length,
      eventsRemoved: originalEventCount - analytics.events.length,
      cleanedAt: new Date().toISOString()
    };
  }
}

module.exports = { AnalyticsManager };
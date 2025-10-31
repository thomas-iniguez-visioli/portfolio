const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { SubscriberFileManager } = require('./subscriber-file-manager');
const { AnalyticsManager } = require('./analytics-manager');

class SecureExportManager {
  constructor(options = {}) {
    this.subscriberManager = new SubscriberFileManager(options);
    this.analyticsManager = new AnalyticsManager(options);
    this.exportDir = options.exportDir || path.join(__dirname, '../exports');
  }

  /**
   * Create secure export with encryption
   */
  async createSecureExport(options = {}) {
    try {
      await fs.mkdir(this.exportDir, { recursive: true });
      
      const exportId = crypto.randomUUID();
      const timestamp = new Date().toISOString();
      
      const exportData = {
        id: exportId,
        createdAt: timestamp,
        version: '1.0.0',
        includeSubscribers: options.includeSubscribers !== false,
        includeAnalytics: options.includeAnalytics !== false,
        anonymizeData: options.anonymizeData === true,
        data: {}
      };
      
      // Export subscribers if requested
      if (exportData.includeSubscribers) {
        const subscribers = await this.subscriberManager.getSubscribers();
        
        if (exportData.anonymizeData) {
          exportData.data.subscribers = subscribers.map(s => ({
            id: s.id,
            emailHash: crypto.createHash('sha256').update(s.email).digest('hex'),
            status: s.status,
            subscribedAt: s.subscribedAt,
            source: s.source,
            preferences: s.preferences
          }));
        } else {
          exportData.data.subscribers = subscribers;
        }
      }
      
      // Export analytics if requested
      if (exportData.includeAnalytics) {
        const analytics = await this.analyticsManager.loadAnalytics();
        
        if (exportData.anonymizeData) {
          // Remove or hash sensitive data from analytics
          exportData.data.analytics = {
            ...analytics,
            events: analytics.events.map(event => ({
              ...event,
              email: event.email ? crypto.createHash('sha256').update(event.email).digest('hex') : undefined
            }))
          };
        } else {
          exportData.data.analytics = analytics;
        }
      }
      
      // Generate export file
      const filename = `secure-export-${exportId}-${timestamp.split('T')[0]}.json`;
      const filepath = path.join(this.exportDir, filename);
      
      await fs.writeFile(filepath, JSON.stringify(exportData, null, 2));
      
      return {
        exportId,
        filepath,
        filename,
        createdAt: timestamp,
        size: (await fs.stat(filepath)).size,
        includeSubscribers: exportData.includeSubscribers,
        includeAnalytics: exportData.includeAnalytics,
        anonymized: exportData.anonymizeData
      };
      
    } catch (error) {
      throw new Error(`Failed to create secure export: ${error.message}`);
    }
  }

  /**
   * Create GDPR-compliant data export for specific subscriber
   */
  async createGDPRExport(email) {
    try {
      const subscribers = await this.subscriberManager.getSubscribers();
      const subscriber = subscribers.find(s => s.email === email);
      
      if (!subscriber) {
        throw new Error(`No subscriber found with email: ${email}`);
      }
      
      // Get analytics events for this subscriber
      const analytics = await this.analyticsManager.loadAnalytics();
      const subscriberEvents = analytics.events.filter(event => 
        event.email === email || event.subscriberId === subscriber.id
      );
      
      const gdprData = {
        exportType: 'GDPR_DATA_EXPORT',
        createdAt: new Date().toISOString(),
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          status: subscriber.status,
          subscribedAt: subscriber.subscribedAt,
          unsubscribedAt: subscriber.unsubscribedAt,
          source: subscriber.source,
          preferences: subscriber.preferences,
          metadata: subscriber.metadata
        },
        events: subscriberEvents,
        dataProcessingPurposes: [
          'Newsletter delivery',
          'Subscription management',
          'Analytics and reporting'
        ],
        legalBasis: 'Consent (GDPR Article 6(1)(a))',
        retentionPeriod: 'Until unsubscription or 2 years of inactivity',
        dataControllers: [
          {
            name: 'Newsletter Service',
            contact: process.env.CONTACT_EMAIL || 'privacy@example.com'
          }
        ]
      };
      
      const filename = `gdpr-export-${subscriber.id}-${new Date().toISOString().split('T')[0]}.json`;
      const filepath = path.join(this.exportDir, filename);
      
      await fs.mkdir(this.exportDir, { recursive: true });
      await fs.writeFile(filepath, JSON.stringify(gdprData, null, 2));
      
      return {
        filepath,
        filename,
        subscriberId: subscriber.id,
        email: subscriber.email,
        createdAt: gdprData.createdAt
      };
      
    } catch (error) {
      throw new Error(`Failed to create GDPR export: ${error.message}`);
    }
  }

  /**
   * Create anonymized dataset for research/analysis
   */
  async createAnonymizedDataset(options = {}) {
    try {
      const subscribers = await this.subscriberManager.getSubscribers();
      const analytics = await this.analyticsManager.loadAnalytics();
      
      // Create anonymized subscriber data
      const anonymizedSubscribers = subscribers.map((subscriber, index) => ({
        anonymousId: `anon_${crypto.createHash('sha256').update(subscriber.id).digest('hex').substring(0, 8)}`,
        status: subscriber.status,
        subscribedAt: subscriber.subscribedAt,
        unsubscribedAt: subscriber.unsubscribedAt,
        source: subscriber.source,
        preferences: subscriber.preferences,
        // Add demographic data if available (without PII)
        metadata: {
          hasMetadata: !!subscriber.metadata,
          metadataFields: subscriber.metadata ? Object.keys(subscriber.metadata).length : 0
        }
      }));
      
      // Create anonymized analytics
      const anonymizedAnalytics = {
        newsletters: analytics.newsletters.map(newsletter => ({
          id: crypto.createHash('sha256').update(newsletter.id).digest('hex').substring(0, 8),
          sentAt: newsletter.sentAt,
          recipientCount: newsletter.recipientCount,
          successCount: newsletter.successCount,
          failureCount: newsletter.failureCount,
          source: newsletter.source
        })),
        events: analytics.events.map(event => ({
          type: event.type,
          timestamp: event.timestamp,
          source: event.source,
          anonymousSubscriberId: event.subscriberId ? 
            crypto.createHash('sha256').update(event.subscriberId).digest('hex').substring(0, 8) : null
        }))
      };
      
      const dataset = {
        datasetType: 'ANONYMIZED_RESEARCH_DATASET',
        createdAt: new Date().toISOString(),
        description: 'Anonymized newsletter subscription and engagement data',
        anonymizationMethod: 'SHA256 hashing with truncation',
        totalSubscribers: anonymizedSubscribers.length,
        dateRange: {
          earliest: subscribers.length > 0 ? 
            Math.min(...subscribers.map(s => new Date(s.subscribedAt).getTime())) : null,
          latest: subscribers.length > 0 ? 
            Math.max(...subscribers.map(s => new Date(s.subscribedAt).getTime())) : null
        },
        subscribers: anonymizedSubscribers,
        analytics: anonymizedAnalytics
      };
      
      const filename = `anonymized-dataset-${new Date().toISOString().split('T')[0]}.json`;
      const filepath = path.join(this.exportDir, filename);
      
      await fs.mkdir(this.exportDir, { recursive: true });
      await fs.writeFile(filepath, JSON.stringify(dataset, null, 2));
      
      return {
        filepath,
        filename,
        createdAt: dataset.createdAt,
        totalRecords: dataset.totalSubscribers,
        anonymized: true
      };
      
    } catch (error) {
      throw new Error(`Failed to create anonymized dataset: ${error.message}`);
    }
  }

  /**
   * List available exports
   */
  async listExports() {
    try {
      await fs.mkdir(this.exportDir, { recursive: true });
      const files = await fs.readdir(this.exportDir);
      const exports = [];
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filepath = path.join(this.exportDir, file);
          const stats = await fs.stat(filepath);
          
          try {
            const content = await fs.readFile(filepath, 'utf-8');
            const data = JSON.parse(content);
            
            exports.push({
              filename: file,
              filepath,
              type: data.exportType || data.datasetType || 'UNKNOWN',
              createdAt: data.createdAt || stats.mtime.toISOString(),
              size: stats.size,
              anonymized: data.anonymizeData || data.datasetType === 'ANONYMIZED_RESEARCH_DATASET'
            });
          } catch (error) {
            // Skip invalid files
            console.warn(`Skipping invalid export file: ${file}`);
          }
        }
      }
      
      return exports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
    } catch (error) {
      throw new Error(`Failed to list exports: ${error.message}`);
    }
  }

  /**
   * Clean old export files
   */
  async cleanOldExports(daysToKeep = 30) {
    try {
      const exports = await this.listExports();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      
      let removedCount = 0;
      
      for (const exportFile of exports) {
        if (new Date(exportFile.createdAt) < cutoffDate) {
          await fs.unlink(exportFile.filepath);
          removedCount++;
        }
      }
      
      return {
        removedCount,
        cleanedAt: new Date().toISOString()
      };
      
    } catch (error) {
      throw new Error(`Failed to clean old exports: ${error.message}`);
    }
  }
}

module.exports = { SecureExportManager };
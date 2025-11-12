const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { EncryptionManager } = require('./encryption');

class SubscriberFileManager {
  constructor(options = {}) {
    this.dataFile = options.dataFile || path.join(__dirname, '../data/subscribers.encrypted.json');
    this.backupDir = options.backupDir || path.join(__dirname, '../data/backups');
    this.encryption = new EncryptionManager();
    this.fileVersion = '1.0.0';
  }

  /**
   * Initialize subscriber file if it doesn't exist
   */
  async initializeFile() {
    try {
      console.log(this.dataFile)
      await fs.access(this.dataFile);
    } catch (error) {
      if (error.code === 'ENOENT') {
        const initialData = {
          version: this.fileVersion,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          keyVersion: this.encryption.getCurrentKeyVersion(),
          subscribers: []
        };
        
        await fs.mkdir(path.dirname(this.dataFile), { recursive: true });
        await fs.writeFile(this.dataFile, JSON.stringify(initialData, null, 2));
      } else {
        throw error;
      }
    }
  }

  /**
   * Load and decrypt subscriber data
   */
  async loadSubscribers() {
    await this.initializeFile();
    
    try {
      const data = await fs.readFile(this.dataFile, 'utf-8');
      const parsed = JSON.parse(data);
      
      // Decrypt subscriber emails
      const decryptedSubscribers = parsed.subscribers.map(subscriber => ({
        ...subscriber,
        email: this.encryption.decryptEmail(subscriber.encryptedEmail)
      }));
      
      return {
        ...parsed,
        subscribers: decryptedSubscribers
      };
    } catch (error) {
      throw new Error(`Failed to load subscribers: ${error.message}`);
    }
  }

  /**
   * Save encrypted subscriber data
   */
  async saveSubscribers(data) {
    try {
      // Create backup before saving
      await this.createBackup();
      
      // Encrypt subscriber emails
      const encryptedSubscribers = data.subscribers.map(subscriber => {
        const { email, ...rest } = subscriber;
        return {
          ...rest,
          encryptedEmail: this.encryption.encryptEmail(email)
        };
      });
      
      const fileData = {
        ...data,
        subscribers: encryptedSubscribers,
        lastModified: new Date().toISOString(),
        keyVersion: this.encryption.getCurrentKeyVersion()
      };
      
      await fs.writeFile(this.dataFile, JSON.stringify(fileData, null, 2));
    } catch (error) {
      throw new Error(`Failed to save subscribers: ${error.message}`);
    }
  }

  /**
   * Add new subscriber
   */
  async addSubscriber(subscriberData) {
    const data = await this.loadSubscribers();
    
    // Check for duplicate email
    const existingSubscriber = data.subscribers.find(s => s.email === subscriberData.email);
    if (existingSubscriber) {
      throw new Error(`Subscriber with email ${subscriberData.email} already exists`);
    }
    
    const newSubscriber = {
      id: crypto.randomUUID(),
      email: subscriberData.email,
      status: 'active',
      subscribedAt: new Date().toISOString(),
      source: subscriberData.source || 'manual',
      preferences: {
        frequency: subscriberData.frequency || 'weekly',
        topics: subscriberData.topics || []
      },
      unsubscribeToken: crypto.randomBytes(32).toString('hex'),
      metadata: {
        ipAddress: subscriberData.ipAddress,
        userAgent: subscriberData.userAgent,
        referrer: subscriberData.referrer
      }
    };
    
    data.subscribers.push(newSubscriber);
    await this.saveSubscribers(data);
    
    return newSubscriber;
  }

  /**
   * Get subscriber by ID
   */
  async getSubscriber(id) {
    const data = await this.loadSubscribers();
    return data.subscribers.find(s => s.id === id);
  }

  /**
   * Get subscribers with optional filtering
   */
  async getSubscribers(filter = {}) {
    const data = await this.loadSubscribers();
    let subscribers = data.subscribers;
    
    if (filter.status) {
      subscribers = subscribers.filter(s => s.status === filter.status);
    }
    
    if (filter.source) {
      subscribers = subscribers.filter(s => s.source === filter.source);
    }
    
    if (filter.frequency) {
      subscribers = subscribers.filter(s => s.preferences.frequency === filter.frequency);
    }
    
    return subscribers;
  }

  /**
   * Get active subscribers only
   */
  async getActiveSubscribers() {
    return this.getSubscribers({ status: 'active' });
  }

  /**
   * Update subscriber
   */
  async updateSubscriber(id, updates) {
    const data = await this.loadSubscribers();
    const subscriberIndex = data.subscribers.findIndex(s => s.id === id);
    
    if (subscriberIndex === -1) {
      throw new Error(`Subscriber with ID ${id} not found`);
    }
    
    const subscriber = data.subscribers[subscriberIndex];
    
    // Update fields
    if (updates.status) subscriber.status = updates.status;
    if (updates.preferences) {
      subscriber.preferences = { ...subscriber.preferences, ...updates.preferences };
    }
    
    subscriber.updatedAt = new Date().toISOString();
    
    await this.saveSubscribers(data);
    
    return subscriber;
  }

  /**
   * Remove subscriber
   */
  async removeSubscriber(id) {
    const data = await this.loadSubscribers();
    const subscriberIndex = data.subscribers.findIndex(s => s.id === id);
    
    if (subscriberIndex === -1) {
      throw new Error(`Subscriber with ID ${id} not found`);
    }
    
    const removedSubscriber = data.subscribers.splice(subscriberIndex, 1)[0];
    await this.saveSubscribers(data);
    
    return removedSubscriber;
  }

  /**
   * Unsubscribe using token
   */
  async unsubscribeByToken(token) {
    const data = await this.loadSubscribers();
    const subscriber = data.subscribers.find(s => s.unsubscribeToken === token);
    
    if (!subscriber) {
      throw new Error('Invalid unsubscribe token');
    }
    
    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = new Date().toISOString();
    
    await this.saveSubscribers(data);
    
    return subscriber;
  }

  /**
   * Get subscriber statistics
   */
  async getStats() {
    const data = await this.loadSubscribers();
    const subscribers = data.subscribers;
    
    const stats = {
      total: subscribers.length,
      active: subscribers.filter(s => s.status === 'active').length,
      unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length,
      bounced: subscribers.filter(s => s.status === 'bounced').length,
      recentSubscriptions: 0,
      bySource: {},
      byFrequency: {}
    };
    
    // Calculate recent subscriptions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    stats.recentSubscriptions = subscribers.filter(s => 
      new Date(s.subscribedAt) > sevenDaysAgo
    ).length;
    
    // Group by source
    subscribers.forEach(s => {
      stats.bySource[s.source] = (stats.bySource[s.source] || 0) + 1;
    });
    
    // Group by frequency
    subscribers.forEach(s => {
      const freq = s.preferences.frequency;
      stats.byFrequency[freq] = (stats.byFrequency[freq] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Export subscribers in various formats
   */
  async exportSubscribers(format = 'json', options = {}) {
    const data = await this.loadSubscribers();
    let subscribers = data.subscribers;
    
    // Apply filters
    if (options.status) {
      subscribers = subscribers.filter(s => s.status === options.status);
    }
    
    // Remove sensitive data if requested
    if (options.excludeMetadata) {
      subscribers = subscribers.map(s => {
        const { metadata, unsubscribeToken, ...safe } = s;
        return safe;
      });
    }
    
    let exportData;
    let filename;
    
    switch (format.toLowerCase()) {
      case 'json':
        exportData = JSON.stringify(subscribers, null, 2);
        filename = `subscribers-export-${new Date().toISOString().split('T')[0]}.json`;
        break;
        
      case 'csv':
        const headers = ['id', 'email', 'status', 'subscribedAt', 'source', 'frequency', 'topics'];
        const csvRows = [headers.join(',')];
        
        subscribers.forEach(s => {
          const row = [
            s.id,
            s.email,
            s.status,
            s.subscribedAt,
            s.source,
            s.preferences.frequency,
            s.preferences.topics.join(';')
          ];
          csvRows.push(row.map(field => `"${field}"`).join(','));
        });
        
        exportData = csvRows.join('\n');
        filename = `subscribers-export-${new Date().toISOString().split('T')[0]}.csv`;
        break;
        
      case 'txt':
        exportData = subscribers.map(s => s.email).join('\n');
        filename = `subscribers-export-${new Date().toISOString().split('T')[0]}.txt`;
        break;
        
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
    
    return {
      data: exportData,
      format,
      filename,
      count: subscribers.length
    };
  }

  /**
   * Import subscribers from various formats
   */
  async importSubscribers(importData, format = 'json', options = {}) {
    let subscribers;
    
    switch (format.toLowerCase()) {
      case 'json':
        subscribers = JSON.parse(importData);
        break;
        
      case 'csv':
        const lines = importData.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        
        subscribers = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim());
          const subscriber = {};
          
          headers.forEach((header, index) => {
            if (header === 'topics') {
              subscriber.preferences = subscriber.preferences || {};
              subscriber.preferences.topics = values[index] ? values[index].split(';') : [];
            } else if (header === 'frequency') {
              subscriber.preferences = subscriber.preferences || {};
              subscriber.preferences.frequency = values[index] || 'weekly';
            } else {
              subscriber[header] = values[index];
            }
          });
          
          return subscriber;
        });
        break;
        
      case 'txt':
        const emails = importData.split('\n').filter(line => line.trim());
        subscribers = emails.map(email => ({
          email: email.trim(),
          source: 'import'
        }));
        break;
        
      default:
        throw new Error(`Unsupported import format: ${format}`);
    }
    
    const result = {
      total: subscribers.length,
      imported: 0,
      skipped: 0,
      errors: []
    };
    
    for (const subscriberData of subscribers) {
      try {
        // Check for required email field
        if (!subscriberData.email) {
          result.errors.push('Missing email address');
          continue;
        }
        
        // Check for duplicates unless allowed
        if (!options.allowDuplicates) {
          const existing = await this.getSubscribers();
          if (existing.find(s => s.email === subscriberData.email)) {
            result.skipped++;
            continue;
          }
        }
        
        await this.addSubscriber(subscriberData);
        result.imported++;
        
      } catch (error) {
        result.errors.push(`${subscriberData.email}: ${error.message}`);
      }
    }
    
    return result;
  }

  /**
   * Validate file integrity
   */
  async validateFile() {
    const validation = {
      isValid: true,
      errors: [],
      warnings: [],
      stats: null
    };
    
    try {
      const data = await this.loadSubscribers();
      
      // Check file structure
      if (!data.version) {
        validation.warnings.push('Missing version field');
      }
      
      if (!data.keyVersion) {
        validation.errors.push('Missing key version');
        validation.isValid = false;
      }
      
      // Validate subscribers
      const emailSet = new Set();
      const duplicateEmails = [];
      
      data.subscribers.forEach((subscriber, index) => {
        // Check required fields
        if (!subscriber.id) {
          validation.errors.push(`Subscriber ${index}: Missing ID`);
          validation.isValid = false;
        }
        
        if (!subscriber.email) {
          validation.errors.push(`Subscriber ${index}: Missing email`);
          validation.isValid = false;
        } else {
          // Check for duplicates
          if (emailSet.has(subscriber.email)) {
            duplicateEmails.push(subscriber.email);
          } else {
            emailSet.add(subscriber.email);
          }
        }
        
        if (!subscriber.status) {
          validation.errors.push(`Subscriber ${index}: Missing status`);
          validation.isValid = false;
        }
      });
      
      if (duplicateEmails.length > 0) {
        validation.warnings.push(`Found ${duplicateEmails.length} duplicate emails`);
      }
      
      validation.stats = {
        totalSubscribers: data.subscribers.length,
        keyVersion: data.keyVersion,
        lastModified: data.lastModified,
        duplicateEmails: duplicateEmails.length
      };
      
    } catch (error) {
      validation.isValid = false;
      validation.errors.push(`File validation failed: ${error.message}`);
    }
    
    return validation;
  }

  /**
   * Optimize file (remove duplicates, etc.)
   */
  async optimizeFile() {
    const data = await this.loadSubscribers();
    const originalCount = data.subscribers.length;
    
    // Remove duplicates (keep the most recent)
    const emailMap = new Map();
    
    data.subscribers.forEach(subscriber => {
      const existing = emailMap.get(subscriber.email);
      if (!existing || new Date(subscriber.subscribedAt) > new Date(existing.subscribedAt)) {
        emailMap.set(subscriber.email, subscriber);
      }
    });
    
    data.subscribers = Array.from(emailMap.values());
    const optimizedCount = data.subscribers.length;
    
    await this.saveSubscribers(data);
    
    return {
      originalCount,
      optimizedCount,
      duplicatesRemoved: originalCount - optimizedCount,
      optimizedAt: new Date().toISOString()
    };
  }

  /**
   * Create backup of current file
   */
  async createBackup() {
    try {
      await fs.mkdir(this.backupDir, { recursive: true });
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(this.backupDir, `subscribers-${timestamp}.json`);
      
      const currentData = await fs.readFile(this.dataFile, 'utf-8');
      await fs.writeFile(backupFile, currentData);
      
      // Keep only last 10 backups
      const backups = await fs.readdir(this.backupDir);
      const sortedBackups = backups
        .filter(f => f.startsWith('subscribers-') && f.endsWith('.json'))
        .sort()
        .reverse();
      
      if (sortedBackups.length > 10) {
        for (const oldBackup of sortedBackups.slice(10)) {
          await fs.unlink(path.join(this.backupDir, oldBackup));
        }
      }
      
      return backupFile;
    } catch (error) {
      console.warn(`Failed to create backup: ${error.message}`);
    }
  }

  /**
   * Migrate to new encryption key
   */
  async migrateToNewKey() {
    // This would require implementing key rotation in EncryptionManager
    // For now, throw an error indicating this needs to be implemented
    throw new Error('Key rotation not yet implemented. This requires coordination with EncryptionManager.');
  }
}

module.exports = { SubscriberFileManager };

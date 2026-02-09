const fs = require('fs/promises');
const path = require('path');
const { EncryptionManager } = require('./encryption.js');

class SubscriberManager {
  constructor(dataDir = './data') {
    this.dataDir = dataDir;
    this.encryptionManager = new EncryptionManager();
    this.subscribersFile = path.join(dataDir, 'subscribers.encrypted.json');
  }

  async addSubscriber(subscriberData) {
    try {
      // Check for duplicates first
      const existingSubscribers = await this.getSubscribers();
      const existingSubscriber = existingSubscribers.find(
        sub => sub.email === subscriberData.email
      );

      if (existingSubscriber) {
        return {
          success: false,
          isDuplicate: true,
          existingSubscriber
        };
      }

      // Add new subscriber
      const subscriber = {
        id: this.generateSubscriberId(),
        ...subscriberData,
        subscribedAt: subscriberData.subscribedAt || new Date().toISOString(),
        status: subscriberData.status || 'active'
      };

      existingSubscribers.push(subscriber);
      await this.saveSubscribers(existingSubscribers);

      return {
        success: true,
        isDuplicate: false,
        subscriber
      };
    } catch (error) {
      throw new Error(`Failed to add subscriber: ${error.message}`);
    }
  }

  async getSubscribers() {
    try {
      await fs.access(this.subscribersFile);
      const encryptedData = await fs.readFile(this.subscribersFile, 'utf-8');
      
      if (!encryptedData.trim()) {
        return [];
      }

      const parsedData = JSON.parse(encryptedData);
      const decryptedData = await this.encryptionManager.decrypt(parsedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw new Error(`Failed to get subscribers: ${error.message}`);
    }
  }

  async getActiveSubscribers() {
    const subscribers = await this.getSubscribers();
    return subscribers.filter(sub => sub.status === 'active');
  }

  async saveSubscribers(subscribers) {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
      
      const dataToEncrypt = JSON.stringify(subscribers, null, 2);
      const encryptedData = await this.encryptionManager.encrypt(dataToEncrypt);
      
      await fs.writeFile(this.subscribersFile, JSON.stringify(encryptedData, null, 2));
    } catch (error) {
      throw new Error(`Failed to save subscribers: ${error.message}`);
    }
  }

  generateSubscriberId() {
    return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async updateSubscriber(id, updates) {
    const subscribers = await this.getSubscribers();
    const index = subscribers.findIndex(sub => sub.id === id);
    
    if (index === -1) {
      throw new Error('Subscriber not found');
    }

    subscribers[index] = { ...subscribers[index], ...updates };
    await this.saveSubscribers(subscribers);
    
    return subscribers[index];
  }

  async removeSubscriber(id) {
    const subscribers = await this.getSubscribers();
    const index = subscribers.findIndex(sub => sub.id === id);
    
    if (index === -1) {
      throw new Error('Subscriber not found');
    }

    const removedSubscriber = subscribers.splice(index, 1)[0];
    await this.saveSubscribers(subscribers);
    
    return removedSubscriber;
  }
}

module.exports = { SubscriberManager };

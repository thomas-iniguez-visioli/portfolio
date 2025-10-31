import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { SubscriberFileManager } from './subscriber-file-manager.js';

describe('SubscriberFileManager', () => {
  let manager;
  const testDataPath = './test-data';
  const testBackupPath = './test-data/backups';

  beforeEach(() => {
    // Clean up test directories
    if (fs.existsSync(testDataPath)) {
      fs.rmSync(testDataPath, { recursive: true, force: true });
    }
    
    manager = new SubscriberFileManager(testDataPath, testBackupPath);
  });

  afterEach(() => {
    // Clean up test directories
    if (fs.existsSync(testDataPath)) {
      fs.rmSync(testDataPath, { recursive: true, force: true });
    }
  });

  it('should initialize with empty subscriber file', async () => {
    const stats = await manager.getStats();
    expect(stats.total).toBe(0);
  });

  it('should add a new subscriber', async () => {
    const subscriberData = {
      email: 'test@example.com',
      source: 'test',
      frequency: 'weekly',
      topics: ['tech', 'news']
    };

    const subscriber = await manager.addSubscriber(subscriberData);
    
    expect(subscriber.id).toBeDefined();
    expect(subscriber.email).toBe('test@example.com');
    expect(subscriber.status).toBe('active');
    expect(subscriber.preferences.frequency).toBe('weekly');
    expect(subscriber.preferences.topics).toEqual(['tech', 'news']);
  });

  it('should prevent duplicate email addresses', async () => {
    const subscriberData = {
      email: 'test@example.com',
      source: 'test'
    };

    await manager.addSubscriber(subscriberData);
    
    await expect(manager.addSubscriber(subscriberData))
      .rejects.toThrow('already exists');
  });

  it('should update existing subscriber', async () => {
    const subscriberData = {
      email: 'test@example.com',
      source: 'test'
    };

    const subscriber = await manager.addSubscriber(subscriberData);
    
    const updated = await manager.updateSubscriber(subscriber.id, {
      status: 'unsubscribed',
      preferences: { frequency: 'monthly' }
    });

    expect(updated.status).toBe('unsubscribed');
    expect(updated.preferences.frequency).toBe('monthly');
  });

  it('should get subscriber by email', async () => {
    const subscriberData = {
      email: 'test@example.com',
      source: 'test'
    };

    await manager.addSubscriber(subscriberData);
    
    const found = await manager.getSubscriberByEmail('test@example.com');
    expect(found).toBeDefined();
    expect(found.email).toBe('test@example.com');
  });

  it('should filter subscribers by status', async () => {
    await manager.addSubscriber({ email: 'active@example.com', source: 'test' });
    
    const subscriber2 = await manager.addSubscriber({ 
      email: 'inactive@example.com', 
      source: 'test' 
    });
    
    await manager.updateSubscriber(subscriber2.id, { status: 'unsubscribed' });
    
    const activeSubscribers = await manager.getSubscribers({ status: 'active' });
    const unsubscribed = await manager.getSubscribers({ status: 'unsubscribed' });
    
    expect(activeSubscribers).toHaveLength(1);
    expect(unsubscribed).toHaveLength(1);
    expect(activeSubscribers[0].email).toBe('active@example.com');
  });

  it('should export subscribers to JSON', async () => {
    await manager.addSubscriber({
      email: 'test1@example.com',
      source: 'test'
    });
    
    await manager.addSubscriber({
      email: 'test2@example.com',
      source: 'test'
    });

    const result = await manager.exportSubscribers('json');
    
    expect(result.format).toBe('json');
    expect(result.filename).toMatch(/subscribers-export-\d{4}-\d{2}-\d{2}\.json/);
    
    const exportedData = JSON.parse(result.data);
    expect(exportedData.subscribers).toHaveLength(2);
    expect(exportedData.count).toBe(2);
  });

  it('should import subscribers from JSON', async () => {
    const importData = {
      subscribers: [
        {
          email: 'import1@example.com',
          status: 'active',
          source: 'import',
          preferences: { frequency: 'weekly', topics: [] }
        },
        {
          email: 'import2@example.com',
          status: 'active',
          source: 'import',
          preferences: { frequency: 'monthly', topics: ['tech'] }
        }
      ]
    };

    const result = await manager.importSubscribers(importData, 'json');
    
    expect(result.imported).toBe(2);
    expect(result.skipped).toBe(0);
    expect(result.errors).toHaveLength(0);

    const stats = await manager.getStats();
    expect(stats.total).toBe(2);
  });

  it('should validate file integrity', async () => {
    await manager.addSubscriber({
      email: 'valid@example.com',
      source: 'test'
    });

    const validation = await manager.validateFile();
    
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
    expect(validation.stats.totalSubscribers).toBe(1);
  });
});
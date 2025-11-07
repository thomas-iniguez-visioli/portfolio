const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/**
 * Encrypted file-based subscriber storage system
 */
class EncryptedSubscriberStorage {
    constructor(config) {
        this.encryptionKey = config.encryptionKey;
        this.storageDir = config.storageDir || '.github/data';
        this.subscribersFile = path.join(this.storageDir, 'subscribers.enc');
        this.backupDir = path.join(this.storageDir, 'backups');
        this.algorithm = 'aes-256-gcm';
        console.log(__dirname)
        // Ensure directories exist
        this.ensureDirectories();
    }
    
    /**
     * Ensure storage directories exist
     */
    ensureDirectories() {
        if (!fs.existsSync(this.storageDir)) {
            fs.mkdirSync(this.storageDir, { recursive: true });
        }
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }
    
    /**
     * Encrypt data using AES-256-GCM
     */
    encrypt(data) {
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipher(this.algorithm, this.encryptionKey);
            cipher.setAAD(Buffer.from('newsletter-subscribers'));
            
            let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
            encrypted += cipher.final('hex');
            
            const authTag = cipher.getAuthTag();
            
            return {
                iv: iv.toString('hex'),
                authTag: authTag.toString('hex'),
                data: encrypted
            };
        } catch (error) {
            throw new Error(`Encryption failed: ${error.message}`);
        }
    }
    
    /**
     * Decrypt data using AES-256-GCM
     */
    decrypt(encryptedData) {
        try {
            const decipher = crypto.createDecipher(this.algorithm, this.encryptionKey);
            decipher.setAAD(Buffer.from('newsletter-subscribers'));
            decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
            
            let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            
            return JSON.parse(decrypted);
        } catch (error) {
            throw new Error(`Decryption failed: ${error.message}`);
        }
    }
    
    /**
     * Load subscribers from encrypted file
     */
    loadSubscribers() {
        try {
            if (!fs.existsSync(this.subscribersFile)) {
                console.log(this)
                console.log('Subscribers file does not exist, starting with empty list');
                return [];
            }
            
            const encryptedContent = fs.readFileSync(this.subscribersFile, 'utf8');
            const encryptedData = JSON.parse(encryptedContent);
            
            const subscribers = this.decrypt(encryptedData);
            console.log(`Loaded ${subscribers.length} subscribers from encrypted storage`);
            
            return subscribers;
        } catch (error) {
            console.error('Failed to load subscribers:', error.message);
            throw new Error(`Failed to load subscribers: ${error.message}`);
        }
    }
    
    /**
     * Save subscribers to encrypted file
     */
    saveSubscribers(subscribers) {
        try {
            // Create backup before saving
            this.createBackup();
            
            const encryptedData = this.encrypt(subscribers);
            const encryptedContent = JSON.stringify(encryptedData, null, 2);
            
            // Write to temporary file first, then rename (atomic operation)
            const tempFile = this.subscribersFile + '.tmp';
            fs.writeFileSync(tempFile, encryptedContent, 'utf8');
            fs.renameSync(tempFile, this.subscribersFile);
            
            console.log(`Saved ${subscribers.length} subscribers to encrypted storage`);
            return true;
        } catch (error) {
            console.error('Failed to save subscribers:', error.message);
            throw new Error(`Failed to save subscribers: ${error.message}`);
        }
    }
    
    /**
     * Create backup of current subscribers file
     */
    createBackup() {
        try {
            if (fs.existsSync(this.subscribersFile)) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const backupFile = path.join(this.backupDir, `subscribers-${timestamp}.enc`);
                fs.copyFileSync(this.subscribersFile, backupFile);
                
                // Keep only last 10 backups
                this.cleanupBackups();
                
                console.log(`Created backup: ${backupFile}`);
            }
        } catch (error) {
            console.warn('Failed to create backup:', error.message);
        }
    }
    
    /**
     * Cleanup old backups (keep only last 10)
     */
    cleanupBackups() {
        try {
            const backupFiles = fs.readdirSync(this.backupDir)
                .filter(file => file.startsWith('subscribers-') && file.endsWith('.enc'))
                .map(file => ({
                    name: file,
                    path: path.join(this.backupDir, file),
                    mtime: fs.statSync(path.join(this.backupDir, file)).mtime
                }))
                .sort((a, b) => b.mtime - a.mtime);
            
            // Remove old backups (keep only 10 most recent)
            if (backupFiles.length > 10) {
                const filesToDelete = backupFiles.slice(10);
                filesToDelete.forEach(file => {
                    fs.unlinkSync(file.path);
                    console.log(`Deleted old backup: ${file.name}`);
                });
            }
        } catch (error) {
            console.warn('Failed to cleanup backups:', error.message);
        }
    }
    
    /**
     * Add new subscriber
     */
    addSubscriber(subscriberData) {
        try {
            const subscribers = this.loadSubscribers();
            
            // Check for duplicates
            const existingSubscriber = subscribers.find(sub => sub.email === subscriberData.email);
            if (existingSubscriber) {
                return {
                    success: false,
                    error: 'duplicate',
                    message: 'Email already subscribed',
                    existingSubscriber
                };
            }
            
            // Create new subscriber record
            const newSubscriber = {
                id: crypto.randomUUID(),
                email: subscriberData.email,
                frequency: subscriberData.frequency,
                format: subscriberData.format,
                topics: subscriberData.topics || [],
                additionalInfo: subscriberData.additionalInfo || '',
                subscribedAt: new Date().toISOString(),
                status: 'active',
                source: 'github-issue',
                issueNumber: subscriberData.issueNumber,
                ipAddress: null, // Not available in GitHub Actions
                userAgent: null  // Not available in GitHub Actions
            };
            
            // Add to subscribers list
            subscribers.push(newSubscriber);
            
            // Save updated list
            this.saveSubscribers(subscribers);
            
            console.log(`Added new subscriber: ${subscriberData.email}`);
            
            return {
                success: true,
                subscriber: newSubscriber,
                message: 'Subscriber added successfully'
            };
            
        } catch (error) {
            console.error('Failed to add subscriber:', error.message);
            return {
                success: false,
                error: 'storage_error',
                message: `Failed to add subscriber: ${error.message}`
            };
        }
    }
    
    /**
     * Get subscriber by email
     */
    getSubscriber(email) {
        try {
            const subscribers = this.loadSubscribers();
            const subscriber = subscribers.find(sub => sub.email === email);
            
            return subscriber || null;
        } catch (error) {
            console.error('Failed to get subscriber:', error.message);
            return null;
        }
    }
    
    /**
     * Get all subscribers
     */
    getAllSubscribers() {
        try {
            return this.loadSubscribers();
        } catch (error) {
            console.error('Failed to get all subscribers:', error.message);
            return [];
        }
    }
    
    /**
     * Update subscriber status
     */
    updateSubscriberStatus(email, status) {
        try {
            const subscribers = this.loadSubscribers();
            const subscriberIndex = subscribers.findIndex(sub => sub.email === email);
            
            if (subscriberIndex === -1) {
                return {
                    success: false,
                    error: 'not_found',
                    message: 'Subscriber not found'
                };
            }
            
            subscribers[subscriberIndex].status = status;
            subscribers[subscriberIndex].updatedAt = new Date().toISOString();
            
            this.saveSubscribers(subscribers);
            
            console.log(`Updated subscriber status: ${email} -> ${status}`);
            
            return {
                success: true,
                subscriber: subscribers[subscriberIndex],
                message: 'Subscriber status updated'
            };
            
        } catch (error) {
            console.error('Failed to update subscriber status:', error.message);
            return {
                success: false,
                error: 'storage_error',
                message: `Failed to update subscriber: ${error.message}`
            };
        }
    }
    
    /**
     * Get subscriber statistics
     */
    getStatistics() {
        try {
            const subscribers = this.loadSubscribers();
            
            const stats = {
                total: subscribers.length,
                active: subscribers.filter(sub => sub.status === 'active').length,
                unsubscribed: subscribers.filter(sub => sub.status === 'unsubscribed').length,
                bounced: subscribers.filter(sub => sub.status === 'bounced').length,
                byFrequency: {},
                byFormat: {},
                bySource: {},
                recentSubscriptions: subscribers
                    .filter(sub => {
                        const subDate = new Date(sub.subscribedAt);
                        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                        return subDate > weekAgo;
                    }).length
            };
            
            // Count by frequency
            subscribers.forEach(sub => {
                stats.byFrequency[sub.frequency] = (stats.byFrequency[sub.frequency] || 0) + 1;
                stats.byFormat[sub.format] = (stats.byFormat[sub.format] || 0) + 1;
                stats.bySource[sub.source] = (stats.bySource[sub.source] || 0) + 1;
            });
            
            return stats;
        } catch (error) {
            console.error('Failed to get statistics:', error.message);
            return null;
        }
    }
}

module.exports = EncryptedSubscriberStorage;
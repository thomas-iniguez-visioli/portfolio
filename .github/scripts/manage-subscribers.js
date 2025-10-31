const EncryptedSubscriberStorage = require('./encrypted-storage');

/**
 * Manage subscribers using encrypted storage
 */
async function manageSubscribers() {
    try {
        // Get configuration from environment variables
        const config = {
            encryptionKey: process.env.ENCRYPTION_KEY,
            storageDir: process.env.STORAGE_DIR || '.github/data'
        };
        
        // Validate required configuration
        if (!config.encryptionKey) {
            throw new Error('ENCRYPTION_KEY environment variable is required');
        }
        
        // Initialize storage
        const storage = new EncryptedSubscriberStorage(config);
        
        // Get operation type
        const operation = process.env.OPERATION || 'add';
        
        console.log(`Starting subscriber management operation: ${operation}`);
        
        switch (operation) {
            case 'add':
                await addSubscriber(storage);
                break;
                
            case 'get':
                await getSubscriber(storage);
                break;
                
            case 'list':
                await listSubscribers(storage);
                break;
                
            case 'stats':
                await getStatistics(storage);
                break;
                
            case 'update-status':
                await updateSubscriberStatus(storage);
                break;
                
            default:
                throw new Error(`Unknown operation: ${operation}`);
        }
        
        console.log('✅ Subscriber management operation completed successfully');
        process.exit(0);
        
    } catch (error) {
        console.error('💥 Subscriber management failed:', error.message);
        process.exit(1);
    }
}

/**
 * Add new subscriber
 */
async function addSubscriber(storage) {
    const subscriberData = {
        email: process.env.SUBSCRIBER_EMAIL,
        frequency: process.env.SUBSCRIBER_FREQUENCY,
        format: process.env.SUBSCRIBER_FORMAT,
        topics: process.env.SUBSCRIBER_TOPICS ? JSON.parse(process.env.SUBSCRIBER_TOPICS) : [],
        additionalInfo: process.env.SUBSCRIBER_ADDITIONAL_INFO || '',
        issueNumber: parseInt(process.env.ISSUE_NUMBER)
    };
    
    // Validate required fields
    if (!subscriberData.email) {
        throw new Error('SUBSCRIBER_EMAIL is required');
    }
    
    console.log('Adding subscriber:', {
        email: subscriberData.email,
        frequency: subscriberData.frequency,
        format: subscriberData.format,
        topics: subscriberData.topics.length,
        issueNumber: subscriberData.issueNumber
    });
    
    const result = storage.addSubscriber(subscriberData);
    
    if (result.success) {
        console.log('✅ Subscriber added successfully:', result.subscriber.id);
        
        // Set outputs for GitHub Actions
        console.log(`::set-output name=subscriber_id::${result.subscriber.id}`);
        console.log(`::set-output name=subscriber_added::true`);
        console.log(`::set-output name=is_duplicate::false`);
        
    } else if (result.error === 'duplicate') {
        console.log('⚠️ Subscriber already exists:', result.existingSubscriber.id);
        
        // Set outputs for GitHub Actions
        console.log(`::set-output name=subscriber_id::${result.existingSubscriber.id}`);
        console.log(`::set-output name=subscriber_added::false`);
        console.log(`::set-output name=is_duplicate::true`);
        console.log(`::set-output name=existing_subscriber::${JSON.stringify(result.existingSubscriber)}`);
        
    } else {
        throw new Error(result.message);
    }
}

/**
 * Get subscriber by email
 */
async function getSubscriber(storage) {
    const email = process.env.SUBSCRIBER_EMAIL;
    
    if (!email) {
        throw new Error('SUBSCRIBER_EMAIL is required');
    }
    
    console.log('Getting subscriber:', email);
    
    const subscriber = storage.getSubscriber(email);
    
    if (subscriber) {
        console.log('✅ Subscriber found:', {
            id: subscriber.id,
            email: subscriber.email,
            status: subscriber.status,
            subscribedAt: subscriber.subscribedAt
        });
        
        // Set outputs for GitHub Actions
        console.log(`::set-output name=subscriber_found::true`);
        console.log(`::set-output name=subscriber_data::${JSON.stringify(subscriber)}`);
        
    } else {
        console.log('⚠️ Subscriber not found');
        
        // Set outputs for GitHub Actions
        console.log(`::set-output name=subscriber_found::false`);
    }
}

/**
 * List all subscribers
 */
async function listSubscribers(storage) {
    console.log('Listing all subscribers...');
    
    const subscribers = storage.getAllSubscribers();
    
    console.log(`Found ${subscribers.length} subscribers:`);
    
    subscribers.forEach((subscriber, index) => {
        console.log(`${index + 1}. ${subscriber.email} (${subscriber.status}) - ${subscriber.subscribedAt}`);
    });
    
    // Set outputs for GitHub Actions
    console.log(`::set-output name=subscriber_count::${subscribers.length}`);
    console.log(`::set-output name=subscribers::${JSON.stringify(subscribers)}`);
}

/**
 * Get subscriber statistics
 */
async function getStatistics(storage) {
    console.log('Getting subscriber statistics...');
    
    const stats = storage.getStatistics();
    
    if (stats) {
        console.log('📊 Subscriber Statistics:');
        console.log(`Total: ${stats.total}`);
        console.log(`Active: ${stats.active}`);
        console.log(`Unsubscribed: ${stats.unsubscribed}`);
        console.log(`Bounced: ${stats.bounced}`);
        console.log(`Recent (7 days): ${stats.recentSubscriptions}`);
        
        console.log('By Frequency:', stats.byFrequency);
        console.log('By Format:', stats.byFormat);
        console.log('By Source:', stats.bySource);
        
        // Set outputs for GitHub Actions
        console.log(`::set-output name=total_subscribers::${stats.total}`);
        console.log(`::set-output name=active_subscribers::${stats.active}`);
        console.log(`::set-output name=recent_subscribers::${stats.recentSubscriptions}`);
        console.log(`::set-output name=statistics::${JSON.stringify(stats)}`);
        
    } else {
        throw new Error('Failed to get statistics');
    }
}

/**
 * Update subscriber status
 */
async function updateSubscriberStatus(storage) {
    const email = process.env.SUBSCRIBER_EMAIL;
    const status = process.env.NEW_STATUS;
    
    if (!email || !status) {
        throw new Error('SUBSCRIBER_EMAIL and NEW_STATUS are required');
    }
    
    console.log('Updating subscriber status:', { email, status });
    
    const result = storage.updateSubscriberStatus(email, status);
    
    if (result.success) {
        console.log('✅ Subscriber status updated successfully');
        
        // Set outputs for GitHub Actions
        console.log(`::set-output name=status_updated::true`);
        console.log(`::set-output name=updated_subscriber::${JSON.stringify(result.subscriber)}`);
        
    } else {
        throw new Error(result.message);
    }
}

// Run if called directly
if (require.main === module) {
    manageSubscribers();
}

module.exports = {
    manageSubscribers,
    addSubscriber,
    getSubscriber,
    listSubscribers,
    getStatistics,
    updateSubscriberStatus
};
/**
 * Send Discord webhook notification for newsletter subscription
 */
async function sendDiscordNotification(subscriptionData, config) {
    const { email, frequency, format, topics, issueNumber, createdAt } = subscriptionData;
    
    console.log('Sending Discord notification for new subscriber');
    
    try {
        // Create formatted message
        const timestamp = new Date().toISOString();
        const subscribedDate = new Date(createdAt).toLocaleDateString();
        const topicsList = Array.isArray(topics) ? topics.join(', ') : topics || 'None specified';
        
        // Create Discord embed
        const embed = {
            title: "📧 New Newsletter Subscriber",
            description: "A new user has subscribed to the newsletter!",
            color: 0x00ff41, // Matrix green
            fields: [
                {
                    name: "📧 Email",
                    value: `\`${email}\``,
                    inline: true
                },
                {
                    name: "⏰ Frequency",
                    value: frequency,
                    inline: true
                },
                {
                    name: "📄 Format",
                    value: format,
                    inline: true
                },
                {
                    name: "🏷️ Topics",
                    value: topicsList,
                    inline: false
                },
                {
                    name: "📅 Subscribed",
                    value: subscribedDate,
                    inline: true
                },
                {
                    name: "🔗 Issue",
                    value: `[#${issueNumber}](${config.issueUrl})`,
                    inline: true
                }
            ],
            footer: {
                text: "Newsletter Subscription System",
                icon_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            },
            timestamp: timestamp
        };
        
        // Prepare Discord payload
        const payload = {
            content: "🎯 **New Newsletter Subscription**",
            embeds: [embed],
            username: config.botName || "Newsletter Bot",
            avatar_url: config.botAvatar || "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        };
        
        console.log('Discord payload prepared:', {
            content: payload.content,
            embedTitle: embed.title,
            fields: embed.fields.length
        });
        
        // Send to Discord webhook
        const response = await fetch(config.discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Discord webhook error: ${response.status} - ${errorText}`);
        }
        
        console.log('✅ Discord notification sent successfully');
        
        return {
            success: true,
            message: 'Discord notification sent successfully'
        };
        
    } catch (error) {
        console.error('❌ Failed to send Discord notification:', error.message);
        
        return {
            success: false,
            error: error.message,
            message: 'Failed to send Discord notification'
        };
    }
}

/**
 * Send Discord notification with retry logic
 */
async function sendDiscordNotificationWithRetry(subscriptionData, config, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`Attempt ${attempt}/${maxRetries} to send Discord notification`);
        
        try {
            const result = await sendDiscordNotification(subscriptionData, config);
            
            if (result.success) {
                return result;
            }
            
            lastError = result.error;
            
            // Wait before retry (exponential backoff)
            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
                console.log(`Waiting ${delay}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
        } catch (error) {
            lastError = error.message;
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt) * 1000;
                console.log(`Waiting ${delay}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    return {
        success: false,
        error: lastError,
        message: `Failed to send Discord notification after ${maxRetries} attempts`
    };
}

/**
 * Send error notification to Discord
 */
async function sendDiscordErrorNotification(errorData, config) {
    console.log('Sending Discord error notification');
    
    try {
        const timestamp = new Date().toISOString();
        
        // Create error embed
        const embed = {
            title: "❌ Newsletter Subscription Error",
            description: "A newsletter subscription failed processing",
            color: 0xff0000, // Red
            fields: [
                {
                    name: "📧 Email",
                    value: errorData.email || 'Unknown',
                    inline: true
                },
                {
                    name: "🔗 Issue",
                    value: `[#${errorData.issueNumber}](${config.issueUrl})`,
                    inline: true
                },
                {
                    name: "❌ Errors",
                    value: Array.isArray(errorData.errors) ? errorData.errors.join('\n') : errorData.errors || 'Unknown error',
                    inline: false
                }
            ],
            footer: {
                text: "Newsletter Subscription System",
                icon_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            },
            timestamp: timestamp
        };
        
        const payload = {
            content: "⚠️ **Newsletter Subscription Failed**",
            embeds: [embed],
            username: config.botName || "Newsletter Bot",
            avatar_url: config.botAvatar || "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        };
        
        const response = await fetch(config.discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Discord webhook error: ${response.status} - ${errorText}`);
        }
        
        console.log('✅ Discord error notification sent successfully');
        return { success: true };
        
    } catch (error) {
        console.error('❌ Failed to send Discord error notification:', error.message);
        return { success: false, error: error.message };
    }
}

// Main execution
async function main() {
    try {
        // Get configuration from environment variables
        const config = {
            discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
            botName: process.env.DISCORD_BOT_NAME || 'Newsletter Bot',
            botAvatar: process.env.DISCORD_BOT_AVATAR,
            issueUrl: process.env.ISSUE_URL
        };
        
        // Validate required configuration
        if (!config.discordWebhookUrl) {
            console.log('⚠️ DISCORD_WEBHOOK_URL not configured, skipping Discord notification');
            process.exit(0);
        }
        
        // Get notification type
        const notificationType = process.env.NOTIFICATION_TYPE || 'success';
        
        if (notificationType === 'error') {
            // Handle error notification
            const errorData = {
                email: process.env.SUBSCRIBER_EMAIL,
                issueNumber: parseInt(process.env.ISSUE_NUMBER),
                errors: process.env.VALIDATION_ERRORS
            };
            
            console.log('Sending Discord error notification...');
            const result = await sendDiscordErrorNotification(errorData, config);
            
            if (result.success) {
                console.log('🎉 Discord error notification sent successfully');
                process.exit(0);
            } else {
                console.error('💥 Failed to send Discord error notification');
                process.exit(1);
            }
            
        } else {
            // Handle success notification
            const subscriptionData = {
                email: process.env.SUBSCRIBER_EMAIL,
                frequency: process.env.SUBSCRIBER_FREQUENCY,
                format: process.env.SUBSCRIBER_FORMAT,
                topics: process.env.SUBSCRIBER_TOPICS,
                issueNumber: parseInt(process.env.ISSUE_NUMBER),
                createdAt: process.env.ISSUE_CREATED_AT
            };
            
            console.log('Starting Discord notification process...');
            console.log('Configuration:', {
                hasWebhookUrl: !!config.discordWebhookUrl,
                botName: config.botName,
                issueUrl: config.issueUrl
            });
            
            // Send Discord notification with retry logic
            const result = await sendDiscordNotificationWithRetry(subscriptionData, config);
            
            if (result.success) {
                console.log('🎉 Discord notification process completed successfully');
                process.exit(0);
            } else {
                console.error('💥 Discord notification process failed:', result.message);
                process.exit(1);
            }
        }
        
    } catch (error) {
        console.error('💥 Fatal error in Discord notification process:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    sendDiscordNotification,
    sendDiscordNotificationWithRetry,
    sendDiscordErrorNotification
};
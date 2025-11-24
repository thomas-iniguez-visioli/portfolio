const fs = require('fs');
const path = require('path');

/**
 * Send welcome email using Resend API
 */
async function sendWelcomeEmail(subscriptionData, config) {
    const { email, frequency, format, topics, issueNumber, createdAt } = subscriptionData;
    
    console.log(`Sending welcome email to: ${email}`);
    
    try {
        // Load email templates
        const templateDir = path.join(__dirname, '..', 'email-templates');
        const htmlTemplate = fs.readFileSync(path.join(templateDir, 'welcome.html'), 'utf8');
        const textTemplate = fs.readFileSync(path.join(templateDir, 'welcome.txt'), 'utf8');
        
        // Template variables
        const templateVars = {
            email: email,
            frequency: frequency,
            format: format,
            topics: Array.isArray(topics) ? topics.join(', ') : topics,
            issueNumber: issueNumber,
            subscribedAt: new Date(createdAt).toLocaleDateString(),
            portfolioUrl: config.portfolioUrl || 'https://thomas-iniguez-visioli.github.io/',
            unsubscribeUrl: config.unsubscribeUrl || 'https://thomas-iniguez-visioli.github.io/unsubscribe',
            contactUrl: config.contactUrl || 'https://thomas-iniguez-visioli.github.io/contact'
        };
        
        // Replace template variables
        let htmlContent = htmlTemplate;
        let textContent = textTemplate;
        
        Object.entries(templateVars).forEach(([key, value]) => {
            const placeholder = `{{${key}}}`;
            htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value);
            textContent = textContent.replace(new RegExp(placeholder, 'g'), value);
        });
        
        // Prepare email payload
        const emailPayload = {
            from: config.fromEmail || 'Acme <news@arbinger.is-a.dev',
            to: email,
            subject: '🎯 Welcome to Our Newsletter - Subscription Confirmed',
            html: htmlContent,
            text: textContent,
            tags: [
                { name: 'type', value: 'welcome' },
                { name: 'source', value: 'github-issue' },
                { name: 'issue', value: issueNumber.toString() }
            ]
        };
        
        console.log('Email payload prepared:', {
            to: emailPayload.to,
            subject: emailPayload.subject,
            tags: emailPayload.tags
        });
        
        // Send email via Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailPayload)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(`Resend API error: ${response.status} - ${JSON.stringify(result)}`);
        }
        
        console.log('✅ Welcome email sent successfully:', {
            id: result.id,
            to: email,
            status: 'sent'
        });
        
        return {
            success: true,
            emailId: result.id,
            message: 'Welcome email sent successfully'
        };
        
    } catch (error) {
        console.error('❌ Failed to send welcome email:', error.message);
        
        return {
            success: false,
            error: error.message,
            message: 'Failed to send welcome email'
        };
    }
}

/**
 * Retry logic for email sending
 */
async function sendWelcomeEmailWithRetry(subscriptionData, config, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`Attempt ${attempt}/${maxRetries} to send welcome email`);
        
        try {
            const result = await sendWelcomeEmail(subscriptionData, config);
            
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
        message: `Failed to send welcome email after ${maxRetries} attempts`
    };
}

// Main execution
async function main() {
    try {
        // Get configuration from environment variables
        const config = {
            resendApiKey: process.env.RESEND_API_KEY,
            fromEmail: process.env.FROM_EMAIL || 'newsletter <news@arbinger.is-a.dev>',
            portfolioUrl: process.env.PORTFOLIO_URL || 'https://thomas-iniguez-visioli.github.io/',
            unsubscribeUrl: process.env.UNSUBSCRIBE_URL || 'https://thomas-iniguez-visioli.github.io/unsubscribe',
            contactUrl: process.env.CONTACT_URL || 'https://thomas-iniguez-visioli.github.io/contact'
        };
        
        // Validate required configuration
        if (!config.resendApiKey) {
            throw new Error('RESEND_API_KEY environment variable is required');
        }
        
        // Get subscription data from environment variables
        const subscriptionData = {
            email: process.env.SUBSCRIBER_EMAIL,
            frequency: process.env.SUBSCRIBER_FREQUENCY,
            format: process.env.SUBSCRIBER_FORMAT,
            topics: process.env.SUBSCRIBER_TOPICS,
            issueNumber: parseInt(process.env.ISSUE_NUMBER),
            createdAt: process.env.ISSUE_CREATED_AT
        };
        
        // Validate subscription data
        if (!subscriptionData.email) {
            throw new Error('SUBSCRIBER_EMAIL environment variable is required');
        }
        
        console.log('Starting welcome email process...');
        console.log('Configuration:', {
            fromEmail: config.fromEmail,
            portfolioUrl: config.portfolioUrl,
            hasApiKey: !!config.resendApiKey
        });
        
        // Send welcome email with retry logic
        const result = await sendWelcomeEmailWithRetry(subscriptionData, config);
        
        if (result.success) {
            console.log('🎉 Welcome email process completed successfully');
            process.exit(0);
        } else {
            console.error('💥 Welcome email process failed:', result.message);
            process.exit(1);
        }
        
    } catch (error) {
        console.error('💥 Fatal error in welcome email process:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    sendWelcomeEmail,
    sendWelcomeEmailWithRetry
};

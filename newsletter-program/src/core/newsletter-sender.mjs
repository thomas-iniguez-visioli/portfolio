import fetch from 'node-fetch';
import { htmlToText as convertHtmlToText } from 'html-to-text';
export class NewsletterSender {
  constructor(dataDir = './data') {
    this.dataDir = dataDir;
    this.resendClient = null;
    this.apiKey = process.env.RESEND_API_KEY;
    this.fromEmail ='newsletter <news@arbinger.is-a.dev>';
  }

  async sendToSubscribers(subscribers, subject, content, options = {}) {
    const results = {
      sent: 0,
      failed: 0,
      errors: []
    };

    for (const subscriber of subscribers) {
      try {
        const result = await this.sendToSubscriber(subscriber, subject, content, options);
        if (result.success) {
          results.sent++;
        } else {
          results.failed++;
          results.errors.push({
            email: subscriber.email,
            error: result.error
          });
        }
      } catch (error) {
        results.failed++;
        results.errors.push({
          email: subscriber.email,
          error: error.message
        });
      }
    }

    return results;
  }

  async sendToSubscriber(subscriber, subject, content, options = {}) {
    try {
      // Personalize content if needed
      const personalizedContent = this.personalizeContent(content, subscriber);
      const personalizedSubject = this.personalizeSubject(subject, subscriber);

      const emailData = {
        from: this.fromEmail,
        to: subscriber.email,
         replyTo: 'admin@arbinger.is-a.dev',
        subject: personalizedSubject,
        html: personalizedContent
      };
      subscriber.format=subscriber.format||"html"
      // Add text version if subscriber prefers text format
      if (subscriber.format === 'Text') {
        emailData.text = this.htmlToText(personalizedContent);
      }

      const result = await this.sendEmail(emailData);
      
      return {
        success: true,
        messageId: result.id,
        subscriber: subscriber.email
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        subscriber: subscriber.email
      };
    }
  }

  async sendEmail(emailData) {
    if (this.resendClient && this.resendClient.sendEmail) {
      // Use mock client for testing
      return await this.resendClient.sendEmail(emailData);
    }

    if (!this.apiKey) {
      throw new Error('Resend API key not configured');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Resend API error: ${error.message || response.statusText}`);
    }

    return await response.json();
  }

  async sendWithRetry(subscriber, subject, content, options = {}) {
    const maxRetries = options.maxRetries || 3;
    const retryDelay = options.retryDelay || 1000;
    let attempts = 0;
    let lastError;

    while (attempts < maxRetries) {
      attempts++;
      
      try {
        const result = await this.sendToSubscriber(subscriber, subject, content, options);
        if (result.success) {
          return {
            success: true,
            attempts,
            messageId: result.messageId
          };
        }
        lastError = result.error;
      } catch (error) {
        lastError = error.message;
      }

      if (attempts < maxRetries) {
        await this.delay(retryDelay * attempts); // Exponential backoff
      }
    }

    return {
      success: false,
      attempts,
      error: lastError
    };
  }

  personalizeContent(content, subscriber) {
    return content
      .replace(/\{\{email\}\}/g, subscriber.email)
      .replace(/\{\{firstName\}\}/g, subscriber.firstName || '')
      .replace(/\{\{lastName\}\}/g, subscriber.lastName || '')
      .replace(/\{\{frequency\}\}/g, subscriber.frequency || '')
      .replace(/\{\{unsubscribeUrl\}\}/g, this.generateUnsubscribeUrl(subscriber));
  }

  personalizeSubject(subject, subscriber) {
    return subject
      .replace(/\{\{firstName\}\}/g, subscriber.firstName || '')
      .replace(/\{\{lastName\}\}/g, subscriber.lastName || '');
  }

  htmlToText(html) {
    // Use html-to-text library for robust sanitization
    return convertHtmlToText(html, {
      wordwrap: false,
      selectors: [
        { selector: 'a', options: { ignoreHref: true } }
      ]
    }).trim();
  }

  generateUnsubscribeUrl(subscriber) {
    const baseUrl = process.env.UNSUBSCRIBE_URL || 'https://example.com/unsubscribe';
    return `${baseUrl}?token=${this.generateUnsubscribeToken(subscriber)}`;
  }

  generateUnsubscribeToken(subscriber) {
    // Simple token generation - in production, use proper JWT or similar
    return Buffer.from(`${subscriber.id}:${subscriber.email}`).toString('base64');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async validateEmailAddress(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async getDeliveryStats(messageId) {
    if (!this.apiKey) {
      throw new Error('Resend API key not configured');
    }

    const response = await fetch(`https://api.resend.com/emails/${messageId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get delivery stats: ${response.statusText}`);
    }

    return await response.json();
  }
}

const { htmlToText: convertHtmlToText } = require('html-to-text');
const sleep=async(ms)=>{
  return new Promise(r=>setTimeout(r, ms))}
const humantimems=(string)=>{
  const regex=/(\d+(?:\.\d+)?)\s*(ms|seconds?|mins?|hours?|days?)/;
  const match=string.match(regex);
  if(!match)return 0;
  const [,value,unit]=match;
  const num=parseFloat(value);
  switch(unit){
    case'ms':return num;
    case'second':case'seconds':return num*1000;
    case'min':case'mins':return num*60*1000;
    case'hour':case'hours':return num*60*60*1000;
    case'day':case'days':return num*24*60*60*1000;
    default:return 0;
  }
}
class NewsletterSender {
  constructor(dataDir = './data') {
    this.dataDir = dataDir;
    this.resendClient = null;
    this.apiKey = process.env.RESEND_API_KEY;
    this.fromEmail = process.env.FROM_EMAIL || 'newsletter <news@arbinger.is-a.dev>';
  }

  async sendToSubscribers(subscribers, subject, content, options = {}) {
    const results = {
      sent: 0,
      failed: 0,
      errors: []
    };

    for (let i = 0; i < subscribers.length; i++) {
      const subscriber = subscribers[i];
      
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

      // Pause d'une seconde entre chaque envoi (sauf après le dernier)
      if (i < subscribers.length - 1) {
        await sleep(1000);
      }
    }

    return results;
  }

  async sendToSubscriber(subscriber, subject, content, options = {}) {
    console.log(subscriber)
    try {
      // Personalize content if needed
      const personalizedContent = this.personalizeContent(content, subscriber);
      const personalizedSubject = this.personalizeSubject(subject, subscriber);

      const emailData = {
        from: this.fromEmail,
        to: subscriber.email,
        replyTo: process.env.REPLY_TO_EMAIL || 'admin@arbinger.is-a.dev',
        subject: personalizedSubject,
        html: personalizedContent
      };
      
      subscriber.format = subscriber.format || "html";
      
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

    // Using global fetch (available in Node 18+)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Resend API error: ${result.message || response.statusText}`);
    }

    return result;
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

module.exports = { NewsletterSender };

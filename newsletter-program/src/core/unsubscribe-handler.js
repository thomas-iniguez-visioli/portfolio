import crypto from 'crypto';
import { SubscriberFileManager } from './subscriber-file-manager.js';
import { NewsletterSender } from './newsletter-sender.mjs';

/**
 * Handles unsubscribe requests and preference management
 */
export class UnsubscribeHandler {
  constructor() {
    this.subscriberManager = new SubscriberFileManager();
    this.newsletterSender = new NewsletterSender();
    this.secret = process.env.UNSUBSCRIBE_SECRET || 'default-secret-change-me';
  }

  /**
   * Generate secure unsubscribe token
   */
  generateToken(subscriberId, email) {
    return crypto.createHmac('sha256', this.secret)
      .update(`${subscriberId}:${email}`)
      .digest('hex')
      .substring(0, 16);
  }

  /**
   * Verify unsubscribe token
   */
  verifyToken(subscriberId, email, token) {
    const expectedToken = this.generateToken(subscriberId, email);
    return crypto.timingSafeEqual(
      Buffer.from(token, 'hex'),
      Buffer.from(expectedToken, 'hex')
    );
  }

  /**
   * Process unsubscribe request
   */
  async processUnsubscribe(subscriberId, token, reason = null) {
    try {
      // Get subscriber
      const subscriber = await this.subscriberManager.getSubscriber(subscriberId);
      if (!subscriber) {
        return {
          success: false,
          error: 'Subscriber not found'
        };
      }

      // Verify token
      if (!this.verifyToken(subscriberId, subscriber.email, token)) {
        return {
          success: false,
          error: 'Invalid unsubscribe token'
        };
      }

      // Check if already unsubscribed
      if (subscriber.status === 'unsubscribed') {
        return {
          success: true,
          message: 'Already unsubscribed',
          subscriber: subscriber
        };
      }

      // Update subscriber status
      const updatedSubscriber = await this.subscriberManager.updateSubscriber(subscriberId, {
        status: 'unsubscribed',
        unsubscribedAt: new Date().toISOString(),
        unsubscribeReason: reason,
        unsubscribeMethod: 'link'
      });

      // Send confirmation email
      try {
        await this.newsletterSender.sendUnsubscribeConfirmation(updatedSubscriber);
      } catch (emailError) {
        console.warn('Failed to send unsubscribe confirmation email:', emailError.message);
        // Don't fail the unsubscribe process if email fails
      }

      return {
        success: true,
        message: 'Successfully unsubscribed',
        subscriber: updatedSubscriber
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Update subscriber preferences
   */
  async updatePreferences(subscriberId, token, preferences) {
    try {
      // Get subscriber
      const subscriber = await this.subscriberManager.getSubscriber(subscriberId);
      if (!subscriber) {
        return {
          success: false,
          error: 'Subscriber not found'
        };
      }

      // Verify token
      if (!this.verifyToken(subscriberId, subscriber.email, token)) {
        return {
          success: false,
          error: 'Invalid token'
        };
      }

      // Validate preferences
      const validatedPreferences = this.validatePreferences(preferences);
      if (!validatedPreferences.valid) {
        return {
          success: false,
          error: validatedPreferences.error
        };
      }

      // Update preferences
      const updatedSubscriber = await this.subscriberManager.updateSubscriber(subscriberId, {
        preferences: {
          ...subscriber.preferences,
          ...validatedPreferences.preferences
        },
        preferencesUpdatedAt: new Date().toISOString()
      });

      return {
        success: true,
        message: 'Preferences updated successfully',
        subscriber: updatedSubscriber
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Validate preference updates
   */
  validatePreferences(preferences) {
    const validFrequencies = ['weekly', 'monthly', 'daily'];
    const result = {
      valid: true,
      preferences: {},
      error: null
    };

    if (preferences.frequency) {
      if (!validFrequencies.includes(preferences.frequency)) {
        return {
          valid: false,
          error: `Invalid frequency. Must be one of: ${validFrequencies.join(', ')}`
        };
      }
      result.preferences.frequency = preferences.frequency;
    }

    if (preferences.topics) {
      if (!Array.isArray(preferences.topics)) {
        return {
          valid: false,
          error: 'Topics must be an array'
        };
      }
      
      // Validate and sanitize topics
      const sanitizedTopics = preferences.topics
        .filter(topic => typeof topic === 'string' && topic.trim().length > 0)
        .map(topic => topic.trim().toLowerCase())
        .slice(0, 10); // Limit to 10 topics
      
      result.preferences.topics = sanitizedTopics;
    }

    return result;
  }

  /**
   * Resubscribe a previously unsubscribed user
   */
  async resubscribe(subscriberId, token) {
    try {
      // Get subscriber
      const subscriber = await this.subscriberManager.getSubscriber(subscriberId);
      if (!subscriber) {
        return {
          success: false,
          error: 'Subscriber not found'
        };
      }

      // Verify token
      if (!this.verifyToken(subscriberId, subscriber.email, token)) {
        return {
          success: false,
          error: 'Invalid token'
        };
      }

      // Check if already active
      if (subscriber.status === 'active') {
        return {
          success: true,
          message: 'Already subscribed',
          subscriber: subscriber
        };
      }

      // Reactivate subscription
      const updatedSubscriber = await this.subscriberManager.updateSubscriber(subscriberId, {
        status: 'active',
        resubscribedAt: new Date().toISOString(),
        unsubscribedAt: null,
        unsubscribeReason: null
      });

      // Send welcome back email
      try {
        await this.newsletterSender.sendWelcomeEmail(updatedSubscriber);
      } catch (emailError) {
        console.warn('Failed to send welcome back email:', emailError.message);
      }

      return {
        success: true,
        message: 'Successfully resubscribed',
        subscriber: updatedSubscriber
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get subscriber preferences (for preference management page)
   */
  async getPreferences(subscriberId, token) {
    try {
      // Get subscriber
      const subscriber = await this.subscriberManager.getSubscriber(subscriberId);
      if (!subscriber) {
        return {
          success: false,
          error: 'Subscriber not found'
        };
      }

      // Verify token
      if (!this.verifyToken(subscriberId, subscriber.email, token)) {
        return {
          success: false,
          error: 'Invalid token'
        };
      }

      return {
        success: true,
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          status: subscriber.status,
          preferences: subscriber.preferences,
          subscribedAt: subscriber.subscribedAt
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate unsubscribe statistics
   */
  async getUnsubscribeStats(startDate = null, endDate = null) {
    try {
      const allSubscribers = await this.subscriberManager.getSubscribers();
      
      let unsubscribed = allSubscribers.filter(sub => sub.status === 'unsubscribed');
      
      // Filter by date range if provided
      if (startDate || endDate) {
        unsubscribed = unsubscribed.filter(sub => {
          if (!sub.unsubscribedAt) return false;
          
          const unsubDate = new Date(sub.unsubscribedAt);
          
          if (startDate && unsubDate < new Date(startDate)) return false;
          if (endDate && unsubDate > new Date(endDate)) return false;
          
          return true;
        });
      }

      // Group by reason
      const reasonStats = {};
      unsubscribed.forEach(sub => {
        const reason = sub.unsubscribeReason || 'not-specified';
        reasonStats[reason] = (reasonStats[reason] || 0) + 1;
      });

      return {
        total: unsubscribed.length,
        byReason: reasonStats,
        recentUnsubscribes: unsubscribed
          .filter(sub => {
            const unsubDate = new Date(sub.unsubscribedAt);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return unsubDate > weekAgo;
          }).length
      };

    } catch (error) {
      console.error('Failed to get unsubscribe stats:', error);
      return {
        total: 0,
        byReason: {},
        recentUnsubscribes: 0,
        error: error.message
      };
    }
  }
}
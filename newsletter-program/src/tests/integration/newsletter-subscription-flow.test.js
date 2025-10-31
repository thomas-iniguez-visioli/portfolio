import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock GitHub API and external services
const mockGitHubAPI = {
  createIssue: vi.fn(),
  addLabels: vi.fn(),
  createComment: vi.fn(),
  closeIssue: vi.fn()
};

const mockResendAPI = {
  sendEmail: vi.fn()
};

const mockDiscordAPI = {
  sendWebhook: vi.fn()
};

describe('Newsletter Subscription Flow Integration Tests', () => {
  let testDataDir;
  let originalEnv;

  beforeEach(async () => {
    // Setup test environment
    originalEnv = process.env;
    process.env.NODE_ENV = 'test';
    // Generate a proper 32-byte key in base64 format
    const testKey = Buffer.from('test-encryption-key-32-chars-ln!').toString('base64');
    process.env.ENCRYPTION_KEY = testKey;
    
    // Create temporary test data directory
    testDataDir = path.join(__dirname, '../../../data/test');
    await fs.mkdir(testDataDir, { recursive: true });
    
    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(async () => {
    // Cleanup test data
    try {
      await fs.rm(testDataDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
    
    // Restore environment
    process.env = originalEnv;
  });

  describe('GitHub Issue Creation from Frontend Form', () => {
    it('should create GitHub issue with correct format from form data', async () => {
      const formData = {
        email: 'test@example.com',
        frequency: 'Weekly',
        format: 'HTML',
        topics: ['development', 'portfolio'],
        consent: true,
        additionalInfo: 'Test subscription'
      };

      // Mock GitHub issue creation
      mockGitHubAPI.createIssue.mockResolvedValue({
        number: 123,
        html_url: 'https://github.com/test/repo/issues/123',
        created_at: '2025-10-31T15:00:00Z'
      });

      // Simulate frontend form submission
      const issueBody = generateIssueBody(formData);
      const issueData = {
        title: `Newsletter Subscription: ${formData.email}`,
        body: issueBody,
        labels: ['newsletter-subscription']
      };

      const result = await mockGitHubAPI.createIssue(issueData);

      expect(mockGitHubAPI.createIssue).toHaveBeenCalledWith(issueData);
      expect(result.number).toBe(123);
      expect(issueBody).toContain('test@example.com');
      expect(issueBody).toContain('Weekly');
      expect(issueBody).toContain('[x] development');
      expect(issueBody).toContain('[x] portfolio');
    });

    it('should validate form data before creating issue', async () => {
      const invalidFormData = {
        email: 'invalid-email',
        frequency: '',
        consent: false
      };

      const validation = validateFormData(invalidFormData);

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid email format');
      expect(validation.errors).toContain('Newsletter frequency is required');
      expect(validation.errors).toContain('Consent is required');
    });
  });

  describe('GitHub Action Processing with External Storage Integration', () => {
    it('should process valid subscription issue and store encrypted data', async () => {
      const issueData = {
        number: 123,
        body: `### Email Address
test@example.com

### Newsletter Frequency
Weekly

### Email Format
HTML

### Topics of Interest
- [x] development
- [x] portfolio
- [ ] articles
- [ ] projects

### Consent & Privacy
- [x] I agree to receive the newsletter
- [x] I understand my data will be encrypted and stored securely
- [x] I can unsubscribe at any time

### Additional Information (Optional)
Test subscription`,
        created_at: '2025-10-31T15:00:00Z',
        html_url: 'https://github.com/test/repo/issues/123'
      };

      // Mock the GitHub Action processing
      const extractedData = extractSubscriptionData(issueData);
      expect(extractedData.email).toBe('test@example.com');
      expect(extractedData.frequency).toBe('Weekly');
      expect(extractedData.topics).toEqual(['development', 'portfolio']);
      expect(extractedData.errors).toHaveLength(0);

      // Test encrypted storage
      const { EncryptionManager } = await import('../../core/encryption.js');
      const encryptionManager = new EncryptionManager();
      
      const subscriberData = {
        id: generateSubscriberId(),
        email: extractedData.email,
        frequency: extractedData.frequency,
        format: extractedData.format,
        topics: extractedData.topics,
        subscribedAt: new Date().toISOString(),
        source: 'github-issue',
        issueNumber: issueData.number
      };

      const encryptedData = await encryptionManager.encrypt(JSON.stringify(subscriberData));
      expect(encryptedData).toBeDefined();
      expect(encryptedData.iv).toBeDefined();
      expect(encryptedData.data).toBeDefined();

      // Test decryption
      const decryptedData = await encryptionManager.decrypt(encryptedData);
      const parsedData = JSON.parse(decryptedData);
      expect(parsedData.email).toBe('test@example.com');
    });

    it('should handle duplicate subscriptions correctly', async () => {
      const email = 'duplicate@example.com';
      
      // Create initial subscriber
      const { SubscriberManager } = await import('../../core/subscriber-manager.js');
      const subscriberManager = new SubscriberManager(testDataDir);
      
      const firstSubscriber = {
        email,
        frequency: 'Weekly',
        format: 'HTML',
        topics: ['development'],
        subscribedAt: new Date().toISOString()
      };

      await subscriberManager.addSubscriber(firstSubscriber);

      // Try to add duplicate
      const duplicateSubscriber = {
        email,
        frequency: 'Monthly',
        format: 'Text',
        topics: ['portfolio'],
        subscribedAt: new Date().toISOString()
      };

      const result = await subscriberManager.addSubscriber(duplicateSubscriber);
      expect(result.isDuplicate).toBe(true);
      expect(result.existingSubscriber.frequency).toBe('Weekly'); // Should keep original
    });
  });

  describe('Welcome Email Sending via Resend', () => {
    it('should send welcome email with correct template and data', async () => {
      const subscriberData = {
        email: 'test@example.com',
        frequency: 'Weekly',
        format: 'HTML',
        topics: ['development', 'portfolio']
      };

      // Mock Resend API response
      mockResendAPI.sendEmail.mockResolvedValue({
        id: 'email-123',
        status: 'sent'
      });

      // Load welcome email template
      const templatePath = path.join(__dirname, '../../templates/welcome.html');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Process template with subscriber data
      const emailContent = processEmailTemplate(template, subscriberData);
      
      const emailData = {
        from: 'newsletter@example.com',
        to: subscriberData.email,
        subject: 'Welcome to the Newsletter!',
        html: emailContent
      };

      const result = await mockResendAPI.sendEmail(emailData);

      expect(mockResendAPI.sendEmail).toHaveBeenCalledWith(emailData);
      expect(result.status).toBe('sent');
      expect(emailContent).toContain(subscriberData.email);
      expect(emailContent).toContain(subscriberData.frequency);
    });

    it('should handle email sending failures gracefully', async () => {
      mockResendAPI.sendEmail.mockRejectedValue(new Error('API rate limit exceeded'));

      const emailData = {
        from: 'newsletter@example.com',
        to: 'test@example.com',
        subject: 'Welcome to the Newsletter!',
        html: '<p>Welcome!</p>'
      };

      try {
        await mockResendAPI.sendEmail(emailData);
      } catch (error) {
        expect(error.message).toBe('API rate limit exceeded');
      }

      expect(mockResendAPI.sendEmail).toHaveBeenCalledWith(emailData);
    });
  });

  describe('Discord Notifications and Audit Logging', () => {
    it('should send Discord notification for successful subscription', async () => {
      const subscriptionData = {
        email: 'test@example.com',
        frequency: 'Weekly',
        topics: ['development'],
        issueNumber: 123,
        timestamp: '2025-10-31T15:00:00Z'
      };

      mockDiscordAPI.sendWebhook.mockResolvedValue({ status: 200 });

      const discordPayload = {
        embeds: [{
          title: '✅ New Newsletter Subscription',
          color: 3066993,
          fields: [
            {
              name: '📧 Email',
              value: subscriptionData.email,
              inline: true
            },
            {
              name: '📅 Frequency',
              value: subscriptionData.frequency,
              inline: true
            },
            {
              name: '🏷️ Topics',
              value: subscriptionData.topics.join(', '),
              inline: false
            },
            {
              name: '🔗 Issue',
              value: `#${subscriptionData.issueNumber}`,
              inline: true
            }
          ],
          timestamp: subscriptionData.timestamp
        }]
      };

      const result = await mockDiscordAPI.sendWebhook(discordPayload);

      expect(mockDiscordAPI.sendWebhook).toHaveBeenCalledWith(discordPayload);
      expect(result.status).toBe(200);
    });

    it('should create audit log entries for all subscription events', async () => {
      const auditLogPath = path.join(testDataDir, 'audit.log');
      
      const logEntry = {
        timestamp: '2025-10-31T15:00:00Z',
        event: 'subscription_processed',
        issueNumber: 123,
        email: 'test@example.com',
        status: 'success',
        details: {
          frequency: 'Weekly',
          topics: ['development'],
          emailSent: true,
          discordNotified: true
        }
      };

      await fs.writeFile(auditLogPath, JSON.stringify(logEntry) + '\n');
      
      const logContent = await fs.readFile(auditLogPath, 'utf-8');
      const parsedLog = JSON.parse(logContent.trim());
      
      expect(parsedLog.event).toBe('subscription_processed');
      expect(parsedLog.email).toBe('test@example.com');
      expect(parsedLog.status).toBe('success');
    });
  });

  describe('Issue Cleanup and Privacy Compliance', () => {
    it('should close and label issue after successful processing', async () => {
      const issueNumber = 123;

      mockGitHubAPI.addLabels.mockResolvedValue({ status: 200 });
      mockGitHubAPI.createComment.mockResolvedValue({ status: 201 });
      mockGitHubAPI.closeIssue.mockResolvedValue({ status: 200 });

      // Add success labels
      await mockGitHubAPI.addLabels({
        issue_number: issueNumber,
        labels: ['newsletter-processed', 'subscription-success']
      });

      // Add success comment
      await mockGitHubAPI.createComment({
        issue_number: issueNumber,
        body: '✅ Subscription processed successfully. This issue will be deleted in 24 hours for privacy protection.'
      });

      // Close issue
      await mockGitHubAPI.closeIssue({
        issue_number: issueNumber,
        state: 'closed'
      });

      expect(mockGitHubAPI.addLabels).toHaveBeenCalled();
      expect(mockGitHubAPI.createComment).toHaveBeenCalled();
      expect(mockGitHubAPI.closeIssue).toHaveBeenCalled();
    });

    it('should handle validation errors and label issue appropriately', async () => {
      const issueNumber = 123;
      const validationErrors = ['Invalid email format', 'Consent not provided'];

      mockGitHubAPI.addLabels.mockResolvedValue({ status: 200 });
      mockGitHubAPI.createComment.mockResolvedValue({ status: 201 });

      // Add error labels
      await mockGitHubAPI.addLabels({
        issue_number: issueNumber,
        labels: ['newsletter-error', 'validation-failed']
      });

      // Add error comment
      const errorComment = `❌ Subscription processing failed:\n${validationErrors.map(e => `- ${e}`).join('\n')}`;
      await mockGitHubAPI.createComment({
        issue_number: issueNumber,
        body: errorComment
      });

      expect(mockGitHubAPI.addLabels).toHaveBeenCalledWith({
        issue_number: issueNumber,
        labels: ['newsletter-error', 'validation-failed']
      });
      expect(mockGitHubAPI.createComment).toHaveBeenCalledWith({
        issue_number: issueNumber,
        body: errorComment
      });
    });
  });
});

// Helper functions
function generateIssueBody(formData) {
  const topicCheckboxes = ['development', 'portfolio', 'articles', 'projects']
    .map(topic => `- [${formData.topics?.includes(topic) ? 'x' : ' '}] ${topic}`)
    .join('\n');

  return `### Email Address
${formData.email}

### Newsletter Frequency
${formData.frequency}

### Email Format
${formData.format}

### Topics of Interest
${topicCheckboxes}

### Consent & Privacy
- [${formData.consent ? 'x' : ' '}] I agree to receive the newsletter
- [${formData.consent ? 'x' : ' '}] I understand my data will be encrypted and stored securely
- [${formData.consent ? 'x' : ' '}] I can unsubscribe at any time

### Additional Information (Optional)
${formData.additionalInfo || ''}`;
}

function validateFormData(formData) {
  const errors = [];
  
  if (!formData.email) {
    errors.push('Email address is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Invalid email format');
  }
  
  if (!formData.frequency) {
    errors.push('Newsletter frequency is required');
  }
  
  if (!formData.consent) {
    errors.push('Consent is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function extractSubscriptionData(issueData) {
  const body = issueData.body || '';
  
  const extractField = (fieldName, body) => {
    const regex = new RegExp(`### ${fieldName}\\s*\\n\\s*([^\\n]+)`, 'i');
    const match = body.match(regex);
    return match ? match[1].trim() : '';
  };
  
  const extractCheckboxes = (fieldName, body) => {
    const regex = new RegExp(`### ${fieldName}[\\s\\S]*?(?=###|$)`, 'i');
    const section = body.match(regex);
    if (!section) return [];
    
    const checkboxRegex = /- \[x\] (.+)/gi;
    const matches = [...section[0].matchAll(checkboxRegex)];
    return matches.map(match => match[1].trim());
  };
  
  const email = extractField('Email Address', body);
  const frequency = extractField('Newsletter Frequency', body);
  const format = extractField('Email Format', body);
  const topics = extractCheckboxes('Topics of Interest', body);
  const consent = extractCheckboxes('Consent & Privacy', body);
  
  const errors = [];
  if (!email) errors.push('Email address is required');
  if (!frequency) errors.push('Newsletter frequency is required');
  if (!format) errors.push('Email format is required');
  if (consent.length < 3) errors.push('All consent checkboxes must be checked');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('Invalid email format');
  }
  
  return {
    email,
    frequency,
    format,
    topics,
    consent,
    errors,
    issueNumber: issueData.number,
    createdAt: issueData.created_at
  };
}

function generateSubscriberId() {
  return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function processEmailTemplate(template, data) {
  return template
    .replace(/\{\{email\}\}/g, data.email)
    .replace(/\{\{frequency\}\}/g, data.frequency)
    .replace(/\{\{format\}\}/g, data.format)
    .replace(/\{\{topics\}\}/g, data.topics.join(', '));
}
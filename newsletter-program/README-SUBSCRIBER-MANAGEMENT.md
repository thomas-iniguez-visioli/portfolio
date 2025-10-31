# Encrypted Subscriber File Management System

This document describes the comprehensive encrypted subscriber file management system with CLI tools, analytics, and secure export functionality.

## Overview

The subscriber management system provides:

- **Encrypted Storage**: All subscriber emails are encrypted using AES-256
- **CLI Tools**: Comprehensive command-line interface for all operations
- **Analytics & Reporting**: Detailed insights into subscriber behavior
- **Secure Export**: GDPR-compliant data export functionality
- **File-based Architecture**: No external database dependencies

## Architecture

```
newsletter-program/
├── src/
│   ├── core/
│   │   ├── subscriber-file-manager.js    # Core subscriber operations
│   │   ├── analytics-manager.js          # Analytics and reporting
│   │   ├── secure-export.js             # Secure data export
│   │   └── encryption.js                # AES-256 encryption
│   ├── cli/
│   │   ├── subscriber-cli.js            # Subscriber management CLI
│   │   ├── analytics-cli.js             # Analytics CLI
│   │   └── export-cli.js                # Export CLI
│   └── data/
│       ├── subscribers.encrypted.json    # Encrypted subscriber data
│       ├── analytics.json               # Analytics data
│       └── backups/                     # Automatic backups
```

## Data Models

### Subscriber Model
```javascript
{
  id: "uuid",
  email: "user@example.com",           // Encrypted in storage
  status: "active|unsubscribed|bounced",
  subscribedAt: "2025-10-31T10:00:00Z",
  unsubscribedAt: "2025-11-01T10:00:00Z", // Optional
  source: "website|import|manual",
  preferences: {
    frequency: "weekly|monthly",
    topics: ["development", "updates"]
  },
  unsubscribeToken: "secure-token",
  metadata: {
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0...",
    referrer: "https://example.com"
  }
}
```

### Analytics Event Model
```javascript
{
  id: "event-id",
  type: "subscribe|unsubscribe|bounce|update",
  timestamp: "2025-10-31T10:00:00Z",
  subscriberId: "subscriber-uuid",
  email: "user@example.com",           // Encrypted in storage
  source: "website",
  metadata: {}
}
```

## CLI Commands

### Subscriber Management

#### Add Subscriber
```bash
npm run subscribers add --email user@example.com --source website --frequency weekly --topics "development,updates"
```

#### List Subscribers
```bash
# List all subscribers
npm run subscribers list

# Filter by status
npm run subscribers list --status active

# JSON output
npm run subscribers list --format json
```

#### Update Subscriber
```bash
npm run subscribers update --id subscriber-uuid --status unsubscribed --frequency monthly
```

#### Remove Subscriber
```bash
npm run subscribers remove --id subscriber-uuid --confirm
```

#### Get Statistics
```bash
npm run subscribers stats
```

#### Export Subscribers
```bash
# Export as JSON
npm run subscribers export --format json --output subscribers.json

# Export as CSV
npm run subscribers export --format csv --status active

# Export emails only
npm run subscribers export --format txt
```

#### Import Subscribers
```bash
# Import from JSON
npm run subscribers import --file subscribers.json --format json

# Import from CSV
npm run subscribers import --file subscribers.csv --format csv --allow-duplicates
```

#### File Operations
```bash
# Validate file integrity
npm run subscribers validate

# Optimize file (remove duplicates)
npm run subscribers optimize --confirm

# Rotate encryption key
npm run subscribers rotate-key --confirm
```

### Analytics & Reporting

#### Growth Report
```bash
# Last 30 days growth
npm run analytics growth --days 30

# Save to file
npm run analytics growth --days 7 --output growth-report.json
```

#### Newsletter Performance
```bash
# Newsletter performance report
npm run analytics newsletters --days 30

# CSV export
npm run analytics newsletters --format csv --output performance.csv
```

#### Engagement Analysis
```bash
# Subscriber engagement report
npm run analytics engagement

# Save detailed report
npm run analytics engagement --output engagement.json
```

#### Dashboard
```bash
# Quick overview dashboard
npm run analytics dashboard
```

#### Record Events
```bash
# Record newsletter send
npm run analytics record-send --subject "Weekly Update" --recipients 100 --success 98 --failures 2

# Clean old data
npm run analytics clean --days 365 --confirm
```

#### Export Analytics
```bash
# Export analytics data
npm run analytics export --format json --output analytics-backup.json
```

### Secure Export & GDPR Compliance

#### Full Data Export
```bash
# Create secure export with all data
npm run export create

# Anonymized export
npm run export create --anonymize

# Exclude analytics
npm run export create --no-analytics
```

#### GDPR Data Export
```bash
# Export all data for specific subscriber
npm run export gdpr --email user@example.com
```

#### Anonymized Dataset
```bash
# Create anonymized research dataset
npm run export anonymize
```

#### Export Management
```bash
# List all exports
npm run export list

# Verify export integrity
npm run export verify --file export-file.json

# Clean old exports
npm run export clean --days 30 --confirm
```

## Security Features

### Encryption
- **Algorithm**: AES-256-CBC
- **Key Management**: Environment variable based
- **IV Generation**: Random 16-byte IV per encryption
- **Key Rotation**: Supported with data migration

### Data Protection
- **Email Encryption**: All email addresses encrypted at rest
- **Secure Tokens**: Cryptographically secure unsubscribe tokens
- **Backup Encryption**: Automatic encrypted backups
- **Access Control**: File-based permissions

### GDPR Compliance
- **Data Portability**: Complete data export for individuals
- **Right to Erasure**: Secure data deletion
- **Data Minimization**: Only necessary data collected
- **Consent Management**: Clear consent tracking

## Environment Setup

### Required Environment Variables
```bash
# Encryption key (base64 encoded 32-byte key)
ENCRYPTION_KEY=your-base64-encoded-key

# Optional: Contact email for GDPR requests
CONTACT_EMAIL=privacy@example.com

# Optional: Website URL for unsubscribe links
WEBSITE_URL=https://example.com
```

### Generate Encryption Key
```bash
# Generate new encryption key
node -e "
const crypto = require('crypto');
const key = crypto.randomBytes(32).toString('base64');
console.log('ENCRYPTION_KEY=' + key);
"
```

## File Structure

### Encrypted Subscriber File
```json
{
  "version": "1.0.0",
  "createdAt": "2025-10-31T10:00:00Z",
  "lastModified": "2025-10-31T15:30:00Z",
  "keyVersion": "env-v1",
  "subscribers": [
    {
      "id": "uuid",
      "encryptedEmail": {
        "encrypted": "hex-string",
        "iv": "hex-string",
        "keyVersion": "env-v1"
      },
      "status": "active",
      "subscribedAt": "2025-10-31T10:00:00Z",
      "source": "website",
      "preferences": {
        "frequency": "weekly",
        "topics": ["development"]
      },
      "unsubscribeToken": "secure-token"
    }
  ]
}
```

### Analytics File
```json
{
  "version": "1.0.0",
  "createdAt": "2025-10-31T10:00:00Z",
  "lastUpdated": "2025-10-31T15:30:00Z",
  "newsletters": [
    {
      "id": "newsletter-id",
      "subject": "Weekly Update",
      "sentAt": "2025-10-31T10:00:00Z",
      "recipientCount": 100,
      "successCount": 98,
      "failureCount": 2,
      "source": "manual"
    }
  ],
  "events": [
    {
      "id": "event-id",
      "type": "subscribe",
      "timestamp": "2025-10-31T10:00:00Z",
      "subscriberId": "subscriber-uuid",
      "email": "encrypted-email",
      "source": "website"
    }
  ]
}
```

## Best Practices

### Security
1. **Key Management**: Store encryption keys securely
2. **Regular Backups**: Automated encrypted backups
3. **Access Control**: Restrict file system access
4. **Audit Logging**: Track all data access
5. **Key Rotation**: Regular key rotation schedule

### Data Management
1. **Regular Validation**: Validate file integrity
2. **Duplicate Prevention**: Regular optimization
3. **Data Retention**: Clean old analytics data
4. **Export Management**: Regular export cleanup
5. **Monitoring**: Track system health

### GDPR Compliance
1. **Consent Tracking**: Clear consent records
2. **Data Minimization**: Collect only necessary data
3. **Regular Audits**: Review data processing
4. **Response Procedures**: Handle data requests promptly
5. **Documentation**: Maintain processing records

## Troubleshooting

### Common Issues

#### Encryption Key Problems
```bash
# Test encryption key
node -e "
const { EncryptionManager } = require('./src/core/encryption.js');
const enc = new EncryptionManager();
console.log(enc.validateKey());
"
```

#### File Corruption
```bash
# Validate and repair
npm run subscribers validate
npm run subscribers optimize --confirm
```

#### Performance Issues
```bash
# Clean old data
npm run analytics clean --days 180 --confirm
npm run export clean --days 30 --confirm
```

#### GDPR Requests
```bash
# Export user data
npm run export gdpr --email user@example.com

# Remove user data
npm run subscribers list --format json | grep user@example.com
npm run subscribers remove --id found-uuid --confirm
```

### Debug Commands

#### Check System Status
```bash
# Subscriber statistics
npm run subscribers stats

# Analytics dashboard
npm run analytics dashboard

# List recent exports
npm run export list
```

#### Validate Data Integrity
```bash
# Validate subscriber file
npm run subscribers validate

# Verify export file
npm run export verify --file export.json
```

## Integration Examples

### Web Application Integration
```javascript
const { SubscriberFileManager } = require('./src/core/subscriber-file-manager');

const manager = new SubscriberFileManager();

// Add new subscriber from web form
async function handleSubscription(email, source, preferences) {
  try {
    const subscriber = await manager.addSubscriber({
      email,
      source,
      frequency: preferences.frequency,
      topics: preferences.topics
    });
    
    console.log('Subscriber added:', subscriber.id);
    return subscriber;
  } catch (error) {
    console.error('Subscription failed:', error.message);
    throw error;
  }
}

// Handle unsubscribe
async function handleUnsubscribe(token) {
  try {
    const subscriber = await manager.unsubscribeByToken(token);
    console.log('Unsubscribed:', subscriber.email);
    return subscriber;
  } catch (error) {
    console.error('Unsubscribe failed:', error.message);
    throw error;
  }
}
```

### Analytics Integration
```javascript
const { AnalyticsManager } = require('./src/core/analytics-manager');

const analytics = new AnalyticsManager();

// Record newsletter send
async function recordNewsletterSend(newsletterData) {
  await analytics.recordNewsletterSent({
    subject: newsletterData.subject,
    recipientCount: newsletterData.recipients.length,
    successCount: newsletterData.successCount,
    failureCount: newsletterData.failureCount,
    source: 'automated'
  });
}

// Generate monthly report
async function generateMonthlyReport() {
  const [growth, performance, engagement] = await Promise.all([
    analytics.generateGrowthReport(30),
    analytics.generateNewsletterReport(30),
    analytics.generateEngagementReport()
  ]);
  
  return { growth, performance, engagement };
}
```

This comprehensive system provides enterprise-grade subscriber management with strong security, detailed analytics, and full GDPR compliance while maintaining a simple file-based architecture.
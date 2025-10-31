# RSS Monitoring System

This directory contains the configuration and data files for the automated RSS monitoring and newsletter system.

## Overview

The RSS monitoring system automatically:
- Monitors configured RSS feeds for new content
- Generates newsletters from new RSS items
- Sends newsletters to encrypted subscriber list via Resend API
- Maintains RSS cache and feed configuration in the repository
- Provides Discord notifications for monitoring activities

## Files

### Configuration Files

- **`rss-feeds.json`** - RSS feed configuration with monitoring settings
- **`rss-cache.json`** - Cache of processed RSS items to prevent duplicates
- **`subscribers.encrypted.json`** - Encrypted subscriber data (auto-generated)

### Management Scripts

- **`../scripts/rss-manager.js`** - RSS feed management utilities
- **`../scripts/rss-monitor-action.js`** - GitHub Actions RSS monitoring script

## RSS Feed Configuration

The `rss-feeds.json` file contains an array of RSS feeds with the following structure:

```json
{
  "version": "1.0.0",
  "createdAt": "2024-10-31T00:00:00.000Z",
  "lastModified": "2024-10-31T00:00:00.000Z",
  "feeds": [
    {
      "id": "unique-feed-id",
      "url": "https://example.com/rss.xml",
      "title": "Feed Title",
      "description": "Feed description",
      "isActive": true,
      "checkInterval": 60,
      "lastChecked": null,
      "lastItemDate": null,
      "settings": {
        "autoSend": true,
        "subjectPrefix": "[RSS Update]",
        "includeFullContent": false,
        "maxItemsPerNewsletter": 5,
        "template": "rss-newsletter"
      },
      "createdAt": "2024-10-31T00:00:00.000Z"
    }
  ]
}
```

### Feed Settings

- **`id`** - Unique identifier for the feed
- **`url`** - RSS feed URL
- **`title`** - Display name for the feed
- **`description`** - Optional description
- **`isActive`** - Whether to monitor this feed
- **`checkInterval`** - Minutes between checks
- **`autoSend`** - Whether to automatically send newsletters for new items
- **`subjectPrefix`** - Email subject prefix
- **`includeFullContent`** - Include full article content in emails
- **`maxItemsPerNewsletter`** - Maximum items per newsletter

## GitHub Actions Workflows

### RSS Monitoring (`rss-monitoring.yml`)

Runs automatically every hour and can be triggered manually:

- Checks all active RSS feeds for new items
- Generates newsletters from new content
- Sends emails to subscribers via Resend API
- Updates RSS cache and commits changes
- Sends Discord notifications

**Manual Trigger Options:**
- `force_check` - Ignore check intervals
- `send_newsletter` - Enable/disable newsletter sending

### RSS Feed Management (`rss-feed-management.yml`)

Manual workflow for managing RSS feeds:

**Actions:**
- `add` - Add new RSS feed
- `list` - List all configured feeds
- `update` - Update feed settings
- `remove` - Remove feed
- `validate` - Validate configuration
- `stats` - Show statistics

## Environment Variables

Required secrets for GitHub Actions:

- `RESEND_API_KEY` - Resend API key for email sending
- `NEWSLETTER_ENCRYPTION_KEY` - Base64 encryption key for subscriber data (generate with provided script)
- `FROM_EMAIL` - Sender email address
- `FROM_NAME` - Sender display name
- `WEBSITE_URL` - Website URL for unsubscribe links
- `UNSUBSCRIBE_SECRET` - Secret for generating unsubscribe tokens
- `DISCORD_WEBHOOK_URL` - Discord webhook for notifications

### Encryption Key Setup

Generate a secure encryption key:
```bash
node .github/scripts/generate-encryption-key.js generate
```

The key is stored only in environment variables, never in files. See [ENCRYPTION-SETUP.md](./ENCRYPTION-SETUP.md) for detailed setup instructions.

## Usage Examples

### Adding an RSS Feed

Use the RSS Feed Management workflow with these inputs:
- Action: `add`
- Feed URL: `https://example.com/feed.xml`
- Feed Title: `Example Blog`
- Auto Send: `true`
- Check Interval: `120` (minutes)

### Manual RSS Check

Trigger the RSS Monitoring workflow with:
- Force Check: `true`
- Send Newsletter: `true`

### CLI Management (Local Development)

```bash
# Navigate to scripts directory
cd .github/scripts

# Add RSS feed
node rss-manager.js add "https://example.com/feed.xml" "Example Feed"

# List feeds
node rss-manager.js list

# Show statistics
node rss-manager.js stats

# Validate configuration
node rss-manager.js validate
```

## Newsletter Templates

RSS newsletters use the template at `newsletter-program/src/templates/rss-newsletter.html`.

The template supports:
- Multiple RSS items per newsletter
- Rich HTML formatting
- Responsive design
- Unsubscribe links
- Custom branding

## Monitoring and Notifications

The system provides monitoring through:

1. **GitHub Actions Logs** - Detailed execution logs
2. **Discord Notifications** - Real-time status updates
3. **Repository Commits** - Automatic cache updates
4. **Email Delivery Reports** - Via Resend API

## Security Features

- **Encrypted Subscriber Storage** - All email addresses are encrypted
- **Secure Token Generation** - HMAC-based unsubscribe tokens
- **Rate Limiting** - Respects email service limits
- **Input Validation** - Validates RSS feeds and email addresses
- **Error Handling** - Graceful failure handling with notifications

## Troubleshooting

### Common Issues

1. **No newsletters sent despite new items**
   - Check if feeds have `autoSend: true`
   - Verify active subscribers exist
   - Check Resend API key and limits

2. **RSS feed not updating**
   - Verify feed URL is accessible
   - Check `checkInterval` setting
   - Review GitHub Actions logs

3. **Email delivery failures**
   - Verify Resend API configuration
   - Check sender email domain verification
   - Review rate limiting settings

### Debugging

Enable detailed logging by checking GitHub Actions workflow runs:
- Go to Actions tab in repository
- Select RSS Monitoring workflow
- Review execution logs for errors

## Data Backup

The system automatically:
- Creates backups before subscriber file changes
- Commits RSS cache updates to repository
- Maintains audit logs in GitHub Actions

Manual backup of subscriber data:
```bash
cd newsletter-program
npm run subscribers export --format json
```

## Performance Considerations

- RSS feeds are checked based on `checkInterval` settings
- Email sending uses batching to respect rate limits
- Cache prevents duplicate processing of RSS items
- Repository storage keeps data synchronized across runs

## Contributing

To modify the RSS monitoring system:

1. Update configuration in `.github/data/rss-feeds.json`
2. Test changes using manual workflow triggers
3. Monitor GitHub Actions logs for issues
4. Update documentation as needed

For development changes:
1. Modify scripts in `.github/scripts/`
2. Update workflow files in `.github/workflows/`
3. Test with local newsletter program CLI
4. Deploy via repository commits
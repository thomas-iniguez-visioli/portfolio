# Newsletter Integration Guide

This guide explains how to configure and use the newsletter subscription system integrated into the matrix-flow theme.

## Overview

The newsletter system uses GitHub Issues as a subscription mechanism, with automated processing via GitHub Actions. This approach provides:

- **Privacy**: Email addresses are encrypted and stored securely
- **Automation**: GitHub Actions handle subscription processing
- **Audit Trail**: Complete logging of all subscription activities
- **Compliance**: Automatic issue cleanup after processing

## Setup Instructions

### 1. Theme Configuration

Update your `themes/matrix-flow/_config.yml`:

```yaml
newsletter:
  github_owner: your-github-username
  github_repo: your-repo-name
  use_github_redirect: true
  enabled: true
  position: sidebar
```

### 2. GitHub Repository Setup

1. **Enable Issues**: Ensure GitHub Issues are enabled in your repository settings
2. **Issue Templates**: The system automatically creates issue templates in `.github/ISSUE_TEMPLATE/`
3. **GitHub Actions**: Workflows are created in `.github/workflows/`

### 3. Required GitHub Secrets

For the GitHub Actions to work properly, add these secrets to your repository:

```
RESEND_API_KEY=your_resend_api_key
DISCORD_WEBHOOK_URL=your_discord_webhook_url (optional)
```

### 4. Newsletter Program Setup

The standalone newsletter program requires additional setup:

1. **Database**: SQLite database for encrypted subscriber storage
2. **Encryption Keys**: Secure key management for email encryption
3. **API Integration**: Resend API for email delivery

## How It Works

### Subscription Flow

1. **User Subscription**: User fills out the newsletter form on your site
2. **GitHub Issue Creation**: Form creates a GitHub issue with subscription details
3. **Automated Processing**: GitHub Action processes the issue:
   - Extracts and validates subscription data
   - Encrypts email address
   - Stores in subscriber database
   - Sends welcome email via Resend
   - Sends Discord notification (optional)
   - Schedules issue for deletion
4. **Issue Cleanup**: After 24 hours, issues are automatically archived for privacy

### Security Features

- **Email Encryption**: All email addresses are encrypted using AES-256
- **Automatic Cleanup**: Issues are deleted after processing to protect privacy
- **Audit Logging**: Complete audit trail of all activities
- **Validation**: Client-side and server-side validation
- **Consent Tracking**: Explicit consent required for subscription

## Configuration Options

### Frontend Configuration

The newsletter widget can be configured via theme settings:

```yaml
newsletter:
  enabled: true
  position: sidebar  # sidebar, footer, header
  github_owner: your-username
  github_repo: your-repo
  use_github_redirect: true
```

### GitHub Action Configuration

Modify `.github/workflows/newsletter-subscription.yml` to customize:

- **Deletion Delay**: Change `DELETION_DELAY_HOURS` (default: 24)
- **Validation Rules**: Modify email validation patterns
- **Notification Settings**: Configure Discord/Slack notifications

### Styling Customization

The newsletter widget uses CSS custom properties for easy theming:

```css
.newsletter-widget {
  --primary-color: #00ff00;
  --background-color: rgba(0, 20, 0, 0.9);
  --border-color: #00ff00;
}
```

## API Integration Methods

### Method 1: GitHub Redirect (Default)

- Redirects users to GitHub issue creation page
- Most secure (no API tokens exposed)
- Requires users to have GitHub accounts

### Method 2: Backend API

- Uses custom backend endpoint
- Seamless user experience
- Requires additional backend infrastructure

### Method 3: Direct GitHub API

- Uses GitHub API directly from frontend
- Requires exposing GitHub token (not recommended)

## Troubleshooting

### Common Issues

1. **Form Not Submitting**
   - Check browser console for JavaScript errors
   - Verify newsletter.js is loaded correctly
   - Ensure theme configuration is correct

2. **GitHub Actions Not Triggering**
   - Verify issue templates are correctly formatted
   - Check that issues have the correct labels
   - Review GitHub Actions logs

3. **Email Validation Errors**
   - Check email format validation regex
   - Verify required fields are filled
   - Review consent checkbox requirements

### Debug Mode

Enable debug logging by adding to your theme config:

```yaml
newsletter:
  debug: true
```

This will log additional information to the browser console.

## Privacy and Compliance

### Data Protection

- Email addresses are encrypted using AES-256
- Issues are automatically deleted after processing
- Audit logs contain no personal information
- Users can unsubscribe at any time

### GDPR Compliance

- Explicit consent required for subscription
- Clear privacy notice displayed
- Right to unsubscribe implemented
- Data retention policies enforced

### Audit Trail

All subscription activities are logged:
- Subscription attempts
- Processing results
- Issue deletions
- Error conditions

## Advanced Configuration

### Custom Email Templates

Create custom email templates in the newsletter program:

```javascript
// templates/welcome.html
const welcomeTemplate = `
<h1>Welcome to the Newsletter!</h1>
<p>Thank you for subscribing...</p>
`;
```

### RSS Integration

The system supports automatic newsletter generation from RSS feeds:

```yaml
newsletter:
  rss_feeds:
    - url: https://your-blog.com/feed.xml
      template: newsletter
      frequency: weekly
```

### Multiple Subscription Types

Configure different subscription types:

```yaml
newsletter:
  subscription_types:
    - name: weekly
      label: Weekly Updates
    - name: monthly
      label: Monthly Digest
    - name: announcements
      label: Major Announcements Only
```

## Support

For issues and questions:

1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Check browser console for errors
4. Create an issue in the repository

## License

This newsletter system is part of the matrix-flow theme and follows the same license terms.
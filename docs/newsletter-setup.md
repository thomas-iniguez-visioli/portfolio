# Newsletter Discord Webhook Setup

## Configuration Overview

The newsletter system is configured through multiple layers:

1. **Site Configuration** (`_config.yml`) - Main newsletter settings
2. **Theme Configuration** (`themes/hexo-theme/_config.yml`) - UI settings
3. **Environment Variables** (`.env`) - Sensitive data like webhook URLs

## Setup Instructions

### 1. Discord Webhook Setup

1. Go to your Discord server
2. Navigate to Server Settings > Integrations > Webhooks
3. Click "New Webhook"
4. Choose the channel where newsletter subscriptions will be posted
5. Copy the webhook URL

### 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace `YOUR_WEBHOOK_ID` and `YOUR_WEBHOOK_TOKEN` with your actual Discord webhook URL:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/123456789/abcdefghijklmnop
   ```

### 3. Configuration Validation

The system will automatically validate the webhook URL format and disable the newsletter form if:
- The webhook URL is missing
- The webhook URL format is invalid
- The webhook URL is not accessible

### 4. Development vs Production

- **Development**: Use a test Discord channel/webhook
- **Production**: Use your main Discord channel/webhook

Environment variables take precedence over configuration file settings.

## Configuration Reference

### Site Configuration (`_config.yml`)

```yaml
newsletter:
  enabled: true                    # Enable/disable newsletter functionality
  discord_webhook: ${DISCORD_WEBHOOK_URL}  # Environment variable reference
  retry_attempts: 3               # Number of retry attempts for failed requests
  timeout_ms: 5000               # Request timeout in milliseconds
  rate_limit_ms: 1000            # Rate limiting between requests

build_optimization:
  timestamp_threshold: 24         # Hours threshold for file staleness check
  source_files:                  # Files to monitor for changes
    - 'data/twt.json'
  output_files:                  # Files to update conditionally
    - 'source/_posts/twitter.md'
```

### Theme Configuration (`themes/hexo-theme/_config.yml`)

```yaml
newsletter:
  form_id: 'newsletter-form'           # HTML form ID
  email_input_id: 'newsletter-email'  # Email input field ID
  submit_button_id: 'newsletter-submit' # Submit button ID
  success_message: 'Merci pour votre inscription !' # Success message
  error_message: 'Erreur lors de l\'inscription'    # Error message
  loading_message: 'Inscription en cours...'        # Loading message
  placeholder_text: 'Votre adresse email'          # Input placeholder
  submit_text: 'S\'inscrire'                       # Submit button text
  enabled_pages: ['index', 'post', 'page']         # Pages where form appears
```

## Security Notes

- Never commit `.env` files to version control
- The `.env.example` file is safe to commit as it contains no sensitive data
- Webhook URLs should be treated as sensitive credentials
- The system validates webhook URLs to prevent configuration errors
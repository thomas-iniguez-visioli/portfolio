# Newsletter Management System

This directory contains the repository-based newsletter composition and management system.

## Directory Structure

```
newsletters/
├── README.md                 # This documentation
├── newsletter-template.md    # Template for new newsletters
├── sample-newsletter.md      # Example newsletter
├── archive/                  # Archived sent newsletters
├── output/                   # Generated HTML previews
└── *.md                     # Newsletter markdown files
```

## Newsletter File Format

Newsletter files use Markdown with YAML frontmatter:

```markdown
---
subject: Newsletter Title
date: 2025-10-31
status: draft|scheduled|sent
scheduled_at: 2025-11-01T10:00:00Z
website_url: https://example.com
github_url: https://github.com/username
preferences_url: https://example.com/preferences
unsubscribe_url: https://example.com/unsubscribe
variables:
  author: Newsletter Team
  edition_number: 1
---

# Newsletter Content

Your markdown content here...
```

## Frontmatter Fields

- **subject**: Email subject line
- **date**: Newsletter date (display purposes)
- **status**: `draft`, `scheduled`, or `sent`
- **scheduled_at**: ISO datetime for scheduled sending
- **website_url**: Link to your website
- **github_url**: Link to your GitHub profile
- **preferences_url**: Link to subscription preferences
- **unsubscribe_url**: Link to unsubscribe page
- **variables**: Custom template variables

## CLI Commands

### Create Newsletter
```bash
cd newsletter-program
npm run newsletter create weekly-update-nov-2025 --subject "Weekly Update - November 2025"
```

### Preview Newsletter
```bash
npm run newsletter preview weekly-update-nov-2025 --open
```

### List Newsletters
```bash
npm run newsletter list
npm run newsletter list --status draft
```

### Schedule Newsletter
```bash
npm run newsletter schedule weekly-update-nov-2025 "2025-11-01T10:00:00Z"
```

### Send Newsletter
```bash
# Send test email
npm run newsletter send weekly-update-nov-2025 --test your-email@example.com

# Send to all subscribers
npm run newsletter send weekly-update-nov-2025

# Force send (ignore schedule)
npm run newsletter send weekly-update-nov-2025 --force
```

### Archive Management
```bash
npm run newsletter archive list
```

## GitHub Actions Integration

The system includes automated scheduling via GitHub Actions:

### Manual Trigger
1. Go to Actions tab in GitHub
2. Select "Newsletter Scheduler" workflow
3. Click "Run workflow"
4. Specify newsletter file (optional)
5. Choose force send option

### Automatic Scheduling
- Runs every hour to check for scheduled newsletters
- Automatically sends newsletters when their scheduled time arrives
- Archives sent newsletters with timestamps
- Sends Discord notifications on completion

## Template Variables

Templates support variable substitution using `{{variable_name}}` syntax:

### Built-in Variables
- `{{subject}}` - Newsletter subject
- `{{date}}` - Newsletter date
- `{{content}}` - Rendered markdown content
- `{{website_url}}` - Website URL
- `{{github_url}}` - GitHub URL
- `{{preferences_url}}` - Preferences URL
- `{{unsubscribe_url}}` - Unsubscribe URL

### Custom Variables
Add custom variables in the frontmatter `variables` section:

```yaml
variables:
  author: John Doe
  edition_number: 42
  theme_color: "#3498db"
```

Use in content: `{{author}}`, `{{edition_number}}`, `{{theme_color}}`

## Email Templates

HTML email templates are located in `newsletter-program/src/templates/`:

- `newsletter.html` - Main newsletter template
- `welcome.html` - Welcome email template

Templates use the same `{{variable}}` substitution system.

## Archive System

After sending, newsletters are automatically:

1. Copied to `newsletters/archive/` with timestamp prefix
2. Marked with archive metadata in frontmatter
3. Original file status updated to `sent`

Archive filename format: `YYYY-MM-DD-original-filename.md`

## Best Practices

### Newsletter Creation
1. Use descriptive filenames (e.g., `weekly-update-2025-11-01.md`)
2. Set clear, engaging subject lines
3. Include all required frontmatter fields
4. Test with preview before scheduling

### Content Guidelines
1. Use clear headings and sections
2. Include engaging visuals with alt text
3. Add clear call-to-action links
4. Keep content scannable with bullet points
5. Include unsubscribe information

### Scheduling
1. Schedule newsletters at consistent times
2. Allow buffer time for review
3. Test with small audience first
4. Monitor delivery and engagement

### Archive Management
1. Regularly review archived newsletters
2. Use archives for content inspiration
3. Track performance over time
4. Maintain consistent formatting

## Troubleshooting

### Common Issues

**Newsletter not sending:**
- Check if scheduled time has passed
- Verify RESEND_API_KEY is set
- Ensure subscribers exist
- Check newsletter status is not 'sent'

**Preview not generating:**
- Verify markdown syntax is valid
- Check frontmatter YAML format
- Ensure template files exist
- Check file permissions

**Scheduling not working:**
- Verify datetime format (ISO 8601)
- Ensure date is in the future
- Check GitHub Actions secrets
- Verify cron schedule in workflow

### Debug Commands

```bash
# Check newsletter parsing
node -e "
const NewsletterComposer = require('./src/core/newsletter-composer.js');
const composer = new NewsletterComposer();
composer.parseNewsletterFile('newsletters/your-file.md')
  .then(console.log)
  .catch(console.error);
"

# List all newsletters with details
npm run newsletter list --json
```

## Security Considerations

1. **Subscriber Data**: Always encrypted in storage
2. **API Keys**: Stored as GitHub secrets
3. **Unsubscribe Links**: Include secure tokens
4. **Archive Access**: Restrict to authorized users
5. **Template Injection**: Validate all user inputs

## Integration with Main Site

The newsletter system integrates with the main portfolio site:

1. **Subscription Form**: Collects emails via GitHub Issues
2. **Preferences Page**: Manages subscriber settings
3. **Unsubscribe**: Secure token-based unsubscription
4. **Archive Display**: Public archive of past newsletters
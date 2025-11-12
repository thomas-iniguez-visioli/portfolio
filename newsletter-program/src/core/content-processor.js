import { marked } from 'marked';

export class ContentProcessor {
  constructor() {
    // Configure marked for safe HTML processing
    marked.setOptions({
      sanitize: false, // We'll handle sanitization separately
      breaks: true,
      gfm: true
    });
  }

  async rssToEmail(rssItem, template) {
    try {
      // Process the RSS item content
      const processedContent = await this.processContent(rssItem.description || rssItem.content);
      
      // Replace template variables
      let emailContent = template
        .replace(/\{\{title\}\}/g, rssItem.title || '')
        .replace(/\{\{description\}\}/g, processedContent)
        .replace(/\{\{link\}\}/g, rssItem.link || '')
        .replace(/\{\{pubDate\}\}/g, this.formatDate(rssItem.pubDate))
        .replace(/\{\{guid\}\}/g, rssItem.guid || '');

      return emailContent;
    } catch (error) {
      throw new Error(`Failed to process RSS to email: ${error.message}`);
    }
  }

  async generateSubject(rssItem, prefix = '') {
    const title = rssItem.title || 'New Content Available';
    return prefix ? `${prefix} ${title}` : title;
  }

  async sanitizeContent(content) {
    if (!content) return '';

    // Remove potentially dangerous HTML elements and attributes
    const dangerousElements = /<script[^>]*>.*?<\/script>/gi;
    const dangerousAttributes = /\s(on\w+|javascript:)[^>]*/gi;
    const dangerousTags = /<(script|iframe|object|embed|form)[^>]*>.*?<\/\1>/gi;

    let sanitized = content;
    // Repeat replacements until no further dangerous elements/tags/attributes remain
    let previous;
    do {
      previous = sanitized;
      sanitized = sanitized
        .replace(dangerousElements, '')
        .replace(dangerousTags, '')
        .replace(dangerousAttributes, '');
    } while (sanitized !== previous);

    // Allow only safe HTML tags
    const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img'];
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    
    sanitized = sanitized.replace(tagRegex, (match, tagName) => {
      if (allowedTags.includes(tagName.toLowerCase())) {
        // For links, ensure href is safe
        if (tagName.toLowerCase() === 'a') {
          return match.replace(/href\s*=\s*["']?javascript:[^"'>]*/gi, 'href="#"');
        }
        // For images, ensure src is safe
        if (tagName.toLowerCase() === 'img') {
          return match.replace(/src\s*=\s*["']?javascript:[^"'>]*/gi, 'src=""');
        }
        return match;
      }
      return '';
    });

    return sanitized;
  }

  async renderTemplate(template, data) {
    try {
      let rendered = template;
      
      // Simple template variable replacement
      Object.keys(data).forEach(key => {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        rendered = rendered.replace(regex, data[key] || '');
      });

      return rendered;
    } catch (error) {
      throw new Error(`Failed to render template: ${error.message}`);
    }
  }

  async renderMultipleItems(template, data) {
    try {
      // Handle Handlebars-style each loops
      const eachRegex = /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
      
      let rendered = template;
      const matches = [...template.matchAll(eachRegex)];
      
      for (const match of matches) {
        const [fullMatch, arrayName, itemTemplate] = match;
        const array = data[arrayName];
        
        if (!Array.isArray(array)) {
          rendered = rendered.replace(fullMatch, '');
          continue;
        }

        const renderedItems = await Promise.all(
          array.map(async item => {
            return await this.renderTemplate(itemTemplate, item);
          })
        );
        
        rendered = rendered.replace(fullMatch, renderedItems.join(''));
      }

      return rendered;
    } catch (error) {
      throw new Error(`Failed to render multiple items: ${error.message}`);
    }
  }

  async processContent(content) {
    if (!content) return '';

    // First sanitize the content
    const sanitized = await this.sanitizeContent(content);
    
    // Convert markdown to HTML if needed
    if (this.isMarkdown(sanitized)) {
      return marked(sanitized);
    }

    return sanitized;
  }

  isMarkdown(content) {
    // Simple markdown detection
    const markdownPatterns = [
      /^#{1,6}\s/m, // Headers
      /\*\*.*?\*\*/g, // Bold
      /\*.*?\*/g, // Italic
      /\[.*?\]\(.*?\)/g, // Links
      /^[-*+]\s/m, // Lists
    ];

    return markdownPatterns.some(pattern => pattern.test(content));
  }

  formatDate(dateString) {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  }

  extractTextContent(html) {
    if (!html) return '';
    
    // Remove HTML tags and decode entities
    let output = html;
    let prev;
    do {
      prev = output;
      output = output.replace(/<[^>]*>/g, '');
    } while (output !== prev);
    return output
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .trim();
  }

  truncateContent(content, maxLength = 200) {
    if (!content || content.length <= maxLength) {
      return content;
    }

    const truncated = content.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > 0) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }
}
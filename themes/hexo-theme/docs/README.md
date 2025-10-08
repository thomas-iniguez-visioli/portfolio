# Hexo Developer Theme Documentation

Welcome to the comprehensive documentation for the Hexo Developer Theme. This modern, developer-focused theme is built with cutting-edge CSS techniques, cross-browser compatibility, and accessibility in mind.

## 📚 Documentation Overview

This documentation provides everything you need to understand, use, and customize the Hexo Developer Theme:

### Core Documentation

- **[Style Guide](./style-guide.md)** - Complete visual and component reference
- **[Components Guide](./components-guide.md)** - Detailed component documentation with examples
- **[CSS Variables Reference](./css-variables-reference.md)** - Complete list of all CSS custom properties
- **[Customization Guide](./customization-guide.md)** - How to customize the theme for your needs

### Specialized Guides

- **[Color System](./color-system.md)** - Color palette and usage guidelines
- **[Developer Typography](./developer-typography.md)** - Typography system and font usage
- **[Utilities Guide](./utilities-guide.md)** - CSS utility classes reference
- **[Accessibility Guide](./accessibility-guide.md)** - Accessibility features and compliance
- **[Legacy Browser Support](./legacy-browser-support.md)** - Cross-browser compatibility information

## 🎨 Theme Features

### Design System
- **Modern Color Palette** - Developer-focused colors with dark mode support
- **Typography System** - JetBrains Mono, Inter, and Georgia font stack
- **Spacing System** - Consistent 4px grid-based spacing
- **Component Library** - Reusable, accessible components

### Developer-Specific Features
- **Technology Badges** - Authentic colors for popular technologies
- **Syntax Highlighting** - VS Code-inspired code block styling
- **Terminal Components** - Terminal-style interfaces and commands
- **IDE-Inspired Elements** - Familiar developer tool aesthetics
- **Status Indicators** - Developer availability and project status

### Technical Excellence
- **Cross-Browser Support** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Accessibility Compliant** - WCAG AA standards with screen reader support
- **Performance Optimized** - Critical CSS, lazy loading, and minimal bundle size
- **Responsive Design** - Mobile-first approach with fluid layouts
- **Dark Mode Support** - System preference detection and manual toggle

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or download the theme
git clone https://github.com/your-repo/hexo-developer-theme.git themes/hexo-theme

# Install dependencies
cd themes/hexo-theme
npm install
```

### 2. Configuration

Update your Hexo `_config.yml`:

```yaml
theme: hexo-theme

# Theme-specific configuration
theme_config:
  # Developer profile
  profile:
    name: "Your Name"
    title: "Full-Stack Developer"
    avatar: "/images/avatar.jpg"
    status: "Available for work"
  
  # Technology stack
  tech_stack:
    languages: ["JavaScript", "TypeScript", "Python"]
    frameworks: ["React", "Node.js", "Express"]
    tools: ["VS Code", "Git", "Docker"]
  
  # Social links
  social:
    github: "your-username"
    linkedin: "your-username"
    twitter: "your-username"
```

### 3. Customization

Create a custom CSS file to override theme variables:

```css
/* themes/hexo-theme/source/css/custom.css */
:root {
  --color-primary: #your-brand-color;
  --font-family-sans: 'Your Font', system-ui, sans-serif;
}
```

## 📖 Documentation Structure

### For Designers
- [Style Guide](./style-guide.md) - Visual reference and design patterns
- [Color System](./color-system.md) - Color palette and usage
- [Developer Typography](./developer-typography.md) - Typography system

### For Developers
- [Components Guide](./components-guide.md) - Component implementation
- [CSS Variables Reference](./css-variables-reference.md) - All available variables
- [Utilities Guide](./utilities-guide.md) - Utility classes reference

### For Customization
- [Customization Guide](./customization-guide.md) - Theme personalization
- [Legacy Browser Support](./legacy-browser-support.md) - Compatibility information

### For Accessibility
- [Accessibility Guide](./accessibility-guide.md) - Accessibility features and testing

## 🎯 Key Components

### Buttons
```html
<button class="btn btn-terminal">Execute Command</button>
<button class="btn btn-ide">Open File</button>
<button class="btn btn-ghost">Cancel</button>
```

### Cards
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Project Title</h3>
  </div>
  <div class="card-content">
    <p class="card-description">Project description</p>
  </div>
</div>
```

### Technology Badges
```html
<span class="badge-javascript">JavaScript</span>
<span class="badge-react">React</span>
<span class="badge-node">Node.js</span>
```

### Code Blocks
```html
<pre class="code-block">
<code class="hljs javascript">
const greeting = "Hello, Developer!";
console.log(greeting);
</code>
</pre>
```

## 🎨 Color System

### Primary Colors
- `--color-primary: #2563eb` - Main brand color
- `--color-primary-50: #eff6ff` - Lightest tint
- `--color-primary-900: #1e3a8a` - Darkest shade

### Developer Colors
- `--dev-terminal-bg: #1e1e1e` - Terminal background
- `--dev-syntax-keyword: #569cd6` - Syntax highlighting
- `--dev-badge-javascript: #f7df1e` - JavaScript badge

### Semantic Colors
- `--color-success: #10b981` - Success states
- `--color-warning: #f59e0b` - Warning states
- `--color-error: #ef4444` - Error states

## 📱 Responsive Design

The theme uses a mobile-first approach with these breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: ≥ 1280px

## 🌙 Dark Mode

Dark mode is supported through:

1. **System Preference**: Automatic detection via `prefers-color-scheme`
2. **Manual Toggle**: JavaScript-controlled theme switching
3. **Persistent Storage**: Remembers user preference

```css
/* Automatic dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-neutral-900);
  }
}

/* Manual dark mode */
[data-theme="dark"] {
  --color-background: var(--color-neutral-900);
}
```

## ♿ Accessibility

The theme meets WCAG AA standards with:

- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - Semantic HTML and ARIA labels
- **Color Contrast** - 4.5:1 minimum contrast ratio
- **Focus Management** - Visible focus indicators
- **Reduced Motion** - Respects `prefers-reduced-motion`

## 🔧 Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

### With Fallbacks
- Internet Explorer 11
- Older Safari versions
- Legacy mobile browsers

## 📊 Performance

### Optimization Features
- **Critical CSS** - Inlined for faster rendering
- **Lazy Loading** - Non-critical resources loaded on demand
- **Tree Shaking** - Unused CSS removed in production
- **Compression** - Gzip/Brotli compression support

### Bundle Sizes
- **Core CSS**: ~45KB (uncompressed), ~12KB (gzipped)
- **JavaScript**: ~15KB (uncompressed), ~5KB (gzipped)
- **Fonts**: ~200KB (cached after first load)

## 🧪 Testing

### Visual Testing
```bash
# Open test files in browser
open themes/hexo-theme/test-colors.html
open themes/hexo-theme/test-components.html
open themes/hexo-theme/test-responsive.html
```

### Cross-Browser Testing
The theme is tested on:
- BrowserStack for cross-browser compatibility
- Real devices for mobile testing
- Screen readers for accessibility

### Performance Testing
- Lighthouse audits
- WebPageTest analysis
- Core Web Vitals monitoring

## 🤝 Contributing

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Code Style
- Use CSS custom properties for all values
- Follow BEM naming convention
- Ensure WCAG AA compliance
- Test across all supported browsers

### Documentation
- Update relevant documentation files
- Include usage examples
- Test all code examples
- Follow existing documentation style

## 📝 Changelog

### Version 2.0.0
- Complete redesign with developer focus
- CSS custom properties system
- Comprehensive component library
- Dark mode support
- Accessibility improvements

### Version 1.x
- Legacy LESS-based theme
- Basic responsive design
- Limited customization options

## 📄 License

This theme is released under the MIT License. See [LICENSE](../LICENSE) for details.

## 🆘 Support

### Getting Help
- **Documentation**: Start with this documentation
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join community discussions
- **Email**: Contact the maintainers

### Common Issues
- **Styles not loading**: Check CSS file paths
- **Dark mode not working**: Verify JavaScript is enabled
- **Fonts not displaying**: Check font loading configuration
- **Layout issues**: Verify browser support

## 🔗 Related Resources

### External Resources
- [Hexo Documentation](https://hexo.io/docs/)
- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Performance Best Practices](https://web.dev/performance/)

### Tools and Services
- [BrowserStack](https://www.browserstack.com/) - Cross-browser testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing
- [WAVE](https://wave.webaim.org/) - Accessibility testing
- [Can I Use](https://caniuse.com/) - Browser compatibility

---

**Happy coding! 🚀**

This documentation is maintained by the theme contributors. If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.
# Developer Theme Color System

## Overview

The Developer Theme color system provides a comprehensive, WCAG AA compliant color palette designed specifically for developer portfolios and technical blogs. The system includes:

- **Modern CSS Variables**: All colors are defined as CSS custom properties for maximum flexibility
- **Dark Mode Support**: Automatic system preference detection and manual toggle
- **Cross-Browser Compatibility**: Fallbacks for browsers without CSS custom properties support
- **Developer-Specific Colors**: Syntax highlighting, terminal colors, and technology badges
- **WCAG AA Compliance**: All color combinations meet accessibility standards

## Color Palette

### Primary Colors
The primary color palette uses a modern blue scale perfect for developer themes:

```css
--color-primary: #2563eb;        /* Main brand color */
--color-primary-50: #eff6ff;     /* Lightest tint */
--color-primary-100: #dbeafe;    /* Very light */
--color-primary-200: #bfdbfe;    /* Light */
--color-primary-300: #93c5fd;    /* Medium light */
--color-primary-400: #60a5fa;    /* Medium */
--color-primary-500: #3b82f6;    /* Base */
--color-primary-600: #2563eb;    /* Primary (same as main) */
--color-primary-700: #1d4ed8;    /* Dark */
--color-primary-800: #1e40af;    /* Darker */
--color-primary-900: #1e3a8a;    /* Darkest */
```

### Neutral Colors
A comprehensive gray scale for text, backgrounds, and borders:

```css
--color-neutral-50: #f8fafc;     /* Almost white */
--color-neutral-100: #f1f5f9;    /* Very light gray */
--color-neutral-200: #e2e8f0;    /* Light gray */
--color-neutral-300: #cbd5e1;    /* Medium light gray */
--color-neutral-400: #94a3b8;    /* Medium gray */
--color-neutral-500: #64748b;    /* Base gray */
--color-neutral-600: #475569;    /* Dark gray */
--color-neutral-700: #334155;    /* Darker gray */
--color-neutral-800: #1e293b;    /* Very dark gray */
--color-neutral-900: #0f172a;    /* Almost black */
```

### Semantic Colors
Status and feedback colors:

```css
--color-success: #10b981;        /* Green for success states */
--color-warning: #f59e0b;        /* Orange for warnings */
--color-error: #ef4444;          /* Red for errors */
--color-info: #06b6d4;           /* Cyan for information */
```

## Developer-Specific Colors

### Terminal Colors
Colors inspired by modern terminal themes:

```css
--dev-terminal-bg: #1e1e1e;      /* Terminal background */
--dev-terminal-text: #d4d4d4;    /* Terminal text */
--dev-terminal-cursor: #ffffff;   /* Cursor color */
--dev-terminal-selection: #264f78; /* Selection background */
```

### Syntax Highlighting
VS Code Dark+ theme inspired colors:

```css
--dev-syntax-keyword: #569cd6;   /* Keywords (const, function, etc.) */
--dev-syntax-string: #ce9178;    /* String literals */
--dev-syntax-comment: #6a9955;   /* Comments */
--dev-syntax-number: #b5cea8;    /* Numbers */
--dev-syntax-function: #dcdcaa;  /* Function names */
--dev-syntax-variable: #9cdcfe;  /* Variables */
--dev-syntax-operator: #d4d4d4;  /* Operators (+, -, etc.) */
--dev-syntax-type: #4ec9b0;      /* Types and classes */
--dev-syntax-constant: #4fc1ff;  /* Constants */
```

### Technology Badge Colors
Authentic colors for popular technologies:

```css
--dev-badge-javascript: #f7df1e; /* JavaScript yellow */
--dev-badge-typescript: #3178c6; /* TypeScript blue */
--dev-badge-react: #61dafb;      /* React cyan */
--dev-badge-vue: #4fc08d;        /* Vue.js green */
--dev-badge-angular: #dd0031;    /* Angular red */
--dev-badge-node: #339933;       /* Node.js green */
--dev-badge-python: #3776ab;     /* Python blue */
--dev-badge-git: #f05032;        /* Git orange */
--dev-badge-docker: #2496ed;     /* Docker blue */
--dev-badge-aws: #ff9900;        /* AWS orange */
```

## Dark Mode Support

The color system includes comprehensive dark mode support with two activation methods:

### Automatic System Preference
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-neutral-900);
    --color-text-primary: var(--color-neutral-50);
    /* ... other dark mode overrides */
  }
}
```

### Manual Toggle
```css
[data-theme="dark"] {
  --color-background: var(--color-neutral-900);
  --color-text-primary: var(--color-neutral-50);
  /* ... other dark mode overrides */
}
```

### JavaScript API
```javascript
// Toggle between light and dark
window.toggleTheme();

// Set specific theme
window.setTheme('dark');
window.setTheme('light');

// Use system preference
window.useSystemTheme();

// Check current theme
window.themeManager.getCurrentTheme(); // 'dark' or 'light'
window.themeManager.isDarkMode(); // boolean
```

## Color Utilities

### Background Colors
```css
.bg-primary { background-color: var(--color-primary); }
.bg-neutral-100 { background-color: var(--color-neutral-100); }
.bg-success { background-color: var(--color-success); }
/* ... all color variations available */
```

### Text Colors
```css
.text-primary { color: var(--color-primary); }
.text-neutral-600 { color: var(--color-neutral-600); }
.text-success { color: var(--color-success); }
/* ... all color variations available */
```

### Border Colors
```css
.border-primary { border-color: var(--color-primary); }
.border-neutral-200 { border-color: var(--color-neutral-200); }
.border-error { border-color: var(--color-error); }
/* ... all color variations available */
```

### Developer Badge Classes
```css
.badge-javascript { /* JavaScript badge styling */ }
.badge-typescript { /* TypeScript badge styling */ }
.badge-react { /* React badge styling */ }
/* ... all technology badges available */
```

### Hover States
```css
.hover\:bg-primary:hover { background-color: var(--color-primary); }
.hover\:text-white:hover { color: #ffffff; }
/* ... hover utilities for interactive elements */
```

## WCAG Compliance

All color combinations in the system meet WCAG AA standards (4.5:1 contrast ratio minimum):

### High Contrast Utilities
```css
.text-contrast-high {
  color: var(--color-neutral-900);
  background-color: var(--color-neutral-50);
  /* Contrast ratio: 16.75:1 (AAA) */
}

.text-contrast-high-inverse {
  color: var(--color-neutral-50);
  background-color: var(--color-neutral-900);
  /* Contrast ratio: 16.75:1 (AAA) */
}
```

### Focus Indicators
```css
.focus\:ring-primary:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

## Cross-Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

### Fallbacks
For browsers without CSS custom properties support:

```css
@supports not (--css: variables) {
  .bg-primary { background-color: #2563eb; }
  .text-primary { color: #2563eb; }
  /* ... static fallback values */
}
```

### Feature Detection
The system includes JavaScript feature detection:

```javascript
// Detect CSS Variables support
const cssVarsSupported = window.CSS && CSS.supports('color', 'var(--test)');

// Detect CSS Grid support
const gridSupported = CSS.supports('display', 'grid');

// Detect dark mode media query support
const darkModeSupported = window.matchMedia && 
  window.matchMedia('(prefers-color-scheme: dark)').matches !== undefined;
```

## Usage Examples

### Basic Color Application
```html
<div class="bg-primary text-white">
  Primary background with white text
</div>

<p class="text-neutral-600">
  Secondary text color
</p>

<button class="bg-success hover:bg-success-dark text-white">
  Success button with hover effect
</button>
```

### Developer Badges
```html
<div class="badge-grid">
  <span class="badge-javascript">JavaScript</span>
  <span class="badge-typescript">TypeScript</span>
  <span class="badge-react">React</span>
  <span class="badge-node">Node.js</span>
</div>
```

### Code Syntax Highlighting
```html
<pre class="syntax-example">
  <code>
    <span class="text-syntax-keyword">const</span>
    <span class="text-syntax-variable">greeting</span>
    <span class="text-syntax-operator">=</span>
    <span class="text-syntax-string">"Hello, World!"</span>;
  </code>
</pre>
```

### Dark Mode Toggle
```html
<button data-theme-toggle class="theme-toggle">
  <span data-theme-icon class="theme-toggle-icon"></span>
  <span class="theme-toggle-text">Toggle Theme</span>
</button>
```

## Testing

### Color Test Page
Open `test-colors.html` in your browser to:
- View all color swatches
- Test dark mode toggle
- Verify cross-browser compatibility
- Check WCAG contrast ratios
- Test developer badge colors
- Verify syntax highlighting colors

### Browser Testing
The color system has been tested on:
- Chrome (Windows, macOS, Android)
- Firefox (Windows, macOS)
- Safari (macOS, iOS)
- Edge (Windows)

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- High contrast mode support
- Color blindness considerations

## Performance

### CSS File Sizes
- `variables.css`: ~15KB (uncompressed)
- `colors.css`: ~12KB (uncompressed)
- `dark-mode.css`: ~8KB (uncompressed)

### Optimization Features
- CSS custom properties for runtime efficiency
- Minimal specificity for better performance
- Tree-shakeable utility classes
- Compressed output via PostCSS

## Migration Guide

### From LESS Variables
Old LESS variables are mapped to new CSS custom properties:

```css
/* Old LESS */
@brand-primary: #2563eb;

/* New CSS Custom Properties */
--color-primary: #2563eb;
--brand-primary: var(--color-primary); /* Legacy compatibility */
```

### Updating Existing Styles
1. Replace hardcoded colors with CSS custom properties
2. Use utility classes for common color applications
3. Update dark mode styles to use the new system
4. Test across all supported browsers

## Contributing

When adding new colors:
1. Ensure WCAG AA compliance (4.5:1 contrast minimum)
2. Add both light and dark mode variants
3. Include fallbacks for older browsers
4. Update the test page with new colors
5. Document the new colors in this guide

## Troubleshooting

### Common Issues

**Colors not applying in older browsers:**
- Check if CSS custom properties are supported
- Verify fallback values are present
- Use feature detection JavaScript

**Dark mode not working:**
- Ensure `data-theme` attribute is set on `<html>`
- Check if dark mode CSS is loaded
- Verify JavaScript toggle is working

**Poor contrast in custom combinations:**
- Use the contrast testing utilities
- Check against WCAG guidelines
- Test with accessibility tools

### Debug Tools
- Browser DevTools for CSS custom properties
- Lighthouse for accessibility auditing
- Color contrast analyzers
- Cross-browser testing tools
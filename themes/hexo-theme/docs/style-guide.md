# Developer Theme Style Guide

## Overview

This comprehensive style guide documents all components, utilities, and design patterns available in the Hexo Developer Theme. The theme is built with modern CSS techniques, cross-browser compatibility, and developer-focused aesthetics.

## Table of Contents

1. [Design System](#design-system)
2. [Components](#components)
3. [CSS Variables](#css-variables)
4. [Usage Examples](#usage-examples)
5. [Customization](#customization)
6. [Browser Support](#browser-support)

## Design System

### Color Palette

The theme uses a modern, developer-focused color system with comprehensive dark mode support.

#### Primary Colors
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

#### Neutral Colors
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

#### Semantic Colors
```css
--color-success: #10b981;        /* Green for success states */
--color-warning: #f59e0b;        /* Orange for warnings */
--color-error: #ef4444;          /* Red for errors */
--color-info: #06b6d4;           /* Cyan for information */
```

### Typography

The theme uses a three-font system optimized for developer content:

- **Sans-serif (UI)**: Inter with system fallbacks
- **Serif (Body)**: Georgia with system fallbacks  
- **Monospace (Code)**: JetBrains Mono with system fallbacks

#### Font Scale
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
--font-size-6xl: 3.75rem;   /* 60px */
```

### Spacing System

Based on a 4px grid system for consistent spacing:

```css
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
```

## Components

### Buttons

The theme includes several button variants optimized for developer interfaces:

#### Terminal Button
```html
<button class="btn btn-terminal">
  Execute Command
</button>
```

#### IDE Button
```html
<button class="btn btn-ide">
  Open File
</button>
```

#### Ghost Button
```html
<button class="btn btn-ghost">
  Cancel
</button>
```

#### Primary Button
```html
<button class="btn btn-primary">
  Save Changes
</button>
```

#### Button Sizes
```html
<button class="btn btn-primary btn-xs">Extra Small</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-xl">Extra Large</button>
```

#### Button with Icon
```html
<button class="btn btn-primary">
  <svg class="btn-icon" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
  Star Repository
</button>
```

### Cards

Modern card components with hover effects and flexible layouts:

#### Basic Card
```html
<div class="card">
  <div class="card-header">
    <div class="card-icon">
      <svg viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
    <div>
      <h3 class="card-title">
        <a href="/project">Project Title</a>
      </h3>
      <p class="card-subtitle">Web Application</p>
    </div>
  </div>
  
  <div class="card-content">
    <p class="card-description">
      A modern web application built with React and Node.js, featuring real-time updates and responsive design.
    </p>
    
    <div class="card-tags">
      <span class="card-tag">React</span>
      <span class="card-tag">Node.js</span>
      <span class="card-tag">TypeScript</span>
    </div>
    
    <div class="card-meta">
      <span class="card-date">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
        March 15, 2024
      </span>
      <span class="card-reading-time">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
        </svg>
        5 min read
      </span>
    </div>
  </div>
</div>
```

#### Card with Image
```html
<div class="card">
  <div class="card-image-wrapper">
    <img src="/images/project-screenshot.jpg" alt="Project Screenshot" class="card-image">
  </div>
  
  <div class="card-content">
    <h3 class="card-title">
      <a href="/project">Project with Image</a>
    </h3>
    <p class="card-description">
      Project description with accompanying screenshot.
    </p>
  </div>
</div>
```

#### Card Grid Layout
```html
<div class="cards-grid">
  <div class="card"><!-- Card 1 --></div>
  <div class="card"><!-- Card 2 --></div>
  <div class="card"><!-- Card 3 --></div>
</div>
```

### Developer-Specific Components

#### Technology Badges
```html
<div class="tech-badges">
  <span class="badge-javascript">JavaScript</span>
  <span class="badge-typescript">TypeScript</span>
  <span class="badge-react">React</span>
  <span class="badge-node">Node.js</span>
  <span class="badge-python">Python</span>
  <span class="badge-docker">Docker</span>
  <span class="badge-aws">AWS</span>
</div>
```

#### Developer Status
```html
<div class="dev-status-container">
  <span class="dev-status dev-status--online">Available for work</span>
  <span class="dev-status dev-status--busy">Currently busy</span>
  <span class="dev-status dev-status--away">Away</span>
  <span class="dev-status dev-status--offline">Offline</span>
</div>
```

#### Code Blocks
```html
<pre class="code-block">
<code class="hljs javascript">
<span class="text-syntax-keyword">function</span> <span class="text-syntax-function">greet</span>(<span class="text-syntax-variable">name</span>) {
  <span class="text-syntax-keyword">return</span> <span class="text-syntax-string">`Hello, ${name}!`</span>;
}

<span class="text-syntax-comment">// Call the function</span>
<span class="text-syntax-keyword">const</span> <span class="text-syntax-variable">message</span> = <span class="text-syntax-function">greet</span>(<span class="text-syntax-string">'Developer'</span>);
<span class="text-syntax-variable">console</span>.<span class="text-syntax-function">log</span>(<span class="text-syntax-variable">message</span>);
</code>
</pre>
```

#### Terminal Style
```html
<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-title">Terminal</span>
    <div class="terminal-controls">
      <span class="terminal-control terminal-control--close"></span>
      <span class="terminal-control terminal-control--minimize"></span>
      <span class="terminal-control terminal-control--maximize"></span>
    </div>
  </div>
  <div class="terminal-content">
    <div class="terminal-line">
      <span class="terminal-prompt">$</span>
      <span class="terminal-command">npm install</span>
    </div>
    <div class="terminal-output">
      Installing packages...
      ✓ Package installed successfully
    </div>
  </div>
</div>
```

### Navigation Components

#### Sidebar Navigation
```html
<nav class="dev-sidebar">
  <div class="dev-sidebar-header">
    <div class="dev-profile">
      <img src="/images/avatar.jpg" alt="Developer Avatar" class="dev-avatar">
      <div class="dev-info">
        <h3 class="dev-name">John Developer</h3>
        <p class="dev-title">Full-Stack Developer</p>
        <span class="dev-status dev-status--online">Available</span>
      </div>
    </div>
  </div>
  
  <div class="dev-sidebar-content">
    <ul class="dev-nav">
      <li class="dev-nav-item">
        <a href="/" class="dev-nav-link dev-nav-link--active">
          <svg class="dev-nav-icon" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          Home
        </a>
      </li>
      <li class="dev-nav-item">
        <a href="/projects" class="dev-nav-link">
          <svg class="dev-nav-icon" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
          </svg>
          Projects
        </a>
      </li>
      <li class="dev-nav-item">
        <a href="/blog" class="dev-nav-link">
          <svg class="dev-nav-icon" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          Blog
        </a>
      </li>
      <li class="dev-nav-item">
        <a href="/about" class="dev-nav-link">
          <svg class="dev-nav-icon" viewBox="0 0 24 24">
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
          </svg>
          About
        </a>
      </li>
    </ul>
    
    <div class="dev-tech-stack">
      <h4 class="dev-section-title">Tech Stack</h4>
      <div class="dev-badges">
        <span class="badge-javascript">JavaScript</span>
        <span class="badge-typescript">TypeScript</span>
        <span class="badge-react">React</span>
        <span class="badge-node">Node.js</span>
      </div>
    </div>
  </div>
</nav>
```

### Form Components

#### Input Fields
```html
<div class="form-group">
  <label for="email" class="form-label">Email Address</label>
  <input type="email" id="email" class="form-input" placeholder="Enter your email">
</div>

<div class="form-group">
  <label for="message" class="form-label">Message</label>
  <textarea id="message" class="form-textarea" rows="4" placeholder="Your message"></textarea>
</div>

<div class="form-group">
  <label class="form-checkbox">
    <input type="checkbox" class="form-checkbox-input">
    <span class="form-checkbox-label">Subscribe to newsletter</span>
  </label>
</div>
```

#### Form Validation States
```html
<div class="form-group form-group--success">
  <label for="valid-input" class="form-label">Valid Input</label>
  <input type="text" id="valid-input" class="form-input form-input--success" value="Valid value">
  <p class="form-help form-help--success">This field is valid</p>
</div>

<div class="form-group form-group--error">
  <label for="invalid-input" class="form-label">Invalid Input</label>
  <input type="text" id="invalid-input" class="form-input form-input--error" value="Invalid value">
  <p class="form-help form-help--error">This field has an error</p>
</div>
```

## CSS Variables

### Complete Variable Reference

The theme uses CSS custom properties for maximum flexibility and customization:

#### Colors
```css
/* Primary Colors */
--color-primary: #2563eb;
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
/* ... (see full list in variables.css) */

/* Neutral Colors */
--color-neutral-50: #f8fafc;
--color-neutral-100: #f1f5f9;
/* ... (see full list in variables.css) */

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #06b6d4;
```

#### Typography
```css
/* Font Families */
--font-family-sans: 'Inter', system-ui, sans-serif;
--font-family-serif: Georgia, serif;
--font-family-mono: 'JetBrains Mono', monospace;

/* Font Sizes */
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
/* ... (see full list in variables.css) */

/* Font Weights */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### Spacing
```css
/* Spacing Scale */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
/* ... (see full list in variables.css) */
```

#### Developer-Specific Variables
```css
/* Terminal Colors */
--dev-terminal-bg: #1e1e1e;
--dev-terminal-text: #d4d4d4;
--dev-terminal-cursor: #ffffff;

/* Syntax Highlighting */
--dev-syntax-keyword: #569cd6;
--dev-syntax-string: #ce9178;
--dev-syntax-comment: #6a9955;
--dev-syntax-number: #b5cea8;
--dev-syntax-function: #dcdcaa;

/* Status Colors */
--dev-status-online: #10b981;
--dev-status-busy: #f59e0b;
--dev-status-away: #6b7280;
--dev-status-offline: #ef4444;

/* Technology Badge Colors */
--dev-badge-javascript: #f7df1e;
--dev-badge-typescript: #3178c6;
--dev-badge-react: #61dafb;
--dev-badge-vue: #4fc08d;
--dev-badge-node: #339933;
--dev-badge-python: #3776ab;
--dev-badge-docker: #2496ed;
--dev-badge-aws: #ff9900;
```

## Usage Examples

### Complete Page Layout
```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio</title>
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="dev-sidebar">
      <!-- Sidebar content -->
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
      <header class="page-header">
        <h1 class="page-title">My Projects</h1>
        <p class="page-description">A collection of my recent work</p>
      </header>
      
      <section class="content-section">
        <div class="cards-grid">
          <!-- Project cards -->
        </div>
      </section>
    </main>
  </div>
</body>
</html>
```

### Dark Mode Toggle
```html
<button class="theme-toggle" data-theme-toggle>
  <svg class="theme-icon theme-icon--light" viewBox="0 0 24 24">
    <path d="M12,18C8.69,18 6,15.31 6,12C6,8.69 8.69,6 12,6C15.31,6 18,8.69 18,12C18,15.31 15.31,18 12,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2"/>
  </svg>
  <svg class="theme-icon theme-icon--dark" viewBox="0 0 24 24">
    <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z"/>
  </svg>
  <span class="theme-toggle-text">Toggle Theme</span>
</button>
```

### Responsive Grid with Cards
```html
<div class="container">
  <div class="cards-grid">
    <div class="card card-featured">
      <div class="card-content">
        <h2 class="card-title">Featured Project</h2>
        <p class="card-description">
          This is a featured project that spans the full width of the grid.
        </p>
        <div class="card-actions">
          <a href="/project" class="card-action card-action-primary">View Project</a>
          <a href="/demo" class="card-action">Live Demo</a>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-content">
        <h3 class="card-title">Regular Project</h3>
        <p class="card-description">A regular project card.</p>
      </div>
    </div>
    
    <div class="card">
      <div class="card-content">
        <h3 class="card-title">Another Project</h3>
        <p class="card-description">Another regular project card.</p>
      </div>
    </div>
  </div>
</div>
```

## Customization

### Customizing Colors

To customize the theme colors, override the CSS custom properties:

```css
:root {
  /* Change primary color */
  --color-primary: #your-brand-color;
  --color-primary-50: #your-light-tint;
  --color-primary-700: #your-dark-shade;
  
  /* Change developer badge colors */
  --dev-badge-javascript: #your-js-color;
  --dev-badge-react: #your-react-color;
}
```

### Customizing Typography

```css
:root {
  /* Change font families */
  --font-family-sans: 'Your Font', system-ui, sans-serif;
  --font-family-mono: 'Your Code Font', monospace;
  
  /* Adjust font sizes */
  --font-size-base: 1.125rem; /* Larger base font */
  --font-size-lg: 1.25rem;
}
```

### Customizing Spacing

```css
:root {
  /* Adjust spacing scale */
  --space-4: 1.5rem; /* Larger base spacing */
  --space-6: 2.25rem;
  --space-8: 3rem;
}
```

### Adding Custom Components

Create custom components following the theme patterns:

```css
.my-custom-component {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-all);
}

.my-custom-component:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

## Browser Support

The theme supports all modern browsers with graceful fallbacks:

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

### Legacy Support
- Internet Explorer 11 (with fallbacks)
- Older Safari versions (with prefixes)

### Feature Detection

The theme includes feature detection for:
- CSS Custom Properties
- CSS Grid
- CSS Flexbox
- Dark mode media queries

### Fallbacks

```css
/* CSS Variables fallback */
.no-css-variables {
  color: #0f172a;
  background-color: #ffffff;
}

/* CSS Grid fallback */
@supports not (display: grid) {
  .cards-grid {
    display: block;
  }
  
  .cards-grid > * {
    margin-bottom: 1rem;
  }
}
```

## Performance

### Optimization Features
- Critical CSS inlined in `<head>`
- Non-critical CSS lazy-loaded
- CSS custom properties for runtime efficiency
- Minimal specificity for better performance
- Tree-shakeable utility classes
- Gzip compression support

### File Sizes
- Core CSS: ~45KB (uncompressed)
- Utilities: ~25KB (uncompressed)
- Components: ~30KB (uncompressed)
- Total: ~100KB (uncompressed), ~25KB (gzipped)

## Testing

### Visual Testing
Open the test files in your browser:
- `test-colors.html` - Color system testing
- `test-components.html` - Component testing
- `test-responsive.html` - Responsive testing
- `test-accessibility.html` - Accessibility testing

### Cross-Browser Testing
The theme has been tested on:
- Chrome (Windows, macOS, Android)
- Firefox (Windows, macOS)
- Safari (macOS, iOS)
- Edge (Windows)

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- High contrast mode support
- Color blindness considerations
- WCAG AA compliance

## Contributing

When contributing to the theme:

1. Follow the existing naming conventions
2. Ensure WCAG AA compliance for new components
3. Add fallbacks for older browsers
4. Update documentation for new features
5. Test across all supported browsers
6. Include responsive considerations

## Troubleshooting

### Common Issues

**Styles not applying:**
- Check if CSS files are loaded correctly
- Verify CSS custom properties support
- Check for conflicting styles

**Dark mode not working:**
- Ensure `data-theme` attribute is set
- Check if dark mode CSS is loaded
- Verify JavaScript toggle functionality

**Components not displaying correctly:**
- Check browser support
- Verify all required CSS files are loaded
- Check for JavaScript dependencies

### Debug Mode

Enable debug mode by adding the `debug-mode` class to the body:

```html
<body class="debug-mode">
  <!-- Your content -->
</body>
```

This will show visual debugging aids for layout and spacing issues.
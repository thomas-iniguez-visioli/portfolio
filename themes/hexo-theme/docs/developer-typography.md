# Developer Typography System

This document describes the comprehensive developer typography system implemented for the Hexo theme. The system is optimized for developer content with JetBrains Mono and Inter fonts, comprehensive syntax highlighting, and responsive design.

## Overview

The developer typography system includes:

- **JetBrains Mono** for code and monospace content with ligature support
- **Inter** for headings and UI elements with optimized spacing
- **Georgia** for body text with excellent readability
- Comprehensive syntax highlighting for code blocks
- Responsive typography that scales across devices
- Accessibility enhancements and high contrast support
- Cross-browser compatibility with fallbacks

## Font Stack

### Sans-serif (Headings & UI)
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Serif (Body Text)
```css
font-family: Georgia, 'Times New Roman', Times, serif;
```

### Monospace (Code)
```css
font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
```

## Typography Scale

The system uses a modular scale optimized for developer content:

| Size | Value | Usage |
|------|-------|-------|
| `text-xs` | 0.75rem (12px) | Small annotations, metadata |
| `text-sm` | 0.875rem (14px) | Code comments, captions |
| `text-base` | 1rem (16px) | Body text |
| `text-lg` | 1.125rem (18px) | Large body text |
| `text-xl` | 1.25rem (20px) | Small headings |
| `text-2xl` | 1.5rem (24px) | Medium headings |
| `text-3xl` | 1.875rem (30px) | Large headings |
| `text-4xl` | 2.25rem (36px) | Extra large headings |
| `text-5xl` | 3rem (48px) | Hero headings |
| `text-6xl` | 3.75rem (60px) | Display headings |

## Heading Hierarchy

The heading system provides clear visual hierarchy:

```html
<h1 class="dev-heading dev-heading--hero">Hero Heading</h1>
<h2 class="dev-heading dev-heading--section">Section Heading</h2>
<h3 class="dev-heading dev-heading--subsection">Subsection Heading</h3>
<h4 class="dev-heading">Standard Heading</h4>
<h5 class="dev-heading">Small Heading</h5>
<h6 class="dev-heading">Micro Heading</h6>
```

## Code Typography

### Inline Code
```html
<code class="code-inline">const variable = 'value';</code>
```

### Code Blocks
```html
<pre class="code-block">
<code class="hljs javascript">
function example() {
  return 'Hello, World!';
}
</code>
</pre>
```

### Terminal Style
```html
<div class="terminal-block">
  <span class="terminal-prompt">$</span>
  <span class="terminal-command">npm install</span>
  <div class="terminal-output">Installing packages...</div>
</div>
```

### Code with Language Label
```html
<div class="code-snippet" data-language="javascript">
  <pre class="code-block">
    <code class="hljs javascript">
      // Your code here
    </code>
  </pre>
</div>
```

## Developer-Specific Components

### Technology Badges
```html
<span class="dev-badge" style="background-color: var(--dev-badge-javascript);">JavaScript</span>
<span class="dev-badge" style="background-color: var(--dev-badge-react);">React</span>
<span class="dev-badge" style="background-color: var(--dev-badge-node);">Node.js</span>
```

### Status Indicators
```html
<span class="dev-status dev-status--online">Online</span>
<span class="dev-status dev-status--busy">Busy</span>
<span class="dev-status dev-status--away">Away</span>
<span class="dev-status dev-status--offline">Offline</span>
```

### Technology Stack
```html
<div class="tech-stack">
  Frontend: React, TypeScript, Tailwind CSS<br>
  Backend: Node.js, Express, PostgreSQL<br>
  Tools: VS Code, Git, Docker
</div>
```

### Developer Links
```html
<a href="#" class="dev-link">Regular developer link</a>
<a href="#" class="dev-link dev-link--mono">Monospace link</a>
```

### Syntax Elements
```html
<span class="dev-var">variable</span>
<span class="dev-function">function()</span>
<span class="dev-keyword">const</span>
<span class="dev-string">"string value"</span>
<span class="dev-number">42</span>
<span class="dev-comment">// This is a comment</span>
```

## Responsive Typography

The system includes responsive utilities:

```html
<!-- Responsive font sizes -->
<h1 class="text-3xl md:text-4xl lg:text-5xl">Responsive Heading</h1>

<!-- Responsive prose width -->
<div class="dev-prose md:dev-prose--wide lg:dev-prose--wide">
  Content that adapts to screen size
</div>

<!-- Responsive developer headings -->
<h1 class="dev-heading--hero md:dev-heading--hero lg:dev-heading--hero">
  Hero heading that scales
</h1>
```

## Utility Classes

### Font Families
- `.font-sans` - Inter with system fallbacks
- `.font-serif` - Georgia with system fallbacks  
- `.font-mono` - JetBrains Mono with system fallbacks

### Font Weights
- `.font-light` (300)
- `.font-normal` (400)
- `.font-medium` (500)
- `.font-semibold` (600)
- `.font-bold` (700)
- `.font-extrabold` (800)

### Line Heights
- `.leading-none` (1)
- `.leading-tight` (1.25)
- `.leading-snug` (1.375)
- `.leading-normal` (1.5)
- `.leading-relaxed` (1.625)
- `.leading-loose` (2)
- `.leading-code` (1.6) - Optimized for code

### Letter Spacing
- `.tracking-tighter` (-0.05em)
- `.tracking-tight` (-0.025em)
- `.tracking-normal` (0)
- `.tracking-wide` (0.025em)
- `.tracking-wider` (0.05em)
- `.tracking-widest` (0.1em)

### Text Colors
- `.text-primary` - Primary text color
- `.text-secondary` - Secondary text color
- `.text-tertiary` - Tertiary text color
- `.text-muted` - Muted text color
- `.text-brand` - Brand color

## Syntax Highlighting

The system includes comprehensive syntax highlighting for:

- JavaScript/TypeScript
- HTML/XML
- CSS/SCSS
- JSON
- Python
- Shell/Bash
- And many more languages

### Syntax Colors
- **Keywords**: `var(--dev-syntax-keyword)` - Blue
- **Strings**: `var(--dev-syntax-string)` - Orange
- **Comments**: `var(--dev-syntax-comment)` - Green
- **Numbers**: `var(--dev-syntax-number)` - Light green
- **Functions**: `var(--dev-syntax-function)` - Yellow
- **Variables**: `var(--dev-syntax-variable)` - Light blue
- **Operators**: `var(--dev-syntax-operator)` - White

## Accessibility Features

### High Contrast Support
The system automatically adapts to high contrast mode:

```css
@media (prefers-contrast: high) {
  /* Enhanced contrast for code blocks */
  .code-inline,
  .code-block {
    background-color: #000000 !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
  }
}
```

### Reduced Motion Support
Respects user motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels where needed
- Skip links for navigation

## Dark Mode Support

The typography system includes comprehensive dark mode support:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-neutral-900);
    --color-text-primary: var(--color-neutral-100);
    /* ... other dark mode variables */
  }
}
```

Manual dark mode toggle is also supported via `[data-theme="dark"]`.

## Performance Optimizations

### Font Loading
- Uses `font-display: swap` for optimal loading
- Preloads critical font files
- Provides system font fallbacks
- Progressive enhancement approach

### Critical CSS
- Inline critical typography styles
- Lazy load non-critical styles
- Minimize layout shifts

### Font Features
- Enables ligatures for code fonts
- Optimizes kerning for text fonts
- Uses appropriate font variants

## Browser Support

The system supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

Fallbacks are provided for older browsers using system fonts.

## Implementation

To use the developer typography system:

1. Include the CSS files in your theme:
```html
<link rel="stylesheet" href="/css/fonts.css">
<link rel="stylesheet" href="/css/foundation/typography.css">
<link rel="stylesheet" href="/css/typography-utilities.css">
<link rel="stylesheet" href="/css/components/syntax-highlighting.css">
```

2. Include the font loading partial:
```html
<%- partial('_fonts') %>
```

3. Use the utility classes and components as needed in your templates.

## Customization

The system is highly customizable through CSS custom properties. Key variables include:

```css
:root {
  /* Font families */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;
  
  /* Font sizes */
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  
  /* Colors */
  --dev-syntax-keyword: #569cd6;
  --dev-syntax-string: #ce9178;
  --dev-syntax-comment: #6a9955;
  
  /* Spacing */
  --space-4: 1rem;
  --space-6: 1.5rem;
}
```

Modify these variables to customize the appearance while maintaining the system's structure and functionality.
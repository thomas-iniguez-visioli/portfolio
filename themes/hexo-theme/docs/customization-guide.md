# Theme Customization Guide

This guide explains how to customize the Hexo Developer Theme to match your personal brand and preferences. The theme is built with CSS custom properties, making it highly customizable without modifying the core files.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Color Customization](#color-customization)
3. [Typography Customization](#typography-customization)
4. [Spacing and Layout](#spacing-and-layout)
5. [Component Customization](#component-customization)
6. [Developer-Specific Customization](#developer-specific-customization)
7. [Dark Mode Customization](#dark-mode-customization)
8. [Advanced Customization](#advanced-customization)
9. [Best Practices](#best-practices)

## Getting Started

### Creating a Custom CSS File

Create a custom CSS file to override theme variables:

```css
/* themes/hexo-theme/source/css/custom.css */

:root {
  /* Your custom variables here */
}

/* Your custom styles here */
```

### Including Custom CSS

Add your custom CSS file to the theme configuration:

```yaml
# _config.yml (theme config)
custom_css:
  - css/custom.css
```

Or include it directly in your layout:

```html
<!-- In your layout file -->
<link rel="stylesheet" href="<%= url_for('css/custom.css') %>">
```

## Color Customization

### Changing the Primary Color

```css
:root {
  /* Change primary color to your brand color */
  --color-primary: #your-brand-color;
  
  /* Optionally, create a full scale */
  --color-primary-50: #your-lightest-tint;
  --color-primary-100: #your-very-light;
  --color-primary-200: #your-light;
  --color-primary-300: #your-medium-light;
  --color-primary-400: #your-medium;
  --color-primary-500: #your-base;
  --color-primary-600: #your-brand-color;
  --color-primary-700: #your-dark;
  --color-primary-800: #your-darker;
  --color-primary-900: #your-darkest;
}
```

### Example: Purple Brand

```css
:root {
  --color-primary: #8b5cf6;
  --color-primary-50: #f5f3ff;
  --color-primary-100: #ede9fe;
  --color-primary-200: #ddd6fe;
  --color-primary-300: #c4b5fd;
  --color-primary-400: #a78bfa;
  --color-primary-500: #8b5cf6;
  --color-primary-600: #7c3aed;
  --color-primary-700: #6d28d9;
  --color-primary-800: #5b21b6;
  --color-primary-900: #4c1d95;
}
```

### Customizing Semantic Colors

```css
:root {
  /* Success color (green) */
  --color-success: #059669;
  --color-success-light: #10b981;
  --color-success-dark: #047857;
  
  /* Warning color (amber) */
  --color-warning: #d97706;
  --color-warning-light: #f59e0b;
  --color-warning-dark: #b45309;
  
  /* Error color (red) */
  --color-error: #dc2626;
  --color-error-light: #ef4444;
  --color-error-dark: #b91c1c;
}
```

### Background and Text Colors

```css
:root {
  /* Background colors */
  --color-background: #fafafa;
  --color-background-secondary: #f5f5f5;
  --color-background-tertiary: #eeeeee;
  
  /* Text colors */
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #4a4a4a;
  --color-text-tertiary: #6a6a6a;
  --color-text-muted: #9a9a9a;
}
```

## Typography Customization

### Changing Font Families

```css
:root {
  /* Use Google Fonts */
  --font-family-sans: 'Poppins', system-ui, sans-serif;
  --font-family-serif: 'Merriweather', Georgia, serif;
  --font-family-mono: 'Source Code Pro', 'JetBrains Mono', monospace;
}
```

### Font Loading with Google Fonts

```html
<!-- In your head section -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap" rel="stylesheet">
```

### Adjusting Font Sizes

```css
:root {
  /* Increase base font size */
  --font-size-base: 1.125rem; /* 18px instead of 16px */
  
  /* Adjust other sizes proportionally */
  --font-size-sm: 1rem;       /* 16px */
  --font-size-lg: 1.25rem;    /* 20px */
  --font-size-xl: 1.375rem;   /* 22px */
  --font-size-2xl: 1.625rem;  /* 26px */
}
```

### Custom Typography Scale

```css
:root {
  /* Create a custom scale */
  --font-size-xs: 0.8125rem;  /* 13px */
  --font-size-sm: 0.9375rem;  /* 15px */
  --font-size-base: 1.0625rem; /* 17px */
  --font-size-lg: 1.1875rem;  /* 19px */
  --font-size-xl: 1.375rem;   /* 22px */
  --font-size-2xl: 1.625rem;  /* 26px */
  --font-size-3xl: 2rem;      /* 32px */
}
```

## Spacing and Layout

### Adjusting the Spacing Scale

```css
:root {
  /* Increase spacing for more generous layouts */
  --space-1: 0.375rem;   /* 6px instead of 4px */
  --space-2: 0.75rem;    /* 12px instead of 8px */
  --space-3: 1.125rem;   /* 18px instead of 12px */
  --space-4: 1.5rem;     /* 24px instead of 16px */
  --space-6: 2.25rem;    /* 36px instead of 24px */
  --space-8: 3rem;       /* 48px instead of 32px */
}
```

### Container Sizes

```css
:root {
  /* Adjust container max-widths */
  --container-sm: 720px;
  --container-md: 960px;
  --container-lg: 1140px;
  --container-xl: 1320px;
  --container-max: 1400px;
}
```

### Border Radius

```css
:root {
  /* More rounded corners */
  --border-radius-base: 0.5rem;   /* 8px */
  --border-radius-lg: 0.75rem;    /* 12px */
  --border-radius-xl: 1rem;       /* 16px */
  
  /* Or more angular design */
  --border-radius-base: 0.125rem; /* 2px */
  --border-radius-lg: 0.25rem;    /* 4px */
  --border-radius-xl: 0.375rem;   /* 6px */
}
```

## Component Customization

### Button Customization

```css
/* Custom button styles */
.btn-custom {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-700));
  border: none;
  border-radius: var(--border-radius-xl);
  padding: var(--space-3) var(--space-6);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: var(--transition-all);
}

.btn-custom:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--shadow-lg);
}
```

### Card Customization

```css
/* Custom card styles */
.card-custom {
  background: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-2xl);
  padding: var(--space-8);
  position: relative;
  overflow: hidden;
}

.card-custom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-success));
}

.card-custom:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}
```

### Navigation Customization

```css
/* Custom sidebar styles */
.dev-sidebar-custom {
  background: linear-gradient(180deg, var(--color-neutral-900), var(--color-neutral-800));
  border-right: 3px solid var(--color-primary);
}

.dev-nav-link-custom {
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--space-2);
  transition: var(--transition-all);
}

.dev-nav-link-custom:hover {
  background-color: var(--color-primary);
  transform: translateX(4px);
}
```

## Developer-Specific Customization

### Technology Badge Colors

```css
:root {
  /* Customize technology badge colors */
  --dev-badge-javascript: #f0db4f;
  --dev-badge-typescript: #007acc;
  --dev-badge-react: #61dafb;
  --dev-badge-vue: #4fc08d;
  --dev-badge-angular: #dd0031;
  --dev-badge-svelte: #ff3e00;
  --dev-badge-nextjs: #000000;
  --dev-badge-nuxt: #00dc82;
  
  /* Add custom technology badges */
  --dev-badge-flutter: #02569b;
  --dev-badge-kotlin: #7f52ff;
  --dev-badge-swift: #fa7343;
  --dev-badge-unity: #000000;
}
```

### Custom Technology Badges

```css
/* Create custom badge styles */
.badge-flutter {
  background-color: var(--dev-badge-flutter);
  color: white;
}

.badge-kotlin {
  background-color: var(--dev-badge-kotlin);
  color: white;
}

.badge-swift {
  background-color: var(--dev-badge-swift);
  color: white;
}
```

### Syntax Highlighting Customization

```css
:root {
  /* Customize syntax highlighting colors */
  --dev-syntax-keyword: #ff79c6;     /* Pink keywords */
  --dev-syntax-string: #f1fa8c;      /* Yellow strings */
  --dev-syntax-comment: #6272a4;     /* Blue comments */
  --dev-syntax-function: #50fa7b;    /* Green functions */
  --dev-syntax-variable: #8be9fd;    /* Cyan variables */
  --dev-syntax-number: #bd93f9;      /* Purple numbers */
}
```

### Terminal Customization

```css
:root {
  /* Custom terminal colors */
  --dev-terminal-bg: #0d1117;
  --dev-terminal-text: #c9d1d9;
  --dev-terminal-cursor: #58a6ff;
  --dev-terminal-selection: #264f78;
}

/* Custom terminal prompt */
.terminal-prompt::before {
  content: '❯ ';
  color: var(--color-success);
}
```

### Status Indicator Customization

```css
:root {
  /* Custom status colors */
  --dev-status-online: #00ff88;
  --dev-status-busy: #ff6b35;
  --dev-status-away: #ffd23f;
  --dev-status-offline: #ff4757;
}

/* Animated status indicators */
.dev-status--online::before {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

## Dark Mode Customization

### Custom Dark Mode Colors

```css
/* Custom dark mode palette */
[data-theme="dark"] {
  --color-background: #0a0a0a;
  --color-background-secondary: #1a1a1a;
  --color-background-tertiary: #2a2a2a;
  
  --color-text-primary: #ffffff;
  --color-text-secondary: #cccccc;
  --color-text-tertiary: #999999;
  --color-text-muted: #666666;
  
  --color-border: #333333;
  --color-border-light: #444444;
  --color-border-dark: #222222;
}
```

### Dark Mode Component Overrides

```css
[data-theme="dark"] {
  /* Dark mode card styles */
  .card {
    background-color: var(--color-background-secondary);
    border-color: var(--color-border);
  }
  
  /* Dark mode button styles */
  .btn-secondary {
    background-color: var(--color-background-tertiary);
    border-color: var(--color-border);
    color: var(--color-text-primary);
  }
  
  /* Dark mode code blocks */
  .code-block {
    background-color: var(--dev-code-bg-dark);
    border-color: var(--dev-code-border-dark);
  }
}
```

### System Preference Override

```css
/* Override system dark mode with custom colors */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f0f0f;
    --color-text-primary: #f0f0f0;
    /* ... other overrides */
  }
}
```

## Advanced Customization

### CSS Grid Customization

```css
/* Custom grid layouts */
.cards-grid-custom {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
  padding: var(--space-6);
}

@media (min-width: 1200px) {
  .cards-grid-custom {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Animation Customization

```css
:root {
  /* Custom animation durations */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 400ms;
  
  /* Custom easing functions */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Custom animations */
@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideInUp var(--duration-normal) var(--ease-smooth);
}
```

### Custom Utility Classes

```css
/* Custom spacing utilities */
.p-custom { padding: var(--space-5); }
.m-custom { margin: var(--space-5); }
.gap-custom { gap: var(--space-5); }

/* Custom color utilities */
.bg-brand { background-color: var(--color-primary); }
.text-brand { color: var(--color-primary); }
.border-brand { border-color: var(--color-primary); }

/* Custom typography utilities */
.text-custom { font-size: var(--font-size-lg); }
.font-custom { font-family: var(--font-family-sans); }
.leading-custom { line-height: 1.4; }
```

### Component Variants

```css
/* Create component variants */
.btn-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-700));
  border: none;
  color: white;
}

.btn-outline-custom {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.btn-outline-custom:hover {
  background: var(--color-primary);
  color: white;
}

.card-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## Best Practices

### 1. Use CSS Custom Properties

Always use CSS custom properties for values that might change:

```css
/* Good */
.my-component {
  color: var(--color-primary);
  padding: var(--space-4);
}

/* Avoid */
.my-component {
  color: #2563eb;
  padding: 1rem;
}
```

### 2. Maintain Consistency

Keep your customizations consistent with the existing design system:

```css
/* Good - uses existing scale */
:root {
  --my-custom-spacing: var(--space-5);
  --my-custom-color: var(--color-primary-600);
}

/* Avoid - arbitrary values */
:root {
  --my-custom-spacing: 1.3rem;
  --my-custom-color: #1a5fb4;
}
```

### 3. Test Across Themes

Always test your customizations in both light and dark modes:

```css
/* Ensure custom colors work in dark mode */
[data-theme="dark"] {
  --my-custom-bg: var(--color-neutral-800);
  --my-custom-text: var(--color-neutral-100);
}
```

### 4. Use Semantic Naming

Use semantic names for your custom variables:

```css
/* Good */
:root {
  --brand-accent: #ff6b35;
  --content-max-width: 800px;
  --header-height: 80px;
}

/* Avoid */
:root {
  --orange-color: #ff6b35;
  --big-width: 800px;
  --tall-height: 80px;
}
```

### 5. Document Your Changes

Keep track of your customizations:

```css
/* 
 * Custom Brand Colors
 * Updated: 2024-03-15
 * Purpose: Match company brand guidelines
 */
:root {
  --color-primary: #your-brand-color;
  --color-secondary: #your-secondary-color;
}
```

### 6. Progressive Enhancement

Build your customizations progressively:

```css
/* Base styles */
.my-component {
  background-color: var(--color-background);
  padding: var(--space-4);
}

/* Enhanced styles for modern browsers */
@supports (backdrop-filter: blur(10px)) {
  .my-component {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
  }
}
```

### 7. Performance Considerations

Minimize the number of custom properties and avoid complex calculations:

```css
/* Good */
:root {
  --my-spacing: var(--space-4);
}

/* Avoid complex calculations */
:root {
  --my-spacing: calc(var(--space-2) * 2 + var(--space-1) / 2);
}
```

This customization guide provides comprehensive instructions for personalizing the Hexo Developer Theme while maintaining its design integrity and performance.
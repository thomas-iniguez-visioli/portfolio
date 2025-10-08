# CSS Variables Reference - Developer Theme

This document provides a complete reference of all CSS custom properties (variables) available in the Hexo Developer Theme. These variables enable easy customization and theming while maintaining consistency across the design system.

## Table of Contents

1. [Color System Variables](#color-system-variables)
2. [Typography Variables](#typography-variables)
3. [Spacing Variables](#spacing-variables)
4. [Layout Variables](#layout-variables)
5. [Border Variables](#border-variables)
6. [Shadow Variables](#shadow-variables)
7. [Transition Variables](#transition-variables)
8. [Developer-Specific Variables](#developer-specific-variables)
9. [Legacy Compatibility Variables](#legacy-compatibility-variables)
10. [Usage Examples](#usage-examples)

## Color System Variables

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

Status and feedback colors with light and dark variants:

```css
/* Success Colors */
--color-success: #10b981;        /* Green for success states */
--color-success-light: #34d399;  /* Light success */
--color-success-dark: #059669;   /* Dark success */

/* Warning Colors */
--color-warning: #f59e0b;        /* Orange for warnings */
--color-warning-light: #fbbf24;  /* Light warning */
--color-warning-dark: #d97706;   /* Dark warning */

/* Error Colors */
--color-error: #ef4444;          /* Red for errors */
--color-error-light: #f87171;    /* Light error */
--color-error-dark: #dc2626;     /* Dark error */

/* Info Colors */
--color-info: #06b6d4;           /* Cyan for information */
--color-info-light: #22d3ee;     /* Light info */
--color-info-dark: #0891b2;      /* Dark info */
```

### Background Colors

Semantic background colors for different contexts:

```css
--color-background: #ffffff;           /* Primary background */
--color-background-secondary: #f8fafc; /* Secondary background */
--color-background-tertiary: #f1f5f9;  /* Tertiary background */
```

### Text Colors

Hierarchical text colors for content:

```css
--color-text-primary: #0f172a;    /* Primary text color */
--color-text-secondary: #475569;  /* Secondary text color */
--color-text-tertiary: #64748b;   /* Tertiary text color */
--color-text-muted: #94a3b8;      /* Muted text color */
--color-text-inverse: #ffffff;    /* Inverse text color */
```

### Border Colors

Border colors for different contexts:

```css
--color-border: #e2e8f0;       /* Default border color */
--color-border-light: #f1f5f9;  /* Light border color */
--color-border-dark: #cbd5e1;   /* Dark border color */
```

## Typography Variables

### Font Families

Three-font system optimized for developer content:

```css
/* Sans-serif for UI elements and headings */
--font-family-sans: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Serif for body text */
--font-family-serif: Georgia, 'Times New Roman', Times, serif;

/* Monospace for code */
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
```

### Font Features

Font feature settings for enhanced typography:

```css
/* Enable ligatures and stylistic sets for monospace fonts */
--font-feature-mono: 'liga' 1, 'calt' 1, 'ss01' 1;

/* Enable kerning and ligatures for sans-serif fonts */
--font-feature-sans: 'kern' 1, 'liga' 1, 'clig' 1;
```

### Font Sizes

Modern typographic scale based on rem units:

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
--font-size-7xl: 4.5rem;    /* 72px */
```

### Line Heights

Line height values for different text contexts:

```css
--line-height-none: 1;        /* No line height */
--line-height-tight: 1.25;    /* Tight line height */
--line-height-snug: 1.375;    /* Snug line height */
--line-height-normal: 1.5;    /* Normal line height */
--line-height-relaxed: 1.625; /* Relaxed line height */
--line-height-loose: 2;       /* Loose line height */
```

### Font Weights

Font weight scale from thin to black:

```css
--font-weight-thin: 100;      /* Thin weight */
--font-weight-light: 300;     /* Light weight */
--font-weight-normal: 400;    /* Normal weight */
--font-weight-medium: 500;    /* Medium weight */
--font-weight-semibold: 600;  /* Semibold weight */
--font-weight-bold: 700;      /* Bold weight */
--font-weight-extrabold: 800; /* Extra bold weight */
--font-weight-black: 900;     /* Black weight */
```

## Spacing Variables

### Spacing Scale

Based on a 4px grid system for consistent spacing:

```css
--space-0: 0;           /* 0px */
--space-px: 1px;        /* 1px */
--space-0-5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px */
--space-1-5: 0.375rem;  /* 6px */
--space-2: 0.5rem;      /* 8px */
--space-2-5: 0.625rem;  /* 10px */
--space-3: 0.75rem;     /* 12px */
--space-3-5: 0.875rem;  /* 14px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-7: 1.75rem;     /* 28px */
--space-8: 2rem;        /* 32px */
--space-9: 2.25rem;     /* 36px */
--space-10: 2.5rem;     /* 40px */
--space-11: 2.75rem;    /* 44px */
--space-12: 3rem;       /* 48px */
--space-14: 3.5rem;     /* 56px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-28: 7rem;       /* 112px */
--space-32: 8rem;       /* 128px */
--space-36: 9rem;       /* 144px */
--space-40: 10rem;      /* 160px */
--space-44: 11rem;      /* 176px */
--space-48: 12rem;      /* 192px */
--space-52: 13rem;      /* 208px */
--space-56: 14rem;      /* 224px */
--space-60: 15rem;      /* 240px */
--space-64: 16rem;      /* 256px */
--space-72: 18rem;      /* 288px */
--space-80: 20rem;      /* 320px */
--space-96: 24rem;      /* 384px */
```

## Layout Variables

### Container Sizes

Maximum widths for different container sizes:

```css
--container-sm: 640px;    /* Small container */
--container-md: 768px;    /* Medium container */
--container-lg: 1024px;   /* Large container */
--container-xl: 1280px;   /* Extra large container */
--container-2xl: 1536px;  /* 2X large container */
--container-max: 1200px;  /* Maximum container width */
```

### Breakpoints

Responsive breakpoint values:

```css
--breakpoint-sm: 640px;   /* Small screens */
--breakpoint-md: 768px;   /* Medium screens */
--breakpoint-lg: 1024px;  /* Large screens */
--breakpoint-xl: 1280px;  /* Extra large screens */
--breakpoint-2xl: 1536px; /* 2X large screens */
```

### Z-Index Scale

Layering system for positioned elements:

```css
--z-index-hide: -1;       /* Hidden elements */
--z-index-auto: auto;     /* Auto z-index */
--z-index-base: 0;        /* Base layer */
--z-index-docked: 10;     /* Docked elements */
--z-index-dropdown: 1000; /* Dropdown menus */
--z-index-sticky: 1100;   /* Sticky elements */
--z-index-banner: 1200;   /* Banner notifications */
--z-index-overlay: 1300;  /* Overlay backgrounds */
--z-index-modal: 1400;    /* Modal dialogs */
--z-index-popover: 1500;  /* Popover elements */
--z-index-skiplink: 1600; /* Skip navigation links */
--z-index-toast: 1700;    /* Toast notifications */
--z-index-tooltip: 1800;  /* Tooltip elements */
```

## Border Variables

### Border Widths

Standard border width values:

```css
--border-width-0: 0;    /* No border */
--border-width-1: 1px;  /* Thin border */
--border-width-2: 2px;  /* Medium border */
--border-width-4: 4px;  /* Thick border */
--border-width-8: 8px;  /* Very thick border */
```

### Border Radius

Border radius values for rounded corners:

```css
--border-radius-none: 0;         /* No radius */
--border-radius-sm: 0.125rem;    /* Small radius (2px) */
--border-radius-base: 0.25rem;   /* Base radius (4px) */
--border-radius-md: 0.375rem;    /* Medium radius (6px) */
--border-radius-lg: 0.5rem;      /* Large radius (8px) */
--border-radius-xl: 0.75rem;     /* Extra large radius (12px) */
--border-radius-2xl: 1rem;       /* 2X large radius (16px) */
--border-radius-3xl: 1.5rem;     /* 3X large radius (24px) */
--border-radius-full: 9999px;    /* Full radius (circle) */
```

## Shadow Variables

### Box Shadows

Elevation system using box shadows:

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
--shadow-none: none;
```

## Transition Variables

### Transition Durations

Standard animation durations:

```css
--duration-75: 75ms;     /* Very fast */
--duration-100: 100ms;   /* Fast */
--duration-150: 150ms;   /* Quick */
--duration-200: 200ms;   /* Normal */
--duration-300: 300ms;   /* Moderate */
--duration-500: 500ms;   /* Slow */
--duration-700: 700ms;   /* Slower */
--duration-1000: 1000ms; /* Very slow */
```

### Transition Timing Functions

Easing functions for smooth animations:

```css
--ease-linear: linear;                        /* Linear easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);      /* Ease in */
--ease-out: cubic-bezier(0, 0, 0.2, 1);     /* Ease out */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Ease in-out */
```

### Common Transitions

Pre-defined transition combinations:

```css
/* Transition all properties */
--transition-all: all var(--duration-150) var(--ease-in-out);

/* Transition colors only */
--transition-colors: color var(--duration-150) var(--ease-in-out), 
                     background-color var(--duration-150) var(--ease-in-out), 
                     border-color var(--duration-150) var(--ease-in-out);

/* Transition opacity */
--transition-opacity: opacity var(--duration-150) var(--ease-in-out);

/* Transition shadow */
--transition-shadow: box-shadow var(--duration-150) var(--ease-in-out);

/* Transition transform */
--transition-transform: transform var(--duration-150) var(--ease-in-out);
```

## Developer-Specific Variables

### Terminal Colors

Colors inspired by modern terminal themes:

```css
--dev-terminal-bg: #1e1e1e;        /* Terminal background */
--dev-terminal-text: #d4d4d4;      /* Terminal text */
--dev-terminal-cursor: #ffffff;     /* Cursor color */
--dev-terminal-selection: #264f78;  /* Selection background */
```

### Syntax Highlighting Colors

VS Code Dark+ theme inspired colors:

```css
--dev-syntax-keyword: #569cd6;     /* Keywords (const, function, etc.) */
--dev-syntax-string: #ce9178;      /* String literals */
--dev-syntax-comment: #6a9955;     /* Comments */
--dev-syntax-number: #b5cea8;      /* Numbers */
--dev-syntax-function: #dcdcaa;    /* Function names */
--dev-syntax-variable: #9cdcfe;    /* Variables */
--dev-syntax-operator: #d4d4d4;    /* Operators (+, -, etc.) */
--dev-syntax-punctuation: #808080; /* Punctuation */
```

### Developer Status Colors

Status indicators for developer availability:

```css
--dev-status-online: #10b981;   /* Online/available */
--dev-status-busy: #f59e0b;     /* Busy */
--dev-status-away: #6b7280;     /* Away */
--dev-status-offline: #ef4444;  /* Offline */
```

### IDE-Inspired Colors

Colors inspired by popular IDEs:

```css
--dev-ide-sidebar: #252526;   /* IDE sidebar background */
--dev-ide-editor: #1e1e1e;    /* IDE editor background */
--dev-ide-panel: #2d2d30;     /* IDE panel background */
--dev-ide-border: #3e3e42;    /* IDE border color */
--dev-ide-accent: #007acc;    /* IDE accent color */
```

### Code Block Colors

Colors for code blocks in light and dark themes:

```css
--dev-code-bg: #f8f8f8;           /* Light code background */
--dev-code-bg-dark: #2d2d2d;      /* Dark code background */
--dev-code-border: #e1e5e9;       /* Light code border */
--dev-code-border-dark: #404040;  /* Dark code border */
```

### Technology Badge Colors

Authentic colors for popular technologies:

```css
--dev-badge-javascript: #f7df1e;  /* JavaScript yellow */
--dev-badge-typescript: #3178c6;  /* TypeScript blue */
--dev-badge-react: #61dafb;       /* React cyan */
--dev-badge-vue: #4fc08d;         /* Vue.js green */
--dev-badge-node: #339933;        /* Node.js green */
--dev-badge-python: #3776ab;      /* Python blue */
--dev-badge-git: #f05032;         /* Git orange */
--dev-badge-docker: #2496ed;      /* Docker blue */
--dev-badge-aws: #ff9900;         /* AWS orange */
--dev-badge-vscode: #007acc;      /* VS Code blue */
```

## Legacy Compatibility Variables

### Legacy Color Mappings

Mapping old LESS variables to new CSS variables for gradual migration:

```css
--brand-primary: var(--color-primary);     /* Legacy primary */
--brand-success: var(--color-success);     /* Legacy success */
--brand-warning: var(--color-warning);     /* Legacy warning */
--brand-danger: var(--color-error);        /* Legacy danger */
--brand-info: var(--color-info);           /* Legacy info */
```

### Legacy Text Colors

```css
--text-color: var(--color-text-primary);   /* Legacy text color */
--text-muted: var(--color-text-muted);     /* Legacy muted text */
```

### Legacy Background

```css
--body-bg: var(--color-background);        /* Legacy body background */
```

### Legacy Spacing

```css
--padding-base-vertical: var(--space-2);   /* Legacy vertical padding */
--padding-base-horizontal: var(--space-3); /* Legacy horizontal padding */
```

### Legacy Borders

```css
--border-radius-base: var(--border-radius-base); /* Legacy border radius */
```

## Usage Examples

### Basic Color Usage

```css
.my-component {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-border);
}
```

### Typography Usage

```css
.my-heading {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.my-code {
  font-family: var(--font-family-mono);
  font-feature-settings: var(--font-feature-mono);
  background-color: var(--dev-code-bg);
}
```

### Spacing Usage

```css
.my-card {
  padding: var(--space-6);
  margin-bottom: var(--space-4);
  gap: var(--space-3);
}
```

### Responsive Usage

```css
.my-container {
  max-width: var(--container-lg);
  padding: var(--space-4);
}

@media (min-width: 768px) {
  .my-container {
    max-width: var(--container-xl);
    padding: var(--space-8);
  }
}
```

### Animation Usage

```css
.my-button {
  transition: var(--transition-all);
  box-shadow: var(--shadow-sm);
}

.my-button:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Developer-Specific Usage

```css
.my-terminal {
  background-color: var(--dev-terminal-bg);
  color: var(--dev-terminal-text);
  font-family: var(--font-family-mono);
}

.my-status {
  color: var(--dev-status-online);
}

.my-badge {
  background-color: var(--dev-badge-javascript);
  color: #000000;
}
```

### Dark Mode Usage

```css
/* Automatic dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-neutral-900);
    --color-text-primary: var(--color-neutral-100);
  }
}

/* Manual dark mode */
[data-theme="dark"] {
  --color-background: var(--color-neutral-900);
  --color-text-primary: var(--color-neutral-100);
}
```

### Custom Variable Creation

```css
:root {
  /* Create custom variables using existing ones */
  --my-custom-primary: var(--color-primary-600);
  --my-custom-spacing: calc(var(--space-4) * 1.5);
  --my-custom-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.my-custom-component {
  background-color: var(--my-custom-primary);
  padding: var(--my-custom-spacing);
  box-shadow: var(--my-custom-shadow);
}
```

### Fallback Values

```css
.my-component {
  /* Provide fallback values for older browsers */
  background-color: #2563eb;
  background-color: var(--color-primary, #2563eb);
  
  /* Use calc() for computed values */
  padding: calc(var(--space-4, 1rem) * 2);
}
```

This comprehensive CSS variables reference provides all the custom properties available in the Hexo Developer Theme, enabling easy customization and consistent theming across your project.
# CSS Utilities Guide - Developer Theme

This guide documents all the CSS utility classes available in the developer theme. These utilities provide a comprehensive system for rapid development and consistent styling.

## Table of Contents

1. [Color Utilities](#color-utilities)
2. [Spacing Utilities](#spacing-utilities)
3. [Typography Utilities](#typography-utilities)
4. [State Utilities](#state-utilities)
5. [Responsive Helpers](#responsive-helpers)
6. [Debug Utilities](#debug-utilities)
7. [Usage Examples](#usage-examples)

## Color Utilities

### Background Colors

```css
/* Primary colors */
.bg-primary          /* Main brand color */
.bg-primary-50       /* Lightest primary */
.bg-primary-100      /* Very light primary */
.bg-primary-200      /* Light primary */
.bg-primary-300      /* Medium light primary */
.bg-primary-400      /* Medium primary */
.bg-primary-500      /* Base primary */
.bg-primary-600      /* Medium dark primary */
.bg-primary-700      /* Dark primary */
.bg-primary-800      /* Very dark primary */
.bg-primary-900      /* Darkest primary */

/* Neutral colors */
.bg-neutral-50       /* Lightest gray */
.bg-neutral-100      /* Very light gray */
.bg-neutral-200      /* Light gray */
.bg-neutral-300      /* Medium light gray */
.bg-neutral-400      /* Medium gray */
.bg-neutral-500      /* Base gray */
.bg-neutral-600      /* Medium dark gray */
.bg-neutral-700      /* Dark gray */
.bg-neutral-800      /* Very dark gray */
.bg-neutral-900      /* Darkest gray */

/* Semantic colors */
.bg-success          /* Success green */
.bg-success-light    /* Light success */
.bg-success-dark     /* Dark success */
.bg-warning          /* Warning yellow */
.bg-warning-light    /* Light warning */
.bg-warning-dark     /* Dark warning */
.bg-error            /* Error red */
.bg-error-light      /* Light error */
.bg-error-dark       /* Dark error */
.bg-info             /* Info blue */
.bg-info-light       /* Light info */
.bg-info-dark        /* Dark info */

/* Developer-specific backgrounds */
.bg-terminal         /* Terminal background */
.bg-ide-sidebar      /* IDE sidebar background */
.bg-ide-editor       /* IDE editor background */
.bg-code             /* Code block background */
```

### Text Colors

```css
/* Primary text colors */
.text-primary        /* Main brand color text */
.text-primary-50     /* Lightest primary text */
.text-primary-100    /* Very light primary text */
/* ... (same scale as background) */

/* Semantic text colors */
.text-success        /* Success text */
.text-warning        /* Warning text */
.text-error          /* Error text */
.text-info           /* Info text */

/* System text colors */
.text-primary-color  /* Primary text color */
.text-secondary      /* Secondary text color */
.text-tertiary       /* Tertiary text color */
.text-muted          /* Muted text color */
.text-inverse        /* Inverse text color */

/* Developer-specific text colors */
.text-terminal       /* Terminal text */
.text-syntax-keyword /* Syntax highlighting - keywords */
.text-syntax-string  /* Syntax highlighting - strings */
.text-syntax-comment /* Syntax highlighting - comments */
.text-syntax-number  /* Syntax highlighting - numbers */
.text-syntax-function /* Syntax highlighting - functions */
.text-syntax-variable /* Syntax highlighting - variables */
```

### Developer Badge Colors

```css
/* Technology badges */
.badge-javascript    /* JavaScript badge */
.badge-typescript    /* TypeScript badge */
.badge-react         /* React badge */
.badge-vue           /* Vue badge */
.badge-angular       /* Angular badge */
.badge-node          /* Node.js badge */
.badge-python        /* Python badge */
.badge-java          /* Java badge */
.badge-csharp        /* C# badge */
.badge-php           /* PHP badge */
.badge-ruby          /* Ruby badge */
.badge-go            /* Go badge */
.badge-rust          /* Rust badge */

/* Tool badges */
.badge-git           /* Git badge */
.badge-docker        /* Docker badge */
.badge-kubernetes    /* Kubernetes badge */
.badge-aws           /* AWS badge */
.badge-azure         /* Azure badge */
.badge-gcp           /* Google Cloud badge */
.badge-vscode        /* VS Code badge */
.badge-github        /* GitHub badge */
.badge-gitlab        /* GitLab badge */

/* Skill level badges */
.badge-beginner      /* Beginner level */
.badge-intermediate  /* Intermediate level */
.badge-advanced      /* Advanced level */
.badge-expert        /* Expert level */
```

## Spacing Utilities

### Margin Utilities

```css
/* All sides margin */
.m-0                 /* margin: 0 */
.m-1                 /* margin: 0.25rem */
.m-2                 /* margin: 0.5rem */
.m-3                 /* margin: 0.75rem */
.m-4                 /* margin: 1rem */
.m-5                 /* margin: 1.25rem */
.m-6                 /* margin: 1.5rem */
.m-8                 /* margin: 2rem */
.m-10                /* margin: 2.5rem */
.m-12                /* margin: 3rem */
.m-16                /* margin: 4rem */
.m-20                /* margin: 5rem */
.m-24                /* margin: 6rem */
.m-32                /* margin: 8rem */

/* Auto margin */
.m-auto              /* margin: auto */

/* Horizontal margins */
.mx-0                /* margin-left: 0; margin-right: 0 */
.mx-1                /* margin-left: 0.25rem; margin-right: 0.25rem */
.mx-2                /* margin-left: 0.5rem; margin-right: 0.5rem */
/* ... (same scale) */
.mx-auto             /* margin-left: auto; margin-right: auto */

/* Vertical margins */
.my-0                /* margin-top: 0; margin-bottom: 0 */
.my-1                /* margin-top: 0.25rem; margin-bottom: 0.25rem */
.my-2                /* margin-top: 0.5rem; margin-bottom: 0.5rem */
/* ... (same scale) */

/* Individual sides */
.mt-0, .mr-0, .mb-0, .ml-0    /* Individual side margins */
.mt-1, .mr-1, .mb-1, .ml-1    /* 0.25rem margins */
.mt-2, .mr-2, .mb-2, .ml-2    /* 0.5rem margins */
/* ... (same scale for all sides) */
```

### Padding Utilities

```css
/* All sides padding */
.p-0                 /* padding: 0 */
.p-1                 /* padding: 0.25rem */
.p-2                 /* padding: 0.5rem */
.p-3                 /* padding: 0.75rem */
.p-4                 /* padding: 1rem */
.p-5                 /* padding: 1.25rem */
.p-6                 /* padding: 1.5rem */
.p-8                 /* padding: 2rem */
.p-10                /* padding: 2.5rem */
.p-12                /* padding: 3rem */
.p-16                /* padding: 4rem */
.p-20                /* padding: 5rem */
.p-24                /* padding: 6rem */
.p-32                /* padding: 8rem */

/* Horizontal padding */
.px-0                /* padding-left: 0; padding-right: 0 */
.px-1                /* padding-left: 0.25rem; padding-right: 0.25rem */
.px-2                /* padding-left: 0.5rem; padding-right: 0.5rem */
/* ... (same scale) */

/* Vertical padding */
.py-0                /* padding-top: 0; padding-bottom: 0 */
.py-1                /* padding-top: 0.25rem; padding-bottom: 0.25rem */
.py-2                /* padding-top: 0.5rem; padding-bottom: 0.5rem */
/* ... (same scale) */

/* Individual sides */
.pt-0, .pr-0, .pb-0, .pl-0    /* Individual side padding */
.pt-1, .pr-1, .pb-1, .pl-1    /* 0.25rem padding */
.pt-2, .pr-2, .pb-2, .pl-2    /* 0.5rem padding */
/* ... (same scale for all sides) */
```

## Typography Utilities

### Font Families

```css
.font-sans           /* Sans-serif font family */
.font-serif          /* Serif font family */
.font-mono           /* Monospace font family */
.font-sans-alt       /* Alternative sans-serif */
```

### Font Sizes

```css
.text-xs             /* 0.75rem */
.text-sm             /* 0.875rem */
.text-base           /* 1rem */
.text-lg             /* 1.125rem */
.text-xl             /* 1.25rem */
.text-2xl            /* 1.5rem */
.text-3xl            /* 1.875rem */
.text-4xl            /* 2.25rem */
.text-5xl            /* 3rem */
.text-6xl            /* 3.75rem */
.text-7xl            /* 4.5rem */
```

### Font Weights

```css
.font-thin           /* font-weight: 100 */
.font-light          /* font-weight: 300 */
.font-normal         /* font-weight: 400 */
.font-medium         /* font-weight: 500 */
.font-semibold       /* font-weight: 600 */
.font-bold           /* font-weight: 700 */
.font-extrabold      /* font-weight: 800 */
.font-black          /* font-weight: 900 */
```

### Developer Typography

```css
/* Developer-specific text styles */
.dev-badge           /* Developer badge styling */
.tech-stack          /* Technology stack text */
.dev-status          /* Developer status text */
.dev-status--online  /* Online status */
.dev-status--busy    /* Busy status */
.dev-status--away    /* Away status */
.dev-status--offline /* Offline status */

/* Code styling */
.code-inline         /* Inline code styling */
.code-block          /* Code block styling */
.code-terminal       /* Terminal-style code */
.code-ide            /* IDE-style code */

/* Developer elements */
.dev-comment         /* Developer comment style */
.dev-highlight       /* Highlighted text */
.dev-var             /* Variable text */
.dev-function        /* Function text */
.dev-keyword         /* Keyword text */
.dev-string          /* String text */
.dev-number          /* Number text */
```

## State Utilities

### Loading States

```css
/* Loading spinners */
.loading             /* Basic loading spinner */
.loading-sm          /* Small loading spinner */
.loading-lg          /* Large loading spinner */
.loading-xl          /* Extra large loading spinner */

/* Loading animations */
.loading-dots        /* Animated dots */
.loading-pulse       /* Pulsing animation */
.loading-skeleton    /* Skeleton loading */

/* Loading overlays */
.loading-overlay     /* Full overlay with spinner */
```

### Message States

```css
/* Success states */
.state-success       /* Success styling */
.state-success-bg    /* Success background */
.state-success-border /* Success border */
.state-success-text  /* Success text */
.success-message     /* Success message box */
.success-icon        /* Success icon */

/* Error states */
.state-error         /* Error styling */
.state-error-bg      /* Error background */
.state-error-border  /* Error border */
.state-error-text    /* Error text */
.error-message       /* Error message box */
.error-icon          /* Error icon */

/* Warning states */
.state-warning       /* Warning styling */
.state-warning-bg    /* Warning background */
.state-warning-border /* Warning border */
.state-warning-text  /* Warning text */
.warning-message     /* Warning message box */
.warning-icon        /* Warning icon */

/* Info states */
.state-info          /* Info styling */
.state-info-bg       /* Info background */
.state-info-border   /* Info border */
.state-info-text     /* Info text */
.info-message        /* Info message box */
.info-icon           /* Info icon */
```

### Developer Status

```css
/* Build status */
.build-success       /* Build passed */
.build-failed        /* Build failed */
.build-pending       /* Build pending */

/* Code execution status */
.code-running        /* Code running */
.code-success        /* Code success */
.code-error          /* Code error */

/* Developer status */
.dev-online          /* Developer online */
.dev-busy            /* Developer busy */
.dev-away            /* Developer away */
.dev-offline         /* Developer offline */
```

### Interactive States

```css
/* Element states */
.disabled            /* Disabled state */
.active              /* Active state */
.selected            /* Selected state */

/* Hover effects */
.hover-lift          /* Lift on hover */
.hover-glow          /* Glow on hover */
.hover-scale         /* Scale on hover */

/* Focus states */
.focus-ring          /* Focus ring */
.focus-ring-error    /* Error focus ring */
.focus-ring-success  /* Success focus ring */
```

## Responsive Helpers

### Breakpoint-Specific Visibility

```css
/* Device-specific visibility */
.mobile-only         /* Visible only on mobile */
.tablet-only         /* Visible only on tablet */
.desktop-only        /* Visible only on desktop */
.large-desktop-only  /* Visible only on large desktop */

/* Range-based visibility */
.mobile-to-tablet    /* Visible from mobile to tablet */
.tablet-to-desktop   /* Visible from tablet to desktop */
.small-screens       /* Visible on small screens */
.large-screens       /* Visible on large screens */
```

### Device-Specific Utilities

```css
/* Input method */
.touch-only          /* Touch devices only */
.mouse-only          /* Mouse/trackpad only */
.hover-capable       /* Hover-capable devices */
.no-hover            /* Non-hover devices */

/* Orientation */
.portrait-only       /* Portrait orientation only */
.landscape-only      /* Landscape orientation only */
.mobile-portrait-only /* Mobile portrait only */
.mobile-landscape-only /* Mobile landscape only */
```

### Accessibility-Based Visibility

```css
/* Motion preferences */
.motion-only         /* Motion enabled */
.no-motion-only      /* Reduced motion */

/* Contrast preferences */
.high-contrast-only  /* High contrast mode */
.normal-contrast-only /* Normal contrast mode */

/* Color scheme preferences */
.dark-mode-only      /* Dark mode only */
.light-mode-only     /* Light mode only */
```

### Print Utilities

```css
.print-only          /* Print only */
.print-hidden        /* Hidden in print */
```

### Screen Reader Utilities

```css
.sr-only             /* Screen reader only */
.sr-only-focusable   /* Screen reader only, visible on focus */
```

## Debug Utilities

**Note:** Debug utilities are only active when the `debug-mode` class is added to the body element.

### Layout Debug

```css
.debug-all           /* Debug all elements with colored borders */
.debug-grid          /* Show grid overlay */
.debug-flexbox       /* Debug flexbox containers */
.debug-grid-container /* Debug CSS Grid containers */
```

### Responsive Debug

```css
.debug-breakpoint    /* Show current breakpoint indicator */
.debug-responsive-xs /* Debug XS breakpoint */
.debug-responsive-sm /* Debug SM breakpoint */
.debug-responsive-md /* Debug MD breakpoint */
.debug-responsive-lg /* Debug LG breakpoint */
```

### Performance Debug

```css
.debug-slow          /* Mark slow elements */
.debug-large         /* Mark large elements */
```

### Content Debug

```css
.debug-empty         /* Debug empty elements */
.debug-long-content  /* Debug long content */
```

### Accessibility Debug

```css
.debug-contrast-low  /* Debug low contrast elements */
.debug-focus         /* Debug focus states */
```

## Usage Examples

### Basic Color and Spacing

```html
<!-- Primary button with spacing -->
<button class="bg-primary text-white px-6 py-3 rounded">
  Click me
</button>

<!-- Card with spacing and colors -->
<div class="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
  <h3 class="text-xl font-semibold text-neutral-900 mb-4">Card Title</h3>
  <p class="text-neutral-600 mb-4">Card content goes here.</p>
  <button class="bg-primary text-white px-4 py-2 rounded">Action</button>
</div>
```

### Developer-Specific Elements

```html
<!-- Technology stack display -->
<div class="flex flex-wrap gap-2">
  <span class="badge-javascript px-3 py-1 rounded-full text-sm">JavaScript</span>
  <span class="badge-typescript px-3 py-1 rounded-full text-sm">TypeScript</span>
  <span class="badge-react px-3 py-1 rounded-full text-sm">React</span>
</div>

<!-- Developer status -->
<div class="flex items-center gap-2">
  <span class="dev-online">Available for work</span>
</div>

<!-- Code block -->
<pre class="code-block">
<code class="text-syntax-keyword">function</code> <code class="text-syntax-function">example</code>() {
  <code class="text-syntax-keyword">return</code> <code class="text-syntax-string">"Hello, World!"</code>;
}
</pre>
```

### State Management

```html
<!-- Loading button -->
<button class="loading bg-primary text-white px-6 py-3 rounded">
  Loading...
</button>

<!-- Success message -->
<div class="success-message">
  <span class="success-icon"></span>
  Operation completed successfully!
</div>

<!-- Build status -->
<div class="flex gap-2">
  <span class="build-success">Build #123</span>
  <span class="build-failed">Build #122</span>
  <span class="build-pending">Build #124</span>
</div>
```

### Responsive Design

```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-white p-6 rounded-lg shadow">Item 1</div>
  <div class="bg-white p-6 rounded-lg shadow">Item 2</div>
  <div class="bg-white p-6 rounded-lg shadow">Item 3</div>
</div>

<!-- Device-specific content -->
<div class="mobile-only bg-primary text-white p-4 rounded">
  Mobile-only content
</div>
<div class="desktop-only bg-success text-white p-4 rounded">
  Desktop-only content
</div>
```

### Debug Mode

```html
<!-- Enable debug mode -->
<body class="debug-mode debug-breakpoint">
  <!-- Debug grid overlay -->
  <div class="debug-grid p-8">
    <div class="debug-flexbox flex gap-4">
      <div class="p-4">Item 1</div>
      <div class="p-4">Item 2</div>
    </div>
  </div>
</body>
```

## Best Practices

### 1. Use Semantic Classes First

Prefer semantic classes over utility classes when they exist:

```html
<!-- Good -->
<div class="success-message">Success!</div>

<!-- Less ideal -->
<div class="bg-success-light text-success-dark border border-success p-4 rounded">
  Success!
</div>
```

### 2. Combine Utilities Logically

Group related utilities together:

```html
<!-- Good grouping -->
<div class="
  bg-white border border-neutral-200 rounded-lg shadow-sm
  p-6 mb-6
  hover-lift transition-all
">
  Content
</div>
```

### 3. Use Responsive Utilities

Always consider mobile-first design:

```html
<!-- Mobile-first responsive design -->
<div class="
  p-4 sm:p-6 lg:p-8
  text-sm sm:text-base lg:text-lg
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
">
  Responsive content
</div>
```

### 4. Debug Utilities for Development

Use debug utilities during development:

```html
<!-- Add debug-mode class to body during development -->
<body class="debug-mode debug-breakpoint">
  <div class="debug-grid">
    <!-- Your layout here -->
  </div>
</body>
```

### 5. Accessibility Considerations

Always include accessibility utilities:

```html
<!-- Screen reader content -->
<button>
  Save
  <span class="sr-only">your changes</span>
</button>

<!-- Focus management -->
<input class="focus-ring" type="text" placeholder="Enter text">
```

## Browser Support

All utilities include cross-browser fallbacks and support:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

Legacy browser support includes:
- Internet Explorer 11 (with fallbacks)
- Older Safari versions (with prefixes)

## Performance Considerations

- Utilities are optimized for minimal CSS output
- Critical utilities are inlined
- Non-critical utilities are lazy-loaded
- All utilities support tree-shaking
- Gzip compression reduces file size significantly

## Customization

Utilities can be customized by modifying CSS custom properties:

```css
:root {
  --color-primary: #your-brand-color;
  --space-4: 1.5rem; /* Adjust spacing scale */
  --font-family-sans: 'Your Font', system-ui;
}
```

For more customization options, see the [Theme Customization Guide](./customization-guide.md).
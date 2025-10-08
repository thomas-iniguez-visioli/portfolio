# Components Guide - Developer Theme

This guide provides detailed documentation for all CSS components available in the Hexo Developer Theme, including usage examples, variants, and customization options.

## Table of Contents

1. [Button Components](#button-components)
2. [Card Components](#card-components)
3. [Navigation Components](#navigation-components)
4. [Form Components](#form-components)
5. [Developer-Specific Components](#developer-specific-components)
6. [Layout Components](#layout-components)
7. [Utility Components](#utility-components)

## Button Components

### Base Button Class

All buttons use the `.btn` base class with additional modifier classes for variants.

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid transparent;
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition: var(--transition-all);
}
```

### Button Variants

#### Terminal Button
Styled like a terminal command with a `$` prefix.

```html
<button class="btn btn-terminal">Execute Command</button>
<button class="btn btn-terminal btn-sm">git push</button>
<button class="btn btn-terminal btn-lg">npm install</button>
```

**Features:**
- Monospace font
- Dark terminal background
- Green `$` prefix
- Hover effects with elevation

#### IDE Button
Styled like an IDE interface element.

```html
<button class="btn btn-ide">Open File</button>
<button class="btn btn-ide">
  <svg class="btn-icon" viewBox="0 0 24 24">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"/>
  </svg>
  New File
</button>
```

**Features:**
- IDE-inspired colors
- Left accent border on hover
- Subtle elevation effects

#### Ghost Button
Transparent button with subtle hover effects.

```html
<button class="btn btn-ghost">Cancel</button>
<button class="btn btn-ghost">
  <svg class="btn-icon" viewBox="0 0 24 24">
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
  </svg>
  Add Item
</button>
```

**Features:**
- Transparent background
- Subtle hover background
- Minimal visual weight

#### Semantic Buttons
Standard semantic button variants.

```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-success">Success Action</button>
<button class="btn btn-warning">Warning Action</button>
<button class="btn btn-error">Error Action</button>
```

### Button Sizes

```html
<button class="btn btn-primary btn-xs">Extra Small</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-xl">Extra Large</button>
```

### Button States

#### Loading State
```html
<button class="btn btn-primary btn-loading">
  <span class="btn-text">Loading...</span>
</button>
```

#### Disabled State
```html
<button class="btn btn-primary" disabled>Disabled Button</button>
```

#### Status Buttons
```html
<button class="btn btn-status status-online">Available</button>
<button class="btn btn-status status-busy">Busy</button>
<button class="btn btn-status status-away">Away</button>
<button class="btn btn-status status-dnd">Do Not Disturb</button>
```

### Button Groups

```html
<div class="btn-group">
  <button class="btn btn-secondary">Left</button>
  <button class="btn btn-secondary">Center</button>
  <button class="btn btn-secondary">Right</button>
</div>
```

### Icon-Only Buttons

```html
<button class="btn btn-primary btn-icon-only">
  <svg class="btn-icon" viewBox="0 0 24 24">
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"/>
  </svg>
</button>
```

## Card Components

### Base Card Structure

```html
<div class="card">
  <div class="card-header">
    <div class="card-icon">
      <!-- Icon content -->
    </div>
    <div>
      <h3 class="card-title">Card Title</h3>
      <p class="card-subtitle">Card Subtitle</p>
    </div>
  </div>
  
  <div class="card-content">
    <p class="card-description">Card description content.</p>
    
    <div class="card-tags">
      <span class="card-tag">Tag 1</span>
      <span class="card-tag">Tag 2</span>
    </div>
    
    <div class="card-meta">
      <span class="card-date">March 15, 2024</span>
      <span class="card-reading-time">5 min read</span>
    </div>
  </div>
  
  <div class="card-actions">
    <a href="#" class="card-action card-action-primary">Primary Action</a>
    <a href="#" class="card-action">Secondary Action</a>
  </div>
</div>
```

### Card Variants

#### Elevated Card
```html
<div class="card card-elevated">
  <!-- Card content -->
</div>
```

#### Flat Card
```html
<div class="card card-flat">
  <!-- Card content -->
</div>
```

#### Gradient Card
```html
<div class="card card-gradient">
  <!-- Card content -->
</div>
```

### Card with Image

```html
<div class="card">
  <div class="card-image-wrapper">
    <img src="/images/project.jpg" alt="Project" class="card-image">
  </div>
  
  <div class="card-content">
    <h3 class="card-title">Project with Image</h3>
    <p class="card-description">Description of the project.</p>
  </div>
</div>
```

### Featured Card

```html
<div class="card card-featured">
  <div class="card-content">
    <h2 class="card-title">Featured Project</h2>
    <p class="card-description">
      This featured card spans the full width of the grid and has larger text.
    </p>
    <div class="card-actions">
      <a href="#" class="card-action card-action-primary">View Project</a>
      <a href="#" class="card-action">Live Demo</a>
    </div>
  </div>
</div>
```

### Card Badges

```html
<div class="card">
  <div class="card-badge">New</div>
  <!-- Card content -->
</div>

<div class="card">
  <div class="card-badge card-badge-success">Featured</div>
  <!-- Card content -->
</div>
```

### Card Grid Layouts

#### Standard Grid (1-2-3 columns)
```html
<div class="cards-grid">
  <div class="card"><!-- Card 1 --></div>
  <div class="card"><!-- Card 2 --></div>
  <div class="card"><!-- Card 3 --></div>
</div>
```

#### Two Column Grid
```html
<div class="cards-grid-2">
  <div class="card"><!-- Card 1 --></div>
  <div class="card"><!-- Card 2 --></div>
</div>
```

#### Four Column Grid
```html
<div class="cards-grid-4">
  <div class="card"><!-- Card 1 --></div>
  <div class="card"><!-- Card 2 --></div>
  <div class="card"><!-- Card 3 --></div>
  <div class="card"><!-- Card 4 --></div>
</div>
```

### Loading States

#### Card Skeleton
```html
<div class="card card-loading">
  <div class="card-skeleton card-skeleton-image"></div>
  <div class="card-content">
    <div class="card-skeleton card-skeleton-title"></div>
    <div class="card-skeleton card-skeleton-text"></div>
    <div class="card-skeleton card-skeleton-text"></div>
  </div>
</div>
```

## Navigation Components

### Developer Sidebar

```html
<nav class="dev-sidebar">
  <div class="dev-sidebar-header">
    <div class="dev-profile">
      <img src="/images/avatar.jpg" alt="Avatar" class="dev-avatar">
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
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"/>
          </svg>
          Projects
        </a>
      </li>
    </ul>
    
    <div class="dev-tech-stack">
      <h4 class="dev-section-title">Tech Stack</h4>
      <div class="dev-badges">
        <span class="badge-javascript">JavaScript</span>
        <span class="badge-typescript">TypeScript</span>
        <span class="badge-react">React</span>
      </div>
    </div>
    
    <div class="dev-social">
      <h4 class="dev-section-title">Connect</h4>
      <div class="dev-social-links">
        <a href="#" class="dev-social-link">
          <svg class="dev-social-icon" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a href="#" class="dev-social-link">
          <svg class="dev-social-icon" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  </div>
</nav>
```

### Breadcrumb Navigation

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/" class="breadcrumb-link">Home</a>
    </li>
    <li class="breadcrumb-item">
      <a href="/projects" class="breadcrumb-link">Projects</a>
    </li>
    <li class="breadcrumb-item breadcrumb-item--current" aria-current="page">
      <span class="breadcrumb-text">Current Page</span>
    </li>
  </ol>
</nav>
```

### Pagination

```html
<nav class="pagination" aria-label="Pagination">
  <a href="/page/1" class="pagination-link pagination-link--prev">
    <svg class="pagination-icon" viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
    Previous
  </a>
  
  <div class="pagination-numbers">
    <a href="/page/1" class="pagination-number">1</a>
    <a href="/page/2" class="pagination-number pagination-number--current" aria-current="page">2</a>
    <a href="/page/3" class="pagination-number">3</a>
    <span class="pagination-ellipsis">...</span>
    <a href="/page/10" class="pagination-number">10</a>
  </div>
  
  <a href="/page/3" class="pagination-link pagination-link--next">
    Next
    <svg class="pagination-icon" viewBox="0 0 24 24">
      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
    </svg>
  </a>
</nav>
```

## Form Components

### Input Fields

#### Text Input
```html
<div class="form-group">
  <label for="name" class="form-label">Full Name</label>
  <input type="text" id="name" class="form-input" placeholder="Enter your name">
</div>
```

#### Email Input
```html
<div class="form-group">
  <label for="email" class="form-label">Email Address</label>
  <input type="email" id="email" class="form-input" placeholder="Enter your email">
</div>
```

#### Textarea
```html
<div class="form-group">
  <label for="message" class="form-label">Message</label>
  <textarea id="message" class="form-textarea" rows="4" placeholder="Your message"></textarea>
</div>
```

#### Select Dropdown
```html
<div class="form-group">
  <label for="category" class="form-label">Category</label>
  <select id="category" class="form-select">
    <option value="">Choose a category</option>
    <option value="web">Web Development</option>
    <option value="mobile">Mobile Development</option>
    <option value="design">Design</option>
  </select>
</div>
```

### Checkboxes and Radio Buttons

#### Checkbox
```html
<div class="form-group">
  <label class="form-checkbox">
    <input type="checkbox" class="form-checkbox-input">
    <span class="form-checkbox-label">Subscribe to newsletter</span>
  </label>
</div>
```

#### Radio Buttons
```html
<div class="form-group">
  <fieldset class="form-fieldset">
    <legend class="form-legend">Preferred Contact Method</legend>
    
    <label class="form-radio">
      <input type="radio" name="contact" value="email" class="form-radio-input">
      <span class="form-radio-label">Email</span>
    </label>
    
    <label class="form-radio">
      <input type="radio" name="contact" value="phone" class="form-radio-input">
      <span class="form-radio-label">Phone</span>
    </label>
  </fieldset>
</div>
```

### Form Validation States

#### Success State
```html
<div class="form-group form-group--success">
  <label for="valid-input" class="form-label">Valid Input</label>
  <input type="text" id="valid-input" class="form-input form-input--success" value="Valid value">
  <p class="form-help form-help--success">This field is valid</p>
</div>
```

#### Error State
```html
<div class="form-group form-group--error">
  <label for="invalid-input" class="form-label">Invalid Input</label>
  <input type="text" id="invalid-input" class="form-input form-input--error" value="Invalid value">
  <p class="form-help form-help--error">This field has an error</p>
</div>
```

#### Warning State
```html
<div class="form-group form-group--warning">
  <label for="warning-input" class="form-label">Warning Input</label>
  <input type="text" id="warning-input" class="form-input form-input--warning" value="Warning value">
  <p class="form-help form-help--warning">This field has a warning</p>
</div>
```

### Input Groups

```html
<div class="form-group">
  <label for="website" class="form-label">Website URL</label>
  <div class="input-group">
    <span class="input-group-text">https://</span>
    <input type="text" id="website" class="form-input" placeholder="example.com">
  </div>
</div>
```

## Developer-Specific Components

### Technology Badges

```html
<div class="tech-badges">
  <span class="badge-javascript">JavaScript</span>
  <span class="badge-typescript">TypeScript</span>
  <span class="badge-react">React</span>
  <span class="badge-vue">Vue.js</span>
  <span class="badge-angular">Angular</span>
  <span class="badge-node">Node.js</span>
  <span class="badge-python">Python</span>
  <span class="badge-java">Java</span>
  <span class="badge-csharp">C#</span>
  <span class="badge-php">PHP</span>
  <span class="badge-ruby">Ruby</span>
  <span class="badge-go">Go</span>
  <span class="badge-rust">Rust</span>
  <span class="badge-docker">Docker</span>
  <span class="badge-kubernetes">Kubernetes</span>
  <span class="badge-aws">AWS</span>
  <span class="badge-azure">Azure</span>
  <span class="badge-gcp">Google Cloud</span>
  <span class="badge-git">Git</span>
  <span class="badge-github">GitHub</span>
  <span class="badge-vscode">VS Code</span>
</div>
```

### Developer Status Indicators

```html
<div class="dev-status-container">
  <span class="dev-status dev-status--online">
    <span class="dev-status-indicator"></span>
    Available for work
  </span>
  
  <span class="dev-status dev-status--busy">
    <span class="dev-status-indicator"></span>
    Currently busy
  </span>
  
  <span class="dev-status dev-status--away">
    <span class="dev-status-indicator"></span>
    Away
  </span>
  
  <span class="dev-status dev-status--offline">
    <span class="dev-status-indicator"></span>
    Offline
  </span>
</div>
```

### Code Blocks

#### Basic Code Block
```html
<pre class="code-block">
<code class="hljs javascript">
function greet(name) {
  return `Hello, ${name}!`;
}

const message = greet('Developer');
console.log(message);
</code>
</pre>
```

#### Code Block with Language Label
```html
<div class="code-snippet" data-language="javascript">
  <div class="code-header">
    <span class="code-language">JavaScript</span>
    <button class="code-copy" data-copy-target="code-example-1">
      <svg class="code-copy-icon" viewBox="0 0 24 24">
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
      Copy
    </button>
  </div>
  <pre class="code-block" id="code-example-1">
<code class="hljs javascript">
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
</code>
  </pre>
</div>
```

#### Inline Code
```html
<p>Use the <code class="code-inline">npm install</code> command to install packages.</p>
```

### Terminal Component

```html
<div class="terminal">
  <div class="terminal-header">
    <div class="terminal-controls">
      <span class="terminal-control terminal-control--close"></span>
      <span class="terminal-control terminal-control--minimize"></span>
      <span class="terminal-control terminal-control--maximize"></span>
    </div>
    <span class="terminal-title">Terminal</span>
  </div>
  
  <div class="terminal-content">
    <div class="terminal-line">
      <span class="terminal-prompt">$</span>
      <span class="terminal-command">npm install express</span>
    </div>
    <div class="terminal-output">
      <div class="terminal-output-line">+ express@4.18.2</div>
      <div class="terminal-output-line">added 57 packages from 41 contributors</div>
      <div class="terminal-output-line terminal-output-success">✓ Installation completed successfully</div>
    </div>
    <div class="terminal-line">
      <span class="terminal-prompt">$</span>
      <span class="terminal-cursor">|</span>
    </div>
  </div>
</div>
```

### Project Showcase

```html
<div class="project-showcase">
  <div class="project-image">
    <img src="/images/project-screenshot.jpg" alt="Project Screenshot">
    <div class="project-overlay">
      <div class="project-actions">
        <a href="/demo" class="btn btn-primary">Live Demo</a>
        <a href="/github" class="btn btn-secondary">View Code</a>
      </div>
    </div>
  </div>
  
  <div class="project-info">
    <h3 class="project-title">E-Commerce Platform</h3>
    <p class="project-description">
      A full-stack e-commerce platform built with React, Node.js, and PostgreSQL.
    </p>
    
    <div class="project-tech">
      <span class="badge-react">React</span>
      <span class="badge-node">Node.js</span>
      <span class="badge-postgresql">PostgreSQL</span>
    </div>
    
    <div class="project-stats">
      <div class="project-stat">
        <span class="project-stat-value">15k</span>
        <span class="project-stat-label">Lines of Code</span>
      </div>
      <div class="project-stat">
        <span class="project-stat-value">3</span>
        <span class="project-stat-label">Months</span>
      </div>
      <div class="project-stat">
        <span class="project-stat-value">2</span>
        <span class="project-stat-label">Team Members</span>
      </div>
    </div>
  </div>
</div>
```

## Layout Components

### Container

```html
<div class="container">
  <!-- Content with max-width and centered -->
</div>

<div class="container-fluid">
  <!-- Full-width content -->
</div>

<div class="container-sm">
  <!-- Small container -->
</div>
```

### Grid System

```html
<div class="grid">
  <div class="grid-col-12 md:grid-col-6 lg:grid-col-4">Column 1</div>
  <div class="grid-col-12 md:grid-col-6 lg:grid-col-4">Column 2</div>
  <div class="grid-col-12 md:grid-col-12 lg:grid-col-4">Column 3</div>
</div>
```

### Flexbox Utilities

```html
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">Flexible item 1</div>
  <div class="flex-1">Flexible item 2</div>
  <div class="flex-shrink-0">Fixed item</div>
</div>
```

### Section Layouts

```html
<section class="section">
  <div class="container">
    <header class="section-header">
      <h2 class="section-title">Section Title</h2>
      <p class="section-description">Section description text.</p>
    </header>
    
    <div class="section-content">
      <!-- Section content -->
    </div>
  </div>
</section>
```

## Utility Components

### Loading States

#### Spinner
```html
<div class="loading-spinner">
  <div class="spinner"></div>
</div>

<div class="loading-spinner loading-spinner--sm">
  <div class="spinner"></div>
</div>
```

#### Skeleton Loading
```html
<div class="skeleton-container">
  <div class="skeleton skeleton-title"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text skeleton-text--short"></div>
</div>
```

#### Progress Bar
```html
<div class="progress">
  <div class="progress-bar" style="width: 75%;" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <span class="progress-text">75%</span>
  </div>
</div>
```

### Alert Messages

```html
<div class="alert alert--success">
  <svg class="alert-icon" viewBox="0 0 24 24">
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
  </svg>
  <div class="alert-content">
    <h4 class="alert-title">Success!</h4>
    <p class="alert-message">Your changes have been saved successfully.</p>
  </div>
  <button class="alert-close">
    <svg viewBox="0 0 24 24">
      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
    </svg>
  </button>
</div>

<div class="alert alert--error">
  <svg class="alert-icon" viewBox="0 0 24 24">
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,7A1,1 0 0,0 11,8V12A1,1 0 0,0 12,13A1,1 0 0,0 13,12V8A1,1 0 0,0 12,7M12,15.5A1.5,1.5 0 0,0 10.5,17A1.5,1.5 0 0,0 12,18.5A1.5,1.5 0 0,0 13.5,17A1.5,1.5 0 0,0 12,15.5Z"/>
  </svg>
  <div class="alert-content">
    <h4 class="alert-title">Error!</h4>
    <p class="alert-message">There was an error processing your request.</p>
  </div>
</div>
```

### Modal

```html
<div class="modal" id="example-modal">
  <div class="modal-backdrop"></div>
  <div class="modal-container">
    <div class="modal-header">
      <h3 class="modal-title">Modal Title</h3>
      <button class="modal-close" data-modal-close>
        <svg viewBox="0 0 24 24">
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
        </svg>
      </button>
    </div>
    
    <div class="modal-content">
      <p>Modal content goes here.</p>
    </div>
    
    <div class="modal-footer">
      <button class="btn btn-secondary" data-modal-close>Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

### Tooltip

```html
<button class="btn btn-primary" data-tooltip="This is a tooltip">
  Hover me
</button>

<div class="tooltip tooltip--top">
  <div class="tooltip-content">Tooltip content</div>
  <div class="tooltip-arrow"></div>
</div>
```

### Dropdown

```html
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" data-dropdown-toggle>
    Options
    <svg class="dropdown-icon" viewBox="0 0 24 24">
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
    </svg>
  </button>
  
  <div class="dropdown-menu">
    <a href="#" class="dropdown-item">Option 1</a>
    <a href="#" class="dropdown-item">Option 2</a>
    <div class="dropdown-divider"></div>
    <a href="#" class="dropdown-item">Option 3</a>
  </div>
</div>
```

This comprehensive components guide provides detailed documentation for all the CSS components available in the Hexo Developer Theme. Each component includes usage examples, variants, and customization options to help developers implement them effectively in their projects.
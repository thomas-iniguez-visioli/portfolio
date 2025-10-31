
/**
 * Non-Critical CSS Loader - Auto-generated
 * Loads non-critical CSS asynchronously after page load
 */
function non_critical_css(href) {
    return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${href}"></noscript>`;
}

function resource_hints() {
    const hints = [];
    
    // DNS prefetch for external resources
    hints.push('<link rel="dns-prefetch" href="//fonts.googleapis.com">');
    hints.push('<link rel="dns-prefetch" href="//fonts.gstatic.com">');
    
    // Preconnect to critical origins
    hints.push('<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>');
    hints.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
    
    // Preload critical resources
    hints.push(`<link rel="preload" href="${url_for('/js/module-loader.js')}" as="script">`);
    hints.push(`<link rel="preload" href="${url_for('/js/viewport-manager.js')}" as="script">`);
    
    return hints.join('\n  ');
}

function critical_css() {
    return partial('_partial/critical-css');
}

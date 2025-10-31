/**
 * Hexo helper for lazy loading images
 * Automatically converts img tags to lazy-loaded format
 */

hexo.extend.helper.register('lazy_image', function(src, alt = '', options = {}) {
  const {
    width = '',
    height = '',
    class: className = '',
    placeholder = true
  } = options;
  
  let imgClass = 'lazy-image';
  if (className) {
    imgClass += ` ${className}`;
  }
  
  const widthAttr = width ? ` data-width="${width}"` : '';
  const heightAttr = height ? ` data-height="${height}"` : '';
  const altAttr = alt ? ` alt="${alt}"` : '';
  
  return `<img class="${imgClass}" data-src="${src}"${widthAttr}${heightAttr}${altAttr} loading="lazy">`;
});

hexo.extend.helper.register('lazy_background', function(selector, src, options = {}) {
  const {
    fallback = '',
    media = ''
  } = options;
  
  const mediaQuery = media ? ` data-media="${media}"` : '';
  const fallbackAttr = fallback ? ` data-fallback="${fallback}"` : '';
  
  return `<div class="lazy-background" data-selector="${selector}" data-bg-src="${src}"${mediaQuery}${fallbackAttr}></div>`;
});

// Filter to automatically convert img tags in content
hexo.extend.filter.register('after_post_render', function(data) {
  if (!data.content) return data;
  
  // Convert regular img tags to lazy-loaded format
  data.content = data.content.replace(
    /<img([^>]*?)src="([^"]*?)"([^>]*?)>/gi,
    function(match, beforeSrc, src, afterSrc) {
      // Skip if already has data-src (already lazy)
      if (match.includes('data-src')) {
        return match;
      }
      
      // Extract alt text if present
      const altMatch = match.match(/alt="([^"]*?)"/i);
      const alt = altMatch ? altMatch[1] : '';
      
      // Extract dimensions if present
      const widthMatch = match.match(/width="([^"]*?)"/i);
      const heightMatch = match.match(/height="([^"]*?)"/i);
      const width = widthMatch ? ` data-width="${widthMatch[1]}"` : '';
      const height = heightMatch ? ` data-height="${heightMatch[1]}"` : '';
      
      // Extract existing classes
      const classMatch = match.match(/class="([^"]*?)"/i);
      let className = classMatch ? classMatch[1] : '';
      className = className ? `${className} lazy-image` : 'lazy-image';
      
      return `<img class="${className}" data-src="${src}"${width}${height} alt="${alt}" loading="lazy">`;
    }
  );
  
  return data;
});

// Add lazy loading attributes to code blocks
hexo.extend.filter.register('after_post_render', function(data) {
  if (!data.content) return data;
  
  // Add lazy loading to code blocks for syntax highlighting
  data.content = data.content.replace(
    /<pre><code([^>]*?)>/gi,
    '<pre><code$1 data-lazy="code-block">'
  );
  
  return data;
});
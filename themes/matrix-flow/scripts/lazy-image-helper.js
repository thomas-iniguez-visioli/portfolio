/**
 * Hexo helper for lazy loading images
 * Automatically converts img tags to lazy-loaded format
 */

hexo.extend.helper.register('lazy_image', function(src, alt = '', options = {}) {
  const {
    width = '',
    height = '',
    class: className = ''
  } = options;
  
  let imgClass = 'direct-image';
  if (className) {
    imgClass += ` ${className}`;
  }
  
  const widthAttr = width ? ` width="${width}"` : '';
  const heightAttr = height ? ` height="${height}"` : '';
  const altAttr = alt ? ` alt="${alt}"` : '';
  
  // Chargement direct sans lazy loading
  return `<img class="${imgClass}" src="${src}"${widthAttr}${heightAttr}${altAttr}>`;
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

// Filter to ensure all images load directly
hexo.extend.filter.register('after_post_render', function(data) {
  if (!data.content) return data;
  
  // Convert any lazy-loaded images to direct loading
  data.content = data.content.replace(
    /<img([^>]*?)data-src="([^"]*?)"([^>]*?)>/gi,
    function(match, beforeSrc, src, afterSrc) {
      // Extract alt text if present
      const altMatch = match.match(/alt="([^"]*?)"/i);
      const alt = altMatch ? altMatch[1] : '';
      
      // Extract dimensions if present
      const widthMatch = match.match(/(?:data-)?width="([^"]*?)"/i);
      const heightMatch = match.match(/(?:data-)?height="([^"]*?)"/i);
      const width = widthMatch ? ` width="${widthMatch[1]}"` : '';
      const height = heightMatch ? ` height="${heightMatch[1]}"` : '';
      
      // Extract existing classes and replace lazy-image with direct-image
      const classMatch = match.match(/class="([^"]*?)"/i);
      let className = classMatch ? classMatch[1] : '';
      className = className.replace('lazy-image', 'direct-image');
      if (!className.includes('direct-image')) {
        className = className ? `${className} direct-image` : 'direct-image';
      }
      
      // Return direct loading image
      return `<img class="${className}" src="${src}"${width}${height} alt="${alt}">`;
    }
  );
  
  // Also ensure regular img tags don't have loading="lazy"
  data.content = data.content.replace(/loading="lazy"/gi, '');
  
  return data;
});

// Ensure code blocks load directly without lazy loading
hexo.extend.filter.register('after_post_render', function(data) {
  if (!data.content) return data;
  
  // Remove any lazy loading attributes from code blocks
  data.content = data.content.replace(/data-lazy="[^"]*"/gi, '');
  
  return data;
});
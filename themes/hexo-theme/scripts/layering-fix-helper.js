/**
 * Helper Hexo pour les corrections de superposition
 * Facilite l'intégration des corrections dans les templates
 */

'use strict';

// Helper pour inclure les corrections CSS
hexo.extend.helper.register('layering_fix_css', function() {
  const url = this.url_for('/css/layering-emergency-fix.css');
  return `<link rel="stylesheet" href="${url}">`;
});

// Helper pour inclure les corrections JavaScript
hexo.extend.helper.register('layering_fix_js', function() {
  const url = this.url_for('/js/layering-emergency-fix.js');
  return `<script src="${url}"></script>`;
});

// Helper pour inclure les deux corrections
hexo.extend.helper.register('layering_fix_all', function() {
  const cssUrl = this.url_for('/css/layering-emergency-fix.css');
  const jsUrl = this.url_for('/js/layering-emergency-fix.js');
  
  return `<!-- Corrections de superposition -->
<link rel="stylesheet" href="${cssUrl}">
<script src="${jsUrl}"></script>`;
});

// Helper pour vérifier si les corrections sont nécessaires
hexo.extend.helper.register('needs_layering_fix', function() {
  // Vous pouvez ajouter une logique pour déterminer si les corrections sont nécessaires
  // Par exemple, basé sur la configuration ou le layout
  const config = this.config;
  const page = this.page;
  
  // Activer les corrections pour certains layouts ou toujours
  const needsFix = config.layering_fix !== false && 
                   (page.layering_fix !== false);
  
  return needsFix;
});

// Helper pour debug des informations de layering
hexo.extend.helper.register('layering_debug_info', function() {
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  
  const config = this.config;
  const page = this.page;
  
  return `<!-- Debug Layering Info
Site: ${config.title}
URL: ${config.url}
Theme: ${config.theme}
Layout: ${page.layout}
Path: ${page.path}
-->`;
});

// Helper pour les URLs de test
hexo.extend.helper.register('layering_test_urls', function() {
  return {
    css: this.url_for('/css/layering-emergency-fix.css'),
    js: this.url_for('/js/layering-emergency-fix.js'),
    test: this.url_for('/test-layering/'),
    home: this.url_for('/')
  };
});

console.log('✅ Helpers de correction de superposition chargés');
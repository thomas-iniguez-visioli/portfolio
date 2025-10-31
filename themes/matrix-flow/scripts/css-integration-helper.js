/**
 * Helper pour l'intégration CSS sans preload
 * Gère le chargement conditionnel et l'optimisation
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class CSSIntegrationHelper {
  constructor(hexo) {
    this.hexo = hexo;
    this.config = this.loadConfig();
    this.isDevelopment = process.env.NODE_ENV !== 'production';
  }

  /**
   * Charge la configuration CSS
   */
  loadConfig() {
    try {
      const configPath = path.join(__dirname, '../_css-config.yml');
      const configContent = fs.readFileSync(configPath, 'utf8');
      return yaml.load(configContent);
    } catch (error) {
      console.warn('CSS config not found, using defaults');
      return this.getDefaultConfig();
    }
  }

  /**
   * Configuration par défaut
   */
  getDefaultConfig() {
    return {
      main_css: {
        file: '/css/main.css',
        minify: true,
        inline_critical: true
      },
      conditional_css: {},
      critical_css: {
        include_layout: true,
        include_responsive: true,
        include_fouc_prevention: true
      },
      performance: {
        prevent_fouc: true,
        sync_critical: true
      }
    };
  }

  /**
   * Génère les balises CSS principales
   */
  generateMainCSS() {
    const config = this.config.main_css;
    const cssFile = this.isDevelopment ? config.file : config.file.replace('.css', '.min.css');
    
    return `<link rel="stylesheet" href="${cssFile}" type="text/css">`;
  }

  /**
   * Génère les CSS conditionnels
   */
  generateConditionalCSS(page, theme) {
    const conditionalCSS = [];
    
    for (const [name, cssConfig] of Object.entries(this.config.conditional_css || {})) {
      if (this.evaluateCondition(cssConfig.condition, page, theme)) {
        const cssFile = this.isDevelopment ? cssConfig.file : cssConfig.file.replace('.css', '.min.css');
        conditionalCSS.push(`<link rel="stylesheet" href="${cssFile}" type="text/css">`);
      }
    }
    
    return conditionalCSS.join('\n');
  }

  /**
   * Évalue une condition pour le CSS conditionnel
   */
  evaluateCondition(condition, page, theme) {
    try {
      // Conditions prédéfinies
      if (condition === 'page.newsletter || theme.newsletter?.enabled') {
        return page.newsletter || (theme.newsletter && theme.newsletter.enabled);
      }
      
      if (condition === 'page.images || page.gallery || is_post()') {
        return page.images || page.gallery || page.layout === 'post';
      }
      
      // Autres conditions personnalisées
      return false;
    } catch (error) {
      console.warn(`Error evaluating CSS condition: ${condition}`, error);
      return false;
    }
  }

  /**
   * Génère le CSS critique inline
   */
  generateCriticalCSS() {
    if (!this.config.critical_css.include_layout) {
      return '';
    }

    const criticalCSS = `
    <style>
      /* CSS critique pour éviter le FOUC */
      body {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      
      body.loaded {
        opacity: 1;
      }
      
      /* Layout de base */
      .fullscreen-container {
        min-height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-areas: 
          "header header"
          "main sidebar"
          "footer footer";
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr 300px;
        gap: 1rem;
        background: #000;
        color: #00FF41;
        font-family: 'VT323', monospace;
      }
      
      .site-header { grid-area: header; padding: 1rem; border-bottom: 2px solid #00FF41; }
      .site-main { grid-area: main; padding: 1rem; overflow-y: auto; }
      .sidebar { grid-area: sidebar; padding: 1rem; border-left: 2px solid #00FF41; }
      .site-footer { grid-area: footer; padding: 1rem; border-top: 2px solid #00FF41; text-align: center; }
      
      ${this.config.critical_css.include_responsive ? this.getResponsiveCSS() : ''}
    </style>`;

    return criticalCSS;
  }

  /**
   * CSS responsive critique
   */
  getResponsiveCSS() {
    return `
      @media (max-width: 768px) {
        .fullscreen-container {
          grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "footer";
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr auto auto;
        }
        
        .sidebar {
          border-left: none;
          border-top: 2px solid #00FF41;
        }
      }`;
  }

  /**
   * Génère le script anti-FOUC
   */
  generateFOUCScript() {
    if (!this.config.performance.prevent_fouc) {
      return '';
    }

    return `
    <script>
      (function() {
        function markAsLoaded() {
          document.body.classList.add('loaded');
        }
        
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', markAsLoaded);
        } else {
          markAsLoaded();
        }
        
        window.addEventListener('load', markAsLoaded);
      })();
    </script>`;
  }

  /**
   * Génère l'intégration CSS complète
   */
  generateFullIntegration(page, theme) {
    const parts = [
      '<!-- CSS Integration sans preload -->',
      this.generateMainCSS(),
      this.generateConditionalCSS(page, theme),
      this.generateCriticalCSS(),
      this.generateFOUCScript()
    ];

    return parts.filter(part => part.trim()).join('\n');
  }

  /**
   * Analyse les performances CSS
   */
  analyzePerformance() {
    const stats = {
      mainCSSSize: this.getFileSize(this.config.main_css.file),
      conditionalCSSCount: Object.keys(this.config.conditional_css || {}).length,
      criticalCSSEnabled: this.config.critical_css.include_layout,
      foucPrevention: this.config.performance.prevent_fouc,
      minificationEnabled: this.config.main_css.minify && !this.isDevelopment
    };

    return stats;
  }

  /**
   * Obtient la taille d'un fichier
   */
  getFileSize(filePath) {
    try {
      const fullPath = path.join(__dirname, '../source', filePath);
      const stats = fs.statSync(fullPath);
      return stats.size;
    } catch (error) {
      return 0;
    }
  }
}

module.exports = CSSIntegrationHelper;
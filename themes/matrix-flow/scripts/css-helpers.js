
/**
 * Direct CSS Loader - Chargement synchrone de toutes les ressources
 * Charge tous les CSS directement sans optimisation asynchrone
 */
function direct_css(href) {
    return `<link rel="stylesheet" href="${href}" type="text/css">`;
}

function all_css_direct() {
    const cssFiles = [
        '/css/style.css',
        '/css/matrix-theme.css',
        '/css/responsive.css',
        '/css/newsletter.css',
        '/css/lazy-loading.css',
        '/css/glitch-effects.css',
        '/css/performance.css'
    ];
    
    return cssFiles.map(file => `<link rel="stylesheet" href="${url_for(file)}" type="text/css">`).join('\n  ');
}

function resource_hints() {
    const hints = [];
    
    // Preconnect to critical origins seulement
    hints.push('<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>');
    hints.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
    
    return hints.join('\n  ');
}

function critical_css() {
    // CSS critique inline sans JavaScript - tout visible immédiatement
    return `<style>
        body { 
            opacity: 1; 
            margin: 0; 
            padding: 0; 
            font-family: 'VT323', monospace;
            background: #000;
            color: #00FF41;
        }
        .fullscreen-container { 
            min-height: 100vh; 
            width: 100vw; 
            background: #000; 
            color: #00FF41;
            display: grid;
            grid-template-areas: 
                "header header"
                "main sidebar"
                "footer footer";
            grid-template-rows: auto 1fr auto;
            grid-template-columns: 1fr 300px;
            gap: 1rem;
        }
        .site-header { grid-area: header; padding: 1rem; border-bottom: 1px solid #00FF41; }
        .site-main { grid-area: main; padding: 1rem; }
        .sidebar { grid-area: sidebar; padding: 1rem; border-left: 1px solid #00FF41; }
        .site-footer { grid-area: footer; padding: 1rem; border-top: 1px solid #00FF41; text-align: center; }
        
        /* Responsive sans JavaScript */
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
            .sidebar { border-left: none; border-top: 1px solid #00FF41; }
        }
        
        /* Toutes les images chargées directement */
        img { display: block; max-width: 100%; height: auto; }
        img[data-src] { display: none; }
    </style>`;
}

// Enregistrer les helpers dans Hexo
hexo.extend.helper.register('direct_css', direct_css);
hexo.extend.helper.register('all_css_direct', all_css_direct);
hexo.extend.helper.register('resource_hints', resource_hints);
hexo.extend.helper.register('critical_css', critical_css);

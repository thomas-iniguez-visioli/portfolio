# Guide d'Intégration Hexo - Corrections de Superposition

Ce guide explique comment intégrer et utiliser les corrections de superposition dans un site Hexo.

## 🚀 Installation Rapide

### 1. Installation du Thème

```bash
# Dans votre dossier Hexo
cd your-hexo-site

# Cloner le thème
git clone https://github.com/your-repo/hexo-developer-theme.git themes/hexo-developer-theme

# Ou télécharger et extraire dans themes/
```

### 2. Configuration Hexo

Modifiez votre `_config.yml` principal :

```yaml
# _config.yml (racine du site)
theme: hexo-developer-theme

# Configuration du thème
theme_config:
  # Activer les corrections de superposition
  layering_fix: true
  
  # Profil développeur
  profile:
    name: "Votre Nom"
    title: "Full-Stack Developer"
    avatar: "/images/avatar.jpg"
    status: "Available for work"
  
  # Stack technique
  tech_stack:
    languages: ["JavaScript", "TypeScript", "Python"]
    frameworks: ["React", "Node.js", "Express"]
    tools: ["VS Code", "Git", "Docker"]
```

### 3. Test de l'Installation

```bash
# Générer le site
hexo generate

# Lancer le serveur de développement
hexo server

# Ouvrir dans le navigateur
open http://localhost:4000
```

## 🔧 Utilisation des Helpers Hexo

### Dans vos Templates EJS

#### Inclure les Corrections Automatiquement
```html
<!-- Dans _head.ejs -->
<% if (needs_layering_fix()) { %>
  <%- layering_fix_css() %>
<% } %>

<!-- Dans layout.ejs, avant </body> -->
<% if (needs_layering_fix()) { %>
  <%- layering_fix_js() %>
<% } %>
```

#### Inclure Toutes les Corrections
```html
<!-- Méthode simple - inclut CSS et JS -->
<%- layering_fix_all() %>
```

#### Informations de Debug (Développement)
```html
<!-- Affiche les infos de debug en commentaire HTML -->
<%- layering_debug_info() %>
```

#### URLs Générées
```html
<!-- Accéder aux URLs générées -->
<% const urls = layering_test_urls(); %>
<p>CSS: <%= urls.css %></p>
<p>JS: <%= urls.js %></p>
<p>Test: <%= urls.test %></p>
```

### Dans vos Pages Markdown

#### Activer les Corrections pour une Page
```yaml
---
title: Ma Page
layering_fix: true  # Force l'activation des corrections
---
```

#### Désactiver les Corrections pour une Page
```yaml
---
title: Ma Page Simple
layering_fix: false  # Désactive les corrections
---
```

## 🧪 Page de Test Hexo

### Créer une Page de Test

```bash
# Créer la page
hexo new page test-layering

# Modifier le fichier créé
```

```yaml
# source/test-layering/index.md
---
title: Test des Corrections de Superposition
layout: test-layering
layering_fix: true
---

Cette page teste les corrections de superposition intégrées dans Hexo.
```

### Accéder à la Page de Test

```bash
# Générer et servir
hexo generate && hexo server

# Ouvrir
open http://localhost:4000/test-layering/
```

## 🎯 Configuration Avancée

### Configuration Complète du Thème

```yaml
# themes/hexo-developer-theme/_config.yml
layering_fix: true

profile:
  name: "John Developer"
  title: "Senior Full-Stack Developer"
  avatar: "/images/avatar.jpg"
  status: "Available for work"
  location: "Paris, France"
  bio: "Passionate developer with 5+ years of experience"

tech_stack:
  languages:
    - "JavaScript"
    - "TypeScript"
    - "Python"
    - "Go"
  frameworks:
    - "React"
    - "Next.js"
    - "Node.js"
    - "FastAPI"
  tools:
    - "VS Code"
    - "Git"
    - "Docker"
    - "Kubernetes"
    - "AWS"

social:
  github: "john-developer"
  linkedin: "john-developer"
  twitter: "johndev"
  email: "john@example.com"

features:
  dark_mode: true
  syntax_highlighting: true
  search: true
  comments: true

colors:
  primary: "#2563eb"
  secondary: "#64748b"
```

### Configuration par Layout

```yaml
# Dans le front-matter d'une page
---
title: Ma Page Spéciale
layout: post
layering_fix: true        # Force les corrections
debug:
  layering_info: true     # Affiche les infos de debug
---
```

## 🔍 Debug et Résolution de Problèmes

### Console Debug Hexo

```javascript
// Dans la console du navigateur
debugHexoLayering();      // Debug spécifique Hexo
window.EmergencyFix.init(); // Réapplique les corrections
```

### Vérification des URLs

```javascript
// Vérifier que les URLs sont correctes
console.log('URLs Hexo:', {
  css: '<%= url_for("/css/layering-emergency-fix.css") %>',
  js: '<%= url_for("/js/layering-emergency-fix.js") %>'
});
```

### Vérification de la Configuration

```javascript
// Dans un template EJS
console.log('Config thème:', <%- JSON.stringify(theme) %>);
console.log('Config site:', <%- JSON.stringify(config) %>);
```

## 📝 Templates Personnalisés

### Créer un Layout avec Corrections

```html
<!-- layout/my-custom-layout.ejs -->
<!DOCTYPE html>
<html lang="<%- config.language %>" class="dev-theme">
<head>
  <%- partial('_head') %>
  
  <!-- Corrections automatiques -->
  <% if (needs_layering_fix()) { %>
    <%- layering_fix_css() %>
  <% } %>
</head>
<body class="dev-layout custom-layout">
  <div class="dev-page-grid">
    <%- partial('header') %>
    
    <main class="dev-page-main" id="main-content">
      <div class="dev-layout-container">
        <%- partial('sidebar') %>
        <div class="dev-main-content">
          <%- body %>
        </div>
      </div>
    </main>
    
    <%- partial('footer') %>
  </div>
  
  <!-- Scripts avec corrections -->
  <script src="<%= url_for('/js/dev-theme.js') %>"></script>
  <% if (needs_layering_fix()) { %>
    <%- layering_fix_js() %>
  <% } %>
</body>
</html>
```

### Partial pour Corrections

```html
<!-- layout/_layering-fixes.ejs -->
<% if (needs_layering_fix()) { %>
  <!-- CSS Corrections -->
  <%- layering_fix_css() %>
  
  <!-- Debug Info (development only) -->
  <% if (process.env.NODE_ENV !== 'production') { %>
    <%- layering_debug_info() %>
  <% } %>
<% } %>
```

Utilisation dans vos templates :
```html
<!-- Dans _head.ejs -->
<%- partial('_layering-fixes') %>
```

## 🎨 Personnalisation

### Couleurs Personnalisées

```yaml
# _config.yml du thème
colors:
  primary: "#your-brand-color"
  secondary: "#your-secondary-color"
```

### Désactiver les Corrections

```yaml
# Pour désactiver globalement
layering_fix: false

# Ou dans une page spécifique
---
title: Page Sans Corrections
layering_fix: false
---
```

## 📊 Monitoring

### Variables Hexo Disponibles

Dans vos templates, vous avez accès à :

```javascript
// Configuration du site
config.title          // Titre du site
config.url            // URL du site
config.theme          // Nom du thème

// Configuration du thème
theme.layering_fix    // État des corrections
theme.profile         // Profil développeur
theme.tech_stack      // Stack technique

// Page courante
page.layout           // Layout de la page
page.path             // Chemin de la page
page.layering_fix     // Corrections pour cette page
```

### Logs de Debug

```javascript
// Les helpers génèrent des logs
console.log('✅ Helpers de correction chargés');
console.log('🎨 Developer theme initialized');
console.log('🔧 Layering issues fixed');
```

## 🚀 Déploiement

### Production

```bash
# Générer pour la production
NODE_ENV=production hexo generate

# Les corrections restent actives mais sans debug
```

### Variables d'Environnement

```bash
# Développement avec debug
NODE_ENV=development hexo server

# Production sans debug
NODE_ENV=production hexo generate
```

## 📋 Checklist d'Intégration

- [ ] Thème installé dans `themes/hexo-developer-theme`
- [ ] Configuration `_config.yml` mise à jour
- [ ] `layering_fix: true` dans la config
- [ ] Site généré sans erreurs (`hexo generate`)
- [ ] Serveur de développement fonctionne (`hexo server`)
- [ ] Page de test accessible (`/test-layering/`)
- [ ] Header sticky fonctionne
- [ ] Sidebar mobile fonctionne
- [ ] Pas de débordement horizontal
- [ ] Console sans erreurs JavaScript

## 🆘 Support

### Problèmes Courants

**Erreur "Helper not found"** :
- Vérifiez que `scripts/layering-fix-helper.js` existe
- Redémarrez le serveur Hexo

**CSS/JS non chargés** :
- Vérifiez les chemins avec `url_for`
- Vérifiez que les fichiers existent dans `source/`

**Corrections non appliquées** :
- Vérifiez `layering_fix: true` dans la config
- Ouvrez la console pour voir les logs

### Debug Avancé

```bash
# Hexo avec debug verbose
DEBUG=hexo:* hexo server

# Vérifier la génération des assets
hexo generate --debug
```

---

**Les corrections sont maintenant parfaitement intégrées dans Hexo avec les `url_for` !** 🎉
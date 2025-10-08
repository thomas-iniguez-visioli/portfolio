# Guide de Dépannage - Problèmes de Superposition CSS

Ce guide vous aide à résoudre les problèmes de superposition et de z-index dans le thème Hexo Developer.

## 🔍 Problèmes Courants

### 1. Éléments qui se chevauchent

**Symptômes :**
- La sidebar apparaît par-dessus le contenu principal
- Le header cache d'autres éléments
- Les modales n'apparaissent pas au-dessus du contenu

**Solutions :**

#### Vérifier l'ordre des fichiers CSS
Assurez-vous que les fichiers CSS sont chargés dans le bon ordre :

```html
<!-- Dans votre layout -->
<link rel="stylesheet" href="/css/main.css">
<!-- OU individuellement dans cet ordre : -->
<link rel="stylesheet" href="/css/reset.css">
<link rel="stylesheet" href="/css/variables.css">
<link rel="stylesheet" href="/css/layout-fixes.css">
<link rel="stylesheet" href="/css/z-index-fix.css">
<!-- ... autres fichiers CSS -->
```

#### Utiliser le fichier de correction
Le thème inclut des corrections automatiques. Importez le fichier principal :

```css
/* Dans votre CSS personnalisé */
@import '/css/main.css';
```

### 2. Sidebar mobile qui ne s'affiche pas correctement

**Symptômes :**
- La sidebar mobile reste visible en permanence
- La sidebar ne se ferme pas
- Le backdrop n'apparaît pas

**Solutions :**

#### Vérifier les classes JavaScript
Assurez-vous que les classes sont correctement appliquées :

```javascript
// Vérifier si les classes sont présentes
const sidebar = document.querySelector('.dev-sidebar');
const toggle = document.querySelector('.dev-sidebar-toggle');
const backdrop = document.querySelector('.dev-sidebar-backdrop');

console.log('Sidebar classes:', sidebar.classList);
console.log('Toggle state:', toggle.getAttribute('aria-expanded'));
```

#### Forcer les z-index corrects
Si le problème persiste, ajoutez ces styles :

```css
@media (max-width: 1023px) {
  .dev-sidebar-toggle {
    z-index: 1402 !important;
    position: fixed !important;
  }
  
  .dev-sidebar {
    z-index: 1400 !important;
    position: fixed !important;
  }
  
  .dev-sidebar-backdrop {
    z-index: 1399 !important;
    position: fixed !important;
  }
}
```

### 3. Header qui disparaît ou se comporte mal

**Symptômes :**
- Le header n'est pas sticky
- Le header apparaît derrière d'autres éléments
- Le menu mobile ne fonctionne pas

**Solutions :**

#### Corriger le positionnement du header
```css
.page-header {
  position: sticky !important;
  top: 0;
  z-index: 1100 !important;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
}
```

#### Vérifier le support du backdrop-filter
```css
/* Fallback pour les navigateurs sans support */
@supports not (backdrop-filter: blur(12px)) {
  .page-header {
    background-color: rgba(255, 255, 255, 0.98);
  }
}
```

### 4. Contenu qui passe sous les éléments fixes

**Symptômes :**
- Le contenu principal passe sous le header
- Les éléments flottants cachent le texte
- Les cartes se chevauchent

**Solutions :**

#### Ajouter un padding-top au contenu principal
```css
.main-content {
  padding-top: 80px; /* Hauteur du header */
}

@media (max-width: 767px) {
  .main-content {
    padding-top: 60px; /* Hauteur réduite sur mobile */
  }
}
```

#### Utiliser isolation pour créer des contextes de superposition
```css
.page-header,
.dev-sidebar,
.main-content {
  isolation: isolate;
}
```

## 🛠️ Outils de Débogage

### Mode Debug
Activez le mode debug pour visualiser les problèmes :

```html
<body class="debug-mode">
```

Cela ajoutera des bordures colorées et des indicateurs z-index.

### Inspection des z-index
Utilisez cette fonction JavaScript pour inspecter les z-index :

```javascript
function debugZIndex() {
  const elements = document.querySelectorAll('*');
  elements.forEach(el => {
    const zIndex = window.getComputedStyle(el).zIndex;
    if (zIndex !== 'auto' && zIndex !== '0') {
      console.log(el, 'z-index:', zIndex);
    }
  });
}

// Exécuter dans la console
debugZIndex();
```

### Vérification du stacking context
```javascript
function checkStackingContext(element) {
  const style = window.getComputedStyle(element);
  const properties = [
    'position', 'zIndex', 'opacity', 'transform', 
    'filter', 'isolation', 'mixBlendMode'
  ];
  
  properties.forEach(prop => {
    console.log(`${prop}:`, style[prop]);
  });
}

// Utilisation
checkStackingContext(document.querySelector('.dev-sidebar'));
```

## 🔧 Solutions Spécifiques par Navigateur

### Safari
```css
/* Correction pour Safari */
@supports (-webkit-appearance: none) {
  .page-header,
  .dev-sidebar {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
```

### Firefox
```css
/* Correction pour Firefox */
@-moz-document url-prefix() {
  .layout-with-sidebar {
    display: flex !important;
  }
}
```

### Internet Explorer 11
```css
/* Correction pour IE11 */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .page-header {
    z-index: 1100;
    position: -ms-sticky;
  }
  
  .dev-sidebar {
    z-index: 10;
  }
}
```

## 📱 Problèmes Mobile Spécifiques

### Viewport Issues
```html
<!-- Assurez-vous d'avoir cette meta tag -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

### Safe Area pour les appareils avec encoche
```css
.page-header {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-top: env(safe-area-inset-top);
}
```

### Prévenir le scroll horizontal
```css
body, html {
  overflow-x: hidden;
  max-width: 100vw;
}
```

## 🎯 Corrections Rapides

### Reset complet des z-index
Si vous avez des conflits majeurs, utilisez cette correction d'urgence :

```css
/* CORRECTION D'URGENCE - À utiliser temporairement */
.page-header { z-index: 1100 !important; }
.dev-sidebar-toggle { z-index: 1402 !important; }
.dev-sidebar { z-index: 1400 !important; }
.dev-sidebar-backdrop { z-index: 1399 !important; }
.nav-menu { z-index: 1400 !important; }
.modal { z-index: 1500 !important; }
.tooltip { z-index: 1800 !important; }
```

### Isolation forcée
```css
/* Force la création de contextes de superposition */
.page-header,
.dev-sidebar,
.main-content,
.modal,
.dropdown-menu {
  isolation: isolate !important;
}
```

## 📋 Checklist de Vérification

Avant de signaler un bug, vérifiez :

- [ ] Les fichiers CSS sont chargés dans le bon ordre
- [ ] Aucun CSS personnalisé ne surcharge les z-index
- [ ] Le JavaScript fonctionne correctement (pas d'erreurs console)
- [ ] Le problème existe sur plusieurs navigateurs
- [ ] Les media queries sont correctes
- [ ] Les variables CSS sont définies
- [ ] Le mode debug ne révèle pas d'autres problèmes

## 🆘 Support

Si les problèmes persistent :

1. **Activez le mode debug** : `<body class="debug-mode">`
2. **Prenez une capture d'écran** du problème
3. **Copiez le code HTML/CSS** de la section problématique
4. **Testez sur différents navigateurs**
5. **Vérifiez la console** pour les erreurs JavaScript

## 🔄 Mise à Jour des Corrections

Les corrections sont régulièrement mises à jour. Pour obtenir les dernières :

```bash
# Mettre à jour le thème
git pull origin main

# Ou télécharger les derniers fichiers de correction
curl -O https://raw.githubusercontent.com/your-repo/hexo-theme/main/source/styles/z-index-fix.css
curl -O https://raw.githubusercontent.com/your-repo/hexo-theme/main/source/styles/layout-fixes.css
```

---

**Note :** Ces corrections sont conçues pour résoudre les problèmes les plus courants. Si vous rencontrez des problèmes spécifiques à votre configuration, n'hésitez pas à créer un issue sur le repository du thème.
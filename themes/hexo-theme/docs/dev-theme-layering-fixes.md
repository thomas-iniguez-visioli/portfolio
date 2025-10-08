# Corrections de Superposition pour Dev-Theme

Ce document explique les corrections spécifiques appliquées au dev-theme pour résoudre les problèmes de superposition CSS.

## 🔧 Corrections Appliquées

### 1. Fichiers Créés/Modifiés

#### Nouveaux Fichiers CSS
- `source/css/dev-theme-fixes.css` - Corrections spécifiques au dev-theme
- `source/styles/z-index-fix.css` - Corrections générales de z-index
- `source/styles/layout-fixes.css` - Corrections de layout

#### Fichiers JavaScript Modifiés
- `source/js/dev-theme.js` - Ajout de la fonction `fixLayeringIssues()`

#### Fichiers Template Modifiés
- `layout/_head.ejs` - Inclusion des fichiers de correction CSS

### 2. Problèmes Résolus

#### Sidebar Mobile
- **Problème** : Sidebar qui restait visible ou ne se fermait pas
- **Solution** : Z-index cohérents et gestion correcte des classes CSS
- **Code** :
```css
@media (max-width: 1023px) {
  .dev-sidebar {
    position: fixed !important;
    z-index: var(--z-index-modal);
    transform: translateX(-100%);
  }
  
  .dev-sidebar-toggle {
    position: fixed !important;
    z-index: calc(var(--z-index-modal) + 2);
  }
}
```

#### Header Sticky
- **Problème** : Header qui n'était pas sticky ou avait un mauvais z-index
- **Solution** : Position sticky forcée avec z-index approprié
- **Code** :
```css
.dev-header, .page-header {
  position: sticky !important;
  top: 0;
  z-index: var(--z-index-sticky);
}
```

#### Navigation Mobile
- **Problème** : Menu mobile qui ne s'affichait pas correctement
- **Solution** : Z-index et positionnement fixes
- **Code** :
```css
@media (max-width: 767px) {
  .dev-nav-menu, .nav-menu {
    position: fixed !important;
    z-index: var(--z-index-modal);
  }
}
```

### 3. Améliorations JavaScript

#### Fonction de Correction Automatique
```javascript
function fixLayeringIssues() {
  // Définir les variables CSS si manquantes
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  const zIndexSticky = computedStyle.getPropertyValue('--z-index-sticky');
  if (!zIndexSticky || zIndexSticky === '') {
    root.style.setProperty('--z-index-sticky', '1100');
    root.style.setProperty('--z-index-modal', '1400');
    // ... autres variables
  }
  
  // Corriger le positionnement des éléments
  const header = document.querySelector('.page-header, .dev-header');
  if (header) {
    header.style.position = 'sticky';
    header.style.zIndex = 'var(--z-index-sticky)';
  }
}
```

#### Gestion Responsive Améliorée
```javascript
function initResponsiveBehavior() {
  const sidebar = document.querySelector('.dev-sidebar, #dev-sidebar');
  const toggle = document.querySelector('.dev-sidebar-toggle');
  const backdrop = document.querySelector('.dev-sidebar-backdrop');
  
  // Créer le backdrop s'il n'existe pas
  if (!backdrop && toggle) {
    const newBackdrop = document.createElement('div');
    newBackdrop.className = 'dev-sidebar-backdrop';
    document.body.appendChild(newBackdrop);
  }
  
  // Gestion des breakpoints avec corrections
  const mediaQuery = window.matchMedia('(max-width: 1023px)');
  function handleBreakpointChange(e) {
    if (e.matches) {
      // Mobile
      sidebar.style.position = 'fixed';
      sidebar.style.zIndex = 'var(--z-index-modal)';
    } else {
      // Desktop
      sidebar.style.position = 'sticky';
      sidebar.style.zIndex = 'var(--z-index-docked)';
    }
  }
}
```

## 🧪 Tests et Validation

### Page de Test
Utilisez `test-dev-theme-layering.html` pour valider les corrections :

```bash
# Ouvrir la page de test
open themes/hexo-theme/test-dev-theme-layering.html
```

### Tests Automatisés
La page inclut des tests JavaScript automatiques :

1. **Test Z-Index** - Vérifie que tous les z-index sont correctement définis
2. **Test Sidebar** - Vérifie le comportement de la sidebar
3. **Test Responsive** - Vérifie le comportement sur différentes tailles d'écran
4. **Test Components** - Vérifie que les composants ne se chevauchent pas

### Debug Console
Utilisez la console pour déboguer :

```javascript
// Afficher les informations de debug
showDevThemeDebug();

// Forcer la correction des problèmes
window.DevTheme.fixLayering();

// Tester la sidebar
window.DevTheme.sidebar();
```

## 📱 Comportement Responsive

### Mobile (≤ 1023px)
- Sidebar : `position: fixed`, `z-index: 1400`
- Toggle : `position: fixed`, `z-index: 1402`
- Backdrop : `z-index: 1399`
- Navigation : `position: fixed`, `z-index: 1400`

### Desktop (> 1023px)
- Sidebar : `position: sticky`, `z-index: 10`
- Toggle : `display: none`
- Header : `position: sticky`, `z-index: 1100`

## 🔍 Débogage

### Problèmes Courants

#### 1. Sidebar ne se ferme pas
**Diagnostic** :
```javascript
const sidebar = document.querySelector('.dev-sidebar');
console.log('Sidebar classes:', sidebar.classList);
console.log('Sidebar style:', window.getComputedStyle(sidebar));
```

**Solution** :
```javascript
// Forcer la fermeture
sidebar.classList.remove('dev-sidebar-open', 'dev-sidebar--open');
const backdrop = document.querySelector('.dev-sidebar-backdrop');
if (backdrop) {
  backdrop.classList.remove('dev-sidebar-backdrop-visible', 'visible');
}
```

#### 2. Z-index ne fonctionne pas
**Diagnostic** :
```javascript
const root = document.documentElement;
console.log('Z-index variables:', {
  sticky: getComputedStyle(root).getPropertyValue('--z-index-sticky'),
  modal: getComputedStyle(root).getPropertyValue('--z-index-modal')
});
```

**Solution** :
```javascript
// Redéfinir les variables
window.DevTheme.fixLayering();
```

#### 3. Header pas sticky
**Diagnostic** :
```javascript
const header = document.querySelector('.page-header, .dev-header');
console.log('Header position:', window.getComputedStyle(header).position);
console.log('Header z-index:', window.getComputedStyle(header).zIndex);
```

**Solution** :
```css
.dev-header, .page-header {
  position: sticky !important;
  top: 0;
  z-index: 1100 !important;
}
```

### Mode Debug
Activez le mode debug pour voir les indicateurs visuels :

```html
<body class="debug-mode dev-theme-loaded">
```

Cela affichera :
- Bordures colorées autour des éléments
- Indicateurs z-index
- Informations de positionnement

## 🚀 Intégration

### Dans un Projet Existant

1. **Copier les fichiers CSS** :
```bash
cp source/css/dev-theme-fixes.css your-project/css/
cp source/styles/z-index-fix.css your-project/css/
cp source/styles/layout-fixes.css your-project/css/
```

2. **Inclure dans le HTML** :
```html
<link rel="stylesheet" href="/css/z-index-fix.css">
<link rel="stylesheet" href="/css/layout-fixes.css">
<link rel="stylesheet" href="/css/dev-theme-fixes.css">
```

3. **Mettre à jour le JavaScript** :
```javascript
// Ajouter après l'initialisation du dev-theme
if (window.DevTheme) {
  window.DevTheme.fixLayering();
}
```

### Variables CSS Requises
Assurez-vous que ces variables sont définies :

```css
:root {
  --z-index-hide: -1;
  --z-index-base: 0;
  --z-index-docked: 10;
  --z-index-sticky: 1100;
  --z-index-modal: 1400;
  --z-index-tooltip: 1800;
}
```

## 📋 Checklist de Validation

Avant de déployer, vérifiez :

- [ ] Sidebar mobile s'ouvre et se ferme correctement
- [ ] Header reste sticky lors du scroll
- [ ] Navigation mobile fonctionne
- [ ] Aucun élément ne se chevauche
- [ ] Z-index cohérents sur tous les navigateurs
- [ ] Backdrop fonctionne sur mobile
- [ ] Animations fluides
- [ ] Accessibilité préservée (navigation clavier)
- [ ] Tests passent sur la page de test

## 🔄 Maintenance

### Mise à Jour des Corrections
Pour mettre à jour les corrections :

```bash
# Télécharger les dernières corrections
curl -O https://raw.githubusercontent.com/your-repo/hexo-theme/main/source/css/dev-theme-fixes.css

# Ou via git
git pull origin main
```

### Surveillance
Surveillez ces métriques :
- Temps de chargement CSS
- Erreurs JavaScript console
- Feedback utilisateur sur la navigation
- Tests automatisés

---

**Note** : Ces corrections sont spécifiquement conçues pour le dev-theme. Si vous utilisez un autre thème, adaptez les sélecteurs CSS en conséquence.
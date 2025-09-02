# Design Document

## Overview

Ce document présente la conception pour moderniser le portfolio Hexo de Thomas Iniguez Visioli. Le design vise à transformer l'apparence actuelle en une interface moderne, élégante et professionnelle tout en conservant la structure de contenu existante et l'organisation des fichiers Markdown.

Le design s'appuie sur les tendances actuelles du web design : typographie moderne, espacement généreux, couleurs contemporaines, et une approche mobile-first pour garantir une expérience optimale sur tous les appareils.

## Architecture

### Structure Existante Conservée
- **Hexo Static Site Generator** : Conservation du générateur de site statique actuel
- **Thème personnalisé** : Mise à jour du thème `hexo-theme` existant
- **Organisation des contenus** : Maintien de la structure des fichiers Markdown dans `/source`
- **Système de build** : Conservation des scripts npm et de la configuration de déploiement

### Approche de Modernisation
- **CSS moderne** : Remplacement du système LESS par CSS moderne avec variables CSS natives
- **Design System** : Implémentation d'un système de design cohérent
- **Responsive Design** : Approche mobile-first avec breakpoints modernes
- **Performance** : Optimisation des ressources et du temps de chargement

## Components and Interfaces

### 1. Système de Couleurs Moderne

**Palette Principale :**
```css
:root {
  /* Couleurs primaires */
  --color-primary: #2563eb;      /* Bleu moderne */
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1d4ed8;
  
  /* Couleurs neutres */
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;
  
  /* Couleurs sémantiques */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}
```

### 2. Typographie Moderne

**Hiérarchie typographique :**
- **Font Stack** : Inter, system-ui, -apple-system, sans-serif pour les titres
- **Font Stack** : Georgia, serif pour le contenu long
- **Font Stack** : JetBrains Mono, monospace pour le code

**Échelle typographique :**
```css
:root {
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
}
```

### 3. Layout et Espacement

**Système d'espacement :**
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

**Container et Grid :**
- Container max-width : 1200px
- Grid system : CSS Grid et Flexbox
- Breakpoints : 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

### 4. Composants UI Modernes

#### Header/Navigation
- **Design** : Header fixe avec navigation horizontale
- **Mobile** : Menu hamburger avec overlay
- **Éléments** : Logo, navigation principale, bouton de contact
- **Styling** : Fond semi-transparent avec backdrop-blur

#### Hero Section
- **Layout** : Section pleine largeur avec contenu centré
- **Éléments** : Titre principal, sous-titre, photo de profil, CTA
- **Animation** : Animations d'entrée subtiles au scroll

#### Cards de Projets
- **Design** : Cards modernes avec hover effects
- **Layout** : Grid responsive (1-2-3 colonnes selon l'écran)
- **Éléments** : Image, titre, description, tags, liens
- **Interactions** : Hover avec élévation et transition

#### Articles de Blog
- **Typography** : Optimisée pour la lecture
- **Layout** : Largeur optimale pour la lisibilité (65-75 caractères par ligne)
- **Éléments** : Métadonnées, temps de lecture, tags

#### Footer
- **Design** : Footer moderne avec sections organisées
- **Éléments** : Liens sociaux, navigation secondaire, copyright
- **Styling** : Fond contrasté avec le reste du site

### 5. Interactions et Animations

**Micro-interactions :**
- Hover effects sur les liens et boutons
- Transitions fluides (300ms ease-out)
- Loading states pour les images
- Scroll animations subtiles

**Animations CSS :**
```css
/* Transitions de base */
.transition-base {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## Data Models

### Structure de Contenu Conservée

**Posts/Articles :**
- Front matter YAML existant maintenu
- Layouts : post, journal, reading-note
- Catégories et tags conservés

**Pages Statiques :**
- About, Contact, Status conservées
- Structure Markdown maintenue

**Configuration :**
- `_config.yml` : Ajout de nouvelles options de thème
- `themes/hexo-theme/_config.yml` : Mise à jour des paramètres de design

### Nouvelles Métadonnées de Design

```yaml
# Ajouts au _config.yml du thème
design:
  color_scheme: "modern"
  typography: "inter-georgia"
  layout: "grid"
  animations: true
  dark_mode: false
```

## Error Handling

### Fallbacks et Compatibilité

**CSS Fallbacks :**
- Variables CSS avec fallbacks pour anciens navigateurs
- Progressive enhancement pour les nouvelles fonctionnalités
- Polyfills pour CSS Grid si nécessaire

**Images et Médias :**
- Images responsive avec srcset
- Lazy loading pour les performances
- Formats modernes (WebP) avec fallbacks

**JavaScript :**
- Progressive enhancement
- Graceful degradation si JS désactivé
- Error boundaries pour les composants interactifs

## Testing Strategy

### Tests Visuels
1. **Cross-browser testing** : Chrome, Firefox, Safari, Edge
2. **Responsive testing** : Mobile, tablet, desktop
3. **Performance testing** : Lighthouse, PageSpeed Insights
4. **Accessibility testing** : WAVE, axe-core

### Tests Fonctionnels
1. **Navigation** : Tous les liens fonctionnent
2. **Formulaires** : Contact et recherche
3. **Responsive** : Breakpoints et layout
4. **Performance** : Temps de chargement < 3s

### Validation
1. **HTML** : W3C Validator
2. **CSS** : CSS Validator
3. **Accessibility** : WCAG 2.1 AA compliance
4. **SEO** : Meta tags, structured data

## Implementation Phases

### Phase 1 : Fondations
- Mise à jour du système de couleurs
- Implémentation de la nouvelle typographie
- Refactoring du CSS (LESS → CSS moderne)

### Phase 2 : Composants
- Modernisation du header/navigation
- Redesign des cards de projets
- Amélioration de la mise en page des articles

### Phase 3 : Interactions
- Ajout des animations et transitions
- Optimisation responsive
- Tests et ajustements finaux

### Phase 4 : Optimisation
- Performance optimization
- Accessibility improvements
- Cross-browser testing et fixes
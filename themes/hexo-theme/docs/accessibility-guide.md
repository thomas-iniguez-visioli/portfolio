# Guide d'Accessibilité - Thème Développeur Hexo

## Vue d'ensemble

Ce thème Hexo implémente une accessibilité complète conforme aux standards WCAG 2.1 AA, garantissant une expérience utilisateur optimale pour tous les utilisateurs, y compris ceux utilisant des technologies d'assistance.

## Fonctionnalités d'Accessibilité Implémentées

### 1. Navigation Clavier ⌨️

#### Skip Links
- **Liens de saut** vers le contenu principal, la navigation et la barre latérale
- Visibles uniquement lors de la navigation au clavier
- Raccourcis clavier : `Alt + H` (contenu), `Alt + N` (navigation), `Alt + S` (recherche)

#### Navigation au Clavier
- **Tous les éléments interactifs** sont accessibles via `Tab` et `Shift+Tab`
- **Navigation par flèches** dans les menus (`↑` `↓` `Home` `End`)
- **Échappement** avec `Esc` pour fermer modales et menus
- **Indicateurs de focus** visibles et conformes WCAG

### 2. Support des Lecteurs d'Écran 🔊

#### Contenu Screen-Reader Only
```css
.sr-only {
  /* Contenu visible uniquement pour les lecteurs d'écran */
}

.visually-hidden {
  /* Contenu masqué visuellement mais accessible */
}
```

#### ARIA Labels et Descriptions
- **Labels automatiques** pour les éléments de navigation
- **Descriptions contextuelles** pour les actions complexes
- **États dynamiques** (expanded, selected, invalid)

#### Régions Live
- **Annonces automatiques** des changements de contenu
- **Messages de statut** pour les formulaires
- **Notifications** non-intrusives

### 3. Gestion du Focus 🎯

#### Piège de Focus
- **Modales** avec focus piégé et restauration
- **Menus déroulants** avec gestion du focus
- **Navigation séquentielle** logique

#### Indicateurs de Focus
- **Contour visible** de 3px minimum
- **Contraste élevé** pour la visibilité
- **Ombre portée** pour améliorer la perception

### 4. Accessibilité des Formulaires 📝

#### Labels et Associations
- **Labels explicites** pour tous les champs
- **Champs requis** clairement indiqués
- **Messages d'aide** associés via `aria-describedby`

#### Validation et Erreurs
- **États d'erreur** avec `aria-invalid`
- **Messages d'erreur** descriptifs
- **Validation en temps réel** non-intrusive

### 5. Contraste et Couleurs 🎨

#### Conformité WCAG
- **Ratio de contraste** minimum 4.5:1 (AA)
- **Texte large** minimum 3:1
- **Mode contraste élevé** disponible

#### Support des Préférences Système
```css
@media (prefers-contrast: high) {
  /* Styles haute contraste */
}

@media (forced-colors: active) {
  /* Compatibilité Windows High Contrast */
}
```

### 6. Animations et Mouvement 🎬

#### Respect des Préférences
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations réduites ou désactivées */
}
```

#### Contrôles Utilisateur
- **Toggle animations** avec `Alt + M`
- **Préférences sauvegardées** en localStorage
- **Animations essentielles** préservées

### 7. Cibles Tactiles 👆

#### Tailles Minimales
- **44×44px minimum** pour tous les éléments interactifs
- **48×48px** sur écrans tactiles
- **Espacement suffisant** entre les cibles

### 8. HTML Sémantique 🏗️

#### Landmarks ARIA
```html
<header role="banner">
<nav role="navigation" aria-label="Navigation principale">
<main role="main">
<aside role="complementary" aria-label="Barre latérale">
<footer role="contentinfo">
```

#### Hiérarchie des Titres
- **Structure logique** sans saut de niveau
- **Contexte pour lecteurs d'écran** avec préfixes cachés

## Raccourcis Clavier

| Raccourci | Action |
|-----------|--------|
| `Alt + H` | Aller au contenu principal |
| `Alt + N` | Aller à la navigation |
| `Alt + S` | Aller à la recherche |
| `Alt + C` | Basculer le contraste élevé |
| `Alt + M` | Basculer les animations |
| `Esc` | Fermer modales/menus |
| `Tab` | Navigation suivante |
| `Shift + Tab` | Navigation précédente |
| `↑` `↓` | Navigation dans les menus |
| `Home` `End` | Premier/dernier élément |
| `Enter` `Space` | Activer l'élément |

## Tests d'Accessibilité

### Tests Automatisés
Le thème inclut une suite de tests automatisés qui vérifie :
- ✅ Présence et fonctionnement des skip links
- ✅ Indicateurs de focus visibles
- ✅ Labels ARIA appropriés
- ✅ Contraste des couleurs
- ✅ Accessibilité des formulaires
- ✅ HTML sémantique
- ✅ Tailles des cibles tactiles
- ✅ Support des lecteurs d'écran

### Tests Manuels Recommandés

#### Lecteurs d'Écran
- **NVDA** (Windows) - Gratuit
- **JAWS** (Windows) - Payant
- **VoiceOver** (macOS/iOS) - Intégré
- **TalkBack** (Android) - Intégré

#### Outils de Test
- **axe-core** - Extension navigateur
- **WAVE** - Évaluateur web d'accessibilité
- **Lighthouse** - Audit intégré Chrome
- **Colour Contrast Analyser** - Test de contraste

### Commandes de Test

```javascript
// Lancer les tests automatisés
const tester = new AccessibilityTester();
const results = tester.runAllTests();

// Vérifier le contraste d'une couleur
window.accessibilityManager.checkColorContrast('#000000', '#ffffff');

// Annoncer un message aux lecteurs d'écran
window.accessibilityManager.announceToScreenReader('Message important');
```

## Configuration

### Variables CSS Personnalisables

```css
:root {
  /* Couleurs d'accessibilité */
  --color-focus: #2563eb;
  --color-focus-shadow: rgba(37, 99, 235, 0.2);
  --color-error: #ef4444;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  
  /* Tailles minimales */
  --min-touch-target: 44px;
  --min-focus-outline: 3px;
  
  /* Z-index pour l'accessibilité */
  --z-index-skiplink: 9999;
  --z-index-modal: 1000;
  --z-index-tooltip: 1001;
}
```

### Options de Configuration

```yaml
# _config.yml du thème
accessibility:
  skip_links: true
  keyboard_shortcuts: true
  high_contrast_mode: true
  reduced_motion_support: true
  auto_announce: true
  focus_management: true
```

## Bonnes Pratiques

### Pour les Développeurs

1. **Toujours tester au clavier** - Naviguez sans souris
2. **Utiliser des lecteurs d'écran** - Testez avec NVDA ou VoiceOver
3. **Vérifier le contraste** - Utilisez des outils de vérification
4. **Respecter la sémantique** - Utilisez les bons éléments HTML
5. **Tester sur mobile** - Vérifiez les cibles tactiles

### Pour les Rédacteurs

1. **Textes alternatifs** - Décrivez le contenu des images
2. **Titres structurés** - Respectez la hiérarchie H1-H6
3. **Liens descriptifs** - Évitez "cliquez ici"
4. **Contenu clair** - Utilisez un langage simple
5. **Contrastes suffisants** - Vérifiez la lisibilité

## Ressources

### Standards et Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)

### Outils de Test
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### Lecteurs d'Écran
- [NVDA Download](https://www.nvaccess.org/download/)
- [VoiceOver Guide](https://support.apple.com/guide/voiceover/)
- [JAWS Information](https://www.freedomscientific.com/products/software/jaws/)

## Support et Contribution

Pour signaler des problèmes d'accessibilité ou contribuer aux améliorations :

1. **Issues GitHub** - Signalez les problèmes
2. **Pull Requests** - Proposez des améliorations
3. **Tests utilisateurs** - Partagez vos retours
4. **Documentation** - Aidez à améliorer ce guide

---

*Ce thème s'engage à maintenir les plus hauts standards d'accessibilité web pour garantir une expérience inclusive à tous les utilisateurs.*
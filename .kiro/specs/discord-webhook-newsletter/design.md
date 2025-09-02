# Design Document - Discord Webhook Newsletter Integration

## Overview

Ce système intègre deux fonctionnalités principales dans l'écosystème Hexo :
1. **Newsletter Discord Webhook** : Collecte des emails via formulaire web et envoi vers Discord
2. **Build Optimization** : Vérification temporelle des fichiers source pour éviter les mises à jour inutiles

L'architecture est conçue pour s'intégrer parfaitement avec Hexo, utilisant sa structure de thèmes, ses hooks de génération et sa gestion des assets. Le système respecte les conventions Hexo et s'appuie sur son écosystème de plugins.

## Architecture

### Hexo Frontend Architecture (Newsletter)
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Hexo Theme     │───▶│  NewsletterJS    │───▶│  Discord API    │
│  (EJS Template) │    │   Manager        │    │   (Webhook)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│  Hexo Config    │    │  Theme Config    │
│  (_config.yml)  │    │  (_config.yml)   │
└─────────────────┘    └──────────────────┘
```

### Hexo Backend Architecture (Build System)
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Hexo Generate  │───▶│  File Timestamp  │───▶│  Markdown       │
│   (prebuild)    │    │    Checker       │    │   Posts         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│  Hexo Hooks     │    │   Source Data    │
│  (before_post)  │    │   (twt.json)     │
└─────────────────┘    └──────────────────┘
```

## Hexo Integration

### Theme Structure
```
themes/hexo-theme/
├── layout/
│   ├── sidebar.ejs              # Formulaire newsletter
│   └── _head.ejs               # Inclusion des scripts
├── source/
│   ├── js/
│   │   ├── newsletter.js       # Logique principale
│   │   └── newsletter-config.js # Configuration
│   └── css/
│       └── newsletter.css      # Styles du formulaire
└── _config.yml                 # Configuration du thème
```

### Hexo Configuration Integration
```yaml
# _config.yml (site)
newsletter:
  enabled: true
  discord_webhook: ${DISCORD_WEBHOOK_URL}
  
# themes/hexo-theme/_config.yml (theme)
newsletter:
  form_id: 'newsletter-form'
  success_message: 'Merci pour votre inscription !'
  error_message: 'Erreur lors de l\'inscription'
```

### Hexo Hooks Integration
```javascript
// scripts/prebuild.js (dans le site Hexo)
hexo.extend.filter.register('before_generate', function() {
    const timestampChecker = new TimestampChecker();
    return timestampChecker.checkAndUpdate();
});
```

## Components and Interfaces

### 1. NewsletterManager Class

**Responsabilités :**
- Gestion du formulaire d'inscription
- Validation des emails
- Communication avec Discord webhook
- Gestion des états UI (loading, success, error)

**Interface publique :**
```javascript
class NewsletterManager {
    constructor(config)
    init()
    handleSubmit(event)
    sendToDiscord(email)
    validateEmail(email)
    setLoading(boolean)
    showMessage(message, type)
}
```

### 2. Configuration Manager

**Responsabilités :**
- Gestion des URLs de webhook
- Validation de la configuration
- Gestion des environnements (dev/prod)

**Interface :**
```javascript
const ConfigManager = {
    getWebhookUrl()
    validateWebhookUrl(url)
    isConfigured()
    getEnvironment()
}
```

### 3. File Timestamp Checker (Build System)

**Responsabilités :**
- Vérification des dates de modification
- Comparaison avec seuil de 24h
- Décision de mise à jour

**Interface :**
```javascript
class TimestampChecker {
    checkFileAge(filePath)
    isFileStale(filePath, thresholdHours)
    shouldUpdate(sourceFile, targetFile)
}
```

## Data Models

### Newsletter Subscription Data
```javascript
{
    email: string,           // Email de l'utilisateur
    timestamp: Date,         // Date d'inscription
    source: string,          // URL de la page source
    userAgent: string,       // Navigateur utilisateur (optionnel)
    ipAddress: string        // IP (si disponible, pour anti-spam)
}
```

### Discord Webhook Payload
```javascript
{
    embeds: [{
        title: string,       // "📧 Nouvelle inscription newsletter"
        description: string, // Description de l'événement
        color: number,       // Couleur Discord (0x5865F2)
        fields: [{
            name: string,    // "Email", "Date", "Source"
            value: string,   // Valeur correspondante
            inline: boolean  // Affichage en ligne
        }],
        timestamp: string,   // ISO timestamp
        footer: {
            text: string     // "Newsletter Subscription"
        }
    }]
}
```

### File Metadata
```javascript
{
    filePath: string,        // Chemin du fichier
    lastModified: Date,      // Date de dernière modification
    size: number,            // Taille du fichier
    isStale: boolean         // Fichier périmé (>24h)
}
```

## Error Handling

### Frontend Error Handling

1. **Validation Errors**
   - Email invalide : Message utilisateur immédiat
   - Champs manquants : Highlight des champs requis

2. **Network Errors**
   - Timeout : Retry automatique (1 fois)
   - 4xx/5xx : Message d'erreur générique
   - Pas de connexion : Message spécifique

3. **Configuration Errors**
   - Webhook manquant : Désactivation du formulaire
   - URL invalide : Message d'avertissement admin

### Backend Error Handling

1. **File System Errors**
   - Fichier inexistant : Log warning, skip update
   - Permissions : Log error, fail gracefully
   - Corruption : Log error, backup et retry

2. **Build Errors**
   - Timestamp invalide : Utiliser fallback (force update)
   - Parsing errors : Log détaillé, continue build

## Testing Strategy

### Unit Tests

1. **NewsletterManager**
   ```javascript
   describe('NewsletterManager', () => {
       test('validates email correctly')
       test('handles successful submission')
       test('handles network errors')
       test('manages loading states')
   })
   ```

2. **TimestampChecker**
   ```javascript
   describe('TimestampChecker', () => {
       test('detects stale files correctly')
       test('handles missing files')
       test('calculates time differences')
   })
   ```

### Integration Tests

1. **End-to-End Newsletter Flow**
   - Soumission formulaire → Discord webhook
   - Gestion des erreurs réseau
   - États UI complets

2. **Build System Integration**
   - prebuild.mjs avec vérification temporelle
   - Génération conditionnelle de markdown
   - Logging et traçabilité

### Performance Tests

1. **Frontend Performance**
   - Temps de réponse formulaire < 100ms
   - Validation email < 10ms
   - Gestion mémoire (pas de fuites)

2. **Build Performance**
   - Vérification timestamp < 5ms
   - Impact sur temps de build total < 1%

## Security Considerations

### Frontend Security

1. **Input Validation**
   - Sanitisation des emails
   - Protection XSS
   - Rate limiting côté client

2. **Configuration Security**
   - Webhook URL jamais exposée côté client
   - Variables d'environnement sécurisées
   - Validation des URLs webhook

### Backend Security

1. **File System Security**
   - Validation des chemins de fichiers
   - Protection contre path traversal
   - Permissions appropriées

2. **Build Security**
   - Validation des sources de données
   - Sanitisation des contenus générés
   - Logging sécurisé (pas de données sensibles)

## Configuration Management

### Environment Variables
```bash
# Production
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx/yyy
NODE_ENV=production
BUILD_TIMESTAMP_THRESHOLD=24

# Development
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/dev/zzz
NODE_ENV=development
BUILD_TIMESTAMP_THRESHOLD=1
```

### Hexo Configuration Files
```yaml
# _config.yml (Hexo site configuration)
newsletter:
  enabled: true
  discord_webhook: ${DISCORD_WEBHOOK_URL}
  retry_attempts: 3
  timeout_ms: 5000
  rate_limit_ms: 1000

build_optimization:
  timestamp_threshold: 24
  source_files:
    - 'data/twt.json'
  output_files:
    - 'source/_posts/twitter.md'
```

```javascript
// themes/hexo-theme/source/js/newsletter-config.js
const newsletterConfig = {
    webhookUrl: hexo.config.newsletter?.discord_webhook || process.env.DISCORD_WEBHOOK_URL,
    retryAttempts: hexo.config.newsletter?.retry_attempts || 3,
    timeoutMs: hexo.config.newsletter?.timeout_ms || 5000,
    rateLimitMs: hexo.config.newsletter?.rate_limit_ms || 1000
}

// scripts/build-config.js (dans le site Hexo)
const buildConfig = {
    timestampThreshold: hexo.config.build_optimization?.timestamp_threshold || 24,
    sourceFiles: hexo.config.build_optimization?.source_files || ['data/twt.json'],
    outputFiles: hexo.config.build_optimization?.output_files || ['source/_posts/twitter.md']
}
```

## Deployment Considerations

### Frontend Deployment
- Minification et bundling des JS
- Cache busting pour les assets
- CDN pour les performances globales

### Backend Deployment
- Variables d'environnement sécurisées
- Logging centralisé
- Monitoring des webhooks Discord

### Monitoring
- Taux de succès des inscriptions newsletter
- Temps de réponse Discord webhook
- Fréquence des mises à jour de build
- Erreurs et exceptions
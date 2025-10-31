# Encryption Setup Guide

Ce guide explique comment configurer le système de chiffrement pour les données des abonnés en utilisant uniquement des variables d'environnement.

## Vue d'ensemble

Le système de chiffrement utilise AES-256-CBC pour protéger les adresses email des abonnés. La clé de chiffrement est stockée exclusivement dans les variables d'environnement, jamais dans des fichiers.

## Configuration initiale

### 1. Générer une clé de chiffrement

Utilisez le script fourni pour générer une clé sécurisée :

```bash
node .github/scripts/generate-encryption-key.js generate
```

Cette commande génère :
- Une clé AES-256 (32 bytes) sécurisée
- Format Base64 pour les variables d'environnement
- Instructions de configuration

### 2. Configuration GitHub Secrets

1. Allez dans votre repository GitHub
2. Settings > Secrets and variables > Actions
3. Cliquez "New repository secret"
4. Nom : `NEWSLETTER_ENCRYPTION_KEY`
5. Valeur : Collez la clé Base64 générée
6. Cliquez "Add secret"

### 3. Configuration développement local

Créez un fichier `.env` dans le répertoire `newsletter-program/` :

```env
ENCRYPTION_KEY=votre-clé-base64-ici
```

**⚠️ Important :** Ajoutez `.env` à votre `.gitignore` pour éviter de committer la clé.

## Validation de la configuration

### Valider une clé existante

```bash
node .github/scripts/generate-encryption-key.js validate "votre-clé-base64"
```

### Tester le chiffrement/déchiffrement

```bash
node .github/scripts/generate-encryption-key.js test "votre-clé-base64"
```

## Utilisation dans le code

Le système de chiffrement charge automatiquement la clé depuis la variable d'environnement :

```javascript
import { EncryptionManager } from './src/core/encryption.js';

// Initialisation automatique avec ENCRYPTION_KEY
const encryption = new EncryptionManager();

// Chiffrement d'un email
const encrypted = encryption.encryptEmail('user@example.com');

// Déchiffrement
const decrypted = encryption.decryptEmail(encrypted);
```

## Variables d'environnement requises

### GitHub Actions
- `NEWSLETTER_ENCRYPTION_KEY` - Clé de chiffrement principale

### Développement local
- `ENCRYPTION_KEY` - Clé de chiffrement (même valeur que GitHub Secret)

## Sécurité

### Bonnes pratiques
- ✅ Stockage uniquement dans les variables d'environnement
- ✅ Clés générées avec crypto.randomBytes() sécurisé
- ✅ AES-256-CBC avec IV aléatoire pour chaque chiffrement
- ✅ Validation de la longueur et du format des clés
- ✅ Tests automatiques de chiffrement/déchiffrement

### À éviter
- ❌ Ne jamais stocker la clé dans des fichiers
- ❌ Ne jamais committer la clé dans le repository
- ❌ Ne jamais partager la clé en plain text
- ❌ Ne jamais utiliser la même clé pour différents environnements

## Rotation des clés

⚠️ **Attention :** Changer la clé de chiffrement rendra toutes les données existantes illisibles.

Pour effectuer une rotation de clé :

1. Générez une nouvelle clé
2. Exportez les données existantes (déchiffrées)
3. Mettez à jour la variable d'environnement
4. Réimportez les données (qui seront chiffrées avec la nouvelle clé)

## Dépannage

### Erreur "ENCRYPTION_KEY environment variable is required"
- Vérifiez que la variable d'environnement est définie
- Pour GitHub Actions : vérifiez le secret `NEWSLETTER_ENCRYPTION_KEY`
- Pour le développement local : vérifiez le fichier `.env`

### Erreur "Invalid encryption key length"
- La clé doit faire exactement 32 bytes (256 bits)
- Utilisez le générateur fourni pour créer une clé valide
- Vérifiez que la clé n'est pas tronquée lors de la copie

### Erreur "Key must be in base64 format"
- Utilisez uniquement le format Base64 pour les variables d'environnement
- Évitez les espaces ou caractères supplémentaires

### Erreur de déchiffrement
- Vérifiez que la clé utilisée est la même que celle utilisée pour le chiffrement
- Les données chiffrées avec une clé ne peuvent pas être déchiffrées avec une autre

## Migration depuis le système de fichiers

Si vous migrez depuis un système utilisant des fichiers de clés :

1. Exportez toutes les données déchiffrées
2. Configurez la nouvelle clé d'environnement
3. Réimportez les données (elles seront automatiquement chiffrées avec la nouvelle clé)
4. Supprimez les anciens fichiers de clés
5. Testez que tout fonctionne correctement

## Support

Pour des questions sur la configuration du chiffrement :
1. Vérifiez les logs GitHub Actions pour les erreurs détaillées
2. Utilisez les outils de validation fournis
3. Consultez la documentation du code dans `src/core/encryption.js`
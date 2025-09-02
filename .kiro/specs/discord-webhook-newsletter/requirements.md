# Requirements Document - Discord Webhook Newsletter Integration

## Introduction

Cette fonctionnalité permet de collecter les inscriptions à la newsletter via un formulaire web et de les transférer automatiquement vers un canal Discord via webhook. Le système doit être sécurisé, fiable et offrir une expérience utilisateur fluide avec des retours visuels appropriés.

## Requirements

### Requirement 1

**User Story:** En tant que visiteur du site, je veux pouvoir m'inscrire à la newsletter facilement, afin de recevoir les dernières actualités et articles.

#### Acceptance Criteria

1. WHEN un utilisateur saisit son email dans le formulaire newsletter THEN le système SHALL valider le format de l'email côté client
2. WHEN un utilisateur soumet un email valide THEN le système SHALL afficher un indicateur de chargement pendant l'envoi
3. WHEN l'inscription est réussie THEN le système SHALL afficher un message de confirmation et vider le champ email
4. WHEN une erreur survient THEN le système SHALL afficher un message d'erreur approprié
5. WHEN l'utilisateur commence à taper un nouvel email THEN le système SHALL effacer les messages d'erreur précédents

### Requirement 2

**User Story:** En tant qu'administrateur du site, je veux recevoir les inscriptions newsletter dans mon serveur Discord, afin de pouvoir gérer facilement les nouveaux abonnés.

#### Acceptance Criteria

1. WHEN une inscription newsletter est soumise THEN le système SHALL envoyer les données vers le webhook Discord configuré
2. WHEN l'envoi vers Discord est effectué THEN le message SHALL contenir l'email, la date d'inscription et l'URL source
3. WHEN le webhook Discord est configuré THEN le système SHALL utiliser un embed formaté avec couleurs et icônes
4. IF le webhook Discord n'est pas configuré THEN le système SHALL afficher un message d'erreur de configuration
5. WHEN l'envoi vers Discord échoue THEN le système SHALL logger l'erreur et afficher un message d'erreur utilisateur

### Requirement 3

**User Story:** En tant que développeur, je veux pouvoir configurer facilement le webhook Discord, afin de déployer le système sur différents environnements.

#### Acceptance Criteria

1. WHEN le système démarre THEN il SHALL vérifier la présence d'une URL de webhook valide
2. WHEN l'URL de webhook est manquante ou invalide THEN le système SHALL désactiver le formulaire et afficher un avertissement
3. WHEN la configuration est mise à jour THEN le système SHALL pouvoir utiliser la nouvelle configuration sans redémarrage
4. IF plusieurs méthodes de configuration sont disponibles THEN le système SHALL prioriser les variables d'environnement
5. WHEN l'URL de webhook est configurée THEN elle SHALL être validée selon le format Discord standard

### Requirement 4

**User Story:** En tant qu'utilisateur, je veux que le formulaire soit accessible et responsive, afin de pouvoir m'inscrire depuis n'importe quel appareil.

#### Acceptance Criteria

1. WHEN le formulaire est affiché THEN il SHALL être accessible via navigation clavier
2. WHEN le formulaire est affiché sur mobile THEN il SHALL s'adapter à la taille d'écran
3. WHEN un utilisateur utilise un lecteur d'écran THEN tous les éléments SHALL avoir des labels appropriés
4. WHEN le formulaire est en cours de soumission THEN les champs SHALL être désactivés pour éviter les doubles soumissions
5. WHEN le focus est sur le champ email THEN il SHALL avoir un indicateur visuel clair

### Requirement 5

**User Story:** En tant qu'administrateur, je veux que le système soit sécurisé, afin de protéger les données des utilisateurs et éviter les abus.

#### Acceptance Criteria

1. WHEN une inscription est soumise THEN le système SHALL valider l'email côté client ET serveur
2. WHEN des données sont envoyées vers Discord THEN elles SHALL être transmises via HTTPS uniquement
3. WHEN l'URL de webhook est stockée THEN elle SHALL être protégée contre l'exposition publique
4. IF des tentatives d'abus sont détectées THEN le système SHALL implémenter une limitation de taux
5. WHEN des erreurs surviennent THEN les détails sensibles SHALL être loggés côté serveur uniquement

### Requirement 6

**User Story:** En tant que développeur, je veux que le système de build vérifie la fraîcheur des fichiers source, afin d'éviter les mises à jour inutiles et optimiser les performances.

#### Acceptance Criteria

1. WHEN prebuild.mjs s'exécute THEN il SHALL vérifier la date de dernière modification du fichier txt source
2. IF le fichier txt n'a pas été modifié depuis 24 heures THEN le système SHALL ignorer la mise à jour du fichier markdown
3. WHEN la vérification temporelle est effectuée THEN elle SHALL comparer l'horodatage du fichier avec l'heure actuelle
4. IF le fichier txt est plus récent que 24 heures THEN le système SHALL procéder à la mise à jour du markdown
5. WHEN la décision de mise à jour est prise THEN elle SHALL être loggée pour traçabilité
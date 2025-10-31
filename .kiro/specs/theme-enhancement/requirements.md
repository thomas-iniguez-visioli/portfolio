# Requirements Document

## Introduction

Cette spécification définit les améliorations à apporter au thème matrix-flow existant pour créer une expérience utilisateur moderne avec une mise en page plein écran, des scripts de build optimisés et une fonctionnalité newsletter intégrée. L'objectif est d'améliorer les performances, l'expérience utilisateur et d'ajouter des fonctionnalités d'engagement.

## Glossary

- **Theme_System**: Le système de thème Hexo matrix-flow qui gère l'apparence et la mise en page du site
- **Build_System**: L'ensemble des scripts et outils de construction (Rollup, Vite, npm scripts) qui compilent et optimisent le code
- **Newsletter_Service**: Le service qui gère l'inscription, l'envoi et la gestion des newsletters
- **Newsletter_Program**: Programme portable et réutilisable pour gérer les newsletters indépendamment du site
- **Fullscreen_Layout**: Une mise en page qui utilise toute la surface d'affichage disponible de l'écran
- **Resend_API**: Service d'envoi d'emails utilisé pour distribuer les newsletters
- **Discord_Webhook**: L'API Discord utilisée pour envoyer des notifications de newsletter
- **User**: Visiteur du site portfolio qui peut s'inscrire à la newsletter
- **Admin**: Propriétaire du site qui gère le contenu et les newsletters
- **Encryption_System**: Système de chiffrement pour protéger les données sensibles des abonnés
- **GitHub_Issue**: Issue GitHub utilisée pour l'inscription qui doit être supprimée après traitement

## Requirements

### Requirement 1

**User Story:** En tant qu'utilisateur, je veux que le site utilise tout l'écran disponible, afin d'avoir une expérience immersive et moderne.

#### Acceptance Criteria

1. THE Theme_System SHALL render content using 100% of the viewport width and height
2. WHEN a User accesses any page, THE Theme_System SHALL display navigation and content without horizontal scrollbars
3. THE Theme_System SHALL maintain responsive design across desktop, tablet and mobile devices
4. WHILE displaying content, THE Theme_System SHALL ensure text remains readable with appropriate margins and padding
5. THE Theme_System SHALL implement smooth transitions between different screen sizes

### Requirement 2

**User Story:** En tant qu'administrateur, je veux des scripts de build optimisés, afin de réduire les temps de compilation et améliorer les performances.

#### Acceptance Criteria

1. THE Build_System SHALL complete full builds in less than 30 seconds for projects under 100 files
2. WHEN source files are modified, THE Build_System SHALL rebuild only affected components
3. THE Build_System SHALL generate minified CSS and JavaScript files for production
4. THE Build_System SHALL implement automatic cache invalidation for updated assets
5. WHEN building for production, THE Build_System SHALL optimize images and compress static assets

### Requirement 3

**User Story:** En tant qu'utilisateur, je veux pouvoir m'inscrire à une newsletter, afin de recevoir des mises à jour sur le portfolio.

#### Acceptance Criteria

1. THE Newsletter_Service SHALL display a subscription form on the homepage
2. WHEN a User submits valid email, THE Newsletter_Service SHALL store the subscription securely
3. THE Newsletter_Service SHALL validate email format before accepting subscriptions
4. WHEN a subscription is successful, THE Newsletter_Service SHALL send confirmation via Discord_Webhook
5. THE Newsletter_Service SHALL prevent duplicate subscriptions for the same email address

### Requirement 4

**User Story:** En tant qu'administrateur, je veux un programme de newsletter portable, afin de pouvoir le réutiliser sur d'autres projets et gérer les envois facilement.

#### Acceptance Criteria

1. THE Newsletter_Program SHALL be a standalone executable program independent of the website
2. THE Newsletter_Program SHALL export subscriber data in standard formats (JSON, CSV)
3. THE Newsletter_Program SHALL import subscriber lists from external sources
4. THE Newsletter_Program SHALL integrate with Resend_API for email delivery
5. THE Newsletter_Program SHALL provide command-line interface for automation

### Requirement 5

**User Story:** En tant qu'administrateur, je veux envoyer des newsletters via Resend, afin d'avoir un service d'email fiable et professionnel.

#### Acceptance Criteria

1. THE Newsletter_Program SHALL authenticate with Resend_API using API keys
2. WHEN Admin sends a newsletter, THE Newsletter_Program SHALL use Resend_API for delivery
3. THE Newsletter_Program SHALL handle Resend_API rate limits and retry failed sends
4. THE Newsletter_Program SHALL track delivery status through Resend_API webhooks
5. THE Newsletter_Program SHALL format emails with HTML templates compatible with Resend

### Requirement 6

**User Story:** En tant qu'administrateur, je veux que les emails des inscrits soient chiffrés, afin de protéger leur vie privée et respecter les réglementations de protection des données.

#### Acceptance Criteria

1. THE Newsletter_Program SHALL encrypt all subscriber email addresses before storing them in the database
2. THE Encryption_System SHALL use AES-256 encryption with secure key management
3. WHEN accessing subscriber data, THE Newsletter_Program SHALL decrypt emails only when needed for sending
4. THE Newsletter_Program SHALL never store encryption keys in the same location as encrypted data
5. THE Newsletter_Program SHALL implement secure key rotation mechanisms

### Requirement 7

**User Story:** En tant qu'administrateur, je veux que les issues GitHub soient automatiquement supprimées après traitement, afin de maintenir un repository propre et protéger la confidentialité.

#### Acceptance Criteria

1. WHEN a subscription issue is successfully processed, THE Newsletter_Program SHALL delete the GitHub_Issue automatically
2. IF processing fails, THE Newsletter_Program SHALL label the GitHub_Issue with error status before deletion
3. THE Newsletter_Program SHALL log all issue processing activities before deletion
4. THE Newsletter_Program SHALL implement a configurable delay before issue deletion for audit purposes
5. THE Newsletter_Program SHALL handle GitHub API rate limits when deleting issues

### Requirement 8

**User Story:** En tant qu'utilisateur, je veux que le site se charge rapidement, afin d'avoir une expérience fluide.

#### Acceptance Criteria

1. THE Theme_System SHALL achieve Lighthouse performance scores above 90
2. WHEN a User loads the homepage, THE Theme_System SHALL display content within 2 seconds
3. THE Build_System SHALL implement code splitting for JavaScript bundles
4. THE Theme_System SHALL lazy load images and non-critical resources
5. THE Build_System SHALL generate service worker for offline caching
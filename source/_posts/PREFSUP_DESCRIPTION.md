---
title: système de support prefecture 
layout: journal
lang: fr
categories:
  - journal
authors:
  - thomas iniguez visioli
date: 2026-01-026 11:33:11
tags:
---

# Description du Projet : Prefsup

## 1. Objectif Général

**Prefsup** est un système de gestion de fichiers et de documentation interne, conçu pour être rapide et efficace. Son rôle principal est de scanner un répertoire contenant des fiches de documentation au format Markdown, d'en suivre les métadonnées, et de les exposer via une API REST.

Il est pensé pour servir de base de connaissances interne, de système de gestion de documentation ou de simple serveur de fichiers avec des capacités de suivi avancées.

## 2. Architecture Technique

Le projet est conteneurisé avec **Docker** et s'articule autour d'un service unique qui exécute deux serveurs web Node.js simultanément :

1.  **Serveur API (Elysia.js)** :
    *   Fonctionne sur le port **3000**.
    *   Constitue le cœur de l'application.
    *   Fournit une API REST pour accéder aux fiches de documentation et à leurs métadonnées.
    *   Intègre une documentation d'API automatique avec **OpenAPI (Swagger)**.
    *   Utilise un système de cron pour surveiller en temps réel les modifications du système de fichiers.

2.  **Serveur Web (Express.js)** :
    *   Fonctionne sur le port **80**.
    *   Sert probablement l'application front-end ou agit comme un proxy.

Le front-end semble être une application distincte (dans le dossier `/app`) qui utilise **EJS (Embedded JavaScript templates)** pour le rendu côté serveur et `axios` pour communiquer avec l'API back-end.

## 3. Technologies Utilisées

*   **Runtime Back-end** : Bun
*   **Frameworks Back-end** :
    *   **Elysia.js** (principal, pour l'API)
    *   **Express.js** (secondaire)
*   **Base de Données** : SQLite
*   **ORMs** : Le projet inclut à la fois **Prisma** et **Drizzle ORM**. `product.md` confirme que Prisma est utilisé pour suivre les métadonnées des fichiers.
*   **Framework Front-end** : EJS pour le templating.
*   **Conteneurisation** : Docker et Docker Compose.
*   **Documentation API** : OpenAPI (via `@elysiajs/openapi`).

## 4. Fonctionnement

1.  L'application, lancée via `docker-compose`, démarre un conteneur unique.
2.  À l'intérieur du conteneur, le script principal lance les serveurs Elysia et Express.
3.  Un processus cron (`@elysiajs/cron`) s'exécute périodiquement (toutes les 10 secondes selon `product.md`) pour scanner le répertoire `/fiche`.
4.  Pour chaque fichier Markdown trouvé, l'application enregistre ou met à jour ses métadonnées (taille, chemin, date de modification) dans la base de données SQLite via Prisma.
5.  L'API Elysia expose des points de terminaison (endpoints) pour lister et consulter le contenu de ces fiches.
6.  Les utilisateurs interagissent avec le système via l'application front-end servie par Express, qui récupère les données de l'API.

## 5. Structure des Dossiers Clés

*   `./api/` : Contient le code source du back-end (bien que le `package.json` principal y réside).
*   `./app/` : Contient les sources de l'application front-end (vues EJS, etc.).
*   `./fiche/` : Contient les fichiers de documentation Markdown qui sont servis par l'application.
*   `./public/` & `./static/` : Contiennent des fichiers statiques (images, CSS, etc.) servis directement.
*   `./docker-compose.yml` : Définit le service `prefsup`, son environnement et les volumes montés.
*   `./Dockerfile` : Contient les instructions pour construire l'image Docker de l'application.
*   `./api/prisma/schema.prisma` (présumé) : Définit le schéma de la base de données pour Prisma.
*   `./.kiro/steering/product.md` : Fichier de documentation interne décrivant la vision du produit.

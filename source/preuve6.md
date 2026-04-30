---
title: preuve 6
layout: reading-note
lang: fr
categories:
  - reading-note
authors:
  - thomas iniguez visioli
  - luc gardère
date: 2025-03-06 15:13:15
tags:
  - newsletter
  - rss
  - automatisation
---

Le portfolio dispose d'un **système de newsletter et de veille RSS entièrement automatisé** via GitHub Actions, sans infrastructure serveur externe.

## Newsletter automatisée

### Abonnement (`newsletter-subscription.yml`)
- Les utilisateurs s'abonnent via une **issue GitHub** avec un template dédié
- Le workflow traite automatiquement la demande et enregistre l'email
- Confirmation envoyée via webhook Discord

### Distribution (`newsletter-distribution.yml`)
- Envoi automatique des newsletters aux abonnés
- Planification via cron GitHub Actions
- Contenu généré depuis les nouveaux articles du site

### Planification (`newsletter-scheduler.yml`)
- Orchestration des envois selon un calendrier défini
- Gestion des files d'attente et des reprises en cas d'échec

## Veille RSS (`rss-feed-management.yml` + `rss-monitoring.yml`)

Un système de **veille technologique automatique** agrège des flux RSS :

| Workflow | Rôle |
|---|---|
| `rss-feed-management.yml` | Collecte et mise à jour des flux RSS |
| `rss-monitoring.yml` | Surveillance des nouvelles entrées |

- Nouvelles entrées → intégrées dans le site automatiquement
- Feed disponible sur [feed-blush.vercel.app](https://feed-blush.vercel.app/)
- Aucune intervention manuelle requise

## Architecture globale

```
Issue GitHub (abonnement)
    → newsletter-subscription.yml
    → Stockage dans repository
    → newsletter-scheduler.yml (cron)
    → newsletter-distribution.yml
    → Envoi aux abonnés
```

Ce système prouve la conception d'une **architecture événementielle complète** sans backend traditionnel.
---
title: preuve 2
layout: reading-note
lang: fr
categories:
  - reading-note
authors:
  - thomas iniguez visioli
  - luc gardère
date: 2025-03-06 15:13:15
tags:
  - github
  - ci-cd
  - devops
---

Les incidents et anomalies du projet VBCQ sont gérés directement via le **système d'issues GitHub**, assurant traçabilité et suivi structuré.

## Workflow de gestion des issues (`issue-cleanup.yml`)

Un workflow GitHub Actions dédié automatise le cycle de vie des issues :

- **Déclencheur** : fermeture d'une issue, ou planification automatique
- **Actions** : archivage, labelling automatique, notification aux auteurs
- **Intégration** : liés au workflow principal `main.yml` — chaque issue fermée déclenche un rebuild du site

```yaml
on:
  issues:
    types: [closed]
```

## Processus en pratique

1. Un membre signale un bug ou une anomalie → **ouverture d'une issue**
2. Discussion et résolution dans les commentaires de l'issue
3. **Fermeture de l'issue** → déclenchement automatique du pipeline CI/CD
4. Rebuild et redéploiement du site en production

## Bénéfices

- Traçabilité complète de chaque correction
- Pas d'intervention manuelle pour déclencher un déploiement
- Historique des incidents consultable par toute l'équipe

[→ Voir les issues GitHub](https://github.com/thomas-iniguez-visioli/portfolio/issues)

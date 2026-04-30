---
title: preuve 3
layout: reading-note
lang: fr
categories:
  - reading-note
authors:
  - thomas iniguez visioli
  - luc gardère
date: 2025-03-06 15:13:15
tags:
  - ci-cd
  - déploiement
  - automatisation
---

Le portfolio et le site VBCQ sont **construits et déployés automatiquement** à chaque push sur la branche `main`, via un pipeline GitHub Actions complet.

## Workflow principal (`main.yml`)

| Propriété | Valeur |
|---|---|
| Runner | `windows-latest` |
| Déclencheurs | Push `main`, cron toutes les 30 min, fermeture d'issue, manuel |
| Durée estimée | ~2–4 minutes |

### Étapes du pipeline

```
1. Checkout du dépôt
2. Suppression du lockfile pnpm pour forcer les mises à jour
3. Installation des dépendances (pnpm + npm newsletter)
4. Build : npm run build (Hexo generate)
5. Déploiement : npm run deploy (push vers GitHub Pages)
6. Création automatique d'une Pull Request (pixeebot)
```

## Workflow de déploiement GitHub Pages (`static.yml`)

Un second workflow gère le déploiement direct sur GitHub Pages :

- Génère les artefacts statiques
- Publie sur l'environnement `github-pages`
- Accessible sur [thomas-iniguez-visioli.github.io](https://thomas-iniguez-visioli.github.io)

## Résultat

Toute modification du code source est **automatiquement reflétée en production** sans intervention manuelle, garantissant que le site est toujours à jour.
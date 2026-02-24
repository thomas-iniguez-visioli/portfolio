---
title: preuve 5
layout: reading-note
lang: fr
categories:
  - reading-note
authors:
  - thomas iniguez visioli
  - luc gardère
date: 2025-03-06 15:13:15
tags:
  - sécurité
  - qualité
  - monitoring
---

Le projet intègre plusieurs outils automatisés pour surveiller la **qualité du code** et la **sécurité des dépendances**, tous pilotés via GitHub Actions.

## SonarCloud — Analyse de qualité (`sonarcloud.yml`)

**SonarCloud** analyse le code source à chaque push et pull request sur `main` :

| Indicateur | Rôle |
|---|---|
| Bugs | Détection d'erreurs de logique |
| Vulnerabilities | Failles de sécurité dans le code |
| Code Smells | Dette technique |
| Coverage | Taux de couverture des tests |

- Projet : `thomas-iniguez-visioli_portfolio`
- Organisation : `thomas-iniguez-visioli`
- Résultats visibles dans les PR GitHub directement

## Snyk — Sécurité des dépendances (`snyk-security.yml`)

**Snyk** scanne les dépendances npm à la recherche de vulnérabilités connues :

- Analyse automatique à chaque push
- Résultats remontés dans GitHub Security > Code Scanning
- Alertes en cas de vulnérabilité critique

## CodeQL — Analyse statique avancée (`codeql.yml`)

**CodeQL** (GitHub native) effectue une analyse statique poussée du JavaScript :

- Détection de patterns dangereux (injection, XSS, etc.)
- Rapport intégré dans l'onglet Security de GitHub

## Résultat

Ces trois outils forment une **chaîne de sécurité continue** : aucun code ne peut être fusionné sans passer ces vérifications automatiques.
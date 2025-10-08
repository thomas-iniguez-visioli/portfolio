# Developer Theme Style Guide

## Overview

This comprehensive style guide documents all components, utilities, and design patterns available in the Hexo Developer Theme. The theme is built with modern CSS techniques, cross-browser compatibility, and developer-focused aesthetics.

## Table of Contents

1. [Design System](#design-system)
2. [Components](#components)
3. [CSS Variables](#css-variables)
4. [Usage Examples](#usage-examples)
5. [Customization](#customization)
6. [Browser Support](#browser-support)

## Design System

### Color Palette

The theme uses a modern, developer-focused color system with comprehensive dark mode support.

#### Primary Colors
```css
--color-primary: #2563eb;        /* Main brand color */
--color-primary-50: #eff6ff;     /* Lightest tint */
--color-primary-100: #dbeafe;    /* Very light */
--color-primary-200: #bfdbfe;    /* Light */
--color-primary-300: #93c5fd;    /* Medium light */
--color-primary-400: #60a5fa;    /* Medium */
--color-primary-500: #3b82f6;    /* Base */
--color-primary-600: #2563eb;    /* Primary (same as main) */
--color-primary-700: #1d4ed8;    /* Dark */
--color-primary-800: #1e40af;    /* Darker */
--color-primary-900: #1e3a8a;    /* Darkest */
```

#### Neutral Colors
```css
--color-neutral-50: #f8fafc;     /* Almost white */
--color-neutral-100: #f1f5f9;    /* Very light gray */
--color-neutral-200: #e2e8f0;    /* Light gray */
--color-neutral-300: #cbd5e1;    /* Medium light gray */
--color-neutral-400: #94a3b8;    /* Medium gray */
--color-neutral-500: #64748b;    /* Base gray */
--color-neutral-600: #475569;    /* Dark gray */
--color-neutral-700: #334155;    /* Darker gray */
--color-neutral-800: #1e293b;    /* Very dark gray */
--color-neutral-900: #0f172a;    /* Almost black */
```

#### Semantic Colors
```css
--color-success: #10b981;        /* Green for success states */
--color-warning: #f59e0b;        /* Orange for warnings */
--color-error: #ef4444;          /* Red for errors */
--color-info: #06b6d4;           /* Cyan for information */

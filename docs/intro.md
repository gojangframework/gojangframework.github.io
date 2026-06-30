---
id: intro
title: "Gojang Framework"
sidebar_label: "Introduction"
description: "Gojang is an AI-native, batteries-included web framework for Go and HTMX."
---

# Gojang Framework

Gojang is a modern web framework for Go applications that want server-rendered HTML, HTMX interactions, type-safe data models, and production defaults without assembling every foundation by hand.

The current public release is `v0.3.2`. It includes the new `app/`-scoped project structure, an Airtable-style admin workspace, AI development skills, email verification and password reset flows, Amazon SES email support with SMTP fallback, Google Analytics integration, and reCAPTCHA v3 protection for sensitive auth forms.

## Why Gojang

- **AI-native workflow:** Gojang ships with agent-readable skills that guide common framework work.
- **Batteries included:** Authentication, sessions, CSRF, admin CRUD, Ent models, security headers, logging, and tests are part of the template.
- **HTMX first:** Build dynamic interfaces with Go templates and small server-rendered fragments.
- **Admin by default:** Generated Ent models are discovered by the admin registry without manual CRUD handlers.
- **Production minded:** Deployment, rate limiting, email, audit logging, and security docs are built into the project.

Start with the [Quick Start](./quick-start.md), then use [Creating Static Pages](./creating-static-pages.md) or [Quick Start: Adding a Data Model](./quick-start-data-model.md) depending on what you are building.

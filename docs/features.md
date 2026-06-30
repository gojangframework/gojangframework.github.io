---
id: features
title: "Features Overview"
sidebar_label: "Features"
description: "Current Gojang v0.3.2 feature overview."
---

# Features Overview

## Application Foundation

- Go 1.24 module with Chi routing, Ent ORM, Go templates, HTMX, SQLite, and PostgreSQL support.
- `app/` project structure that separates app-owned feature code from framework internals.
- Task-based development workflow for running, building, testing, seeding, migrations, and Ent generation.

## Authentication And Security

- Registration, login, logout, email verification, forgot password, and reset password flows.
- Session management, CSRF protection, security headers, HTTPS enforcement, validation, and audit logging.
- Per-IP authentication rate limiting with HTMX-aware responses.
- Google reCAPTCHA v3 support for registration and password reset forms.

## Admin Workspace

- Registry-driven admin panel for generated Ent models.
- Airtable-style workspace at `/admin/t/{resource}` with grid views, record drawers, pagination, sorting, and related-record handling.
- Admin overrides for field visibility, read-only fields, custom fields, hooks, and query modifiers.

## Rendering And HTMX

- Public and admin renderers are separated.
- Full-page templates, partial templates, reusable components, shared template functions, and direct partial rendering.
- HTMX patterns for modals, form validation, CRUD refreshes, response headers, and authenticated interactions.

## AI Skills

Gojang includes agent-readable skills for common framework work: adding data models, adding public pages, working in the admin workspace, auth/security changes, operations/testing, and HTMX UI rendering.

## Production Support

- Amazon SES email delivery with SMTP fallback and configurable email queue settings.
- Google Analytics integration for production pages.
- Deployment guides for Docker, VPS, cloud platforms, distributed deployments, monitoring, backups, and security hardening.

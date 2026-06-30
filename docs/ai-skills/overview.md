---
title: "Gojang AI Skills"
sidebar_label: "Overview"
description: "Use Gojang's AI development skills to guide common framework work."
---

# Gojang AI Skills

Gojang includes a set of AI skills under `.agents/skills/` in the app repository. They are written to help AI coding agents work inside Gojang projects with the same conventions a framework maintainer would use.

The skills are useful because Gojang has strong local patterns: Ent schemas live in `app/schema`, generated models live in `app/gojang/models`, public feature packages live under `app/<feature>/`, admin behavior is registry-driven, and HTMX fragments follow renderer conventions.

## Available Skills

- [Add Data Model](./add-data-model.md): create or modify database-backed resources.
- [Add Public Page](./add-public-page.md): add static or user-facing pages without a new model.
- [Admin Workspace](./admin-workspace.md): customize the registry-driven staff admin area.
- [Auth Security](./auth-security.md): work on authentication, authorization, sessions, email, reCAPTCHA, CSRF, and middleware.
- [Operate And Test](./operate-test.md): run, test, migrate, seed, build, and deploy.
- [Render HTMX UI](./render-htmx-ui.md): build server-rendered UI with Go templates and HTMX.

## Recommended Use

When asking an AI agent to work on a Gojang app, name the relevant skill and point it at the repository. For example: "Use the Gojang Add Data Model skill to add a Product resource."

The skills do not replace the docs. They point agents toward the right docs, files, commands, and verification steps.

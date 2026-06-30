---
title: "Add Public Page Skill"
sidebar_label: "Add Public Page"
description: "Guide AI agents through adding public Gojang pages without creating a new Ent model."
---

# Add Public Page Skill

Use this skill for public pages that do not need a new data model: content pages, dashboards, marketing pages, or route/template additions.

## Workflow

1. Read [Creating Static Pages](../creating-static-pages.md).
2. Inspect the existing page patterns in `app/pages/pages.handler.go`, `app/pages/pages.route.go`, and `app/views/templates/base.html`.
3. Create top-level public templates in `app/views/templates/` unless the page belongs to a feature package.
4. Add a `PageHandler` method that renders the template through the public renderer.
5. Register the route in `PageRoutes`.
6. Use `middleware.RequireAuth(sm, client)` for private pages.
7. Add navigation in `base.html` only when the page should be globally discoverable.
8. Run `go test ./...`.

## Template Conventions

- Full pages define both `title` and `content`.
- Pass dynamic values through `TemplateData.Data`.
- Use `.User` for renderer-injected current-user data when available.
- Keep public pages separate from admin templates and admin renderers.

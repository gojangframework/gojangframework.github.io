---
title: "Render HTMX UI Skill"
sidebar_label: "Render HTMX UI"
description: "Guide AI agents through Gojang server-rendered UI, templates, partials, reusable components, and HTMX interactions."
---

# Render HTMX UI Skill

Use this skill to build or modify server-rendered interfaces with Go templates and HTMX.

## Workflow

1. Read [HTMX Integration Patterns](../htmx-patterns.md) and [Rendering Primitives](../rendering-primitives-guide.md).
2. Inspect existing templates in `app/posts/templates/` and shared templates in `app/views/templates/`.
3. Use full page templates for normal navigation.
4. Use `.partial.html` templates for modal, list, card, and refresh fragments.
5. Render with `Renderer.Render`, `Renderer.RenderPartial`, or `Renderer.RenderComponent` as appropriate.
6. Include CSRF tokens in forms with `{{.CSRFToken}}`.
7. Run `go test ./...`; for renderer changes, include `go test ./app/gojang/views/renderers`.

## HTMX Patterns

- Open modals with `hx-get`.
- Submit creates with `hx-post`, edits with `hx-put`, and deletes with `hx-delete`.
- Use `HX-Trigger: closeModal` after successful modal actions.
- Use `HX-Retarget` and `HX-Reswap` when updating a different target.
- Return validation errors by re-rendering form partials with `TemplateData.Errors`.

## Template Conventions

Full pages define `title` and `content`. Partials use the `.partial.html` suffix and render without `base.html`. Shared components live in `app/views/templates/components/`. Keep business logic in handlers or view-model helpers, not templates.

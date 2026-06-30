---
title: "Add Data Model Skill"
sidebar_label: "Add Data Model"
description: "Guide AI agents through adding Ent schemas, generated models, CRUD handlers, templates, migrations, and admin behavior."
---

# Add Data Model Skill

Use this skill when creating or modifying database-backed resources.

## Workflow

1. Read [Quick Start: Adding a Data Model](../quick-start-data-model.md) for simple resources or [Creating Pages with Data Models](../creating-data-models.md) for relationships and production-ready flows.
2. Add or update the Ent schema in `app/schema/<resource>.go`.
3. Run `go generate ./app/gojang/models`.
4. Add form structs and validation tags in `app/views/forms/forms.go` when public UI accepts user input.
5. Create a feature package such as `app/products/` with handlers, routes, and templates.
6. Register the feature route in `app/cmd/web/main.go`.
7. Rely on admin auto-discovery for normal generated Ent models.
8. Add admin overrides in `app/gojang/admin/models.go` only when custom admin metadata or behavior is needed.
9. Run `go test ./...`.

## Key Patterns

- Follow `app/posts/` for public CRUD with HTMX modals and authorization checks.
- Use generated Ent predicate packages such as `post.IDEQ(id)`.
- Protect create, update, and delete routes with `middleware.RequireAuth(sm, client)`.
- Use `middleware.OwnsResource(r, ownerID)` for user-owned records.
- Keep model-specific public handlers outside the framework admin package.

## Admin Integration

Plain generated Ent models appear in the admin registry after generation. Use `RegisterModel` overrides only for custom list fields, hidden fields, read-only fields, hooks, virtual inputs, or eager loading.

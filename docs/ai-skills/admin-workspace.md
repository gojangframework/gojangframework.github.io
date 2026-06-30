---
title: "Admin Workspace Skill"
sidebar_label: "Admin Workspace"
description: "Guide AI agents through Gojang's registry-driven admin panel and workspace customization."
---

# Admin Workspace Skill

Use this skill when changing the staff-only admin workspace, model overrides, admin CRUD behavior, or generic admin templates.

## Workflow

1. Read [Admin and User Site Separation](../architecture-separation.md).
2. Inspect current registry overrides in `app/gojang/admin/models.go`.
3. Remember that generated Ent models are discovered from `*models.Client`.
4. Prefer registry configuration over model-specific admin handlers.
5. Change admin templates only for generic behavior shared by resources.
6. Run `go test ./app/gojang/admin`, then `go test ./...`.

## Registry Capabilities

Use model registrations for:

- `ListFields`
- `HiddenFields`
- `ReadonlyFields`
- `OptionalFields`
- `CustomFields`
- `BeforeSave`, `BeforeCreate`, and `BeforeUpdate`
- `QueryModifier`

## Architecture Rules

- Admin routes are mounted under `/admin`.
- Canonical resource workspaces use `/admin/t/{resource}`.
- Admin routes must stay authenticated, staff-only, and audited.
- Public handlers should not branch on admin paths or render admin templates.

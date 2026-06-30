---
id: project-structure
title: "Project Structure"
sidebar_label: "Project Structure"
description: "Understand the current Gojang app folder layout."
---

# Project Structure

Gojang `v0.3.2` uses an `app/` base folder to separate framework internals from app-owned feature code.

```text
app/
├── cmd/
│   ├── migrate/        # Migration command
│   ├── seed/           # Initial admin seed command
│   └── web/            # Web application entry point
├── gojang/             # Framework core: admin, config, auth, models, renderers
├── pages/              # App-owned page handlers, routes, and templates
├── posts/              # Example app-owned data feature
├── schema/             # Ent schema files edited by app developers
└── views/
    ├── i18n/           # Translation files
    ├── static/         # Public CSS and images
    └── templates/      # Shared public templates
```

## Important Boundaries

- Define data schemas in `app/schema`.
- Generate Ent code into `app/gojang/models` with `go generate ./app/gojang/models` or `task schema-gen`.
- Put public feature packages under `app/<feature>/`.
- Keep framework admin code under `app/gojang/admin`.
- Keep public templates separate from admin templates.

Read [Admin and User Site Separation](./architecture-separation.md) for the architecture rules behind this layout.

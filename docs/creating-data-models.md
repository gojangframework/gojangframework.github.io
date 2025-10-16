---
id: creating-data-models
title: Creating Data Models
sidebar_label: Creating Data Models
sidebar_position: 1
description: Complete guide to creating data models in Gojang using Ent schema. Includes automated generators and manual steps.
keywords: [gojang, data models, ent, schema, orm, crud, generator]
---

Gojang provides an automated generator (`task addmodel` / `go run ./gojang/cmd/addmodel`) that scaffolds Ent schema, handlers, routes, templates and admin registration. This guide summarizes the manual and automated approaches.

## Automated Model Generation

Interactive:

```bash
task addmodel
# or
go run ./gojang/cmd/addmodel
```

Non-interactive example:

```bash
go run ./gojang/cmd/addmodel \
  --model Product \
  --icon "📦" \
  --fields "name:string:required,description:text,price:float:required,stock:int"
```

The tool supports --dry-run, examples, and reserved-keyword validation.

## Manual Steps (overview)

1. Define the Ent schema in `gojang/models/schema/`
2. Generate Ent code:

```bash
cd gojang/models && go generate ./...
```

3. Create form structs in `gojang/views/forms/`
4. Create handlers in `gojang/http/handlers/`
5. Create routes in `gojang/http/routes/` and register them in `gojang/cmd/web/main.go`
6. Create templates in `gojang/views/templates/<model>/`
7. Register model with the admin panel in `gojang/admin/models.go`

## Notes

- The app auto-migrates on startup, but you can also create manual SQL migrations if desired.
- See the code samples in the repository for full handler, route, and template examples (the docs in the repo contain step-by-step code snippets).

## Checklist

- Define schema
- go generate
- Create form struct
- Create handler & routes
- Create templates
- Register with admin
- Test CRUD and admin pages

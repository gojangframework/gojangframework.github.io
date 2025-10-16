---
id: quick-start-data-model
title: Quick Start - Adding a Data Model
sidebar_label: Adding Data Models
sidebar_position: 3
description: Step-by-step guide to adding new data models to your Gojang application using generators or manual steps.
keywords: [gojang, data model, ent, schema, crud, generator]
---

# Quick Start: Adding a Data Model

## Automated Option

Use the generator to scaffold everything:

```bash
# Interactive
task addmodel

# Non-interactive
go run ./gojang/cmd/addmodel \
  --model SampleProduct \
  --icon "📦" \
  --fields "name:string:required,price:float:required,stock:int,description:text"
```

## Manual Steps (overview)

1. Create Ent schema in `gojang/models/schema/`
2. Run `cd gojang/models && go generate ./...`
3. Create form struct in `gojang/views/forms/`
4. Create handlers in `gojang/http/handlers/`
5. Create routes in `gojang/http/routes/` and register in `main.go`
6. Create templates in `gojang/views/templates/<model>/`
7. Register model in `gojang/admin/models.go`

## Quick Checklist

- Define schema
- Generate Ent code
- Create handler & routes
- Create templates
- Register in admin
- Test CRUD and admin pages

---

This quick start walks through adding a SampleProduct model and verifies basic CRUD and admin integration.
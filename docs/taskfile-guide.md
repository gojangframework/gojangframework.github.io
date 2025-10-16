---
id: taskfile-guide
title: Taskfile Commands Guide
sidebar_label: Taskfile Commands
sidebar_position: 2
description: Complete guide to using Task automation in Gojang. Available commands and usage examples.
keywords: [gojang, taskfile, task, automation, cli, commands]
---

# Taskfile Commands Guide

## Prerequisites

Install Task (taskfile.dev):

**macOS/Linux:**
```bash
go install github.com/go-task/task/v3/cmd/task@latest
```

**Windows:**
```powershell
go install github.com/go-task/task/v3/cmd/task@latest
```

## Available Commands

Run `task --list` to view tasks. Common tasks:
- `task dev` — run server with live reload (requires Air)
- `task build` — build the web binary
- `task test` — run tests
- `task migrate` — apply DB migrations
- `task migrate-create name=...` — create migration
- `task seed` — seed initial admin user
- `task schema-gen` — generate Ent code
- `task addpage` / `task addmodel` — interactive generators

## Examples

```bash
# Run server with live reload
task dev

# Create a migration
task migrate-create name=add_products_table

# Apply migrations
task migrate
```

## Tips

- Use `task migrate-create` to keep migrations sequential and idempotent
- Test migrations locally before applying in production

---

This guide documents the project's Taskfile commands and recommended usage.
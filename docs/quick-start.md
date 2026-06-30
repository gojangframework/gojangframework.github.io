---
id: quick-start
title: "Quick Start Guide"
sidebar_label: "Quick Start"
description: "Clone, configure, and run a Gojang v0.3.2 application."
---

# Quick Start Guide

## Prerequisites

- Go installed locally.
- Task installed for the recommended workflow.
- Air installed if you want live reload during development.

```bash
go install github.com/go-task/task/v3/cmd/task@latest
go install github.com/air-verse/air@latest
```

## Run Gojang

```bash
git clone https://github.com/gojangframework/gojang
cd gojang
cp .env.example .env
go mod download
task schema-gen
task dev
```

Visit `http://localhost:8080`.

The development database is created from `DATABASE_URL`, and Gojang runs auto-migrations on startup.

## Create The First Admin

Run the seed task to create the first admin account:

```bash
task seed
```

## Useful Commands

```bash
task dev          # Run server with live reload
task build        # Build the web binary
task test         # Generate models and run tests
task migrate      # Run SQL migrations up
task seed         # Seed the initial admin login
task schema-gen   # Generate Ent code from app/schema
```

Plain Go fallbacks are also available:

```bash
go run ./app/cmd/web
go run ./app/cmd/seed
go generate ./app/gojang/models
go test ./...
```

Next, add a page with [Creating Static Pages](./creating-static-pages.md) or add data with [Quick Start: Adding a Data Model](./quick-start-data-model.md).

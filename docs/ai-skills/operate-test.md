---
title: "Operate And Test Skill"
sidebar_label: "Operate And Test"
description: "Guide AI agents through running, testing, migrating, seeding, building, and preparing Gojang deployments."
---

# Operate And Test Skill

Use this skill for operational workflows: local runs, tests, migrations, seeds, builds, logging checks, deployment readiness, and test strategy.

## Core Commands

Prefer Task when it is available:

```bash
task dev
task build
task test
task schema-gen
task migrate
task migrate-down
task seed
```

Plain Go fallbacks:

```bash
go run ./app/cmd/web
go build -o bin/web ./app/cmd/web
go test ./...
go generate ./app/gojang/models
go run ./app/cmd/migrate/main.go up
go run ./app/cmd/seed
```

## Workflow

1. Read `Taskfile.yml` before assuming command names.
2. Use [Taskfile Commands](../taskfile-guide.md), [Testing Best Practices](../testing-best-practices.md), [Deployment Guide](../deployment-guide.md), and [Logging Guide](../logging-guide.md) as references.
3. Run the narrowest useful test first.
4. Run `go test ./...` before finishing code changes.

## Environment Notes

Local config comes from `.env`, with `.env.example` as the template. SQLite and PostgreSQL are supported through `DATABASE_URL`. Auth email links use `APP_BASE_URL`. Email delivery uses SES first when configured, SMTP as fallback, and no email service when neither provider is configured.

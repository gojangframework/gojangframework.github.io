---
id: installation
title: Installation Guide
sidebar_label: Installation
sidebar_position: 2
description: Complete installation guide for Gojang including prerequisites, Task setup, and development tools.
keywords: [gojang, installation, setup, prerequisites, task, go, air]
---

This project uses Task for task automation (cross-platform alternative to Make).

Install Task (macOS/Linux):

```bash
go install github.com/go-task/task/v3/cmd/task@latest
```

Windows:

```powershell
go install github.com/go-task/task/v3/cmd/task@latest
# or
choco install go-task
```

Install Air (optional - live reload):

```bash
go install github.com/air-verse/air@latest
```

Development commands:

```bash
task dev      # Run server with live reload
task build
task test
task migrate
task seed
task schema-gen
```

Or directly with Go:

```bash
go run ./gojang/cmd/web
go build -o app ./gojang/cmd/web
go test ./...
```
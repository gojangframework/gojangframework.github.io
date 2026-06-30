---
id: installation
title: "Installation Guide"
sidebar_label: "Installation"
description: "Install the tools used by Gojang development workflows."
---

# Installation Guide

## Go

Install Go before cloning the project. Gojang `v0.3.2` uses the Go toolchain declared in `go.mod`.

## Task

Gojang uses Task as the cross-platform command runner.

```bash
go install github.com/go-task/task/v3/cmd/task@latest
```

Windows users can also install Task with Chocolatey:

```powershell
choco install go-task
```

## Air

Air is optional, but recommended for live reload during local development.

```bash
go install github.com/air-verse/air@latest
```

## Project Setup

```bash
git clone https://github.com/gojangframework/gojang
cd gojang
cp .env.example .env
go mod download
task schema-gen
task dev
```

See the [Taskfile Commands Guide](./taskfile-guide.md) for the full command reference.

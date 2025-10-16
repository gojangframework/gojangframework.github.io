---
id: quick-start
title: Quick Start Guide
sidebar_label: Quick Start
sidebar_position: 1
description: Get started with Gojang in minutes. Clone, configure, and run your first application.
keywords: [gojang, quick start, getting started, installation, setup]
---

1. Clone the repository:

```bash
git clone https://github.com/gojangframework/gojang
cd gojang
```

2. Copy environment file:

```powershell
cp .env.example .env
```

3. Install dependencies:

```bash
go mod download
```

4. Run the application:

```bash
go run ./gojang/cmd/web
```

Visit: http://localhost:8080

The database is automatically created and migrated on first run.

First admin login (seed):

```bash
go run ./gojang/cmd/seed
```

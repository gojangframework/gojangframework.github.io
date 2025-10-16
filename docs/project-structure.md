---
id: project-structure
title: Project Structure
sidebar_label: Project Structure
sidebar_position: 4
description: Understanding Gojang's directory structure and file organization.
keywords: [gojang, project structure, directory layout, organization]
---

The repository has the following structure:

```
gojang/
├── admin/             # Auto-generated admin panel
├── cmd/web/           # Application entry point
├── config/            # Configuration management
├── http/
│   ├── handlers/      # Request handlers
│   ├── middleware/    # Auth, security, sessions
│   └── routes/        # Route definitions
├── models/
│   └── schema/        # Database models (define here)
├── views/
│   ├── forms/         # Form validation structs
│   ├── renderers/     # View renderer
│   ├── templates/     # HTML templates
└──     static/        # CSS, images
```

See the code under `gojang/` for implementation details and generator tools.

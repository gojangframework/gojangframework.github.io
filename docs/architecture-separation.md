---
id: architecture-separation
title: Admin and User Site Separation
sidebar_label: Architecture Separation
sidebar_position: 2
description: Understanding Gojang's architectural separation between admin panel and user-facing site.
keywords: [gojang, architecture, admin panel, separation, design patterns]
---

# Admin and User Site Separation

## Overview

Gojang follows a strict architectural separation between:
- **User Site**: Public-facing pages at `/` routes
- **Admin Panel**: Staff-only management interface at `/admin` routes

## Directory Structure

```
gojang/
├── admin/                      # Admin panel (isolated)
│   ├── handler.go             # Generic CRUD handlers
│   ├── models.go               # Model registration
│   ├── registry.go             # Reflection-based operations
│   ├── admin_renderer.go       # Admin-specific renderer
│   ├── admin_routes.go         # Admin route definitions
│   └── views/                  # Admin templates
│       ├── admin_base.html
│       ├── admin_main.html
│       ├── model_index.html
│       ├── model_list.partial.html
│       ├── model_form.partial.html
│       └── model_delete.partial.html
│
├── http/
│   ├── handlers/               # User site handlers (isolated)
│   │   ├── auth.go
│   │   ├── pages.go
│   │   ├── posts.go
│   │   └── users.go
│   └── routes/                 # User site routes
│       ├── pages.go
│       ├── posts.go
│       └── users.go
└── views/
    ├── renderers/
    │   └── renderer.go         # User site renderer
    └── templates/              # User site templates
        ├── base.html
        ├── home.html
        ├── posts/
        └── users/
```

## Key Principles

### 1. Separate Renderers

**User Site Renderer** (`renderers.Renderer`):
- Located in `gojang/views/renderers/renderer.go`
- Uses `base.html` as layout
- Handles user-facing templates only

**Admin Renderer** (`admin.AdminRenderer`):
- Located in `gojang/admin/admin_renderer.go`
- Uses `admin_base.html` as layout
- Handles admin templates only

### 2. Separate Route Namespaces

**User Routes** (mounted at root):
```
r.Get("/", pageHandler.Home)
r.Get("/posts", postHandler.Index)
r.Get("/dashboard", pageHandler.Dashboard)
```

**Admin Routes** (mounted under `/admin` with staff-only middleware):
```
r.Route("/admin", func(r chi.Router) {
    r.Use(middleware.RequireStaff)
    r.Get("/", adminHandler.Dashboard)
    r.Get("/{model}", adminHandler.Index)
    r.Post("/{model}", adminHandler.Create)
    // ... generic CRUD for all models
})
```

### 3. No Cross-References

Don't mix admin templates or path-based checks inside user handlers. Keep user handlers focused on the public experience and admin handled by the generic panel.

### 4. Generic Admin Panel

The admin panel uses reflection-based CRUD that works for all models. To add a model to admin, register it in `admin/models.go` and the admin UI provides CRUD automatically.

## Migration from Mixed Architectures

When migrating from a project that mixed admin and user concerns, remove admin-specific code from user handlers, delete admin templates from user renderer, and rely on the generic admin package.

## Benefits of Separation

- Simplicity
- Maintainability
- Security
- Easier testing

## Verification

- Check user handlers do not reference `admin_*.html` or perform path-based admin detection
- Check admin package is isolated (routes, renderer, templates)
- Test both sites independently

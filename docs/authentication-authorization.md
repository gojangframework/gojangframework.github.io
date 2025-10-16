---
id: authentication-authorization
title: Authentication & Authorization
sidebar_label: Auth & Permissions
sidebar_position: 3
description: Deep dive into Gojang's authentication and authorization system including sessions, password security, and middleware.
keywords: [gojang, authentication, authorization, security, sessions, bcrypt, middleware, rbac]
---

# Authentication & Authorization Deep Dive

## Overview

Gojang includes a complete authentication and authorization system with:
- 🔐 Session-based authentication
- 👥 User management
- 🔒 Password hashing
- 🛡️ CSRF protection
- 🚪 Middleware-based access control
- 👮 Role-based permissions

Key components:
- `gojang/http/handlers/auth.go` - Authentication handlers
- `gojang/http/middleware/auth.go` - Authentication middleware
- `gojang/http/security/password.go` - Password hashing utilities
- `gojang/models/schema/user.go` - User model schema

## Authentication System

### User Model

The User model includes fields required for authentication: `email`, `password_hash`, `is_active`, `is_staff`, `last_login`, `created_at`.

### Password Security

Gojang uses bcrypt (or Argon2 in places) for password hashing. Use the provided `security.HashPassword` and `security.CheckPassword` helpers.

## Sessions

Sessions are managed using alexedwards/scs. Typical configuration:
- Cookie name: `session_id`
- HttpOnly: true
- Secure: true in production
- SameSite: Lax
- Idle timeout: 30 minutes

Store the user ID in session after successful login and renew the token to prevent fixation.

## Authentication Flow

### Registration
1. Parse and validate form
2. Check if user exists
3. Hash password
4. Create user
5. Auto-login (store session)

### Login
1. Parse and validate form
2. Retrieve user by email
3. Verify password
4. Check `is_active`
5. Update `last_login`
6. Create session and renew token
7. Redirect (handle HTMX by setting `HX-Redirect` header)

### Logout
- POST-only handler that destroys the session and redirects.

## Authorization Middleware

- `RequireAuth` - requires a logged-in user
- `LoadUser` - optionally loads current user if present
- `RequireStaff` - ensures user has staff/admin privileges
- `RequirePermission(fn)` - custom permission middleware

These middleware functions add user data to request context for handlers and templates to consume.

## Advanced Patterns

- Resource-based authorization (check ownership before edit)
- RBAC via `role` enum on user model
- Custom permission checks using middleware

## Security Best Practices

- Always hash passwords
- Renew session tokens after login
- Use generic error messages to avoid user enumeration
- Use POST for logout
- Validate inputs server-side
- Use persistent session stores (Redis) for distributed deployments

## Testing

- Unit tests for password hashing and middleware
- Integration tests for login/registration flows

---

This guide summarizes the authentication & authorization features. See `gojang/http/middleware` and `gojang/http/handlers` for concrete code examples.
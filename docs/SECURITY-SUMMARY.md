---
id: SECURITY-SUMMARY
title: Security Features
sidebar_label: Security Summary
sidebar_position: 1
description: Comprehensive overview of Gojang's security features including authentication, CSRF protection, rate limiting, and more.
keywords: [gojang, security, csrf, authentication, rate limiting, https, headers]
---

# Security Features

## Authentication & Password Security

- Argon2id or bcrypt for password hashing (strong parameters recommended)
- Constant-time comparisons to prevent timing attacks
- Password fields marked as sensitive in schema

## Session Management

- HttpOnly cookies
- Secure flag in production
- SameSite: Lax
- Idle timeout and session renewal after login

## CSRF Protection

- `nosurf` library applied to POST/PUT/DELETE and auth routes
- Double-submit cookie pattern

## Rate Limiting

- Per-IP rate limiting on authentication endpoints
- Proper client IP extraction from `X-Forwarded-For`

## Security Headers

- CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy

## HTTPS Enforcement

- Automatic HTTPS redirect in production
- Support for `X-Forwarded-Proto` behind reverse proxies

## Input Validation

- Server-side validation using `go-playground/validator` for forms

## Database Security

- Ent ORM for parameterized queries and type safety

## Authorization & Audit

- Role-based permissions and middleware (`RequireAuth`, `RequireStaff`)
- Admin actions audit logged

## Security Scanning in CI

- `gosec` and `govulncheck` run in CI to detect issues

## Production Checklist

- Set `DEBUG=false`
- Generate secure `SESSION_KEY`
- Use PostgreSQL with `sslmode=require`
- Configure HTTPS and security headers

---

This summary highlights the security controls implemented across the framework. See other guides for implementation details.
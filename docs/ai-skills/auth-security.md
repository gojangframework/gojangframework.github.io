---
title: "Auth Security Skill"
sidebar_label: "Auth Security"
description: "Guide AI agents through authentication, authorization, sessions, email verification, password reset, CSRF, rate limiting, and reCAPTCHA."
---

# Auth Security Skill

Use this skill for authentication, authorization, sessions, email verification, password reset, password handling, CSRF, rate limiting, audit logging, and security middleware.

## Workflow

1. Read [Authentication and Authorization](../authentication-authorization.md) and [Security Features](../SECURITY-SUMMARY.md).
2. Inspect the relevant middleware, handlers, forms, templates, and user schema before editing.
3. Protect private routes with `middleware.RequireAuth(sm, client)`.
4. Protect staff-only routes with both `RequireAuth` and `RequireStaff`.
5. Use `middleware.GetUser(r.Context())` and `middleware.OwnsResource(r, ownerID)` where appropriate.
6. Run targeted auth, middleware, utility, and full test suites.

## Security Rules

- Never store or log plaintext passwords, password hashes, session IDs, CSRF tokens, auth tokens, SMTP secrets, or AWS secrets.
- Use Gojang password utilities instead of custom password logic.
- Keep logout as POST-only.
- Use generic login and forgot-password responses to avoid account enumeration.
- Preserve CSRF protection and HTMX auth-failure behavior.
- Keep admin mounted under `/admin` and staff-only.

## Email And reCAPTCHA

New registrations are unverified until email verification succeeds. Password reset requires a valid unexpired token. Email delivery prefers Amazon SES when fully configured and falls back to SMTP when SES is incomplete. reCAPTCHA v3 protects registration and forgot-password flows when configured.

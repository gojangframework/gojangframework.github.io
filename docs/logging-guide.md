---
id: logging-guide
title: Logging Guide
sidebar_label: Logging
sidebar_position: 3
description: Structured logging with Zap in Gojang. Best practices for development and production logging.
keywords: [gojang, logging, zap, structured logging, observability, monitoring]
---

# Logging Guide

## Overview

Gojang uses structured logging (Zap) for high-performance, environment-aware logging. In development use human-friendly logs; in production use JSON structured logs for aggregation.

## Quick Start

Initialize the logger in `cmd/web/main.go` and configure via environment variables (`LOG_LEVEL`, `ENV`, `DEBUG`).

## Logging Methods

- Formatted: `utils.Infof`, `utils.Debugf`
- Structured: `utils.Infow`, `utils.Errorw` etc.

## Best Practices

- Log meaningful business events (user.created, order.completed)
- Include contextual information (user_id, request_id, duration)
- Avoid logging sensitive data (passwords, tokens)
- Don't over-log in hot loops

## Common Patterns

- Handler logging: log start and errors with context
- Audit logging for admin actions
- Background job and database operation logging

## Production

Ship JSON logs to ELK, Loki, Datadog, or CloudWatch. Use structured queries to filter and analyze logs.

---

This guide summarizes how to instrument logging in Gojang and follow best practices for observability.
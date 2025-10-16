---
id: deployment-guide
title: Deployment Guide
sidebar_label: Deployment
sidebar_position: 1
description: Complete guide to deploying Gojang applications to Docker, VPS, cloud platforms, and PaaS providers.
keywords: [gojang, deployment, docker, vps, cloud, nginx, systemd, production]
---

# Deployment Guide

## Overview

Gojang applications can be deployed to:
- Docker, VPS, Cloud platforms (AWS/GCP/Azure/Fly.io), PaaS (Heroku, Railway)

This guide covers:
- Building production binaries
- Docker containerization
- Environment configuration
- Database setup (SQLite vs PostgreSQL)
- Reverse proxy (Nginx) and SSL/TLS
- Process management (systemd)
- Monitoring and logging

## Pre-Deployment Checklist

- All tests pass: `go test ./...`
- Code formatted: `go fmt ./...`
- Linting: `go vet ./...`
- Environment vars configured, secrets not committed
- Database migrations ready
- HTTPS certificates obtained

## Building

Build optimized binaries (example for Linux):

```bash
GOOS=linux GOARCH=amd64 go build -o gojang-app \
  -ldflags="-s -w" \
  ./gojang/cmd/web
```

You can also use the provided `task build` which wraps the build step.

## Docker

Provide a multi-stage Dockerfile, example included in the repository. Use `docker-compose` for multi-service setups (app, db, nginx, redis).

## VPS

Steps: create app user, install deps, build or copy binary, create `.env`, setup systemd service, configure Nginx as reverse proxy, obtain certs with Certbot.

## Cloud Platforms

Examples for Fly.io, Railway, Heroku and DigitalOcean App Platform are included with recommended configuration snippets and environment variable guidance.

## Monitoring & Backup

- Use structured logging (Zap) and external aggregators (ELK, Loki, Datadog)
- Set up health checks and uptime monitoring
- Automate database backups (pg_dump or sqlite backup)

## Security Checklist

- HTTPS enabled
- Secrets in env vars
- DEBUG=false in production
- CSRF protection enabled
- Rate limiting configured

## Troubleshooting

- Check systemd service logs: `journalctl -u gojang -f`
- Confirm `.env` and permissions
- Nginx config test: `nginx -t`

---

This document contains deployment recipes for several environments. See repository docs for platform-specific examples.
---
id: distributed-deployment
title: Distributed Deployment & Load Balancing
sidebar_label: Distributed Deployment
sidebar_position: 2
description: Scale Gojang horizontally with load balancing, Redis sessions, and multi-instance deployments.
keywords: [gojang, distributed, load balancing, scaling, redis, high availability, nginx, haproxy]
---

# Distributed Deployment & Load Balancing Guide

## Overview

Gojang supports distributed deployment and load balancing to achieve high availability and horizontal scaling. Key requirements:
- PostgreSQL (not SQLite)
- Persistent session storage (Redis or DB)
- Load balancer (Nginx/HAProxy/Cloud LB)

## Architecture Patterns

1. Simple load balancing (multiple instances on same server)
2. Multi-server deployment (different machines)
3. Container orchestration (Kubernetes)

## Steps

- Configure shared PostgreSQL
- Use Redis or Postgres for sessions
- Configure load balancer (Nginx/HAProxy)
- Run multiple instances (systemd units or Docker compose scaled services)
- Add health check endpoint (`/health`)

## Session Storage

Recommended: Redis (fast, battle-tested). Alternative: Postgres-backed sessions using scs/postgresstore.

## Load Balancer Examples

- Nginx upstream configuration
- HAProxy config example
- Cloud load balancer guidance for ALB/GCP

## Testing

- Verify all instances respond to `/health`
- Test session persistence across instances
- Test failover by stopping an instance

## Best Practices

- Use the same `SESSION_KEY` and `CSRF_SECRET` across instances
- Avoid local file storage (use S3 or shared storage)
- Use connection pooling and monitor DB connections

---

This guide helps you scale Gojang horizontally and operate in production with multiple instances and a load balancer.
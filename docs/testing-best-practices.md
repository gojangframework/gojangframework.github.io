---
id: testing-best-practices
title: Testing Best Practices
sidebar_label: Testing
sidebar_position: 1
description: Comprehensive testing guide for Gojang including unit tests, integration tests, and CI/CD setup.
keywords: [gojang, testing, unit tests, integration tests, ci cd, github actions]
---

# Testing Best Practices

## Overview

Gojang supports unit, integration, handler, database, and end-to-end tests. Tests give confidence and enable safe refactoring.

## Project Layout & Naming

- Test files: `*_test.go`
- Test functions: `TestSomething(t *testing.T)`
- Use table-driven tests for multiple scenarios

## Unit Testing

- Keep tests focused
- Use `t.Fatalf` for setup failures and `t.Error` for assertions

## Handler & Integration Testing

- Use `httptest` for HTTP handler tests
- Use interfaces and test doubles for dependencies
- Use in-memory SQLite for DB tests (`file:ent?mode=memory&cache=shared&_fk=1`)

## Database Testing

- Provide `NewTestClient(t *testing.T)` to create a test Ent client with migrations run
- Clean up resources with `t.Cleanup`

## Continuous Integration

- GitHub Actions example included to run `go test -v -race -coverprofile=coverage.out ./...` and enforce coverage thresholds

## Tools & Libraries

- `testing` stdlib
- Optional: `github.com/stretchr/testify/assert` and `mock`

## Benchmarking & Coverage

- Use `go test -bench=.` for benchmarks
- Use `go test -coverprofile=coverage.out` and `go tool cover` for coverage reporting

---

This guide provides examples and patterns for organizing tests, using fixtures, and running tests in CI.
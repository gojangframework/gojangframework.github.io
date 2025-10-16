---
id: htmx-patterns
title: HTMX Integration Patterns
sidebar_label: HTMX Patterns
sidebar_position: 3
description: Learn HTMX patterns in Gojang for building dynamic, interactive UIs without heavy JavaScript frameworks.
keywords: [gojang, htmx, patterns, dynamic ui, ajax, spa, interactive]
---

This guide summarizes HTMX patterns used throughout Gojang to build dynamic, interactive UI without heavy JavaScript frameworks.

## Overview

HTMX lets you use modern browser features directly from HTML using attributes (hx-get, hx-post, hx-target, etc.). In Gojang HTMX is used to submit forms asynchronously, load content dynamically, update parts of a page, and implement modal dialogs and CRUD operations.

## Getting Started

HTMX is included in the base template (base.html):

```html
<script src="https://unpkg.com/htmx.org@1.9.10"></script>
```

CSRF tokens are propagated automatically for HTMX requests via a small config snippet in `base.html`.

## Core Attributes

- hx-get / hx-post / hx-put / hx-delete — make requests
- hx-target — where the response will be inserted
- hx-swap — how to insert the response (innerHTML, outerHTML, beforeend, afterbegin, none)
- hx-trigger — when to trigger the request (click, load, keyup, etc.)
- hx-confirm — show a confirmation dialog

## Common Patterns

- Modal forms: open HTML fragment into a modal container (hx-get -> hx-target="#modal" hx-swap="innerHTML")
- Create via modal: form submits with hx-post and on success closes modal (HX-Trigger header / hx-on::after-request)
- Replace specific element: use hx-target with an element id and hx-swap="outerHTML"
- Prepend/append items: use hx-swap="afterbegin" or "beforeend"
- Out-of-band swaps: return fragments with hx-swap-oob to update multiple page areas

## Response Headers

Gojang uses these headers to control client behavior for HTMX flows:

- HX-Trigger — custom events or close modal
- HX-Retarget — change the target of the response
- HX-Reswap — change swap strategy
- HX-Redirect — client-side redirect
- HX-Refresh — ask the client to refresh the page

## Best Practices

- Use semantic IDs for targets
- Include CSRF tokens in forms
- Return partial templates for HTMX requests (not full pages)
- Validate on the server and return re-rendered form with errors

For full examples and handler snippets see the original repository docs and the `docs/creating-data-models.md` guide in this site.

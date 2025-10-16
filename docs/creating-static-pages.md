---
id: creating-static-pages
title: Creating Static Pages
sidebar_label: Creating Static Pages
sidebar_position: 2
description: Learn how to create static pages like About, Contact, and Terms in Gojang using templates and handlers.
keywords: [gojang, static pages, templates, handlers, routing]
---

Static pages (About, Contact, Terms) are simple in Gojang. Steps:

1. Create a template in `gojang/views/templates/` that defines `title` and `content` blocks.
2. Add a handler method in `gojang/http/handlers/pages.go` that calls the renderer with the template.
3. Register the route in `gojang/http/routes/pages.go`.
4. (Optional) Add navigation link in `base.html`.

Example template snippet:

```html
{{define "title"}}About Us{{end}}
{{define "content"}}
<div class="container">
  <h1>About Us</h1>
  <p>Welcome...</p>
</div>
{{end}}
```

Handler example:

```go
func (h *PageHandler) About(w http.ResponseWriter, r *http.Request) {
  h.Renderer.Render(w, r, "about.html", &renderers.TemplateData{Title: "About Us"})
}
```

Route registration:

```go
r.Get("/about", handler.About)
```

Tip: Use HTMX attributes in static pages to add interactive fragments without writing JavaScript.

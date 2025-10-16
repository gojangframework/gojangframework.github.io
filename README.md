Gojang documentation site (Docusaurus)

This folder contains a Docusaurus v2 site to host the Gojang documentation.

Quick start (PowerShell on Windows):

```powershell
# 1. Install Node.js (if not installed) and then install dependencies
npm install

# 2. Run dev server
npm run start

# 3. Build static site
npm run build

# 4. Serve locally (after build)
npm run serve
```

Deployment:
- This repo includes a GitHub Actions workflow to build and publish the site to GitHub Pages. Update `docusaurus.config.js` `url` and `baseUrl` to match your GitHub Pages settings.

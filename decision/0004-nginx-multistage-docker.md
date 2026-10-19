# 0004. nginx serving via multi-stage Docker build

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** 1

## Context
The requirement is that the site runs in a Docker container with nginx serving it.

## Decision
`nginx/Dockerfile` is built from the repo root:
1. **Build stage** `node:22-alpine`: `npm ci`, then `npm run build`. The phase switches are passed in as build `ARG`s.
2. **Runtime stage** `nginx:1.27-alpine`: holds only `dist/` and the config. No Node in the final image.

`nginx/default.conf` provides:
- `/healthz` → 200, used by the Docker `HEALTHCHECK` and the ngrok `depends_on`.
- `/assets/` → `Cache-Control: immutable` for one year (Vite hashes the filenames).
- `/` → SPA fallback to `index.html` with `no-cache`.
- gzip, `server_tokens off`.
- Security headers in `nginx/snippets/security-headers.conf`, included in **each** location, because nginx drops inherited `add_header` lines when a location sets its own. The CSP is `script-src 'self'`, which is why the theme bootstrap is the external `public/theme-init.js`.
- A commented `location /api/` proxy block, ready for Phase 2.

## Alternatives considered
- **Bind-mounting `dist/` into a stock nginx:** needs a local build and node_modules in OneDrive (see 0010).
- **Serving with `vite preview` or a Node static server:** the user specified nginx.

## Consequences
- One image holds everything for Phase 1. Image tags are pinned to a minor version for nginx and a major version for Node.
- Changing content or switches means rebuilding the image.

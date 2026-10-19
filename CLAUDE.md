# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Start here
- **`task.md`** has the current phase, current focus, next step, the per-phase checklist, open questions and the session log. Read it first. Update it (ticks + a session log row) at the end of every session.
- **`decision/`** has one ADR per decision, with the index in `decision/README.md`. Before changing an established choice, read the relevant ADR. Record new decisions as a new numbered ADR; supersede old ones rather than rewriting them.

## What this is
Gyan Singh's portfolio site, built in phases (decision/0006):
- **Phase 1 (current):** static React app → nginx container → public URL through an ngrok container.
- **Phase 2 (planned):** `backend/` Express API + Postgres `db` service. `POST /api/contact` stores messages, and nginx proxies `/api/*` to `backend:4000`.

## Commands
Docker is the primary workflow. The folder is OneDrive-synced, so **don't run `npm install` inside `frontend/`** (decision/0010).

```powershell
docker compose up --build -d                    # build + run nginx (localhost:8080) + ngrok (inspector localhost:4040)
docker compose down
docker compose -f docker-compose.dev.yml up     # Vite hot reload on localhost:5173
```

To lint or build without Docker, copy `frontend/` to a temp dir outside OneDrive, run `npm ci && npm run lint && npm run build` there, and copy back only `package-lock.json` if dependencies changed. There are no tests yet; Phase 2 adds backend tests.

## Architecture
- `frontend/src/data/portfolio.json` is the single source of content, taken from `GYAN SINGH RESUME NEW.docx`. Never invent resume facts; open questions go in `task.md`.
- Components get data only through `src/services/` (`dataSource.js`, `contact.js`, `apiClient.js`) and `src/hooks/usePortfolio.js`. Build-time switches `VITE_DATA_SOURCE` (static|api), `VITE_CONTACT_MODE` (mailto|api) and `VITE_API_BASE_URL` are read only in `src/services/config.js` (decision/0003).
- Tailwind v4 is configured CSS-first in `src/index.css` (`@theme`, `@utility`, `@custom-variant dark`). There is no tailwind.config.js. Dark mode is class-based, set before paint by `public/theme-init.js`, which is an external file because the CSP is `script-src 'self'`.
- Content stores accent *names*; the Tailwind class strings live in `src/lib/accents.js`.
- Put `.reveal` (scroll animation) on a wrapper element, not on an element that also has Tailwind `transition` classes.
- `nginx/Dockerfile` builds from the repo root: Node build stage, then nginx runtime. `nginx/default.conf` includes `snippets/security-headers.conf` in each location.

## Environment
- Windows 11, OneDrive-synced folder. Git repo on `main`, remote `origin` = private `github.com/Digigrow1/portfolio`. Line endings are LF via `.gitattributes`.
- Docker Desktop is installed per-user (`%LOCALAPPDATA%\Programs\DockerDesktop`). A shell started before the install may not have `docker` on PATH, so reload PATH from the registry. The Bash tool doesn't see `docker`; use PowerShell. Node v24 is available on the host.

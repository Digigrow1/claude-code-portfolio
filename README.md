# Gyan Singh: Portfolio

A colorful personal portfolio built with React, Vite and Tailwind. It's served by nginx in Docker and published through ngrok. The project is built in phases: Phase 1 is a static site, and Phase 2 adds an Express + PostgreSQL backend for the contact form.

- **Tasks / progress:** [`task.md`](task.md)
- **Decisions & reasoning:** [`decision/`](decision/README.md)
- **Editing content:** [`docs/content.md`](docs/content.md)
- **Contributing:** [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Tech stack

React 19, Vite, Tailwind CSS v4 (configured CSS-first in `frontend/src/index.css`), nginx, Docker Compose and ngrok. See [decision 0002](decision/0002-frontend-react-vite-tailwind.md), [0004](decision/0004-nginx-multistage-docker.md) and [0005](decision/0005-ngrok-compose-service.md).

## Architecture

```
Phase 1 (now)                     Phase 2 (planned)
browser ─ ngrok ─ nginx(web)      browser ─ ngrok ─ nginx(web) ─┬─ /      static build
                   └ static build                   /api/* ─────┴─ backend:4000 ─ db (postgres)
```

- `web` builds the React app in a Node stage and serves it with nginx (port 80 in the container, `WEB_PORT` on the host).
- `ngrok` tunnels to `web:80` and publishes a public URL.
- Phase 2 adds an Express `backend` and a Postgres `db` behind the same nginx under `/api` (no CORS, one tunnel). Neither exists yet. Details in [decision 0006](decision/0006-phased-architecture.md) and [0007](decision/0007-backend-express-postgres.md).

## Project structure

```
.
├── frontend/            React + Vite app
│   ├── public/          favicon, robots.txt, theme-init.js, images/
│   └── src/
│       ├── components/  page sections (Hero, Projects, Contact, ...)
│       ├── data/        portfolio.json (all content)
│       ├── hooks/       usePortfolio, useReveal, useRotatingText
│       ├── lib/         accents.js (accent name -> Tailwind classes)
│       └── services/    config.js, dataSource.js, contact.js, apiClient.js
├── nginx/               Dockerfile, default.conf, snippets/security-headers.conf
├── decision/            one ADR per decision (index in decision/README.md)
├── docs/                content.md (portfolio.json reference)
├── .claude/             Claude Code agents, hooks, skills and settings
├── docker-compose.yml       web + ngrok
├── docker-compose.dev.yml   Vite hot reload
├── .env.example         environment variables (copy to .env)
├── CLAUDE.md            guidance for Claude Code
└── task.md              current phase, checklist and session log
```

## Environment variables

Copy `.env.example` to `.env`. `.env` is gitignored; never commit it. Variables marked **build-time** are baked into the frontend bundle, so rebuild after changing them (`docker compose up --build -d`).

| Variable | Default | When | Purpose |
|---|---|---|---|
| `NGROK_AUTHTOKEN` | empty | runtime | Your ngrok authtoken. Required for the public URL. |
| `NGROK_ARGS` | empty | runtime | Extra ngrok flags, e.g. `--url=your-name.ngrok-free.app` for a static domain. |
| `WEB_PORT` | `8080` | runtime | Host port mapped to nginx. |
| `VITE_DATA_SOURCE` | `static` | build-time | `static` reads `portfolio.json`; `api` is reserved for a later phase. |
| `VITE_CONTACT_MODE` | `mailto` | build-time | `mailto` opens the visitor's mail client; `api` posts to the backend (Phase 2). |
| `VITE_API_BASE_URL` | `/api` | build-time | Same-origin path that nginx will proxy to the backend. |

These switches are read only in `frontend/src/services/config.js` ([decision 0003](decision/0003-content-as-json-data-layer.md)).

## Built with Claude Code

- [`CLAUDE.md`](CLAUDE.md) gives Claude Code the project conventions, and [`task.md`](task.md) carries state between sessions.
- Every significant choice is recorded as an ADR in [`decision/`](decision/README.md). Accepted ADRs are superseded, not rewritten.
- A `FileChanged` hook runs a read-only `code-reviewer` subagent on each changed source file and writes reports to `.claude/reviews/` ([decision 0011](decision/0011-file-change-code-review-hook.md)). Set `CLAUDE_FILE_REVIEW_DISABLED=1` to turn it off.

## Run it (Docker)

Prerequisites: [Docker Desktop](https://www.docker.com/products/docker-desktop/) and a free [ngrok](https://dashboard.ngrok.com/) account.

```powershell
copy .env.example .env        # then paste your NGROK_AUTHTOKEN into .env
docker compose up --build -d
```

- Local site: http://localhost:8080
- Public URL: open http://localhost:4040 (ngrok inspector), or run
  `curl http://localhost:4040/api/tunnels`
- Stop: `docker compose down`

Want the same public URL every time? Claim a free static domain in the ngrok dashboard and set `NGROK_ARGS=--url=<your-domain>` in `.env`.

## Develop with hot reload

```powershell
docker compose -f docker-compose.dev.yml up
```

Then open http://localhost:5173. `node_modules` stays inside a Docker volume, so nothing heavy gets synced to OneDrive.

## Edit content

All text, projects, skills and links live in [`frontend/src/data/portfolio.json`](frontend/src/data/portfolio.json). The field-by-field reference is [`docs/content.md`](docs/content.md). Rebuild after editing (`docker compose up --build -d`).

- Add a project screenshot: put the image in `frontend/public/images/` and set `"image": "/images/<file>"`.
- Add a live demo: set `"liveUrl"`.
- Show your phone number: set `"phone"` and `"showPhone": true` (see [decision 0009](decision/0009-privacy-hide-phone.md)).

## Troubleshooting

- **`docker` not found (Windows):** a per-user Docker Desktop install may not be on the PATH of a shell opened before the install. Open a new PowerShell window, or reload PATH from the registry.
- **The public URL changed:** on the free ngrok plan the URL changes whenever the `ngrok` container restarts. Read the new one at http://localhost:4040, or claim a static domain and set `NGROK_ARGS` (see above).
- **ngrok container exits immediately:** `NGROK_AUTHTOKEN` in `.env` is empty or wrong. Check `docker compose logs ngrok`.
- **Changed `.env` or `portfolio.json` but the site looks the same:** these are baked in at build time. Run `docker compose up --build -d`.
- **OneDrive sync is slow or conflicts:** don't run `npm install` inside `frontend/` ([decision 0010](decision/0010-onedrive-no-local-node-modules.md)). Use the Docker workflows above.

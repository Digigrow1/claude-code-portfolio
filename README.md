# Gyan Singh: Portfolio

A colorful personal portfolio built with React, Vite and Tailwind. It's served by nginx in Docker and published through ngrok. The project is built in phases: Phase 1 is a static site, and Phase 2 adds an Express + PostgreSQL backend for the contact form.

- **Tasks / progress:** [`task.md`](task.md)
- **Decisions & reasoning:** [`decision/`](decision/README.md)

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

All text, projects, skills and links live in [`frontend/src/data/portfolio.json`](frontend/src/data/portfolio.json). Rebuild after editing (`docker compose up --build -d`).

- Add a project screenshot: put the image in `frontend/public/images/` and set `"image": "/images/<file>"`.
- Add a live demo: set `"liveUrl"`.
- Show your phone number: set `"phone"` and `"showPhone": true` (see [decision 0009](decision/0009-privacy-hide-phone.md)).

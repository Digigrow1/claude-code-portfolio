# 0010. No local node_modules in the OneDrive folder

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** 1

## Context
The project folder is synced by OneDrive. A `node_modules` folder (tens of thousands of files) would slow syncing and can cause file-lock errors.

## Decision
- **Production builds** happen inside Docker (`nginx/Dockerfile` build stage).
- **Hot-reload development** uses `docker-compose.dev.yml`. It bind-mounts `frontend/` but keeps `node_modules` in the named Docker volume `frontend_node_modules`, and uses polling file watching (`VITE_USE_POLLING=true`) because Windows bind mounts don't forward file events.
- **Builds without Docker** (for example, verification before Docker was installed) run in a temporary copy outside OneDrive. Only `package-lock.json` gets copied back.
- `.gitignore` and `.dockerignore` exclude `node_modules/` and `dist/`.

## Alternatives considered
- **`npm install` in place:** easy, but hurts OneDrive.
- **Moving the project out of OneDrive:** the user's choice to make. If they do, local `npm install` becomes fine.

## Consequences
- Docker Desktop is required for day-to-day work.
- If you ever run `npm install` in `frontend/` by mistake, delete `frontend/node_modules`.

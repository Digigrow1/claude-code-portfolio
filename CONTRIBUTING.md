# Contributing

## Read first

- [`CLAUDE.md`](CLAUDE.md) has the conventions and [`task.md`](task.md) has the current phase and open questions.
- Decisions are recorded in [`decision/`](decision/README.md). Before changing an established choice, read its ADR. Add a new numbered ADR for new decisions and supersede old ones instead of rewriting them.

## Workflow: Docker first

```powershell
docker compose up --build -d                    # nginx on localhost:8080 + ngrok
docker compose -f docker-compose.dev.yml up     # Vite hot reload on localhost:5173
```

The project folder is synced by OneDrive, so **don't run `npm install` inside `frontend/`**; `node_modules` would be synced ([decision 0010](decision/0010-onedrive-no-local-node-modules.md)). The dev compose file keeps `node_modules` in a Docker volume.

To lint or build without Docker, copy `frontend/` to a temp directory outside OneDrive and run:

```
npm ci && npm run lint && npm run build
```

Copy back only `package-lock.json` if dependencies changed. There are no tests yet.

## Content

- Edit [`frontend/src/data/portfolio.json`](frontend/src/data/portfolio.json); see [`docs/content.md`](docs/content.md).
- Don't invent resume facts. Put questions in the "Open questions" list in `task.md`.
- Keep the phone number out of the bundle ([decision 0009](decision/0009-privacy-hide-phone.md)).

## Secrets

Never commit `.env` or any token. `.gitignore` ignores `.env`, `.env.*` (except `.env.example`) and `*.docx`.

## Pull requests

- Keep each PR focused on one change.
- Run lint and build as above if you touched `frontend/` or `nginx/`.
- Add a row to the Session log table at the bottom of `task.md`.

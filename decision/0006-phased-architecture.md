# 0006. Phased architecture & boundaries

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** all

## Context
The user wants phase-wise development: static first, with a backend and database in later phases, and no rewrites in between.

## Decision

```
Phase 1 (now)                     Phase 2                                   Phase 3 (backlog)
browser ─ ngrok ─ nginx(web)      browser ─ ngrok ─ nginx(web) ─┬─ /      static
                   └ static              /api/* ────────────────┴─ backend:4000 ─ db (postgres)
```

| Phase | Scope | Exit criteria |
|---|---|---|
| 0 | Repo layout, `task.md`, `decision/`, ignore files | Docs exist |
| 1 | Static React site, nginx image, ngrok service | Site reachable on a public ngrok URL |
| 2 | `backend/` (Express) + `db` (Postgres); `POST /api/contact` stores messages; nginx `/api` proxy; `VITE_CONTACT_MODE=api` | Contact form submissions land in the DB |
| 3 | Backlog: email notifications, projects from DB, admin, analytics, CI, resume PDF | Picked up one ADR at a time |

**Rules that keep phases additive:**
1. **Same origin.** The API is always under `/api` behind the same nginx, so there's no CORS setup and one ngrok tunnel covers everything.
2. **Compose is additive.** Phase 2 adds `backend` and `db` services to `portfolio_net`. The only change to the existing setup is uncommenting the `/api` block in `nginx/default.conf`.
3. **The UI talks to services, not to sources.** See 0003.
4. **Secrets only in `.env`.** Phase 2 adds `POSTGRES_*` and `DATABASE_URL` there.

## Alternatives considered
- **Building the backend now:** the user explicitly doesn't need one yet.
- **A separate API domain:** needs a second tunnel and CORS.

## Consequences
- Phase 2 can be built and tested without changing any Phase 1 UI component.

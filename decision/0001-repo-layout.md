# 0001. Repository layout

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** 0

## Context
The folder held only `CLAUDE.md`, the resume `.docx`, and two empty folders (`demo/`, `projects/`). The project will grow from a static site into frontend, backend and database services, and needs room for each.

## Decision
Use a monorepo at the folder root, with one top-level directory per deployable concern:

```
frontend/   React app (Phase 1+)
nginx/      Dockerfile + server config; nginx is the single entry point
backend/    Express API (Phase 2, not created yet)
decision/   This log
task.md     Phase-wise task tracker
```

The user asked for the empty `demo/` and `projects/` folders to be deleted, and they were.

## Alternatives considered
- **Everything inside `demo/` or `projects/`:** the user rejected this.
- **Separate repos per service:** too much overhead for a one-person portfolio.

## Consequences
- `docker-compose.yml` sits at the root and its build context is the root, so `nginx/Dockerfile` can copy `frontend/`.
- The resume `.docx` stays at the root as the source of truth for content, and `.dockerignore` excludes it.

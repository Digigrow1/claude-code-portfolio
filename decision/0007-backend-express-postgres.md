# 0007. Backend: Node.js (Express) + PostgreSQL

- **Date:** 2026-10-19
- **Status:** Accepted (implementation scheduled for Phase 2)
- **Phase:** 2

## Context
Later phases need an API and a database. The first feature is storing contact form messages. Node.js is already on the user's resume.

## Decision
- **API:** Node.js 22 + Express in `backend/`, listening on `:4000` inside the network. It's never published to the host, and nginx proxies `/api/*` to it.
- **DB:** `postgres:16-alpine` with a named volume `pgdata` and a healthcheck. Credentials come from `.env`.
- **Planned endpoints:** `GET /api/health`, `POST /api/contact`.
- **Planned table:** `contact_messages(id, name, email, message, created_at, ip_hash, user_agent)`.
- **Planned hardening:** input validation, rate limiting, security headers, and a honeypot field. The frontend already sends `website`.
- **Error shape:** `{ "error": { "message", "details" } }`. `apiClient.js` already expects this.

Library choices (migration tool, validator, rate limiter) will each get their own ADR when Phase 2 starts.

## Alternatives considered
- **MongoDB:** contact messages are simple relational rows, and Postgres is a stronger default.
- **Spring Boot + MySQL:** builds on the Java certification, but it's heavier.
- **FastAPI:** fine, but adds a second language runtime.
- **Serverless / form SaaS:** doesn't meet the "own backend + DB" goal.

## Consequences
- Adds two containers in Phase 2 and the need for DB backups if the data matters.

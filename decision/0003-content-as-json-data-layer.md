# 0003. Content as JSON behind a data-access layer

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** 1 (designed for 2+)

## Context
Phase 1 has no backend, but later phases will move some data (starting with contact messages) to an API and database. We want those moves to touch as little UI code as possible.

## Decision
- All resume content lives in `frontend/src/data/portfolio.json`. Editing that file is how content gets updated.
- Components **never import the JSON directly**. They get data through:
  - `src/services/dataSource.js`: `getPortfolio()` / `getInitialPortfolio()`
  - `src/services/contact.js`: `submitContact()`
  - `src/services/apiClient.js`: a shared fetch wrapper
  - `src/hooks/usePortfolio.js`: the React hook used by `App.jsx`
- Build-time switches, read only in `src/services/config.js`:

| Variable | Values | Phase 1 | Phase 2 |
|---|---|---|---|
| `VITE_DATA_SOURCE` | `static` \| `api` | `static` | `static` (contact only goes to the API) |
| `VITE_CONTACT_MODE` | `mailto` \| `api` | `mailto` | `api` |
| `VITE_API_BASE_URL` | path or URL | `/api` | `/api` |

- In `api` mode, `getPortfolio()` falls back to the bundled JSON if the API fails.
- Visual accents are stored as **names** (`"accent": "violet"`), and class strings live in `src/lib/accents.js`. This keeps working when content comes from a database that Tailwind can't scan.

## Alternatives considered
- **Hard-coding content in JSX:** fastest to write, but the API migration would mean rewriting components.
- **A headless CMS:** overkill for now.

## Consequences
- Phase 2 = build the backend, then set `VITE_CONTACT_MODE=api` and rebuild. The `Contact` component doesn't change.
- Content edits need a rebuild (`docker compose up --build`).

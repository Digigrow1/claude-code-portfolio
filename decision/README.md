# Decision Log

Every significant decision gets one file here (a lightweight ADR). They exist so any future session, human or AI, can pick up context without re-deriving it.

**Rules**
- One decision per file, named `NNNN-short-slug.md`, numbered sequentially.
- Never delete or rewrite an accepted decision. To change one, add a new ADR and set the old one's status to `Superseded by NNNN`.
- Update the index below whenever you add or change an ADR.
- Link the related ADR from `task.md` tasks.

## Index

| ID | Title | Status | Phase |
|----|-------|--------|-------|
| [0001](0001-repo-layout.md) | Repository layout | Accepted | 0 |
| [0002](0002-frontend-react-vite-tailwind.md) | Frontend: React + Vite + Tailwind CSS v4 | Accepted | 1 |
| [0003](0003-content-as-json-data-layer.md) | Content as JSON behind a data-access layer | Accepted | 1 |
| [0004](0004-nginx-multistage-docker.md) | nginx serving via multi-stage Docker build | Accepted | 1 |
| [0005](0005-ngrok-compose-service.md) | ngrok as a docker-compose service | Accepted | 1 |
| [0006](0006-phased-architecture.md) | Phased architecture & boundaries | Accepted | all |
| [0007](0007-backend-express-postgres.md) | Backend: Node.js (Express) + PostgreSQL | Accepted (impl. Phase 2) | 2 |
| [0008](0008-design-colorful-creative.md) | Visual design: colorful / creative | Accepted | 1 |
| [0009](0009-privacy-hide-phone.md) | Keep phone number off the public site | Accepted | 1 |
| [0010](0010-onedrive-no-local-node-modules.md) | No local node_modules in the OneDrive folder | Accepted | 1 |
| [0011](0011-file-change-code-review-hook.md) | Automated code review on file change (Claude Code hook) | Accepted | all |

## Template

```markdown
# NNNN. Title

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Accepted | Superseded by NNNN
- **Phase:** 0 | 1 | 2 | 3

## Context
What problem or question forced a decision? Constraints?

## Decision
What we chose, stated plainly.

## Alternatives considered
- Option: why not.

## Consequences
What this makes easier or harder, and any follow-ups.
```

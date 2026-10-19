# Task Tracker: Gyan Singh Portfolio

> **Read this first when resuming.** Decisions and the reasons behind them are in [`decision/`](decision/README.md).

## Snapshot
- **Current phase:** Phase 1, verified and live through ngrok; only the content review is left
- **Current focus:** content review with Gyan (P1-15, open questions below)
- **Next step:** get answers to the open questions → update `portfolio.json` → rebuild. Then Phase 2 starts with P2-01 (ADRs)

**Legend:** `[ ]` todo · `[~]` in progress / partly done · `[x]` done · `[!]` blocked

---

## Phase 0: Setup & docs
- [x] **P0-01** Delete the empty `demo/` and `projects/` folders (user-approved). See [0001](decision/0001-repo-layout.md)
- [x] **P0-02** Create `task.md` (this file)
- [x] **P0-03** Create `decision/` with an index, template and ADRs 0001–0010
- [x] **P0-04** Add `.gitignore`, `.dockerignore`, `.env.example`
- [x] **P0-05** `git init` + first commit, pushed to the private repo `Digigrow1/portfolio` (user-approved 2026-10-19). The resume `.docx` is gitignored because it contains the phone number

## Phase 1: Static portfolio (React + nginx + ngrok)
- [x] **P1-01** Scaffold Vite + React 19 + Tailwind v4 in `frontend/`. See [0002](decision/0002-frontend-react-vite-tailwind.md)
- [x] **P1-02** Encode the resume in `frontend/src/data/portfolio.json`
- [x] **P1-03** Data layer: `services/config.js`, `dataSource.js`, `contact.js`, `apiClient.js`, `hooks/usePortfolio.js`. See [0003](decision/0003-content-as-json-data-layer.md)
- [x] **P1-04** Sections: Navbar, Hero, About, Skills, Experience, Projects, Education, Certifications, Contact, Footer
- [x] **P1-05** Colorful theme, dark/light toggle, scroll reveal, reduced-motion support. See [0008](decision/0008-design-colorful-creative.md)
- [x] **P1-06** Extract the profile photo from the resume → `frontend/public/images/profile.jpg`
- [x] **P1-07** Phone number kept out of the bundle. See [0009](decision/0009-privacy-hide-phone.md)
- [x] **P1-08** `nginx/Dockerfile` (multi-stage) + `default.conf` + security headers. See [0004](decision/0004-nginx-multistage-docker.md)
- [x] **P1-09** `docker-compose.yml` with `web` + `ngrok`. See [0005](decision/0005-ngrok-compose-service.md)
- [x] **P1-10** `docker-compose.dev.yml` hot-reload setup. See [0010](decision/0010-onedrive-no-local-node-modules.md)
- [x] **P1-11** `npm run lint` + `npm run build` pass (run in a temp copy outside OneDrive; `package-lock.json` committed)
- [x] **P1-12** `docker compose up --build`: check 200 on `:8080`, `/healthz`, headers, gzip, SPA fallback. All passed 2026-10-19; container reports healthy
- [x] **P1-13** ngrok tunnel: get the URL from `localhost:4040`, test on desktop and phone. Tunnel up with headers intact (curl); user checked it on a phone 2026-10-19. The free-plan URL changes when the ngrok container restarts
- [x] **P1-14** Lighthouse ≥ 90 for performance and accessibility; check both themes visually at 360px / 768px / 1280px. Final scores: perf 91–96, a11y/best-practices/SEO 100 in both themes, mobile + desktop. Fixed on the way: added `robots.txt` (SEO 92 → 100) and a solid light-mode background for the hero "Open to opportunities" badge (contrast 2.52 → pass)
- [ ] **P1-15** Content review by Gyan (see open questions below)

## Phase 2: Backend + DB (contact form → PostgreSQL)
See [0006](decision/0006-phased-architecture.md) and [0007](decision/0007-backend-express-postgres.md).
- [ ] **P2-01** ADRs: migration tool, validation library, rate limiting, honeypot / spam policy
- [ ] **P2-02** `backend/` Express app: `GET /api/health`, `POST /api/contact`, error shape `{error:{message,details}}`
- [ ] **P2-03** `backend/Dockerfile` (node:22-alpine, non-root user, healthcheck)
- [ ] **P2-04** `db` service: `postgres:16-alpine`, `pgdata` volume, healthcheck; `POSTGRES_*` / `DATABASE_URL` in `.env.example`
- [ ] **P2-05** Migration: `contact_messages` table
- [ ] **P2-06** Validation, rate limit, security headers, honeypot (`website` field already sent by the frontend)
- [ ] **P2-07** nginx: uncomment the `location /api/` block
- [ ] **P2-08** Set `VITE_CONTACT_MODE=api`, rebuild, test success and error states in the UI
- [ ] **P2-09** Vite dev proxy `/api` → backend for `docker-compose.dev.yml`
- [ ] **P2-10** Backend tests (supertest) + an end-to-end check through ngrok

## Phase 3: Backlog (not committed; each needs an ADR)
- [ ] Email notification on new contact message
- [ ] Serve projects from the DB (`VITE_DATA_SOURCE=api`, `GET /api/portfolio`)
- [ ] Admin panel with auth to manage projects and messages
- [ ] Visitor analytics / page-view counter
- [ ] CI: GitHub Actions lint + build + docker build
- [ ] Downloadable resume PDF in `frontend/public/`
- [ ] Real project screenshots + per-project repo / live links

---

## Open questions / content to confirm
1. **Project links:** every card currently links to `github.com/Gyan-Siingh`. The resume's GitHub link points to the `Gyan-Siingh/Codes` repo. Should cards link to specific repos?
2. **XII institute:** the resume table seems to merge the institute cell for BSc and XII, so XII is shown as Vikas College. Is that right? Years were read as BSc 2022, XII 2019, X 2017.
3. **Internship role title:** the resume doesn't give one, so the site shows "Intern" at Thrive.
4. **Internship bullet:** "[e.g., Google Maps, Stripe]" is kept verbatim, as requested. Edit it in `portfolio.json` when you're ready.
5. **Hero roles:** "Web Developer / Frontend Enthusiast / Content Creator". Change these in `profile.roles` if you like.

## Session log
| Date | Summary |
|---|---|
| 2026-10-19 | Planned with the user (React+Vite+Tailwind, Express+Postgres later, ngrok in compose, colorful design, contact form first backend feature). Built all of Phase 0 and the Phase 1 code. Lint + production build verified with Node 24 in a temp dir. Docker not installed, so container/ngrok checks are still pending. |
| 2026-10-19 | User installed Docker Desktop (29.8.2, Compose v5.6.0; installed per-user under `%LOCALAPPDATA%\Programs\DockerDesktop`). Built and started `web` only. P1-12 passed: 200 on `/`, `/healthz` ok, CSP + security headers present, gzip + immutable cache on assets, SPA fallback 200, missing asset 404, no phone number in the bundle. ngrok not started because the token is empty. |
| 2026-10-19 | User supplied the ngrok token (written to `.env`, which is gitignored). Started ngrok. The public URL returns 200 for `/` and `/healthz`, with CSP and security headers preserved. |
| 2026-10-19 | `git init` on `main`, added `.gitattributes` (LF), gitignored `*.docx`, made the first commit and pushed to private GitHub repo `Digigrow1/portfolio`. The GitHub token was used once for the push and not stored; the user should revoke it because it was pasted in chat. |
| 2026-10-19 | User signed in with `gh auth login` + `gh auth setup-git`. User tested the ngrok URL on a phone (P1-13 done). Lighthouse with Chrome (3 extra mobile runs: perf 90/93/92, so the first 88 was noise). Added `frontend/public/robots.txt` and fixed the light-mode contrast of the hero badge. Visual check at 360/768/1280 in both themes looks right. Plain `chrome --headless --window-size` can't go below ~500px wide, so use Lighthouse `--screenEmulation.*` + `fullPageScreenshot` for phone-width checks. Not yet committed. |
| 2026-10-19 | User asked for a FileChanged hook that runs a code-review subagent. An earlier session had already built it on branch `worktree-file-review-hook` (decision/0011, tested end-to-end). With the user's OK, fast-forwarded `main` to it (`ddfe77e`). Pipe-tested the watch-list script from the main checkout (43 files watched). Not pushed yet; it starts working after a Claude Code restart or `/hooks`. |
| 2026-10-19 | Committed the P1-13/P1-14 work (`robots.txt`, hero badge contrast fix, `task.md` updates) and pushed `main` to `origin` together with `ddfe77e`. |
| 2026-10-19 | Added the GitHub MCP server (`https://api.githubcopilot.com/mcp/`, HTTP) at local scope with `claude mcp add`; status Connected. The token is stored as `GITHUB_PAT` in `.env` (gitignored) and in `~/.claude.json`. It was pasted in chat, so the user should rotate it and re-run `claude mcp add` with the new one. |
| 2026-10-19 | User asked for a new GitHub repo `claude-code-portfolio`. Created it as private (`github.com/Digigrow1/claude-code-portfolio`), added it as git remote `claude-code-portfolio` (`origin` unchanged), and pushed `main` to it. `.env` and the resume `.docx` stay gitignored. |
| 2026-10-19 | User asked to make `claude-code-portfolio` public. Before switching: `git check-ignore` confirms `.env`, `.env.*` and nested `frontend/.env` / `backend/.env` are ignored (only `.env.example` is tracked); no `.env` in any commit; no token patterns (ghp_/gho_/github_pat_/ngrok/AWS/private keys) or phone number in history. MCP `run_secret_scanning` isn't available (needs GitHub Advanced Security on private repos). The GitHub MCP has no tool to edit visibility, so with the user's OK the switch used `gh repo edit --visibility public`. Checked with MCP `get_file_contents`: no `.env` on GitHub, `.gitignore` intact. The public email in `portfolio.json` is intentional (contact section). |

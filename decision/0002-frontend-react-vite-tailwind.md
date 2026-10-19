# 0002. Frontend: React + Vite + Tailwind CSS v4

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** 1

## Context
Phase 1 needs a static site that nginx can serve. Later phases will add API calls, so the codebase should make that easy. The user's resume lists HTML/CSS/JS, Tailwind and Node.

## Decision
- **React 19 + Vite 6.** `vite build` outputs static files to `dist/`, which nginx serves.
- **Tailwind CSS v4** through the `@tailwindcss/vite` plugin. Config is CSS-first (`@theme`, `@utility`, `@custom-variant` in `src/index.css`), so there is no `tailwind.config.js` or `postcss.config.js`. The original plan listed both files; Tailwind v4 makes them unnecessary.
- **No router yet.** It's a single page with anchor sections. nginx already has an SPA fallback in case routes are added later.
- **Self-hosted fonts** via `@fontsource-variable/*` (Inter, Space Grotesk), so there are no third-party requests and the CSP stays strict.
- **No icon library.** A small inline `Icon.jsx` covers what's needed.
- **ESLint 9** flat config with react-hooks and react-refresh, as in the Vite template.

## Alternatives considered
- **Plain HTML/CSS/JS:** simplest, but wiring in the API later takes more manual work.
- **Astro:** a great static-first option, but React matches the user's chosen direction and the backend phases.
- **Next.js:** brings in a Node server, which conflicts with "nginx serves static files" in Phase 1.

## Consequences
- Node is needed only at build time, inside Docker.
- Vite 6 and `@vitejs/plugin-react` 4 were picked because they work on Node 20 and 22. They can be upgraded later in their own ADR.

# 0008. Visual design: colorful / creative

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** 1

## Context
The user chose a "colorful / creative" style, which fits their background in content creation, sketching and video editing.

## Decision
- **Brand gradient:** violet `#7c3aed` → pink `#db2777` → orange `#f97316`, exposed as the `bg-brand-gradient` and `text-gradient` utilities.
- **Per-project accents:** violet, orange, cyan and pink (see `src/lib/accents.js`).
- **Type:** Space Grotesk for display text, Inter for body text, both self-hosted.
- **Dark theme by default**, unless the OS prefers light. There's a light/dark toggle, and the choice is saved in `localStorage` (wrapped in try/catch).
- **Motion:** animated background blobs, scroll-reveal sections, floating hero badges, and a rotating role line. All of it is turned off under `prefers-reduced-motion`.
- **Project cards** have generated placeholder art (gradient, dot pattern, emoji, initial) until real screenshots are added through `image` in the JSON.
- **Hero photo** is extracted from the resume `.docx` into `frontend/public/images/profile.jpg`.
- **Accessibility:** skip link, visible focus rings, `aria-*` on the menu and toggle, screen-reader text for the rotating roles, and at least AA contrast in both themes.

## Alternatives considered
- **Dark minimal or clean light:** the user didn't pick these.

## Consequences
- More visual effects to keep an eye on for performance. The blobs are CSS-only.

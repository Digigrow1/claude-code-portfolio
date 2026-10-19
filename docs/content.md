# Content guide: `portfolio.json`

All site content lives in [`frontend/src/data/portfolio.json`](../frontend/src/data/portfolio.json). Components read it only through `src/services/dataSource.js` and `src/hooks/usePortfolio.js` ([decision 0003](../decision/0003-content-as-json-data-layer.md)). Rebuild after editing: `docker compose up --build -d`.

Only put facts in here that are true. Anything uncertain goes under "Open questions" in [`task.md`](../task.md).

Top-level keys: `profile`, `highlights`, `skills`, `experience`, `otherWork`, `projects`, `education`, `certifications`, `interests`.

## `profile` (object)

| Field | Type | Notes |
|---|---|---|
| `name` | string | Full name; used in the About text, the photo alt text and the footer. |
| `shortName` | string | Shown in the navbar, hero greeting and footer. |
| `headline` | string | Short tagline. |
| `roles` | string[] | Rotating text in the hero. |
| `summary` | string | Shown in the hero and About. |
| `degree` | string | Shown in About; the hero badge shortens "Information Technology" to "IT". |
| `photo` | string | Path under `frontend/public/`, e.g. `/images/profile.jpg`. |
| `email` | string | Contact section, social row and the `mailto:` fallback of the form. |
| `phone` | string or `null` | See the privacy switch below. |
| `showPhone` | boolean | See the privacy switch below. |
| `socials` | object[] | Each has `label`, `url` and `icon`. |

**Social icons:** `icon` must be a name defined in `src/components/Icon.jsx`. Available: `github`, `linkedin`, `mail`, `phone`, `sun`, `moon`, `menu`, `close`, `external`, `send`.

**Phone privacy switch ([decision 0009](../decision/0009-privacy-hide-phone.md)):** anything in this file ends up in the public JavaScript bundle. The phone row renders only when `phone` is set **and** `showPhone` is `true`. Keep `phone` as `null` unless you want the number public.

## `highlights` (object[])

Each: `value` (e.g. `"40%"`) and `label`. Shown as stats in About; the first entry also appears in the hero.

## `skills` (object[])

Each group: `group` (heading), `icon` (an emoji) and `items` (string[]).

## `experience` (object[])

Each job: `role`, `company`, `type`, `period` and `points` (string[] of bullets).

## `otherWork` (object[])

Non-job work shown under Experience. Each: `title`, `period`, `icon` (an emoji) and `description`.

## `projects` (object[])

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique, stable identifier. |
| `title`, `subtitle` | string | Card heading and sub-heading. |
| `category` | string | Chip on the card image, e.g. `Full-stack`. |
| `accent` | string | One of the accent names below. |
| `emoji` | string | Shown in the card's placeholder art (with the first letter of `title`) when there is no `image`. |
| `description` | string | Card text. |
| `points` | string[] | Optional bullets. |
| `tags` | string[] | Technology chips. |
| `repoUrl` | string or `null` | "Code" button; hidden when empty. |
| `liveUrl` | string or `null` | "Live demo" button; hidden when empty. |
| `image` | string or `null` | Screenshot path under `frontend/public/`, e.g. `/images/<file>`. Falls back to the gradient and emoji when `null`. |

**Accent names** are defined in `frontend/src/lib/accents.js`: `violet`, `orange`, `cyan`, `pink`. An unknown name falls back to `violet`. Content stores only the name; the Tailwind classes live in `accents.js` so Tailwind can see them at build time. To add an accent, add an entry there.

To add a screenshot, put the file in `frontend/public/images/` and set `"image": "/images/<file>"`.

## `education` (object[])

Each: `qualification`, `institute`, `year`, `score`.

## `certifications` (object[])

Each: `name`, `issuer`, `year`.

## `interests` (string[])

Shown as chips in About.

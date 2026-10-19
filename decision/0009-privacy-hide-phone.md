# 0009. Keep phone number off the public site

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** 1

## Context
The resume includes a personal mobile number. The site is public through ngrok and can be scraped. Hiding the number with a flag isn't enough, because anything in `portfolio.json` ends up in the public JS bundle.

## Decision
- `profile.phone` is `null` in `portfolio.json`, and `profile.showPhone` is `false`.
- The phone row in Contact renders only when **both** are set.
- Email, LinkedIn and GitHub are shown, since those are what a portfolio is meant to share.

## Alternatives considered
- **Show the number:** a spam and privacy risk on a public tunnel.
- **Keep the number in JSON and hide it with CSS or a flag:** it would still be in the bundle.

## Consequences
- To show the phone number, set `"phone": "+91 …"` and `"showPhone": true`, then rebuild.
- Once Phase 2 is live, the contact form is the preferred channel.

# 0005. ngrok as a docker-compose service

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** 1

## Context
The site has to be reachable publicly through ngrok. The user chose to run ngrok as a container rather than on the host.

## Decision
- `docker-compose.yml` has an `ngrok` service (`ngrok/ngrok:latest`) running `http web:80`, which reaches nginx over the `portfolio_net` network.
- `NGROK_AUTHTOKEN` comes from `.env`, which is git-ignored. `.env.example` documents it.
- Extra flags go through `NGROK_ARGS`, for example `--url=<name>.ngrok-free.app` for a free static domain, so the compose file never needs editing.
- The inspector UI is published on `127.0.0.1:4040` only, not on the LAN. It shows the public URL, which can also be read with `curl localhost:4040/api/tunnels`.
- ngrok waits for `web` to be healthy before starting.

## Alternatives considered
- **ngrok on the host:** adds a manual step after every start.
- **Cloudflare Tunnel:** a good alternative, but the user specified ngrok.

## Consequences
- One `docker compose up` gives a public URL.
- On the free plan, browser visitors see ngrok's interstitial warning page once, and without a static domain the URL changes on every restart.
- `ngrok/ngrok:latest` is unpinned on purpose because the agent auto-updates its protocol. Pin it if it causes trouble.
- Because the tunnel is public, privacy matters (see 0009).

# Build context is the repo root (see docker-compose.yml) so this file can
# reach both frontend/ and nginx/.

# ---- Stage 1: build the React app --------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY frontend/ ./

# Phase switches (decision/0003). Defaults = Phase 1 static site.
ARG VITE_DATA_SOURCE=static
ARG VITE_CONTACT_MODE=mailto
ARG VITE_API_BASE_URL=/api
ENV VITE_DATA_SOURCE=$VITE_DATA_SOURCE \
    VITE_CONTACT_MODE=$VITE_CONTACT_MODE \
    VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# ---- Stage 2: serve with nginx -----------------------------------------------
FROM nginx:1.27-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/snippets/ /etc/nginx/snippets/
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

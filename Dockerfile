# Multi-stage Dockerfile for building any Explainer app
# Usage: docker build --build-arg APP=docs -t explainer-docs .
#        docker build --build-arg APP=blog -t explainer-blog .
#        docker build --build-arg APP=website -t explainer-website .

# --- Stage 1: Install dependencies ---
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/ui/package.json packages/ui/package.json
COPY packages/mdx/package.json packages/mdx/package.json
COPY apps/docs/package.json apps/docs/package.json
COPY apps/blog/package.json apps/blog/package.json
COPY apps/website/package.json apps/website/package.json
RUN pnpm install --frozen-lockfile

# --- Stage 2: Build the target app ---
FROM node:20-alpine AS builder
ARG APP=docs
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY --from=deps /app/packages/mdx/node_modules ./packages/mdx/node_modules
COPY --from=deps /app/apps/${APP}/node_modules ./apps/${APP}/node_modules
COPY . .
RUN pnpm --filter @explainer/${APP} build

# --- Stage 3: Serve with nginx ---
FROM nginx:1.28.0-alpine3.21-slim AS runtime
ARG APP=docs
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/${APP}/dist /usr/share/nginx/html
EXPOSE 80

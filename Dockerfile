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
COPY packages/thumbnail/package.json packages/thumbnail/package.json
COPY apps/docs/package.json apps/docs/package.json
COPY apps/blog/package.json apps/blog/package.json
COPY apps/website/package.json apps/website/package.json
RUN pnpm install --frozen-lockfile

# --- Stage 2: Build the target app ---
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY --from=deps /app/packages/mdx/node_modules ./packages/mdx/node_modules
COPY --from=deps /app/packages/thumbnail/node_modules ./packages/thumbnail/node_modules
COPY --from=deps /app/apps/docs/node_modules ./apps/docs/node_modules
COPY --from=deps /app/apps/blog/node_modules ./apps/blog/node_modules
COPY --from=deps /app/apps/website/node_modules ./apps/website/node_modules
COPY . .

ENV PUBLIC_WEBSITE_URL=https://ferriskey.rs
ENV PUBLIC_DOCS_URL=https://docs.ferriskey.rs
ENV PUBLIC_BLOG_URL=https://blog.ferriskey.rs

RUN pnpm  build

FROM nginx:1.28.0-alpine3.21-slim AS blog
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/blog/dist /usr/share/nginx/html
EXPOSE 8080

FROM nginx:1.28.0-alpine3.21-slim AS website
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/website/dist /usr/share/nginx/html
EXPOSE 8080

# --- Stage 3: Serve with nginx ---
FROM nginx:1.28.0-alpine3.21-slim AS docs
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/docs/dist /usr/share/nginx/html
EXPOSE 8080

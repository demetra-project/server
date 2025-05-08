FROM node:23-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
COPY package.json .
RUN npm install -g pnpm

FROM base AS deps
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4000
CMD ["pnpm", "start"]
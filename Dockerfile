FROM node:23-alpine AS base
WORKDIR /app
ENV NODE_ENV=development

# Install pnpm directly, no need for corepack
RUN npm install -g pnpm

ENV HUSKY=0

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

FROM base AS production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY package.json ./
EXPOSE 3000
CMD ["pnpm", "start"]
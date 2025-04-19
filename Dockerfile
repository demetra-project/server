FROM node:18

# install pnpm globally
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN if [ "$NODE_ENV" = "production" ]; then pnpm install --prod; else pnpm install; fi
COPY . .

EXPOSE 4000

CMD sh -c 'if [ "$NODE_ENV" = "production" ]; then pnpm run start:prod; else pnpm run start; fi'
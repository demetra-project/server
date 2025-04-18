FROM node:18

# install pnpm globally
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .

EXPOSE 4000

CMD ["pnpm", "start"]
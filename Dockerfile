FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
WORKDIR /app

FROM base AS dependencies
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY applications/web/package.json ./applications/web/
# We don't need libs/engine anymore since we refactored it into web
RUN pnpm install

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/applications/web/node_modules ./applications/web/node_modules
COPY . .
RUN pnpm --filter web build

FROM base AS production
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/applications/web/node_modules ./applications/web/node_modules
COPY --from=build /app/applications/web/build ./applications/web/build
COPY --from=build /app/applications/web/prisma ./applications/web/prisma
COPY --from=build /app/applications/web/package.json ./applications/web/package.json
COPY --from=build /app/package.json ./package.json

# Copy entrypoint script
COPY applications/web/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /app/applications/web
EXPOSE 3000

ENTRYPOINT ["entrypoint.sh"]
CMD ["pnpm", "start"]

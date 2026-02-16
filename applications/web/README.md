# Kabilio Web App

The frontend application for Kabilio URL Shortener, built with React Router 7.

## Architecture

This application follows **Domain-Driven Design (DDD)** principles, separating business logic from infrastructure and framework details.

- **Domain Layer**: `app/core/domain/` - Pure logic and interfaces.
- **Application Layer**: `app/core/application/` - Orchestration via Use Cases.
- **Infrastructure Layer**: `app/core/infrastructure/` - Prisma and database implementations.

## Development

```bash
pnpm install
pnpm db:push
pnpm db:generate
pnpm dev
```

## Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Creates a production-ready build.
- `pnpm start`: Serves the production build.
- `pnpm db:push`: Pushes schema changes to SQLite.
- `pnpm db:generate`: Generates Prisma client.
- `pnpm test`: Runs unit tests with Vitest.
- `pnpm typecheck`: Runs TypeScript type checking.

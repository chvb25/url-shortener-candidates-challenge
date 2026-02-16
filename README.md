# Kabilio URL Shortener

A high-quality, modern URL shortener built with React Router 7, Prisma, SQLite, and Tailwind CSS, following strict **Domain-Driven Design (DDD)** principles.

## Project Structure

The project has been refactored from a monorepo into a single cohesive application located in `applications/web`.

```text
applications/web/
├── app/
│   ├── components/       # Reusable UI components (Button, Input, Card, Layout)
│   ├── core/             # DDD Layers
│   │   ├── domain/       # Entities (Url) and Repository Interfaces
│   │   ├── application/  # Use Cases (Shorten, GetStats, Redirect)
│   │   └── infrastructure/# Prisma implementation of Repositories
│   ├── db/               # Database client (Prisma)
│   ├── routes/           # React Router routes (Home, Stats, Redirect)
│   └── root.tsx          # App root
├── prisma/               # Database schema
└── public/               # Static assets
```

## Tech Stack

| Technology | Description |
| --- | --- |
| **React Router 7** | Full-stack React framework for routing and data management. |
| **Prisma** | Modern ORM for type-safe database access. |
| **SQLite** | Local file-based database. |
| **Tailwind CSS** | Utility-first CSS for premium UI design. |
| **TypeScript** | Strict typing for reliability. |

## Local Setup

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Setup Environment**:
   ```bash
   cp .env.example .env
   ```

3. **Database Setup**:
   ```bash
   cd applications/web
   pnpm db:push
   pnpm db:generate
   ```

4. **Run Development Server**:
   ```bash
   pnpm dev
   ```

5. **Running Tests**:
   ```bash
   cd applications/web
   pnpm test
   ```

### Running with Docker

1. **Build and Start**:
   ```bash
   docker-compose up --build
   ```

The application will be available at `http://localhost:3000`. The SQLite database is persisted in a named volume (`sqlite_data`).

Open `http://localhost:5173` (dev) or `http://localhost:3000` (docker)

## Architecture Highlights

- **Decoupled Business Logic**: Use cases are independent of the framework and database.
- **Persistence Ignorance**: The domain layer knows nothing about Prisma; it only talks to interfaces.
- **Modern UI**: Components are built with Tailwind CSS for a professional, responsive look.

# Submission

## What I Did

- **Refactored to DDD Architecture**: Moved from a fragmented monorepo to a clean, layered architecture (Domain, Application, Infrastructure) following Domain-Driven Design principles.
- **Consolidated Tech Stack**: Migrated engine logic into a unified **React Router 7** application with **Prisma (SQLite)** and **TypeScript**.
- **Premium UI/UX**: Built a state-of-the-art UI with **Tailwind CSS**, featuring responsive layouts, modular components, and glassmorphism aesthetics.
- **Advanced Feedback & Errors**: Integrated **sonner** for toasts and implemented robust **Error Boundaries** for a seamless user experience even during failures.
- **Security & Validation**: Implemented strict URL validation rules (protocol enforcement, loopback prevention) to ensure system integrity.
- **Comprehensive Testing**: Added **Vitest** unit tests covering 100% of the core business logic and use cases.
- **Docker Ready**: Provided a production-grade multi-stage **Dockerfile** and `docker-compose` setup with persistent volumes and auto-migrations.

## What I Would Do With More Time

- **User Accounts**: Add authentication (Auth.js or custom) to allow users to persist their history and manage private links.
- **Detailed Analytics**: Track geographic data and referrer info to build interactive charts (e.g. clicks by country/browser).
- **Rate Limiting**: Implement Redis-based rate limiting to protect the creation endpoint.

## AI Usage

I used Antigravity (Google DeepMind). I worked incrementally—making small changes, asking for explanations before implementing suggestions, and validating ideas against the time constraint and actual requirements. The goal was to move faster on boilerplate and get quick feedback on patterns, while maintaining full control over architectural decisions.

I used this assistance mostly for the UI because I don't think I'm the best at it. I asked it to validate it. Also, I asked it to help me write tests. Due to my lack of experience with Docker, I hereby request that the AI execute the task, as it is a prerequisite.
- Prompt Example: *"Can you validate this UI?"*  *"Help me write a test for the domain layer. What are the most valuable assertions to include?"*  *"Can you validate this test?"*  *"Can you validate this dockerfile?"*  *"Can you validate this docker-compose file?"* 

## Feedback

The challenge was excellent! It provided enough existing logic to make the refactor meaningful while allowing total freedom on the architectural and UI decisions. Modernizing the stack to React Router 7 was a great highlight.

The requirements were clear, but it's essential to explicitly mention documentation expectations upfront for time-limited challenges. I had to decide whether to prioritize inline comments, a detailed README, or just clean, self-documenting code. I chose the latter option.

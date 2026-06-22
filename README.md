# mirror.ai

A Next.js application built with Supabase, Drizzle ORM, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **UI**: shadcn/ui + Tailwind CSS v4
- **Database**: PostgreSQL via Drizzle ORM
- **Auth & Storage**: Supabase
- **Validation**: Zod
- **Linting**: oxlint + oxfmt
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 24+ (see `.nvmrc`)
- Bun package manager

### Setup

```bash
# Install dependencies
bun install

# Copy env file and fill in values
cp .env.example .env

# Start dev server
bun run dev
```

### Available Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `bun run dev`       | Start development server |
| `bun run build`     | Production build         |
| `bun run lint`      | Lint with oxlint         |
| `bun run lint:fix`  | Lint and auto-fix        |
| `bun run fmt`       | Format with oxfmt        |
| `bun run fmt:check` | Check formatting         |
| `bun run test`      | Run tests with vitest    |

## Pre-commit Hooks

Husky runs lint-staged on every commit:

- Formats staged files with oxfmt
- Lints and auto-fixes JS/TS files with oxlint

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint.

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── ui/           # shadcn/ui components
├── lib/              # Shared utilities
│   ├── db/           # Drizzle ORM (schema, migrations)
│   ├── supabase/     # Supabase client (browser + server)
│   ├── env.ts        # Server env validation
│   └── env.client.ts # Client env validation
├── notes/            # Development learnings
├── tests/            # Vitest tests
└── public/           # Static assets
```

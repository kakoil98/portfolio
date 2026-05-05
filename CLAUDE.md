# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site with an admin section for managing portfolio content. Built with Angular 21, deployed on Vercel, with Supabase as the backend.

## Commands

```bash
# Development
npm start                    # ng serve
npm run build                # Production build
npm run build:vercel         # Vercel-optimized build (if configured)

# Testing
npm test                     # Run all Vitest tests
npm run test:watch           # Vitest in watch mode
npm run test -- --run src/app/some.spec.ts  # Run a single test file

# Linting / formatting
npm run lint                 # ESLint
```

## Architecture

- 'features' - list of pages for the app contains component, html, scss, local service.
- 'core' - main core files. singlton services, interceptors.
- 'shred' - any shared components, models, interfaces

### Routing structure

- `/` — public portfolio (home, projects, about, contact)
- `/admin` — protected admin section for managing portfolio content (requires Supabase auth)

### State & reactivity

This project is **signal-based**. Always prefer:

- `signal()`, `computed()`, `effect()` over RxJS Subjects/BehaviorSubjects for local state
- `input()` / `output()` for component I/O (not `@Input`/`@Output` decorators)
- `toSignal()` when bridging RxJS streams (e.g., Supabase realtime) into signals
- Avoid `async` pipe in templates — use `toSignal()` instead

### Supabase integration

- Client lives in a single injectable service (e.g., `SupabaseService`)
- Auth state exposed as a signal derived from `supabase.auth.onAuthStateChange`
- Admin routes protected via an Angular auth guard using the auth signal
- Row-Level Security (RLS) enforced on the Supabase side — never rely solely on frontend guards

### Component conventions

- Standalone components only (no NgModules)
- `ChangeDetectionStrategy.OnPush` on every component
- Smart/dumb split: container components own signals and Supabase calls; presentational components receive inputs only

### Design

Refer to `design.md` for visual design tokens, color palette, typography, spacing, and component style decisions. All UI work must align with `design.md`.

## Environment variables

Supabase credentials live in `environment.ts` / `environment.prod.ts` (never hardcoded):

```ts
supabaseUrl: string;
supabaseAnonKey: string;
```

For Vercel, these are set as project environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) and injected at build time.

## Deployment

- **Platform:** Vercel
- Angular SSR or static export — confirm output mode before configuring `vercel.json`
- Build output dir: `dist/portfolio/browser` (adjust if project name differs)

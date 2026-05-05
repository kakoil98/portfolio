# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site with an admin section for managing portfolio content. Built with Angular 21, deployed on Vercel, with Supabase as the backend.

## Commands

```bash
# Development
npm start                    # ng serve
npm run build                # Production build
npm run serve:ssr:portfolio  # Serve the SSR build locally (port 4000)

# Testing
npm test                     # Run all Vitest tests
npm run test:watch           # Vitest in watch mode
npm run test -- --run src/app/some.spec.ts  # Run a single test file

# Linting / formatting
npm run lint                 # ESLint
```

## Architecture

- `features/` — page-level components. Each has a `.ts`, `.html`, `.scss`, and optionally a local service.
- `core/` — singleton services, interceptors (e.g. `SupabaseService`, `AuthService`, `AuthGuard`)
- `shared/` — reusable components, models, interfaces (e.g. `ButtonComponent`, `CardComponent`, `BadgeComponent`)

### Routing structure

The public site is a **single-page scroll layout** — all sections live in `HeroComponent`. Navigation links update the URL via `Location.replaceState` and scroll to the target section using `scrollIntoView`.

| URL | Behaviour |
|-----|-----------|
| `/` | Home — top of page |
| `/skills` | Scrolls to Skills section |
| `/experience` | Scrolls to Experience section |
| `/projects` | Scrolls to Projects section |
| `/contact` | Scrolls to Contact section |
| `/projects/:id` | Project detail page (`ProjectDetailComponent`) |
| `/admin` | Protected admin section (requires Supabase auth) |
| `/admin/login` | Admin login page |

**Important:** There are no separate page routes for Skills, Experience, Projects, or Contact — they are all sections within `HeroComponent`. All five section paths load `HeroComponent`; on `ngAfterViewInit` it reads `ActivatedRoute.snapshot.url` and scrolls to the matching section.

Nav scroll is handled in `LayoutComponent.scrollTo()` using `Location.replaceState` (no router navigation, no scroll reset).

### Component file conventions

Every component uses separate files — no inline `template` or `styles`:
- `*.component.ts` — class only, references `templateUrl` and `styleUrl`
- `*.component.html` — template
- `*.component.scss` — styles

### State & reactivity

This project is **signal-based**. Always prefer:

- `signal()`, `computed()`, `effect()` over RxJS Subjects/BehaviorSubjects for local state
- `input()` / `output()` for component I/O (not `@Input`/`@Output` decorators)
- `toSignal()` when bridging RxJS streams (e.g., Supabase realtime) into signals
- Avoid `async` pipe in templates — use `toSignal()` instead

### Supabase integration

- Client lives in `SupabaseService` (`core/supabase.service.ts`)
- Auth state exposed as a signal derived from `supabase.auth.onAuthStateChange`
- Admin routes protected via `AuthGuard` using the auth signal
- Row-Level Security (RLS) enforced on the Supabase side — never rely solely on frontend guards
- Always guard browser-only calls with `if (!this.supabase.isBrowser) return;`

### Component conventions

- Standalone components only (no NgModules)
- `ChangeDetectionStrategy.OnPush` on every component
- Smart/dumb split: container components own signals and Supabase calls; presentational components receive inputs only

### Design

Refer to `design.md` for visual design tokens, color palette, typography, spacing, and component style decisions. All UI work must align with `design.md`.

Global CSS tokens are in `src/styles/tokens.scss`. Global base styles in `src/styles/global.scss`.

## Environment variables

Supabase credentials live in `environment.ts` / `environment.prod.ts` (never hardcoded):

```ts
supabaseUrl: string;
supabaseAnonKey: string;
```

For Vercel, these are set as project environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) and injected at build time.

## Git workflow

- **Never commit directly to `main`** — always create a feature branch first
- Branch naming: `feature/<short-description>` or `fix/<short-description>`
- Push the branch to origin and open a Pull Request on GitHub for review
- Do not merge or push to `main` directly, even for small changes

```bash
git checkout -b feature/my-change
git push -u origin feature/my-change
# then open a PR on GitHub
```

## Deployment

- **Platform:** Vercel
- **Mode:** Angular SSR (server-side rendering)
- Build output: `dist/portfolio/` (browser + server bundles)
- SSR entry: `dist/portfolio/server/server.mjs`

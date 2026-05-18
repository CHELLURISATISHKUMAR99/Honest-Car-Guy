# Info For You Auto

Independent car-buying podcast + shopper tools. Next.js 14 (App Router) · TypeScript · Tailwind 3.4.

## Stack

- **Framework**: Next.js 14.2 (App Router, React 18.3, RSC by default)
- **Styling**: Tailwind CSS 3.4 with CSS-variable-backed brand tokens
- **Data**: Supabase (`@supabase/ssr`) — seeded local data during scaffold
- **Payments**: Stripe (dealer packages, sponsor tiers)
- **Comms**: Twilio (SMS lead routing), Resend (transactional email)
- **Analytics**: PostHog
- **Forms / validation**: react-hook-form + zod
- **Fetching**: SWR

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in keys
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script        | What it does                       |
|---------------|------------------------------------|
| `dev`         | Next dev server                    |
| `build`       | Production build                   |
| `start`       | Run production server              |
| `lint`        | Next lint                          |
| `typecheck`   | `tsc --noEmit`                     |

## Project structure

```
src/
  app/                 App Router pages + layout
  components/          UI components, grouped by feature
  lib/
    data/              Seed data (episodes, dealers, vehicles)
    utils/             scoring.ts, cn.ts
    types.ts           Domain types
  styles/globals.css   CSS vars, .section/.btn/.card/.badge utilities
```

See `CLAUDE.md` for brand tokens, type shapes, and working agreements.

## Slash commands

Scoped to `.claude/commands/`:

- `/component` — scaffold a new UI component
- `/page` — scaffold a new App Router page
- `/episode` — add a seed Episode entry
- `/dealer` — add a seed Dealer entry
- `/api` — scaffold a route handler
- `/review-flow` — review-pass for the Car Finder flow

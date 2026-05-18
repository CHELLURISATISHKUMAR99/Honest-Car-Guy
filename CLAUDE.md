# Info For You Auto — Project Memory

## Mission
Info For You Auto is an independent, consumer-first car-buying podcast and resource hub. The site exists to help shoppers cut through dealership noise, find the right vehicle through a guided 7-step Car Finder, and connect with a small directory of vetted, transparent dealers. Editorial trust and shopper advocacy come before advertising. Sponsorships and dealer listings are clearly disclosed.

## Brand Tokens

CSS variables live in `src/styles/globals.css` and are wired into Tailwind via `tailwind.config.ts`.

| Token         | Value     | Tailwind class    | Use                                          |
|---------------|-----------|-------------------|----------------------------------------------|
| `--black`     | `#0d0d0d` | `bg-black`/`text-black` | Primary text, dark hero, footer        |
| `--cream`     | `#f5f2ee` | `bg-cream`/`text-cream` | Default page background, light cards   |
| `--red`       | `#c8321a` | `bg-red`/`text-red`     | Primary CTA, alerts, accents           |
| `--gold`      | `#c9a84c` | `bg-gold`/`text-gold`   | Premier/sponsor accents, badges        |
| `--gray`      | `#6b6b6b` | `bg-gray`/`text-gray`   | Secondary text, dividers, listed tier  |

### Fonts (loaded via `next/font/google` in `src/app/layout.tsx`)

| Family                  | Variable      | Tailwind class | Use                                     |
|-------------------------|---------------|----------------|-----------------------------------------|
| Bebas Neue              | `--font-fb`   | `font-fb`      | `.headline` — display, uppercase H1/H2 |
| DM Serif Display italic | `--font-fs`   | `font-fs`      | `.serif` — pull-quotes, editorial lead  |
| DM Sans                 | `--font-fd`   | `font-fd`      | Body copy (default)                     |

### Layout

- Section padding: **88px vertical, 5% horizontal** — exposed as `.section`.
- Max content width: `max-w-7xl` centered.
- Border radius: cards `rounded-2xl`, buttons `rounded-full`.

## TypeScript shapes

Authoritative shapes live in `src/lib/types.ts`.

```ts
export type Episode = {
  id: string;
  number: number;
  title: string;
  slug: string;
  publishedAt: string; // ISO
  durationMinutes: number;
  guest?: string;
  topic: string;
  summary: string;
  audioUrl?: string;
  artworkUrl?: string;
};

export type DealerTier = 'listed' | 'certified' | 'premier';

export type Dealer = {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  tier: DealerTier;
  specialties: string[];
  blurb: string;
  phone?: string;
  website?: string;
  yearsInBusiness?: number;
};

export type BodyStyle =
  | 'sedan' | 'suv' | 'truck' | 'minivan' | 'hatchback' | 'coupe' | 'wagon';
export type Fuel = 'gas' | 'hybrid' | 'phev' | 'ev' | 'diesel';
export type Priority =
  | 'reliability' | 'fuel-economy' | 'safety' | 'cargo'
  | 'tech' | 'performance' | 'comfort' | 'value';

export type Vehicle = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  bodyStyle: BodyStyle;
  fuel: Fuel;
  seats: number;
  msrpFrom: number;
  mpgCombined?: number;
  strengths: Priority[];
  blurb: string;
};

export type FinderAnswers = {
  budgetMax: number;
  bodyStyle: BodyStyle | 'any';
  fuel: Fuel | 'any';
  seats: number;
  primaryUse: 'commute' | 'family' | 'work' | 'adventure' | 'mixed';
  priorities: Priority[]; // 1–3 selections
  zip: string;
};
```

## Working agreements

- **Server components by default.** Only `FinderFlow` is `'use client'`.
- **No emoji** in source unless explicitly asked.
- Keep section markup consistent: `<section className="section">` → `<div className="mx-auto max-w-7xl">`.
- Buttons: `.btn .btn-primary` (red), `.btn .btn-ghost` (outline).
- Badges: `.badge .badge-gold` (premier), `.badge .badge-red` (certified), `.badge .badge-gray` (listed).
- Path alias `@/*` maps to `src/*`.

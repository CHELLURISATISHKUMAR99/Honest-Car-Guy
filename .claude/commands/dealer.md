---
description: Add a seed Dealer entry
---

Append a new `Dealer` to `src/lib/data/dealers.ts`.

Required fields: `id`, `name`, `slug`, `city`, `state`, `tier`, `specialties`, `blurb`.
Optional: `phone`, `website`, `yearsInBusiness`.

`tier` must be one of `'listed' | 'certified' | 'premier'`. Default new entries to `'listed'` unless instructed otherwise. `slug` is kebab-case `name`.

Arguments: `$ARGUMENTS` — dealer name and city/state.

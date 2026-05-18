---
description: Add a seed Episode entry
---

Append a new `Episode` to `src/lib/data/episodes.ts`.

Required fields: `id`, `number`, `title`, `slug`, `publishedAt` (ISO), `durationMinutes`, `topic`, `summary`.
Optional: `guest`, `audioUrl`, `artworkUrl`.

Bump `number` to the next sequential value. Keep `slug` kebab-case and unique.

Arguments: `$ARGUMENTS` — title or short description of the episode.

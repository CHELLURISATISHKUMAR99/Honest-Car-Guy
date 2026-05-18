---
description: Scaffold a new UI component
---

Create a new React component in `src/components/<feature>/<Name>.tsx`.

Defaults:
- Server component (no `'use client'`) unless interactivity is required.
- Typed `Props` interface above the component.
- Use brand tokens via Tailwind classes (`bg-cream`, `text-black`, `font-fb`, etc.).
- Use the `cn()` helper from `@/lib/utils/cn` to merge classNames.
- Re-use shared patterns: `.section`, `.card`, `.btn`, `.badge`.

Arguments: `$ARGUMENTS` — pass as `<feature>/<Name>` (e.g. `podcast/EpisodeHero`).

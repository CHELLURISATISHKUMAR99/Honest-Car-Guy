---
description: Scaffold a new App Router page
---

Create `src/app/<route>/page.tsx`.

Defaults:
- Server component.
- Export `metadata: Metadata` with title + description.
- Wrap content in `<section className="section">` blocks.
- Compose with components from `src/components/`.

Arguments: `$ARGUMENTS` — the route segment (e.g. `about`, `podcast/[slug]`).

---
description: Scaffold a route handler
---

Create `src/app/api/<route>/route.ts`.

Defaults:
- Export typed `GET` / `POST` handlers as needed.
- Validate request bodies with `zod`.
- Return `NextResponse.json(...)` with explicit status codes.
- Never log secrets. Read keys from `process.env`.

Arguments: `$ARGUMENTS` — route path (e.g. `leads`, `stripe/webhook`).

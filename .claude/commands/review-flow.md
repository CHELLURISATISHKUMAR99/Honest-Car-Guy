---
description: Review the Car Finder flow end-to-end
---

Audit `src/components/finder/FinderFlow.tsx` and `src/lib/utils/scoring.ts`.

Check:
1. All 7 steps render (budget → body style → fuel → seats → use → priorities → ZIP) and each has back/next handling.
2. Progress bar reflects current step / 7.
3. State shape matches `FinderAnswers` in `src/lib/types.ts`.
4. ZIP is validated (5 digits) before submit.
5. `scoreVehicles()` returns the top 5 with reason strings derived from the answers.
6. No PII is logged. Analytics events are named consistently.
7. Keyboard accessibility: focus visible, Enter advances, options reachable via Tab.

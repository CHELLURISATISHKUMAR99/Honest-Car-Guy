# Proposal: Info For You Auto — Web Platform Build

**Prepared for:** AutoInfo4U
**Prepared by:** Quad 4 Consulting
**Contact:** info@quad4consulting.com
**Date:** May 21, 2026
**Proposal valid through:** June 30, 2026

---

## 1. Executive Summary

Quad 4 Consulting has scaffolded the foundation of a consumer-first car-buying platform for AutoInfo4U — a Next.js 14 web application featuring an editorial podcast, a 7-step guided Car Finder, a tiered dealer directory with proximity matching, and a self-service dealer signup flow with a published Transparency Pledge.

This proposal documents:

- **Phase 1 — Foundation (delivered):** the complete scaffold, brand system, content surface, Car Finder, dealer directory with directions, and dealer application form.
- **Phase 2 — Operating Platform (proposed):** the database, lead capture, dealer feedback loop, and payment infrastructure required to actually run the business.
- **Phase 3 — Admin & Scale (proposed):** the admin panel, dealer dashboards, performance scoring engine, and SEO surface needed to operate at 50+ dealers.

A four-month execution plan and indicative investment figures are included in §6 and §7.

---

## 2. Background & Understanding

AutoInfo4U is building an independent, consumer-first alternative to the dealership-funded car-shopping ecosystem. The brand's promise — *honest car buying advice that works for the shopper, not the dealership* — requires that every product surface (editorial, tooling, directory) reinforce trust through transparent processes and measurable accountability.

Quad 4 Consulting was engaged to translate this editorial promise into a working web product: a platform that demonstrates the brand standard, captures shopper intent, and holds participating dealers to a published bar.

---

## 3. Phase 1 — Foundation (Delivered)

The following has been built, tested, and deployed to the AutoInfo4U development branch (`claude/create-website-files-oc06H`).

### 3.1 Brand & Platform
- Next.js 14 application (App Router, TypeScript, React Server Components)
- Brand system: five-color CSS-variable token system, three-font typographic stack (Bebas Neue / DM Serif Display Italic / DM Sans), consistent `.section` / `.btn` / `.card` / `.badge` primitives
- Production build pipeline, statically pre-rendered routes, Vercel-compatible deployment
- Full TypeScript domain model: `Episode`, `Dealer`, `Vehicle`, `FinderAnswers`, `ScoredVehicle`, `DealerMatch`

### 3.2 Public Pages
| Page | Description |
|------|-------------|
| `/` | Hero, latest episodes, 7-step finder explainer, certified dealers preview, dealer CTA |
| `/podcast` | Full episode archive with inline YouTube video embeds (click-to-play) |
| `/car-finder` | 7-step guided shopper flow with scored top-5 results and nearby dealer recommendations |
| `/dealers` | Tiered directory with Listed / Certified / Premier badging |
| `/dealers/pledge` | Public Transparency Pledge listing six dealer commitments and performance thresholds |
| `/dealers/apply` | 6-step dealer application form with tier-conditional pledge signature |
| `/packages` | Dealer and podcast sponsorship pricing tiers ($99 / $199 / $399 dealer; $500 / $1,500 / $4,500 sponsor) |
| `/not-found` | Branded 404 page |

### 3.3 Car Finder
- 7-step guided flow: Budget → Body Style → Fuel → Seats → Primary Use → Priorities → ZIP
- Step-by-step progress bar with inline validation
- Vehicle scoring algorithm with explicit reason strings against the shopper's inputs
- Dealer-proximity scoring (ZIP-region match + tier + specialty fit)
- One-click Google Maps directions to each recommended dealer

### 3.4 Dealer Onboarding (Phase 1 scope)
- Public-facing Transparency Pledge documenting the six commitments dealers sign
- Multi-step application flow with validation, pledge signature, and review screen
- Server endpoint (`POST /api/dealer-application`) with `zod` validation
- Email forwarding via Resend to the AutoInfo4U administrator when configured

### 3.5 Inline Video
- Optional `youtubeId` per episode
- Lightweight click-to-play player (thumbnail first, iframe on demand) to preserve page load performance

### 3.6 Developer Surface
- `.claude/commands/` slash commands for repeatable scaffolding (`/component`, `/page`, `/episode`, `/dealer`, `/api`, `/review-flow`)
- Path alias `@/*` → `src/*`
- `CLAUDE.md` project memory documenting brand tokens, type shapes, and working agreements
- `.env.example` documenting integration keys (Supabase, Stripe, Twilio, Resend, PostHog)

---

## 4. Phase 2 — Operating Platform (Proposed)

Phase 1 delivers a brochure-quality site capable of accepting dealer applications via email. Phase 2 turns the platform into a working business: leads are captured and routed, dealers receive routed shopper intent, shoppers are surveyed post-engagement, and revenue collection is automated.

### 4.1 Persistence Layer (Supabase)
- Schema design and migration files for `episodes`, `dealers`, `dealer_applications`, `leads`, `lead_events`, `reviews`
- Replace seed data imports with Supabase queries on server components
- Row-level security policies for public vs. admin reads
- One-time data migration of existing seed content

### 4.2 Lead Capture & Routing
- Optional email-capture screen at the end of the Car Finder ("Email me my top 5")
- Persist Car Finder submissions to `leads` table with full preferences and matched dealers
- Trigger transactional emails via Resend to the matched dealer with shopper details
- Optional SMS lead routing via Twilio for Certified+ tiers
- Acknowledgement email to the shopper with their top 5 results

### 4.3 Dealer Feedback Loop
- Scheduled survey emails to shoppers at +2 days, +14 days, and +90 days post-lead
- Public review-submission page at `/dealers/[slug]/review` with NPS, response-time, and quote-accuracy questions
- Aggregate per-dealer scorecards stored in Supabase, ready to display on dealer pages

### 4.4 Payments (Stripe)
- Stripe Checkout integration for the three dealer tiers ($99 / $199 / $399 monthly)
- Webhook handler for subscription lifecycle events (created, updated, cancelled, payment failed)
- Dealer billing status surfaced to the admin (active / past-due / cancelled)
- Sponsor inquiry flow on `/packages` with Resend forwarding (no Checkout for sponsors; treated as direct sales)

### 4.5 Authentication
- Supabase Auth for two roles: admin (AutoInfo4U staff) and dealer (approved applicants)
- Magic-link sign-in for dealers (no password)
- Protected routes: `/admin/*` and `/dealer-dashboard/*`

### 4.6 Analytics
- PostHog integration with event taxonomy for the Car Finder funnel, dealer application funnel, and outbound dealer clicks
- Custom dashboards for: Finder completion rate, lead-to-purchase conversion, dealer click-through by tier

---

## 5. Phase 3 — Admin, Dealer Dashboards & Scale (Proposed)

Once Phase 2 is producing real data, Phase 3 builds the operating tools to manage the platform and the public surface required to scale traffic.

### 5.1 Admin Panel (`/admin`)
- Dashboard with rolling KPIs: leads/week, active dealers, MRR, NPS, alerts
- Dealer list with live performance scores and tier-eligibility flags
- Per-dealer detail view (metrics, recent leads, reviews, billing status)
- Lead lifecycle tracker (submitted, replied, closed, outcome)
- Application review queue with one-click approve/reject
- Complaint review surface

### 5.2 Dealer Dashboard (`/dealer-dashboard`)
- Dealer's own performance metrics (response time, NPS, quote-accuracy)
- Their incoming leads with action status
- Listing editor (specialties, blurb, photos, hours)
- Billing portal (managed via Stripe Customer Portal)
- Threshold warnings before automatic demotion

### 5.3 Threshold & Tier Engine
- Daily scheduled job (Vercel Cron) that recalculates dealer scores
- Automatic tier demotion after 60 days below threshold
- Premier eligibility evaluation
- Notification emails for status changes

### 5.4 SEO & Content Surface
- Per-episode pages (`/podcast/[slug]`) with transcripts, schema.org Podcast markup, social sharing cards
- Per-dealer SEO pages (`/dealers/[state]/[slug]`) with reviews, metrics, and inventory
- Buying-guide article system (`/guides/[slug]`) with editorial CMS via Supabase
- `sitemap.xml`, `robots.txt`, dynamic Open Graph image generation
- Newsletter capture and Resend Audiences integration

---

## 6. Timeline

| Phase | Duration | Milestones |
|-------|----------|------------|
| Phase 1 — Foundation | **Delivered** | Scaffold, brand system, all public pages, Car Finder, application form |
| Phase 2 — Operating Platform | **6–8 weeks** | Wks 1–2: Supabase + lead capture · Wks 3–4: feedback loop · Wks 5–6: Stripe + auth · Wks 7–8: PostHog + QA |
| Phase 3 — Admin & Scale | **8–10 weeks** | Wks 1–3: Admin panel · Wks 4–5: Dealer dashboard · Wks 6–7: Scoring engine · Wks 8–10: SEO surface + transcripts |

Phases are sequential. Phase 2 can begin within one week of contract acceptance.

---

## 7. Investment

*All figures are indicative ranges based on the scope defined above. Final pricing to be confirmed in a Statement of Work after a one-hour scoping call.*

| Phase | Description | Investment |
|-------|-------------|-----------|
| **Phase 1** | Foundation build (delivered) | **$9,500** *(fixed fee)* |
| **Phase 2** | Operating platform — Supabase, leads, surveys, Stripe, auth, analytics | **$14,000 – $18,000** |
| **Phase 3** | Admin panel, dealer dashboards, scoring engine, SEO surface | **$18,000 – $24,000** |
| **Ongoing** | Maintenance retainer: hosting management, bug triage, minor feature work, content support | **$1,800 / month** *(optional, month-to-month)* |

**Excludes:**
- Third-party service fees (Vercel, Supabase, Resend, Twilio, Stripe, PostHog) — billed to AutoInfo4U directly
- Domain registration
- Branded photography or video production
- Editorial content writing (episode show notes, buying guides) — available as a separate engagement

**Payment terms:**
- Phase 1: due on acceptance of this proposal
- Phase 2 / Phase 3: 50% on phase kickoff, 50% on phase acceptance
- Ongoing retainer: monthly in advance, cancellable with 30 days' notice

---

## 8. Why Quad 4 Consulting

- **Product-engineering depth.** We build the application, the data model, and the operating surfaces as one connected system — not a handoff between a designer, a developer, and an integrator.
- **Brand-system thinking.** The site's design tokens, type ramp, and component library are documented and reusable. Future surfaces extend the system instead of re-inventing it.
- **Editorial-aware.** We've structured the platform so the Transparency Pledge isn't a marketing line — it's enforced by the same database and scoring engine that determines dealer placement.
- **Direct working relationship.** No account-management layer; you work directly with the engineer doing the work.

---

## 9. Assumptions & Dependencies

1. AutoInfo4U owns and provides the domain name and the Vercel, Supabase, Stripe, Twilio, Resend, and PostHog accounts (or authorizes Quad 4 to provision them on AutoInfo4U's behalf).
2. AutoInfo4U is responsible for editorial content (episodes, dealer copy, podcast audio/video assets) unless content services are added by separate SOW.
3. Legal documents (privacy policy, terms of service, sponsor disclosure) are provided by AutoInfo4U's legal counsel or generated via a third-party service.
4. Phase 2 and Phase 3 scope assumes no major brand redesign. Visual updates within the existing token system are included; full rebranding is out of scope.

---

## 10. Next Steps

To proceed, AutoInfo4U:

1. **Reviews this proposal** and provides feedback or approval.
2. **Schedules a 30-minute scoping call** to confirm Phase 2 priorities and finalize the Statement of Work.
3. **Provisions accounts** for Vercel, Supabase, Resend, and Stripe (Quad 4 will provide a checklist).
4. **Signs the Statement of Work and pays the Phase 1 invoice** to initiate work on Phase 2.

---

**Acceptance**

By countersigning below, AutoInfo4U accepts Phase 1 as delivered and authorizes Quad 4 Consulting to begin Phase 2 scoping.

For AutoInfo4U
______________________________  Name: ___________________  Date: __________

For Quad 4 Consulting
______________________________  Name: ___________________  Date: __________

---

*Questions about this proposal? Contact us at info@quad4consulting.com.*

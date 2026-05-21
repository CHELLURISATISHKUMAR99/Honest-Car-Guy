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

### At-a-glance: deliverables per phase

| Phase | Headline deliverables |
|-------|----------------------|
| **Phase 1 — Foundation** *(delivered)* | Source code on GitHub · Live Vercel preview · 8 public routes · Car Finder with scored matches · Transparency Pledge page · Dealer application form with Resend forwarding · Brand system docs · 60-min handoff walkthrough |
| **Phase 2 — Operating Platform** | Supabase database with migrations · Lead capture pipeline · Dealer lead-notification emails · Post-engagement survey sequence (+2 / +14 / +90 days) · Stripe Checkout for 3 dealer tiers · Subscription webhook · Supabase Auth for admin + dealers · PostHog dashboards · Staging environment · 90-min training session |
| **Phase 3 — Admin & Scale** | `/admin` panel (dashboard, dealers, leads, applications, complaints) · `/dealer-dashboard` self-service surface · Daily scoring engine with auto tier-demotion · SEO-ready per-episode and per-dealer pages · Buying-guide CMS · `sitemap.xml`, `robots.txt`, OG image generator · Newsletter capture · Operations runbook · 2-hour operator training |

Each phase ends with a working, tested release deployed to AutoInfo4U's production environment, plus the documentation and training listed in §3.7, §4.7, and §5.5.

---

## 2. Background & Understanding

AutoInfo4U is building an independent, consumer-first alternative to the dealership-funded car-shopping ecosystem. The brand's promise — *honest car buying advice that works for the shopper, not the dealership* — requires that every product surface (editorial, tooling, directory) reinforce trust through transparent processes and measurable accountability.

Quad 4 Consulting was engaged to translate this editorial promise into a working web product: a platform that demonstrates the brand standard, captures shopper intent, and holds participating dealers to a published bar.

---

## 3. Phase 1 — Foundation (Delivered)

> **Scope clarification.** Phase 1 delivers the *public-facing website only* — a brochure-quality marketing surface with a working Car Finder demo and a dealer application form that emails AutoInfo4U. There is **no database, no payment processing, no login system, no admin panel, and no automated dealer monitoring** in Phase 1. Those capabilities are scoped into Phases 2 and 3. Until then, AutoInfo4U manages dealers by editing source files and reviewing applications from their inbox.

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

### 3.7 Phase 1 Deliverables

At the close of Phase 1, AutoInfo4U receives:

| # | Deliverable | Format |
|---|-------------|--------|
| 1 | Complete source code on the `claude/create-website-files-oc06H` Git branch | GitHub repository |
| 2 | Live Vercel deployment URL (preview environment) | Public URL |
| 3 | 8 public routes + 1 server route, all production-built and statically pre-rendered where possible | Deployed application |
| 4 | Brand system documentation: color tokens, type ramp, component primitives, layout grid | `CLAUDE.md` in repo |
| 5 | Domain model: typed `Episode`, `Dealer`, `Vehicle`, `FinderAnswers`, `ScoredVehicle`, `DealerMatch` | `src/lib/types.ts` |
| 6 | Seed content: 7 placeholder episodes, 7 placeholder dealers, 8 reference vehicles | `src/lib/data/*.ts` |
| 7 | Working Car Finder with scored top-5 vehicles and proximity-ranked dealers | `/car-finder` |
| 8 | Public Transparency Pledge page | `/dealers/pledge` |
| 9 | Multi-step dealer application form with `zod` validation and Resend forwarding | `/dealers/apply` + `/api/dealer-application` |
| 10 | Inline YouTube video player on episode cards (click-to-play, performance-optimized) | `/podcast` |
| 11 | Slash-command scaffolds for repeatable content/page additions | `.claude/commands/` |
| 12 | `.env.example` with documented keys for Supabase / Stripe / Twilio / Resend / PostHog | Repo root |
| 13 | `README.md` with setup and run instructions | Repo root |
| 14 | 60-minute handoff walkthrough call (recorded) covering repo structure, deployment, content updates | Zoom / Meet |

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

### 4.7 Phase 2 Deliverables

At the close of Phase 2, AutoInfo4U receives:

| # | Deliverable | Format |
|---|-------------|--------|
| 1 | Supabase project with production schema, RLS policies, and migration files | Live database + `supabase/migrations/` in repo |
| 2 | Schema documentation diagram showing tables, relationships, indexes | PDF / Notion page |
| 3 | One-time migration script porting seed dealers/episodes into Supabase | Script + verification report |
| 4 | Lead capture wired into the Car Finder: every submission persists with full shopper preferences | `leads` table + `/api/leads` endpoint |
| 5 | Transactional email templates (lead notification to dealer, top-5 confirmation to shopper) | Resend templates + repo source |
| 6 | Survey email sequence at +2 / +14 / +90 days with public review submission page | Scheduled Resend jobs + `/dealers/[slug]/review` |
| 7 | Stripe Checkout integration for the three dealer tiers ($99 / $199 / $399) | Live Stripe products + checkout flow |
| 8 | Stripe webhook handler covering subscription lifecycle (created, updated, cancelled, failed) | `/api/stripe/webhook` |
| 9 | Supabase Auth with magic-link sign-in for dealers; admin role for AutoInfo4U staff | Live auth + protected route guards |
| 10 | Optional Twilio SMS lead routing for Certified+ tiers | `/api/leads/sms` |
| 11 | PostHog instrumentation across the Car Finder, application form, and outbound dealer clicks | Live PostHog project + event documentation |
| 12 | Pre-built PostHog dashboards: Finder funnel, application funnel, dealer CTR by tier | PostHog dashboard URLs |
| 13 | Staging environment (separate Vercel preview + Supabase project) for safe testing | Two-environment workflow |
| 14 | Updated `CLAUDE.md` and a `docs/integrations.md` covering every connected service | Repo |
| 15 | 90-minute training session: managing dealers, reviewing leads, reading PostHog dashboards | Zoom / Meet, recorded |

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

### 5.5 Phase 3 Deliverables

At the close of Phase 3, AutoInfo4U receives:

| # | Deliverable | Format |
|---|-------------|--------|
| 1 | Admin panel at `/admin` with dashboard, alerts, and pending-action queue | Authenticated route |
| 2 | Admin dealer-list view with live performance scores and tier-eligibility flags | `/admin/dealers` |
| 3 | Per-dealer detail view (metrics, recent leads, reviews, billing status) | `/admin/dealers/[id]` |
| 4 | Lead lifecycle tracker (submitted → replied → closed → outcome) | `/admin/leads` |
| 5 | Application review queue with one-click approve / reject and automatic dealer creation on approval | `/admin/applications` |
| 6 | Complaint review surface with resolution tracking | `/admin/complaints` |
| 7 | Dealer self-service dashboard at `/dealer-dashboard` (own metrics, leads, listing editor, billing portal) | Authenticated route |
| 8 | Threshold & tier engine — scheduled Vercel Cron recalculating scores daily | `/api/cron/recalculate-scores` + cron config |
| 9 | Automatic tier demotion / promotion logic with notification emails to affected dealers | Live in production |
| 10 | Per-episode SEO pages with transcripts, schema.org markup, OG images | `/podcast/[slug]` |
| 11 | Per-dealer SEO pages with public scorecard, reviews, and inventory placeholder | `/dealers/[state]/[slug]` |
| 12 | Buying-guide CMS — Supabase-backed `/guides/[slug]` with image uploads and draft/publish workflow | Live editorial surface |
| 13 | `sitemap.xml`, `robots.txt`, dynamic Open Graph image generator | Auto-deployed |
| 14 | Newsletter capture with Resend Audiences double-opt-in flow | Live |
| 15 | Operations runbook documenting tier-demotion logic, manual overrides, content workflows, incident response | `docs/runbook.md` |
| 16 | Two-hour operator training session for AutoInfo4U staff on the admin panel | Zoom / Meet, recorded |
| 17 | One-hour dealer-side training video that AutoInfo4U can share with new dealer applicants | Recorded screencast |

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

*All figures are in USD. Phase 1 is a fixed fee. Phases 2 and 3 are quoted as ranges; the upper figure reflects optional scope (Twilio SMS, sponsor-inquiry flow, full buying-guide CMS). Final pricing is confirmed in a Statement of Work after a one-hour scoping call.*

### 7.1 Phase 1 — Foundation *(delivered)*

Fixed fee. Line-item breakdown shown for transparency.

| Work item | Fee |
|-----------|----:|
| Brand system, design tokens, type ramp, base layout primitives | $1,500 |
| App Router setup + 8 public pages (Home, Podcast, Car Finder, Dealers, Pledge, Apply, Packages, 404) | $1,800 |
| Car Finder — 7-step guided flow with scoring algorithm and result page | $2,200 |
| Dealer directory + ZIP-proximity matching + Google Maps "Get directions" | $1,400 |
| Dealer application form (6 steps) + zod-validated API + Resend email forwarding | $1,400 |
| Transparency Pledge page | $400 |
| Inline YouTube video player (click-to-play) for episode cards | $400 |
| Documentation (CLAUDE.md, README, slash-command scaffolds) + 60-min recorded handoff | $400 |
| **Phase 1 total** | **$9,500** |

### 7.2 Phase 2 — Operating Platform

Quoted as a range. Items marked *(optional)* drive the upper figure.

| Work item | Fee |
|-----------|----:|
| Supabase project provisioning + schema + RLS policies + migration files | $2,500 |
| One-time migration of existing seed dealers/episodes into Supabase | included |
| Lead-capture endpoint + Car Finder result-submission flow | $2,000 |
| Email templates: lead-routing-to-dealer, top-5-confirmation-to-shopper (Resend) | $1,500 |
| Post-engagement survey sequence at +2 / +14 / +90 days + public review page | $2,000 |
| Stripe Checkout for 3 dealer tiers + subscription webhook handler + billing-status surface | $3,000 |
| Supabase Auth (admin role + dealer magic-link sign-in) + protected route guards | $1,500 |
| PostHog instrumentation + 3 pre-built dashboards (Finder funnel, app funnel, dealer CTR) | $1,500 |
| Staging environment (separate Vercel + Supabase project) + QA pass | $1,000 |
| 90-minute training session + updated documentation | $500 |
| Twilio SMS lead routing for Certified+ tiers *(optional)* | $1,500 |
| Sponsor-inquiry flow on `/packages` with Resend forwarding *(optional)* | $1,000 |
| **Phase 2 subtotal — base scope** | **$15,500** |
| **Phase 2 total — with both options** | **$18,000** |
| **Quoted range** | **$14,000 – $18,000** |

*The range floor of $14,000 reflects a slightly slimmer scope: combining the dealer + shopper email templates, skipping the staging environment, and deferring the third PostHog dashboard. The base scope of $15,500 is the recommended target.*

### 7.3 Phase 3 — Admin & Scale

| Work item | Fee |
|-----------|----:|
| Admin dashboard at `/admin` (KPIs, alerts, pending actions) | $2,500 |
| Admin dealer list with live performance scores + tier-eligibility flags | $1,500 |
| Per-dealer admin detail view (metrics, leads, reviews, billing) | $1,500 |
| Admin lead lifecycle tracker | $1,000 |
| Application review queue (approve / reject → auto-create dealer) | $1,500 |
| Complaint review surface | $1,000 |
| Dealer self-service dashboard at `/dealer-dashboard` (metrics, leads, listing editor, billing portal) | $3,000 |
| Daily scoring engine (Vercel Cron) + automatic tier demotion/promotion + dealer notifications | $2,500 |
| Per-episode SEO pages with transcripts + schema.org markup | $2,000 |
| Per-dealer SEO pages (`/dealers/[state]/[slug]`) with public scorecard | $2,000 |
| `sitemap.xml`, `robots.txt`, dynamic Open Graph image generator | $1,000 |
| Newsletter capture + Resend Audiences double-opt-in | $1,000 |
| Operations runbook + 2-hour operator training + 1-hour dealer-onboarding screencast | $1,500 |
| Buying-guide CMS — Supabase-backed `/guides/[slug]` with image upload + draft/publish *(optional)* | $3,000 |
| **Phase 3 subtotal — base scope** | **$22,000** |
| **Phase 3 total — with CMS option** | **$25,000** |
| **Quoted range** | **$18,000 – $24,000** |

*Range floor reflects deferring per-dealer SEO pages and shipping a simpler newsletter capture (no double-opt-in flow). The CMS line item is recommended once AutoInfo4U has ≥ 5 buying guides to publish; before that, MDX files in the repo are sufficient.*

### 7.4 Ongoing Retainer *(optional, post-Phase 3)*

Month-to-month, cancellable with 30 days' notice.

| Inclusion | Hours / month |
|-----------|---------------:|
| Production monitoring + incident response | up to 4 hrs |
| Bug triage and fixes | up to 4 hrs |
| Minor feature work or copy / content updates | up to 6 hrs |
| Quarterly performance + analytics review | included |
| Vendor / integration health checks | included |
| **Retainer fee** | **$1,800 / month** |

Additional hours beyond the included pool are billed at **$150 / hour** with prior written approval.

### 7.5 Investment summary

| Phase | Description | Investment |
|-------|-------------|-----------:|
| Phase 1 | Foundation *(delivered)* | **$9,500** |
| Phase 2 | Operating platform | **$14,000 – $18,000** |
| Phase 3 | Admin & scale | **$18,000 – $24,000** |
| Total project | Phases 1 + 2 + 3 | **$41,500 – $51,500** |
| Ongoing | Optional retainer | **$1,800 / month** |

### 7.6 What's excluded

The figures above do **not** include:

- **Third-party service fees** — Vercel, Supabase, Resend, Twilio, Stripe, PostHog, OpenAI (if used). Billed to AutoInfo4U directly. Indicative monthly total at low volume: ~$50–$120/month; at moderate scale: ~$200–$500/month.
- **Domain registration and renewal** — typically $12–$20/year, registered in AutoInfo4U's name.
- **Editorial content** — podcast episode show notes, buying-guide articles, dealer copy. Available as a separate engagement at $300–$600 per article.
- **Photography, video production, voice talent** — out of scope.
- **Legal documents** — privacy policy, terms of service, sponsor disclosure copy. AutoInfo4U provides these; we wire them into the site at no additional cost.
- **Major rebrands** — visual tweaks within the current token system are included in ongoing maintenance; full rebrands are quoted separately.

### 7.7 Payment terms

| Phase | Schedule |
|-------|----------|
| Phase 1 | Net 14 from acceptance of this proposal |
| Phase 2 | 50% on phase kickoff · 50% on phase acceptance (Net 14) |
| Phase 3 | 50% on phase kickoff · 50% on phase acceptance (Net 14) |
| Retainer | Monthly in advance, billed on the 1st |

Acceptance is defined as: all phase deliverables shipped to AutoInfo4U's production environment, training session completed, and AutoInfo4U countersigning the phase acceptance form. AutoInfo4U has 10 business days from delivery to request fixes before acceptance is auto-confirmed.

### 7.8 Why these numbers

For transparency, our rates reflect a senior full-stack product engineer at an indicative blended rate of **$150 / hour**. Phase 2 base scope (~103 hours) and Phase 3 base scope (~147 hours) are estimated against the line items above with a 15% buffer for revisions and QA. We do not bill for time we do not work; if a phase delivers under budget, the savings are passed to AutoInfo4U as either reduced final invoice or rolled into the next phase's scope at AutoInfo4U's election.

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

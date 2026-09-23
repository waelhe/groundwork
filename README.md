# Groundwork — Turn Business Problems Into Practical Solutions

A high-end business solutions platform for small business owners and entrepreneurs. Groundwork works as a **professional business problem-solving consultant**: it diagnoses what is actually holding a business back, separates symptoms from root causes, and builds an actionable, constraint-aware plan to improve it.

**بilingual / ثنائي اللغة (EN / AR):** The platform runs fully in English and Arabic — one-click language toggle, complete RTL layout, Arabic typography (Tajawal + IBM Plex Sans Arabic), and an Arabic-aware AI diagnosis engine that returns its full report in professional Modern Standard Arabic.

## What It Does

- **Business Diagnosis** — A 2-step guided wizard (category → targeted follow-up questions) powered by an AI engine that returns a structured diagnosis report: known facts vs. assumptions vs. things to verify, root-cause analysis, compared solutions, and a NOW → NEXT → LATER action plan with KPIs.
- **Problem Library** — 12 common real-world business problems (e.g. *"I have customers but low profits"*, *"Everything depends on me"*) with symptoms, root causes, business impact, 3 compared solutions, and implementation steps.
- **Solution Explorer** — Problem → Root Causes → Possible Solutions → Implementation → KPIs, with side-by-side solution comparison (impact / cost / complexity / time / risk).
- **Business Tools** — Interactive calculators: break-even analysis (with chart), pricing & profit curve simulator, and cost-structure analyzer (with donut chart).
- **Action Plan Board** — Prioritized actions across NOW / NEXT / LATER horizons, each with expected impact, resources, and KPIs.
- **Case Studies** — Honest before/after stories (Problem → Diagnosis → Intervention → Result → Lessons) from a bakery, a restaurant, a machine shop, and a retail boutique.

## Methodology

The platform encodes a 10-step structured problem-solving method:

1. Understand the business
2. Identify the problem
3. Separate symptoms from root causes
4. Analyze processes and dependencies
5. Identify bottlenecks, inefficiencies, risks, and opportunities
6. Generate multiple solution options
7. Compare options (impact / cost / complexity / time / resources / risk)
8. Recommend an implementation order
9. Define KPIs to measure success
10. Review and iterate

**Core principle:** never default to "sell more." The real problem may be pricing, margin, operations, retention, costs, processes, positioning, cash flow, or the business model itself.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui components
- **AI:** z-ai-web-dev-sdk (LLM-powered diagnosis engine, backend-only API route)
- **Charts:** Recharts
- **Runtime:** Bun

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev

# Open http://localhost:3000
```

The AI diagnosis endpoint lives at `src/app/api/diagnosis/route.ts` and requires the z-ai-web-dev-sdk environment to be configured.

## Project Structure

```
src/
├── app/
│   ├── api/diagnosis/    # AI diagnosis engine (LLM, backend only)
│   ├── globals.css       # Design system: navy/charcoal + electric blue, teal, amber
│   ├── layout.tsx        # Fonts (Space Grotesk + Inter), metadata
│   └── page.tsx          # Single-page platform assembly
├── components/
│   ├── sections/         # Hero, Diagnosis, Problem Library, Tools, Action Plan,
│   │                     # Case Studies, Experts, Final CTA, Footer...
│   ├── report-view.tsx   # Structured diagnosis report renderer
│   └── ui/               # shadcn/ui primitives
└── lib/
    ├── business-data.ts  # 10 problem categories + 12-problem library with full analysis
    ├── site-content.ts   # Method, principles, business areas, cases, experts
    └── diagnosis.ts      # DiagnosisReport types + safe parser
```

## Design Language

- **Palette:** Deep navy / charcoal / white, with electric blue (`#2E7CFF`), signal teal (positive), and amber (warnings & opportunities)
- **Typography:** Space Grotesk for display, Inter for body
- **Imagery:** authentic documentary-style photography of real small businesses — no private jets, no generic handshake stock photos

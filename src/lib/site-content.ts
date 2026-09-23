/**
 * Groundwork — site content: diagnostic method, principles, business areas,
 * case studies, expert profiles, and the sample action plan.
 */

export interface MethodStep {
  n: number;
  title: string;
  desc: string;
}

export interface MethodPhase {
  phase: string;
  caption: string;
  steps: MethodStep[];
}

export const methodPhases: MethodPhase[] = [
  {
    phase: "Diagnose",
    caption: "Find out what is actually happening — and why.",
    steps: [
      { n: 1, title: "Understand the business", desc: "Context, business model, real constraints: money, people, time." },
      { n: 2, title: "Identify the actual problem", desc: "Stated in numbers and facts, not vague feelings." },
      { n: 3, title: "Separate symptoms from causes", desc: "What you see is rarely what is broken." },
      { n: 4, title: "Map processes & dependencies", desc: "How work, money, and customers actually flow." },
      { n: 5, title: "Locate bottlenecks & risks", desc: "Inefficiencies, single points of failure, missed opportunities." },
    ],
  },
  {
    phase: "Decide",
    caption: "Compare real options before committing.",
    steps: [
      { n: 6, title: "Generate multiple solutions", desc: "At least two viable approaches — never just one." },
      { n: 7, title: "Compare on six axes", desc: "Impact, cost, complexity, time, resources, risk." },
      { n: 8, title: "Sequence the implementation", desc: "First things first, sized to your capacity." },
    ],
  },
  {
    phase: "Deliver",
    caption: "Implement, measure, adjust.",
    steps: [
      { n: 9, title: "Define measurable KPIs", desc: "If it can't be measured, it can't be verified." },
      { n: 10, title: "Review and iterate", desc: "Check results against targets; adjust the plan, not the goal." },
    ],
  },
];

export interface Principle {
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    title: "Systems, not symptoms",
    body: "A business is a set of connected systems. 'Low profit' is not a problem — it is a reading, produced by pricing, cost, mix, and retention systems upstream. We fix the system, not the reading.",
  },
  {
    title: "We don't default to 'sell more'",
    body: "More sales is one option among many — and often the wrong first move. The same symptoms can come from pricing, margins, retention, process, or the business model itself. Diagnosis first, prescription second.",
  },
  {
    title: "Sized for your reality",
    body: "Solutions must fit your money, your people, and your calendar. We don't recommend enterprise systems when a spreadsheet does the job, and we don't recommend AI because it's fashionable — only when it solves a real problem.",
  },
];

export const businessAreas = [
  "Business model",
  "Products & services",
  "Pricing",
  "Sales",
  "Marketing",
  "Customer acquisition",
  "Customer retention",
  "Operations",
  "Processes & workflows",
  "Finance & cash flow",
  "Costs & profitability",
  "Inventory & purchasing",
  "Human resources",
  "Team productivity",
  "Customer service",
  "Technology & digital",
  "Automation",
  "Artificial intelligence",
  "Data & reporting",
  "Local business growth",
  "Partnerships",
  "Expansion",
  "Risk & sustainability",
];

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  size: string;
  duration: string;
  image: string;
  imageAlt: string;
  problem: string;
  diagnosis: string;
  intervention: string[];
  results: { metric: string; value: string }[];
  lessons: string[];
  quote: { text: string; author: string };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "bakery",
    company: "Riverside Bakehouse",
    industry: "Artisan bakery & café",
    size: "11 staff",
    duration: "6 months",
    image: "/images/case-bakery.jpg",
    imageAlt: "Baker working in a small artisan bakery kitchen",
    problem:
      "Revenue had grown 22% over two years, yet the owner's drawings had fallen and wages were a monthly squeeze. The busier the bakery got, the worse the money felt.",
    diagnosis:
      "A product-level margin audit showed 6 of the 28 items sold below full cost — and the three worst margins were three of the best sellers, pushed hardest by display placement. Growth had quietly concentrated volume in the least profitable items. The problem was never sales. It was mix.",
    intervention: [
      "Built a contribution table for all 28 products (materials + labor minutes × loaded rate)",
      "Repriced 9 items, re-specified 4, retired 2; retrained display to lead with high-margin items",
      "Cut one wholesale account that was priced at break-even",
      "Installed a one-page weekly margin scorecard for the owner",
    ],
    results: [
      { metric: "Gross margin", value: "41% → 52%" },
      { metric: "Monthly profit", value: "+$4,800" },
      { metric: "Revenue", value: "−6% (deliberate)" },
      { metric: "Owner drawings", value: "Restored & stable" },
    ],
    lessons: [
      "Growth can hide margin erosion for years — revenue is not a health metric",
      "Bestsellers are not automatically profit-makers; the two lists must be compared deliberately",
      "Losing one break-even account improved profit — not every customer is worth keeping",
    ],
    quote: {
      text: "We spent two years trying to sell our way out of a problem that was in the price list the whole time.",
      author: "M. Alvarez, owner",
    },
  },
  {
    id: "workshop",
    company: "Halden Precision Parts",
    industry: "CNC machining & fabrication",
    size: "9 staff",
    duration: "4 months",
    image: "/images/case-workshop.jpg",
    imageAlt: "Machinist working at a machine in a small workshop",
    problem:
      "Quotes took up to nine days to go out, and roughly a third of quoting time was the owner's evenings. Jobs were being lost to faster competitors, and the owner hadn't taken a week off in three years.",
    diagnosis:
      "A one-week decision log showed 74% of interruptions were quoting approvals and final inspection sign-offs — both owner-only. The market wasn't rejecting the shop's work; the shop's response time was rejecting the market. The constraint was the owner's calendar.",
    intervention: [
      "Wrote quote-triage rules: standard jobs quoted by office admin from a price book, complex jobs only to the owner",
      "Built the price book over three weeks from past job data (240 jobs analyzed)",
      "Trained a senior machinist as QC delegate with a written inspection checklist and a $-bounded authority",
      "Introduced a 25-minute weekly production planning meeting with a 5-number scorecard",
    ],
    results: [
      { metric: "Quote turnaround", value: "9 days → 36 hours" },
      { metric: "Quotes won", value: "+22%" },
      { metric: "Owner work week", value: "68 → 51 hours" },
      { metric: "Weeks off taken", value: "2 (first in 3 years)" },
    ],
    lessons: [
      "Measuring where the boss is the bottleneck is cheaper than guessing — a decision log costs one week",
      "Delegation needs rules and bounds, not just trust: authority without limits gets taken back after the first mistake",
      "The constraint wasn't capacity — the machines had idle hours the whole time",
    ],
    quote: {
      text: "The bottleneck was never the machines. It was my signature.",
      author: "T. Halden, founder",
    },
  },
  {
    id: "boutique",
    company: "Fig & Fern Home",
    industry: "Home goods boutique",
    size: "4 staff",
    duration: "5 months",
    image: "/images/case-retail.jpg",
    imageAlt: "Owner arranging products in a small home goods boutique",
    problem:
      "Strong foot traffic and healthy first sales, but almost nobody came back. Around 12% of customers made a second purchase, and every month began from zero with ads aimed at strangers.",
    diagnosis:
      "The POS had 9,000 customer records nobody had ever contacted — no email, no loyalty mechanic, no reason to return. Retention wasn't failing; it had never been attempted. Acquisition spend was paying full price for what past customers would have cost nearly nothing.",
    intervention: [
      "Launched a simple points program on the existing POS (5th purchase = $15 credit)",
      "Started a monthly 'new arrivals' email to past customers (57% average open rate)",
      "Trained staff to offer program signup at checkout — capture rate hit 71% of transactions",
      "Re-merchandised around collections to create a natural reason to return seasonally",
    ],
    results: [
      { metric: "90-day repeat rate", value: "12% → 31%" },
      { metric: "Revenue from repeat buyers", value: "38%" },
      { metric: "Ad spend", value: "−40%" },
      { metric: "Email list", value: "5,400 reachable customers" },
    ],
    lessons: [
      "The cheapest customers you will ever acquire are the ones you already have — if you can reach them",
      "Retention is a system (capture + trigger + reason to return), not a personality trait of the shop",
      "A loyalty program on existing infrastructure costs almost nothing — it doesn't need an app",
    ],
    quote: {
      text: "We were spending $600 a month advertising to strangers while 9,000 people who already liked us heard nothing.",
      author: "J. Osei, owner",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Experts                                                             */
/* ------------------------------------------------------------------ */

export interface Expert {
  initials: string;
  name: string;
  role: string;
  color: string;
  experience: string;
  engagements: string;
  domains: string[];
  industries: string[];
  focus: string;
  method: string;
}

export const experts: Expert[] = [
  {
    initials: "MO",
    name: "Marcus Okafor",
    role: "Operations & Process Systems",
    color: "from-electric-500 to-electric-700",
    experience: "18 years — plant manager, then small-business operations consultant",
    engagements: "140+ engagements across manufacturing, food production, and trade services",
    domains: ["Process design", "Bottleneck analysis", "Quality systems", "Capacity planning"],
    industries: ["Manufacturing", "Food production", "Trades", "Logistics"],
    focus:
      "Finds where work actually waits. Most operational problems live in queues and handoffs, not in effort or attitude.",
    method: "Decision logs, process walks, point-of-use checklists — fixes that survive contact with a busy week.",
  },
  {
    initials: "DR",
    name: "Diana Reyes",
    role: "Pricing & Unit Economics",
    color: "from-signal-teal to-signal-green-deep",
    experience: "12 years — pricing consultant, formerly CFO of a regional distributor",
    engagements: "200+ pricing and product-mix engagements in retail, services, and food",
    domains: ["Price architecture", "Contribution margin", "Product mix", "Cost-to-serve"],
    industries: ["Retail", "Food & beverage", "Professional services", "E-commerce"],
    focus:
      "Replaces 'what do I charge?' with 'what does each product actually contribute?' — then rebuilds the price list from evidence.",
    method: "Contribution tables, price testing with defined thresholds, value-tier structuring.",
  },
  {
    initials: "SL",
    name: "Sofia Lindqvist",
    role: "Cash Flow & Financial Systems",
    color: "from-signal-amber to-signal-amber-deep",
    experience: "15 years — fractional CFO for 30+ small businesses",
    engagements: "Cash flow turnarounds, forecast systems, lender negotiations",
    domains: ["13-week forecasting", "Working capital", "Collections systems", "Inventory financing"],
    industries: ["Wholesale", "Construction", "Retail", "Healthcare practices"],
    focus:
      "Profit is an opinion; cash is a fact. Builds the minimal financial visibility that lets a small business make decisions instead of discoveries.",
    method: "One spreadsheet, updated weekly, understood fully by the owner — no dashboards nobody opens.",
  },
  {
    initials: "AT",
    name: "Adrian Tanaka",
    role: "Technology, Automation & Applied AI",
    color: "from-electric-400 to-signal-teal",
    experience: "10 years — SMB automation consultant, ex-operations software lead",
    engagements: "90+ automation and AI adoption projects for businesses under 50 staff",
    domains: ["Task automation", "AI opportunity assessment", "Tool selection", "Data hygiene"],
    industries: ["Services", "Retail", "Logistics", "Hospitality"],
    focus:
      "Technology only enters where a measured problem exists. Automates tasks, not people; starts with tools you already own.",
    method: "Repetitive-task inventory → one 80/20 automation → AI as a drafting assistant, human review always.",
  },
];

/* ------------------------------------------------------------------ */
/* Sample action plan (Action Plan section)                            */
/* ------------------------------------------------------------------ */

export interface PlanAction {
  what: string;
  why: string;
  impact: string;
  resources: string;
  effort: string;
  kpi: string;
}

export const samplePlan: Record<"NOW" | "NEXT" | "LATER", PlanAction[]> = {
  NOW: [
    {
      what: "Build the top-10 product margin table",
      why: "Every pricing, promotion, and product decision currently rests on guesswork.",
      impact: "High — reveals losers and winners within a week",
      resources: "Owner + bookkeeper, one spreadsheet",
      effort: "3-4 hours",
      kpi: "Top 10 products with known contribution margin",
    },
    {
      what: "Call every customer with an invoice over 30 days",
      why: "Cash already earned is the cheapest cash available.",
      impact: "Medium — typically releases thousands within two weeks",
      resources: "Owner, one afternoon, a phone",
      effort: "1 afternoon",
      kpi: "Overdue receivables balance",
    },
  ],
  NEXT: [
    {
      what: "Reprice or retire the bottom 3 products",
      why: "The margin table identifies items sold at or below cost.",
      impact: "High — permanent margin lift on every future sale",
      resources: "Owner; new price list printed",
      effort: "1-2 weeks incl. rollout",
      kpi: "Blended gross margin %",
    },
    {
      what: "Start the weekly sales hour + pipeline board",
      why: "Revenue swings come from demand that nobody manages between bursts.",
      impact: "Medium — smooths the middle of the revenue curve",
      resources: "Owner, 1 hour/week, whiteboard",
      effort: "1 hour/week",
      kpi: "Pipeline value vs. monthly target",
    },
  ],
  LATER: [
    {
      what: "Launch the customer capture + 30-day return loop",
      why: "Retention becomes possible only once past customers are reachable.",
      impact: "High — compounds every quarter thereafter",
      resources: "POS feature or simple form; monthly message template",
      effort: "2-3 weeks setup, then automated",
      kpi: "90-day repeat purchase rate",
    },
    {
      what: "Automate the single most repetitive task",
      why: "The first automation proves the pattern and returns hours immediately.",
      impact: "Medium — 3-5 hours/week recovered",
      resources: "Existing tools first; new purchase only if justified",
      effort: "2-4 weeks",
      kpi: "Hours recovered per week",
    },
  ],
};

export const planLegend = {
  NOW: {
    label: "NOW",
    window: "This week",
    desc: "Small, cheap actions that produce information or release cash immediately.",
    accent: "electric" as const,
  },
  NEXT: {
    label: "NEXT",
    window: "2-6 weeks",
    desc: "Moves that need the NOW data first — pricing, pipelines, process fixes.",
    accent: "teal" as const,
  },
  LATER: {
    label: "LATER",
    window: "This quarter",
    desc: "Structural improvements that compound: retention loops, automation, delegation.",
    accent: "amber" as const,
  },
};

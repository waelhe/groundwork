/**
 * Groundwork — core domain types for the business diagnosis engine.
 */

export type Priority = "NOW" | "NEXT" | "LATER";

export type CategoryId =
  | "sales"
  | "customers"
  | "costs"
  | "profit"
  | "operations"
  | "employees"
  | "marketing"
  | "technology"
  | "cash-flow"
  | "growth";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
}

/** A clarifying question shown in the diagnosis wizard (category-specific). */
export interface DiagnosisQuestion {
  id: string;
  label: string;
  hint: string;
  placeholder: string;
}

/** One comparable solution option inside a problem entry. */
export interface SolutionOption {
  name: string;
  approach: string;
  impact: "High" | "Medium" | "Low";
  cost: "Low" | "Medium" | "High";
  complexity: "Low" | "Medium" | "High";
  time: string;
  risk: "Low" | "Medium" | "High";
}

export interface RootCause {
  cause: string;
  explanation: string;
  frequency: "Most common" | "Frequent" | "Often hidden" | "Possible";
}

export interface ImplementationStep {
  phase: Priority;
  step: string;
  detail: string;
  owner: string;
  effort: string;
}

export interface Kpi {
  name: string;
  target: string;
  why: string;
}

export interface RiskItem {
  risk: string;
  mitigation: string;
}

/** A fully structured problem entry used by the Problem Library + Solution Explorer. */
export interface ProblemEntry {
  id: string;
  category: CategoryId;
  title: string;
  headline: string;
  symptoms: string[];
  problem: string;
  rootCauses: RootCause[];
  impact: string;
  solutions: SolutionOption[];
  recommended: { approach: string; reasoning: string; firstMove: string };
  implementation: ImplementationStep[];
  kpis: Kpi[];
  risks: RiskItem[];
}

export const categories: Category[] = [
  { id: "sales", label: "Sales", blurb: "Pipeline, conversion, deal flow, revenue consistency" },
  { id: "customers", label: "Customers", blurb: "Acquisition, retention, repeat rate, loyalty" },
  { id: "costs", label: "Costs", blurb: "Cost structure, purchasing, overhead, creep" },
  { id: "profit", label: "Profit", blurb: "Margins, pricing, product mix, unit economics" },
  { id: "operations", label: "Operations", blurb: "Processes, workflow, capacity, inventory" },
  { id: "employees", label: "Employees", blurb: "Hiring, productivity, processes, ownership" },
  { id: "marketing", label: "Marketing", blurb: "Channels, spend efficiency, positioning" },
  { id: "technology", label: "Technology", blurb: "Tools, automation, AI, digital operations" },
  { id: "cash-flow", label: "Cash Flow", blurb: "Cash conversion, timing, working capital" },
  { id: "growth", label: "Growth", blurb: "Scaling, systems, expansion, manageability" },
];

/**
 * Targeted follow-up questions per category.
 * Questions are deliberately few — only what can materially change the diagnosis.
 */
export const diagnosisQuestions: Record<CategoryId, DiagnosisQuestion[]> = {
  sales: [
    {
      id: "pattern",
      label: "Where exactly does it stall?",
      hint: "The position of the inconsistency tells us which stage is broken.",
      placeholder: "e.g. Some months 30 orders, others 8. Referrals come in waves; nothing systematic.",
    },
    {
      id: "history",
      label: "When did it start, and what changed around then?",
      hint: "Timing usually separates a market shift from an internal break.",
      placeholder: "e.g. Started ~8 months ago, after our main competitor closed / we raised prices.",
    },
    {
      id: "source",
      label: "Where do most customers come from today?",
      hint: "One dominant channel is itself a risk worth checking.",
      placeholder: "e.g. Word of mouth and one Facebook group. No real pipeline.",
    },
  ],
  customers: [
    {
      id: "return",
      label: "Roughly what share of customers buy a second time?",
      hint: "Even a rough estimate anchors the retention math.",
      placeholder: "e.g. Honestly no idea — maybe 1 in 10? We never track it.",
    },
    {
      id: "contact",
      label: "Do you have any way to reach past customers?",
      hint: "No contact data means no retention system is possible yet.",
      placeholder: "e.g. Phone numbers in the POS, but we never use them.",
    },
    {
      id: "last",
      label: "What does the customer experience after they pay?",
      hint: "Most retention problems live after the first sale, not before it.",
      placeholder: "e.g. Nothing. We thank them and that's it. No follow-up, no reason to return.",
    },
  ],
  costs: [
    {
      id: "biggest",
      label: "Which cost line grew the most in the last 12 months?",
      hint: "Cost problems are usually concentrated in 1-2 lines, not spread evenly.",
      placeholder: "e.g. Ingredients — up maybe 30%. Also delivery fuel.",
    },
    {
      id: "pricing",
      label: "What did you do to prices when those costs rose?",
      hint: "Costs rising while prices stand still is quiet margin erosion.",
      placeholder: "e.g. Raised prices once, 2 years ago. Felt we couldn't go higher.",
    },
    {
      id: "visibility",
      label: "How do you track costs today?",
      hint: "We check whether the data exists before recommending anything.",
      placeholder: "e.g. Bank statements and supplier invoices in a folder. No summary.",
    },
  ],
  profit: [
    {
      id: "margin",
      label: "Do you know your gross margin on your main products/services?",
      hint: "Unknown margins make every decision a guess.",
      placeholder: "e.g. Not really. I know total revenue and total costs, nothing per product.",
    },
    {
      id: "mix",
      label: "Which products/services take the most of your team's time?",
      hint: "Time-heavy, low-margin items are the usual suspects.",
      placeholder: "e.g. Custom orders — they take 60% of our hours but feel barely worth it.",
    },
    {
      id: "pricing",
      label: "When did you last change prices, and why?",
      hint: "Price age is one of the strongest predictors of margin problems.",
      placeholder: "e.g. Three years ago. Afraid of losing customers.",
    },
  ],
  operations: [
    {
      id: "bottleneck",
      label: "Where do things pile up and wait?",
      hint: "Queues — not effort — expose the real bottleneck.",
      placeholder: "e.g. Quotes wait for me, jobs wait for the machine, everything waits for approvals.",
    },
    {
      id: "owner",
      label: "What breaks when you take a week off?",
      hint: "This measures how much the business depends on you personally.",
      placeholder: "e.g. Everything. I haven't taken a full week off in 2 years.",
    },
    {
      id: "documented",
      label: "Which processes exist only in your head?",
      hint: "Undocumented know-how can't be delegated or improved.",
      placeholder: "e.g. Quoting, supplier ordering, how we handle complaints.",
    },
  ],
  employees: [
    {
      id: "symptom",
      label: "How does 'not following process' actually show up?",
      hint: "Mistakes, workarounds, and rework point to different causes.",
      placeholder: "e.g. Orders ship wrong, steps get skipped, everyone has their own way.",
    },
    {
      id: "clarity",
      label: "Is the process written down anywhere?",
      hint: "You can't follow what doesn't exist in a shareable form.",
      placeholder: "e.g. Partly. Some checklists, mostly verbal training.",
    },
    {
      id: "incentive",
      label: "What happens when someone does follow the process exactly?",
      hint: "If following the process is slower or harder, people rationally skip it.",
      placeholder: "e.g. Honestly it's slower. The process is from 2 owners ago.",
    },
  ],
  marketing: [
    {
      id: "spend",
      label: "What do you spend monthly, and on what exactly?",
      hint: "We map spend to channels before judging any channel.",
      placeholder: "e.g. ~$600: boosted posts, a flyer, and a local directory listing.",
    },
    {
      id: "tracking",
      label: "How do you know where a new customer came from?",
      hint: "Untracked spend can't be evaluated — or repeated on purpose.",
      placeholder: "e.g. We ask sometimes. No written record.",
    },
    {
      id: "steady",
      label: "Is marketing constant, or only when things are slow?",
      hint: "On-off marketing produces on-off sales — a systems problem, not a talent one.",
      placeholder: "e.g. Only when quiet. Then we panic-post for a week.",
    },
  ],
  technology: [
    {
      id: "goal",
      label: "What made you consider AI or new tech right now?",
      hint: "The trigger tells us whether this is a real problem or pressure to keep up.",
      placeholder: "e.g. Everyone says we should. Also quoting eats my Sundays.",
    },
    {
      id: "repetitive",
      label: "Which weekly task is the most repetitive and rule-based?",
      hint: "Repetitive, rule-based work is where automation actually pays first.",
      placeholder: "e.g. Re-entering orders into 3 systems. Chasing invoice status by email.",
    },
    {
      id: "stack",
      label: "What tools do you run on today?",
      hint: "We fit solutions into the stack you have — we don't sell rip-and-replace.",
      placeholder: "e.g. Excel, WhatsApp, a basic POS, paper job tickets.",
    },
  ],
  "cash-flow": [
    {
      id: "timing",
      label: "When does cash come in versus when bills are due?",
      hint: "Profitable businesses still fail on timing alone.",
      placeholder: "e.g. Clients pay in 45-60 days, rent and wages are due every 30.",
    },
    {
      id: "visibility",
      label: "Do you know your bank balance 4 weeks from now?",
      hint: "A 4-week cash view is the single highest-value financial habit.",
      placeholder: "e.g. No. I check the app and hope.",
    },
    {
      id: "stock",
      label: "How much cash is sitting in inventory or unpaid invoices?",
      hint: "Working capital, not profit, is usually where the cash went.",
      placeholder: "e.g. ~$40k in stock, ~$25k in invoices over 30 days old.",
    },
  ],
  growth: [
    {
      id: "strain",
      label: "What specifically is getting harder as you grow?",
      hint: '"Harder to manage" always has a concrete shape — we find it.',
      placeholder: "e.g. Errors are up, nobody knows who does what, I firefight all day.",
    },
    {
      id: "roles",
      label: "Does anyone besides you own a whole area end-to-end?",
      hint: "Growth without owners multiplies coordination cost.",
      placeholder: "e.g. No. I keep sales, purchasing, and scheduling.",
    },
    {
      id: "numbers",
      label: "Which numbers do you look at weekly?",
      hint: "Growth outpacing measurement is the classic mid-scale failure.",
      placeholder: "e.g. Revenue and bank balance. Nothing else.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Problem Library                                                     */
/* ------------------------------------------------------------------ */

export const problems: ProblemEntry[] = [
  {
    id: "customers-low-profits",
    category: "profit",
    title: "I have customers but low profits.",
    headline: "Revenue looks healthy, but almost nothing stays in the business at the end of the month.",
    symptoms: [
      "Sales are steady or even growing, yet the bank balance barely moves",
      "Everyone is busy all the time, but the effort doesn't translate into money",
      "Price competition feels like the only lever you have",
    ],
    problem:
      "The business generates sales volume, but the money earned per sale is too small to cover fixed costs and leave a profit. This is a margin and product-mix problem, not a demand problem — selling more of the same thing often makes it worse, because every extra sale adds work at the same thin margin.",
    rootCauses: [
      {
        cause: "Prices set below true cost-plus-margin",
        explanation:
          "Prices were set years ago from gut feel or by copying competitors, and were never updated as costs rose. Many items sell below their fully-loaded cost once labor and waste are included.",
        frequency: "Most common",
      },
      {
        cause: "Product mix drifted toward low-margin work",
        explanation:
          "The best-selling items happen to be the least profitable ones. Volume hides the erosion: revenue grows while blended margin quietly falls.",
        frequency: "Frequent",
      },
      {
        cause: "No per-product cost data",
        explanation:
          "Costs are only known in total, so nobody can say which product makes or loses money. Without unit economics, every pricing decision is a guess.",
        frequency: "Often hidden",
      },
    ],
    impact:
      "Every month at thin margins means: no buffer for a slow month, no money to hire help, no pay rise for you, and a business that must keep running at full speed just to stand still. It also locks you out of growth — scaling a low-margin model scales the problem.",
    solutions: [
      {
        name: "Unit economics audit",
        approach:
          "Calculate true margin for your top 10-15 products: price minus materials, direct labor, and a share of overhead. Rank them. You will usually find 2-3 items that quietly lose money.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1-2 weeks",
        risk: "Low",
      },
      {
        name: "Reprice / retire / re-spec",
        approach:
          "With the ranking in hand: raise prices on items with inelastic demand, retire items that can't be made profitable, and re-specify the rest (smaller portions, different materials, new supplier).",
        impact: "High",
        cost: "Low",
        complexity: "Medium",
        time: "2-6 weeks",
        risk: "Medium",
      },
      {
        name: "Volume push (wrong first move)",
        approach:
          "Run promotions and ads to sell more. This is the reflex answer — and usually a trap: more volume at the same thin margin adds workload and working capital while profit stays flat.",
        impact: "Low",
        cost: "Medium",
        complexity: "Low",
        time: "Ongoing",
        risk: "High",
      },
    ],
    recommended: {
      approach: "Audit first, then reprice. The unit economics audit is always first because it changes every later decision.",
      reasoning:
        "You cannot price, cut, or sell your way out of a margin problem you haven't measured. The audit is cheap (a spreadsheet and two focused evenings), it typically reveals 3-5 products priced below cost, and it converts an emotional fear ('I can't raise prices') into a concrete list. Repricing without this data risks raising prices on the wrong items — the ones your best customers actually would leave over.",
      firstMove:
        "Pull last month's sales. Take your 10 best-selling items. For each, write down price, material cost, and the minutes of work it consumes. Multiply minutes by your real labor cost (wage + ~25%). The list will almost certainly surprise you.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Build the top-10 margin table",
        detail: "One spreadsheet: item, monthly units, price, materials, labor minutes × loaded labor rate, contribution per unit.",
        owner: "Owner + bookkeeper",
        effort: "3-4 hours",
      },
      {
        phase: "NOW",
        step: "Identify losers and winners",
        detail: "Mark every item with margin % and rank. Flag anything under 20% gross margin for decision.",
        owner: "Owner",
        effort: "1 hour",
      },
      {
        phase: "NEXT",
        step: "Decide per item: reprice, re-spec, or retire",
        detail: "Reprice inelastic staples, re-spec costly-to-make items, retire the bottom 1-2. Communicate changes honestly to customers.",
        owner: "Owner",
        effort: "1-2 weeks incl. rollout",
      },
      {
        phase: "NEXT",
        step: "Add a monthly margin review",
        detail: "One page per month: revenue, gross margin %, top/bottom 3 products. Keep it small enough to actually happen.",
        owner: "Owner + bookkeeper",
        effort: "30 min/month",
      },
      {
        phase: "LATER",
        step: "Rebuild the price list around value tiers",
        detail: "Good/better/best structure so price-sensitive customers have an entry point and premium buyers can choose up.",
        owner: "Owner",
        effort: "2-4 weeks",
      },
    ],
    kpis: [
      { name: "Blended gross margin %", target: "+5-10 points within 90 days", why: "The single number that summarizes whether the fix worked." },
      { name: "Contribution per labor hour", target: "Rising month over month", why: "Protects you from 'profitable on paper, exhausting in reality' items." },
      { name: "Revenue share of top-margin products", target: "Growing share", why: "Tracks whether the mix is shifting deliberately, not by accident." },
    ],
    risks: [
      { risk: "Some customers leave after repricing", mitigation: "Expect 5-10% attrition; model it first. If a price rise still beats the lost volume, proceed. Warn loyal customers personally." },
      { risk: "The audit is never finished", mitigation: "Timebox it to two evenings with a rough 80% accuracy goal. Perfect data is not required to find a product selling at a loss." },
    ],
  },
  {
    id: "inconsistent-sales",
    category: "sales",
    title: "My sales are inconsistent.",
    headline: "Good months and bad months alternate with no pattern you can plan around.",
    symptoms: [
      "Revenue swings 40-60% between months",
      "You can't commit to hires, orders, or equipment because next month is a coin flip",
      "Stress follows the calendar: panic in slow months, overload in busy ones",
    ],
    problem:
      "Revenue arrives in unpredictable waves instead of a steady flow. The business is almost always dependent on one or two unmanaged sources — referrals, seasonality, or occasional promotions — and has no system that produces demand on purpose. Inconsistency is not bad luck; it is unmanaged demand.",
    rootCauses: [
      {
        cause: "Single-source dependency",
        explanation:
          "Most sales come from one channel (word of mouth, one platform, one big client). When it pulses, the whole business pulses with it.",
        frequency: "Most common",
      },
      {
        cause: "Marketing only happens when things are slow",
        explanation:
          "Activity is switched on in a panic during quiet months and abandoned when busy. The pipeline is always a reflection of what you did 30-60 days ago — which was nothing, because you were busy.",
        frequency: "Frequent",
      },
      {
        cause: "No pipeline visibility",
        explanation:
          "There is no count of leads, quotes, or pending orders at any moment, so swings are only visible after the bank statement arrives.",
        frequency: "Often hidden",
      },
    ],
    impact:
      "Cash planning becomes guesswork, suppliers and staff get whiplash, and every slow month triggers reactive discounting that trains customers to wait for deals. Long term, volatility costs more than low sales would: you can't build anything on a foundation that keeps moving.",
    solutions: [
      {
        name: "Steady baseline marketing",
        approach:
          "A small, boring, always-on routine: weekly outreach, monthly email to existing contacts, one referral ask per delivered job. Consistency beats brilliance.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "Starts working in 4-8 weeks",
        risk: "Low",
      },
      {
        name: "Pipeline board",
        approach:
          "A simple tracker (even a whiteboard) of leads → quotes → won/lost, reviewed weekly. Makes demand visible before it becomes revenue.",
        impact: "Medium",
        cost: "Low",
        complexity: "Low",
        time: "Set up in a day",
        risk: "Low",
      },
      {
        name: "Smooth revenue with retainers or subscriptions",
        approach:
          "Convert some customers to monthly plans: maintenance packages, standing orders, service contracts. Recurring revenue flattens the curve structurally.",
        impact: "High",
        cost: "Low",
        complexity: "Medium",
        time: "4-12 weeks",
        risk: "Medium",
      },
    ],
    recommended: {
      approach: "Build the always-on baseline first, add the pipeline board immediately, then negotiate 2-3 retainers with your steadiest customers.",
      reasoning:
        "Retainers change the structure of revenue, but they take weeks to negotiate and can't be forced. The baseline routine and pipeline board cost almost nothing and start this week — they smooth the middle of the distribution while the retainers raise the floor. Attacking volatility requires both: a floor (recurring) and a steady inflow (routine).",
      firstMove:
        "Write down where last month's customers actually came from. Then pick the ONE routine you can sustain weekly forever — even in your busiest week — and schedule it as a fixed appointment.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Map last 6 months of demand sources",
        detail: "For each month: how many customers, from which source. This alone usually reveals the dependency.",
        owner: "Owner",
        effort: "2 hours",
      },
      {
        phase: "NOW",
        step: "Start the weekly sales hour",
        detail: "One protected hour, same slot every week: follow up open quotes, ask one customer for a referral, send the monthly update.",
        owner: "Owner",
        effort: "1 hour/week",
      },
      {
        phase: "NEXT",
        step: "Stand up the pipeline board",
        detail: "Columns: new lead / quote sent / follow-up due / won / lost. Review every Friday. Use a whiteboard or a single spreadsheet — no CRM yet.",
        owner: "Owner + salesperson if any",
        effort: "30 min/week",
      },
      {
        phase: "NEXT",
        step: "Offer a retainer to your 3 most regular customers",
        detail: "Package what they already buy monthly at a small discount for commitment. Even two acceptances meaningfully raise the floor.",
        owner: "Owner",
        effort: "3-4 conversations",
      },
      {
        phase: "LATER",
        step: "Add one measurable new channel",
        detail: "Only after the baseline is stable: test one channel for 90 days with a fixed budget and a written success threshold.",
        owner: "Owner",
        effort: "90-day test",
      },
    ],
    kpis: [
      { name: "Month-over-month revenue swing", target: "Under ±15% within 2 quarters", why: "The core measure of whether volatility is actually falling." },
      { name: "Pipeline value (quotes outstanding)", target: "At least 1.5× monthly revenue target", why: "Leading indicator — it predicts next month before it happens." },
      { name: "Recurring revenue share", target: "20-30% of monthly revenue", why: "Structural floor under the whole business." },
    ],
    risks: [
      { risk: "The weekly routine collapses during a busy stretch", mitigation: "Make it one hour, non-negotiable, and tied to an existing habit (e.g. right after Friday closing). A collapsed routine restarted Monday still works; an abandoned one doesn't." },
      { risk: "Retainer discount eats the margin gained", mitigation: "Cap discounts at 5-8% and only for upfront monthly commitment. Model it against your top-10 margin table first." },
    ],
  },
  {
    id: "no-repeat-customers",
    category: "customers",
    title: "Customers buy once and don't return.",
    headline: "Foot traffic and first sales are fine — the same faces just never come back.",
    symptoms: [
      "You're always marketing to strangers",
      "Return rate feels low, but you've never measured it",
      "Acquisition keeps getting more expensive",
    ],
    problem:
      "The business is effective at winning a first sale and ineffective at earning the second. Since selling to an existing customer costs a fraction of winning a new one, the economics of the whole business degrade as it grows — you are refilling a leaking bucket at full price, forever.",
    rootCauses: [
      {
        cause: "No way to reach past customers",
        explanation:
          "There is no email list, phone log, or loyalty mechanism. Even a delighted customer cannot be contacted, so returning depends entirely on them remembering you.",
        frequency: "Most common",
      },
      {
        cause: "Nothing happens after the sale",
        explanation:
          "No follow-up, no check-in, no reason engineered to return. The relationship ends at the receipt — the customer has no trigger to come back.",
        frequency: "Frequent",
      },
      {
        cause: "One-dimensional offering",
        explanation:
          "The business sells a single-need product with no natural second purchase: no consumables, no next tier, no related category, no seasonality.",
        frequency: "Possible",
      },
    ],
    impact:
      "Acquisition cost is paid on 100% of revenue instead of 30-40%, so margins stay permanently depressed. Word of mouth never compounds because past customers are invisible. And growth requires ever more marketing spend — the treadmill speeds up as you run.",
    solutions: [
      {
        name: "Capture + first-return loop",
        approach:
          "Collect a contact point at every sale (POS prompt, QR on receipt, checkout form), then run one simple automated loop: thank-you at 48 hours, come-back offer at 30 days.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "2-3 weeks to set up",
        risk: "Low",
      },
      {
        name: "Loyalty mechanics",
        approach:
          "A punch card or points rule built on your existing POS. Not fancy — just visible, instant, and honest. Fifth purchase = something real.",
        impact: "Medium",
        cost: "Low",
        complexity: "Low",
        time: "1 week",
        risk: "Low",
      },
      {
        name: "Second-purchase product design",
        approach:
          "Deliberately add a natural next purchase: refills, maintenance, accessories, service plans, seasonal editions. Retention becomes part of the offer, not just the marketing.",
        impact: "High",
        cost: "Medium",
        complexity: "Medium",
        time: "1-3 months",
        risk: "Medium",
      },
    ],
    recommended: {
      approach: "Start with capture + the 30-day loop, layer loyalty mechanics on top, and design the second purchase once you can actually reach customers.",
      reasoning:
        "Everything else is impossible without contact data — loyalty programs and follow-ups both depend on knowing who bought. The capture-and-loop system is cheap, fast, and immediately measurable. Product design for repeat purchase is the strongest long-term fix but takes real thought; do it once you can see who returns and why.",
      firstMove:
        "Count last month's customers and estimate what percentage you could contact today. If the answer is 'almost none', fixing that is your first project — everything else follows from it.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Turn on contact capture at every sale",
        detail: "Add the question to checkout, receipt, or booking flow. Aim for 60%+ of transactions captured within a month.",
        owner: "Owner + frontline staff",
        effort: "1 week to habit",
      },
      {
        phase: "NOW",
        step: "Define one honest come-back reason",
        detail: "A real trigger: new stock, seasonal service, 'time to reorder', or a simple thank-you with substance. No gimmick discounts yet.",
        owner: "Owner",
        effort: "2 hours",
      },
      {
        phase: "NEXT",
        step: "Run the 30-day loop manually if needed",
        detail: "Even a manual weekly batch of messages to last month's buyers beats automation that never ships. Automate once the message works.",
        owner: "Owner or admin",
        effort: "1 hour/week",
      },
      {
        phase: "NEXT",
        step: "Measure repeat rate monthly",
        detail: "Buyers this month who also bought in the previous 90 days. One number, on one page.",
        owner: "Owner",
        effort: "30 min/month",
      },
      {
        phase: "LATER",
        step: "Design the natural second purchase",
        detail: "Workshop the question: 'What would a delighted customer naturally need next?' Add one such item or service per quarter.",
        owner: "Owner + team",
        effort: "Ongoing quarterly",
      },
    ],
    kpis: [
      { name: "90-day repeat purchase rate", target: "From baseline to 25-30%", why: "The definitive retention metric — small moves here transform acquisition economics." },
      { name: "Contact capture rate", target: "60%+ of transactions", why: "The enabling metric; without it no retention system can exist." },
      { name: "Revenue share from returning customers", target: "35%+ within 2 quarters", why: "Ties retention directly to money, not vanity activity." },
    ],
    risks: [
      { risk: "Customers feel spammed by follow-ups", mitigation: "Cap contact at one message per 30 days unless they respond. Make every message genuinely useful — reorder reminders and new-stock notes outperform discount blasts." },
      { risk: "Staff forget to capture contacts", mitigation: "Make capture part of the sale script, and show the team the growing list monthly. What gets celebrated gets done." },
    ],
  },
  {
    id: "rising-costs",
    category: "costs",
    title: "My costs keep increasing.",
    headline: "Every month the same work costs more to deliver, and the difference comes out of your pocket.",
    symptoms: [
      "Supplier invoices climb every quarter",
      "You work more for the same result",
      "Cutting anything feels like it would break the business",
    ],
    problem:
      "Costs rise faster than prices, and the gap widens silently. Individually each increase looks small and unavoidable — fuel, ingredients, software, wages — but compounded they eat the margin. The problem is rarely one big cost; it is the absence of a system that notices and responds to cost changes.",
    rootCauses: [
      {
        cause: "Prices are pinned, costs float",
        explanation:
          "Suppliers reprice automatically; customer prices were set once and defended out of fear. The business absorbs every shock in the supply chain by default.",
        frequency: "Most common",
      },
      {
        cause: "No cost line visibility",
        explanation:
          "Costs are seen only as a total at month end, so no one can say which line grew or why. Aggregate numbers hide the culprit.",
        frequency: "Frequent",
      },
      {
        cause: "Creep and waste",
        explanation:
          "Slow accumulation: unused subscriptions, generous portions, rework, rush delivery, spoilage. Each is too small to fight, together they are a margin hole.",
        frequency: "Often hidden",
      },
    ],
    impact:
      "The business becomes a shock absorber for the whole supply chain. Every supplier increase is a pay cut for you. Within a year or two, a healthy business can slide to break-even without any single decision being wrong — which is exactly why it feels so confusing.",
    solutions: [
      {
        name: "Cost line dashboard",
        approach:
          "Twelve monthly cost lines in one spreadsheet, last 12 months. Watch percentages, not absolutes. The culprit lines announce themselves.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1 week",
        risk: "Low",
      },
      {
        name: "Supplier reset",
        approach:
          "Re-quote your top 5 spend categories annually; renegotiate with incumbents using real quotes. Loyalty is worth something — but it should be priced, not assumed.",
        impact: "High",
        cost: "Low",
        complexity: "Medium",
        time: "2-4 weeks",
        risk: "Low",
      },
      {
        name: "Cost-linked price formula",
        approach:
          "Define a rule: when input costs on an item rise more than X%, price moves by Y% at next order. Publish the policy to customers once; then it's mechanics, not confrontation.",
        impact: "High",
        cost: "Low",
        complexity: "Medium",
        time: "3-6 weeks",
        risk: "Medium",
      },
    ],
    recommended: {
      approach: "Dashboard first, then supplier reset on the top 3 lines, then the pricing formula to stop absorbing future increases.",
      reasoning:
        "Attacking costs without visibility produces random cuts that damage quality and morale. The dashboard finds where the money actually goes — usually 2-3 lines explain 80% of the increase. The supplier reset captures quick wins while they're fresh, and the price formula fixes the structural asymmetry: costs will rise again, and this time the response is automatic.",
      firstMove:
        "List your top 10 cost lines from last month with the amount from the same month last year. Compute the change. Circle anything up more than 10% — those circles are your project list.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Build the 12-line cost dashboard",
        detail: "Categories: COGS materials, wages, rent, utilities, transport, software, marketing, fees, insurance, maintenance, other. 12 months of history.",
        owner: "Owner + bookkeeper",
        effort: "3-4 hours",
      },
      {
        phase: "NOW",
        step: "Kill the leaks",
        detail: "Cancel unused subscriptions, fix portion standards, set rework and spoilage targets. Fast, visible wins create momentum.",
        owner: "Owner + team",
        effort: "1 week",
      },
      {
        phase: "NEXT",
        step: "Re-quote top 5 spend categories",
        detail: "Get two competing quotes per category, then talk to incumbents. Switch or renegotiate on facts.",
        owner: "Owner",
        effort: "2-4 weeks elapsed",
      },
      {
        phase: "NEXT",
        step: "Write the price-adjustment rule",
        detail: "One paragraph: trigger, size, frequency, and how customers are told. Apply it to new orders first.",
        owner: "Owner",
        effort: "2 hours + rollout",
      },
      {
        phase: "LATER",
        step: "Quarterly cost review ritual",
        detail: "Every quarter: refresh dashboard, check creep lines, one renegotiation or one product re-spec. Costs never stop rising; the response just becomes routine.",
        owner: "Owner",
        effort: "2 hours/quarter",
      },
    ],
    kpis: [
      { name: "Cost as % of revenue (by line)", target: "Top 3 lines down 3-5 points", why: "Normalizes for growth — the honest way to see if costs are truly under control." },
      { name: "Gross margin %", target: "Recovered to 12-month peak", why: "The net result of all cost and price moves in one number." },
      { name: "Supplier price change log", target: "Every increase documented and responded to", why: "Turns passive absorption into a deliberate decision each time." },
    ],
    risks: [
      { risk: "Cutting quality along with costs", mitigation: "Only cut from lines customers can't perceive, or re-spec so the customer-visible outcome stays identical. Never cut the 20% of cost that drives the value you charge for." },
      { risk: "Incumbent supplier relationship sours", mitigation: "Lead with the quotes and ask them to match. Most will meet you partway — and respect the discipline." },
    ],
  },
  {
    id: "owner-dependency",
    category: "operations",
    title: "Everything depends on me.",
    headline: "Sales, decisions, quality, ordering — if you're absent, the business holds its breath.",
    symptoms: [
      "No real vacation in years; you answer calls on days off",
      "Decisions queue up waiting for you",
      "You're the only one who can quote, order, or fix things",
    ],
    problem:
      "The owner is the operating system of the business. All critical flows — information, decisions, approvals, know-how — route through one person. This caps the business at the owner's available hours, creates constant firefighting, and makes every absence risky. The business has a single point of failure, and it is you.",
    rootCauses: [
      {
        cause: "Know-how lives only in the owner's head",
        explanation:
          "Quoting rules, supplier logic, what's 'right' — none of it is written down, so none of it can be delegated. Every task defaults back to the owner.",
        frequency: "Most common",
      },
      {
        cause: "No decision boundaries",
        explanation:
          "There are no rules for what staff may decide alone. The safe move is always to ask the owner — so the owner becomes the bottleneck of every small decision.",
        frequency: "Frequent",
      },
      {
        cause: "Delegation without backup",
        explanation:
          "Tasks were handed over without checklists or authority, went wrong once, and were taken back. The lesson learned was 'they can't do it'; the real lesson was 'it was never set up to work'.",
        frequency: "Frequent",
      },
    ],
    impact:
      "Revenue is capped by your calendar, stress is chronic, and the business is unsellable and uninsurable as an asset. A single illness becomes an operational crisis. Growth makes it worse: every new customer adds another thread that only you can pull.",
    solutions: [
      {
        name: "Decision rules card",
        approach:
          "One page: what staff decide alone (with limits), what they decide then report, what they escalate. Kills the small-decision queue.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1 week",
        risk: "Low",
      },
      {
        name: "Write down the 5 most repeated processes",
        approach:
          "Quoting, ordering, opening, closing, complaint handling — as one-page checklists. Not manuals. Film yourself doing it once and transcribe.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "2-4 weeks",
        risk: "Low",
      },
      {
        name: "Delegation ladder",
        approach:
          "For each critical area: I do it → I do it, they watch → they do it, I watch → they do it, I check weekly → they own it. Climb one rung at a time.",
        impact: "High",
        cost: "Medium",
        complexity: "Medium",
        time: "2-4 months",
        risk: "Medium",
      },
    ],
    recommended: {
      approach: "Decision rules and the first two process checklists first — they free the most hours this month — then climb the delegation ladder on quoting.",
      reasoning:
        "The bottleneck is not effort, it's routing: everything routes through you. Decision rules re-route the small stuff immediately, and checklists make the big stuff transferable. Quoting usually comes first because it's the most frequent owner-only task that blocks revenue. Delegation needs the ladder because jumping straight to 'you own it' is what failed last time.",
      firstMove:
        "For one week, log every interruption and every decision someone waited on you for. Most owners find 60-70% of the queue is the same 3-4 decision types — that list is your decision rules card, waiting to be written.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Log the decision queue for one week",
        detail: "Every 'can you approve / what about / how do I' moment, on paper. Group into types.",
        owner: "Owner",
        effort: "10 min/day for a week",
      },
      {
        phase: "NOW",
        step: "Write and publish the decision rules card",
        detail: "Decide alone (with $ limits) / decide and report / ask first. Discuss it with the team — their input makes it real.",
        owner: "Owner + team",
        effort: "2 hours + a team meeting",
      },
      {
        phase: "NEXT",
        step: "Checklist the top 2 repeated processes",
        detail: "Pick the two you do most often. One page each, with photos where useful. Hand them over with supervision.",
        owner: "Owner + chosen delegate",
        effort: "2-3 weeks",
      },
      {
        phase: "NEXT",
        step: "Take one full day off with the rules live",
        detail: "A deliberate test. Note what still comes back to you — those items are the next checklist.",
        owner: "Owner",
        effort: "1 day (and recover it)",
      },
      {
        phase: "LATER",
        step: "Name an area owner per domain",
        detail: "Sales / operations / purchasing each get one accountable person with a weekly 30-minute review with you — review, not approval.",
        owner: "Owner",
        effort: "Ongoing, 2 hours/week",
      },
    ],
    kpis: [
      { name: "Owner hours in the business", target: "Down 15-25% within a quarter", why: "The scarce resource being freed — the point of the whole exercise." },
      { name: "Decisions escalated per week", target: "Down 70%+ from baseline", why: "Direct measure of whether the decision rules are working." },
      { name: "Processes with a written checklist", target: "5 critical processes in 90 days", why: "Leading indicator of transferability — the asset becoming a business." },
    ],
    risks: [
      { risk: "Delegate errors damage a customer relationship", mitigation: "Set check limits (e.g. quotes under $X go out freely, above get reviewed for the first month). Errors within limits are tuition; errors without limits are negligence — design for the first, prevent the second." },
      { risk: "Team resists the new authority", mitigation: "Involve them in writing the rules and the checklists. People follow systems they helped design." },
    ],
  },
  {
    id: "processes-not-followed",
    category: "employees",
    title: "My employees are not following processes.",
    headline: "You taught the way things should be done — and then watch it get done differently anyway.",
    symptoms: [
      "The same mistakes keep recurring",
      "Each person has their own version of 'how we do it'",
      "Quality depends on who happens to be working",
    ],
    problem:
      "Documented or taught processes exist on paper but not in daily practice. The reflex is to blame attention or attitude — but when capable, willing people consistently skip a process, the process itself is usually the problem: it's outdated, slower than the workaround, or was never truly taught.",
    rootCauses: [
      {
        cause: "The process is harder than the workaround",
        explanation:
          "People rationally take the faster path. If the 'correct' way adds clicks, steps, or waiting, the workaround will win every time — not from defiance, but from logic.",
        frequency: "Most common",
      },
      {
        cause: "Process is invisible at the moment of work",
        explanation:
          "The steps live in a binder or a folder, not at the workstation. In the flow of work, nobody leaves the job to look something up — they work from memory.",
        frequency: "Frequent",
      },
      {
        cause: "Training was 'watch me once'",
        explanation:
          "The process was demonstrated, never practiced or checked. Nobody confirmed the person could actually execute it — so 'trained' meant 'present'.",
        frequency: "Frequent",
      },
    ],
    impact:
      "Quality becomes a lottery, customers notice the inconsistency, and the owner stays trapped in checking everyone's work. Rework consumes paid hours, and good employees leave because competent people hate producing sloppy results. Every future hire inherits the same chaos.",
    solutions: [
      {
        name: "Process rebuild with the team",
        approach:
          "One session per process: the people doing the work rewrite the steps as they actually should be. Remove every step that doesn't earn its place.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1-2 weeks per process",
        risk: "Low",
      },
      {
        name: "Point-of-use checklists",
        approach:
          "The process lives where the work happens: laminated card at the station, checklist inside the tool, photos on the wall. If it's not visible, it doesn't exist.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "Days",
        risk: "Low",
      },
      {
        name: "First-time-right training",
        approach:
          "New process taught as: I do, we do, you do — with a sign-off when performed correctly three times unsupervised. Competence, not attendance.",
        impact: "Medium",
        cost: "Low",
        complexity: "Medium",
        time: "2-3 weeks",
        risk: "Low",
      },
    ],
    recommended: {
      approach: "Start with the one process whose failure costs you the most. Rebuild it with the team, post it at the point of use, retrain with sign-off. Prove the model on one, then repeat.",
      reasoning:
        "Fixing all processes at once fails — it becomes a project that competes with daily work and loses. One critical process, rebuilt by the team that runs it, proves that following the process is actually easier than the workaround. That first success gives you the template and the credibility for the rest.",
      firstMove:
        "Pick the process whose failure hurts most. Ask the two people who run it daily: 'Where does this process fight you?' Their answer is the rebuild agenda.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Choose the one process to fix first",
        detail: "Criteria: frequency × cost of failure. Usually order entry, production handoff, or quality checks.",
        owner: "Owner",
        effort: "30 min",
      },
      {
        phase: "NOW",
        step: "Team rebuild session",
        detail: "90 minutes with the people who do the work. Map the real steps, cut the pointless ones, simplify the painful ones.",
        owner: "Owner + doers",
        effort: "90 min",
      },
      {
        phase: "NEXT",
        step: "Post it at the point of use",
        detail: "One page or one card, with photos. At the station, inside the tool, where the work happens.",
        owner: "Owner + team",
        effort: "2 hours",
      },
      {
        phase: "NEXT",
        step: "Retrain with the 3× sign-off",
        detail: "Everyone who does the process performs it correctly three times unsupervised. Their signature confirms competence.",
        owner: "Owner + supervisor",
        effort: "1 week",
      },
      {
        phase: "LATER",
        step: "Roll the model across the next 4 processes",
        detail: "One per fortnight, same pattern: rebuild → post → retrain. Stop when quality stops depending on who's on shift.",
        owner: "Owner",
        effort: "Ongoing, 6-8 weeks",
      },
    ],
    kpis: [
      { name: "First-time-right rate", target: "85%+ within 6 weeks", why: "Direct measure of whether the process now works in practice, not on paper." },
      { name: "Rework hours per week", target: "Down 50%", why: "Converts process quality into recovered payroll — money, not just tidiness." },
      { name: "Process compliance spot-checks", target: "9/10 checks pass", why: "Light-touch confirmation that the fix stuck after the novelty faded." },
    ],
    risks: [
      { risk: "Team hears 'you're doing it wrong' and disengages", mitigation: "Frame and run it as 'the process failed you, let's fix it'. They set the steps; you protect the standard. Blame the process, never the person." },
      { risk: "The simplified process breaks an upstream habit", mitigation: "Walk one full order through the new process end-to-end before full rollout — a 30-minute dress rehearsal catches 90% of integration problems." },
    ],
  },
  {
    id: "cash-tight-despite-sales",
    category: "cash-flow",
    title: "Sales look fine, but I'm always short on cash.",
    headline: "The P&L says you're profitable — the bank account disagrees, every single month.",
    symptoms: [
      "Revenue is decent, yet paying wages is a monthly scramble",
      "Supplier balances keep rolling forward",
      "You personally delay your own drawings",
    ],
    problem:
      "The business earns profit on paper but converts it to cash too slowly — or not at all, because the cash is trapped in inventory and unpaid invoices. Profit is an opinion formed by accounting rules; cash is the fact. A profitable business with poor cash conversion still goes broke.",
    rootCauses: [
      {
        cause: "Slow customer payments",
        explanation:
          "Invoices go out late, get followed up never, and are paid in 45-60 days. Every week of payment delay is a week of interest-free credit you give away — funded by your own pocket.",
        frequency: "Most common",
      },
      {
        cause: "Cash trapped in inventory",
        explanation:
          "Stock bought 'just in case' sits on shelves. The money exists — it's just wearing a different costume. Over-buying is the most common self-inflicted cash drain in product businesses.",
        frequency: "Frequent",
      },
      {
        cause: "No forward cash view",
        explanation:
          "Nobody knows what the bank balance will be in four weeks. Surprises are guaranteed, and every surprise is handled with panic borrowing or missed discounts.",
        frequency: "Frequent",
      },
    ],
    impact:
      "Growth makes it worse — every new sale demands cash for materials and wages weeks before payment arrives, so winning more business can actually deepen the hole. The business pays late fees, misses early-payment discounts, and burns owner energy on juggling instead of building.",
    solutions: [
      {
        name: "13-week cash forecast",
        approach:
          "One spreadsheet: money in / money out, week by week, 13 weeks ahead. Updated every Friday, 20 minutes. It converts anxiety into arithmetic.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1 week to build",
        risk: "Low",
      },
      {
        name: "Collections routine",
        approach:
          "Invoice same-day, statement at day 14, personal call at day 30, work stops at day 45. Payment behavior follows the loudest consistent signal you send.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "Immediate effect",
        risk: "Low",
      },
      {
        name: "Inventory and purchasing reset",
        approach:
          "Set reorder points on actual sales velocity, kill dead stock with a one-time clearance, and negotiate smaller, more frequent supplier deliveries.",
        impact: "High",
        cost: "Low",
        complexity: "Medium",
        time: "4-8 weeks",
        risk: "Medium",
      },
    ],
    recommended: {
      approach: "Build the 13-week forecast first, tighten collections second, then reset purchasing. Forecast → collect → prevent.",
      reasoning:
        "The forecast tells you exactly when the gaps arrive, which turns a vague dread into a schedule you can act on — and often reveals the crisis is smaller (or arrives later) than feared. Collections releases cash already earned, usually the fastest money available. Purchasing reset stops the leak at its source but takes longer, so it runs third.",
      firstMove:
        "List every unpaid invoice with its age. Call the three oldest today — not to fight, just: 'I'm updating our records, when can we expect this?' That one afternoon typically moves thousands.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Build the 13-week cash sheet",
        detail: "Opening balance, weekly inflows (realistic dates, not invoice dates), weekly outflows (wages, rent, suppliers, tax).",
        owner: "Owner + bookkeeper",
        effort: "3 hours, then 20 min/week",
      },
      {
        phase: "NOW",
        step: "Aged receivables call-down",
        detail: "Every invoice over 30 days gets a call this week. Polite, specific, dated commitments.",
        owner: "Owner",
        effort: "One afternoon",
      },
      {
        phase: "NEXT",
        step: "Same-day invoicing rule",
        detail: "No job closes without an invoice sent that day. Assign it, make it policy, track it for a month.",
        owner: "Owner + admin",
        effort: "Immediate",
      },
      {
        phase: "NEXT",
        step: "Set reorder points on top 20 SKUs",
        detail: "Reorder when stock covers N weeks of average sales, not when a supplier rep visits. Kill dead stock with clearance pricing.",
        owner: "Owner + purchasing",
        effort: "2-3 weeks",
      },
      {
        phase: "LATER",
        step: "Negotiate terms both directions",
        detail: "Ask best customers for standing payment dates; ask key suppliers for 30-day terms or split deliveries. Alignment beats negotiation.",
        owner: "Owner",
        effort: "Ongoing",
      },
    ],
    kpis: [
      { name: "Days sales outstanding (DSO)", target: "Under 30 days", why: "The speed profit turns into cash — the core conversion metric." },
      { name: "Weeks of cash on hand", target: "4-6 weeks of outflows", why: "The sleep-at-night number; it buys reaction time for any surprise." },
      { name: "Inventory turnover", target: "+25-50% within 2 quarters", why: "Measures how much cash is being liberated from shelves." },
    ],
    risks: [
      { risk: "Tight collections upsets a big customer", mitigation: "Be consistent and early, not aggressive: reminders from day 14 feel professional; silence followed by fury at day 60 feels personal." },
      { risk: "Cutting inventory too deep causes stockouts", mitigation: "Use reorder points, not gut fear. Track stockout incidents weekly — a 1-2% stockout rate is the healthy tension point." },
    ],
  },
  {
    id: "excess-inventory",
    category: "operations",
    title: "I have too much inventory.",
    headline: "Shelves and storage are full, yet cash is tight and what you need is somehow never in stock.",
    symptoms: [
      "Storage overflowing, but bestsellers still run out",
      "Cash is tight while stock value keeps growing",
      "Discounting just to create space",
    ],
    problem:
      "Purchasing is driven by habit, supplier pressure, or fear of stockouts — not by sales data. The result is the classic double failure: capital frozen in slow-moving items while fast movers still go missing. Inventory problems are almost always information problems wearing a storage costume.",
    rootCauses: [
      {
        cause: "Buying by feel instead of velocity",
        explanation:
          "Orders are placed on instinct or habit ('we always get 200'), with no reference to how fast items actually sell. Fast and slow items get equal shelf space and equal cash.",
        frequency: "Most common",
      },
      {
        cause: "Supplier minimums and bulk discounts",
        explanation:
          "The 10% bulk discount quietly costs 30% in carrying cost: cash tied up, storage, spoilage, obsolescence. The discount is visible; the carrying cost is invisible.",
        frequency: "Frequent",
      },
      {
        cause: "No dead-stock rule",
        explanation:
          "Items that haven't moved in 6 months stay on shelves out of inertia, occupying space and capital that fast movers could use. Nobody owns the decision to clear them.",
        frequency: "Often hidden",
      },
    ],
    impact:
      "Cash that could fund marketing, hiring, or simply wages is instead stacked in a back room losing value monthly. Storage costs grow, spoilage and shrinkage rise, and the mess hides what's actually sellable. Meanwhile genuine stockouts on bestsellers lose sales you already paid to win.",
    solutions: [
      {
        name: "Velocity ranking (ABC)",
        approach:
          "Rank every SKU by units sold per month: A = fast, B = steady, C = slow, D = dead. One afternoon with your sales export produces the map.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1 week",
        risk: "Low",
      },
      {
        name: "Reorder points + smaller orders",
        approach:
          "For A items: reorder when stock hits 2-3 weeks of sales. For B: 4-6 weeks. C: order to demand only. Smaller, more frequent orders free cash immediately.",
        impact: "High",
        cost: "Low",
        complexity: "Medium",
        time: "3-6 weeks",
        risk: "Medium",
      },
      {
        name: "Dead-stock clearance",
        approach:
          "Anything unmoved in 6+ months: bundle it, clear it, or write it off. The cash and space recovered are worth more than the fantasy of full-price sales someday.",
        impact: "Medium",
        cost: "Low",
        complexity: "Low",
        time: "2-4 weeks",
        risk: "Low",
      },
    ],
    recommended: {
      approach: "Rank by velocity first, then set reorder points on A and B items, then clear the dead stock to fund the transition.",
      reasoning:
        "The ranking costs one afternoon and determines everything else — reorder points are math once velocity is known, and clearance targets identify themselves (the D list). Clearing dead stock also releases the cash and shelf space the new system needs, so it funds its own implementation.",
      firstMove:
        "Export last 90 days of sales by item. Sort by units sold. Draw a line under the items that make up the top 80% of units — that's your A list, and it's almost always about 20% of the items you stock.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Run the velocity ranking",
        detail: "90 days of sales by SKU, sorted. Mark A/B/C/D. Count current stock against weeks-of-supply for each.",
        owner: "Owner + admin",
        effort: "3-4 hours",
      },
      {
        phase: "NOW",
        step: "Freeze reorders on C and D items",
        detail: "One rule, effective today: nothing slow-moving gets reordered until existing stock sells. Instant cash relief.",
        owner: "Owner + purchaser",
        effort: "1 hour (the rule)",
      },
      {
        phase: "NEXT",
        step: "Set reorder points on A items",
        detail: "Stock cover of 2-3 weeks of average sales triggers a reorder. Put the threshold in your POS or a printed sheet.",
        owner: "Owner + purchaser",
        effort: "2-3 weeks",
      },
      {
        phase: "NEXT",
        step: "Clearance the D list",
        detail: "Bundle, discount, sell to a reseller, donate for the tax receipt. Target: D stock down 80% in 4 weeks.",
        owner: "Owner + frontline",
        effort: "2-4 weeks",
      },
      {
        phase: "LATER",
        step: "Renegotiate supplier rhythm",
        detail: "Ask A-item suppliers for weekly split deliveries. Carry less, stock out less, pay closer to sale.",
        owner: "Owner",
        effort: "Ongoing",
      },
    ],
    kpis: [
      { name: "Weeks of supply (by category)", target: "A items 2-4 weeks, total stock down 30-40%", why: "The honest measure of whether inventory matches sales reality." },
      { name: "Stockout rate on A items", target: "Under 2% of selling days", why: "Guards against over-correcting into empty shelves." },
      { name: "Cash freed from clearance", target: "Measured and reinvested deliberately", why: "Makes the win concrete and funds the next improvement." },
    ],
    risks: [
      { risk: "Supplier pushes back on smaller orders", mitigation: "Bring the velocity data. Many suppliers prefer weekly standing orders to lumpy bulk — you're offering them smoother demand, not less." },
      { risk: "Clearance discounts brand positioning", mitigation: "Bundle D items as gifts or packages instead of slashing visible prices; the cash recovery is identical, the signal is different." },
    ],
  },
  {
    id: "unknown-product-profitability",
    category: "profit",
    title: "I don't know which products are actually profitable.",
    headline: "You know the total — you just can't say which sales make money and which quietly cost it.",
    symptoms: [
      "Pricing decisions are guesses defended with confidence",
      "Some best-sellers feel exhausting for the money",
      "Discounting anything is scary because the floor is unknown",
    ],
    problem:
      "The business tracks revenue in total, not contribution per product. Without knowing which items pay for the business and which are subsidized passengers, every decision — pricing, promotion, product range, even which customer to prioritize — rests on intuition. Intuition is usually confident and often wrong about margins.",
    rootCauses: [
      {
        cause: "Costs pooled, not allocated",
        explanation:
          "The bookkeeping records what was spent, never what it was spent on. Materials and labor sit in aggregate accounts, invisible at the product level.",
        frequency: "Most common",
      },
      {
        cause: "Overheads ignored in pricing",
        explanation:
          "Prices are set on materials plus a markup, forgetting that rent, utilities, admin, and the owner's time must also be paid by something. The margin looks fine until the last week of the month.",
        frequency: "Frequent",
      },
      {
        cause: "Time cost never measured",
        explanation:
          "Two products with the same materials margin can differ 5× in labor time. Without time data, the busiest products can be the least profitable and nobody would know.",
        frequency: "Often hidden",
      },
    ],
    impact:
      "Marketing promotes losers because they 'sell well'. Capacity is consumed by time-hungry, low-margin work while high-margin work waits. Discounts are set arbitrarily — some go below cost. The business works hard for unpredictable results because the map it navigates by has no elevation on it.",
    solutions: [
      {
        name: "Contribution margin table",
        approach:
          "For the top 15 products: price − materials − direct labor (minutes × loaded rate) = contribution. Sorted, it becomes the business's most valuable single document.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1-2 weeks",
        risk: "Low",
      },
      {
        name: "Time-and-motion sample",
        approach:
          "For one week, note start/finish times on the top products as they're made or delivered. Rough timing on 5 instances per product beats a year of guessing.",
        impact: "Medium",
        cost: "Low",
        complexity: "Low",
        time: "1 week",
        risk: "Low",
      },
      {
        name: "Overhead absorption per unit",
        approach:
          "Divide monthly overhead by total units sold, add that to the contribution table. Crude, but it converts 'we're busy but broke' into numbers you can argue with.",
        impact: "Medium",
        cost: "Low",
        complexity: "Medium",
        time: "2-3 weeks",
        risk: "Medium",
      },
    ],
    recommended: {
      approach: "Build the contribution table with a one-week timing sample. Skip perfect overhead math initially — 80% accuracy is enough to change every decision.",
      reasoning:
        "The biggest risk here is analysis paralysis: waiting for perfect cost accounting while the business bleeds. A rough contribution table built in two evenings identifies the losers and winners with enough confidence to act. Overhead absorption refines the picture later, once the data habit exists.",
      firstMove:
        "Take your single best-selling product. Write down: price, materials cost, and a honest guess of total hands-on minutes. Multiply minutes by (wage × 1.25 ÷ 60). Is the remainder positive? Now do the same for the product you're proudest of. Compare.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Pick the top 15 products by revenue",
        detail: "Last 3 months of sales. 15 is enough to cover most of the money and most of the mess.",
        owner: "Owner",
        effort: "1 hour",
      },
      {
        phase: "NOW",
        step: "Time-sample the top 8",
        detail: "One week of rough start/finish notes as items are produced. Five samples per product is plenty.",
        owner: "Owner + production staff",
        effort: "Spread over a week",
      },
      {
        phase: "NEXT",
        step: "Build and rank the contribution table",
        detail: "Price − materials − labor = contribution, in dollars and as %, sorted. Mark everything below 20% in red.",
        owner: "Owner",
        effort: "3-4 hours",
      },
      {
        phase: "NEXT",
        step: "Act on the two extremes",
        detail: "One repricing or re-spec on the worst performer; one push (placement, bundle, mention) on the best. The table earns its keep through these two moves.",
        owner: "Owner",
        effort: "2 weeks",
      },
      {
        phase: "LATER",
        step: "Refresh quarterly + before any discount",
        detail: "Rule: no promotion or new product launches without a contribution line in the table first.",
        owner: "Owner",
        effort: "2 hours/quarter",
      },
    ],
    kpis: [
      { name: "Products with known contribution margin", target: "Top 15 (≈80% of revenue) within a month", why: "Coverage of the analysis — the share of revenue that is no longer a guess." },
      { name: "Blended gross margin %", target: "+3-6 points in one quarter", why: "The aggregate result of pricing and mix decisions the table enables." },
      { name: "Discount depth vs. floor", target: "Zero discounts below 15% contribution", why: "Directly stops the most expensive habit: selling below cost on purpose." },
    ],
    risks: [
      { risk: "Labor timing samples create tension ('being timed')", mitigation: "Frame it as pricing the product, not measuring the person — and pay for the sampling time. The goal is honest numbers, not speed records." },
      { risk: "The table ages into fiction", mitigation: "Refresh with each supplier price change or at least quarterly. Put the refresh on the calendar — a stale table is more dangerous than no table." },
    ],
  },
  {
    id: "growth-outpacing-systems",
    category: "growth",
    title: "My business is growing but becoming harder to manage.",
    headline: "Growth was the goal — so why does every new month feel more chaotic than the last?",
    symptoms: [
      "Errors and complaints rise with sales",
      "You're firefighting instead of steering",
      "Nobody is sure who owns what anymore",
    ],
    problem:
      "The business has outgrown its informal operating system. What worked at 5 people — everyone knowing everything, the owner coordinating by proximity — collapses at 10-15. Growth doesn't break businesses directly; it breaks the systems (or absence of systems) that growth multiplies.",
    rootCauses: [
      {
        cause: "Coordination still runs through the owner",
        explanation:
          "Every new hire and customer adds communication paths, and they all route through one person. The owner becomes the switchboard, then the bottleneck, then the crisis.",
        frequency: "Most common",
      },
      {
        cause: "Roles never formalized",
        explanation:
          "Titles exist; ownership of outcomes doesn't. Work lands on whoever is nearest or loudest. Accountability blurs exactly when volume demands sharpness.",
        frequency: "Frequent",
      },
      {
        cause: "Numbers lag the operation",
        explanation:
          "The business grew without adding measurement. Decisions that were safe by instinct at small scale are now blind bets.",
        frequency: "Frequent",
      },
    ],
    impact:
      "Quality wobbles, margins leak, and the owner's hours balloon while satisfaction drops. Team burnout rises as people absorb the coordination chaos. Ironically, the most dangerous phase for a small business is often right after things start going well — success scales the mess along with the revenue.",
    solutions: [
      {
        name: "Owner-per-area structure",
        approach:
          "Split the business into 3-4 areas (sales, operations, fulfillment, admin), each with one accountable name — not a new org chart, just named ownership.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1-2 weeks",
        risk: "Low",
      },
      {
        name: "Weekly scorecard",
        approach:
          "Five numbers, one page, reviewed in a 25-minute weekly meeting: revenue, gross margin, leads, on-time delivery, quality errors. Alignment by shared facts.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "2 weeks to habit",
        risk: "Low",
      },
      {
        name: "Process layering",
        approach:
          "For each recurring failure, one checklist or one rule — added only when something actually breaks. Systems grown from incidents get followed; systems invented in workshops don't.",
        impact: "High",
        cost: "Low",
        complexity: "Medium",
        time: "Ongoing",
        risk: "Low",
      },
    ],
    recommended: {
      approach: "Name area owners first, stand up the weekly scorecard second, then grow process checklists from real incidents as they occur.",
      reasoning:
        "Ownership without numbers is hollow, and numbers without ownership are theater — which is why they come together in the first month. Process building is deliberately left to real incidents: at this stage, only processes with a scar behind them get respected. This sequence restores control without freezing growth under bureaucratic weight.",
      firstMove:
        "Write your business as 3-4 areas on a whiteboard. Write the name of the person who currently owns each area in practice (not in title). The gaps — including areas that say 'me' — are your org structure, waiting to be honest.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Define areas and name owners",
        detail: "3-4 areas, each with one accountable person and a one-line description of what 'good' looks like.",
        owner: "Owner",
        effort: "2-3 hours + a team meeting",
      },
      {
        phase: "NOW",
        step: "Choose the 5 scorecard numbers",
        detail: "One per area, leading where possible. If it can't be measured weekly, it isn't on the scorecard.",
        owner: "Owner + area owners",
        effort: "2 hours",
      },
      {
        phase: "NEXT",
        step: "Run the weekly 25-minute review",
        detail: "Same slot weekly: last week's numbers, this week's priorities, one blocked item. No problem-solving in the meeting itself.",
        owner: "Owner + area owners",
        effort: "25 min/week",
      },
      {
        phase: "NEXT",
        step: "Convert the last 5 failures into checklists",
        detail: "One page per failure, owned by the area owner, posted where the work happens.",
        owner: "Area owners",
        effort: "1-2 hours each",
      },
      {
        phase: "LATER",
        step: "Delegate one area fully",
        detail: "Choose the area you interfere with most. Hand over the number, the meeting seat, and the decisions — review weekly, intervene never.",
        owner: "Owner",
        effort: "One quarter",
      },
    ],
    kpis: [
      { name: "Error / complaint rate", target: "Down to pre-growth baseline within a quarter", why: "The clearest signal that control is being restored while growing." },
      { name: "Owner intervention hours per week", target: "Down 50% in 2 quarters", why: "Measures whether the structure is real or decorative." },
      { name: "Scorecard meeting streak", target: "12 consecutive weeks", why: "The habit is the system; missed meetings are the first domino of decay." },
    ],
    risks: [
      { risk: "Named owners feel promoted without pay or support", mitigation: "Pair ownership with authority and a visible win early. Ownership without power to decide is just blame with extra steps." },
      { risk: "Weekly meeting decays into status theater", mitigation: "Keep it to 25 minutes, numbers-first, one blocked item each. If it solves problems, take them offline — the meeting's job is alignment, not therapy." },
    ],
  },
  {
    id: "marketing-untracked",
    category: "marketing",
    title: "I spend on marketing but don't know what works.",
    headline: "Money goes out every month; new customers arrive; nobody can connect the two.",
    symptoms: [
      "Spend continues out of hope, not evidence",
      "Every channel claims credit for every sale",
      "Budget conversations end in 'let's just keep doing everything'",
    ],
    problem:
      "Marketing spend is unmeasured, so it can't be evaluated, repeated deliberately, or stopped safely. The business pays for results it can't see and may be funding channels that produce nothing while starving ones that work. In small businesses, this isn't a tracking-software problem — it's a habit and question problem.",
    rootCauses: [
      {
        cause: "New customers are never asked where they came from",
        explanation:
          "The single cheapest data point in marketing — the source question — is never asked or recorded. Every analysis after that is guesswork.",
        frequency: "Most common",
      },
      {
        cause: "No offer codes or dedicated paths",
        explanation:
          "All channels point to the same door. Without a code, number, link, or simply asking, channels are indistinguishable in the till.",
        frequency: "Frequent",
      },
      {
        cause: "Results judged too early or not at all",
        explanation:
          "Channels are abandoned after two quiet weeks or renewed forever without review — both are the same absence: no defined trial period and success threshold.",
        frequency: "Frequent",
      },
    ],
    impact:
      "Budget leaks into unproductive channels while genuinely working ones get cut in slow-month panic. Nobody can say what a customer costs to acquire, so growth targets are fiction. Worst of all, the business keeps paying for a fog it could lift for free with one consistent question.",
    solutions: [
      {
        name: "Source field on every new customer",
        approach:
          "One required field — 'how did you hear about us?' — at signup, booking, or first till interaction. A dropdown beats free text; 'friend/referral' will win, and that's data.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1 week",
        risk: "Low",
      },
      {
        name: "Channel ledger",
        approach:
          "One sheet: monthly spend per channel, new customers attributed, cost per customer. Reviewed monthly. Ten minutes that compound.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "Monthly, 10 min",
        risk: "Low",
      },
      {
        name: "90-day channel trials",
        approach:
          "Every channel gets a written trial: fixed budget, 90 days, defined success metric. Then keep, fix, or kill — decided in advance, not after the fact.",
        impact: "Medium",
        cost: "Low",
        complexity: "Medium",
        time: "Per trial",
        risk: "Low",
      },
    ],
    recommended: {
      approach: "Turn on the source question everywhere this week, build the channel ledger after 30 days of data, then run trials on the two channels the data questions most.",
      reasoning:
        "The source question costs nothing, takes a week to make habitual, and produces the data every later decision depends on. The ledger turns that data into cost-per-customer, which is the only number that makes spend comparable across channels. Trials come last because they need the ledger's baseline to define a fair success threshold.",
      firstMove:
        "Add 'How did you hear about us?' to your booking form, order form, or till script today — as a dropdown: Google, social, friend, walked by, other. In 30 days you'll know more about your marketing than the last 3 years combined.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Add the source question everywhere",
        detail: "Forms, till, phone script: a required dropdown. Brief the team on why — one sentence is enough.",
        owner: "Owner + frontline",
        effort: "2 hours",
      },
      {
        phase: "NOW",
        step: "Tag each active channel with a traceable path",
        detail: "A code, a link with UTM, a separate phone line — anything that makes the channel visible without asking.",
        owner: "Owner or freelancer",
        effort: "3-4 hours",
      },
      {
        phase: "NEXT",
        step: "Start the channel ledger",
        detail: "Columns: channel, monthly spend, new customers, cost per customer. Update at month end with the source data.",
        owner: "Owner + admin",
        effort: "10 min/month",
      },
      {
        phase: "NEXT",
        step: "Review and reallocate at day 60",
        detail: "First real read of the ledger. Reallocate 10-20% of budget toward the cheapest credible sources — not a revolution, a nudge.",
        owner: "Owner",
        effort: "1 hour",
      },
      {
        phase: "LATER",
        step: "Write the next two channel trials",
        detail: "Fixed budget, 90 days, success threshold written before spending starts. Kill or scale on the data.",
        owner: "Owner",
        effort: "1 hour each",
      },
    ],
    kpis: [
      { name: "New customers with known source", target: "70%+ within a month", why: "The denominator of every marketing decision that follows." },
      { name: "Cost per acquired customer (by channel)", target: "Known and falling", why: "The number that finally makes channels comparable." },
      { name: "Spend on unproven channels", target: "Under 20% of budget", why: "Room to experiment, without funding permanent fog." },
    ],
    risks: [
      { risk: "Customers find the question annoying", mitigation: "Make it one dropdown, first option 'A friend recommended you', and never block checkout on it. 90% won't blink." },
      { risk: "Referral dominance makes other channels look useless", mitigation: "Referrals reflect past service quality, not current marketing. Fund the referral engine (ask, thank, reward) before judging paid channels against it." },
    ],
  },
  {
    id: "ai-where-start",
    category: "technology",
    title: "I want to use AI but don't know where it actually helps.",
    headline: "Everyone says AI will change your business. Nobody says which Tuesday to start on.",
    symptoms: [
      "Pressure to 'do something with AI' without a concrete use",
      "Tried a chatbot or two; nothing stuck",
      "Fear of falling behind versus fear of wasting money",
    ],
    problem:
      "The interest in AI is real, but it starts from the technology instead of from a problem worth solving. AI is not a strategy — it's a tool that pays off in exactly two places: tasks that are repetitive and rule-based enough to automate, and decisions where a little prediction changes the action. Outside those, it's decoration.",
    rootCauses: [
      {
        cause: "Solution-first shopping",
        explanation:
          "The search starts with 'what can AI do?' instead of 'what costs us the most hours?' Tools are adopted because they exist, then abandoned because they solve nothing painful.",
        frequency: "Most common",
      },
      {
        cause: "No inventory of repetitive work",
        explanation:
          "The business has never listed its recurring tasks — so it literally cannot see where automation would bite. You can't match a tool to a map you don't have.",
        frequency: "Frequent",
      },
      {
        cause: "Data trapped in paper and heads",
        explanation:
          "Quotes, orders, and customer history live in notebooks and memory. Even the best AI model has nothing to work with until the basics are digitized.",
        frequency: "Often hidden",
      },
    ],
    impact:
      "Money and hope get spent on pilots that quietly die, and the team learns to associate 'AI' with 'distraction'. Meanwhile the genuinely valuable uses — quote drafting, reorder math, follow-up emails, review analysis — stay undone because they were never the ones being shopped for.",
    solutions: [
      {
        name: "Repetitive-task inventory",
        approach:
          "One week, one log: every recurring task, minutes spent, and how rule-based it is. The automation candidates identify themselves — no vendor needed.",
        impact: "High",
        cost: "Low",
        complexity: "Low",
        time: "1 week",
        risk: "Low",
      },
      {
        name: "First 80/20 automation",
        approach:
          "Take the single most frequent, most rule-based task and automate only that — even partially. A saved 30 minutes daily is a real, felt win the team will believe.",
        impact: "Medium",
        cost: "Low",
        complexity: "Low",
        time: "2-4 weeks",
        risk: "Low",
      },
      {
        name: "AI where judgment meets repetition",
        approach:
          "Once one win exists: draft quotes from past jobs, summarize customer feedback weekly, predict reorder points, draft follow-up messages for review. Human reviews, AI drafts.",
        impact: "High",
        cost: "Medium",
        complexity: "Medium",
        time: "1-2 months",
        risk: "Medium",
      },
    ],
    recommended: {
      approach: "Build the task inventory first, automate one frequent rule-based task second, and only then bring AI into the judgment-heavy work — as a drafting assistant, never an autopilot.",
      reasoning:
        "Every failed AI adoption shares one shape: a tool looking for a problem. Reversing the order — problem, then tool — is the entire method. The inventory costs a week and costs nothing; the first small automation earns team trust; and the 'AI drafts, human decides' pattern captures most of the value at a fraction of the risk of full automation.",
      firstMove:
        "For one week, write down every task you or your team does more than once a week, with rough minutes. Circle anything with fixed rules and a repeating pattern. That circled list — not a vendor demo — is your AI roadmap.",
    },
    implementation: [
      {
        phase: "NOW",
        step: "Log the repetitive-task inventory",
        detail: "Task, frequency, minutes, rule-based (yes/partially/no). Everyone logs their own for one week.",
        owner: "Owner + team",
        effort: "10 min/day, 1 week",
      },
      {
        phase: "NOW",
        step: "Pick the one first candidate",
        detail: "Highest frequency × most rule-based. Typical winners: order entry, appointment reminders, invoice chasing, reorder checks.",
        owner: "Owner",
        effort: "1 hour",
      },
      {
        phase: "NEXT",
        step: "Automate that one task, even partially",
        detail: "Use what you already own (POS features, spreadsheet rules, email templates) before buying anything new. Partial automation still returns the hours.",
        owner: "Owner + admin",
        effort: "2-4 weeks",
      },
      {
        phase: "NEXT",
        step: "Measure the hours saved",
        detail: "Minutes saved per occurrence × frequency. One number proves the case for the next project.",
        owner: "Owner",
        effort: "30 min/month",
      },
      {
        phase: "LATER",
        step: "Add AI drafting where judgment lives",
        detail: "Quotes, replies, feedback summaries: AI produces the first draft, a person reviews and sends. Expand only where the pattern keeps repeating.",
        owner: "Owner",
        effort: "Ongoing",
      },
    ],
    kpis: [
      { name: "Hours recovered per week", target: "3-5 hours within 6 weeks", why: "The honest currency of automation — time back in the business." },
      { name: "Automation adoption (still in use after 60 days)", target: "100% of what ships", why: "Kills zombie automations that exist but aren't used — worse than none." },
      { name: "Error rate on automated tasks", target: "At or below manual baseline", why: "Automation that trades time for mistakes isn't savings." },
    ],
    risks: [
      { risk: "The team fears replacement", mitigation: "Automate tasks, not people — and say exactly that. Route every saved hour into work customers actually feel: service, quality, selling." },
      { risk: "AI drafts erode quality over time", mitigation: "Keep the human-review step non-negotiable for anything a customer sees. Review is the product; the draft is just speed." },
    ],
  },
];



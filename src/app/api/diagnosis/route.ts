import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";
export const maxDuration = 120;

const SYSTEM_PROMPT = `You are the diagnostic engine of Groundwork, a business problem-solving platform for small businesses (1-50 employees). You think like a senior small-business consultant with 20+ years of hands-on experience: pragmatic, systems-oriented, allergic to generic advice.

YOUR METHOD (follow it internally, step by step):
1. Understand the business from the context given.
2. Identify the actual problem (in numbers and concrete terms, not vague feelings).
3. Separate symptoms from root causes — what the owner describes is almost always a symptom.
4. Reason about the business processes and dependencies involved.
5. Identify bottlenecks, inefficiencies, risks, and opportunities.
6. Generate multiple viable solutions (at least 2, at most 4) — never just one.
7. Compare solutions on: expected impact, cost, complexity, implementation time, required resources, and risk.
8. Recommend an implementation sequence (NOW / NEXT / LATER).
9. Define measurable KPIs for verification.
10. Note what should be reviewed and iterated.

HARD RULES:
- Do NOT default to "increase sales / do more marketing". A problem may originate from pricing, poor margins, inefficient operations, weak retention, excessive costs, bad processes, poor positioning, cash-flow timing, or an unsuitable business model. Diagnose before prescribing; the top-line answer is usually the wrong first move.
- Practical over theoretical. Every recommendation must be actionable by a small business with limited money, people, and time.
- Solutions must be affordable and simple: never recommend expensive enterprise-level systems when a simpler solution (a spreadsheet, a checklist, a POS feature, one routine) achieves the same result.
- Never recommend technology or AI merely because it is fashionable — only when it solves a real problem or creates measurable value.
- No generic business clichés ("unlock synergy", "leverage your strengths", "focus on customer experience" without mechanism). Every recommendation names the concrete action and why it works mechanically.
- Work with incomplete information: clearly separate known facts, assumptions, possible causes, and what still needs verification. When data is missing, say what to measure — do not invent precise numbers for the user's business.
- If the described situation contains multiple problems, diagnose the interconnected system but prioritize: identify the ONE problem to solve first and why.
- All content must be in clear, plain English. Write like a consultant talks to an owner across a table: direct, concrete, respectful. No emojis.

OUTPUT FORMAT — respond with ONLY a valid JSON object, no markdown fences, no commentary. Schema:
{
  "problemStatement": "1-2 sentences: what is actually happening, stated concretely",
  "surfaceSymptoms": ["3-4 bullet strings: what the owner sees/feels"],
  "rootCauses": [{"cause": "short cause name", "explanation": "2-3 sentences: the mechanism, why it produces the symptom", "confidence": "Likely | Possible | Needs verification"}],
  "businessImpact": [{"area": "Revenue | Costs | Customers | Operations | Growth | Cash | Team", "effect": "1-2 sentences of concrete impact"}],
  "evidence": {
    "knownFacts": ["facts stated or strongly implied by the owner"],
    "assumptions": ["assumptions the diagnosis leans on, stated honestly"],
    "toVerify": [{"question": "what to check", "why": "how the answer would change the diagnosis or solution"}]
  },
  "solutions": [{"name": "solution name", "approach": "2-3 sentences of what it concretely involves", "impact": "High|Medium|Low", "cost": "Low|Medium|High", "complexity": "Low|Medium|High", "time": "e.g. '2-4 weeks'", "resources": "people/tools/budget needed", "risk": "Low|Medium|High"}],
  "recommended": {"approach": "1-2 sentences: which solution or combination, in what order", "reasoning": "3-4 sentences: the concrete reasoning — why this first, what it unlocks, what it avoids"},
  "implementation": [{"phase": "NOW|NEXT|LATER", "action": "short action title", "detail": "1-2 sentences of concrete steps", "owner": "who does it", "effort": "time estimate"}],
  "kpis": [{"name": "metric name", "baseline": "starting point or 'measure first'", "target": "directional target", "cadence": "review frequency"}],
  "risks": [{"risk": "main implementation risk", "mitigation": "how to reduce it, concretely"}],
  "firstMove": "The single first action to take in the next 48 hours, concrete enough to start tomorrow."
}

Rules for the JSON: solutions must include 2-4 entries INCLUDING at least one lower-cost/simpler alternative, and if the obvious reflex answer (e.g. "run ads") is wrong, include it as an option with an honest low rating. implementation must have at least 2 NOW items, 2 NEXT items, and 1-2 LATER items. kpis: 3-4 entries. rootCauses: 2-4 entries. Keep every string tight and information-dense.`;

interface DiagnosisPayload {
  description: string;
  category: string;
  industry?: string;
  size?: string;
  answers?: Record<string, string>;
}

function extractJson(text: string): unknown {
  // Strip markdown fences if present
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  }
  // Find the outermost JSON object
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in response");
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DiagnosisPayload;

    const description = (body.description || "").trim();
    if (!description || description.length < 10) {
      return NextResponse.json(
        { error: "Please describe what is happening in your business (at least a sentence)." },
        { status: 400 }
      );
    }

    const answersText = Object.entries(body.answers || {})
      .filter(([, v]) => v && v.trim().length > 0)
      .map(([k, v]) => `- ${k}: ${v.trim()}`)
      .join("\n");

    const userPrompt = `BUSINESS OWNER'S SITUATION
Primary problem area (self-selected): ${body.category || "unspecified"}
Business type/industry: ${body.industry?.trim() || "not stated"}
Business size: ${body.size?.trim() || "not stated"}

WHAT THE OWNER SAYS:
"${description}"

TARGETED FOLLOW-UP ANSWERS (may be partial or empty):
${answersText || "(none provided — work with incomplete information and mark assumptions clearly)"}

Diagnose this business using the method. Respond with the JSON object only.`;

    const zai = await ZAI.create();

    let report: unknown;
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const completion = await zai.chat.completions.create({
          messages: [
            { role: "assistant", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          thinking: { type: "disabled" },
        });

        const content = completion.choices[0]?.message?.content;
        if (!content || content.trim().length === 0) {
          throw new Error("Empty response from model");
        }
        report = extractJson(content);
        break;
      } catch (err) {
        lastError = err;
        if (attempt < 3) {
          await new Promise((r) => setTimeout(r, 1200 * attempt));
        }
      }
    }

    if (!report) {
      console.error("Diagnosis generation failed:", lastError);
      return NextResponse.json(
        { error: "The diagnostic engine could not complete the analysis. Please try again in a moment." },
        { status: 502 }
      );
    }

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Diagnosis API error:", error);
    return NextResponse.json(
      { error: "Something went wrong while running the diagnosis. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Groundwork — shared client-side types for the AI diagnosis report.
 * Mirrors the schema enforced in /api/diagnosis.
 */

export interface DiagnosisRootCause {
  cause: string;
  explanation: string;
  confidence: string;
}

export interface DiagnosisImpact {
  area: string;
  effect: string;
}

export interface DiagnosisEvidence {
  knownFacts: string[];
  assumptions: string[];
  toVerify: { question: string; why: string }[];
}

export interface DiagnosisSolution {
  name: string;
  approach: string;
  impact: string;
  cost: string;
  complexity: string;
  time: string;
  resources: string;
  risk: string;
}

export interface DiagnosisImplementation {
  phase: string;
  action: string;
  detail: string;
  owner: string;
  effort: string;
}

export interface DiagnosisKpi {
  name: string;
  baseline: string;
  target: string;
  cadence: string;
}

export interface DiagnosisRisk {
  risk: string;
  mitigation: string;
}

export interface DiagnosisReport {
  problemStatement: string;
  surfaceSymptoms: string[];
  rootCauses: DiagnosisRootCause[];
  businessImpact: DiagnosisImpact[];
  evidence: DiagnosisEvidence;
  solutions: DiagnosisSolution[];
  recommended: { approach: string; reasoning: string };
  implementation: DiagnosisImplementation[];
  kpis: DiagnosisKpi[];
  risks: DiagnosisRisk[];
  firstMove: string;
}

export function asReport(value: unknown): DiagnosisReport | null {
  if (!value || typeof value !== "object") return null;
  const r = value as Partial<DiagnosisReport>;
  if (!r.problemStatement || !Array.isArray(r.rootCauses) || !Array.isArray(r.solutions)) {
    return null;
  }
  return {
    problemStatement: r.problemStatement,
    surfaceSymptoms: Array.isArray(r.surfaceSymptoms) ? r.surfaceSymptoms : [],
    rootCauses: r.rootCauses,
    businessImpact: Array.isArray(r.businessImpact) ? r.businessImpact : [],
    evidence:
      r.evidence && Array.isArray(r.evidence.knownFacts)
        ? r.evidence
        : { knownFacts: [], assumptions: [], toVerify: [] },
    solutions: r.solutions,
    recommended: r.recommended ?? { approach: "", reasoning: "" },
    implementation: Array.isArray(r.implementation) ? r.implementation : [],
    kpis: Array.isArray(r.kpis) ? r.kpis : [],
    risks: Array.isArray(r.risks) ? r.risks : [],
    firstMove: r.firstMove ?? "",
  };
}

"use client";

import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CircleHelp,
  ClipboardCheck,
  Compass,
  Database,
  Flag,
  Lightbulb,
  RotateCcw,
  ShieldAlert,
  Target,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "@/components/shared";
import type { DiagnosisReport } from "@/lib/diagnosis";
import { cn } from "@/lib/utils";

function confidenceChip(confidence: string) {
  const c = confidence.toLowerCase();
  if (c.includes("likely"))
    return "border-signal-green-deep/30 bg-signal-green-deep/10 text-signal-green-deep";
  if (c.includes("possible")) return "border-signal-amber/50 bg-signal-amber/10 text-signal-amber-deep";
  return "border-electric-600/30 bg-electric-50 text-electric-700";
}

function ratingDot(value: string) {
  const v = value.toLowerCase();
  if (v === "high") return "bg-signal-green-deep";
  if (v === "medium") return "bg-signal-amber";
  if (v === "low") return "bg-slate-400";
  return "bg-slate-300";
}

function BlockTitle({
  icon: Icon,
  children,
  tone = "navy",
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  tone?: "navy" | "amber" | "teal" | "red" | "blue";
}) {
  const tones: Record<string, string> = {
    navy: "text-navy-950",
    amber: "text-signal-amber-deep",
    teal: "text-signal-green-deep",
    red: "text-red-600",
    blue: "text-electric-700",
  };
  return (
    <h4 className={cn("flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em]", tones[tone])}>
      <Icon className="h-4 w-4" />
      {children}
    </h4>
  );
}

export function ReportView({ report }: { report: DiagnosisReport }) {
  const now = report.implementation.filter((i) => i.phase === "NOW");
  const next = report.implementation.filter((i) => i.phase === "NEXT");
  const later = report.implementation.filter((i) => i.phase === "LATER");
  const recNames = new Set(
    report.recommended.approach
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 4)
  );
  const isRecommended = (name: string) => {
    const words = name.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4);
    return words.some((w) => recNames.has(w));
  };

  return (
    <div className="space-y-5">
      {/* Problem statement */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-lift">
        <BlockTitle icon={AlertTriangle} tone="amber">
          Problem — what is happening
        </BlockTitle>
        <p className="mt-3 text-[17px] font-medium leading-relaxed text-navy-950">{report.problemStatement}</p>
        {report.surfaceSymptoms.length > 0 && (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {report.surfaceSymptoms.map((s, i) => (
              <li key={i} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-amber" />
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Root causes */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-lift">
        <BlockTitle icon={Compass}>
          Root causes — why it is happening
        </BlockTitle>
        <div className="mt-4 space-y-3">
          {report.rootCauses.map((rc, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-950 font-display text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-navy-950">{rc.cause}</span>
                </div>
                <span className={cn("rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide", confidenceChip(rc.confidence))}>
                  {rc.confidence}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{rc.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact */}
      {report.businessImpact.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-lift">
          <BlockTitle icon={TrendingDown} tone="red">
            Business impact
          </BlockTitle>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {report.businessImpact.map((imp, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-electric-700">{imp.area}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{imp.effect}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidence panel */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-signal-green-deep/25 bg-signal-green-deep/[0.05] p-5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-signal-green-deep">
            <BadgeCheck className="h-4 w-4" /> Known facts
          </div>
          <ul className="mt-3 space-y-2">
            {(report.evidence.knownFacts ?? []).map((f, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm leading-snug text-slate-700"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-green-deep" />{f}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-signal-amber/50 bg-signal-amber/[0.06] p-5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-signal-amber-deep">
            <CircleHelp className="h-4 w-4" /> Assumptions
          </div>
          <ul className="mt-3 space-y-2">
            {(report.evidence.assumptions ?? []).map((f, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm leading-snug text-slate-700"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-amber" />{f}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-electric-600/25 bg-electric-50 p-5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-electric-700">
            <Database className="h-4 w-4" /> To verify
          </div>
          <ul className="mt-3 space-y-2.5">
            {(report.evidence.toVerify ?? []).map((f, i) => (
              <li key={i}>
                <div className="text-sm font-medium leading-snug text-navy-950">{f.question}</div>
                <div className="text-xs leading-snug text-slate-500">{f.why}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Solutions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-lift">
        <BlockTitle icon={Lightbulb} tone="teal">
          Solution options — compared
        </BlockTitle>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {report.solutions.map((sol, i) => {
            const rec = isRecommended(sol.name);
            return (
              <div
                key={i}
                className={cn(
                  "relative rounded-xl border p-5 transition-shadow",
                  rec
                    ? "border-signal-green-deep/50 bg-signal-green-deep/[0.04] shadow-card-lift"
                    : "border-slate-200 bg-white hover:shadow-card-lift"
                )}
              >
                {rec && (
                  <span className="absolute -top-2.5 left-4 rounded-full bg-signal-green-deep px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Recommended path
                  </span>
                )}
                <div className="font-display text-base font-bold text-navy-950">{sol.name}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{sol.approach}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {[
                    ["Impact", sol.impact],
                    ["Cost", sol.cost],
                    ["Complexity", sol.complexity],
                    ["Risk", sol.risk],
                  ].map(([label, value]) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700"
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", ratingDot(value))} />
                      {label}: <span className="font-semibold">{value}</span>
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>Time: <span className="font-medium text-slate-600">{sol.time}</span></span>
                  <span>Resources: <span className="font-medium text-slate-600">{sol.resources}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended approach */}
      <div className="overflow-hidden rounded-2xl bg-navy-950 p-6 shadow-card-lift-lg sm:p-7">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-electric-400">
          <Target className="h-4 w-4" /> Recommended approach &amp; reasoning
        </div>
        <p className="mt-3 font-display text-lg font-bold leading-snug text-white sm:text-xl">
          {report.recommended.approach}
        </p>
        <p className="mt-3 leading-relaxed text-slate-300">{report.recommended.reasoning}</p>
        {report.firstMove && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-electric-500/30 bg-electric-500/10 p-4">
            <Flag className="mt-0.5 h-5 w-5 shrink-0 text-electric-400" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-electric-300">
                First move — next 48 hours
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-200">{report.firstMove}</p>
            </div>
          </div>
        )}
      </div>

      {/* Implementation plan */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-lift">
        <BlockTitle icon={ClipboardCheck}>Implementation plan</BlockTitle>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {[
            { label: "NOW", items: now },
            { label: "NEXT", items: next },
            { label: "LATER", items: later },
          ].map((group) => (
            <div key={group.label} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <PriorityBadge priority={group.label} className="mb-3" />
              <div className="space-y-3">
                {group.items.map((item, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 bg-white p-3.5">
                    <div className="text-sm font-semibold leading-snug text-navy-950">{item.action}</div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{item.detail}</p>
                    <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                      <span>Owner: <span className="font-semibold text-slate-600">{item.owner}</span></span>
                      <span>Effort: <span className="font-semibold text-slate-600">{item.effort}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs + Risks */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-lift">
          <BlockTitle icon={Target} tone="blue">KPIs — how you&rsquo;ll know it&rsquo;s working</BlockTitle>
          <div className="mt-4 space-y-2.5">
            {report.kpis.map((k, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="text-sm font-semibold text-navy-950">{k.name}</span>
                  <span className="rounded bg-electric-50 px-2 py-0.5 text-[11px] font-bold text-electric-700">{k.cadence}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span>Baseline: <span className="font-semibold">{k.baseline}</span></span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                  <span>Target: <span className="font-semibold text-signal-green-deep">{k.target}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-lift">
          <BlockTitle icon={ShieldAlert} tone="red">Risks — and how to reduce them</BlockTitle>
          <div className="mt-4 space-y-2.5">
            {report.risks.map((r, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-3.5">
                <div className="flex items-start gap-2 text-sm font-semibold leading-snug text-navy-950">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-signal-amber" />
                  {r.risk}
                </div>
                <p className="mt-1.5 pl-6 text-[13px] leading-relaxed text-slate-600">
                  <span className="font-semibold text-signal-green-deep">Mitigation:</span> {r.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReportActions({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card-lift sm:flex-row">
      <p className="text-sm text-slate-600">
        Re-run this diagnosis anytime — more context produces a sharper analysis.
      </p>
      <div className="flex gap-2.5">
        <Button
          variant="outline"
          onClick={onReset}
          className="border-slate-300 font-semibold text-navy-950 hover:bg-slate-50"
        >
          <RotateCcw className="mr-1.5 h-4 w-4" />
          Start Over
        </Button>
        <Button asChild className="bg-electric-600 font-semibold text-white hover:bg-electric-500">
          <a href="#tools">
            Open Business Tools
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}

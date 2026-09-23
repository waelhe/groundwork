"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Compass,
  Lightbulb,
  ShieldAlert,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionHeading, PriorityBadge, ArrowDir } from "@/components/shared";
import { businessData } from "@/lib/content";
import type { ProblemEntry } from "@/lib/business-data";
import { cn } from "@/lib/utils";
import { useLang, ratingLabel, frequencyLabel } from "@/lib/i18n";
import { ui } from "@/lib/ui-strings";

const frequencyTone: Record<string, string> = {
  "Most common": "border-red-200 bg-red-50 text-red-700",
  Frequent: "border-signal-amber/50 bg-signal-amber/10 text-signal-amber-deep",
  "Often hidden": "border-electric-600/30 bg-electric-50 text-electric-700",
  Possible: "border-signal-teal/40 bg-signal-teal/10 text-signal-green-deep",
};

function ratingBar(value: string) {
  const v = value.toLowerCase();
  const width = v === "high" ? "w-full" : v === "medium" ? "w-2/3" : "w-1/3";
  const color = v === "high" ? "bg-signal-green-deep" : v === "medium" ? "bg-signal-amber" : "bg-slate-300";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-1.5 w-10 overflow-hidden rounded-full bg-slate-200">
        <span className={cn("block h-full rounded-full", width, color)} />
      </span>
    </span>
  );
}

function SolutionExplorer({ problem, open, onOpenChange }: { problem: ProblemEntry; open: boolean; onOpenChange: (v: boolean) => void }) {
  const { lang, t } = useLang();
  const data = businessData(lang);
  const cat = data.categories.find((c) => c.id === problem.category);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl gap-0 overflow-hidden p-0 sm:rounded-2xl" dir={lang === "ar" ? "rtl" : "ltr"}>
        <ScrollArea className="max-h-[92vh]">
          <DialogHeader className="border-b border-slate-100 bg-gradient-to-r from-navy-950 to-navy-800 px-6 py-6 text-start sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-electric-500/40 bg-electric-500/15 text-electric-300 hover:bg-electric-500/25">
                    {cat?.label}
                  </Badge>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {t(ui.problems.pattern)} · {problem.rootCauses.length} {t(ui.problems.causesWord)} · {problem.solutions.length} {t(ui.problems.solsWord)}
                  </span>
                </div>
                <DialogTitle className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                  &ldquo;{problem.title}&rdquo;
                </DialogTitle>
                <DialogDescription className="mt-2 max-w-2xl text-base text-slate-300">
                  {problem.headline}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-8 px-6 py-7 sm:px-8">
            {/* Problem */}
            <section>
              <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-950">
                <Target className="h-4 w-4 text-signal-amber-deep" /> {t(ui.problems.problem)}
              </div>
              <p className="mt-3 leading-relaxed text-slate-700">{problem.problem}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {problem.symptoms.map((s, i) => (
                  <li key={i} className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] leading-snug text-slate-700">
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            {/* Root causes */}
            <section>
              <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-950">
                <Compass className="h-4 w-4 text-electric-600" /> {t(ui.problems.roots)}
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                {problem.rootCauses.map((rc, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-navy-950 font-display text-[11px] font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold leading-snug text-navy-950">{rc.cause}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{rc.explanation}</p>
                    <span className={cn("mt-3 inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", frequencyTone[rc.frequency] ?? frequencyTone["Often hidden"])}>
                      {frequencyLabel(rc.frequency, lang)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Business impact */}
            <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-950">
                {t(ui.problems.impact)}
              </div>
              <p className="mt-2.5 leading-relaxed text-slate-700">{problem.impact}</p>
            </section>

            {/* Solutions */}
            <section>
              <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-950">
                <Lightbulb className="h-4 w-4 text-signal-green-deep" /> {t(ui.problems.solutions)}
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                {problem.solutions.map((sol, i) => (
                  <div key={i} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="font-display text-[15px] font-bold leading-snug text-navy-950">{sol.name}</div>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">{sol.approach}</p>
                    <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                      {[
                        [t(ui.report.impactL), sol.impact],
                        [t(ui.report.costL), sol.cost],
                        [t(ui.report.complexityL), sol.complexity],
                        [t(ui.report.riskL), sol.risk],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-slate-500">{label}</span>
                          <span className="flex items-center gap-2 font-semibold text-navy-950">
                            {ratingLabel(value, lang)}
                            {ratingBar(value)}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{t(ui.report.timeL)}</span>
                        <span className="font-semibold text-navy-950">{sol.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended */}
            <section className="overflow-hidden rounded-xl bg-navy-950 p-5 sm:p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-electric-400">
                {t(ui.problems.recommended)}
              </div>
              <p className="mt-2.5 font-display text-lg font-bold leading-snug text-white">
                {problem.recommended.approach}
              </p>
              <p className="mt-3 leading-relaxed text-slate-300">{problem.recommended.reasoning}</p>
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-electric-500/30 bg-electric-500/10 p-3.5">
                <ArrowDir className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-electric-300">
                    {t(ui.problems.firstMove)}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-200">{problem.recommended.firstMove}</p>
                </div>
              </div>
            </section>

            {/* Implementation */}
            <section>
              <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-950">
                <ClipboardCheck className="h-4 w-4 text-electric-600" /> {t(ui.problems.implementation)}
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                {(["NOW", "NEXT", "LATER"] as const).map((phase) => {
                  const items = problem.implementation.filter((s) => s.phase === phase);
                  return (
                    <div key={phase} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <PriorityBadge priority={phase} />
                        <span className="text-[11px] font-medium text-slate-500">
                          {phase === "NOW" ? t(ui.problems.thisWeek) : phase === "NEXT" ? t(ui.problems.weeks26) : t(ui.problems.thisQuarter)}
                        </span>
                      </div>
                      <div className="space-y-2.5">
                        {items.map((item, i) => (
                          <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
                            <div className="text-[13px] font-semibold leading-snug text-navy-950">{item.step}</div>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.detail}</p>
                            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-500">
                              <span>{t(ui.report.ownerL)}: <span className="font-semibold text-slate-600">{item.owner}</span></span>
                              <span>{t(ui.report.effortL)}: <span className="font-semibold text-slate-600">{item.effort}</span></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* KPIs + risks */}
            <section className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-950">
                  <Target className="h-4 w-4 text-electric-600" /> {t(ui.problems.kpis)}
                </div>
                <div className="mt-3 space-y-2.5">
                  {problem.kpis.map((k, i) => (
                    <div key={i} className="rounded-lg border border-slate-200 bg-slate-50/60 p-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold text-navy-950">{k.name}</span>
                        <span className="rounded bg-signal-green-deep/10 px-2 py-0.5 text-[11px] font-bold text-signal-green-deep">
                          {k.target}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-snug text-slate-500">{k.why}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-950">
                  <ShieldAlert className="h-4 w-4 text-red-500" /> {t(ui.problems.risks)}
                </div>
                <div className="mt-3 space-y-2.5">
                  {problem.risks.map((r, i) => (
                    <div key={i} className="rounded-lg border border-slate-200 p-3">
                      <div className="text-sm font-semibold leading-snug text-navy-950">{r.risk}</div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        <span className="font-semibold text-signal-green-deep">{t(ui.problems.mitigationL)}</span> {r.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function ProblemLibrary() {
  const { lang, isAr, t } = useLang();
  const data = businessData(lang);
  const [filter, setFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const problems = data.problems;
  // Look up by id so the dialog re-renders in the active language if toggled.
  const selected = problems.find((p) => p.id === selectedId) ?? null;

  const filtered = useMemo(
    () => (filter === "all" ? problems : problems.filter((p) => p.category === filter)),
    [filter, problems]
  );

  const activeCategories = useMemo(() => {
    const ids = new Set(problems.map((p) => p.category));
    return data.categories.filter((c) => ids.has(c.id));
  }, [problems, data]);

  return (
    <section id="problems" className="relative border-t border-slate-200 bg-white">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow={t(ui.problems.eyebrow)}
          title={t(ui.problems.title)}
          description={t(ui.problems.desc)}
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all",
              filter === "all"
                ? "border-navy-950 bg-navy-950 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-navy-950/40 hover:text-navy-950"
            )}
          >
            {t(ui.problems.all)}
          </button>
          {activeCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={cn(
                "rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all",
                filter === c.id
                  ? "border-navy-950 bg-navy-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-navy-950/40 hover:text-navy-950"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const cat = data.categories.find((c) => c.id === p.category);
            return (
              <motion.button
                key={p.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                onClick={() => setSelectedId(p.id)}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-start shadow-card-lift transition-all hover:-translate-y-0.5 hover:border-electric-500/50 hover:shadow-card-lift-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-600 group-hover:bg-electric-50 group-hover:text-electric-700">
                    {cat?.label}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {p.rootCauses.length} {t(ui.problems.causesWord)} · {p.solutions.length} {t(ui.problems.solsWord)}
                  </span>
                </div>
                <h3 className="mt-3.5 font-display text-[17px] font-bold leading-snug text-navy-950 group-hover:text-electric-700">
                  &ldquo;{p.title}&rdquo;
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{p.headline}</p>
                <div className="mt-3 space-y-1">
                  {p.symptoms.slice(0, 2).map((s, j) => (
                    <div key={j} className="flex items-start gap-2 text-[13px] leading-snug text-slate-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-amber" />
                      {s}
                    </div>
                  ))}
                </div>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-electric-700">
                  {t(ui.problems.explore)}
                  <ArrowDir className={cn("h-4 w-4 transition-transform", isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {selected && (
        <SolutionExplorer problem={selected} open={!!selected} onOpenChange={(v) => !v && setSelectedId(null)} />
      )}
    </section>
  );
}

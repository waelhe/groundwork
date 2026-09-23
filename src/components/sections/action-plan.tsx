"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock3, Gauge, Package, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared";
import { planLegend, samplePlan } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const columnTone: Record<string, { border: string; header: string; chip: string }> = {
  NOW: {
    border: "hover:border-electric-500/50",
    header: "text-electric-400",
    chip: "border-electric-500/40 bg-electric-500/10 text-electric-300",
  },
  NEXT: {
    border: "hover:border-signal-teal/50",
    header: "text-signal-teal",
    chip: "border-signal-teal/40 bg-signal-teal/10 text-teal-200",
  },
  LATER: {
    border: "hover:border-signal-amber/50",
    header: "text-signal-amber",
    chip: "border-signal-amber/40 bg-signal-amber/10 text-amber-200",
  },
};

export function ActionPlan() {
  return (
    <section id="action-plan" className="relative overflow-hidden border-t border-white/[0.06] bg-navy-950">
      <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(46,124,255,0.08),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            dark
            eyebrow="Action plan"
            title="Every diagnosis ends in a sequenced roadmap."
            description="Not a to-do dump — an ordered sequence. NOW actions produce information or release cash immediately. NEXT moves need that data first. LATER builds compounding structures. This is what a real plan looks like for one common diagnosis:"
          />
          <Button
            asChild
            variant="outline"
            className="hidden border-white/20 bg-white/[0.04] font-semibold text-white hover:border-electric-500/60 hover:bg-electric-500/10 hover:text-white lg:inline-flex"
          >
            <a href="#diagnosis">
              Build my plan
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {(["NOW", "NEXT", "LATER"] as const).map((phase, pi) => {
            const legend = planLegend[phase];
            const tone = columnTone[phase];
            return (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: pi * 0.12 }}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-navy-900/60 p-5 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={cn("rounded-md border px-2.5 py-1 font-display text-xs font-bold tracking-[0.14em]", tone.chip)}>
                      {legend.label}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock3 className="h-3.5 w-3.5" />
                      {legend.window}
                    </span>
                  </div>
                  <span className="font-display text-3xl font-bold text-white/[0.07]">{pi + 1}</span>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{legend.desc}</p>

                <div className="mt-5 space-y-3.5">
                  {samplePlan[phase].map((action, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-xl border border-white/[0.07] bg-navy-950/70 p-4 transition-colors",
                        tone.border
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-display text-[15px] font-bold leading-snug text-white">{action.what}</h4>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{action.why}</p>
                      <div className="mt-3.5 space-y-1.5 border-t border-white/[0.06] pt-3 text-[12px]">
                        <div className="flex items-start gap-2 text-slate-300">
                          <Gauge className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric-400" />
                          <span><span className="text-slate-500">Impact:</span> {action.impact}</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-teal" />
                          <span><span className="text-slate-500">Resources:</span> {action.resources}</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-amber" />
                          <span><span className="text-slate-500">Effort:</span> {action.effort}</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-green" />
                          <span><span className="text-slate-500">KPI:</span> {action.kpi}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-navy-900/80 to-navy-950 p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <Package className="mt-0.5 h-5 w-5 shrink-0 text-electric-400" />
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
              Every action carries its <span className="font-semibold text-white">why, expected impact, resources,
              effort and KPI</span> — because a plan you can&rsquo;t measure is just a wish with a deadline.
            </p>
          </div>
          <Button asChild className="shrink-0 bg-electric-500 font-semibold text-white hover:bg-electric-400">
            <a href="#diagnosis">
              Run my diagnosis
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

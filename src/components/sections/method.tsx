"use client";

import { motion } from "framer-motion";
import { Network, TrendingUp, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/shared";
import { methodPhases, principles, businessAreas } from "@/lib/site-content";
import { methodPhases as methodPhasesAr, principles as principlesAr, businessAreas as businessAreasAr } from "@/lib/site-content.ar";
import { useLang } from "@/lib/i18n";
import { ui } from "@/lib/ui-strings";

const principleIcons = [Network, TrendingUp, Wrench];

export function Method() {
  const { lang, t } = useLang();
  const phases = lang === "ar" ? methodPhasesAr : methodPhases;
  const principleList = lang === "ar" ? principlesAr : principles;
  const areas = lang === "ar" ? businessAreasAr : businessAreas;

  return (
    <section id="method" className="relative border-t border-white/[0.06] bg-navy-950">
      <div className="bg-dots-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          dark
          eyebrow={t(ui.method.eyebrow)}
          title={t(ui.method.title)}
          description={t(ui.method.desc)}
        />

        {/* Phases */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {phases.map((phase, pi) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: pi * 0.12 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-navy-900/60 p-6 backdrop-blur"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-500/50 to-transparent" />
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-white">{phase.phase}</h3>
                <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-electric-400">
                  {t(ui.method.phase)} {pi + 1} / 3
                </span>
              </div>
              <p className="mt-1.5 text-sm text-slate-400">{phase.caption}</p>

              <ol className="mt-6 space-y-4">
                {phase.steps.map((step) => (
                  <li key={step.n} className="group flex gap-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-electric-500/25 bg-electric-500/10 font-display text-sm font-bold text-electric-300 transition-colors group-hover:border-electric-400/50 group-hover:bg-electric-500/20">
                      {step.n}
                    </span>
                    <div>
                      <div className="text-[15px] font-semibold leading-snug text-white">{step.title}</div>
                      <div className="mt-0.5 text-[13px] leading-snug text-slate-400">{step.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>

        {/* Principles */}
        <div className="mt-16">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            {t(ui.method.refuse)}
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {principleList.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-navy-900/80 to-navy-950 p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-signal-teal/25 bg-signal-teal/10">
                    <Icon className="h-5 w-5 text-signal-teal" />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-bold text-white">{p.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Business areas */}
        <div className="mt-16 rounded-2xl border border-white/[0.07] bg-navy-900/40 p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-white">
              {t(ui.method.areasTitle)}{" "}
              <span className="text-electric-400">{areas.length} {t(ui.method.areasTitleAccent)}</span>
            </h3>
            <span className="text-xs text-slate-500">{t(ui.method.areasNote)}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[13px] font-medium text-slate-300 transition-colors hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-200"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

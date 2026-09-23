"use client";

import { motion } from "framer-motion";
import { ArrowRight, Quote, SearchCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared";
import { caseStudies } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  return (
    <section id="cases" className="relative bg-white">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Case studies"
          title="Real problems. Careful diagnoses. Honest results."
          description="No overnight successes — these are businesses that fixed systems over months, with numbers before and after. Each case follows the same arc: problem, diagnosis, intervention, result, lessons."
        />

        <div className="mt-14 space-y-10">
          {caseStudies.map((cs, idx) => (
            <motion.article
              key={cs.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className={cn(
                "overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card-lift-lg",
                idx % 2 === 1 && "lg:[direction:rtl]"
              )}
            >
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                {/* Image side */}
                <div className="relative min-h-[280px] lg:min-h-full lg:[direction:ltr]">
                  <img
                    src={cs.image}
                    alt={cs.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-display text-xl font-bold text-white">{cs.company}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
                      <span>{cs.industry}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-500" />
                      <span>{cs.size}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-500" />
                      <span>{cs.duration} engagement</span>
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className="p-6 sm:p-8 lg:[direction:ltr]">
                  {/* Problem */}
                  <div>
                    <div className="flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-signal-amber-deep">
                      <SearchCheck className="h-3.5 w-3.5" /> The problem
                    </div>
                    <p className="mt-2 leading-relaxed text-slate-700">{cs.problem}</p>
                  </div>

                  {/* Diagnosis */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-electric-700">
                      <SearchCheck className="h-3.5 w-3.5" /> The diagnosis
                    </div>
                    <p className="mt-2 leading-relaxed text-slate-700">{cs.diagnosis}</p>
                  </div>

                  {/* Intervention */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-signal-green-deep">
                      <Wrench className="h-3.5 w-3.5" /> The intervention
                    </div>
                    <ul className="mt-2.5 space-y-1.5">
                      {cs.intervention.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm leading-snug text-slate-700">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {cs.results.map((r, i) => (
                      <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                        <div className="text-[11px] font-medium text-slate-500">{r.metric}</div>
                        <div className="mt-0.5 font-display text-[15px] font-bold leading-tight text-signal-green-deep">
                          {r.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Lessons + quote */}
                  <div className="mt-6 rounded-xl bg-navy-950 p-5">
                    <div className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-electric-400">
                      Lessons that transfer
                    </div>
                    <ul className="mt-2.5 space-y-1.5">
                      {cs.lessons.map((l, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] leading-snug text-slate-300">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-teal" />
                          {l}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex gap-3 border-t border-white/10 pt-4">
                      <Quote className="h-4 w-4 shrink-0 text-slate-500" />
                      <div>
                        <p className="text-sm italic leading-relaxed text-slate-200">&ldquo;{cs.quote.text}&rdquo;</p>
                        <p className="mt-1.5 text-xs text-slate-500">— {cs.quote.author}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" className="bg-electric-600 px-7 font-semibold text-white hover:bg-electric-500">
            <a href="#diagnosis">
              Diagnose my business
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

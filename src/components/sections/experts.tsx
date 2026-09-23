"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/shared";
import { experts } from "@/lib/site-content";

export function Experts() {
  return (
    <section id="experts" className="relative border-t border-slate-200 bg-paper">
      <div className="bg-grid-faint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="The analysts"
          title="Expertise you can inspect, not just credentials."
          description="Every diagnosis and recommendation on this platform is grounded in the methods of practitioners who have spent years inside small businesses — food production floors, machine shops, retail counters, and back offices. Capability first; certificates second."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {experts.map((ex, i) => (
            <motion.div
              key={ex.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-card-lift transition-all hover:-translate-y-0.5 hover:shadow-card-lift-lg sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-lg font-bold text-white shadow-lg ${ex.color}`}
                >
                  {ex.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-navy-950">{ex.name}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-signal-green-deep/30 bg-signal-green-deep/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-signal-green-deep">
                      <BadgeCheck className="h-3 w-3" />
                      Verified practitioner
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-electric-700">{ex.role}</p>
                  <p className="mt-1.5 text-[13px] leading-snug text-slate-500">{ex.experience}</p>
                </div>
              </div>

              <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm italic leading-relaxed text-slate-700">
                &ldquo;{ex.focus}&rdquo;
              </p>

              <div className="mt-4 flex items-start gap-2 text-[13px] leading-snug text-slate-600">
                <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                {ex.engagements}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {ex.domains.map((d) => (
                  <span
                    key={d}
                    className="rounded-md border border-electric-600/20 bg-electric-50 px-2 py-0.5 text-[11px] font-semibold text-electric-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ex.industries.map((ind) => (
                  <span
                    key={ind}
                    className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500"
                  >
                    {ind}
                  </span>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Working method
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{ex.method}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-slate-500">
          Profiles represent the diagnostic disciplines behind the platform&rsquo;s method —
          systems thinking, unit economics, cash-flow realism, and technology restraint.
        </p>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Camera, CheckCircle2, GitBranch, ListChecks, Search, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroStats = [
  { value: "10-step", label: "diagnostic method" },
  { value: "23", label: "business areas covered" },
  { value: "12+", label: "problem patterns mapped" },
];

const realities = [
  "Shops",
  "Workshops",
  "Restaurants",
  "Retail stores",
  "Service businesses",
  "Trades",
  "Studios",
  "Local suppliers",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 pt-[72px]">
      {/* backdrop layers */}
      <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,124,255,0.16),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.07),transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-3.5 py-1.5 text-xs font-medium text-electric-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-electric-400" />
              </span>
              Business diagnostics for small business — not motivational content
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
            >
              Turn business problems into{" "}
              <span className="text-electric-400 text-glow-electric">practical solutions.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300/95"
            >
              Understand what is holding your business back, identify the root cause, and build an
              actionable plan to improve it — sized for your money, your people, and your time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-13 bg-electric-500 px-7 text-[15px] font-semibold text-white shadow-xl shadow-electric-600/40 hover:bg-electric-400"
              >
                <a href="#diagnosis">
                  Analyze My Business
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 border-white/20 bg-white/[0.04] px-7 text-[15px] font-semibold text-white backdrop-blur hover:border-white/40 hover:bg-white/10 hover:text-white"
              >
                <a href="#problems">
                  <BookOpen className="mr-1.5 h-5 w-5" />
                  Explore Business Problems
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-white/10"
            >
              {heroStats.map((s) => (
                <div key={s.label} className="px-4 first:pl-0">
                  <div className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs leading-snug text-slate-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: diagnostic preview */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            {/* main report card — "case file" with attached field photo */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/80 shadow-2xl shadow-black/40 backdrop-blur">
              {/* scanning bar */}
              <div className="absolute inset-x-0 top-0 z-20 h-px overflow-hidden">
                <div className="animate-scan h-px w-full bg-gradient-to-r from-transparent via-electric-400 to-transparent" />
              </div>

              {/* field photo header */}
              <div className="relative h-32 sm:h-36">
                <img
                  src="/images/hero-owner.jpg"
                  alt="Small business owner working in a workshop"
                  className="h-full w-full object-cover object-[center_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-950/35 to-transparent" />
                <div className="absolute bottom-2.5 left-4 flex items-center gap-1.5 rounded-md bg-navy-950/70 px-2.5 py-1 backdrop-blur">
                  <Camera className="h-3 w-3 text-slate-300" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300">
                    Field observation · 07:40 AM
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-electric-400" />
                  <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
                    Diagnosis preview
                  </span>
                </div>
                <span className="rounded bg-signal-amber/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-signal-amber">
                  Live structure
                </span>
              </div>

              <div className="space-y-4 p-5">
                {/* Problem */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    <AlertTriangle className="h-3.5 w-3.5 text-signal-amber" />
                    What the owner sees
                  </div>
                  <p className="mt-1.5 text-[15px] font-medium leading-snug text-white">
                    &ldquo;We&rsquo;re busier than ever — but there&rsquo;s nothing left at the end of the month.&rdquo;
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2 text-[11px] font-semibold text-electric-300">
                  <GitBranch className="h-3.5 w-3.5" />
                  Symptom &rarr; cause
                </div>

                {/* Root cause */}
                <div className="rounded-lg border border-electric-500/20 bg-electric-500/[0.07] p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-electric-300">
                    Likely root cause
                  </div>
                  <p className="mt-1.5 text-sm leading-snug text-slate-200">
                    3 of the 10 best-selling products are priced below true cost. Growth concentrated
                    volume exactly where margin is thinnest.
                  </p>
                </div>

                {/* Plan preview */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "NOW", text: "Margin table", cls: "border-electric-500/30 bg-electric-500/10 text-electric-200" },
                    { label: "NEXT", text: "Reprice 9 items", cls: "border-signal-teal/30 bg-signal-teal/10 text-teal-100" },
                    { label: "LATER", text: "Value tiers", cls: "border-signal-amber/30 bg-signal-amber/10 text-amber-100" },
                  ].map((p) => (
                    <div key={p.label} className={`rounded-lg border p-2.5 ${p.cls}`}>
                      <div className="font-display text-[10px] font-bold tracking-[0.14em]">{p.label}</div>
                      <div className="mt-1 text-xs font-medium leading-tight">{p.text}</div>
                    </div>
                  ))}
                </div>

                {/* KPI */}
                <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
                  <ListChecks className="h-4 w-4 shrink-0 text-signal-teal" />
                  <p className="text-xs leading-snug text-slate-300">
                    <span className="font-semibold text-white">KPI:</span> gross margin 41% &rarr; 50%,
                    reviewed weekly on a one-page scorecard.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
                <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-signal-green" />
                  Facts, assumptions &amp; to-verify kept separate
                </span>
                <span className="font-display text-[11px] font-bold text-electric-400">Groundwork</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* reality strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 border-t border-white/[0.07] pt-7"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Built for real businesses
            </span>
            {realities.map((r) => (
              <span key={r} className="text-sm font-medium text-slate-400 transition-colors hover:text-slate-200">
                {r}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-navy-950">
      <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,124,255,0.18),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
        >
          Find the problem. <span className="text-electric-400">Build the solution.</span>
          <br />
          Improve the business.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300"
        >
          Don&rsquo;t settle for more generic advice. Understand your business, identify the real
          problem, and know exactly what to do next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-13 bg-electric-500 px-8 text-[15px] font-semibold text-white shadow-xl shadow-electric-600/40 hover:bg-electric-400"
          >
            <a href="#diagnosis">
              Start Business Diagnosis
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-13 border-white/20 bg-white/[0.04] px-8 text-[15px] font-semibold text-white hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <a href="#diagnosis">
              <MessageSquareText className="mr-1.5 h-5 w-5" />
              Describe My Problem
            </a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 text-xs text-slate-500"
        >
          Free · No sign-up · Runs in about a minute · Your inputs stay on your side
        </motion.p>
      </div>
    </section>
  );
}

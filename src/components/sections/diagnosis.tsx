"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Loader2,
  MessageSquareText,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeading } from "@/components/shared";
import { ReportView, ReportActions } from "@/components/report-view";
import { categories, diagnosisQuestions } from "@/lib/business-data";
import { asReport, type DiagnosisReport } from "@/lib/diagnosis";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type Step = "describe" | "details" | "analyzing" | "report";

const loadingStages = [
  "Reading your description in full…",
  "Separating symptoms from root causes…",
  "Tracing processes and dependencies…",
  "Comparing solution options on cost, impact and risk…",
  "Sequencing the implementation plan…",
  "Defining KPIs and verification points…",
];

const sizes = ["Just me", "2-5 people", "6-10 people", "11-25 people", "26-50 people"];

export function Diagnosis() {
  const [step, setStep] = useState<Step>("describe");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("profit");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<DiagnosisReport | null>(null);
  const [stageIdx, setStageIdx] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const wizardTopRef = useRef<HTMLDivElement>(null);

  const questions = useMemo(
    () => diagnosisQuestions[(category as keyof typeof diagnosisQuestions) ?? "profit"] ?? [],
    [category]
  );

  useEffect(() => {
    if (step !== "analyzing") return;
    setStageIdx(0);
    const t = setInterval(() => {
      setStageIdx((i) => Math.min(i + 1, loadingStages.length - 1));
    }, 4200);
    return () => clearInterval(t);
  }, [step]);

  const canContinue = description.trim().length >= 25;

  const runDiagnosis = async () => {
    setStep("analyzing");
    setError(null);
    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          category: categories.find((c) => c.id === category)?.label ?? category,
          industry,
          size,
          answers: Object.fromEntries(
            questions
              .map((q) => [q.label, answers[q.id] ?? ""])
              .filter(([, v]) => (v as string).trim().length > 0)
          ),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Diagnosis failed");
      }
      const parsed = asReport(data.report);
      if (!parsed) throw new Error("The analysis returned an unexpected format. Please try again.");
      setReport(parsed);
      setStep("report");
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setError(msg);
      setStep("details");
      toast({
        title: "Diagnosis could not complete",
        description: msg,
        variant: "destructive",
      });
    }
  };

  const reset = () => {
    setStep("describe");
    setDescription("");
    setAnswers({});
    setIndustry("");
    setSize("");
    setReport(null);
    setError(null);
    setTimeout(() => {
      wizardTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <section id="diagnosis" className="relative bg-paper">
      <div className="bg-grid-faint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Business diagnosis"
          title="What is the biggest problem in your business right now?"
          description="Describe it in your own words. The diagnostic engine separates symptoms from root causes, compares real solution options, and returns a prioritized plan with KPIs — distinguishing what is known, assumed, and still needs verification."
        />

        <div ref={wizardTopRef} className="mt-12">
          <AnimatePresence mode="wait">
            {/* ---------------- STEP 1: describe ---------------- */}
            {step === "describe" && (
              <motion.div
                key="describe"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card-lift-lg"
              >
                <div className="border-b border-slate-100 bg-gradient-to-r from-navy-950 to-navy-800 px-6 py-4">
                  <div className="flex items-center gap-2 text-white">
                    <MessageSquareText className="h-4 w-4 text-electric-400" />
                    <span className="font-display text-sm font-bold">Step 1 of 2 — Describe the situation</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <Label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Which area feels most broken?
                  </Label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className={cn(
                          "rounded-lg border px-3.5 py-2 text-sm font-medium transition-all",
                          category === c.id
                            ? "border-electric-600 bg-electric-600 text-white shadow-md shadow-electric-600/25"
                            : "border-slate-200 bg-white text-slate-700 hover:border-electric-400 hover:text-electric-700"
                        )}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Not sure? Pick your gut feeling — the diagnosis will test whether the problem actually lives there.
                  </p>

                  <div className="mt-7">
                    <Label htmlFor="description" className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      What is happening in your business?
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. We're busier than ever — more customers, more orders — but at the end of the month there's nothing left. I work 60+ hours and my own pay keeps shrinking. I don't know if my prices are wrong or my costs are too high…"
                      className="mt-3 min-h-[140px] border-slate-300 text-[15px] leading-relaxed focus-visible:ring-electric-500"
                    />
                    <div className="mt-1.5 flex justify-between text-xs text-slate-400">
                      <span>Facts, numbers and feelings all help. Write like you&rsquo;d talk.</span>
                      <span className={cn(canContinue ? "text-signal-green-deep font-medium" : "")}>
                        {description.trim().length} / 25 min
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="mt-7 flex items-center justify-between gap-3">
                    <p className="hidden text-xs text-slate-500 sm:block">
                      Next: 3 targeted questions — only the ones that can change the diagnosis.
                    </p>
                    <Button
                      onClick={() => setStep("details")}
                      disabled={!canContinue}
                      className="bg-electric-600 px-6 font-semibold text-white hover:bg-electric-500 disabled:opacity-40"
                    >
                      Continue
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------- STEP 2: targeted questions ---------------- */}
            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card-lift-lg"
              >
                <div className="border-b border-slate-100 bg-gradient-to-r from-navy-950 to-navy-800 px-6 py-4">
                  <div className="flex items-center gap-2 text-white">
                    <Search className="h-4 w-4 text-electric-400" />
                    <span className="font-display text-sm font-bold">Step 2 of 2 — Three targeted questions</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="industry" className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        Business type (optional)
                      </Label>
                      <Input
                        id="industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="e.g. Bakery, plumbing, salon, consulting…"
                        className="mt-2 border-slate-300 focus-visible:ring-electric-500"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        Team size (optional)
                      </Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger className="mt-2 border-slate-300 focus:ring-electric-500">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-7 space-y-6">
                    {questions.map((q, i) => (
                      <div key={q.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Label className="text-[15px] font-semibold text-navy-950">
                              <span className="mr-2 font-display text-electric-600">Q{i + 1}.</span>
                              {q.label}
                            </Label>
                            <p className="mt-1 text-xs leading-snug text-slate-500">{q.hint}</p>
                          </div>
                        </div>
                        <Textarea
                          value={answers[q.id] ?? ""}
                          onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                          placeholder={q.placeholder}
                          className="mt-3 min-h-[72px] border-slate-300 bg-white text-sm leading-relaxed focus-visible:ring-electric-500"
                        />
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 text-xs text-slate-500">
                    Answer what you know, skip what you don&rsquo;t — the engine works with incomplete information and
                    flags what still needs verification.
                  </p>

                  {error && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="mt-7 flex items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("describe")}
                      className="border-slate-300 font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={runDiagnosis}
                      className="bg-electric-600 px-6 font-semibold text-white hover:bg-electric-500"
                    >
                      <Brain className="mr-1.5 h-4 w-4" />
                      Run Diagnosis
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------- ANALYZING ---------------- */}
            {step === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card-lift-lg"
              >
                <div className="relative bg-navy-950 px-6 py-12 sm:px-10 sm:py-16">
                  <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
                  <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
                    <div className="animate-pulse-ring flex h-16 w-16 items-center justify-center rounded-2xl bg-electric-500 shadow-xl shadow-electric-600/40">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-white">
                      Running your business diagnosis
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Applying the 10-step method to your situation. This usually takes under a minute.
                    </p>
                    <div className="mt-8 w-full space-y-2.5">
                      {loadingStages.map((s, i) => (
                        <div
                          key={s}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-[13px] transition-all duration-500",
                            i < stageIdx
                              ? "border-signal-teal/25 bg-signal-teal/10 text-teal-100"
                              : i === stageIdx
                                ? "border-electric-500/40 bg-electric-500/15 text-white"
                                : "border-white/[0.06] bg-white/[0.02] text-slate-500"
                          )}
                        >
                          {i < stageIdx ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-signal-teal" />
                          ) : i === stageIdx ? (
                            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-electric-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0 text-slate-600" />
                          )}
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------- REPORT ---------------- */}
            {step === "report" && report && (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                ref={resultRef}
                className="space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-card-lift">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-green-deep/10">
                      <CheckCircle2 className="h-5 w-5 text-signal-green-deep" />
                    </span>
                    <div>
                      <div className="font-display text-base font-bold text-navy-950">Your diagnosis is ready</div>
                      <div className="text-xs text-slate-500">
                        Structured by the 10-step method · facts, assumptions and to-verify kept separate
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-electric-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-electric-700">
                    {categories.find((c) => c.id === category)?.label ?? category} · {industry || "General business"}
                  </span>
                </div>

                <ReportView report={report} />
                <ReportActions onReset={reset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

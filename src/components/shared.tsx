"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, phaseLabel } from "@/lib/i18n";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
          dark
            ? "border-electric-500/30 bg-electric-500/10 text-electric-300"
            : "border-electric-600/25 bg-electric-50 text-electric-700"
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-electric-400" : "bg-electric-600")} />
        {eyebrow}
      </div>
      <h2
        className={cn(
          "mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-navy-950"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-slate-300/90" : "text-slate-600"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Direction-aware arrow: points right in English (LTR), left in Arabic (RTL).
 */
export function ArrowDir({ className }: { className?: string }) {
  const { isAr } = useLang();
  return (
    <ArrowRight className={cn(className, isAr && "-scale-x-100")} aria-hidden="true" />
  );
}

type Priority = "NOW" | "NEXT" | "LATER";

const priorityStyles: Record<Priority, string> = {
  NOW: "bg-electric-500/15 text-electric-300 border-electric-500/40",
  NEXT: "bg-signal-teal/15 text-signal-teal border-signal-teal/40",
  LATER: "bg-signal-amber/15 text-signal-amber border-signal-amber/40",
};

const priorityStylesLight: Record<Priority, string> = {
  NOW: "bg-electric-500/10 text-electric-700 border-electric-600/30",
  NEXT: "bg-signal-green-deep/10 text-signal-green-deep border-signal-green-deep/30",
  LATER: "bg-signal-amber-deep/10 text-signal-amber-deep border-signal-amber-deep/50",
};

export function PriorityBadge({
  priority,
  dark = false,
  className,
}: {
  priority: string;
  dark?: boolean;
  className?: string;
}) {
  const { lang } = useLang();
  const p = (["NOW", "NEXT", "LATER"].includes(priority) ? priority : "NOW") as Priority;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.12em]",
        dark ? priorityStyles[p] : priorityStylesLight[p],
        className
      )}
    >
      {phaseLabel(p, lang)}
    </span>
  );
}

interface RatingChipProps {
  label: string;
  value: string;
}

const ratingColors: Record<string, string> = {
  High: "bg-signal-green-deep",
  Medium: "bg-signal-amber",
  Low: "bg-slate-400",
};

/** Small pill showing a rated dimension like Impact: High */
export function RatingChip({ label, value }: RatingChipProps) {
  const dot = ratingColors[value] ?? "bg-slate-400";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700">
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
      {label}: <span className="font-semibold">{value}</span>
    </span>
  );
}

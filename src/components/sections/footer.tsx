import { Activity } from "lucide-react";

const platformLinks = [
  { href: "#method", label: "The Method" },
  { href: "#diagnosis", label: "Business Diagnosis" },
  { href: "#problems", label: "Problem Library" },
  { href: "#tools", label: "Business Tools" },
  { href: "#action-plan", label: "Action Plans" },
  { href: "#cases", label: "Case Studies" },
];

const areaLinks = [
  "Pricing & margins",
  "Cash flow",
  "Sales systems",
  "Customer retention",
  "Operations & process",
  "Automation & AI",
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#03060c]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-electric-700">
                <Activity className="h-5 w-5 text-white" strokeWidth={2.4} />
              </span>
              <span className="font-display text-lg font-bold text-white">Groundwork</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Tell us what is happening in your business. We help you understand the problem, find
              the cause, and build a practical solution — sized for small business money, people,
              and time.
            </p>
            <p className="mt-5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-xs leading-relaxed text-slate-500">
              Groundwork provides business decision support, not financial, legal, or tax advice.
              Verify material decisions with a qualified professional.
            </p>
          </div>

          <nav aria-label="Platform">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5">
              {platformLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-electric-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Common areas
            </h3>
            <ul className="mt-4 space-y-2.5">
              {areaLinks.map((a) => (
                <li key={a}>
                  <a
                    href="#problems"
                    className="text-sm text-slate-400 transition-colors hover:text-electric-300"
                  >
                    {a}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-7 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Groundwork — Business Diagnostics &amp; Practical Solutions
          </p>
          <p className="text-xs text-slate-600">
            Systems, not symptoms.
          </p>
        </div>
      </div>
    </footer>
  );
}

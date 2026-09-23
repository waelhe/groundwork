"use client";

import { Activity } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { ui } from "@/lib/ui-strings";

export function Footer() {
  const { t } = useLang();

  const platformLinks = [
    { href: "#method", label: t(ui.footer.theMethod) },
    { href: "#diagnosis", label: t(ui.footer.diagnosis) },
    { href: "#problems", label: t(ui.footer.library) },
    { href: "#tools", label: t(ui.footer.tools) },
    { href: "#action-plan", label: t(ui.footer.plans) },
    { href: "#cases", label: t(ui.footer.cases) },
  ];

  const areaLinks = [
    t(ui.footer.areaLinks.pricing),
    t(ui.footer.areaLinks.cash),
    t(ui.footer.areaLinks.sales),
    t(ui.footer.areaLinks.retention),
    t(ui.footer.areaLinks.ops),
    t(ui.footer.areaLinks.ai),
  ];

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
              {t(ui.footer.desc)}
            </p>
            <p className="mt-5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-xs leading-relaxed text-slate-500">
              {t(ui.footer.disclaimer)}
            </p>
          </div>

          <nav aria-label={t(ui.footer.platform)}>
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {t(ui.footer.platform)}
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
              {t(ui.footer.areas)}
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
            © {new Date().getFullYear()} {t(ui.footer.copyright)}
          </p>
          <p className="text-xs text-slate-600">
            {t(ui.footer.tagline)}
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, Menu, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { ui } from "@/lib/ui-strings";
import { ArrowDir } from "@/components/shared";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, isAr, setLang, t } = useLang();

  const links = [
    { href: "#method", label: t(ui.nav.method) },
    { href: "#diagnosis", label: t(ui.nav.diagnosis) },
    { href: "#problems", label: t(ui.nav.problems) },
    { href: "#tools", label: t(ui.nav.tools) },
    { href: "#action-plan", label: t(ui.nav.actionPlan) },
    { href: "#cases", label: t(ui.nav.cases) },
    { href: "#experts", label: t(ui.nav.experts) },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-navy-950/90 backdrop-blur-xl"
          : "border-b border-transparent bg-navy-950/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="#top" className="group flex items-center gap-2.5" aria-label="Groundwork home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-electric-700 shadow-lg shadow-electric-600/30">
            <Activity className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Groundwork
            <span className="ms-1.5 hidden rounded border border-white/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-300 sm:inline-block">
              {t(ui.brand.tagline)}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t(ui.nav.mainNav)}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLang(isAr ? "en" : "ar")}
            aria-label={t(ui.nav.langLabel)}
            title={t(ui.nav.langLabel)}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 px-3 text-[13px] font-semibold text-slate-200 transition-colors hover:border-electric-400/50 hover:bg-white/[0.06] hover:text-white",
              isAr && "font-display"
            )}
          >
            <Languages className="h-4 w-4 text-electric-400" aria-hidden="true" />
            {t(ui.nav.switchToAr)}
          </button>

          <Button
            asChild
            className="hidden bg-electric-500 font-semibold text-white shadow-lg shadow-electric-600/30 hover:bg-electric-400 sm:inline-flex"
          >
            <a href="#diagnosis">
              {t(ui.nav.cta)}
              <ArrowDir className="ms-1 h-4 w-4" />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white lg:hidden"
                aria-label={t(ui.nav.openMenu)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              id="mobile-nav-sheet"
              side={isAr ? "left" : "right"}
              className="w-[300px] border-white/10 bg-navy-950 p-0"
            >
              <SheetTitle className="sr-only">{t(ui.nav.navigation)}</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-electric-700">
                      <Activity className="h-4 w-4 text-white" strokeWidth={2.4} />
                    </span>
                    <span className="font-display text-base font-bold text-white">Groundwork</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLang(isAr ? "en" : "ar")}
                    aria-label={t(ui.nav.langLabel)}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/15 px-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-electric-400/50 hover:bg-white/[0.06] hover:text-white"
                  >
                    <Languages className="h-3.5 w-3.5 text-electric-400" aria-hidden="true" />
                    {t(ui.nav.switchToAr)}
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label={t(ui.nav.mobileNav)}>
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-4 py-3 text-[15px] font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
                <div className="border-t border-white/10 p-4">
                  <Button
                    asChild
                    className="w-full bg-electric-500 font-semibold text-white hover:bg-electric-400"
                  >
                    <a href="#diagnosis" onClick={() => setOpen(false)}>
                      {t(ui.nav.cta)}
                      <ArrowDir className="ms-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

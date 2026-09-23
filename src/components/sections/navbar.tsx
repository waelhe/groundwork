"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "#method", label: "Method" },
  { href: "#diagnosis", label: "Diagnosis" },
  { href: "#problems", label: "Problems" },
  { href: "#tools", label: "Tools" },
  { href: "#action-plan", label: "Action Plan" },
  { href: "#cases", label: "Cases" },
  { href: "#experts", label: "Experts" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            <span className="ml-1.5 hidden rounded border border-white/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-300 sm:inline-block">
              Business Diagnostics
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
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

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden bg-electric-500 font-semibold text-white shadow-lg shadow-electric-600/30 hover:bg-electric-400 sm:inline-flex"
          >
            <a href="#diagnosis">
              Analyze My Business
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent id="mobile-nav-sheet" side="right" className="w-[300px] border-white/10 bg-navy-950 p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2.5 border-b border-white/10 px-6 py-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-electric-700">
                    <Activity className="h-4 w-4 text-white" strokeWidth={2.4} />
                  </span>
                  <span className="font-display text-base font-bold text-white">Groundwork</span>
                </div>
                <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
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
                      Analyze My Business
                      <ArrowRight className="ml-1 h-4 w-4" />
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

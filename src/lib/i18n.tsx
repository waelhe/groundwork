"use client";

/**
 * Groundwork — lightweight bilingual (EN/AR) language layer.
 *
 * Uses `useSyncExternalStore` over a tiny module-level store:
 * - During SSR/hydration the snapshot is always "en" (matches server HTML).
 * - After hydration React re-reads the client snapshot, adopting the stored /
 *   browser-detected language without a manual setState-in-effect.
 * - The inline script in layout.tsx sets <html lang/dir> pre-hydration, so
 *   Arabic users see RTL immediately with no flash.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ui, type Bi } from "@/lib/ui-strings";

export type Lang = "en" | "ar";

const STORAGE_KEY = "gw-lang";

const TITLES: Record<Lang, string> = {
  en: "Groundwork — Business Diagnostics & Practical Solutions",
  ar: "جراوند ورك — تشخيص الأعمال وحلول عملية",
};

/* ------------------------------------------------------------------ */
/* External store                                                      */
/* ------------------------------------------------------------------ */

type Listener = () => void;
const listeners = new Set<Listener>();
let storeLang: Lang = "en";
let initialized = false;

function readInitial(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") return stored;
  } catch {
    /* storage unavailable */
  }
  const navAr =
    typeof navigator !== "undefined" &&
    (navigator.language || "").toLowerCase().indexOf("ar") === 0;
  return navAr ? "ar" : "en";
}

function initOnce() {
  if (!initialized && typeof window !== "undefined") {
    storeLang = readInitial();
    initialized = true;
  }
}

function subscribe(listener: Listener) {
  initOnce();
  listeners.add(listener);
  // Sync across tabs.
  const onStorage = () => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "ar" || stored === "en") {
        storeLang = stored;
        listeners.forEach((fn) => fn());
      }
    } catch {
      /* ignore */
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Lang {
  initOnce();
  return storeLang;
}

function getServerSnapshot(): Lang {
  return "en";
}

function setLangExternal(l: Lang) {
  storeLang = l;
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* storage unavailable — session-only preference */
  }
  const el = document.documentElement;
  el.lang = l;
  el.dir = l === "ar" ? "rtl" : "ltr";
  document.title = TITLES[l];
  listeners.forEach((fn) => fn());
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

interface LangContextValue {
  lang: Lang;
  isAr: boolean;
  setLang: (l: Lang) => void;
  /** Resolve a bilingual pair to a string for the active language. */
  t: (pair: Bi) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  isAr: false,
  setLang: () => {},
  t: (pair) => pair.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Belt-and-braces: keep <html> attributes and title aligned after any
  // language change (including the post-hydration adoption pass).
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = TITLES[lang];
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangExternal(l), []);
  const t = useCallback((pair: Bi) => (lang === "ar" ? pair.ar : pair.en), [lang]);

  return (
    <LangContext.Provider value={{ lang, isAr: lang === "ar", setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/* ------------------------------------------------------------------ */
/* Display-time enum translation (data keeps canonical English keys)   */
/* ------------------------------------------------------------------ */

export function ratingLabel(value: string, lang: Lang): string {
  const v = value?.toLowerCase();
  if (v === "high") return lang === "ar" ? ui.report.high.ar : ui.report.high.en;
  if (v === "medium") return lang === "ar" ? ui.report.medium.ar : ui.report.medium.en;
  if (v === "low") return lang === "ar" ? ui.report.low.ar : ui.report.low.en;
  return value;
}

export function confidenceLabel(value: string, lang: Lang): string {
  const v = value?.toLowerCase();
  if (v.includes("likely")) return lang === "ar" ? ui.report.likely.ar : ui.report.likely.en;
  if (v.includes("possible")) return lang === "ar" ? ui.report.possible.ar : ui.report.possible.en;
  if (v.includes("verif")) return lang === "ar" ? ui.report.needsVerif.ar : ui.report.needsVerif.en;
  return value;
}

export function frequencyLabel(value: string, lang: Lang): string {
  const map: Record<string, { en: string; ar: string }> = {
    "Most common": { en: ui.problems.mostCommon.en, ar: ui.problems.mostCommon.ar },
    Frequent: { en: ui.problems.frequent.en, ar: ui.problems.frequent.ar },
    "Often hidden": { en: ui.problems.oftenHidden.en, ar: ui.problems.oftenHidden.ar },
    Possible: { en: ui.problems.possible.en, ar: ui.problems.possible.ar },
  };
  const p = map[value] ?? ui.problems.oftenHidden;
  return lang === "ar" ? p.ar : p.en;
}

/** NOW / NEXT / LATER badge labels. */
export const phaseLabels: Record<string, Bi> = {
  NOW: { en: "NOW", ar: "الآن" },
  NEXT: { en: "NEXT", ar: "التالي" },
  LATER: { en: "LATER", ar: "لاحقًا" },
};

export function phaseLabel(phase: string, lang: Lang): string {
  const p = phaseLabels[phase];
  return p ? (lang === "ar" ? p.ar : p.en) : phase;
}

/**
 * Groundwork — language-aware content selectors.
 * Returns the EN or AR variant of the site/business data.
 */

import type { Lang } from "@/lib/i18n";
import * as siteEn from "./site-content";
import * as siteAr from "./site-content.ar";
import * as bizEn from "./business-data";
import * as bizAr from "./business-data.ar";

export type SiteContent = typeof siteEn;
export type BusinessData = typeof bizEn;

export function siteContent(lang: Lang): SiteContent {
  return lang === "ar" ? (siteAr as unknown as SiteContent) : siteEn;
}

export function businessData(lang: Lang): BusinessData {
  return lang === "ar" ? (bizAr as unknown as BusinessData) : bizEn;
}

import type { Metadata } from "next";
import { Inter, Space_Grotesk, Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Groundwork — Business Diagnostics & Practical Solutions",
  description:
    "Tell us what is happening in your business. We help you understand the problem, find the root cause, and build a practical, measurable solution — sized for small business budgets, teams, and time.",
  keywords: [
    "business diagnosis",
    "small business consulting",
    "root cause analysis",
    "business problems",
    "pricing analysis",
    "break-even analysis",
    "business tools",
    "action plan",
    "تشخيص الأعمال",
    "حلول عملية",
    "استشارات الأعمال الصغيرة",
  ],
  authors: [{ name: "Groundwork" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Groundwork — Turn Business Problems Into Practical Solutions",
    description:
      "Understand what is holding your business back, identify the root cause, and build an actionable plan to improve it.",
    siteName: "Groundwork",
    type: "website",
  },
};

/**
 * Runs before hydration: adopts the stored / browser-detected language and
 * sets <html lang/dir> immediately, so Arabic users never see an LTR flash.
 * `suppressHydrationWarning` on <html> covers the attribute delta.
 */
const langInitScript = `(function(){try{var s=localStorage.getItem("gw-lang");var n=(navigator.language||"").toLowerCase().indexOf("ar")===0?"ar":"en";var l=(s==="ar"||s==="en")?s:n;if(l==="ar"){var e=document.documentElement;e.lang="ar";e.dir="rtl";}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${tajawal.variable} ${plexArabic.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

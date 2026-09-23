import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

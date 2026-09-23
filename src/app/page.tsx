import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Method } from "@/components/sections/method";
import { Diagnosis } from "@/components/sections/diagnosis";
import { ProblemLibrary } from "@/components/sections/problem-library";
import { Tools } from "@/components/sections/tools";
import { ActionPlan } from "@/components/sections/action-plan";
import { CaseStudies } from "@/components/sections/case-studies";
import { Experts } from "@/components/sections/experts";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Method />
        <Diagnosis />
        <ProblemLibrary />
        <Tools />
        <ActionPlan />
        <CaseStudies />
        <Experts />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

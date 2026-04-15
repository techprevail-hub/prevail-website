// app/compare/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, X, ChevronRight, Award, Zap, Users, Building2, Briefcase, Star } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ComparisonTable from "@/components/ui/ComparisonTable";

export const metadata: Metadata = {
  title: "Why Prevail | Compare to Handshake, Prentus & More",
  description:
    "See how Prevail compares to Handshake, Prentus, Careerflow, and other career platforms. The only platform combining AI tools, human coaching, and personal branding.",
};

const fullComparisonRows = [
  { feature: "AI Resume Builder & Optimizer", columns: [false, true, true, true] },
  { feature: "LinkedIn Profile Optimizer", columns: [false, true, true, true] },
  { feature: "AI Mock Interviews", columns: [false, true, true, true] },
  { feature: "Human Coaching Marketplace", columns: [false, false, false, true] },
  { feature: "AI Headshot / Image Creator", columns: [false, false, false, true] },
  { feature: "CXO / Executive Branding Suite", columns: [false, false, false, true] },
  { feature: "B2B Institutional Platform", columns: [true, true, "partial", true] },
  { feature: "Outcome / Placement Tracking", columns: [false, true, false, true] },
  { feature: "Individual Freemium Access", columns: [true, false, true, true] },
  { feature: "Cover Letter Generator", columns: [false, true, true, true] },
  { feature: "Personal Website Builder", columns: [false, false, false, "Phase 2"] },
  { feature: "Job Market Insights & Trends", columns: [false, false, false, "Phase 2"] },
];

export default function ComparePage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO - 3 rows centered text
          Increased spacing between navbar and text
      ════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-[80px] overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCD94]/20 via-[#F9F8F6] to-white" />
        
        {/* Decorative blobs */}
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#6A4DFB]/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[#FFB252]/10 blur-3xl" />
        <div className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full bg-[#38226C]/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 w-full text-center">
          {/* Eyebrow badge */}
          <div className="reveal inline-flex items-center gap-2 bg-[#38226C]/5 border border-[#38226C]/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#6A4DFB]" />
            <span className="text-xs font-bold tracking-widest text-[#38226C] uppercase">How Prevail Compares</span>
          </div>

          {/* 3 Rows of Text */}
          <h1 className="reveal delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1A1A2E] leading-[1.2] tracking-tight">
            <div>Why Professionals and</div>
            <div>Institutions Choose</div>
            <div>
              <span className="bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] bg-clip-text text-transparent">Prevail</span>
            </div>
          </h1>
          
          <p className="reveal delay-200 text-xl text-[#1A1A2E]/60 max-w-2xl mx-auto mt-6">
            We built Prevail because no single platform combined AI tools, human coaching,
            and personal branding — for every type of user. See the difference.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FULL COMPARISON TABLE
      ════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <SectionLabel className="reveal">Feature Comparison</SectionLabel>
            <h2 className="reveal delay-100 text-4xl lg:text-5xl font-extrabold text-[#1A1A2E]">See How We Stack Up</h2>
            <p className="reveal delay-200 text-[#1A1A2E]/50 mt-4 max-w-2xl mx-auto">The only platform that truly does it all — for individuals and institutions alike.</p>
          </div>
          <div className="reveal delay-100">
            <ComparisonTable
              headers={["Feature / Capability", "Handshake", "Prentus", "Careerflow", "Prevail"]}
              rows={fullComparisonRows}
              highlightColumn={4}
              className="max-w-6xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PREVAIL vs HANDSHAKE
      ════════════════════════════════════════ */}
      <section className="py-28 bg-[#F9F8F6] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[#FFCD94]/30 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <SectionLabel className="reveal">Prevail vs Handshake</SectionLabel>
            <h2 className="reveal delay-100 text-4xl lg:text-5xl font-extrabold text-[#1A1A2E]">The Difference Is Clear</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="reveal-left p-8 rounded-2xl border border-[#1A1A2E]/8 bg-white hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#1A1A2E]/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#1A1A2E]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E]">What Handshake does well</h3>
              </div>
              <ul className="space-y-3">
                {["Job discovery and employer network", "University partnerships and reach", "Early-career hiring at scale"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#1A1A2E]/60">
                    <span className="text-[#1A1A2E]/30 mt-0.5">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal-right p-8 rounded-2xl border-2 border-[#38226C] bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#38226C] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#38226C]">Where Prevail wins</h3>
              </div>
              <ul className="space-y-3">
                {["AI career tools: resume optimizer, LinkedIn scorer, cover letters", "Human coaching marketplace — book experts inside the platform", "AI headshot creator and personal branding tools", "CXO and executive personal branding suite", "Serves professionals at every stage, not just early career"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#1A1A2E]">
                    <Check className="w-4 h-4 text-[#FFB252] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="reveal delay-300 text-center mt-10">
            <div className="inline-block px-6 py-3 bg-[#38226C]/10 rounded-full">
              <p className="text-lg font-semibold text-[#38226C]">
                “Handshake gets you to the job listing. Prevail helps you win it.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PREVAIL vs PRENTUS
      ════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[#6A4DFB]/5 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <SectionLabel className="reveal">Prevail vs Prentus</SectionLabel>
            <h2 className="reveal delay-100 text-4xl lg:text-5xl font-extrabold text-[#1A1A2E]">Institution-First vs User-First</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              "Prentus is built for institutions only — students cannot sign up independently.",
              "Prevail serves institutions AND gives individual students open freemium access.",
              "Prevail adds coaching marketplace, headshots, and CXO branding that Prentus doesn't have.",
            ].map((point, idx) => (
              <div key={point} className={`reveal delay-${(idx+1)*100} flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 border border-[#1A1A2E]/8 hover:shadow-lg transition-all duration-300`}>
                <div className="w-8 h-8 rounded-full bg-[#38226C]/10 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-[#38226C]" />
                </div>
                <p className="text-[#1A1A2E]/70">{point}</p>
              </div>
            ))}
          </div>
          <div className="reveal delay-400 text-center mt-10">
            <div className="inline-block px-6 py-3 bg-[#38226C]/10 rounded-full">
              <p className="text-lg font-semibold text-[#38226C]">
                “Prentus serves the institution. Prevail serves the institution AND the student.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY LEGACY TOOLS ARE NO LONGER ENOUGH
      ════════════════════════════════════════ */}
      <section className="py-28 bg-[#F9F8F6] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[#FFCD94]/20 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <SectionLabel className="reveal">The Legacy Problem</SectionLabel>
            <h2 className="reveal delay-100 text-4xl lg:text-5xl font-extrabold text-[#1A1A2E]">Why Legacy Tools Are No Longer Enough</h2>
            <p className="reveal delay-200 text-[#1A1A2E]/50 mt-4 max-w-2xl mx-auto">The career tech landscape has changed. Old tools can't keep up.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <Award className="w-6 h-6" />, label: "Built before AI", desc: "Legacy tools were built before AI — slow to implement, expensive to license, poor UX." },
              { icon: <Zap className="w-6 h-6" />, label: "Faster deployment", desc: "Prevail is AI-native from day one — faster deployment, better student experience, more cost-effective." },
              { icon: <Users className="w-6 h-6" />, label: "Pilot in weeks", desc: "Legacy tools require long procurement cycles; Prevail can be piloted in weeks." },
            ].map((item, idx) => (
              <div key={item.label} className={`reveal delay-${(idx+1)*100} p-8 rounded-2xl bg-white border border-[#1A1A2E]/8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center`}>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#38226C] to-[#6A4DFB] flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">{item.label}</h3>
                <p className="text-[#1A1A2E]/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
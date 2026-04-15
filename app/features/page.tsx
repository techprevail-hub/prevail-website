// app/features/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Search, Mail, Mic, BarChart3, Camera, Globe, PenLine, Lightbulb, CalendarCheck, Users, Award, Layers, Bot, Sparkles, Check, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionLabel from "@/components/ui/SectionLabel";

const TABS = ["AI Career Tools", "Personal Branding", "Coaching & Expert Access", "For Institutions"] as const;
type TabType = typeof TABS[number];

interface Feature {
  icon: React.ReactNode;
  name: string;
  desc: string;
  comingSoon?: boolean;
}

const FEATURES: Record<TabType, Feature[]> = {
  "AI Career Tools": [
    { icon: <FileText className="w-5 h-5" />, name: "Resume and CV Optimizer", desc: "Upload or paste. Target a specific role. Get ATS-optimized output + score + suggestions." },
    { icon: <Search className="w-5 h-5" />, name: "LinkedIn Profile Optimizer", desc: "Score headline, summary, experience. Rewrite suggestions per section." },
    { icon: <Mail className="w-5 h-5" />, name: "Cover Letter Generator", desc: "Role-specific, personalized cover letters in under 60 seconds." },
    { icon: <Mic className="w-5 h-5" />, name: "AI Mock Interviews", desc: "Voice AI, real company-style questions, instant scoring and feedback." },
    { icon: <Layers className="w-5 h-5" />, name: "Job Application Tracker", desc: "Track all your applications, interviews, and follow-ups in one place.", comingSoon: true },
  ],
  "Personal Branding": [
    { icon: <Camera className="w-5 h-5" />, name: "AI Headshot Creator", desc: "Upload any photo. Get 3–5 professional headshots + LinkedIn banner." },
    { icon: <Layers className="w-5 h-5" />, name: "LinkedIn Banner Generator", desc: "Branded cover image matched to your role and industry." },
    { icon: <PenLine className="w-5 h-5" />, name: "Executive Bio Writer", desc: "AI-drafted 150-word and 500-word professional bios." },
    { icon: <Globe className="w-5 h-5" />, name: "Personal Website Builder", desc: "Build a stunning personal website with no coding required.", comingSoon: true },
    { icon: <Lightbulb className="w-5 h-5" />, name: "Thought Leadership Content Kit", desc: "Monthly LinkedIn post drafts tailored to your voice and industry. Executive tier only.", comingSoon: true },
  ],
  "Coaching & Expert Access": [
    { icon: <Users className="w-5 h-5" />, name: "Coaching Marketplace", desc: "Browse verified coaches by industry, role, seniority, and price." },
    { icon: <CalendarCheck className="w-5 h-5" />, name: "1:1 Booking and Payment", desc: "Integrated calendar + Stripe payment, all inside Prevail." },
    { icon: <Award className="w-5 h-5" />, name: "Coach Profiles", desc: "Expert credentials, reviews, session history, domain tags." },
    { icon: <Users className="w-5 h-5" />, name: "Group Workshops", desc: "Join live group sessions led by industry experts.", comingSoon: true },
  ],
  "For Institutions": [
    { icon: <BarChart3 className="w-5 h-5" />, name: "Advisor Dashboard", desc: "All students, usage metrics, outcomes in one view." },
    { icon: <Bot className="w-5 h-5" />, name: "AI Career Agents", desc: "Automated student outreach and follow-up." },
    { icon: <Layers className="w-5 h-5" />, name: "Outcome Tracking", desc: "LinkedIn-verified, NACE/OBBBA export." },
    { icon: <Users className="w-5 h-5" />, name: "Employer Partnerships Module", desc: "Connect your students with top employers at scale.", comingSoon: true },
    { icon: <Award className="w-5 h-5" />, name: "White-Label Option", desc: "Launch Prevail under your institution's brand.", comingSoon: true },
  ],
};

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("AI Career Tools");

  return (
    <>
      {/* ════════════════════════════════════════
          HERO - Increased spacing between navbar and text
      ════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center pt-[80px] overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCD94]/20 via-[#F9F8F6] to-white" />
        
        {/* Decorative blobs */}
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#6A4DFB]/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[#FFB252]/10 blur-3xl" />
        <div className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full bg-[#38226C]/5 blur-3xl" />

        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 py-20 w-full text-center">
          {/* Eyebrow badge */}
          <div className="reveal inline-flex items-center gap-2 bg-[#38226C]/5 border border-[#38226C]/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#6A4DFB]" />
            <span className="text-xs font-bold tracking-widest text-[#38226C] uppercase">Full Feature Suite</span>
          </div>

          <h1 className="reveal delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1A1A2E] leading-[1.1] tracking-tight mb-6">
            All the Tools.{" "}
            <span className="bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] bg-clip-text text-transparent">One Platform.</span>
          </h1>
          <p className="reveal delay-200 text-xl text-[#1A1A2E]/60 max-w-2xl mx-auto">
            Prevail brings AI career tools, human coaching, personal branding, and institutional
            management together — beautifully designed and easy to use.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURES SECTION with TABS
      ════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/5 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Tab navigation - updated styling */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#38226C] text-white shadow-lg shadow-[#38226C]/25"
                    : "bg-[#F9F8F6] text-[#1A1A2E]/60 hover:bg-[#38226C]/10 hover:text-[#38226C]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content - updated card styling */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES[activeTab].map((feature, idx) => (
              <div
                key={feature.name}
                className={`reveal delay-${(idx % 3 + 1) * 100} group p-6 rounded-2xl border border-[#1A1A2E]/8 bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#38226C]/10 flex items-center justify-center text-[#6A4DFB] flex-shrink-0 group-hover:bg-[#38226C] group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold text-[#1A1A2E]">{feature.name}</h3>
                    {feature.comingSoon && <Badge variant="coming-soon">Coming Soon</Badge>}
                  </div>
                </div>
                <p className="text-[#1A1A2E]/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
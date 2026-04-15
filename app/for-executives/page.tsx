"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, Camera, PenLine, Lightbulb, Award, Users,
  ArrowRight, CheckCircle2, Sparkles, Check, ChevronRight
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

// ── Intersection observer hook ──
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Scroll-reveal wrapper ──
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-50px)",
    right: "translateX(50px)",
    scale: "scale(0.93) translateY(20px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: inView ? "none" : transforms[direction],
        opacity: inView ? 1 : 0,
        transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Animated counter ──
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const personas = [
  { emoji: "👔", title: "The C-Suite Executive", desc: "CEOs, CMOs, CFOs, and COOs who want a LinkedIn presence that reflects the seniority and credibility they have spent decades earning." },
  { emoji: "🎯", title: "The Ambitious Sales Leader", desc: "VPs of Sales and enterprise AEs who know that a polished personal brand shortens sales cycles and builds trust before the first call." },
  { emoji: "🚀", title: "The Entrepreneur and Founder", desc: "Startup founders who are simultaneously building a company and their own reputation as an industry voice and thought leader." },
  { emoji: "🏛️", title: "The Board-Seat Seeker", desc: "Senior leaders pursuing board positions who need a credibility package — bio, LinkedIn, and online presence — that matches the rooms they want to be in." },
];

const toolkitFeatures = [
  { icon: <Search className="w-6 h-6" />, title: "Executive LinkedIn Overhaul", description: "Complete AI-powered rewrite of your headline, about section, experience narratives, and featured content — written for board-level credibility." },
  { icon: <Camera className="w-6 h-6" />, title: "AI Professional Headshot Creator", description: "Upload any decent photo. Receive 3–5 board-ready professional headshots and a branded LinkedIn banner. Professional quality, instantly." },
  { icon: <PenLine className="w-6 h-6" />, title: "Executive Bio and Profile Writing", description: "We craft a compelling 150-word and 500-word executive bio for your website, conference profiles, board applications, and press kits." },
  { icon: <Lightbulb className="w-6 h-6" />, title: "Thought Leadership Content Kit", description: "Monthly AI-generated LinkedIn post drafts tailored to your industry, role, and voice — so you stay visible without writing from scratch." },
  { icon: <Award className="w-6 h-6" />, title: "Board and Speaker Profile Builder", description: "Package your credibility into a polished profile document for board applications, speaking opportunities, and investor meetings." },
  { icon: <Users className="w-6 h-6" />, title: "Expert Strategist Sessions", description: "Book 1:1 sessions with senior executive branding strategists — not junior coaches, but proven experts in executive positioning." },
];

// ── Toolkit feature card ──
function ToolkitCard({ feature, delay }: { feature: typeof toolkitFeatures[0]; delay: number }) {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
        opacity: inView ? 1 : 0,
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
      className="relative rounded-2xl p-7 cursor-default overflow-hidden group"
    >
      {/* Card bg layers */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(108,77,251,0.25) 0%, rgba(56,34,108,0.35) 100%)"
            : "rgba(255,255,255,0.04)",
          border: hovered
            ? "1px solid rgba(108,77,251,0.5)"
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow: hovered
            ? "0 0 40px rgba(108,77,251,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "none",
        }}
      />
      {/* Glow spot on hover */}
      <div
        className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl transition-all duration-500"
        style={{
          background: "rgba(108,77,251,0.3)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translate(-20%, -20%)" : "translate(-50%, -50%)",
        }}
      />
      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
          style={{
            background: hovered
              ? "linear-gradient(135deg, #FFB252, #AC5D00)"
              : "rgba(255,178,82,0.15)",
            color: "#FFB252",
            transform: hovered ? "scale(1.1) rotate(-3deg)" : "none",
          }}
        >
          {feature.icon}
        </div>
        <h3
          className="text-lg font-bold mb-2 transition-colors duration-300"
          style={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.90)" }}
        >
          {feature.title}
        </h3>
        <p
          className="text-sm leading-relaxed transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.50)" }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function ForExecutivesPage() {
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 100); return () => clearTimeout(t); }, []);

  // Stat counters
  const stat1Ref = useInView(0.3);
  const stat2Ref = useInView(0.3);
  const stat3Ref = useInView(0.3);
  const c1 = useCounter(75, 1800, stat1Ref.inView);
  const c2 = useCounter(89, 1800, stat3Ref.inView);

  return (
    <>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(6px)} }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-[80px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCD94]/20 via-[#F9F8F6] to-white" />
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#6A4DFB]/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[#FFB252]/10 blur-3xl" />
        <div className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full bg-[#38226C]/5 blur-3xl" />

        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 py-20 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left */}
            <div className="w-full lg:w-1/2">
              <div
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(20px)",
                  transition: "all 0.6s ease 0ms",
                }}
                className="inline-flex items-center gap-2 bg-[#38226C]/5 border border-[#38226C]/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6A4DFB]" />
                <span className="text-xs font-bold tracking-widest text-[#38226C] uppercase">
                  For CXOs, Founders, VPs &amp; Sales Leaders
                </span>
              </div>

              <h1
                className="text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem] font-extrabold text-[#1A1A2E] leading-[1.1] tracking-tight mb-6"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(30px)",
                  transition: "all 0.75s cubic-bezier(0.16,1,0.3,1) 150ms",
                }}
              >
                You&apos;ve Built a Great Career.{" "}
                <span className="bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] bg-clip-text text-transparent">
                  Now Build the Brand to Match.
                </span>
              </h1>

              <p
                className="text-lg text-[#1A1A2E]/60 leading-relaxed mb-10 max-w-xl"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(20px)",
                  transition: "all 0.7s ease 300ms",
                }}
              >
                Prevail&apos;s executive branding suite combines AI and expert strategy to help senior
                professionals establish thought leadership, elevate their digital presence, and open
                doors that experience alone cannot.
              </p>

              <div
                className="flex flex-wrap gap-4 mb-7"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(20px)",
                  transition: "all 0.7s ease 450ms",
                }}
              >
                <Link
                  href="/waitlist"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#38226C] text-white font-bold rounded-2xl hover:bg-[#2D1A56] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#38226C]/25 text-base"
                >
                  Join the Executive Waitlist
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div
                className="flex items-center gap-4 text-sm text-[#1A1A2E]/50"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(20px)",
                  transition: "all 0.7s ease 600ms",
                }}
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFB252]" />
                  <span>Complimentary strategy call</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFB252]" />
                  <span>Limited executive spots</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div
              className="hidden lg:block w-full lg:w-[45%] pr-8"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateX(40px)",
                transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 300ms",
              }}
            >
              <div className="relative flex justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#38226C]/10 to-[#6A4DFB]/10 blur-3xl" />
                </div>
                <div className="relative z-10">
                  <Image
                    src="/for-execution.svg"
                    alt="Prevail Executive Branding Dashboard"
                    width={550}
                    height={550}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY BRANDING MATTERS
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-[#FFCD94]/20 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal direction="left" delay={0}>
              <SectionLabel>Why It Matters Now</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-6 mt-3">
                The Rules of Executive Visibility Have Changed
              </h2>
              <p className="text-[#1A1A2E]/60 text-lg leading-relaxed">
                In today&apos;s market, your title is not enough. Boards, investors, clients, and top talent
                make decisions based on your digital presence before they ever meet you. Whether you&apos;re
                eyeing a board seat, closing a major deal, building thought leadership, or creating a brand
                that outlasts your current role — Prevail is built for exactly this.
              </p>
            </Reveal>

            <div className="space-y-5">
              {[
                { stat: "75%",  label: "of executives say personal brand drives career opportunities", source: "Executive Branding Research", ref: stat1Ref, count: `${c1}%` },
                { stat: "3.5x", label: "higher deal close rate for sales leaders with an active LinkedIn presence", source: "LinkedIn Sales Insights", ref: null, count: null },
                { stat: "89%",  label: "of C-suite hiring is influenced by the candidate's online presence", source: "Executive Search Review", ref: stat3Ref, count: `${c2}%` },
              ].map((item, i) => (
                <Reveal key={item.stat} delay={i * 120} direction="right">
                  <div className="flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 border border-[#1A1A2E]/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div
                      ref={item.ref?.ref}
                      className="text-4xl font-extrabold bg-gradient-to-r from-[#38226C] to-[#6A4DFB] bg-clip-text text-transparent flex-shrink-0"
                    >
                      {item.count ?? item.stat}
                    </div>
                    <div>
                      <p className="text-[#1A1A2E]/70 font-medium text-sm">{item.label}</p>
                      <p className="text-[#1A1A2E]/40 text-xs mt-1">Source: {item.source}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EXECUTIVE TOOLKIT — Rich redesigned bg
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        {/* Deep layered background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0F0A1E 0%, #1A0F3A 30%, #1E1050 60%, #150D35 100%)",
          }}
        />

        {/* Animated radial mesh spots */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(108,77,251,0.35) 0%, transparent 70%)",
            animation: "pulseGlow 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(56,34,108,0.50) 0%, transparent 70%)",
            animation: "pulseGlow 8s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute top-[40%] right-[25%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,178,82,0.08) 0%, transparent 70%)",
            animation: "pulseGlow 10s ease-in-out infinite 1s",
          }}
        />

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Diagonal light streak */}
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ opacity: 0.06 }}
        >
          <div
            className="absolute"
            style={{
              top: "-20%",
              left: "30%",
              width: "2px",
              height: "160%",
              background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.8), transparent)",
              transform: "rotate(25deg)",
            }}
          />
          <div
            className="absolute"
            style={{
              top: "-20%",
              left: "60%",
              width: "1px",
              height: "160%",
              background: "linear-gradient(180deg, transparent, rgba(108,77,251,0.8), transparent)",
              transform: "rotate(25deg)",
            }}
          />
        </div>

        {/* Rotating ring decoration */}
        <div
          className="absolute right-[8%] top-[10%] w-64 h-64 rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(108,77,251,0.15)",
            animation: "rotateSlow 25s linear infinite",
          }}
        >
          <div
            className="absolute top-0 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ background: "rgba(108,77,251,0.6)" }}
          />
        </div>
        <div
          className="absolute left-[5%] bottom-[15%] w-48 h-48 rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(255,178,82,0.10)",
            animation: "rotateSlow 18s linear infinite reverse",
          }}
        />

        <div className="relative z-10 max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <Reveal delay={0}>
              {/* Custom pill badge matching image */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6"
                style={{
                  background: "rgba(108,77,251,0.15)",
                  border: "1px solid rgba(108,77,251,0.35)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB252]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">
                  The Executive Toolkit
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-white mb-4"
                style={{ textShadow: "0 0 60px rgba(108,77,251,0.4)" }}
              >
                Everything You Need to Lead Your Industry Online
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-white/50 mt-2 max-w-2xl mx-auto text-lg">
                A comprehensive suite of AI-powered tools and expert strategy to elevate your executive presence.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolkitFeatures.map((feature, idx) => (
              <ToolkitCard key={feature.title} feature={feature} delay={idx * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PERSONAS
      ══════════════════════════════════════ */}
      <section className="py-28 bg-[#F9F8F6] relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <Reveal delay={0}><SectionLabel>Who We Serve</SectionLabel></Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mt-3">
                Who Prevail Executive Is Built For
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[#1A1A2E]/50 mt-4">
                Tailored solutions for every stage of executive leadership
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personas.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} direction="scale">
                <div className="p-6 rounded-2xl border border-[#1A1A2E]/8 bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                  <div className="text-4xl mb-4">{p.emoji}</div>
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{p.title}</h3>
                  <p className="text-[#1A1A2E]/50 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY PREVAIL
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/5 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left" delay={0}>
              <SectionLabel>Why Prevail?</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-6 mt-3">
                Your Executive Presence, Amplified
              </h2>
              <p className="text-[#1A1A2E]/60 text-lg leading-relaxed mb-8">
                Unlike basic resume writers or generic AI tools, Prevail combines advanced AI with senior
                branding strategists who understand the nuances of executive positioning, board expectations,
                and industry-specific credibility markers.
              </p>
              <div className="space-y-4">
                {[
                  "Board-ready professional assets in hours, not weeks",
                  "Industry-specific messaging that resonates with senior stakeholders",
                  "Data-driven insights from real executive hiring patterns",
                  "Ongoing thought leadership support to maintain visibility",
                ].map((benefit, i) => (
                  <Reveal key={benefit} delay={i * 80} direction="left">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FFB252] flex-shrink-0" />
                      <span className="text-[#1A1A2E]/70">{benefit}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div className="bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 p-8 rounded-3xl border border-[#1A1A2E]/8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-1 rounded-full bg-[#FFB252]/20 text-[#38226C] text-sm font-semibold mb-4">
                    Executive Impact
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A2E]">What Our Clients Achieve</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { metric: "2-4x", label: "Increase in LinkedIn profile views",                   change: "+" },
                    { metric: "3x",   label: "More inbound opportunities from recruiters",            change: "+" },
                    { metric: "50%",  label: "Faster response rate from board applications",          change: "+" },
                    { metric: "85%",  label: "Of clients secure new opportunities within 90 days",   change: ""  },
                  ].map((result) => (
                    <div key={result.label} className="flex justify-between items-center pb-3 border-b border-[#1A1A2E]/8">
                      <span className="text-[#1A1A2E]/60">{result.label}</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#38226C] to-[#6A4DFB] bg-clip-text text-transparent">
                        {result.metric}{result.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
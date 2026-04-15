"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Building2, Briefcase, Star, FileText, Search,
  Camera, CalendarCheck, Mic, BarChart3, ChevronRight, Check, Sparkles, ArrowRight,
  TrendingUp, Users, Zap, Award
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import FeatureCard from "@/components/ui/FeatureCard";
import ComparisonTable from "@/components/ui/ComparisonTable";

// ── Intersection observer hook ──
function useInView(threshold = 0.15) {
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

// ── Animated counter hook ──
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
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

// ── Animated stat card with counter ──
function StatCard({
  stat,
  label,
  src,
  desc,
  delay,
}: {
  stat: string;
  label: string;
  src: string;
  desc: string;
  delay: number;
}) {
  const { ref, inView } = useInView(0.2);
  const isPercent = stat.includes("%");
  const isRatio = stat.includes(":");
  const numericTarget = isPercent ? parseInt(stat) : isRatio ? 1568 : 500;
  const count = useCounter(numericTarget, 2200, inView);
  const displayStat = isPercent ? `${count}%` : isRatio ? `1:${count}` : stat;

  return (
    <div
      ref={ref}
      className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/25 transition-all duration-500 cursor-default"
      style={{
        transform: inView ? "translateY(0) scale(1)" : "translateY(50px) scale(0.97)",
        opacity: inView ? 1 : 0,
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="text-6xl font-extrabold text-[#FFB252] mb-2">{displayStat}</div>
      <div className="text-[#FFCD94] font-semibold text-sm mb-1">{label}</div>
      <div className="text-white/40 text-xs mb-5">— {src}</div>
      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Waitlist counter ──
function WaitlistCounter() {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(500, 2000, inView);
  return (
    <div
      ref={ref}
      className="text-8xl font-extrabold bg-gradient-to-r from-[#38226C] to-[#6A4DFB] bg-clip-text text-transparent mb-3"
    >
      {count}+
    </div>
  );
}

const comparisonRows = [
  { feature: "AI Career Tools Suite",       columns: [false, "partial", true] },
  { feature: "Human Coaching Marketplace",  columns: [false, false,     true] },
  { feature: "AI Headshot Creator",         columns: [false, false,     true] },
  { feature: "CXO / Executive Branding",    columns: [false, false,     true] },
  { feature: "Institutional Platform",      columns: [true,  true,      true] },
  { feature: "Individual Freemium Access",  columns: [true,  false,     true] },
];

// Trusted by logos data with exact colors from image
const trustedLogos = [
  { name: "TECHFLOW", color: "#2563EB" },      // Blue
  { name: "NEXUS", color: "#7C3AED" },         // Purple
  { name: "QUANTUM", color: "#059669" },       // Green
  { name: "SYNERGY", color: "#EA580C" },       // Orange
  { name: "ORBITAL", color: "#4F46E5" },       // Indigo
];

// ── TrustedByMarquee Component ──
function TrustedByMarquee() {
  return (
    <div className="w-full bg-white py-6 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        {/* Label */}
        <div className="text-center mb-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
            TRUSTED BY PROFESSIONALS FROM
          </p>
        </div>

        {/* Marquee container */}
        <div className="relative overflow-hidden">
          <div className="flex overflow-x-hidden group">
            {/* First row of logos */}
            <div className="animate-marquee flex items-center gap-16 whitespace-nowrap py-2">
              {[...trustedLogos, ...trustedLogos].map((logo, idx) => (
                <span
                  key={idx}
                  className="text-2xl sm:text-3xl font-bold tracking-wide"
                  style={{ color: logo.color }}
                >
                  {logo.name}
                </span>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="animate-marquee2 absolute top-0 left-0 flex items-center gap-16 whitespace-nowrap py-2">
              {[...trustedLogos, ...trustedLogos].map((logo, idx) => (
                <span
                  key={idx + trustedLogos.length}
                  className="text-2xl sm:text-3xl font-bold tracking-wide"
                  style={{ color: logo.color }}
                >
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 20s linear infinite;
        }
        .group:hover .animate-marquee,
        .group:hover .animate-marquee2 {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  const [heroReady, setHeroReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative min-h-[100vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #EEEAF8 0%, #F0EDF9 40%, #E8E4F5 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, #C4B8F0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute top-[-10%] right-[10%] h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: "rgba(108,92,231,0.12)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background: "rgba(172,93,0,0.06)" }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-20 w-full pt-[120px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left col */}
            <div className="flex flex-col">
              <div
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(20px)",
                  transition: "all 0.6s ease 0ms",
                }}
              >
                <div
                  className="inline-flex items-center gap-2 w-fit rounded-full px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase"
                  style={{
                    backgroundColor: "rgba(108,92,231,0.12)",
                    color: "#5A4BC7",
                    border: "1px solid rgba(108,92,231,0.20)",
                  }}
                >
                  <Zap className="w-3.5 h-3.5" />
                  Now Powered by AI
                </div>
              </div>

              <h1
                className="font-black leading-[1.05] tracking-tight mb-6"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  color: "#1A1530",
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(30px)",
                  transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 150ms",
                }}
              >
                Outbrand.<br />
                Outpace.<br />
                <span style={{ color: "#6C5CE7" }}>Prevail.</span>
              </h1>

              <p
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-md"
                style={{
                  color: "rgba(26,21,48,0.60)",
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(20px)",
                  transition: "all 0.7s ease 300ms",
                }}
              >
                The ultimate career intelligence engine. We use AI-powered tools to build your
                personal brand and accelerate your trajectory — resume, LinkedIn, headshots, and
                expert coaching in one place.
              </p>

              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(20px)",
                  transition: "all 0.7s ease 450ms",
                }}
              >
                <Link
                  href="/waitlist"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #6C5CE7, #5A4BD1)",
                    boxShadow: "0 8px 32px rgba(108,92,231,0.35)",
                  }}
                >
                  Build Your Brand
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
                  style={{ color: "#6C5CE7" }}
                >
                  See how it works <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div
                className="flex items-center gap-4"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(20px)",
                  transition: "all 0.7s ease 600ms",
                }}
              >
                <div className="flex items-center">
                  {["bg-purple-400", "bg-indigo-400", "bg-violet-500"].map((color, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                      style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: 3 - i }}
                    >
                      {["A", "B", "C"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#1A1530" }}>
                    2,400+ people joined
                  </p>
                  <p className="text-xs" style={{ color: "rgba(26,21,48,0.50)" }}>
                    this morning
                  </p>
                </div>
              </div>
            </div>

            {/* Right col — floating cards */}
            <div
              className="relative flex items-center justify-center h-[500px] lg:h-[560px]"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateX(40px)",
                transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 300ms",
              }}
            >
              {/* Main card */}
              <div
                className="absolute right-0 w-[320px] sm:w-[360px] rounded-3xl p-6 shadow-2xl"
                style={{
                  background: "white",
                  border: "1px solid rgba(108,92,231,0.10)",
                  top: "50%",
                  transform: `translateY(calc(-50% + ${scrollY * 0.04}px))`,
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(26,21,48,0.40)" }}>
                      Career Score
                    </p>
                    <p className="text-2xl font-black" style={{ color: "#1A1530" }}>
                      8.4k+{" "}
                      <span className="text-sm font-semibold" style={{ color: "#6C5CE7" }}>
                        Network Depth
                      </span>
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(108,92,231,0.10)" }}
                  >
                    <BarChart3 className="w-5 h-5" style={{ color: "#6C5CE7" }} />
                  </div>
                </div>
                <div className="flex items-end gap-2 h-28 mb-5">
                  {[40, 55, 45, 70, 60, 85, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-lg"
                      style={{
                        height: heroReady ? `${h}%` : "0%",
                        background:
                          i === 6
                            ? "linear-gradient(180deg,#6C5CE7,#5A4BD1)"
                            : i === 5
                            ? "rgba(108,92,231,0.50)"
                            : "rgba(108,92,231,0.15)",
                        transition: `height 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 700}ms`,
                      }}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 rounded-2xl p-3" style={{ backgroundColor: "rgba(108,92,231,0.06)" }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: "rgba(26,21,48,0.50)" }}>Profile Views</p>
                    <p className="text-lg font-black" style={{ color: "#1A1530" }}>+42%</p>
                    <p className="text-xs" style={{ color: "#6C5CE7" }}>Growth since May</p>
                  </div>
                  <div className="flex-1 rounded-2xl p-3" style={{ background: "linear-gradient(135deg,#6C5CE7,#5A4BD1)" }}>
                    <p className="text-xs font-semibold mb-1 text-white/70">Brand Value</p>
                    <p className="text-lg font-black text-white">+42%</p>
                    <p className="text-xs text-white/60">Growth since May</p>
                  </div>
                </div>
              </div>

              {/* Float badge — top left */}
              <div
                className="absolute left-0 top-[15%] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
                style={{
                  background: "white",
                  border: "1px solid rgba(108,92,231,0.12)",
                  animation: "floatA 4s ease-in-out infinite",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#6C5CE7,#5A4BD1)" }}
                >
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "#1A1530" }}>Strategy</p>
                  <p className="text-xs font-semibold" style={{ color: "#6C5CE7" }}>Optimized ✓</p>
                </div>
              </div>

              {/* Float badge — bottom left */}
              <div
                className="absolute left-4 bottom-[18%] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
                style={{
                  background: "white",
                  border: "1px solid rgba(108,92,231,0.12)",
                  animation: "floatB 5s ease-in-out infinite",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(172,93,0,0.10)" }}
                >
                  <TrendingUp className="w-4 h-4" style={{ color: "#AC5D00" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "#1A1530" }}>Resume Score</p>
                  <p className="text-xs font-semibold" style={{ color: "#AC5D00" }}>94 / 100</p>
                </div>
              </div>

              {/* Float badge — top right */}
              <div
                className="absolute right-4 top-[8%] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg,#6C5CE7,#5A4BD1)",
                  animation: "floatC 6s ease-in-out infinite",
                }}
              >
                <Users className="w-4 h-4 text-white" />
                <div>
                  <p className="text-xs font-bold text-white">LinkedIn Reach</p>
                  <p className="text-xs text-white/70">+2.4k this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes floatA { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
          @keyframes floatB { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(8px)} }
          @keyframes floatC { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
        `}</style>
      </section>

      {/* ══════════════════════════════════════
          TRUSTED BY SECTION - MARQUEE
      ══════════════════════════════════════ */}
      <TrustedByMarquee />

      {/* ══════════════════════════════════════
          3-AUDIENCE CARDS
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FFCD94]/5 via-transparent to-transparent" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="text-center mb-16">
            <Reveal delay={0}>
              <SectionLabel>Built for Every Stage of Your Career</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#8B7DD8] mt-3">
                One Platform. Three Powerful Use Cases.
              </h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "For Bootcamps & Universities", desc: "Give every student AI-powered career support at scale. Track outcomes. Prove ROI to your board — without hiring more advisors.", href: "/for-institutions", delay: 0 },
              { icon: Briefcase, title: "For Job Seekers & Professionals", desc: "Land the role you deserve. Build a standout resume, optimize your LinkedIn, get professional headshots, and book a career coach — finally in one place.", href: "/for-individuals", delay: 150 },
              { icon: Star, title: "For CXOs & Senior Professionals", desc: "Your career has earned serious credibility. Build the personal brand to match. Thought leadership tools, executive headshots, and expert positioning.", href: "/for-executives", delay: 300 },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={card.delay} direction="scale">
                  <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 border border-white/40 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden h-full">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-[#38226C]/10 via-[#6A4DFB]/10 to-[#FFB252]/10 blur-xl" />
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-[#F9F8F6] shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="w-7 h-7 text-[#6A4DFB] group-hover:text-[#38226C] transition" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{card.title}</h3>
                    <p className="text-[#1A1A2E]/60 text-sm leading-relaxed mb-6">{card.desc}</p>
                    <Link href={card.href} className="inline-flex items-center gap-1.5 text-[#6A4DFB] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROBLEM STATS — animated counters
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden bg-gradient-to-br from-[#38226C] via-[#2D1A56] to-[#1A1A2E]">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <span className="text-xs font-bold tracking-widest text-[#FFCD94] uppercase">
                  The Problem We Solve
                </span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-2">
                Great careers are being lost<br />to the{" "}
                <span className="text-[#FFB252]">wrong tools</span>
              </h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard
              stat="1:1,568"
              label="Students per career advisor"
              src="NACE 2025"
              desc="Most students never get meaningful career support. Advisors are overwhelmed. Students fall through the cracks right when they need help most."
              delay={0}
            />
            <StatCard
              stat="75%"
              label="Of resumes never seen by a human"
              src="filtered by ATS"
              desc="Generic resumes and an unoptimized LinkedIn profile are silently costing professionals thousands in missed opportunities and delayed careers."
              delay={150}
            />
            <StatCard
              stat="82%"
              label="Of executives agree"
              src="personal brand drives opportunity"
              desc="Yet fewer than 1 in 5 senior professionals have built a credible digital presence. Visibility is now a career asset — and most leaders are invisible."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="py-28 bg-[#F9F8F6] relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[#FFCD94]/30 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="text-center mb-20">
            <Reveal delay={0}><SectionLabel>Simple Process</SectionLabel></Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-4 mt-3">
                How Prevail Works
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[#1A1A2E]/60 text-lg max-w-xl mx-auto">
                In three steps, Prevail takes you from where you are to where you want to be.
              </p>
            </Reveal>
          </div>
          <div className="relative grid md:grid-cols-3 gap-12">
            <div className="hidden md:block absolute top-16 left-[calc(33.33%+24px)] right-[calc(33.33%+24px)] h-[2px] bg-gradient-to-r from-[#38226C]/20 via-[#6A4DFB]/40 to-[#38226C]/20" />
            {[
              { num: "01", title: "Build Your Profile", desc: "Tell Prevail about your background, experience, and goals. It takes under 3 minutes. Prevail adapts to your career stage — student, professional, or executive.", delay: 0 },
              { num: "02", title: "Use AI-Powered Tools", desc: "Optimize your resume for ATS, score and rewrite your LinkedIn, generate professional headshots, and practice interviews with voice AI. All in one dashboard.", delay: 200 },
              { num: "03", title: "Book a Real Expert", desc: "When you want a human perspective, browse Prevail's coaching marketplace and book a 1:1 session with a verified career expert. Pay securely inside the platform.", delay: 400 },
            ].map((step) => (
              <Reveal key={step.num} delay={step.delay} direction="up">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#38226C] to-[#6A4DFB] flex items-center justify-center text-white text-2xl font-extrabold mb-7 shadow-xl shadow-[#38226C]/30 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{step.title}</h3>
                  <p className="text-[#1A1A2E]/60 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="text-center mt-16">
              <Link
                href="/waitlist"
                className="group inline-flex items-center gap-2 px-10 py-4 bg-[#38226C] text-white font-bold rounded-2xl hover:bg-[#2D1A56] hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-[#38226C]/30 text-base"
              >
                Join Waitlist — Get Early Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/5 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="text-center mb-16">
            <Reveal delay={0}><SectionLabel>Full Feature Suite</SectionLabel></Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mt-3">
                Everything You Need.<br />One Platform.
              </h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FileText className="w-6 h-6" />, title: "Resume & CV Optimizer", description: "Paste your resume or upload a PDF. Get an ATS-optimized version, a score out of 100, and specific improvement suggestions — in under 30 seconds.", delay: 0 },
              { icon: <Search className="w-6 h-6" />, title: "LinkedIn Profile Optimizer", description: "Score every section of your LinkedIn profile and get detailed rewrite suggestions that make recruiters stop and read.", delay: 100 },
              { icon: <Camera className="w-6 h-6" />, title: "AI Headshot Creator", description: "Upload a selfie. Receive 3–5 professional-grade headshots and a branded LinkedIn banner. No photographer. No studio. No waiting.", delay: 200 },
              { icon: <CalendarCheck className="w-6 h-6" />, title: "Coaching Marketplace", description: "Browse verified career coaches by industry, role, and budget. Book, pay, and meet inside Prevail — without chasing anyone on LinkedIn.", delay: 0 },
              { icon: <Mic className="w-6 h-6" />, title: "AI Mock Interviews", description: "Practice voice-based interviews with AI trained on real company questions. Get instant feedback and a score on every answer.", delay: 100, premium: true },
              { icon: <BarChart3 className="w-6 h-6" />, title: "Institutional Dashboard", description: "Track student engagement, tool usage, and placement outcomes in one view. Export for NACE, OBBBA, and accreditation reporting.", delay: 200 },
            ].map((f) => (
              <Reveal key={f.title} delay={f.delay} direction="scale">
                <FeatureCard
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                  premium={f.premium}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="text-center mt-12">
              <Link
                href="/features"
                className="inline-flex items-center gap-1.5 text-[#6A4DFB] font-semibold hover:gap-3 transition-all duration-300"
              >
                See All Features <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMPARISON
      ══════════════════════════════════════ */}
      <section className="py-28 bg-[#F9F8F6] relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="text-center mb-16">
            <Reveal delay={0}><SectionLabel>How We Compare</SectionLabel></Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-4 mt-3">
                The Only Platform That Does It All
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[#1A1A2E]/60 text-lg">
                No competitor combines AI tools, human coaching, and personal branding in one platform.
              </p>
            </Reveal>
          </div>
          <Reveal delay={100} direction="scale">
            <ComparisonTable
              headers={["Feature", "Handshake", "Prentus", "Prevail"]}
              rows={comparisonRows}
              highlightColumn={3}
              className="max-w-3xl mx-auto"
            />
          </Reveal>
          <Reveal delay={200}>
            <div className="text-center mt-10">
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 text-[#6A4DFB] font-semibold hover:gap-3 transition-all duration-300"
              >
                See Full Comparison <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SOCIAL PROOF
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-[#FFCD94]/20 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left" delay={0}>
              <SectionLabel>Trust & Credibility</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-6 mt-3">
                Built by Professionals.<br />For Professionals.
              </h2>
              <p className="text-[#1A1A2E]/60 text-lg leading-relaxed mb-8">
                Built by professionals who have collectively placed 10,000+ candidates across Fortune 500
                companies, top bootcamps, and leading universities.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Working with leading bootcamps, career centers, and universities on pilot programs.",
                  "Institution partnership inquiries: hello@withprevail.com",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFB252]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#FFB252]" />
                    </div>
                    <span className="text-[#1A1A2E]/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6A4DFB]/20 to-[#FFB252]/20 rounded-3xl blur-2xl scale-110" />
                  <div className="relative bg-white rounded-3xl p-12 shadow-2xl border border-[#1A1A2E]/6 text-center">
                    <WaitlistCounter />
                    <p className="text-[#1A1A2E]/60 font-medium text-lg">
                      professionals and institutions<br />already on the waitlist
                    </p>
                    <div className="mt-8">
                      <Link
                        href="/waitlist"
                        className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#38226C] text-white font-bold rounded-2xl hover:bg-[#2D1A56] hover:-translate-y-1 transition-all shadow-xl shadow-[#38226C]/30"
                      >
                        Join Them{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
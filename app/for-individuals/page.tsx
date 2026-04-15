"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText, Camera, CalendarCheck, Check, Search,
  Sparkles, ArrowRight, CheckCircle2, Star, Zap, Shield
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
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "left" | "right" | "scale"; className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  const transforms: Record<string, string> = {
    up: "translateY(44px)", left: "translateX(-52px)",
    right: "translateX(52px)", scale: "scale(0.93) translateY(20px)",
  };
  return (
    <div ref={ref} className={className} style={{
      transform: inView ? "none" : transforms[direction],
      opacity: inView ? 1 : 0,
      transition: `transform 0.78s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.78s ease ${delay}ms`,
    }}>
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
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

type IconType = "resume" | "linkedin" | "camera" | "coaching";

function FeatureIcon({ type, className = "w-6 h-6" }: { type: IconType; className?: string }) {
  switch (type) {
    case "resume":   return <FileText className={className} />;
    case "linkedin": return <Search className={className} />;
    case "camera":   return <Camera className={className} />;
    case "coaching": return <CalendarCheck className={className} />;
  }
}

const painPoints = [
  { title: "You've applied to 50 jobs. Zero callbacks.", body: "Your resume is being filtered by ATS before a single human reads it. Prevail optimizes it — and tells you exactly what to fix." },
  { title: "Your LinkedIn looks the same as it did 3 years ago.", body: "Recruiters look at LinkedIn before anywhere else. Prevail scores your profile and gives you exact rewrite suggestions that get recruiters to stop scrolling." },
  { title: "You know you need a career coach — but $500 an hour is not realistic.", body: "Prevail's coaching marketplace connects you with verified experts at prices that actually work for real professionals." },
];

const features = [
  {
    iconType: "resume" as IconType,
    title: "Resume & CV Optimizer",
    desc: "Paste or upload your resume. Tell Prevail the job you are targeting. Get an ATS-optimized version, a score out of 100, and specific suggestions — in 30 seconds.",
    badge: "Most Used",
    badgeColor: "#6C5CE7",
    accent: "#6C5CE7",
    stats: [
      { value: "94", label: "Avg. ATS Score" },
      { value: "30s", label: "Time to Result" },
      { value: "3x", label: "More Callbacks" },
    ],
    bullets: [
      "Keyword optimization for any job description",
      "ATS compatibility check with score out of 100",
      "Tailored improvement suggestions per section",
      "Download as PDF or copy to clipboard instantly",
    ],
  },
  {
    iconType: "linkedin" as IconType,
    title: "LinkedIn Profile Optimizer",
    desc: "Prevail scores each section of your LinkedIn profile and gives you rewrite suggestions that make you stand out to recruiters.",
    badge: "Recruiter Favorite",
    badgeColor: "#0077B5",
    accent: "#0A66C2",
    stats: [
      { value: "4x", label: "Profile Views" },
      { value: "12", label: "Sections Scored" },
      { value: "85%", label: "Recruiter Rate" },
    ],
    bullets: [
      "Full profile audit with section-by-section scoring",
      "Headline and About rewrites tailored to your role",
      "Industry-specific keyword injection",
      "Recruiter-friendly formatting guidance",
    ],
  },
  {
    iconType: "camera" as IconType,
    title: "AI Headshot Creator",
    desc: "Upload one photo. Get 3–5 professional headshots and a custom LinkedIn banner. Look like you hired a photographer. Pay nothing extra.",
    badge: "Fan Favourite",
    badgeColor: "#FF6B6B",
    accent: "#E84393",
    stats: [
      { value: "5", label: "Pro Headshots" },
      { value: "1", label: "Photo Needed" },
      { value: "2min", label: "Turnaround" },
    ],
    bullets: [
      "Studio-quality headshots from a single selfie",
      "Multiple lighting and background styles",
      "Custom LinkedIn banner included",
      "Instant download in high resolution",
    ],
  },
  {
    iconType: "coaching" as IconType,
    title: "Coaching Marketplace",
    desc: "Browse real coaches by industry, role, and budget. Book and pay inside Prevail. No more cold messaging coaches on LinkedIn and waiting to hear back.",
    badge: "Human Touch",
    badgeColor: "#00B894",
    accent: "#00B894",
    stats: [
      { value: "200+", label: "Verified Coaches" },
      { value: "48h", label: "Avg. Booking" },
      { value: "4.9★", label: "Avg. Rating" },
    ],
    bullets: [
      "Verified coaches across every industry and role",
      "Filter by budget, specialty, and availability",
      "Secure booking and payment inside Prevail",
      "Post-session notes and action items included",
    ],
  },
];

// ── Feature section card ──
function FeatureBlock({ feature, index }: { feature: typeof features[0]; index: number }) {
  const isEven = index % 2 === 0;
  const { ref, inView } = useInView(0.15);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      ref={ref}
      className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
      style={{
        boxShadow: "0 4px 60px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(50px) scale(0.98)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Text side */}
      <div
        className={`p-10 lg:p-14 flex flex-col justify-center bg-white ${isEven ? "lg:order-1" : "lg:order-2"}`}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 w-fit rounded-full px-3 py-1 mb-6 text-xs font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${feature.accent}15`, color: feature.accent }}
        >
          <Zap className="w-3 h-3" />
          {feature.badge}
        </div>

        <h3 className="text-3xl font-extrabold text-[#1A1A2E] mb-4 leading-tight">
          {feature.title}
        </h3>
        <p className="text-[#1A1A2E]/60 text-base leading-relaxed mb-8">
          {feature.desc}
        </p>

        {/* Bullet points */}
        <ul className="space-y-3 mb-10">
          {feature.bullets.map((b, i) => (
            <li
              key={b}
              className="flex items-start gap-3"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateX(-20px)",
                transition: `all 0.5s ease ${300 + i * 80}ms`,
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${feature.accent}20` }}
              >
                <Check className="w-3 h-3" style={{ color: feature.accent }} />
              </div>
              <span className="text-[#1A1A2E]/70 text-sm">{b}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/waitlist"
          className="group inline-flex items-center gap-2 w-fit px-7 py-3.5 rounded-2xl text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: `linear-gradient(135deg, ${feature.accent}, ${feature.accent}CC)` }}
        >
          Get Early Access
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Visual side */}
      <div
        className={`relative p-10 lg:p-14 flex flex-col justify-between min-h-[420px] ${isEven ? "lg:order-2" : "lg:order-1"}`}
        style={{
          background: `linear-gradient(135deg, ${feature.accent}18 0%, ${feature.accent}08 50%, #F5F3FF 100%)`,
        }}
      >
        {/* Decorative circle */}
        <div
          className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full opacity-20 blur-2xl"
          style={{ background: feature.accent }}
        />
        <div
          className="absolute bottom-[-20px] left-[-20px] w-48 h-48 rounded-full opacity-10 blur-2xl"
          style={{ background: feature.accent }}
        />

        {/* Stats row */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mb-8">
          {feature.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-2xl p-4 text-center backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.8)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: `all 0.6s ease ${400 + i * 100}ms`,
              }}
            >
              <p className="text-2xl font-black" style={{ color: feature.accent }}>
                {stat.value}
              </p>
              <p className="text-xs text-[#1A1A2E]/50 font-medium mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Central icon display */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1">
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${feature.accent}, ${feature.accent}AA)`,
              transform: inView ? "scale(1) rotate(0deg)" : "scale(0.7) rotate(-10deg)",
              transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 200ms",
            }}
          >
            <FeatureIcon type={feature.iconType} className="w-12 h-12 text-white" />
          </div>

          {/* Floating tag */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(255,255,255,0.9)",
              color: feature.accent,
              border: `1px solid ${feature.accent}30`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Star className="w-3 h-3 fill-current" />
            Trusted by 2,400+ professionals
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForIndividualsPage() {
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 100); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.05)} }
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
            {/* Left: Image */}
            <div
              className="hidden lg:block w-full lg:w-1/2"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateX(-40px)",
                transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 200ms",
              }}
            >
              <div className="relative flex justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#38226C]/10 to-[#6A4DFB]/10 blur-3xl" />
                </div>
                <div className="relative z-10 w-full max-w-[550px]">
                  <Image
                    src="/for-individual.jpg"
                    alt="Prevail for Professionals Dashboard"
                    width={600} height={600}
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="w-full lg:w-1/2">
              <div
                className="inline-flex items-center gap-2 bg-[#38226C]/5 border border-[#38226C]/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm"
                style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(20px)", transition: "all 0.6s ease 0ms" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6A4DFB]" />
                <span className="text-xs font-bold tracking-widest text-[#38226C] uppercase">For Job Seekers &amp; Career Professionals</span>
              </div>

              <h1
                className="text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem] font-extrabold text-[#1A1A2E] leading-[1.1] tracking-tight mb-6"
                style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(30px)", transition: "all 0.75s cubic-bezier(0.16,1,0.3,1) 150ms" }}
              >
                Land the Job. Build the Career.{" "}
                <span className="bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] bg-clip-text text-transparent">
                  Look the Part.
                </span>
              </h1>

              <p
                className="text-lg text-[#1A1A2E]/60 leading-relaxed mb-10 max-w-xl"
                style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(20px)", transition: "all 0.7s ease 300ms" }}
              >
                Prevail gives you AI-powered resume tools, LinkedIn optimization, professional headshots,
                and access to real career coaches — all in one place.
              </p>

              <div
                className="flex flex-wrap gap-4 mb-7"
                style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(20px)", transition: "all 0.7s ease 450ms" }}
              >
                <Link
                  href="/waitlist"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#38226C] text-white font-bold rounded-2xl hover:bg-[#2D1A56] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#38226C]/25 text-base"
                >
                  Join the Waitlist — Free Early Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#38226C]/20 text-[#38226C] font-semibold rounded-2xl hover:border-[#38226C] hover:bg-[#38226C]/5 hover:-translate-y-1 transition-all duration-300 text-base"
                >
                  See Features
                </Link>
              </div>

              <div
                className="flex items-center gap-2 text-sm text-[#1A1A2E]/50"
                style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(20px)", transition: "all 0.7s ease 600ms" }}
              >
                <Check className="w-4 h-4 text-[#FFB252]" />
                <span>Freemium model. Core tools free. No credit card required to join the waitlist.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PAIN POINTS
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-[#FFCD94]/20 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <Reveal delay={0}><SectionLabel>Sound Familiar?</SectionLabel></Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mt-3">
                We Hear You. We Built Prevail to Fix This.
              </h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 120} direction="scale">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 border border-[#1A1A2E]/8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB252]/15 flex items-center justify-center mb-5">
                    <Sparkles className="w-5 h-5 text-[#FFB252]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">&ldquo;{p.title}&rdquo;</h3>
                  <p className="text-[#1A1A2E]/50 text-sm leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURE WALKTHROUGH — Redesigned
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #F8F6FF 0%, #FFFFFF 30%, #F5F3FF 70%, #FAFAFE 100%)" }}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-3xl" style={{ background: "rgba(108,92,231,0.06)" }} />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full blur-3xl" style={{ background: "rgba(255,178,82,0.06)" }} />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle, rgba(108,92,231,0.08) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Section header */}
          <div className="text-center mb-20">
            <Reveal delay={0}>
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6"
                style={{ background: "rgba(108,92,231,0.10)", border: "1px solid rgba(108,92,231,0.20)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7]" />
                <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#6C5CE7]">Powerful Tools</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-4">
                Everything You Need to Succeed
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[#1A1A2E]/50 text-lg max-w-2xl mx-auto">
                AI-powered tools that work together to help you land your dream job faster.
              </p>
            </Reveal>
          </div>

          {/* Feature blocks */}
          <div className="space-y-10">
            {features.map((feature, i) => (
              <FeatureBlock key={feature.title} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING TEASER
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/5 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <Reveal delay={0}><SectionLabel>Simple Pricing</SectionLabel></Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mt-3">
                Simple, Transparent Pricing
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[#1A1A2E]/50 mt-3">
                Join the waitlist to unlock founding member pricing.
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Free", desc: "Resume optimizer (3/month), LinkedIn score, 1 headshot. Free forever.", price: undefined, cta: "Join Free Waitlist", href: "/waitlist", featured: false },
              { name: "Professional", desc: "Unlimited AI tools, 5 headshots, coach credits, mock interviews.", price: "Founding member pricing — join waitlist to unlock", cta: "Join Waitlist for Pricing", href: "/waitlist", featured: true },
              { name: "Executive", desc: "All Pro features + executive branding toolkit + dedicated strategist.", price: "Custom — Book a Call", cta: "Learn More", href: "/for-executives", featured: false },
            ].map((tier, i) => (
              <Reveal key={tier.name} delay={i * 100} direction="scale">
                <div
                  className={`p-8 rounded-2xl border transition-all duration-300 h-full ${
                    tier.featured
                      ? "border-[#38226C] bg-gradient-to-br from-[#38226C] to-[#2D1A56] shadow-xl shadow-[#38226C]/25 scale-105"
                      : "border-[#1A1A2E]/8 bg-white hover:border-[#38226C]/30 hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-3 ${tier.featured ? "text-white" : "text-[#1A1A2E]"}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-3 ${tier.featured ? "text-white/70" : "text-[#1A1A2E]/50"}`}>
                    {tier.desc}
                  </p>
                  {tier.price && (
                    <p className={`text-xs font-semibold mb-5 ${tier.featured ? "text-[#FFB252]" : "text-[#6A4DFB]"}`}>
                      {tier.price}
                    </p>
                  )}
                  <Link
                    href={tier.href}
                    className={`inline-flex items-center justify-center w-full px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                      tier.featured
                        ? "bg-white text-[#38226C] hover:bg-[#F9F8F6]"
                        : "bg-[#38226C]/10 text-[#38226C] hover:bg-[#38226C] hover:text-white"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
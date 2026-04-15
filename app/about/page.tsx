"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ChevronRight, Check, Zap, Users, Award, 
  TrendingUp, Sparkles, Target, Eye, Mail, Linkedin, 
  Building2, Briefcase, Star, MessageCircle, Shield, Globe
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

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

// ── Stat card component ──
function AboutStatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, inView } = useInView(0.2);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const count = useCounter(numericValue || 100, 2000, inView);
  const displayValue = value.includes("+") ? `${count}+` : value;

  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        opacity: inView ? 1 : 0,
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="text-5xl font-extrabold text-[#6C5CE7] mb-2">{displayValue}</div>
      <div className="text-[#1A1A2E]/60 text-sm font-medium">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const teamMembers = [
    { initials: "FT", name: "Founder Name", title: "CEO & Co-Founder", bio: "Former career services leader who saw firsthand how students and professionals struggle to access quality career support. Now building AI solutions to democratize career success.", gradient: "from-[#38226C] to-[#6A4DFB]" },
    { initials: "FT", name: "Founder Name", title: "CTO & Co-Founder", bio: "AI engineer with a passion for building scalable platforms. Previously built tools used by millions. Now focused on making career intelligence accessible to everyone.", gradient: "from-[#6A4DFB] to-[#FFB252]" },
    { initials: "FT", name: "Founder Name", title: "CPO & Co-Founder", bio: "Product leader who experienced the broken career transition process firsthand. Building Prevail to ensure no one else has to navigate their career alone.", gradient: "from-[#FFB252] to-[#38226C]" },
  ];

  return (
    <>
      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
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

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-20 w-full pt-[140px]">
          <div className="text-center max-w-4xl mx-auto">
            <div
              style={{
                opacity: pageReady ? 1 : 0,
                transform: pageReady ? "none" : "translateY(20px)",
                transition: "all 0.6s ease 0ms",
              }}
            >
              <div
                className="inline-flex items-center gap-2 w-fit rounded-full px-4 py-1.5 mb-8 mx-auto text-xs font-bold tracking-widest uppercase"
                style={{
                  backgroundColor: "rgba(108,92,231,0.12)",
                  color: "#5A4BC7",
                  border: "1px solid rgba(108,92,231,0.20)",
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                Our Story
              </div>
            </div>

            <h1
              className="font-black leading-[1.1] tracking-tight mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: "#1A1530",
                opacity: pageReady ? 1 : 0,
                transform: pageReady ? "none" : "translateY(30px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 150ms",
              }}
            >
              We Built Prevail Because<br />
              <span style={{ color: "#6C5CE7" }}>We Lived the Problem</span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{
                color: "rgba(26,21,48,0.60)",
                opacity: pageReady ? 1 : 0,
                transform: pageReady ? "none" : "translateY(20px)",
                transition: "all 0.7s ease 300ms",
              }}
            >
              Our team brings together experience in career services, enterprise software,
              AI engineering, and personal branding — because solving this right requires all of it.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION SECTION
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden bg-gradient-to-br from-[#38226C] via-[#2D1A56] to-[#1A1A2E]">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
                <Target className="w-3.5 h-3.5 text-[#FFCD94]" />
                <span className="text-xs font-bold tracking-widest text-[#FFCD94] uppercase">
                  Our Mission
                </span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
                &ldquo;Career success should not depend on who you know or which school you attended.
                Prevail exists to give every professional — from first-year student to Fortune 500
                executive — the tools, the guidance, and the visibility they deserve.&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS SECTION
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FFCD94]/5 via-transparent to-transparent" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <AboutStatCard value="10k+" label="Candidates Placed" delay={0} />
            <AboutStatCard value="500+" label="Fortune 500 Clients" delay={150} />
            <AboutStatCard value="50+" label="Partner Institutions" delay={300} />
            <AboutStatCard value="98%" label="Success Rate" delay={450} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TEAM SECTION
      ══════════════════════════════════════ */}
      <section className="py-28 bg-[#F9F8F6] relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[#FFCD94]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[#6A4DFB]/10 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="text-center mb-16">
            <Reveal delay={0}>
              <SectionLabel>The Founding Team</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mt-3">
                Meet the People Behind Prevail
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[#1A1A2E]/60 text-lg max-w-2xl mx-auto mt-4">
                A diverse team of builders, career experts, and AI engineers united by a common mission.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Reveal key={index} delay={index * 150} direction="scale">
                <div className="group relative p-8 rounded-3xl bg-white border border-white/40 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden h-full">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500 bg-gradient-to-r ${member.gradient} blur-xl`} />
                  
                  {/* Avatar */}
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="text-3xl font-bold text-white">{member.initials}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#1A1A2E] text-center mb-1">{member.name}</h3>
                  <p className="text-[#6C5CE7] text-sm font-semibold text-center mb-4">{member.title}</p>
                  <p className="text-[#1A1A2E]/60 text-sm leading-relaxed text-center">{member.bio}</p>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VALUES SECTION
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/5 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="text-center mb-16">
            <Reveal delay={0}>
              <SectionLabel>What We Believe</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mt-3">
                Our Core Values
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Radical Accessibility", desc: "Great career tools shouldn't be reserved for the privileged few. We're building for everyone, from first-gen students to seasoned executives.", delay: 0 },
              { icon: Sparkles, title: "AI-First Thinking", desc: "We leverage AI to automate the mundane and amplify the human — so you can focus on what matters most: your career growth.", delay: 150 },
              { icon: Users, title: "Human-Centered", desc: "Technology serves people, not the other way around. Every feature we build starts with understanding real professional needs.", delay: 300 },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <Reveal key={idx} delay={value.delay} direction="scale">
                  <div className="text-center group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#38226C]/10 to-[#6A4DFB]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="w-7 h-7 text-[#6A4DFB]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{value.title}</h3>
                    <p className="text-[#1A1A2E]/60 text-sm leading-relaxed max-w-xs mx-auto">{value.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VISION SECTION
      ══════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-br from-[#38226C] via-[#2D1A56] to-[#1A1A2E] relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-[#6A4DFB]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
                <Eye className="w-3.5 h-3.5 text-[#FFCD94]" />
                <span className="text-xs font-bold tracking-widest text-[#FFCD94] uppercase">
                  Our Vision
                </span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Building the Platform<br />We Wish We Had
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-lg text-white/70 leading-relaxed">
                We are building the career platform we wish existed when we were building our own careers.
                AI-first. Human-centered. Accessible to everyone — students, professionals, and executives alike.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMPANY SECTION
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[#FFCD94]/20 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <Reveal direction="left" delay={0}>
              <div>
                <SectionLabel>Our Company</SectionLabel>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mt-3 mb-6">
                  Prevail Technology Solutions
                </h2>
                <p className="text-[#1A1A2E]/60 text-lg leading-relaxed mb-6">
                  Prevail is a product of Prevail Technology Solutions, a company dedicated to
                  building AI-powered tools that level the playing field in career development and
                  professional growth.
                </p>
                <p className="text-[#1A1A2E]/60 text-lg leading-relaxed mb-6">
                  We are backed by advisors from Fortune 500 companies, leading universities,
                  and the technology sector.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#6A4DFB]/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#6A4DFB]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A2E]">Partnership Inquiries</p>
                    <a href="mailto:hello@withprevail.com" className="text-[#6C5CE7] text-sm hover:underline">
                      hello@withprevail.com
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Fortune 500 Backed",
                  "Leading Universities",
                  "AI-First Platform",
                  "Enterprise Grade",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-[#F9F8F6]">
                    <Check className="w-4 h-4 text-[#6C5CE7]" />
                    <span className="text-sm font-medium text-[#1A1A2E]">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════ */}
      <section className="py-28 bg-[#F9F8F6] relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-[#6A4DFB]/10 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <SectionLabel>Get In Touch</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mt-3 mb-6">
                Contact & Partnerships
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[#1A1A2E]/60 text-lg mb-8">
                Interested in a partnership, press inquiry, or institutional pilot program?
                We'd love to hear from you.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@withprevail.com"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#38226C] to-[#6A4DFB] text-white font-bold rounded-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#38226C]/30"
                >
                  <Mail className="w-4 h-4" />
                  hello@withprevail.com
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://linkedin.com/company/prevail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#6A4DFB] text-[#6A4DFB] font-bold rounded-2xl hover:bg-[#6A4DFB] hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  Follow on LinkedIn
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-br from-[#38226C] via-[#2D1A56] to-[#1A1A2E] relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal delay={0}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                Believe in what we're building?
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-white/60 text-lg mb-8">
                Join the waitlist and be part of the Prevail journey from day one.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Link
                href="/waitlist"
                className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#FFB252] to-[#FFCD94] text-[#1A1A2E] font-bold rounded-2xl hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-[#FFB252]/30 text-base"
              >
                Join the Waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
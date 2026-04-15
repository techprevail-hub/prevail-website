// app/for-institutions/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bot, Mic, FileText, BarChart3, Users, CalendarCheck, Check, ArrowRight, Sparkles } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import FeatureCard from "@/components/ui/FeatureCard";
import StatCard from "@/components/ui/StatCard";
import ComparisonTable from "@/components/ui/ComparisonTable";

export const metadata: Metadata = {
  title: "Prevail for Institutions | AI Career Services at Scale",
  description: "Give every student the career support they enrolled for. AI-powered career agents, outcome tracking, and advisor tools for bootcamps, universities, and career centers.",
};

const comparisonRows = [
  { feature: "AI-powered career agents",            columns: [false, true,      false,    true] },
  { feature: "Human coaching marketplace",          columns: [false, false,     false,    true] },
  { feature: "AI headshot and image tools",         columns: [false, false,     false,    true] },
  { feature: "LinkedIn-verified outcome tracking",  columns: [false, true,      "partial",true] },
  { feature: "Individual student free access",      columns: [true,  false,     false,    true] },
  { feature: "Modern AI-native UX",                columns: ["partial", true,  false,    true] },
];

export default function ForInstitutionsPage() {
  return (
    <>
      {/* HERO SECTION - Increased spacing between navbar and text */}
      <section className="relative min-h-screen flex items-center pt-[80px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCD94]/20 via-[#F9F8F6] to-white" />
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#6A4DFB]/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[#FFB252]/10 blur-3xl" />
        <div className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full bg-[#38226C]/5 blur-3xl" />

        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 py-20 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2">
              <div className="reveal inline-flex items-center gap-2 bg-[#38226C]/5 border border-[#38226C]/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#6A4DFB]" />
                <span className="text-xs font-bold tracking-widest text-[#38226C] uppercase">For Bootcamps, Universities &amp; Career Centers</span>
              </div>

              <h1 className="reveal delay-100 text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem] font-extrabold text-[#1A1A2E] leading-[1.1] tracking-tight mb-6">
                Give Every Student the Career Support They{" "}
                <span className="bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] bg-clip-text text-transparent">Enrolled For</span>
              </h1>

              <p className="reveal delay-200 text-lg text-[#1A1A2E]/60 leading-relaxed mb-10 max-w-xl">
                Prevail scales your career services team with AI — so no student falls through the cracks,
                every outcome gets tracked, and your institution proves ROI.
              </p>

              <div className="reveal delay-300 flex flex-wrap gap-4 mb-7">
                <Link href="/waitlist" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#38226C] text-white font-bold rounded-2xl hover:bg-[#2D1A56] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#38226C]/25 text-base">
                  Book an Institution Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/waitlist" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#38226C]/20 text-[#38226C] font-semibold rounded-2xl hover:border-[#38226C] hover:bg-[#38226C]/5 hover:-translate-y-1 transition-all duration-300 text-base">
                  Join Institutional Waitlist
                </Link>
              </div>

              <div className="reveal delay-400 flex items-center gap-4 text-sm text-[#1A1A2E]/50">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFB252]" />
                  <span>Founding partner pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFB252]" />
                  <span>Limited beta spots</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-full lg:w-[45%]">
              <div className="relative flex justify-end">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#38226C]/10 to-[#6A4DFB]/10 blur-3xl" />
                </div>
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-[#38226C]/20 border border-white/50 bg-white p-2">
                  <Image
                    src="/for_institution.jpg"
                    alt="Prevail for Institutions dashboard preview"
                    width={500}
                    height={500}
                    className="rounded-xl object-cover w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-[#38226C] via-[#2D1A56] to-[#1A1A2E]">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <StatCard stat="1:1,568" label="Students per career advisor" description="NACE 2025 national average" light className="reveal" />
            <StatCard stat="40%" label="Students never use career services" description="At their institution" light className="reveal delay-100" />
            <StatCard stat="$617K" label="Annual savings possible" description="With AI-powered career services" light className="reveal delay-200" />
          </div>
        </div>
      </section>

      {/* MODULE GRID */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#6A4DFB]/5 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <SectionLabel className="reveal">Platform Modules</SectionLabel>
            <h2 className="reveal delay-100 text-4xl lg:text-5xl font-extrabold text-[#1A1A2E]">Everything Your Career Team Needs<br />in One Platform</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<Bot className="w-6 h-6" />} title="AI Career Agents" description="24/7 AI advisor that knows each student, sends automated follow-up, and ensures no student is left behind." className="reveal delay-100" />
            <FeatureCard icon={<Mic className="w-6 h-6" />} title="AI Mock Interviews" description="Voice-based, unlimited attempts, instant feedback, no scheduling required. Students practice on their own time." className="reveal delay-200" />
            <FeatureCard icon={<FileText className="w-6 h-6" />} title="Resume and LinkedIn Tools" description="Every student gets an ATS-optimized resume and LinkedIn profile ready to impress recruiters." className="reveal delay-300" />
            <FeatureCard icon={<BarChart3 className="w-6 h-6" />} title="Outcome Tracking" description="LinkedIn-verified placements with NACE/OBBBA export. Finally, accurate, automated regulatory reporting." className="reveal delay-100" />
            <FeatureCard icon={<Users className="w-6 h-6" />} title="Advisor Suite" description="One dashboard for all students, usage metrics, engagement scores, and outcome data. Your team works smarter." className="reveal delay-200" />
            <FeatureCard icon={<CalendarCheck className="w-6 h-6" />} title="Coaching Marketplace" description="Students book expert coaches directly — no advisor scheduling required. Scale your coaching capacity instantly." className="reveal delay-300" />
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-28 bg-[#F9F8F6] relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <SectionLabel className="reveal">Why Prevail Wins</SectionLabel>
            <h2 className="reveal delay-100 text-4xl lg:text-5xl font-extrabold text-[#1A1A2E]">Why Institutions Choose Prevail Over Legacy Tools</h2>
          </div>
          <div className="reveal delay-100">
            <ComparisonTable headers={["Feature", "Handshake", "Prentus", "Symplicity/12Twenty", "Prevail"]} rows={comparisonRows} highlightColumn={4} className="max-w-5xl mx-auto" />
          </div>
          <div className="reveal delay-200 text-center mt-10">
            <Link href="/waitlist" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#38226C] text-white font-bold rounded-2xl hover:bg-[#2D1A56] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#38226C]/25">
              Book a Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ROI / OUTCOMES WITH REAL TESTIMONIAL
      ════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-[#FFCD94]/20 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <SectionLabel className="reveal">Proven Outcomes</SectionLabel>
            <h2 className="reveal delay-100 text-4xl lg:text-5xl font-extrabold text-[#1A1A2E]">What Institutions Achieve with Prevail</h2>
            <p className="reveal delay-200 text-[#1A1A2E]/50 mt-3">Target outcomes based on industry benchmarks</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { stat: "3x",  label: "Student engagement with career resources", delay: "delay-100" },
              { stat: "50%", label: "Reduction in advisor administrative time",  delay: "delay-200" },
              { stat: "2x",  label: "Placement outcome tracking accuracy vs manual collection", delay: "delay-300" },
            ].map((item) => (
              <div key={item.stat} className={`reveal ${item.delay} text-center p-10 rounded-3xl border border-[#1A1A2E]/8 bg-gradient-to-br from-white via-[#F9F8F6] to-[#FFCD94]/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}>
                <div className="text-7xl font-extrabold bg-gradient-to-r from-[#38226C] to-[#6A4DFB] bg-clip-text text-transparent mb-3">{item.stat}</div>
                <p className="text-[#1A1A2E]/65 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
          
          {/* Updated Testimonial with real content */}
          <div className="reveal delay-400 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-[#F9F8F6] to-white rounded-3xl p-10 border border-[#1A1A2E]/8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col items-center text-center">
                {/* Quote icon */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#38226C] to-[#6A4DFB] flex items-center justify-center mb-6 shadow-lg shadow-[#38226C]/20">
                  <span className="text-3xl text-white">“</span>
                </div>
                
                {/* Testimonial text */}
                <p className="text-xl md:text-2xl text-[#1A1A2E]/80 leading-relaxed mb-8 italic">
                  "Prevail has transformed how our students approach their careers. 
                  The AI tools are intuitive, and the outcome tracking gives us real 
                  data to improve our programs. Our placement rates have never been better."
                </p>
                
                {/* Divider */}
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#38226C]/20 via-[#6A4DFB] to-[#FFB252]/20 mb-6" />
                
                {/* Author info */}
                <div>
                  <p className="font-bold text-[#1A1A2E] text-lg">Dr. Sarah Chen</p>
                  <p className="text-[#1A1A2E]/50">Executive Director of Career Services</p>
                  <p className="text-[#6A4DFB] font-medium mt-1">Western Governors University</p>
                </div>
                
                {/* Rating stars */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#FFB252] fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
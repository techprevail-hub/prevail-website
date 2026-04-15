import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "About Prevail | Our Mission & Team",
  description:
    "Learn about Prevail, our mission to make career success accessible to everyone from students to executives, and the team building the future of career development.",
};

const teamPlaceholders = [
  { initials: "FT", name: "Founder Name", title: "CEO & Co-Founder", bio: "Bio coming soon. Our founder brings deep expertise in career services and AI product development." },
  { initials: "FT", name: "Founder Name", title: "CTO & Co-Founder", bio: "Bio coming soon. Technical co-founder with a background in AI engineering and enterprise software." },
  { initials: "FT", name: "Founder Name", title: "CPO & Co-Founder", bio: "Bio coming soon. Product leader with experience building platforms for higher education and career development." },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-neutral-50 to-brand-purple/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-brand-navy mb-6">
            We Built Prevail Because We Lived the Problem
          </h1>
          <p className="text-xl text-neutral-500 leading-relaxed">
            Our team brings together experience in career services, enterprise software,
            AI engineering, and personal branding — because solving this right requires all of it.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel light>Our Mission</SectionLabel>
          <p className="text-2xl font-medium text-white leading-relaxed">
            &ldquo;Career success should not depend on who you know or which school you attended.
            Prevail exists to give every professional — from first-year student to Fortune 500
            executive — the tools, the guidance, and the visibility they deserve.&rdquo;
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-brand-navy">The Founding Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamPlaceholders.map((member, i) => (
              <div key={i} className="text-center p-8 rounded-2xl border border-neutral-200 hover:border-brand-purple/30 hover:shadow-lg transition-all bg-white">
                <div className="w-20 h-20 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-brand-purple">
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-1">{member.name}</h3>
                <p className="text-brand-purple text-sm font-semibold mb-4">{member.title}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Our Vision</SectionLabel>
          <h2 className="text-4xl font-bold text-brand-navy mb-6">Building the Platform We Wish We Had</h2>
          <p className="text-lg text-neutral-500 leading-relaxed">
            We are building the career platform we wish existed when we were building our own careers.
            AI-first. Human-centered. Accessible to everyone — students, professionals, and executives alike.
          </p>
        </div>
      </section>

      {/* PREVAIL TECHNOLOGY SOLUTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-5">Prevail Technology Solutions</h2>
          <p className="text-neutral-500 text-lg leading-relaxed mb-6">
            Prevail is a product of Prevail Technology Solutions, a company dedicated to
            building AI-powered tools that level the playing field in career development and
            professional growth. We are backed by advisors from Fortune 500 companies, leading
            universities, and the technology sector.
          </p>
          <p className="text-neutral-400 text-sm italic">[Company credentials and partnerships — coming soon]</p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-5">Contact & Partnerships</h2>
          <p className="text-neutral-500 text-lg mb-8">
            Interested in a partnership, press inquiry, or institutional pilot program?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="mailto:hello@withprevail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-purple text-white font-semibold rounded-xl hover:bg-brand-purple-dark transition-all"
            >
              hello@withprevail.com
            </a>
            <a
              href="https://linkedin.com/company/prevail"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-purple text-brand-purple font-semibold rounded-xl hover:bg-brand-purple hover:text-white transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-brand-navy">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Believe in what we&apos;re building?</h2>
          <p className="text-neutral-400 mb-8">Join the waitlist and be part of the Prevail journey from day one.</p>
          <Link href="/waitlist" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-white font-semibold rounded-xl hover:bg-brand-purple-dark hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-purple/25">
            Join the Waitlist
          </Link>
        </div>
      </section>
    </>
  );
}

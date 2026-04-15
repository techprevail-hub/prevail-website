"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Linkedin, Github, ArrowRight, CheckCircle2 } from "lucide-react";

const ROLE_OPTIONS = [
  { value: "", label: "I am a..." },
  { value: "student", label: "Student / Recent Graduate" },
  { value: "job-seeker", label: "Job Seeker / Career Changer" },
  { value: "professional", label: "Working Professional" },
  { value: "executive", label: "CXO / Executive / Senior Leader" },
  { value: "sales", label: "Sales Professional" },
  { value: "institution", label: "Institution / University / Bootcamp" },
  { value: "coach", label: "Career Coach" },
  { value: "other", label: "Other" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && role) setSubmitted(true);
  }

  const logoFull = "/Prevail-Logo-light.png";

  return (
    <footer className="relative overflow-hidden w-full">
      {/* Background blur effects - adjusted for mobile */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full blur-3xl" style={{ backgroundColor: "rgba(108,92,231,0.06)" }} />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full blur-3xl" style={{ backgroundColor: "rgba(172,93,0,0.05)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] sm:w-[700px] sm:h-[350px] rounded-full blur-3xl" style={{ backgroundColor: "rgba(118,112,171,0.05)" }} />

      {/* Background watermark text - hidden on very small screens */}
      <div className="absolute inset-0 items-start justify-center overflow-hidden pointer-events-none select-none hidden sm:flex">
        <span
          className="text-[6rem] sm:text-[10rem] lg:text-[14rem] font-serif font-extrabold whitespace-nowrap"
          style={{ color: "rgba(108,92,231,0.15)", letterSpacing: "0.08em", marginTop: "-20px" }}
        >
          PREVAIL
        </span>
      </div>

      {/* Top accent bar */}
      <div className="relative z-10 h-0 w-full bg-gradient-to-r from-[#6C5CE7] via-[#7670AB] to-[#AC5D00]" />

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          
          {/* Brand Section */}
          <div className="reveal-up text-center sm:text-left">
            <div className="mb-6 sm:mb-8 flex justify-center sm:justify-start">
              <div className="relative w-40 h-12 sm:w-48 sm:h-14">
                <Image src={logoFull} alt="Prevail" fill className="object-contain object-center sm:object-left" />
              </div>
            </div>
            <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-xs mx-auto sm:mx-0" style={{ color: "#2D264B" }}>
              The AI-first career and personal branding platform for everyone who wants to Prevail.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
              {[
                { href: "https://twitter.com/withprevail", icon: Twitter, label: "Twitter" },
                { href: "https://www.linkedin.com/company/joinprevail/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://instagram.com/withprevail", icon: Instagram, label: "Instagram" },
                { href: "https://github.com/prevail", icon: Github, label: "GitHub" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: "rgba(108,92,231,0.10)", color: "#6C5CE7" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "#6C5CE7"; el.style.color = "#fff"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "rgba(108,92,231,0.10)"; el.style.color = "#6C5CE7"; }}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="reveal-up delay-100 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6" style={{ color: "#AC5D00" }}>Product</h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { href: "/features", label: "Features" },
                { href: "/for-institutions", label: "For Institutions" },
                { href: "/for-individuals", label: "For Individuals" },
                { href: "/for-executives", label: "For Executives" },
                { href: "/compare", label: "Compare" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                    style={{ color: "#2D264B" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6C5CE7"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#2D264B"; }}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="reveal-up delay-200 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6" style={{ color: "#AC5D00" }}>Company</h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { href: "/about", label: "About" },
                { href: "/compare", label: "Why Prevail" },
                { href: "#", label: "Blog (Coming Soon)" },
                { href: "mailto:hello@withprevail.com", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm sm:text-base hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                    style={{ color: "#2D264B" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6C5CE7"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#2D264B"; }}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Early Access Form */}
          <div className="reveal-up delay-300">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 text-center sm:text-left" style={{ color: "#AC5D00" }}>Get Early Access</h4>
            {submitted ? (
              <div className="rounded-xl p-4 sm:p-6 text-center" style={{ backgroundColor: "rgba(108,92,231,0.10)", border: "1px solid rgba(108,92,231,0.20)" }}>
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3" style={{ color: "#6C5CE7" }} />
                <p className="font-semibold text-sm sm:text-base" style={{ color: "#2D264B" }}>You are on the list! 🎉</p>
                <p className="text-xs sm:text-sm mt-2" style={{ color: "#4A3F7C" }}>We will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your professional email"
                  required
                  className="w-full px-4 sm:px-5 py-3 bg-white rounded-xl text-sm sm:text-base outline-none transition-all duration-300"
                  style={{ border: "1px solid rgba(108,92,231,0.20)", color: "#2D264B" }}
                  onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "#6C5CE7"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(108,92,231,0.20)"; }}
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full px-4 sm:px-5 py-3 bg-white rounded-xl text-sm sm:text-base outline-none cursor-pointer transition-all duration-300"
                  style={{ border: "1px solid rgba(108,92,231,0.20)", color: "#2D264B" }}
                  onFocus={(e) => { (e.currentTarget as HTMLSelectElement).style.borderColor = "#6C5CE7"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLSelectElement).style.borderColor = "rgba(108,92,231,0.20)"; }}
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ""} className="bg-white" style={{ color: "#2D264B" }}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="group w-full py-3 text-white text-sm sm:text-base font-semibold rounded-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(to right, #6C5CE7, #7670AB)", boxShadow: "0 4px 15px rgba(108,92,231,0.25)" }}
                >
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            )}
            <p className="text-xs sm:text-sm mt-3 sm:mt-4 text-center" style={{ color: "#4A3F7C" }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10" style={{ borderTop: "1px solid rgba(108,92,231,0.15)", backgroundColor: "rgba(108,92,231,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
          <p className="text-xs sm:text-base font-medium tracking-wide text-center sm:text-left" style={{ color: "#2D264B" }}>
            © 2026 Prevail. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10">
            <a
              href="/privacy-policy"
              className="text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:underline"
              style={{ color: "#4A3F7C" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6C5CE7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#4A3F7C"; }}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:underline"
              style={{ color: "#4A3F7C" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6C5CE7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#4A3F7C"; }}
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:underline"
              style={{ color: "#4A3F7C" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6C5CE7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#4A3F7C"; }}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
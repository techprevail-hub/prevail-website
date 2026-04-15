// components/ui/WaitlistForm.tsx
"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const ROLE_OPTIONS = [
  { value: "",            label: "I am a..."                          },
  { value: "student",     label: "Student / Recent Graduate"          },
  { value: "job-seeker",  label: "Job Seeker / Career Changer"        },
  { value: "professional",label: "Working Professional"               },
  { value: "executive",   label: "CXO / Executive / Senior Leader"    },
  { value: "sales",       label: "Sales Professional"                 },
  { value: "institution", label: "Institution / University / Bootcamp"},
  { value: "coach",       label: "Career Coach"                       },
  { value: "other",       label: "Other"                              },
];

interface MiniWaitlistFormProps { dark?: boolean; className?: string; defaultRole?: string; }

export function MiniWaitlistForm({ dark = false, className, defaultRole }: MiniWaitlistFormProps) {
  const [email, setEmail] = useState<string>("");
  const [role,  setRole]  = useState<string>(defaultRole || "");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !role) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={cn("text-center py-4", className)}>
        <div className={cn("inline-flex items-center gap-2 text-lg font-bold mb-2", dark ? "text-white" : "text-[#1A1A2E]")}>
          <CheckCircle2 className="w-5 h-5 text-[#FFB252]" />
          <span>You&apos;re on the list!</span>
        </div>
        <p className={cn("text-sm", dark ? "text-white/60" : "text-[#1A1A2E]/55")}>We&apos;ll be in touch soon with early access details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your professional email" required
          className={cn(
            "flex-1 px-4 py-3.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#6A4DFB]/40 transition",
            dark ? "bg-white/10 border-white/20 text-white placeholder:text-white/40" : "bg-white border-[#1A1A2E]/15 text-[#1A1A2E] placeholder:text-[#1A1A2E]/35"
          )} />
        <select value={role} onChange={(e) => setRole(e.target.value)} required
          className={cn(
            "px-4 py-3.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#6A4DFB]/40 transition",
            dark ? "bg-white/10 border-white/20 text-white" : "bg-white border-[#1A1A2E]/15 text-[#1A1A2E]"
          )}>
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ""} className="bg-white text-[#1A1A2E]">{opt.label}</option>
          ))}
        </select>
        <button type="submit" className="group px-6 py-3.5 bg-gradient-to-r from-[#38226C] to-[#6A4DFB] text-white font-bold rounded-xl hover:from-[#2D1A56] hover:to-[#5A3DE8] hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[#38226C]/30 whitespace-nowrap text-sm flex items-center gap-2 justify-center">
          Join Waitlist
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}

interface FullWaitlistFormProps { className?: string; }

export function FullWaitlistForm({ className }: FullWaitlistFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    organization: "",
    country: "",
    consent: false
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showOrg = formData.role === "institution" || formData.role === "coach";

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.lastName.trim())  e.lastName  = "Last name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email is required";
    if (!formData.role)    e.role    = "Please select your role";
    if (!formData.consent) e.consent = "Please agree to receive updates";
    return e;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputCls = (field: string) => cn(
    "w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#6A4DFB]/40 transition text-[#1A1A2E]",
    errors[field] ? "border-red-400 bg-red-50" : "border-[#1A1A2E]/15 bg-[#F9F8F6]/50 focus:bg-white"
  );

  if (submitted) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="w-20 h-20 bg-[#6A4DFB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#6A4DFB]" />
        </div>
        <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-4">You&apos;re on the List!</h2>
        <p className="text-[#1A1A2E]/55 mb-8 max-w-sm mx-auto">We&apos;ll be in touch soon with your early access details and founding member benefits. Watch your inbox.</p>
        <p className="text-sm font-semibold text-[#1A1A2E] mb-4">Know someone who would love Prevail?</p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://withprevail.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition">Share on LinkedIn</a>
          <a href="https://twitter.com/intent/tweet?text=Just+joined+the+waitlist+for+%40withprevail+%E2%80%94+the+AI-first+career+platform!+https://withprevail.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:opacity-90 transition">Share on Twitter</a>
          <button onClick={() => { navigator.clipboard.writeText("https://withprevail.com"); alert("Link copied!"); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F9F8F6] border border-[#1A1A2E]/15 text-[#1A1A2E]/70 rounded-xl text-sm font-semibold hover:bg-white transition">Copy Link</button>
        </div>
        <a href="https://linkedin.com/company/prevail" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#6A4DFB] font-semibold hover:text-[#38226C] transition text-sm">
          Follow Prevail on LinkedIn →
        </a>
        <div className="mt-6">
          <a href="/" className="text-sm text-[#1A1A2E]/35 hover:text-[#1A1A2E]/60 transition">← Back to Homepage</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)} noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#1A1A2E]/60 uppercase tracking-wider mb-1.5">First Name <span className="text-red-400">*</span></label>
          <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} placeholder="Jane" className={inputCls("firstName")} />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-[#1A1A2E]/60 uppercase tracking-wider mb-1.5">Last Name <span className="text-red-400">*</span></label>
          <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} placeholder="Doe" className={inputCls("lastName")} />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1A1A2E]/60 uppercase tracking-wider mb-1.5">Email Address <span className="text-red-400">*</span></label>
        <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="jane@example.com" className={inputCls("email")} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1A1A2E]/60 uppercase tracking-wider mb-1.5">I am a... <span className="text-red-400">*</span></label>
        <select value={formData.role} onChange={(e) => handleChange("role", e.target.value)} className={inputCls("role")}>
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ""}>{opt.label}</option>
          ))}
        </select>
        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
      </div>

      {showOrg && (
        <div>
          <label className="block text-xs font-bold text-[#1A1A2E]/60 uppercase tracking-wider mb-1.5">Organization Name <span className="text-[#1A1A2E]/30 font-normal normal-case">(optional)</span></label>
          <input type="text" value={formData.organization} onChange={(e) => handleChange("organization", e.target.value)} placeholder="Your institution or company" className={inputCls("organization")} />
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-[#1A1A2E]/60 uppercase tracking-wider mb-1.5">Country <span className="text-[#1A1A2E]/30 font-normal normal-case">(optional)</span></label>
        <input type="text" value={formData.country} onChange={(e) => handleChange("country", e.target.value)} placeholder="United States" className={inputCls("country")} />
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={formData.consent} onChange={(e) => handleChange("consent", e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-[#1A1A2E]/20 text-[#6A4DFB] focus:ring-[#6A4DFB] cursor-pointer accent-[#6A4DFB]" />
          <span className="text-sm text-[#1A1A2E]/60">
            I agree to receive product updates from Prevail. I can unsubscribe anytime. <span className="text-red-400">*</span>
          </span>
        </label>
        {errors.consent && <p className="text-red-500 text-xs mt-1 ml-7">{errors.consent}</p>}
      </div>

      <button type="submit" className="group w-full py-4 bg-gradient-to-r from-[#38226C] to-[#6A4DFB] text-white font-bold rounded-2xl hover:from-[#2D1A56] hover:to-[#5A3DE8] hover:-translate-y-0.5 transition-all duration-200 shadow-xl shadow-[#38226C]/30 text-base flex items-center justify-center gap-2">
        Secure My Spot on the Waitlist
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-center text-xs text-[#1A1A2E]/35 flex items-center justify-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Your information is safe. We will never sell or share your data.
      </p>
    </form>
  );
}
// app/waitlist/WaitlistClient.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Sparkles, ArrowRight, Users, Clock, Gift, Zap, Star, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function WaitlistClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("waitlist").insert([
      {
        name: name,
        email: email,
        role: role,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error saving data. Please try again.");
    } else {
      alert("Successfully joined waitlist! 🎉");
      setName("");
      setEmail("");
      setRole("");
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {/* ════════════════════════════════════════
          WAITLIST PAGE - Hero with form
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-[40px] overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCD94]/20 via-[#F9F8F6] to-white" />
        
        {/* Decorative blobs */}
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#6A4DFB]/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[#FFB252]/10 blur-3xl" />
        <div className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full bg-[#38226C]/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left: Content */}
            <div className="w-full lg:w-1/2">
              {/* Eyebrow badge */}
              <div className="reveal inline-flex items-center gap-2 bg-[#38226C]/5 border border-[#38226C]/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-[#FFB252] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#38226C] uppercase">Launching Soon</span>
              </div>

              <h1 className="reveal delay-100 text-[3.25rem] sm:text-[4rem] lg:text-[5rem] font-extrabold text-[#1A1A2E] leading-[1.1] tracking-tight mb-6">
                Prevail Is Coming.{" "}
                <span className="bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] bg-clip-text text-transparent">Be the First In.</span>
              </h1>

              <p className="reveal delay-200 text-lg text-[#1A1A2E]/60 leading-relaxed mb-8 max-w-xl">
                Join the waitlist to get early access, founding member pricing, and exclusive 
                product updates. No spam — ever.
              </p>

              {/* Stats counter */}
              <div className="reveal delay-300 flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2 border border-[#1A1A2E]/8 shadow-sm">
                  <Users className="w-4 h-4 text-[#6A4DFB]" />
                  <span className="text-sm font-semibold text-[#1A1A2E]">
                    <span className="text-[#38226C] text-lg font-extrabold">500+</span> already joined
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2 border border-[#1A1A2E]/8 shadow-sm">
                  <Clock className="w-4 h-4 text-[#FFB252]" />
                  <span className="text-sm font-semibold text-[#1A1A2E]">Limited spots</span>
                </div>
              </div>

              {/* Benefits list */}
              <div className="reveal delay-400 space-y-3">
                <p className="text-sm font-semibold text-[#1A1A2E] mb-3">What you get:</p>
                {[
                  { icon: <Zap className="w-4 h-4" />, text: "Early access before public launch" },
                  { icon: <Gift className="w-4 h-4" />, text: "Founding member pricing — locked in for life" },
                  { icon: <Star className="w-4 h-4" />, text: "Exclusive beta features and direct input on the product roadmap" },
                  { icon: <Shield className="w-4 h-4" />, text: "Priority support and dedicated onboarding" },
                ].map((benefit, idx) => (
                  <div key={benefit.text} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFB252]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#FFB252]" />
                    </div>
                    <span className="text-[#1A1A2E]/70 text-sm">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form Card */}
            <div className="w-full lg:w-[45%] reveal-right">
              <div className="relative">
                {/* Decorative glow behind form */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#38226C]/10 to-[#6A4DFB]/10 blur-3xl" />
                </div>
                
                {/* Form Card */}
                <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-[#1A1A2E]/8 overflow-hidden">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-[#38226C] to-[#6A4DFB] px-8 py-6 text-center">
                    <Sparkles className="w-8 h-8 text-white mx-auto mb-2" />
                    <h3 className="text-2xl font-bold text-white">Join the Waitlist</h3>
                    <p className="text-white/70 text-sm mt-1">Get early access and exclusive perks</p>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-8">
                    {submitted ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-[#FFB252]/20 flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-[#FFB252]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">You're on the list! 🎉</h3>
                        <p className="text-[#1A1A2E]/60 text-sm">We'll be in touch with updates and early access details.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-[#1A1A2E]/70 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                            className="w-full px-4 py-3 bg-[#F9F8F6] border border-[#1A1A2E]/20 rounded-xl text-sm text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:outline-none focus:border-[#6A4DFB] focus:ring-2 focus:ring-[#6A4DFB]/20 transition-all duration-300"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#1A1A2E]/70 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-3 bg-[#F9F8F6] border border-[#1A1A2E]/20 rounded-xl text-sm text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:outline-none focus:border-[#6A4DFB] focus:ring-2 focus:ring-[#6A4DFB]/20 transition-all duration-300"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-[#1A1A2E]/70 mb-2">
                            I am a...
                          </label>
                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#F9F8F6] border border-[#1A1A2E]/20 rounded-xl text-sm text-[#1A1A2E] focus:outline-none focus:border-[#6A4DFB] focus:ring-2 focus:ring-[#6A4DFB]/20 transition-all duration-300 cursor-pointer"
                          >
                            <option value="" disabled>Select your role</option>
                            <option value="student">Student / Recent Graduate</option>
                            <option value="job-seeker">Job Seeker / Career Changer</option>
                            <option value="professional">Working Professional</option>
                            <option value="executive">CXO / Executive / Senior Leader</option>
                            <option value="sales">Sales Professional</option>
                            <option value="institution">Institution / University / Bootcamp</option>
                            <option value="coach">Career Coach</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group w-full py-3 bg-gradient-to-r from-[#38226C] to-[#6A4DFB] text-white text-sm font-semibold rounded-xl hover:from-[#2D1A56] hover:to-[#5a3be8] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-[#38226C]/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Join Waitlist
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                    
                    {/* Trust indicators */}
                    <div className="mt-8 pt-6 border-t border-[#1A1A2E]/8">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#1A1A2E]/50">
                          <span className="flex items-center gap-1">✓ No spam</span>
                          <span className="flex items-center gap-1">✓ Unsubscribe anytime</span>
                          <span className="flex items-center gap-1">✓ Your data is safe</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 text-xs text-[#1A1A2E]/40">
                          <span>No credit card required</span>
                          <span className="w-1 h-1 rounded-full bg-[#1A1A2E]/20" />
                          <span>Free to join</span>
                          <span className="w-1 h-1 rounded-full bg-[#1A1A2E]/20" />
                          <span>Cancel anytime</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BONUS: WHAT YOU GET SECTION
      ════════════════════════════════════════ */}
      <section className="py-20 bg-[#F9F8F6] relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[#FFB252]/10 rounded-full blur-3xl" />
        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1A1A2E]">Why Join the Waitlist?</h2>
            <p className="text-[#1A1A2E]/50 mt-3">Founding members get exclusive benefits that won't be available after launch</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "01", title: "Early Access", desc: "Be among the first to use Prevail before the public launch" },
              { number: "02", title: "Lifetime Pricing", desc: "Lock in founding member rates that never increase" },
              { number: "03", title: "Shape the Product", desc: "Direct input on features and product roadmap" },
              { number: "04", title: "Priority Support", desc: "Dedicated onboarding and priority customer service" },
            ].map((item, idx) => (
              <div key={item.title} className={`reveal delay-${(idx+1)*100} p-6 rounded-2xl bg-white border border-[#1A1A2E]/8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}>
                <div className="text-4xl font-extrabold bg-gradient-to-r from-[#38226C] to-[#6A4DFB] bg-clip-text text-transparent mb-3">{item.number}</div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{item.title}</h3>
                <p className="text-[#1A1A2E]/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ / TRUST SECTION
      ════════════════════════════════════════ */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[#FFCD94]/20 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#38226C]/5 border border-[#38226C]/10 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#6A4DFB]" />
            <span className="text-xs font-bold tracking-widest text-[#38226C] uppercase">Trusted by Professionals</span>
          </div>
          <p className="text-[#1A1A2E]/60 text-lg max-w-2xl mx-auto">
            Join 500+ professionals and institutions already on the waitlist. 
            Limited founding member spots available — don't miss out.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFB252]/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#FFB252]" />
              </div>
              <span className="text-sm text-[#1A1A2E]/60">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFB252]/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#FFB252]" />
              </div>
              <span className="text-sm text-[#1A1A2E]/60">Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFB252]/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#FFB252]" />
              </div>
              <span className="text-sm text-[#1A1A2E]/60">Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
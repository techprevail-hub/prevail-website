import React from "react";
import { MiniWaitlistForm } from "./WaitlistForm";

interface CtaSectionProps {
  headline?: string;
  subtext?: string;
  defaultRole?: string;
}

export default function CtaSection({
  headline = "Be Among the First to Prevail",
  subtext = "Join the waitlist for early access, founding member pricing, and exclusive platform updates. Launching soon.",
  defaultRole,
}: CtaSectionProps) {
  return (
    <section className="bg-brand-navy py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{headline}</h2>
        <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto">{subtext}</p>
        <MiniWaitlistForm dark defaultRole={defaultRole} className="max-w-2xl mx-auto" />
        <p className="text-neutral-500 text-xs mt-4">
          No spam. Unsubscribe anytime. Your data is safe with us.
        </p>
      </div>
    </section>
  );
}
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Prevail",
  description: "Prevail's terms of service.",
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-navy mb-6">Terms of Service</h1>
        <p className="text-neutral-500 mb-4">Last updated: January 2025</p>
        <div className="prose prose-neutral max-w-none">
          <p className="text-neutral-600 leading-relaxed mb-6">
            By accessing withprevail.com and joining the Prevail waitlist, you agree to these Terms of Service.
            Please read them carefully.
          </p>
          <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Waitlist Service</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            By joining the Prevail waitlist, you consent to receiving product updates, launch notifications, and
            information about founding member pricing. This is a pre-launch marketing service — no product access
            is guaranteed by joining the waitlist.
          </p>
          <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Acceptable Use</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            You agree to provide accurate information when joining the waitlist and to use this website for
            lawful purposes only.
          </p>
          <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Intellectual Property</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            All content on this website, including text, graphics, logos, and images, is the property of
            Prevail Technology Solutions and is protected by applicable intellectual property laws.
          </p>
          <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            This website is provided &ldquo;as is&rdquo; without any warranties. Prevail Technology Solutions shall not
            be liable for any indirect, incidental, or consequential damages arising from your use of this website.
          </p>
          <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Contact</h2>
          <p className="text-neutral-600 leading-relaxed">
            For questions about these terms, contact us at{" "}
            <a href="mailto:hello@withprevail.com" className="text-brand-purple hover:underline">
              hello@withprevail.com
            </a>.
          </p>
        </div>
        <div className="mt-10">
          <Link href="/" className="text-brand-purple font-semibold hover:text-brand-purple-dark transition">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

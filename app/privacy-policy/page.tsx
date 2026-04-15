import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Prevail",
  description: "Prevail's privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-navy mb-6">Privacy Policy</h1>
        <p className="text-neutral-500 mb-4">Last updated: January 2025</p>
        <div className="prose prose-neutral max-w-none">
          <p className="text-neutral-600 leading-relaxed mb-6">
            Prevail Technology Solutions (&ldquo;Prevail,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our website
            at withprevail.com and join our waitlist.
          </p>
          <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Information We Collect</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            When you join our waitlist, we collect your name, email address, professional role, and optionally your
            organization and country. We use this information solely to communicate with you about Prevail&apos;s launch
            and provide you with early access.
          </p>
          <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600 mb-6">
            <li>To send you product updates and launch notifications</li>
            <li>To provide you with founding member benefits</li>
            <li>To improve our product based on user feedback</li>
            <li>We never sell or share your personal information with third parties</li>
          </ul>
          <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Your Rights</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            You can unsubscribe from our communications at any time by clicking the unsubscribe link in any email
            we send, or by contacting us at{" "}
            <a href="mailto:hello@withprevail.com" className="text-brand-purple hover:underline">
              hello@withprevail.com
            </a>.
          </p>
          <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Contact Us</h2>
          <p className="text-neutral-600 leading-relaxed">
            For privacy-related inquiries, contact us at{" "}
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

// app/waitlist/page.tsx
import type { Metadata } from "next";
import WaitlistClient from "./WaitlistClient";

export const metadata: Metadata = {
  title: "Join the Prevail Waitlist | Early Access & Founding Pricing",
  description: "Join the Prevail waitlist for early access, founding member pricing, and exclusive updates before public launch. Limited spots available.",
};

export default function WaitlistPage() {
  return <WaitlistClient />;
}
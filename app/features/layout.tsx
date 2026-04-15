import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prevail Features | AI Career Tools & Coaching Marketplace",
  description:
    "Explore all Prevail features: resume optimizer, LinkedIn scorer, AI headshots, coaching marketplace, mock interview practice, and institutional outcome tracking.",
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

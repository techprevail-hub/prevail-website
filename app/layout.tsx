// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: {
    default: "Prevail — AI Career Platform for Everyone | withprevail.com",
    template: "%s | Prevail",
  },
  description:
    "The AI-first career platform combining resume tools, LinkedIn optimization, coaching, headshots, and personal branding. For students, professionals, and executives.",
  metadataBase: new URL("https://withprevail.com"),
  openGraph: {
    type: "website",
    siteName: "Prevail",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-[#F9F8F6] text-[#1A1A2E]">
        {/* ScrollReveal with reset on exit enabled for re-animation */}
        <ScrollReveal 
          threshold={0.12} 
          rootMargin="0px 0px -40px 0px" 
          once={false}
          resetOnExit={true}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
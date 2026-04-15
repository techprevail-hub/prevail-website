// components/ui/Navbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/for-institutions", label: "For Institutions" },
  { href: "/for-individuals",  label: "For Individuals"  },
  { href: "/for-executives",   label: "For Executives"   },
  { href: "/features",         label: "Features"         },
  { href: "/admin",            label: "Admin"            },
  { href: "/compare",          label: "Compare"          },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const logoFull = "/Prevail-Logo-light.png";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          scrolled
            ? "bg-white/60 backdrop-blur-md shadow-sm border-b border-[#38226C]/10 h-[84px]"
            : "bg-transparent border-b border-transparent h-[96px]"
        )}
      >
        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <div
                className={cn(
                  "relative transition-all duration-500",
                  scrolled ? "w-36 h-10" : "w-44 h-12"
                )}
              >
                <Image
                  src={logoFull}
                  alt="Prevail"
                  fill
                  className="object-contain object-left transition-all duration-300"
                  priority
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-base font-semibold transition-all duration-200",
                    pathname === link.href
                      ? "text-[#38226C] bg-[#38226C]/10"
                      : "text-[#1A1A2E]/70 hover:text-[#38226C] hover:bg-[#38226C]/6"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="/waitlist"
                className="hidden sm:inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-md text-white bg-gradient-to-r from-[#38226C] to-[#6A4DFB] hover:from-[#2D1A56] hover:to-[#38226C] shadow-[#38226C]/30"
              >
                <Sparkles className="w-4 h-4 text-white/80" />
                Join the Waitlist
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl transition-colors text-[#1A1A2E] hover:bg-[#38226C]/10"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden transition-all duration-300",
        mobileOpen ? "visible" : "invisible pointer-events-none"
      )}>
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-[340px] bg-gradient-to-br from-[#1A1A2E] via-[#1A1A2E] to-[#2D1A56] shadow-2xl flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="relative w-32 h-9">
              <Image
                src={logoFull}
                alt="Prevail"
                fill
                className="object-contain object-left"
              />
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <nav className="flex flex-col p-4 gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-5 py-4 rounded-xl text-base font-semibold transition-colors",
                  pathname === link.href
                    ? "text-[#FFB252] bg-white/10"
                    : "text-white/80 hover:text-[#FFB252] hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="px-5 py-4 rounded-xl text-base font-semibold text-white/80 hover:text-[#FFB252] hover:bg-white/5 transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="p-5 border-t border-white/10">
            <Link
              href="/waitlist"
              className="block w-full text-center py-4 bg-gradient-to-r from-[#B8710E] to-[#9E600C] text-white font-bold rounded-2xl hover:from-[#C98114] hover:to-[#B8710E] transition-all shadow-md shadow-[#B8710E]/40 text-base"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
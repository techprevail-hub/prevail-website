# Prevail Website

**Domain:** withprevail.com  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · React  
**Built for:** Prevail Technology Solutions

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

---

## 📁 File Structure

```
prevail-website/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Navbar + Footer on all pages)
│   ├── globals.css             # Global styles + Tailwind imports
│   ├── page.tsx                # Homepage (/)
│   ├── for-institutions/
│   │   └── page.tsx            # /for-institutions
│   ├── for-individuals/
│   │   └── page.tsx            # /for-individuals
│   ├── for-executives/
│   │   └── page.tsx            # /for-executives
│   ├── features/
│   │   ├── layout.tsx          # Metadata for client page
│   │   └── page.tsx            # /features (tabbed interface)
│   ├── compare/
│   │   └── page.tsx            # /compare
│   ├── waitlist/
│   │   └── page.tsx            # /waitlist (full form + thank-you state)
│   ├── about/
│   │   └── page.tsx            # /about
│   ├── privacy-policy/
│   │   └── page.tsx            # /privacy-policy
│   ├── terms/
│   │   └── page.tsx            # /terms
│   ├── sitemap.ts              # Auto-generated sitemap.xml
│   └── robots.ts               # robots.txt
│
├── components/
│   ├── Navbar.tsx              # Sticky navbar with mobile hamburger
│   ├── Footer.tsx              # 4-column footer with mini waitlist form
│   ├── CtaSection.tsx          # Reusable dark CTA section
│   └── ui/
│       ├── Button.tsx          # Multi-variant button component
│       ├── Badge.tsx           # Accent / coming-soon badges
│       ├── SectionLabel.tsx    # Small eyebrow labels
│       ├── FeatureCard.tsx     # Feature display card (light + premium dark)
│       ├── StatCard.tsx        # Stat display card
│       ├── ComparisonTable.tsx # Comparison table with highlighted column
│       └── WaitlistForm.tsx    # MiniWaitlistForm + FullWaitlistForm
│
├── lib/
│   └── utils.ts                # cn() helper (clsx + tailwind-merge)
│
├── public/
│   └── images/
│       ├── logo-full.jpg        # Full logo (used in Navbar)
│       ├── logo-symbol-dark.jpg # Dark symbol logo
│       └── logo-symbol-light.jpg # Light symbol logo (used in Footer)
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## 🎨 Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `brand-purple` | `#6B5CE7` | Primary accent, CTAs, highlights |
| `brand-purple-light` | `#8B7FF0` | Hover states, light text on dark |
| `brand-purple-dark` | `#5344D4` | Hover darken |
| `brand-navy` | `#1A1A2E` | Dark backgrounds, primary text |
| `brand-navy-light` | `#2D2D4E` | Subtle dark gradient |

---

## 📄 Pages (8 total)

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Full landing page, all audience sections |
| For Institutions | `/for-institutions` | B2B page for bootcamps & universities |
| For Individuals | `/for-individuals` | Job seekers & professionals |
| For Executives | `/for-executives` | CXO & senior professionals (dark hero) |
| Features | `/features` | Tabbed feature overview |
| Compare | `/compare` | Competitor comparison tables |
| Waitlist | `/waitlist` | Full sign-up form + thank-you state |
| About | `/about` | Mission, team, contact |

---

## 🔧 Key Components

### WaitlistForm
Two variants:
- **`<MiniWaitlistForm />`** — Inline email + role + button (used in CTA sections and footer)
- **`<FullWaitlistForm />`** — Complete 7-field form with validation and thank-you state

### ComparisonTable
Accepts `headers`, `rows`, and `highlightColumn` (1-indexed). Renders checkmarks, dashes, or strings.

### FeatureCard
Pass `premium` prop for the dark navy premium variant (used on the executives page).

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. No environment variables needed for static MVP
4. Configure custom domain `withprevail.com` in Vercel DNS settings

---

## 📊 Waitlist Form Backend

The form currently simulates submission locally. To connect a real backend:

**Option A — Tally.so (Recommended for MVP speed)**
- Create form at [tally.so](https://tally.so)
- Replace form `onSubmit` in `WaitlistForm.tsx` with a redirect to your Tally URL

**Option B — Custom (Supabase + Resend)**
- Add a Next.js API route at `app/api/waitlist/route.ts`
- POST form data to Supabase table
- Send confirmation email via [resend.com](https://resend.com)

**GA4 Events** — Add your GA4 Measurement ID to `app/layout.tsx` via `next/script` or Google Tag Manager.

---

## 📝 Content To Update

- [ ] `app/about/page.tsx` — Replace founder placeholder names/bios/photos
- [ ] `public/images/` — Add OG image (`og-image.jpg`, 1200×630px)
- [ ] Waitlist counter — Update `500+` in `app/waitlist/page.tsx` and `app/page.tsx` weekly
- [ ] Footer social links — Update LinkedIn, Twitter, Instagram URLs
- [ ] Calendly links — Replace `mailto:` links with actual Calendly booking URLs
- [ ] GA4 — Add tracking script to `app/layout.tsx`

---

© 2025 Prevail Technology Solutions

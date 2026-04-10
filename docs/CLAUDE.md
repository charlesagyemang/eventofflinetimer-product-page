# CLAUDE.md — Offline Event Timer Marketing Site

Read this entire file before writing any code. Then read `SPEC.md` for detailed section layouts, copy, and animation choreography. This file is the rules. SPEC.md is the blueprint.

---

## What This Is

A Next.js marketing page for the **Offline Event Timer** — an Electron desktop app that runs a countdown timer offline and shares it to any screen on the local network via WebSocket. This marketing site sells the app and gets people to download it.

**This is NOT the Electron app.** The Electron app lives in the parent directory (`../`). This is a separate Next.js project that will be deployed to Vercel. It has zero runtime dependency on the Electron app.

**One page. One goal: download.**

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 15 (App Router) |
| Styling | Tailwind CSS | 4 |
| Animations | Framer Motion | latest |
| Icons | Lucide React | latest |
| Fonts | Inter + JetBrains Mono | via `next/font` |
| Hosting | Vercel | Static export |

**Do NOT add:** jQuery, Bootstrap, Chakra, MUI, styled-components, Sass, GSAP, Three.js, or any CSS framework other than Tailwind. Keep the dependency count minimal.

---

## Commands

```bash
# Dev
npm run dev          # localhost:3000

# Build
npm run build        # Static export to out/

# Lint
npm run lint
```

---

## Project Structure

```
frontend/
├── CLAUDE.md              ← You are here
├── SPEC.md                ← Detailed design spec (layouts, copy, animations)
├── logo.png               ← App logo (source asset)
├── screenshots/           ← Source screenshots (convert to .webp for public/)
│
├── app/
│   ├── layout.tsx         # Root layout — fonts, metadata, body
│   ├── page.tsx           # Landing page — assembles all sections in order
│   └── globals.css        # Tailwind directives + CSS custom properties
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── DeviceConstellation.tsx
│   ├── CrossDeviceDemo.tsx       # THE centerpiece — interactive dual-screen timer
│   ├── PlatformDownload.tsx
│   ├── FeatureGrid.tsx
│   ├── HowItWorks.tsx
│   ├── DisplayShowcase.tsx
│   ├── ComparisonSection.tsx
│   ├── DownloadSection.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── GlowCard.tsx
│       ├── SectionHeading.tsx
│       ├── ScreenshotFrame.tsx
│       ├── DeviceMockup.tsx
│       ├── SectionDivider.tsx
│       ├── FloatingParticles.tsx
│       └── GlowOrb.tsx
│
├── lib/
│   ├── downloads.ts          # Reads env vars, exports typed download config
│   └── detectPlatform.ts     # Client-side OS detection
│
├── public/
│   ├── screenshots/          # Optimized .webp images (converted from screenshots/)
│   └── og-image.png
│
├── .env.local                # Download URLs (git-ignored)
├── .env.example              # Template (committed)
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Environment Variables

All download URLs come from env vars. No hardcoded URLs anywhere.

```env
NEXT_PUBLIC_DOWNLOAD_MAC_DMG=
NEXT_PUBLIC_DOWNLOAD_MAC_INTEL_DMG=
NEXT_PUBLIC_DOWNLOAD_WINDOWS_EXE=
NEXT_PUBLIC_DOWNLOAD_LINUX_APPIMAGE=
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_GITHUB_URL=
```

If a download URL env var is empty or missing, hide that platform's download card entirely. Never show a broken download link.

---

## Screenshot Mapping

Source files live in `screenshots/`. Convert to `.webp` and place in `public/screenshots/`. Use `next/image` for all screenshots.

| Source file | Target name | Used in |
|---|---|---|
| `Admin Control Page.png` | `admin-full.webp` | Hero (device constellation), How It Works step 1, Demo fallback |
| `Admin Panel Live Preview.png` | `admin-preview.webp` | How It Works step 2, Demo fallback |
| `Raw Display.png` | `display-raw.webp` | Device constellation (cropped into phone/tablet/projector), Display Showcase |
| `Display Screen With Notes.png` | `display-with-notes.webp` | How It Works step 3, Demo fallback |
| `Display Screen Getting Closer To End Of Alloted Time.png` | `display-warning.webp` | Display Showcase |
| `Display Screen Getting Closer To End Of Alloted Time 2.png` | `display-critical.webp` | Display Showcase |
| `Display Screen When Time Is Up.png` | `display-expired.webp` | Display Showcase |
| `Connect To Any Device...png` | `network-qr.webp` | How It Works step 4 |
| `Take It An Extra Step...png` | `tunnel-online.webp` | Feature Grid "Go online" card expansion |

Every screenshot has a home. No orphans.

---

## Critical Rules

### Design

1. **100% dark mode. No light mode.** The page background is `#050210`. There is no theme toggle.
2. **Match the app's palette.** Purple-navy gradients, glassmorphism cards, green CTAs. See Design System below.
3. **All screenshots in `ScreenshotFrame` wrappers** — fake browser chrome (traffic light dots, optional URL bar). Dark screenshots on a dark page vanish without this treatment.
4. **Device mockups are pure CSS/SVG.** No image assets for phone/laptop/projector frames.
5. **Fonts via `next/font` only.** No Google Fonts CDN link tags. Inter for body, JetBrains Mono for timer digits in the demo.
6. **`font-variant-numeric: tabular-nums`** on all timer digits. Prevents layout shift during countdown.

### Animation

7. **Global easing: `[0.16, 1, 0.3, 1]`** — fast start, long elegant settle. Use this on every Framer Motion animation unless you have a specific reason not to.
8. **All scroll animations: `once: true`** — never re-trigger. Use `whileInView` with `viewport: { amount: 0.2 }`.
9. **Nothing bounces. Nothing wobbles.** Motion is calm, deliberate, confident.
10. **Mobile: reduce, don't remove.** Fewer particles (15-20 vs 40), shorter slide distances (10px vs 16px), no parallax, no hover glows (use active press `scale(0.98)` instead).

### Functionality

11. **`CrossDeviceDemo` is `'use client'`.** Self-contained state — its own `useState`, its own `setInterval`. Do NOT import from the Electron app code.
12. **The demo must have a "Skip to last 10s" button.** Nobody will wait 3 minutes to see TIME'S UP.
13. **The demo must have an SSG fallback.** Server-render a static side-by-side screenshot layout with caption *"Control from one screen. See it on every other."* — replaced on hydration by the interactive version.
14. **Auto-detect visitor OS** in `PlatformDownload` and `DownloadSection`. Default to showing all platforms if detection fails.
15. **Navbar download button appears only after hero CTA scrolls out of view.** Use Intersection Observer on the hero's download button.
16. **Static export: `output: 'export'`** in `next.config.ts`. No server-side features. This is a static site.

### Performance

17. **Lighthouse 95+ on all four categories.** No excuses.
18. **`FloatingParticles` is pure CSS.** `@keyframes`, `position: fixed`, `pointer-events: none`, `z-index: 0`. No JS, no canvas, no requestAnimationFrame.
19. **All images as `.webp`** via `next/image` with explicit `width`, `height`, `sizes`. Hero screenshot gets `priority`. Everything else is lazy.
20. **Total page weight under 2MB.** Screenshots are the bulk — optimize aggressively (quality 85, resize to 1400px max width).

---

## Design System (quick reference)

Full values in SPEC.md. These are the ones you'll use on every component:

### Colors

```
Page bg:            #050210
Section alt bg:     #0a0618
Card bg:            rgba(255, 255, 255, 0.03)
Card border:        rgba(255, 255, 255, 0.06)
Card hover border:  rgba(255, 255, 255, 0.12)

Text primary:       #f0f0f0
Text secondary:     rgba(255, 255, 255, 0.6)
Text muted:         rgba(255, 255, 255, 0.35)

Purple 500:         #6d28d9
Purple 400:         #7c3aed
Purple 300:         #a78bfa
Purple glow:        rgba(124, 58, 237, 0.4)

CTA green:          #22c55e
CTA green hover:    #16a34a
CTA glow:           0 0 30px rgba(34, 197, 94, 0.3)
```

### Typography

```
Hero:       clamp(40px, 6vw, 80px), w800, tracking -0.035em, lh 1.0
Section:    clamp(28px, 4vw, 48px), w700, tracking -0.02em, lh 1.15
Subheading: clamp(16px, 2vw, 20px), w400, secondary color, lh 1.6
Card title: 18px, w600
Card body:  15px, w400, secondary color, lh 1.6
Labels:     13px, w500, uppercase, tracking 0.05em, muted
Timer demo: clamp(48px, 10vw, 120px), JetBrains Mono, w700, tabular-nums
```

### Spacing

```
Section padding:     120px / 80px / 60px (desktop / tablet / mobile)
Max width:           1200px
Horiz padding:       64px / 48px / 24px
Card padding:        32px / 24px
Card gap:            20px / 16px
```

### Glows (use sparingly)

```css
/* Screenshot */     filter: drop-shadow(0 0 80px rgba(124, 58, 237, 0.3));
/* CTA hover */      box-shadow: 0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.1);
/* Card hover */     border-color: rgba(124, 58, 237, 0.4); box-shadow: 0 0 40px rgba(124, 58, 237, 0.08);
/* Timer digits */   text-shadow: 0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.3);
/* Connection line */box-shadow: 0 0 12px rgba(34, 197, 94, 0.6);
```

---

## Section Order (page.tsx)

```tsx
<Navbar />
<Hero />                    // includes DeviceConstellation
<CrossDeviceDemo />         // interactive dual-screen timer — the centerpiece
<FeatureGrid />             // 6 GlowCards, 3x2
<SectionDivider />
<HowItWorks />              // 4 steps with line-draw animation
<DisplayShowcase />         // 4 phase screenshots, full-bleed
<ComparisonSection />       // 3 cards, center elevated
<UseCasesStrip />           // horizontal pill row
<DownloadSection />         // auto-detect OS + all platforms
<Footer />
<FloatingParticles />       // fixed behind everything, z-0
```

This order is intentional. Don't rearrange sections.

---

## Component Dependency Map

```
page.tsx
├── Navbar (client — scroll observer)
├── Hero
│   └── DeviceConstellation
│       └── DeviceMockup (phone, tablet, laptop, projector)
│   └── PlatformDownload
├── CrossDeviceDemo (client — timer state, intersection observer)
│   └── DeviceMockup (laptop frame, projector frame, phone frame)
├── FeatureGrid
│   └── GlowCard (x6)
│       └── one card has tunnel-online.webp expansion
├── SectionDivider
├── HowItWorks
│   └── ScreenshotFrame (x3) + DeviceMockup (phone, x1)
├── DisplayShowcase
│   └── ScreenshotFrame (x4) with phase-colored GlowOrb behind each
├── ComparisonSection
│   └── GlowCard (x3, center elevated)
├── UseCasesStrip (pills, no cards)
├── DownloadSection
│   └── PlatformDownload (recommended block)
│   └── GlowCard (x4, one per platform)
├── Footer
└── FloatingParticles (fixed, z-0)
```

Build the `ui/` primitives first. Everything else composes from them.

---

## The Product Being Sold

You need to understand what the app does to write components that sell it correctly:

- **The Electron app runs on the coordinator's laptop.** It's the admin panel AND the server.
- **It embeds an Express + WebSocket server** on port 4000 (LAN, no internet).
- **Any device on the same WiFi** opens `http://[laptop-ip]:4000/display` in a browser and sees a live countdown.
- **The timer state machine** runs in Node.js. One source of truth. All displays sync via WebSocket in <10ms.
- **Phase colors:** >50% = green/white, 25-50% = amber, 10-25% = orange, <10% = red/pulsing, 0:00 = TIME'S UP overlay with audio chime.
- **Optional online tunnel** (localtunnel) creates a public HTTPS URL for remote viewers.
- **The display page is vanilla HTML/CSS/JS** — no framework, no bundler. Works in any browser.
- **Platforms:** macOS (Apple Silicon + Intel), Windows (64-bit), Linux (AppImage).
- **Price:** Free. Open source. No account required. No trial. No strings.

The core value proposition is: **it works when the internet doesn't.** Events have unreliable WiFi. This app doesn't care. That's the entire point.

---

## Timer Phase Logic (for CrossDeviceDemo)

The demo timer must replicate these exact phase thresholds:

```ts
function getPhase(percentRemaining: number) {
  if (percentRemaining > 50)  return 'green';    // white digits, green progress bar
  if (percentRemaining > 25)  return 'warning';  // pale yellow digits, amber bar
  if (percentRemaining > 10)  return 'danger';   // orange digits, orange bar
  return 'critical';                              // red digits + pulse animation, red bar
}
// At 0: status = 'expired', show "TIME'S UP" overlay
```

Phase colors for progress bar:
```
green:    linear-gradient(90deg, #059669, #10b981)
warning:  linear-gradient(90deg, #d97706, #f59e0b)
danger:   linear-gradient(90deg, #ea580c, #f97316)
critical: linear-gradient(90deg, #b91c1c, #ef4444)
```

---

## Responsive Breakpoints

```
Desktop:  1024px+
Tablet:   768px – 1023px
Mobile:   < 768px
```

| Component | Desktop | Tablet | Mobile |
|---|---|---|---|
| Navbar | Full links + scroll download pill | Full links | Hamburger overlay |
| Hero | 2 columns, constellation | Stacked | Stacked, laptop + phone only |
| Demo | Side by side | Side by side (narrow) | Stacked + vertical sync line |
| Features | 3x2 | 2x3 | 1x6 |
| How It Works | Horizontal + line | Horizontal | Vertical + vertical line |
| Display Showcase | 4 across | 2x2 | Snap carousel |
| Comparison | 3 cards | 3 cards narrow | Stacked, center highlighted |
| Use Cases | Row centered | Row centered | Horizontal scroll |
| Download | Recommended + 4 cards | Same | Stacked |

---

## Tailwind Config Extensions

```ts
// tailwind.config.ts
{
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#050210',
          800: '#0a0618',
          700: '#2d1b69',
          500: '#6d28d9',
          400: '#7c3aed',
          300: '#a78bfa',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #050210 0%, #0a0618 50%, #0d1a40 100%)',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
    },
  },
}
```

---

## What NOT To Do

1. **Don't fetch data at runtime.** This is a static site. All data comes from env vars at build time.
2. **Don't add a CMS, blog, changelog, or docs section.** One page. Downloads. That's it.
3. **Don't add analytics tracking scripts** unless explicitly asked. Keep the page clean and fast.
4. **Don't import anything from the parent Electron project** (`../electron/`, `../src/`). This is a completely separate codebase.
5. **Don't use `'use client'` on components that don't need it.** Only `CrossDeviceDemo`, `Navbar` (scroll observer), `PlatformDownload` (OS detection), and `FloatingParticles` need client-side JS.
6. **Don't add a light mode toggle.** The page is dark. Period.
7. **Don't add social sharing buttons, newsletter signups, cookie banners, or chat widgets.**
8. **Don't create multiple pages or routes.** Single page, anchor scroll. `page.tsx` is the only route.
9. **Don't put actual emoji characters in the rendered UI.** Use Lucide icons instead. The use case pills in the spec use emoji as placeholders — replace with appropriate Lucide icons.

---

## Build Order

Follow this order. Build each step completely before moving on. Verify on both desktop and mobile.

1. **Scaffold** — `npx create-next-app@latest . --typescript --tailwind --app --src-dir=false`
2. **Layout + globals** — gradient bg, fonts via `next/font`, metadata, CSS custom properties
3. **Convert screenshots** — `.png` → `.webp`, place in `public/screenshots/`
4. **UI primitives** — `GlowCard`, `ScreenshotFrame`, `DeviceMockup`, `SectionHeading`, `SectionDivider`, `Button`, `GlowOrb`
5. **`FloatingParticles`** — set the mood early (pure CSS)
6. **Navbar** — sticky, transparent → blur on scroll, download pill after hero
7. **Hero** — headline, subheadline, CTA, `DeviceConstellation` with connection lines
8. **`CrossDeviceDemo`** — the dual-screen interactive timer. Build early, test thoroughly.
9. **Feature Grid** — 6 `GlowCard`s with tunnel expansion on the Globe card
10. **How It Works** — 4 steps, `pathLength` line-draw animation
11. **Display Showcase** — 4 screenshots with phase-colored glows, mobile carousel
12. **Comparison** — 3 cards, center elevated with purple border
13. **Use Cases strip** — horizontal pills
14. **Download Section** — OS detection, recommended block, all platform cards
15. **Footer**
16. **Polish** — responsive audit, animation timing, performance pass, OG image

---

## Verification Checklist (before shipping)

- [ ] `npm run build` succeeds with zero errors
- [ ] Lighthouse: 95+ Performance, Accessibility, Best Practices, SEO
- [ ] Hero loads in under 1.5s on throttled 3G
- [ ] All screenshots render in `ScreenshotFrame` wrappers with visible chrome
- [ ] CrossDeviceDemo: typing title on admin → appears on display instantly
- [ ] CrossDeviceDemo: "Skip to last 10s" → red phase → TIME'S UP works
- [ ] CrossDeviceDemo: SSG fallback renders without JS (disable JS in browser and reload)
- [ ] Download button detects OS correctly on Mac, Windows, Linux
- [ ] Navbar download pill appears after scrolling past hero
- [ ] All download links work (or cards are hidden if env var is missing)
- [ ] Mobile: hamburger menu opens/closes, all sections readable
- [ ] Mobile: Display Showcase carousel snaps correctly
- [ ] Mobile: no horizontal overflow on any section
- [ ] No console errors in production build
- [ ] OG image renders correctly when URL is shared on Twitter/Slack/LinkedIn
- [ ] `FloatingParticles` visible but subtle, no performance impact
- [ ] All Framer Motion animations fire once on scroll, never re-trigger

---

*Read SPEC.md for detailed layouts, exact copy, animation timing, and wireframes for every section. This file is the rules and guardrails. SPEC.md is the creative direction.*

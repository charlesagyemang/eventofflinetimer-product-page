# Project Context — Offline Event Timer Marketing Site

## What This Is

A Next.js 15 marketing landing page for the **Offline Event Timer** — an Electron desktop app that runs a countdown timer offline and shares it to any screen on the local network via WebSocket. This site's sole purpose is to get visitors to download the app.

- **One page. One goal: download.**
- Deployed to Vercel as a static export
- Zero runtime dependency on the Electron app

---

## Owner

- **Developer:** Charles Agyemang
- **GitHub:** github.com/charlesagyemang
- **Electron app repo:** github.com/charlesagyemang/eventofflinetimer (PRIVATE)
- **This site's repo:** github.com/charlesagyemang/eventofflinetimer-product-page

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

**Do NOT add:** jQuery, Bootstrap, Chakra, MUI, styled-components, Sass, GSAP, Three.js, or any other CSS framework.

---

## Commands

```bash
npm run dev          # localhost:3000
npm run build        # Static export to out/
npm run lint
```

---

## Original Spec

Full design specs live in `docs/CLAUDE.md` and `docs/SPEC.md`. These were the original blueprints. **Not everything matches 1:1 anymore** — see "Changes From Spec" below.

---

## Changes From Original Spec

### Color Palette Redesign
The spec called for a **purple** accent palette (#6d28d9, #7c3aed, #a78bfa). This was changed to a **deep navy + electric cyan** palette because the purple looked too "AI-generated."

Current palette:
```
Page bg:            #07090f   (deep navy, warm undertone)
Section alt bg:     #0c1221   (inky blue)
Footer bg:          #050810

Brand 500:          #0ea5e9   (sky-500, electric cyan)
Brand 400:          #38bdf8   (sky-400)
Brand 300:          #7dd3fc   (sky-300)
Brand glow:         rgba(56, 189, 248, ...) at 0.15-0.25 intensity

CTA green:          #22c55e   (unchanged from spec)
Text primary:       #f1f5f9   (slate-50, warmer than spec's #f0f0f0)
Text secondary:     rgba(226, 232, 240, 0.6)
Text muted:         rgba(226, 232, 240, 0.35)
```

Glows are intentionally 40% less intense than the spec called for — more restrained and professional.

### GitHub URL Removed
The repo is private, so `NEXT_PUBLIC_GITHUB_URL` is empty. The "View on GitHub" button in the hero and all GitHub links in the footer hide automatically when this var is empty.

### Download Hosting — Cloudflare R2
The spec assumed GitHub release URLs. Since the repo is private, downloads are hosted on **Cloudflare R2**.

Bucket: `eventofflinetimer-releases`
Public URL: `https://pub-fb653f2363e94b2ba12c307dd9f89ebb.r2.dev`

Structure:
```
eventofflinetimer-releases/
├── latest/                        ← Event Timer current release
│   ├── Event Timer-1.0.0-arm64.dmg
│   ├── Event Timer-1.0.0.dmg
│   ├── Event Timer Setup 1.0.0.exe
│   └── Event Timer-1.0.0.AppImage
├── v1.0.0/                        ← Event Timer versioned
├── biblesearchai/                 ← SHARED BUCKET — also hosts BibleSearchAI
│   ├── latest/
│   └── v1.0.2/
```

**Important:** This R2 bucket is shared with the BibleSearchAI project. Don't delete the `biblesearchai/` folder.

The r2.dev URL is rate-limited by Cloudflare. If traffic grows, attach a custom domain to the bucket.

### macOS Gatekeeper Note
Added a collapsible troubleshooting section in the Download area (only visible to macOS visitors) explaining the `xattr -cr` fix for the "app is damaged" Gatekeeper error. Includes a one-click copy button.

---

## File Upload Workflow (New Releases)

When releasing a new version:

```bash
# Login if needed
npx wrangler login

# Upload to latest/ (overwrites previous)
npx wrangler r2 object put eventofflinetimer-releases/latest/"FILENAME" --file ./path/to/file --remote

# Also upload to versioned folder
npx wrangler r2 object put eventofflinetimer-releases/vX.Y.Z/"FILENAME" --file ./path/to/file --remote
```

Then update `NEXT_PUBLIC_APP_VERSION` in `.env.local` and redeploy.

If filenames change between versions, also update the download URL env vars. Spaces in filenames must be `%20` encoded in the env vars.

---

## Project Structure

```
├── CLAUDE.md                  ← You are here
├── docs/
│   ├── CLAUDE.md              ← Original build rules (reference only)
│   ├── SPEC.md                ← Original design spec (reference only)
│   ├── logo.png               ← Source logo
│   └── screenshots/           ← Source PNGs (converted to webp)
│
├── app/
│   ├── layout.tsx             # Root layout — Inter + JetBrains Mono, SEO metadata
│   ├── page.tsx               # Assembles all sections in order
│   └── globals.css            # Tailwind 4 theme, CSS particles, utilities
│
├── components/
│   ├── Navbar.tsx             # Sticky, transparent→blur, download pill after hero
│   ├── Hero.tsx               # Two-column: copy left, DeviceConstellation right
│   ├── DeviceConstellation.tsx # Animated laptop + orbiting devices + SVG lines
│   ├── PlatformDownload.tsx   # OS-detect CTA button (used in Hero)
│   ├── CrossDeviceDemo.tsx    # Interactive dual-screen timer — the centerpiece
│   ├── FeatureGrid.tsx        # 6 GlowCards, tunnel expansion on Globe card
│   ├── HowItWorks.tsx         # 4 steps with line-draw animation
│   ├── DisplayShowcase.tsx    # 4 phase screenshots with colored glows
│   ├── ComparisonSection.tsx  # 3 cards, center elevated with RECOMMENDED
│   ├── UseCasesStrip.tsx      # Horizontal pill row
│   ├── DownloadSection.tsx    # OS detection + all platforms + macOS xattr tip
│   ├── Footer.tsx             # Possitech branding
│   └── ui/
│       ├── Button.tsx
│       ├── GlowCard.tsx
│       ├── SectionHeading.tsx
│       ├── ScreenshotFrame.tsx
│       ├── DeviceMockup.tsx   # Phone/tablet/laptop/projector CSS frames
│       ├── SectionDivider.tsx
│       ├── FloatingParticles.tsx  # Pure CSS ambient particles
│       └── GlowOrb.tsx
│
├── lib/
│   ├── downloads.ts           # Typed download config from env vars
│   └── detectPlatform.ts     # Client-side OS detection
│
├── public/
│   ├── logo.png
│   └── screenshots/           # 9 optimized .webp images
│
├── current-builds/            # Local release binaries (gitignored)
├── .env.local                 # Live download URLs (gitignored)
├── .env.example               # Template with R2 URLs
└── next.config.ts             # output: 'export', unoptimized images
```

---

## Section Order (page.tsx)

This order is intentional. Don't rearrange.

```
<Navbar />
<Hero />                    — includes DeviceConstellation + PlatformDownload
<CrossDeviceDemo />         — interactive dual-screen timer
<FeatureGrid />             — 6 GlowCards, 3x2
<SectionDivider />
<HowItWorks />              — 4 steps with line-draw
<DisplayShowcase />         — 4 phase screenshots
<ComparisonSection />       — 3 cards, center elevated
<UseCasesStrip />           — horizontal pill row
<DownloadSection />         — OS detect + all platforms + macOS tip
<Footer />
<FloatingParticles />       — fixed behind everything, z-0
```

---

## Key Design Rules

1. **100% dark mode. No light mode. No toggle.**
2. **Deep navy + cyan palette** — not the purple from the original spec
3. **All screenshots in ScreenshotFrame wrappers** (fake browser chrome)
4. **Device mockups are pure CSS/SVG** — no image assets for frames
5. **Fonts via `next/font` only** — Inter for body, JetBrains Mono for timer digits
6. **`font-variant-numeric: tabular-nums`** on all timer digits
7. **Global easing: `[0.16, 1, 0.3, 1]`** on all Framer Motion animations
8. **All scroll animations: `once: true`** — never re-trigger
9. **Nothing bounces. Nothing wobbles.** Motion is calm, deliberate, confident.
10. **FloatingParticles is pure CSS** — no JS, no canvas
11. **Static export: `output: 'export'`** — no server-side features
12. **No emoji in rendered UI** — use Lucide icons

---

## The Product Being Sold

- Electron app runs on coordinator's laptop — it IS the server
- Embeds Express + WebSocket server on port 4000 (LAN only)
- Any device on same WiFi opens `http://[laptop-ip]:4000/display` and sees live countdown
- Timer phases: >50% green, 25-50% amber, 10-25% orange, <10% red/pulse, 0:00 TIME'S UP
- Optional online tunnel (localtunnel) for remote viewers
- Platforms: macOS (ARM + Intel), Windows, Linux
- Price: Free, open source, no account required
- **Core value prop: it works when the internet doesn't**

---

## Environment Variables

```env
NEXT_PUBLIC_DOWNLOAD_MAC_DMG=         # R2 URL to macOS ARM .dmg
NEXT_PUBLIC_DOWNLOAD_MAC_INTEL_DMG=   # R2 URL to macOS Intel .dmg
NEXT_PUBLIC_DOWNLOAD_WINDOWS_EXE=     # R2 URL to Windows .exe
NEXT_PUBLIC_DOWNLOAD_LINUX_APPIMAGE=  # R2 URL to Linux .AppImage
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_GITHUB_URL=               # Empty = hide GitHub links
```

If any download URL is empty/missing, that platform's card hides automatically.

---

## What's Been Done

- [x] Full site built and functional
- [x] All 11 sections implemented per spec
- [x] Screenshots converted to .webp and placed in public/
- [x] Color palette redesigned (purple → navy/cyan)
- [x] Downloads hosted on Cloudflare R2
- [x] macOS Gatekeeper xattr tip added
- [x] Responsive: desktop, tablet, mobile
- [x] `npm run build` passes with zero errors
- [x] Static export under 2MB
- [x] Pushed to GitHub

## What Could Still Be Done

- [ ] Deploy to Vercel
- [ ] Generate proper OG image (1200x630, brand gradient + screenshot)
- [ ] Lighthouse audit and performance tuning
- [ ] Add custom domain to R2 bucket (removes rate limit)
- [ ] CrossDeviceDemo: auto-start refinement, mobile layout polish
- [ ] Display Showcase: mobile carousel snap tuning
- [ ] Consider code-signing the macOS app to eliminate the xattr step

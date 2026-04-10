# Offline Event Timer — Marketing Site

Next.js product page. One goal: make people download this app before they finish scrolling. Hosted on Vercel.

---

## Visual North Star

This is not a landing page. This is an **experience**. The visitor should feel like they walked into a product keynote — dark stage, spotlights on the product, every scroll reveals something that makes them say "oh, that's sick."

**References for ambition level (not layout):**
- linear.app — cinematic dark UI, scroll-linked reveals
- stripe.com/sessions — animated product demos, glowing effects
- vercel.com/ship — bold type, dramatic entrances, device mockups
- raycast.com — dark product page, interactive demos, silky motion

**The rule:** If a section doesn't make someone want to show their colleague, cut it or redesign it.

100% dark. No light mode. The app is dark. The display is dark. The site is dark. One identity, one mood: professional midnight.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Inter + JetBrains Mono (via `next/font`) |
| Hosting | Vercel |

---

## Environment Variables

Download URLs live in `.env.local` — change in Vercel dashboard, no code push needed.

```env
# .env.local

NEXT_PUBLIC_DOWNLOAD_MAC_DMG=https://github.com/possitech/eventofflinetimer/releases/latest/download/Event-Timer-mac-arm64.dmg
NEXT_PUBLIC_DOWNLOAD_MAC_INTEL_DMG=https://github.com/possitech/eventofflinetimer/releases/latest/download/Event-Timer-mac-x64.dmg
NEXT_PUBLIC_DOWNLOAD_WINDOWS_EXE=https://github.com/possitech/eventofflinetimer/releases/latest/download/Event-Timer-Setup.exe
NEXT_PUBLIC_DOWNLOAD_LINUX_APPIMAGE=https://github.com/possitech/eventofflinetimer/releases/latest/download/Event-Timer.AppImage

NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_GITHUB_URL=https://github.com/possitech/eventofflinetimer
```

All `NEXT_PUBLIC_` — no secrets. If a variable is empty or missing, that platform's download card hides automatically.

---

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── DeviceConstellation.tsx    # Animated laptop + orbiting devices showing same timer
│   ├── CrossDeviceDemo.tsx        # Interactive dual-screen demo (admin + display)
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
│       ├── DeviceMockup.tsx       # Phone / tablet / laptop / projector frames
│       ├── SectionDivider.tsx
│       ├── FloatingParticles.tsx  # Ambient background particles
│       └── GlowOrb.tsx           # Colored radial glow element
│
├── lib/
│   ├── downloads.ts
│   └── detectPlatform.ts
│
├── public/
│   ├── screenshots/
│   │   ├── admin-full.webp
│   │   ├── admin-preview.webp
│   │   ├── display-raw.webp
│   │   ├── display-with-notes.webp
│   │   ├── display-warning.webp
│   │   ├── display-critical.webp
│   │   ├── display-expired.webp
│   │   ├── network-qr.webp
│   │   └── tunnel-online.webp
│   └── og-image.png
│
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Design System

### Palette

```
Backgrounds:
  Page base:           #050210
  Section alt:         #0a0618
  Radial accent:       radial-gradient(ellipse at 50% 0%, rgba(109,40,217,0.15), transparent 70%)

Surfaces:
  Card bg:             rgba(255, 255, 255, 0.03)
  Card bg hover:       rgba(255, 255, 255, 0.06)
  Card border:         rgba(255, 255, 255, 0.06)
  Card border hover:   rgba(255, 255, 255, 0.12)
  Card blur:           backdrop-filter: blur(12px)

Text:
  Primary:             #f0f0f0
  Secondary:           rgba(255, 255, 255, 0.6)
  Muted:               rgba(255, 255, 255, 0.35)

Brand:
  Purple 500:          #6d28d9
  Purple 400:          #7c3aed
  Purple 300:          #a78bfa
  Purple glow:         rgba(124, 58, 237, 0.4)

Actions:
  CTA green:           #22c55e
  CTA green hover:     #16a34a
  CTA glow:            0 0 30px rgba(34, 197, 94, 0.3)

Status:
  Success:             #10b981
  Warning:             #f59e0b
  Danger:              #ef4444
```

### Typography Scale

```
Hero headline:         clamp(40px, 6vw, 80px), weight 800, tracking -0.035em, line-height 1.0
Section heading:       clamp(28px, 4vw, 48px), weight 700, tracking -0.02em, line-height 1.15
Section subheading:    clamp(16px, 2vw, 20px), weight 400, color: text-secondary, line-height 1.6
Card title:            18px, weight 600
Card body:             15px, weight 400, color: text-secondary, line-height 1.6
Small / labels:        13px, weight 500, uppercase, tracking 0.05em, color: text-muted
Button text:           15px, weight 600
Timer digits (demo):   clamp(48px, 10vw, 120px), JetBrains Mono, weight 700, tabular-nums
Mono (URLs):           14px, 'SF Mono', 'Fira Code', monospace
```

### Spacing Rhythm

```
Section padding:        120px vertical (desktop) / 80px (tablet) / 60px (mobile)
Content max-width:      1200px, centered
Content horiz padding:  24px (mobile) / 48px (tablet) / 64px (desktop)
Card padding:           32px (desktop) / 24px (mobile)
Card gap (grid):        20px (desktop) / 16px (mobile)
```

### Glow Effects

```css
.screenshot-glow      { filter: drop-shadow(0 0 80px rgba(124, 58, 237, 0.3)); }
.cta-glow:hover       { box-shadow: 0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.1); }
.card-glow:hover      { border-color: rgba(124, 58, 237, 0.4); box-shadow: 0 0 40px rgba(124, 58, 237, 0.08); }
.timer-digit-glow     { text-shadow: 0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.3); }
.connection-line-glow { box-shadow: 0 0 12px rgba(34, 197, 94, 0.6); }
```

---

## Ambient Background Layer

The entire page has a `FloatingParticles` component fixed behind all content. This is what separates "nice dark page" from "cinematic."

**What it is:** 30-40 tiny dots (2-4px), very low opacity (0.08-0.15), drifting slowly upward at different speeds. Some are white, some are faint purple. They move on a continuous CSS animation — no JS physics needed. Each particle has a slightly different `animation-duration` (20-40s) and `animation-delay` (randomized).

**Performance:** Pure CSS (`@keyframes float`), no JS, no canvas. Use `will-change: transform` and `contain: strict`. Particles are `position: fixed`, `pointer-events: none`, behind all content (`z-index: 0`).

**On mobile:** Reduce to 15-20 particles. Performance matters more than vibes on mobile.

This layer runs the full height of the page. It's extremely subtle — the visitor shouldn't consciously notice it, but they should feel the page is alive.

---

## Screenshot Presentation

### `ScreenshotFrame` Component

Every screenshot gets fake browser chrome:

```
┌─────────────────────────────────────────┐
│  ● ● ●                    ┌────────┐   │
│                            │  URL   │   │
├─────────────────────────────────────────┤
│                                         │
│          [screenshot image]             │
│                                         │
└─────────────────────────────────────────┘
```

- Title bar: `rgba(255,255,255,0.05)`, 40px
- Traffic light dots: muted red/yellow/green
- Optional URL bar text
- Border: `1px solid rgba(255,255,255,0.08)`
- Outer radius: 12px
- Shadow: `0 20px 60px rgba(0,0,0,0.5)`
- Behind frame: soft radial glow in the screenshot's dominant color

### `DeviceMockup` Component

For phone/tablet/projector mockups used in the device constellation:

```
Phone:      Rounded rect (20px radius), notch at top, thin bezel
Tablet:     Rounded rect (16px radius), slightly thicker bezel
Laptop:     Screen + base/hinge, keyboard area as dark trapezoid
Projector:  Simple wide rect with slight rounded corners, "screen" label
```

All mockups: dark frame (`rgba(255,255,255,0.1)` border), transparent body, the screenshot/live content sits inside the screen area. Built with pure CSS/SVG — no images for the frames.

---

## Animation Choreography

### Philosophy

Calm, deliberate, confident. Nothing bounces. Nothing wobbles. Things arrive smoothly and settle with authority. The page feels like it knows exactly what it's doing.

Global easing: `[0.16, 1, 0.3, 1]` (custom bezier — fast start, long elegant settle. This is the "premium" curve used by Linear and Stripe.)

### Hero Entrance (page load)

Staggered over 1.4s:
1. `0ms` — Background radial glow fades in (400ms)
2. `100ms` — Tagline badge fades in + slides up 12px (250ms)
3. `250ms` — Headline fades in + slides up 20px (500ms). Each word can optionally stagger by 50ms for extra drama.
4. `500ms` — Subheadline fades in + slides up 12px (350ms)
5. `700ms` — Download buttons fade in + slides up 12px (300ms)
6. `500ms` — Hero device constellation fades in + slides in from right 60px (700ms)
7. `1200ms` — Floating particles begin drifting (they start invisible and fade in over 2s)

### Scroll Animations

All use Framer Motion `whileInView`, `once: true`, `viewport: { amount: 0.2 }`:

- **Section headings**: Fade + slide up 24px, 500ms
- **Cards**: Stagger 100ms each, fade + slide up 16px, 400ms each
- **Screenshots**: Fade + scale 0.92→1.0, 600ms
- **Device mockups**: Fade + slide from their orbital position, 500ms with stagger
- **Connection lines (device constellation)**: Draw with `pathLength` 0→1, 800ms, delayed until devices are in place
- **Live demo timer**: Counter starts ticking the moment it enters viewport
- **Stats/numbers**: Count up from 0 to target value over 1.5s (e.g., "< 10ms" counts from 0 to 10)

### Hover & Micro-interactions

- **Cards**: Border brightens, scale(1.02), glow appears, 200ms
- **CTA buttons**: Glow intensifies, translateY(-2px), scale(1.01), 150ms
- **Download platform cards**: The platform icon subtly rotates 5deg, 200ms
- **Screenshots in frames**: scale(1.015), shadow deepens, 300ms
- **Nav links**: Glowing underline draws from left, 200ms
- **Live demo buttons**: Ripple effect on click (expanding circle from click point, 300ms, purple tint)

### Parallax

Three effects, all subtle:
1. Hero device constellation: 0.85x scroll speed (slight lag creates depth)
2. Floating particles: 0.7x scroll speed (they feel far away)
3. Display Showcase screenshots: slight horizontal drift, 2% translateX based on scroll position

### Mobile Animations

Reduce but don't remove:
- Hero: same entrance but no parallax, no perspective transform on screenshot
- Cards: stagger reduced to 60ms, slide distance reduced to 10px
- No hover glow effects (no hover on touch). Instead: active press state scales to 0.98
- Particles: reduced count, slower drift
- Device constellation: simplified to vertical stack with connection lines

---

## Page Sections

### 1. Navbar

```
[Timer Icon] Offline Event Timer          Features   How It Works   Download
```

**Fixed, z-50, full width.**

**States:**
- **At top (hero visible):** Fully transparent, no border, no blur
- **Past hero:** `bg-[#050210]/80 backdrop-blur-xl border-b border-white/5` — fades in over 300ms
- **Past hero — Download button appears:** A small green "Download" pill fades into the right side of the navbar. This only appears once the hero's download button has scrolled out of view. Uses Intersection Observer on the hero CTA to trigger.

**Active section:** The current section's nav link gets a subtle purple underline (detected via Intersection Observer on each section).

**Mobile (< 768px):** Logo + hamburger. Hamburger opens a full-screen overlay with centered nav links, large touch targets (48px min), backdrop blur. Close button top-right. Overlay slides down from top, 300ms.

---

### 2. Hero

The hero has one job: "I need this" in under 5 seconds.

**Layout (desktop):**

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│           radial purple glow (top center, 80% width ellipse)         │
│                                                                      │
│  ┌── Left (50%) ───────────────┐  ┌── Right (50%) ────────────────┐ │
│  │                              │  │                                │ │
│  │  ┌────────────────────┐      │  │                                │ │
│  │  │ ⚡ No internet      │      │  │    ┌─ LAPTOP MOCKUP ────────┐ │ │
│  │  │   required          │      │  │    │  [admin-full.webp]     │ │ │
│  │  └────────────────────┘      │  │    │  in laptop frame       │ │ │
│  │                              │  │    └────────────────────────┘ │ │
│  │  The event timer             │  │         ╱          ╲          │ │
│  │  that never                  │  │   ┌────┐    ┌────┐  ┌──────┐ │ │
│  │  drops out.                  │  │   │📱  │    │📱  │  │ 🖥️   │ │ │
│  │                              │  │   │same│    │same│  │same  │ │ │
│  │  Professional countdown      │  │   │time│    │time│  │time  │ │ │
│  │  that runs on your laptop    │  │   └────┘    └────┘  └──────┘ │ │
│  │  and shares to every screen  │  │   phone     tablet  projector │ │
│  │  in the room. No internet.   │  │                                │ │
│  │  No accounts. No cost.       │  │   glowing connection lines     │ │
│  │                              │  │   from laptop to each device   │ │
│  │  [ ▶ Download for macOS ]    │  │                                │ │
│  │  [   View on GitHub     ]    │  │                                │ │
│  │                              │  │                                │ │
│  │  Also for Windows & Linux    │  │                                │ │
│  │  v1.0.0 · Free · Open source│  │                                │ │
│  └──────────────────────────────┘  └────────────────────────────────┘ │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**The Device Constellation (right column):**

This is not a static screenshot. It's an animated composition:

- **Center:** Laptop mockup (CSS frame) containing the `admin-full.webp` screenshot
- **Below/around it:** Three smaller device mockups — a phone, a tablet, and a projector screen — each showing a **cropped version of `display-raw.webp`** fitted to their screen area
- **Connection lines:** Thin glowing green lines (`1px`, `rgba(34,197,94,0.4)` with `box-shadow: 0 0 8px rgba(34,197,94,0.3)`) drawn from the laptop to each device using SVG `<line>` elements
- **Animation:** On load, the laptop appears first (fade + slide), then the connection lines draw themselves outward (pathLength animation, 600ms each, staggered by 200ms), then the devices fade in at the end of each line
- **All devices show the same time.** This is the visual thesis of the entire product.
- **Subtle float:** The phone and tablet have a very slow breathing float (3px translateY, 4-5s cycle, different phases). The laptop stays still — it's the anchor.

**Mobile hero:** Single column. Headline → subheadline → download button → device constellation below (simplified: laptop + one phone, vertically stacked, connection line between them).

**Background layers:**
1. `#050210` solid base
2. `radial-gradient(ellipse 80% 60% at 50% -20%, rgba(109,40,217,0.25), transparent)` — purple glow from top
3. `radial-gradient(ellipse 50% 40% at 80% 50%, rgba(34,197,94,0.06), transparent)` — very faint green tint on the right where the devices are (ties the green connection lines to the background)
4. Floating particles layer (behind content)

**Copy:**

Tagline badge:
> ⚡ No internet required

Headline:
> The event timer that never drops out.

Subheadline:
> Professional countdown timer that runs entirely on your laptop and shares a live display to every screen in the room. No internet. No accounts. No cost.

CTA:
> ▶ Download for macOS (Apple Silicon)

Ghost CTA:
> View on GitHub

Below:
> Also available for Windows and Linux · v1.0.0 · Free and open source

---

### 3. Cross-Device Demo (the section that sells it)

This is the centerpiece of the page. Not a screenshot carousel. Not a video. A **live, interactive, dual-screen demo** that proves the core product promise: control from one screen, see on another.

**Section heading:**
> Control from here. See it everywhere.

**Section subheading:**
> This is a real timer. Start it from the admin panel on the left. Watch it update on the display on the right — the same way it works on every screen at your event.

**Layout (desktop):**

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌── ADMIN MINI (45%) ─────────────┐  ┌── DISPLAY MINI (55%) ─────┐ │
│  │                                  │  │                            │ │
│  │  ┌─ Laptop frame ─────────────┐  │  │  ┌─ Projector frame ────┐ │ │
│  │  │                            │  │  │  │                      │ │ │
│  │  │  Event Title               │  │  │  │                      │ │ │
│  │  │  [ Opening Keynote    ]    │  │  │  │     02:47            │ │ │
│  │  │                            │  │  │  │                      │ │ │
│  │  │  Speaker                   │  │  │  │  ██████████░░░░░░░  │ │ │
│  │  │  [ Dr. Sarah Chen     ]    │  │  │  │                      │ │ │
│  │  │                            │  │  │  │  Opening Keynote     │ │ │
│  │  │  ┌──────┐ ┌──────┐        │  │  │  │  — Dr. Sarah Chen    │ │ │
│  │  │  │▶Start│ │Reset │        │  │  │  │                      │ │ │
│  │  │  └──────┘ └──────┘        │  │  │  └──────────────────────┘ │ │
│  │  │                            │  │  │                            │ │
│  │  │  Duration: [3:00 ▼]        │  │  │  ┌── Phone mockup ──────┐ │ │
│  │  │                            │  │  │  │  Same timer, same    │ │ │
│  │  │  [ Skip to last 10s ⏩ ]   │  │  │  │  time, phone-sized   │ │ │
│  │  └────────────────────────────┘  │  │  └──────────────────────┘ │ │
│  │                                  │  │                            │ │
│  │  Your control panel.             │  │  What your audience sees.  │ │
│  └──────────────────────────────────┘  └────────────────────────────┘ │
│                                                                      │
│                 ● LIVE  — Both screens share the same state          │
│                                                                      │
│       Imagine this on a projector at the back of a 500-person room.  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**How it works:**

Both the admin mini-panel and the display mini-panel share the same React state. When the visitor types an event title in the admin, it appears on the display instantly. When they click Start, the display starts counting down. When they click Pause, both freeze. This is the product's core promise demonstrated live.

**Admin mini-panel (left, inside laptop frame):**
- Text input: Event Title (pre-filled with "Opening Keynote")
- Text input: Speaker Name (pre-filled with "Dr. Sarah Chen")
- Buttons: Start (green), Pause (amber, appears when running), Reset (red outline)
- Duration dropdown or preset buttons: 1:00, 3:00, 5:00
- **"Skip to last 10s" button** — jumps `remainingSeconds` to 10. This is how the visitor experiences the red phase and TIME'S UP without waiting 3 minutes. Crucial for the demo.
- Styled like the real admin but simplified — only the essential controls

**Display mini-panel (right, inside projector frame):**
- Matches the real display page exactly: JetBrains Mono digits with glow, progress bar with phase colors, event title, speaker name
- Green LIVE badge centered below timer
- Phase transitions: green → amber → red → critical pulse → TIME'S UP overlay
- When expired: the red overlay with "TIME'S UP" text, exactly like the real app

**Below both panels:** A green "LIVE" badge with a pulsing dot and the text "Both screens share the same state." This reinforces that the magic is the synchronization.

**The kicker line** (muted italic, centered, below everything):
> Imagine this on a projector at the back of a 500-person room.

**A small secondary line below that:**
> Now imagine controlling it from the sound booth, your phone, or your seat.

**Mobile layout:** Stack vertically — admin panel on top (simplified further: just Start/Pause/Reset + Skip to 10s), display below. A pulsing green line connects them vertically with a "SYNCED" label.

**Auto-start behavior:**
- When the section scrolls into view (Intersection Observer, `amount: 0.3`), the timer auto-starts from 3:00
- A subtle "Try it — tap the controls" prompt fades in briefly (2s) then fades out, so fast scrollers know it's interactive
- If the visitor has already interacted (clicked any button), the prompt doesn't show

**Phone mockup on the right:** Below the projector frame, a small phone mockup shows the same timer at the same time. This drives home the "any screen" message without saying a word.

**SSG / no-JS fallback:** The demo is 100% client-side (`'use client'`). For SSG and visitors with JS disabled or slow connections, render a static fallback inside a `<noscript>` block and as the initial server-rendered content (replaced on hydration). The fallback is a side-by-side layout showing `admin-preview.webp` in a laptop frame and `display-with-notes.webp` in a projector frame, with a centered caption: *"Control from one screen. See it on every other."* This ensures the most important section on the page is never an empty box.

---

### 4. Feature Grid

Six cards, 3x2 grid.

**Section heading:**
> Built for the moments that matter most.

**Section subheading:**
> When a speaker has 5 minutes left, that information needs to be there. Always. On every screen. Without question.

**Cards (GlowCard with hover glow):**

| Icon (Lucide) | Title | Body |
|---|---|---|
| `WifiOff` | Offline-first | Your laptop is the server. No internet needed to run, share, or sync. The room's router is the only infrastructure required. |
| `Radio` | Under 10ms sync | Every display updates in under 10 milliseconds. Direct WebSocket — no cloud relay, no polling, no lag. |
| `Monitor` | Any screen, any device | Projectors, TVs, phones, tablets, second laptops. If it has a browser, it's a display. No app to install. |
| `Palette` | Designed for distance | Huge glowing digits readable from 20 meters. Color phases shift from green to red as time runs out. Unmissable. |
| `SlidersHorizontal` | Total control | Presets from 1 minute to 3 hours. Custom durations. Add or subtract time mid-session. Start, pause, reset. |
| `Globe` | Go online (when you want) | One click creates a public HTTPS link for remote viewers. No account. No setup. Off by default — your timer, your choice. |

**"Go online" card expansion:** This card has a special interaction. On hover (desktop) or tap (mobile), a mini-screenshot of the tunnel panel (`tunnel-online.webp`) slides down below the card body with a fade + slideY(10px) entrance (200ms). It shows the tunnel URL, QR code, and "Stop Tunnel" button — proof that the feature exists and is dead simple. The image sits inside a small `ScreenshotFrame` (no URL bar, compact). On mouse leave / second tap, it slides back up and fades out. This is the only place `tunnel-online.webp` is used.

**Animation:** Cards stagger in by 100ms on scroll. Each card: fade + slide up 16px, 400ms. On hover: border brightens to purple, subtle scale(1.02), faint glow.

**Divider after this section:** Gradient line — transparent → `rgba(124,58,237,0.3)` → transparent. 1px, 60% width, centered.

---

### 5. How It Works

Three steps with a fourth bonus step. Clean, visual, connected.

**Section heading:**
> Up and running in 30 seconds.

**Layout:**

```
    ①───────────────────②───────────────────③───────────────────④
    
  Open the app        Set your timer      Share the link       Scan & go
    
  Download and        Enter event title,  The app shows a      Any phone can
  double-click.       speaker, duration.  LAN URL. Open it     scan the QR code
  No accounts.        Hit Start.          on any screen in     and see the
  No sign-up.                             the room.            countdown live.
  No config.          That's the whole                         No app needed.
                      workflow.           

  [laptop mockup      [admin-preview      [display-with-notes  [network-qr
   with admin]         in frame]           in projector frame]  screenshot
                                           + green glow         in phone frame]
```

**Step 4** replaces the old standalone Network section — the QR code / sharing functionality is shown here as a natural part of the workflow instead of a separate section. The `network-qr.webp` screenshot sits inside a phone mockup frame.

**Connecting line:** SVG line between the step numbers. On scroll, the line draws itself left-to-right (Framer Motion `pathLength`), and each number lights up (opacity 0.3 → 1.0, color from muted to purple) as the line reaches it. The line takes 1.2s total, staggered so step 1 lights at 0ms, step 2 at 300ms, step 3 at 600ms, step 4 at 900ms.

**Mobile:** Vertical stack. Line becomes vertical. Each step fades in + slides up on scroll. Screenshots stack below their text.

---

### 6. Display Showcase (full-bleed)

Full-width section. The product's visual showpiece.

**Section heading:**
> See what your audience sees.

**Section subheading:**
> The display adapts as time runs out — calm green when there's plenty of time, urgent red when there isn't.

**Layout:** Four large screenshots, each in a `ScreenshotFrame`, in a horizontal row. Between the heading and the screenshots, a phase indicator bar:

```
  ● Plenty of time       ● Getting close        ● Almost there       ● Time's up
    above 50%              25 – 50%               under 10%            0:00
    
  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
  │               │    │               │    │               │    │               │
  │    29:48      │    │    01:16      │    │    00:03      │    │   TIME'S UP   │
  │    green      │    │    red glow   │    │   critical    │    │   red overlay │
  │    white      │    │    pink       │    │   pulsing     │    │   + 00:00     │
  │    digits     │    │    digits     │    │   red digits  │    │               │
  │               │    │               │    │               │    │               │
  └───────────────┘    └───────────────┘    └───────────────┘    └───────────────┘
  
  ← green glow →       ← amber glow →       ← red glow →        ← intense red →
```

**Glow behind each frame** matches the phase:
- Raw (green): `rgba(16, 185, 129, 0.15)`, 100px spread
- Warning (amber): `rgba(245, 158, 11, 0.15)`, 100px spread
- Critical (red): `rgba(239, 68, 68, 0.15)`, 100px spread
- Expired: `rgba(239, 68, 68, 0.25)`, 120px spread (more intense)

**Phase dots** in the indicator bar use the same colors as the glows. Each dot has a subtle pulsing glow animation matching the timer's critical phase pulse.

**Scroll animation:** Screenshots enter with staggered fade + scale(0.92→1.0), 150ms apart. The phase dots animate their glow sequentially as the screenshots appear.

**Mobile:** Horizontal scroll carousel with CSS `scroll-snap-type: x mandatory`. Each screenshot snaps to center. Swipe indicators (subtle dots below). The phase indicator becomes vertical text alongside each screenshot.

---

### 7. Comparison Section

Not a table. Visual comparison cards with a clear winner.

**Section heading:**
> Why not just use a phone timer?

**Section subheading:**
> Because a phone timer can't do any of this.

**Layout:**

```
  ┌─────────────────┐    ┌═══════════════════════┐    ┌─────────────────┐
  │   Phone Timer   │    ║     This App          ║    │   Web Timers    │
  │                 │    ║     ★ RECOMMENDED     ║    │                 │
  │  ✗ Can't share  │    ║                       ║    │  ✗ Needs        │
  │    to projector │    ║  ✓ Works offline      ║    │    internet     │
  │  ✗ Tiny screen  │    ║  ✓ Any screen on LAN  ║    │  ✗ 100-500ms   │
  │  ✗ No event     │    ║  ✓ < 10ms latency    ║    │    latency      │
  │    details      │    ║  ✓ Reads at 20m      ║    │  ✗ Account      │
  │  ✗ No multi-    │    ║  ✓ Event title +     ║    │    required     │
  │    screen sync  │    ║    speaker name       ║    │  ⚠ May cost $  │
  │  ✗ No color     │    ║  ✓ Multi-screen sync ║    │  ⚠ Unreliable  │
  │    phases       │    ║  ✓ Phase colors      ║    │    at events    │
  │                 │    ║  ✓ Audio chime       ║    │                 │
  │  Free           │    ║  ✓ QR code sharing   ║    │  Free – $$$    │
  │                 │    ║  ✓ Free forever      ║    │                 │
  │                 │    ║  ✓ No account needed ║    │                 │
  │                 │    ║                       ║    │                 │
  └─────────────────┘    ╚═══════════════════════╝    └─────────────────┘
                              ↑ elevated -12px
                              purple border + glow
                              "RECOMMENDED" badge
```

**Center card:** `translateY(-12px)`, `border: 1px solid var(--purple-500)`, purple glow, slightly wider. "RECOMMENDED" badge at top: pill shape, green bg, white text.

**Side cards:** Standard `GlowCard`, muted. Checkmarks green, crosses `rgba(255,255,255,0.25)` (not red — keep side cards visually quiet), warnings amber.

**Mobile:** Stack vertically. Center card still elevated and highlighted. Side cards get a muted top border to separate them.

---

### 8. Use Cases Strip

Not a full section. A compact strip between Comparison and Download. Event types in a single row with horizontal scroll on mobile.

**Copy (centered above the strip):**
> Trusted at conferences, churches, hackathons, graduations, corporate workshops, and performances worldwide.

**Layout:** Six small pills/chips in a horizontal row, centered. Each pill: icon + event type. No cards. No descriptions. Let the list speak through variety.

```
  [🎤 Conferences]  [⛪ Church Services]  [🏢 Corporate]  [🎓 Graduations]  [💻 Hackathons]  [🎭 Performances]
```

**Styling:** Each pill: `rgba(255,255,255,0.04)` bg, `1px solid rgba(255,255,255,0.08)` border, `border-radius: 9999px`, `padding: 8px 20px`, `font-size: 14px`, `color: text-secondary`. No hover effect. These are visual, not interactive.

**Mobile:** Horizontal scroll with no scrollbar (`scrollbar-width: none`). Slight fade-out gradient on left/right edges to indicate scrollability.

This replaces the full Use Cases section. It communicates the same breadth in 1/10th the space.

---

### 9. Download Section (anchor: `#download`)

The close. Clear, confident, impossible to miss.

**Section heading:**
> Ready to run your next event like a professional?

**Section subheading:**
> Download free. No account. No trial. No strings.

**Layout:**

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   ┌────────────────────────────────────────────────────────────┐     │
│   │                                                            │     │
│   │   [Platform Icon]                                          │     │
│   │                                                            │     │
│   │   Recommended for your system:                             │     │
│   │                                                            │     │
│   │   ┌─────────────────────────────────────────────────┐      │     │
│   │   │  ▶ Download for macOS (Apple Silicon)           │      │     │
│   │   │    .dmg · v1.0.0                                │      │     │
│   │   └─────────────────────────────────────────────────┘      │     │
│   │                                                            │     │
│   │   Looking for macOS Intel? ←                               │     │
│   │                                                            │     │
│   └────────────────────────────────────────────────────────────┘     │
│                                                                      │
│   All platforms:                                                     │
│                                                                      │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────┐ │
│   │ macOS        │  │ macOS        │  │ Windows      │  │ Linux   │ │
│   │ Apple Silicon│  │ Intel (x64)  │  │ 64-bit       │  │ x64     │ │
│   │ .dmg         │  │ .dmg         │  │ .exe         │  │.AppImage│ │
│   │ [Download]   │  │ [Download]   │  │ [Download]   │  │[Downld] │ │
│   └──────────────┘  └──────────────┘  └──────────────┘  └─────────┘ │
│                                                                      │
│   v1.0.0 · Free and open source · No account required                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Recommended block:**
- Auto-detects visitor OS via `detectPlatform()`
- Highlighted card with green CTA button (full `cta-glow` on hover)
- If macOS: defaults to Apple Silicon, "Looking for Intel?" text link scrolls to the Intel card below
- If unknown OS: hides the recommended block, shows all platforms equally

**Platform cards:**
- `GlowCard` style
- Detected platform's card gets a subtle purple border
- Cards with no env var URL are hidden entirely
- Download buttons: solid green, smaller than the recommended CTA
- Platform icon subtly rotates on hover (5deg, 200ms)

---

### 10. Footer

```
──────────── gradient divider ────────────

[Timer Icon]  Offline Event Timer

Built by Possitech
"Offline-first is not a feature. It is the founding principle."

GitHub · Releases · Report an Issue

© 2025 Possitech. Free and open source.
```

- Darkest background: `#030108`
- Quote in italic, secondary color
- Links in muted, underline on hover
- 64px vertical padding
- The gradient divider above: same style as section dividers but slightly more prominent

---

## Key Utilities

### `lib/downloads.ts`

```ts
export type Platform = 'mac-arm64' | 'mac-x64' | 'windows' | 'linux';

export interface DownloadOption {
  platform: Platform;
  label: string;
  arch: string;
  format: string;
  url: string | undefined;
  icon: string;
}

export const downloads: DownloadOption[] = [
  { platform: 'mac-arm64', label: 'macOS', arch: 'Apple Silicon', format: '.dmg',
    url: process.env.NEXT_PUBLIC_DOWNLOAD_MAC_DMG, icon: 'Apple' },
  { platform: 'mac-x64', label: 'macOS', arch: 'Intel', format: '.dmg',
    url: process.env.NEXT_PUBLIC_DOWNLOAD_MAC_INTEL_DMG, icon: 'Apple' },
  { platform: 'windows', label: 'Windows', arch: '64-bit', format: '.exe',
    url: process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_EXE, icon: 'Monitor' },
  { platform: 'linux', label: 'Linux', arch: 'x64', format: '.AppImage',
    url: process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_APPIMAGE, icon: 'Terminal' },
];

export const availableDownloads = downloads.filter(d => d.url);
```

### `lib/detectPlatform.ts`

```ts
import type { Platform } from './downloads';

export function detectPlatform(): Platform | null {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent.toLowerCase();
  const p = (navigator.platform ?? '').toLowerCase();
  if (ua.includes('mac') || p.includes('mac')) return 'mac-arm64';
  if (ua.includes('win') || p.includes('win')) return 'windows';
  if (ua.includes('linux') || p.includes('linux')) return 'linux';
  return null;
}
```

---

## Responsive Summary

| | Desktop (1024+) | Tablet (768-1023) | Mobile (<768) |
|---|---|---|---|
| Navbar | Full links + scroll-triggered download pill | Full links | Hamburger → overlay |
| Hero | Two columns, device constellation | Stacked, simplified constellation | Stacked, laptop + phone only |
| Cross-Device Demo | Side by side (admin + display) | Side by side (narrower) | Stacked (admin top, display below, green sync line) |
| Features | 3x2 grid | 2x3 grid | 1x6 stack |
| How It Works | Horizontal 4 steps + line | Horizontal 4 steps | Vertical stack + vertical line |
| Display Showcase | 4 across | 2x2 grid | Horizontal snap carousel |
| Comparison | 3 cards, center elevated | 3 cards, narrower | Vertical stack, center highlighted |
| Use Cases | Single row centered | Single row centered | Horizontal scroll |
| Download | Recommended + 4 cards | Same | Recommended + stacked |
| Particles | 30-40 particles | 25 particles | 15-20 particles |

---

## Performance

- Lighthouse: 95+ all categories
- Images: `.webp` via `next/image`, explicit dimensions, lazy below fold, priority on hero
- Fonts: Inter + JetBrains Mono via `next/font` — zero CLS
- Framer Motion: `once: true` on all scroll triggers, tree-shake unused
- Particles: pure CSS `@keyframes`, no JS, `will-change: transform`
- Static export: `output: 'export'` in `next.config.ts`
- Total page weight: under 2MB
- Device mockups: pure CSS/SVG — no image assets for frames

---

## SEO & Metadata

```ts
export const metadata: Metadata = {
  title: 'Offline Event Timer — Professional Countdown for Live Events',
  description:
    'Free desktop app that runs a countdown timer offline and shares it to any screen on your network. No internet. No accounts. Mac, Windows, Linux.',
  keywords: [
    'event timer', 'countdown timer', 'offline timer', 'conference timer',
    'presentation timer', 'event countdown', 'LAN timer', 'projector timer',
    'church timer', 'hackathon timer', 'speaker timer',
  ],
  openGraph: {
    title: 'Offline Event Timer — The event timer that never drops out',
    description: 'Professional countdown. Works offline. Shares to any screen.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};
```

---

## Asset Checklist

| Source (screenshots/) | Target (public/screenshots/) | Notes |
|---|---|---|
| Admin Control Page.png | admin-full.webp | Resize 1400w, quality 85 |
| Admin Panel Live Preview.png | admin-preview.webp | Crop tight, quality 85 |
| Raw Display.png | display-raw.webp | Quality 90 (hero/demo usage) |
| Display Screen With Notes.png | display-with-notes.webp | Quality 85 |
| Display Screen Getting Closer...png | display-warning.webp | Quality 85 |
| Display Screen Getting Closer 2...png | display-critical.webp | Quality 85 |
| Display Screen When Time Is Up.png | display-expired.webp | Quality 85 |
| Connect To Any Device...png | network-qr.webp | Crop tight, quality 85 |
| Take It An Extra Step...png | tunnel-online.webp | Quality 85 |

```bash
for f in screenshots/*.png; do
  cwebp -q 85 -resize 1400 0 "$f" -o "public/screenshots/$(basename "${f%.png}.webp")"
done
```

Generate OG image: 1200x630 canvas, brand gradient bg, `display-raw.webp` composited center, "Offline Event Timer" overlay text.

---

## Build Order

1. Scaffold Next.js project inside `frontend/`
2. Layout + globals — gradient bg, fonts, metadata, CSS custom properties
3. `FloatingParticles` — ambient background (set the mood early)
4. `GlowCard`, `ScreenshotFrame`, `DeviceMockup`, `SectionHeading`, `SectionDivider`
5. Navbar — sticky + scroll-triggered download button
6. Hero — headline, CTA, device constellation with connection lines
7. **Cross-Device Demo** — dual-screen interactive timer (build this early — it's the centerpiece)
8. Feature Grid — 6 GlowCards
9. How It Works — 4 steps, line-draw animation
10. Display Showcase — 4 phases with colored glows
11. Comparison — 3 cards, center elevated
12. Use Cases strip
13. Download Section — auto-detect + all platforms
14. Footer
15. Polish — responsive audit, animation timing, mobile carousel, performance

---

*A frontend dev should be able to build this without asking a single design question. Every section has layout, copy, behavior, animation, mobile treatment, and exact design values. Ship it.*

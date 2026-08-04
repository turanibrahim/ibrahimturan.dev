---
name: ibrahimturan.dev
description: Frontend engineer portfolio — Instrument Panel
colors:
  base-100: "oklch(20% 0.015 261.24)"
  base-200: "oklch(18% 0.012 261.24)"
  base-300: "oklch(24% 0.018 261.24)"
  base-content: "oklch(90% 0.01 261.24)"
  primary: "oklch(70% 0.16 155)"
  primary-content: "oklch(17% 0.015 261.24)"
  secondary: "oklch(75% 0.12 185)"
  secondary-content: "oklch(17% 0.015 261.24)"
  accent: "oklch(75% 0.14 135)"
  accent-content: "oklch(17% 0.015 261.24)"
  neutral: "oklch(85% 0.015 261.24)"
  neutral-content: "oklch(20% 0.015 261.24)"
  info: "oklch(78.34% 0.113 231.24)"
  info-content: "oklch(17% 0.015 261.24)"
  success: "oklch(78.34% 0.113 141.24)"
  success-content: "oklch(17% 0.015 261.24)"
  warning: "oklch(78.34% 0.113 81.24)"
  warning-content: "oklch(17% 0.015 261.24)"
  error: "oklch(78.34% 0.113 31.24)"
  error-content: "oklch(17% 0.015 261.24)"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.02em"
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0"
  sm: "0.25rem"
  md: "0.5rem"
  lg: "1rem"
  xl: "1.5rem"
  full: "9999px"
spacing:
  container-xs: "1.2rem"
  container-sm: "2rem"
  container-md: "4rem"
  container-lg: "5rem"
  container-xl: "6rem"
  section-sm: "1.5rem"
  section-md: "2.5rem"
  section-lg: "4rem"
  section-xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-content}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.base-content}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  card-bordered:
    backgroundColor: "{colors.base-100}"
    textColor: "{colors.base-content}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  badge-soft:
    backgroundColor: "{colors.base-300}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
---

# Design System: ibrahimturan.dev

## 1. Overview

**Creative North Star: "The Instrument Panel"**

A working engineer's console, not a marketing site. The default surface is a deep, almost-black blue-violet — a panel that disappears until you need it. Information is encoded in two chromatic readouts: emerald for primary signal, cyan for secondary readout. The rest is tonal layering. Nothing is decorative; everything either earns its place by carrying meaning or it isn't there.

The personality is crafty, opinionated, precise. Type is set in Inter at a deliberate scale, never stretched, never faked. Lines breathe at 65–75ch. Spacing rhythm varies — sections alternate density so the page scans like a well-built interface, not like identical stacked blocks. Motion is purposeful: reveals honor `prefers-reduced-motion`, the prism hero animation is a single signature element (not a reflex applied to every section).

**Key Characteristics:**
- **Dark by default.** Body is base-100 (deep blue-violet). No light mode; the surface is committed.
- **Tonal layering for depth, not shadows.** Surfaces step through base-100/200/300 lightness.
- **Two chromatic accents.** Emerald Signal (primary) and Cyan Readout (secondary). Accent is rare — used only where it carries information.
- **Inter for prose, JetBrains Mono for technical labels.** Type pairing on a contrast axis: humanist sans + technical mono.
- **WCAG 2.1 AA enforced.** Body text ≥4.5:1, large text ≥3:1, focus states visible.

## 2. Colors

The palette is a single dark family — Twilight Stack — with two chromatic readouts — Emerald Signal and Cyan Readout — and a standard DaisyUI state set for messaging (info/success/warning/error).

### Primary

- **Emerald Signal** (`oklch(70% 0.16 155)`): Primary CTA, links, section headings, hover states on interactive elements. The primary voice of the system. Use sparingly: ≤10% of any given screen.
- **Emerald Signal — Content** (`oklch(17% 0.015 261.24)`): Deep Twilight ink on Emerald Signal fills. Contrast: 7.66:1.

### Secondary

- **Cyan Readout** (`oklch(75% 0.12 185)`): Supporting accent — sub-headings, badge outlines, technology tags, social-link icons at rest.
- **Cyan Readout — Content** (`oklch(17% 0.015 261.24)`): Deep Twilight ink on Cyan Readout fills. Contrast: 9.05:1.

### Tertiary

- **Chartreuse Marker** (`oklch(75% 0.14 135)`): Reserved. Not used on the current surface. Reach for it only when neither Emerald Signal nor Cyan Readout reads correctly in a specific context, and never as decoration. The Two Voices Rule binds: do not introduce Chartreuse into a new section by reflex.

### Neutral (Twilight Stack)

- **Twilight 100 — Panel** (`oklch(20% 0.015 261.24)`): Body background. The default surface.
- **Twilight 200 — Recess** (`oklch(18% 0.012 261.24)`): Footer, deeper wells, recessed sections.
- **Twilight 300 — Plate** (`oklch(24% 0.018 261.24)`): Cards, elevated surfaces, hero section background.
- **Twilight Ink — Text** (`oklch(90% 0.01 261.24)`): Primary body text on dark surfaces.
- **Neutral Paper** (`oklch(85% 0.015 261.24)`): Light-mode-style background reserved for inverse panels (rare).
- **Ink** (`oklch(20% 0.015 261.24)`): Text on light surfaces.

### State

- **Info** (`oklch(78.34% 0.113 231.24)`): Informational callouts, links in muted contexts.
- **Success** (`oklch(78.34% 0.113 141.24)`): Confirmation states.
- **Warning** (`oklch(78.34% 0.113 81.24)`): Cautionary states.
- **Error** (`oklch(78.34% 0.113 31.24)`): Error states, destructive actions.

### Named Rules

**The Two Voices Rule.** Emerald Signal and Cyan Readout are the active chromatic accents on the current surface. Chartreuse Marker is reserved infrastructure — defined in the token system for future exception, not painted onto the page today. State colors (info/success/warning/error) are reserved for state. Decoration never invents a fourth hue.

**The Twilight Commitment.** Body is Twilight 100, never warm-tinted cream, never white. The page is dark. This is a deliberate commitment, not a theme.

## 3. Typography

**Display Font:** Inter (with `ui-sans-serif, system-ui, sans-serif` fallback)
**Body Font:** Inter (with `ui-sans-serif, system-ui, sans-serif` fallback)
**Label/Mono Font:** JetBrains Mono (with `ui-monospace, SFMono-Regular, monospace` fallback)

**Character:** Inter is a humanist sans — readable at small sizes, sharp at display. JetBrains Mono is technical and precise. The pairing is on a contrast axis: humanist prose + engineering mono. Mono is reserved for technical labels (tech badges, code-like metadata), not used for body.

### Hierarchy

- **Display** (Inter Black, `clamp(2.5rem, 6vw, 4.5rem)`, line-height 1.05, letter-spacing -0.04em): Hero name only. Never below the hero.
- **Headline** (Inter ExtraBold, `clamp(1.75rem, 4vw, 2.75rem)`, line-height 1.15, letter-spacing -0.03em): Section headings ("Experience", "Technologies", "About Me"). Single per section.
- **Title** (Inter Semibold, 1.5rem, line-height 1.3, letter-spacing -0.02em): Sub-section labels, experience card titles, dialog titles.
- **Body** (Inter Regular, 1rem, line-height 1.65): Prose. Cap line length at 65–75ch (`max-width: 70ch` or container-bound).
- **Caption** (Inter Regular, 0.875rem, line-height 1.5): Supporting metadata, dates, locations.
- **Label** (JetBrains Mono Medium, 0.75rem, letter-spacing 0.02em): Tech badges, code-like chips. Never uppercase-tracked; never used as a section kicker.

### Named Rules

**The Inter-Only Prose Rule.** Body prose, captions, and display all use Inter. JetBrains Mono is opt-in per element where technical reading helps. No uppercase-tracked labels above sections — that's the AI kicker reflex, banned here.

**The Scale-By-Clamp Rule.** Display and Headline use `clamp()` so they breathe between mobile and desktop. Body uses fixed sizes. No fluid body text.


## 4. Elevation

The system is **flat by default**. Surfaces convey depth through tonal layering (base-100/200/300) and a single 1px border, not through shadows. Cards, sections, and panels stay flat at rest. Hover and focus bring a brighter surface tone or a 1px border accent — never a drop shadow.

Depth is conveyed by:
- **Tonal layering.** Resting surfaces are base-100. Elevated surfaces (cards, hero) are base-300. Recessed surfaces (footer) are base-200.
- **Borders, not shadows.** Cards use `1px solid base-300` (DaisyUI `card-border`) — a hairline outline, not a shadow.
- **Backdrop blur (reserved, currently unused).** The token system reserves `backdrop-filter` for surfaces where it carries purpose (intended use: hero card over the prism background). The shipped hero does not currently apply backdrop-blur; the prism background itself is the depth mechanism. If reintroduced in a future surface, it must be the only blur on the page; multiple blurred layers collapse the depth signal.

### Shadow Vocabulary

**None.** The system uses no `box-shadow` for resting state. If a future component needs lift, prefer a brighter surface tone + 1px border accent over a shadow.

### Named Rules

**The Flat-At-Rest Rule.** Surfaces are flat at rest. State changes (hover, focus, active) may shift surface tone or border, never fake depth with a drop shadow.

## 5. Components

### Header / Navigation (inline composition)

The live page builds its top bar inline in `pages/home.page.vue` rather than via `v-navbar`. The atom exists but is unused.

- **Surface:** Transparent. Heroed over `bg-base-300` via the WebGL prism section.
- **Logo:** `it<span class="text-primary">.</span>` — JetBrains Mono 0.875rem, semibold, `tracking-tight`. The period is colored Emerald Signal.
- **Nav links:** Three inline anchors (`work`, `about`, `contact`), JetBrains Mono 0.75rem, `text-base-content-muted` at rest, `hover:text-primary`. Spacing `gap-5` mobile / `sm:gap-8` ≥640px.
- **Active state:** No current-page indicator (single-page anchor navigation); `prefers-reduced-motion` is honored on hover transitions.

### Buttons

- **Primary CTA** (`get in touch` link in hero): Tailwind class form — `rounded-md bg-primary px-5 py-3 font-semibold text-primary-content transition-transform hover:-translate-y-0.5`. Emerald Signal fill, primary-content ink. Lifts on hover. Single primary action in the hero band.
- **Secondary CTA** (`see experience` link): `rounded-md border border-base-300 px-5 py-3 font-semibold text-base-content transition-colors hover:border-primary hover:text-primary`. Ghost-by-border. Border shifts to Emerald Signal and text to Emerald on hover.
- **Ghost Icon Button** (used by `social-links` molecule via `v-button ghost circle`): Transparent base, base-content icon, hover surface `bg-base-300` with `border-primary` and `text-primary`. Carries aria-label per network.

### Experience Timeline Row (`experience-section` organism)

Rows, not cards. The timeline organism renders each role as a horizontal row inside an `<ol>` with a vertical 1px rail (left axis, dot, year, role).

- **Row layout:** `grid grid-cols-[64px_1fr] gap-4 sm:grid-cols-[96px_1fr] sm:gap-8`. Top hairline `border-t border-base-300` between rows. No card surface — type and rails carry it.
- **Axis dot:** 12px round, hollow on past roles (`bg-base-300`), filled Emerald Signal on the current role with a `ring-4 ring-primary/20` halo.
- **Title:** Inter Bold 1.5rem / 1.65rem (sm), `tracking-[-0.025em]`. Company link inline at end, `text-primary`, hover `text-primary/80`.
- **Tech Tag (inline):** `rounded border border-base-300 bg-base-200 px-2 py-1 font-mono text-xs text-secondary`. Distinct from Tech Badge (see below) — quieter; sits in row alongside other row metadata.

### Resume Aside Metric (`experience-section` — left rail)

A single hero-metric-style exception.

- **Use:** Only one place on the entire surface. Sits in the experience section's left aside: `{{ totalYears }}+ years shipping production products`.
- **Number rendering:** Inter Black 3rem (text-5xl), Emerald Signal, `tracking-[-0.06em]`.
- **Label:** Inter Regular 0.875rem, `text-base-content-muted`, sits to the right of the number.
- **Named rule:** The Resume Metric is the **single, sanctioned** hero-metric on the site. Other surfaces must not repeat the pattern (no big-number stats in other section asides, hero, footer, or about strip).

### Tech Grid Cell (`technologies-section` organism)

A grouped grid, not a card wall. Four rows (Frontend, Mobile, Backend, Tooling) on the left, four-column tech cells on the right.

- **Aside label:** Single JetBrains Mono 0.75rem token (e.g. `stack` or `work`) in `text-primary` — never uppercase, never tracked. Functional name, not a kicker.
- **Cell:** `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2` rows of `tech-cell`s. Each cell: `rounded-md border px-3 py-2.5`. Border + background shift by `level`:
  - `primary`: `border-primary/40 bg-primary/10 text-base-content`
  - `working`: `border-base-300 bg-base-100 text-base-content`
  - `familiar`: `border-base-300 bg-transparent text-base-content-muted`
- **Hover:** Cell border shifts to `var(--color-primary)`.
- **Per-cell content:** Leading `v-icon` (`text-base`), name (Inter Semibold 0.875rem), meta line (JetBrains Mono 10px uppercase tracked: `primary · 6y`).

### Tech Badge (component) vs Tech Tag (inline)

Two coexisting tech treatments. Documented intent:

- **Tech Badge** — `molecules/v-tech-badge.vue`. Used where the tech needs icon + name emphasis in a tighter density. `v-badge variant="dash" color="secondary"` with `v-icon` leading edge and label inline. **Current usage:** declared, not currently mounted in the live page; reserved for future surfaces.
- **Tech Tag (inline)** — raw Tailwind in `experience-section.vue`. Used inside experience rows where the tag sits among other row metadata. Quieter; reads as data, not as a chip.
- **Do not mix the two in the same row.** Pick one treatment per surface. Inline-row gets Tag; standalone-badge gets Badge.

### About Strip (inline composition)

Three-column data strip in `home.page.vue`. Not a section; a hairline-separated band between hero and experience.

- **Layout:** `border-y border-base-300 py-12 lg:py-16`. Mobile single-column; `sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm` from 640px up.
- **Field label:** JetBrains Mono 0.75rem, `text-primary`. Functional word (`based in`, `education`, `reach me`).
- **Field value:** Inter Regular `text-base-content`; secondary line `text-base-content-muted` if applicable.
- **No card treatment.** The strip is bounded only by hairlines, never by surface lift.

### Hero (live composition)

The live hero is built inline in `home.page.vue`, not via the existing `hero-section.vue` organism. The organism is dead code (not mounted) and does not describe the shipped surface.

- **Layout:** `grid grid-cols-[1.4fr_0.6fr]` desktop, stacked single-column ≤640px. `gap clamp(2rem, 8vw, 9rem)`. `align-items: end`.
- **Copy side:** JetBrains Mono `{{ title }} / {{ location }}` eyebrow in Emerald Signal. Headline at `text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.98] tracking-[-0.05em]`. The phrase ending `into shipped products` is colored Emerald Signal. Tagline follows at `text-lg sm:text-xl leading-relaxed text-base-content-muted`, max-width 36rem.
- **Portrait side:** `portrait-frame` — `1px solid var(--color-primary)`, `padding 0.75rem`, `transform: rotate(3deg)`, `bg-base-300`. Avatar inside at full width, `aspect-ratio 1`, `filter saturate(0.7) contrast(1.08)` (deliberate desaturation). Portrait max-width 280px desktop / 220px mobile. Self-aligned to `end` desktop, `start` mobile.
- **Below portrait:** JetBrains Mono 0.75rem, `text-base-content-muted`, leading `text-primary` filled bullet, message `open to product engineering roles`.
- **Header sits above the hero** as described in Header / Navigation. No `bg-base-100/60 backdrop-blur` card on the current surface (the organism with that treatment is unused).

### Skip Link (`layouts/default.layout.vue`)

Accessibility surface, not a visual one.

- **Default:** `sr-only`.
- **On focus:** `focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-content`. Plus a visible ring `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100`.
- **Link target:** `#main`. Always the first focusable element on every layout.

### Footer

- **Surface:** `bg-base-200` full bleed. Container `py-12`.
- **Layout:** Flex row ≥640px, stacked ≤640px. Left: copyright in `text-sm text-base-content-muted` (`&copy; {{ currentYear }} Ibrahim Turan. All rights reserved.`). Right: `social-links` (ghost-circle icon buttons).
- **No card. No shadow. No border.** Tonal layering only.

### Inputs / Fields

Not used on the current surface. When added, follow: hairline 1px base-300 border, base-100 background, base-content text, Emerald Signal 2px outline on focus.

## 6. Do's and Don'ts

### Do:

- **Do** use `oklch(20% 0.015 261.24)` (Twilight 100) as the body background. Dark is the commitment.
- **Do** use Emerald Signal and Cyan Readout as the two chromatic accents. State colors are for state.
- **Do** honor `prefers-reduced-motion: reduce`. The prism background and blur-text reveal crossfade or appear instantly when motion is reduced.
- **Do** set body line length to 65–75ch. Container padding scales by viewport, never over 6rem at 2xl.
- **Do** vary section spacing rhythm (sm/md/lg/xl) — sections should not all feel like the same height.
- **Do** keep cards flat. Surfaces step through base-100/200/300 lightness, not drop shadows.
- **Do** load Inter (sans) and JetBrains Mono (mono) from a privacy-respecting source.
- **Do** isolate metric callouts. The Resume Metric in the Experience aside (e.g. `6+ years shipping production products`) is the one sanctioned hero-metric on the site. Anywhere else, render the same fact in prose.

### Don't:

- **Don't** use a cream / warm-tinted / off-white body background. The 2025–26 AI-portfolio reflex is banned here.
- **Don't** add small uppercase-tracked kicker labels ("ABOUT" / "PROCESS" / "WORK") above sections. The AI grammar is banned.
- **Don't** add a `border-left` or `border-right` greater than 1px as a colored stripe on cards, list items, or callouts. Side-stripe accents are banned.
- **Don't** use gradient text (`background-clip: text` with a gradient background). Emphasis comes from weight and size.
- **Don't** use glassmorphism as a default. Backdrop-blur is reserved for hero-grade surfaces and on the current surface no element uses it. Don't add a glass card to "feel premium" — blur is a depth signal, not a decoration.
- **Don't** lay out experiences or technologies as identical card grids. Vary surface treatment — some as full-width rows, some as chip groups, never the same template five times.
- **Don't** use numbered section markers (01 / 02 / 03) as scaffolding reflex. A numbered sequence earns its place when the section IS a sequence; otherwise it doesn't appear.
- **Don't** stretch or compress a typeface. If text doesn't fit, change the copy or the clamp — never the letter-spacing hack.
- **Don't** add decorative animation that doesn't carry information. Motion is purposeful or it isn't there.
- **Don't** add another big-number hero-metric anywhere on the site outside the Experience aside. The pattern (giant colored number + small label + supporting stats) is the AI slop template; the single Resume Metric is the documented exception.
- **Don't** mix fonts within the prose system. Inter for prose, JetBrains Mono for technical labels only.
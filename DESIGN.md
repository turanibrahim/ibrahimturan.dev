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

- **Chartreuse Marker** (`oklch(75% 0.14 135)`): Reserved accent for highlights, callouts, and indicator states. Use only when neither Emerald nor Cyan reads correctly in context.

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

**The Two Voices Rule.** Emerald Signal and Cyan Readout are the only chromatic accents. Chartreuse Marker is reserved. State colors (info/success/warning/error) are reserved for state. Decoration never invents a fourth hue.

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
- **Backdrop blur on hero only.** The hero card uses `backdrop-blur` over the prism background. This is the one place where a depth effect (blur) carries purpose; it isn't decoration.

### Shadow Vocabulary

**None.** The system uses no `box-shadow` for resting state. If a future component needs lift, prefer a brighter surface tone + 1px border accent over a shadow.

### Named Rules

**The Flat-At-Rest Rule.** Surfaces are flat at rest. State changes (hover, focus, active) may shift surface tone or border, never fake depth with a drop shadow.

## 5. Components

### Buttons

- **Shape:** Pill-free; corners at `--radius-md` (0.5rem). Solid, never rounded-full.
- **Primary:** Emerald Signal background, deep Twilight text, 0.625rem × 1.25rem padding. Single most prominent CTA per section.
- **Ghost:** Transparent background, base-content text, 0.5rem × 1rem padding. Default for icon-only social links.
- **Hover / Focus:** Background tone shifts to a brighter Emerald or a 1px Emerald Signal border. Focus visible via a 2px outline ring at `--radius-md`.

### Chips / Tech Badges

- **Style:** Dash variant — `badge-dash` with secondary (Cyan Readout) outline and text. JetBrains Mono Medium for the label. Icon inline at the leading edge.
- **State:** Static at rest. Hover transitions the outline to a Cyan Readout fill at 10% opacity.
- **Purpose:** Technology tags only. Never used as a generic pill, never used as a section kicker.

### Cards / Containers

- **Corner Style:** `--radius-md` (0.5rem). Single radius across all cards.
- **Background:** base-100 for content cards; base-300 for hero card; base-200 for footer.
- **Shadow Strategy:** None. Cards are flat, defined by a 1px border (`card-border`).
- **Border:** 1px solid base-300, optional via `bordered` prop.
- **Internal Padding:** 1.5rem default. Adjusts via DaisyUI size classes (`card-sm`, `card-lg`, `card-xl`) when density demands it.

### Inputs / Fields

Not used on the current surface. When added, follow: hairline 1px base-300 border, base-100 background, base-content text, Emerald Signal 2px outline on focus.

### Navigation

- **Style:** Not yet present. Reserved slot for `v-navbar` (atom exists). When implemented: base-300 surface, transparent to hero gradient, no shadow.
- **Links:** base-content text, Emerald Signal on hover, 2px Emerald Signal underline on active.

### Hero (Signature Component)

The hero is the page's signature surface. It carries the WebGL prism background (existing `v-prism-background` atom) plus a single elevated card with backdrop blur.

- **Background:** WebGL prism shader (custom), full-bleed. Honors `prefers-reduced-motion`.
- **Card:** base-100/60 with `backdrop-blur-sm`, 1px base-300 border, `--radius-md`. Contains avatar, name, title, social links.
- **Name:** Display scale, Inter Black, `--color-base-100` ink in dark context, blur-text reveal on mount.
- **Title:** Headline sub-scale, secondary (Cyan Readout) color.

## 6. Do's and Don'ts

### Do:

- **Do** use `oklch(20% 0.015 261.24)` (Twilight 100) as the body background. Dark is the commitment.
- **Do** use Emerald Signal and Cyan Readout as the two chromatic accents. State colors are for state.
- **Do** honor `prefers-reduced-motion: reduce`. The prism background and blur-text reveal crossfade or appear instantly when motion is reduced.
- **Do** set body line length to 65–75ch. Container padding scales by viewport, never over 6rem at 2xl.
- **Do** vary section spacing rhythm (sm/md/lg/xl) — sections should not all feel like the same height.
- **Do** keep cards flat. Surfaces step through base-100/200/300 lightness, not drop shadows.
- **Do** load Inter (sans) and JetBrains Mono (mono) from a privacy-respecting source.
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on long prose.

### Don't:

- **Don't** use a cream / warm-tinted / off-white body background. The 2025–26 AI-portfolio reflex is banned here.
- **Don't** add small uppercase-tracked kicker labels ("ABOUT" / "PROCESS" / "WORK") above sections. The AI grammar is banned.
- **Don't** add a `border-left` or `border-right` greater than 1px as a colored stripe on cards, list items, or callouts. Side-stripe accents are banned.
- **Don't** use gradient text (`background-clip: text` with a gradient background). Emphasis comes from weight and size.
- **Don't** use glassmorphism as a default. Backdrop-blur is reserved for the hero card only.
- **Don't** lay out experiences or technologies as identical card grids. Vary surface treatment — some as full-width rows, some as chip groups, never the same template five times.
- **Don't** use numbered section markers (01 / 02 / 03) as scaffolding reflex. A numbered sequence earns its place when the section IS a sequence; otherwise it doesn't appear.
- **Don't** stretch or compress a typeface. If text doesn't fit, change the copy or the clamp — never the letter-spacing hack.
- **Don't** add decorative animation that doesn't carry information. Motion is purposeful or it isn't there.
- **Don't** mix fonts within the prose system. Inter for prose, JetBrains Mono for technical labels only.
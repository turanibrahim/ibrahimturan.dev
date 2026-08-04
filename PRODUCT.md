# Product

## Register

brand

## Users

Two primary audiences, in tension by design:

- **Hiring managers and recruiters** scanning quickly. They have 30 seconds and a stack of candidates. They want fast confirmation: who this person is, what they've shipped, how to reach out. Visual quality raises their confidence; a sloppy site is a silent rejection.
- **Senior engineers and peer developers** reading deeper. They look at the codebase, the page weight, the motion craft, the accessibility, the typography. They evaluate taste and technical signal, not just résumé bullets. A 3-minute read should feel like meeting the engineer.

The site must serve both at once: skim-friendly at the top, reward deeper reading as you scroll.

## Product Purpose

A personal portfolio that earns interviews and signals peer credibility — one surface that does both. Success is a hiring manager reaching out *and* a senior engineer thinking "this person knows what they're doing." Not a CMS, not a blog engine, not a project showcase; a single, opinionated landing page with optional depth.

## Brand Personality

**Crafty · opinionated · precise.** An engineer who cares about the details — typography, motion, semantics, naming. Understated but never sloppy. Confident in choices, allergic to decoration that doesn't earn its place. Voice is direct, lightly technical, no marketing gloss. The site reads like an engineer made it, deliberately.

## Anti-references

**The 2025–26 AI-portfolio reflex.** Cream / sand / paper body backgrounds, soft cards, faux-3D tilt, identical card grids, "trusted by" strips, kicker eyebrows above every section, gradient text, glassmorphism as default, big "Hire me" CTA stuck to the corner. The page should not look like it came out of a template generator. Concretely avoided:

- Cream / warm-tinted body background. Body is committed dark.
- Eyebrow kickers ("ABOUT" / "PROCESS" / "WORK") above every section.
- Identical card grids as the default way to list experiences or projects.
- Glassmorphism on neutral cards. (Backdrop-blur on the hero is fine, purposeful.)
- Gradient text.
- Side-stripe borders on list items or callouts.
- Numbered section markers (01 / 02 / 03) as scaffolding reflex.

## Design Principles

1. **Clarity over decoration.** Hierarchy and structure carry the page; color and motion support it. A reader should know who, what, and how to reach out without scrolling.
2. **Earned complexity.** Animation is allowed when it earns its place — entrance reveals, focus states, micro-interactions. WebGL hero is fine; it should not carry the page.
3. **Real hierarchy, not styled-flat.** Type scale, rhythm, and section structure carry the brand. No identical grids as default scaffolding. Varied spacing for rhythm.
4. **Craft as signal.** Code structure, naming, file organization, and the production-readiness of the site *are* the portfolio. A sloppy codebase contradicts the headline.
5. **No AI-portfolio reflex.** No cream body, no glass cards as default, no eyebrow kickers, no identical card grids. The site should look like an engineer made it, not like a template.

## Accessibility & Inclusion

- **WCAG 2.1 AA** across the board: body text ≥4.5:1, large text ≥3:1, focus states visible, semantic landmarks, keyboard-navigable.
- **Reduced motion is not optional.** Every entrance animation, parallax, and WebGL effect honors `prefers-reduced-motion: reduce` with a crossfade or instant equivalent. The page must remain complete and readable without motion.
- **Alt text on every image** (avatar, company logos, project screenshots). Decorative imagery is marked `aria-hidden`.
- **Print-friendly.** A print stylesheet renders the résumé-style summary cleanly. The hero prism and animations don't print.
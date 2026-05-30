# Design Language: THE PIVOT — The Turning Point For Your Creative Ambition

> Extracted from `http://localhost:3001` on May 6, 2026
> 409 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#d8ff85` | rgb(216, 255, 133) | hsl(79, 100%, 76%) | 22 |
| Secondary | `#0a211f` | rgb(10, 33, 31) | hsl(175, 53%, 8%) | 495 |
| Accent | `#0a1510` | rgb(10, 21, 16) | hsl(153, 35%, 6%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#000000` | hsl(0, 0%, 0%) | 115 |
| `#757575` | hsl(0, 0%, 46%) | 46 |
| `#ffffff` | hsl(0, 0%, 100%) | 1 |

### Background Colors

Used on large-area elements: `#f2f4e7`, `#0a1510`, `#12211d`, `#f7f9f2`

### Text Colors

Text color palette: `#000000`, `#0a211f`, `#f2f4e7`, `#12211d`, `#d8ff85`, `#f7f9f2`, `#757575`

### Gradients

```css
background-image: radial-gradient(85% 75%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.62) 100%);
```

```css
background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(200, 217, 111, 0.333) 28%, rgba(242, 244, 231, 0.6) 50%, rgba(200, 217, 111, 0.333) 72%, rgba(0, 0, 0, 0) 100%);
```

```css
background-image: linear-gradient(rgb(10, 33, 31), rgb(10, 33, 31));
```

```css
background-image: linear-gradient(rgb(242, 244, 231) 0%, rgba(0, 0, 0, 0) 100%);
```

```css
background-image: linear-gradient(rgba(247, 249, 242, 0.6), rgba(247, 249, 242, 0.6));
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#0a211f` | text, border, background | 495 |
| `#f2f4e7` | background, text, border | 173 |
| `#000000` | text, border, background | 115 |
| `#757575` | text, border | 46 |
| `#d8ff85` | background, text, border | 22 |
| `#0a1510` | background | 1 |
| `#ffffff` | background | 1 |

## Typography

### Font Families

- **Inter Tight** — used for body (304 elements)
- **ui-sans-serif** — used for body (40 elements)
- **__nextjs-Geist** — used for body (39 elements)
- **Instrument Serif** — used for all (25 elements)
- **Plus Jakarta Sans** — used for body (1 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 136px | 8.5rem | 400 | 136px | 5.44px | div |
| 89.6px | 5.6rem | 400 | 89.6px | -1.792px | h2 |
| 76.8px | 4.8rem | 400 | 80.64px | -1.536px | h2, br, em |
| 71.68px | 4.48rem | 400 | 75.264px | -1.4336px | h1, span |
| 64px | 4rem | 400 | 70.4px | -1.28px | h2 |
| 56px | 3.5rem | 400 | 59.36px | -1.4px | h1, em |
| 24px | 1.5rem | 400 | 32.4px | -0.24px | blockquote |
| 20.8px | 1.3rem | 800 | 20.8px | -0.832px | a |
| 19.2px | 1.2rem | 700 | 32.64px | -0.168px | em |
| 18.4px | 1.15rem | 400 | 27.6px | -0.184px | p |
| 18px | 1.125rem | 400 | 29.25px | normal | p |
| 16.8px | 1.05rem | 400 | 28.56px | -0.168px | p |
| 16px | 1rem | 400 | 24px | normal | html, head, meta, link |
| 15.2px | 0.95rem | 400 | 26.6px | normal | p, em |
| 14.4px | 0.9rem | 600 | 21.6px | -0.144px | a |

### Heading Scale

```css
h2 { font-size: 89.6px; font-weight: 400; line-height: 89.6px; }
h2 { font-size: 76.8px; font-weight: 400; line-height: 80.64px; }
h1 { font-size: 71.68px; font-weight: 400; line-height: 75.264px; }
h2 { font-size: 64px; font-weight: 400; line-height: 70.4px; }
h1 { font-size: 56px; font-weight: 400; line-height: 59.36px; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: 24px; }
```

### Font Weights in Use

`400` (289x), `500` (90x), `600` (27x), `700` (2x), `800` (1x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-2 | 2px | 0.125rem |
| spacing-38 | 38px | 2.375rem |
| spacing-48 | 48px | 3rem |
| spacing-64 | 64px | 4rem |
| spacing-80 | 80px | 5rem |
| spacing-88 | 88px | 5.5rem |
| spacing-136 | 136px | 8.5rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xl | 24px | 2 |
| full | 50px | 1 |
| full | 999px | 36 |
| full | 9999px | 2 |

## Box Shadows

**sm (inset)** — blur: 0px
```css
box-shadow: rgb(23, 23, 23) 0px 0px 0px 1px, rgba(255, 255, 255, 0.14) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.24) 0px 16px 32px -8px;
```

**sm** — blur: 0px
```css
box-shadow: rgb(23, 23, 23) 0px 0px 0px 1px;
```

## CSS Custom Properties

### Colors

```css
--foreground: #0a211f;
--card: #f2f4e7;
--card-foreground: #0a211f;
--popover: #f2f4e7;
--popover-foreground: #0a211f;
--primary: #e1fcad;
--primary-foreground: #0a211f;
--secondary: #122023;
--secondary-foreground: #f2f4e7;
--muted: #0000000a;
--muted-foreground: #4a7a76;
--accent: #0000000a;
--accent-foreground: #0a211f;
--destructive: #ef4444;
--destructive-foreground: #b91c1c;
--border: #0a211f1f;
--ring: #4a7a76;
--color-bg: #f2f4e7;
--color-ink: #0a211f;
--color-accent: #d8ff85;
--color-dark-bg: #12211d;
--color-border: #0a211f1f;
--color-ink-muted: #0a211f80;
--tw-ring-offset-shadow: 0 0 #0000;
--tw-ring-shadow: 0 0 #0000;
--tw-inset-ring-shadow: 0 0 #0000;
--tw-ring-offset-color: #fff;
--color-white: #fff;
--tw-border-style: solid;
--tw-ring-offset-width: 0px;
```

### Spacing

```css
--spacing: .25rem;
--tw-space-y-reverse: 0;
```

### Typography

```css
--font-display: "Instrument Serif", ui-serif, Georgia, serif;
--font-body: "Inter Tight", Inter, system-ui, sans-serif;
--text-2xl: 1.5rem;
--leading-relaxed: 1.625;
--tracking-tighter: -.05em;
--text-lg: 1.125rem;
--text-2xl--line-height: calc(2 / 1.5);
--text-base--line-height: calc(1.5 / 1);
--tracking-wider: .05em;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
--font-weight-semibold: 600;
--text-sm: .875rem;
--text-lg--line-height: calc(1.75 / 1.125);
--leading-tight: 1.25;
--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--text-4xl: 2.25rem;
--text-sm--line-height: calc(1.25 / .875);
--font-logo: "Plus Jakarta Sans", "Plus Jakarta Sans Fallback";
--text-6xl: 3.75rem;
--text-xs: .75rem;
--default-font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--tracking-widest: .1em;
--text-xs--line-height: calc(1 / .75);
--font-weight-medium: 500;
--text-6xl--line-height: 1;
--text-4xl--line-height: calc(2.5 / 2.25);
--text-base: 1rem;
--default-mono-font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
--tracking-tight: -.025em;
```

### Shadows

```css
--tw-inset-shadow-alpha: 100%;
--tw-drop-shadow-alpha: 100%;
--tw-inset-shadow: 0 0 #0000;
--tw-shadow-alpha: 100%;
--tw-shadow: 0 0 #0000;
```

### Radii

```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 999px;
```

### Other

```css
--background: #f2f4e7;
--input: #0a211f1f;
--header-height: 56px;
--container-max: 1216px;
--layout-max: 1920px;
--section-py: 88px;
--container-px: 16px;
--ease: cubic-bezier(.4, 0, .2, 1);
--ease-out: cubic-bezier(0, 0, .2, 1);
--t-micro: .1s;
--t-fast: .15s;
--t-std: .2s;
--t-med: .3s;
--t-slow: .5s;
--container-md: 28rem;
--tw-animation-delay: 0s;
--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
--tw-animation-iteration-count: 1;
--tw-exit-opacity: 1;
--tw-outline-style: solid;
--tw-animation-fill-mode: none;
--tw-exit-blur: 0;
--tw-translate-z: 0;
--tw-gradient-via: rgba(0, 0, 0, 0);
--tw-enter-scale: 1;
--tw-animation-direction: normal;
--animate-ping: ping 1s cubic-bezier(0, 0, .2, 1) infinite;
--tw-exit-translate-x: 0;
--tw-translate-y: 0;
--tw-enter-translate-x: 0;
--tw-content: "";
--tw-gradient-from: rgba(0, 0, 0, 0);
--tw-gradient-to: rgba(0, 0, 0, 0);
--tw-exit-rotate: 0;
--tw-exit-scale: 1;
--tw-translate-x: 0;
--tw-exit-translate-y: 0;
--tw-gradient-via-position: 50%;
--tw-enter-rotate: 0;
--container-lg: 32rem;
--tw-enter-translate-y: 0;
--tw-gradient-to-position: 100%;
--tw-enter-blur: 0;
--default-transition-duration: .15s;
--container-xs: 20rem;
--tw-enter-opacity: 1;
--tw-gradient-from-position: 0%;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`

**Durations:** `0.2s`, `0.15s`, `0.3s`, `0.25s`, `0.28s`, `0.5s`, `0.22s`, `0.18s`

### Common Transitions

```css
transition: all;
transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1);
transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: background-size 0.5s cubic-bezier(0.4, 0, 0.2, 1);
transition: background-color 0.22s cubic-bezier(0.4, 0, 0.2, 1), color 0.22s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.22s cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframe Animations

**slideDownAppearing**
```css
@keyframes slideDownAppearing {
  0% { opacity: 0; translate: 0px -10px; }
  100% { opacity: 1; translate: 0px; }
}
```

**fadeInUp**
```css
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

**fade-in**
```css
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(5px); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

**move-bottom-left**
```css
@keyframes move-bottom-left {
  0% { opacity: 1; transform: translate(0px); }
  100% { opacity: 0; transform: translate(-12px, 12px); }
}
```

**up-right-to-center**
```css
@keyframes up-right-to-center {
  0% { opacity: 0; transform: translate(12px, -12px); }
  100% { opacity: 1; transform: translate(0px); }
}
```

**slide-up-loop**
```css
@keyframes slide-up-loop {
  0% { opacity: 0; transform: translateY(100%); }
  2% { opacity: 1; transform: translateY(0px); }
  18% { opacity: 1; transform: translateY(0px); }
  20% { opacity: 0; transform: translateY(-100%); }
  100% { opacity: 0; transform: translateY(-100%); }
}
```

**spin**
```css
@keyframes spin {
  100% { transform: rotate(360deg); }
}
```

**pulse**
```css
@keyframes pulse {
  50% { opacity: 0.5; }
}
```

**ping**
```css
@keyframes ping {
  75%, 100% { opacity: 0; transform: scale(2); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (3 instances)

```css
.button {
  color: rgb(10, 33, 31);
  font-size: 16px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Cards (2 instances)

```css
.card {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 9999px;
  box-shadow: rgb(23, 23, 23) 0px 0px 0px 1px, rgba(255, 255, 255, 0.14) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.24) 0px 16px 32px -8px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (36 instances)

```css
.link {
  color: rgb(10, 33, 31);
  font-size: 13px;
  font-weight: 500;
}
```

### Navigation (2 instances)

```css
.navigatio {
  color: rgb(10, 33, 31);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
}
```

### Footer (1 instances)

```css
.foote {
  background-color: rgb(18, 33, 29);
  color: rgb(242, 244, 231);
  padding-top: 88px;
  padding-bottom: 88px;
  font-size: 16px;
}
```

### Badges (30 instances)

```css
.badge {
  background-color: rgb(216, 255, 133);
  color: rgb(10, 33, 31);
  font-size: 13px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(10, 33, 31);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(10, 33, 31);
  font-size: 14px;
  font-weight: 400;
```

## Layout System

**2 grid containers** and **80 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1280px | 0px |
| 1216px | 0px |
| 100% | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 2-column | 2x |

### Grid Templates

```css
grid-template-columns: 576px 704px;
grid-template-columns: 572px 572px;
gap: 40px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 69x |
| column/nowrap | 6x |
| row/wrap | 5x |

**Gap values:** `12px`, `24px`, `28px`, `32px`, `40px`, `48px`, `4px`, `5px`

## Accessibility (WCAG 2.1)

**Overall Score: 80%** — 8 passing, 2 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#12211d` | `#0a211f` | 1.01:1 | FAIL | span (2x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#0a211f` | `#d8ff85` | 14.85:1 | AAA |

## Design System Score

**Overall: 85/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 50/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 80/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Well-defined spacing scale, Clean elevation system, Consistent border radii, Good CSS variable tokenization

**Issues:**
- 5 font families — consider limiting to 2 (heading + body)
- 2 WCAG contrast failures
- 10 !important rules — prefer specificity over overrides
- 602 duplicate CSS declarations

## Gradients

**5 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| radial | — | 3 | bold |
| linear | to right | 5 | complex |
| linear | — | 2 | brand |
| linear | — | 2 | brand |
| linear | — | 2 | brand |

```css
background: radial-gradient(85% 75%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.62) 100%);
background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(200, 217, 111, 0.333) 28%, rgba(242, 244, 231, 0.6) 50%, rgba(200, 217, 111, 0.333) 72%, rgba(0, 0, 0, 0) 100%);
background: linear-gradient(rgb(10, 33, 31), rgb(10, 33, 31));
background: linear-gradient(rgb(242, 244, 231) 0%, rgba(0, 0, 0, 0) 100%);
background: linear-gradient(rgba(247, 249, 242, 0.6), rgba(247, 249, 242, 0.6));
```

## Z-Index Map

**5 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 9999,2147483647 | div, div.n.e.x.t.j.s.-.t.o.a.s.t |
| sticky | 50,50 | header.f.i.x.e.d. .t.o.p.-.0. .l.e.f.t.-.0. .r.i.g.h.t.-.0. .z.-.5.0. .f.l.e.x. .i.t.e.m.s.-.c.e.n.t.e.r |
| base | 1,2 | div, div, div |

**Issues:**
- [object Object]

## SVG Icons

**3 unique SVG icons** detected. Dominant style: **outlined**.

| Size Class | Count |
|------------|-------|
| xs | 3 |

**Icon colors:** `currentColor`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Instrument Serif | self-hosted | 400 | italic, normal |
| Inter Tight | self-hosted | 300, 400, 500, 600 | normal |
| Plus Jakarta Sans | self-hosted | 800 | normal |
| __nextjs-Geist | self-hosted | 400 600 | normal |
| __nextjs-Geist Mono | self-hosted | 400 600 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| gallery | 2 | objectFit: cover, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (2x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `150ms` | 150 |
| `sm` | `180ms` | 180 |
| `md` | `280ms` | 280 |
| `lg` | `500ms` | 500 |

### Easing Families

- **custom** (86 uses) — `cubic-bezier(0.4, 0, 0.2, 1)`
- **ease-out** (3 uses) — `cubic-bezier(0.23, 0.88, 0.26, 0.92)`

## Brand Voice

**Tone:** friendly · **Pronoun:** third-person · **Headings:** Title Case (tight)

### Top CTA Verbs

- **capabilities** (1)

### Button Copy Patterns

- "capabilities" (1×)

### Sample Headings

> The Turning
Point For Your
Creative Ambition.
> The Turning Point For Your Creative Ambition.
> Creative Design
> Specialized Production
> AI Services
> The Turning
Point For Your
Creative Ambition.
> The Turning Point For Your Creative Ambition.
> Creative Design
> Specialized Production
> AI Services

## Page Intent

**Type:** `landing` (confidence 0.45)
**Description:** A full-service creative platform. We deliver impact, not files.

## Section Roles

Reading order (top→bottom): nav → testimonial → testimonial → nav → content → testimonial → footer → nav

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.4 |
| 1 | nav | — | 0.9 |
| 2 | testimonial | The Turning
Point For Your
Creative Ambition. | 0.8 |
| 3 | testimonial | The Turning
Point For Your
Creative Ambition. | 0.8 |
| 4 | content | Creative Design | 0.3 |
| 5 | testimonial | What Shifted. | 0.8 |
| 6 | footer | Start your
turning point. | 0.95 |
| 7 | nav | — | 0.9 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.25 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 9999px |
| backdrop-filter in use | no |
| Gradients | 5 |

## Imagery Style

**Label:** `screenshot` (confidence 0.4)
**Counts:** total 2, svg 0, icon 0, screenshot-like 1, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** square

## Component Library

**Detected:** `tailwindcss` (confidence 0.59)

Evidence:
- tailwind-like class density 59%

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Inter Tight` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration

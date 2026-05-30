# Design Language: n8n's MCP server can now build workflows! – n8n Blog

> Extracted from `https://blog.n8n.io/n8n-mcp-server/` on May 6, 2026
> 1077 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#ee4f27` | rgb(238, 79, 39) | hsl(12, 85%, 54%) | 7 |
| Secondary | `#1f192a` | rgb(31, 25, 42) | hsl(261, 25%, 13%) | 27 |
| Accent | `#077ac7` | rgb(7, 122, 199) | hsl(204, 93%, 40%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#ffffff` | hsl(0, 0%, 100%) | 1041 |
| `#6f6f6f` | hsl(0, 0%, 44%) | 466 |
| `#c4bbd3` | hsl(263, 21%, 78%) | 302 |
| `#e4e4e4` | hsl(0, 0%, 89%) | 146 |
| `#000000` | hsl(0, 0%, 0%) | 129 |
| `#4b4b4b` | hsl(0, 0%, 29%) | 40 |
| `#6b7280` | hsl(220, 9%, 46%) | 18 |
| `#f5f5f5` | hsl(0, 0%, 96%) | 14 |
| `#545454` | hsl(0, 0%, 33%) | 2 |
| `#c1c1c1` | hsl(0, 0%, 76%) | 1 |

### Background Colors

Used on large-area elements: `#0e0918`, `#000000`, `#ffffff`, `#21ace8`, `#1b1728`, `#fefefe`

### Text Colors

Text color palette: `#000000`, `#ffffff`, `#c4bbd3`, `#6b7280`, `#e4e4e4`, `#1e1e1e`, `#545454`, `#1b1728`, `#ee4f27`, `#fefefe`

### Gradients

```css
background-image: radial-gradient(67.82% 89.62% at 86.97% 105.17%, rgb(64, 6, 167) 0%, rgb(98, 31, 4) 100%);
```

```css
background-image: linear-gradient(to top, rgba(38, 33, 73, 0), rgba(0, 0, 0, 0.42));
```

```css
background-image: linear-gradient(rgba(255, 255, 255, 0) 100%, rgb(255, 155, 38) 100%, rgba(0, 0, 0, 0) 100%), linear-gradient(63.9655deg, rgb(253, 137, 37) 7.171%, rgb(255, 12, 0) 86.297%);
```

```css
background-image: linear-gradient(141deg, rgb(7, 122, 199), rgb(107, 33, 239));
```

```css
background-image: linear-gradient(135deg, rgb(196, 187, 211) 0%, rgb(157, 146, 168) 50%, rgb(196, 187, 211) 100%);
```

```css
background-image: linear-gradient(rgb(33, 26, 46), rgb(0, 0, 0));
```

```css
background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.2) 35.33%), linear-gradient(139.215deg, rgb(255, 255, 255) 10.576%, rgb(124, 101, 161) 123.65%);
```

```css
background-image: linear-gradient(rgba(42, 28, 66, 0) 0%, rgba(42, 28, 66, 0.85) 20%, rgba(42, 28, 66, 0.85) 80%, rgba(42, 28, 66, 0) 100%);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#ffffff` | text, border, background | 1041 |
| `#6f6f6f` | text, border | 466 |
| `#c4bbd3` | text, border | 302 |
| `#e4e4e4` | text, border | 146 |
| `#000000` | text, border, background | 129 |
| `#4b4b4b` | text, border | 40 |
| `#1f192a` | border, background, text | 27 |
| `#6b7280` | text, border | 18 |
| `#f5f5f5` | background | 14 |
| `#ee4f27` | background, text, border | 7 |
| `#0e0918` | background | 2 |
| `#21ace8` | background | 2 |
| `#545454` | text, border | 2 |
| `#077ac7` | background | 1 |
| `#c1c1c1` | background | 1 |

## Typography

### Font Families

- **Geomanist** — used for all (647 elements)
- **Open Sans** — used for body (366 elements)
- **Times New Roman** — used for body (59 elements)
- **Arial** — used for body (4 elements)
- **SF Mono** — used for body (1 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 38px | 2.375rem | 400 | 41.8px | normal | h1 |
| 32px | 2rem | 400 | 35.2px | normal | h2, strong |
| 20px | 1.25rem | 400 | 30px | -0.2px | h3 |
| 18.4px | 1.15rem | 400 | 23px | normal | div |
| 18px | 1.125rem | 600 | 23.4px | 0.4px | div |
| 16px | 1rem | 400 | normal | normal | html, head, meta, title |
| 15.2px | 0.95rem | 400 | 22.8px | normal | div, b, strong, br |
| 14px | 0.875rem | 400 | 21px | normal | span, a, figcaption, code |
| 13.3333px | 0.8333rem | 400 | normal | normal | input |
| 12px | 0.75rem | 400 | 18px | 0.12px | div, time, span, a |
| 11px | 0.6875rem | 600 | 22px | normal | div, th, span, td |

### Heading Scale

```css
h1 { font-size: 38px; font-weight: 400; line-height: 41.8px; }
h2 { font-size: 32px; font-weight: 400; line-height: 35.2px; }
h3 { font-size: 20px; font-weight: 400; line-height: 30px; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: normal; }
```

### Font Weights in Use

`400` (928x), `700` (70x), `600` (70x), `500` (8x), `900` (1x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-14 | 14px | 0.875rem |
| spacing-24 | 24px | 1.5rem |
| spacing-28 | 28px | 1.75rem |
| spacing-32 | 32px | 2rem |
| spacing-44 | 44px | 2.75rem |
| spacing-48 | 48px | 3rem |
| spacing-50 | 50px | 3.125rem |
| spacing-60 | 60px | 3.75rem |
| spacing-64 | 64px | 4rem |
| spacing-105 | 105px | 6.5625rem |
| spacing-140 | 140px | 8.75rem |
| spacing-160 | 160px | 10rem |
| spacing-396 | 396px | 24.75rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 2px | 3 |
| md | 7px | 1 |
| lg | 16px | 3 |
| full | 1057px | 1 |

## Box Shadows

**xs (inset)** — blur: 1.802px
```css
box-shadow: rgba(255, 255, 255, 0.19) 0px 0px 1.802px 0px, rgba(255, 255, 255, 0.1) 0px 0.451px 0px 0.901px inset;
```

**md** — blur: 8px
```css
box-shadow: rgba(0, 0, 0, 0.35) 1px 2px 8px 0px;
```

**md** — blur: 12px
```css
box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px 0px;
```

## CSS Custom Properties

### Colors

```css
--font-family-primary: var(--ghost-font-family, 'Geomanist', system-ui, -apple-system, sans-serif);
--color-white: #FFFFFF;
--color-dark-navy: #1B1728;
--color-midnight-navy: #0E0918;
--color-dark-blue-3: #1f192a;
--color-paragraphs: #c4bbd3;
--color-lavender-gray: #C4BBD3;
--color-darker-gray: #7A7A7A;
--color-soft-gray: #E4E4E4;
--color-light-gray: #e4e4e4;
--color-body: #0E0918;
--color-surface: rgba(255, 255, 255, 0.07);
--color-surface-border: rgba(255, 255, 255, 0.08);
--border-radius: 8px;
--border-radius-large: 16px;
--shadow-card: 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-card-hover: 0 8px 24px rgba(0, 0, 0, 0.15);
--ghost-accent-color: #FD8925;
```

### Spacing

```css
--font-size-h1: 48px;
--font-size-h2: 38px;
--font-size-h3: 32px;
--font-size-h4: 38px;
--font-size-sub-headline: 24px;
--font-size-body-large: 20px;
--font-size-body-small: 16px;
--font-size-button-large: 16px;
--font-size-button-small: 14px;
--font-size-caption-large: 14px;
--font-size-caption-small: 12px;
--spacing-4: 4px;
--spacing-8: 8px;
--spacing-12: 12px;
--spacing-16: 16px;
--spacing-24: 24px;
--spacing-32: 32px;
--spacing-48: 48px;
--spacing-64: 64px;
```

### Typography

```css
--font-family-heading: var(--ghost-font-family, var(--font-family-primary));
--font-family-body: var(--ghost-font-family, var(--font-family-primary));
--font-weight-regular: 400;
--font-weight-book: 400;
--line-height-h1: 1.1;
--line-height-h2: 1.1;
--line-height-h3: 1.2;
--line-height-h4: 110%;
--line-height-sub-headline: 1.5;
--line-height-body-large: 1.5;
--line-height-body-small: 1.5;
--line-height-caption-large: 1.3;
--line-height-caption-small: 1.5;
--line-height-button: 1;
--fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
```

### Shadows

```css
--shadow-button: 0 4px 12px rgba(255, 12, 0, 0.3);
```

### Other

```css
--gradient-orange: linear-gradient(141deg, #077ac7, #6b21ef);
--gradient-github: linear-gradient(to top, rgba(38, 33, 73, 0), rgba(0, 0, 0, 0.42));
--gradient-headline-silver-purple: linear-gradient(96deg, #FFF -10.58%, #7C65A1 123.65%);
--max-width-global: 1460px;
--max-width-hero: 1286px;
--max-width-content: 1120px;
--max-width-header: 1432px;
--max-width-post: 700px;
--transition-fast: 0.2s ease;
--transition-medium: 0.3s ease;
--lightense-z-index: 999999;
--lightense-backdrop: var(--bg-color-80, rgba(255, 255, 255, .98));
--lightense-duration: 300ms;
--lightense-timing-func: cubic-bezier(.2, 0, .1, 1);
--fa-style-family-classic: "Font Awesome 6 Free";
```

### Dependencies

```css
--font-family-primary: --ghost-font-family;
--font-family-heading: --ghost-font-family,--font-family-primary;
--font-family-body: --ghost-font-family,--font-family-primary;
--lightense-backdrop: --bg-color-80;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| xs | 300px | max-width |
| 400px | 400px | max-width |
| sm | 440px | max-width |
| sm | 480px | max-width |
| sm | 520px | max-width |
| sm | 600px | max-width |
| sm | 640px | max-width |
| sm | 670px | max-width |
| sm | 700px | max-width |
| md | 767px | max-width |
| md | 768px | max-width |
| md | 769px | min-width |
| lg | 991px | max-width |
| lg | 1023px | max-width |
| lg | 1024px | max-width |
| lg | 1054px | max-width |
| 1160px | 1160px | max-width |
| 1200px | 1200px | max-width |
| xl | 1280px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.2s`, `0.45s`, `0.3s`, `0.15s`, `0.1s`, `0.09s`, `0.18s`, `0s`

### Common Transitions

```css
transition: all;
transition: 0.2s;
transition: --gradient-glow-x 0.45s, --gradient-glow-y 0.45s, --bg-color-1 0.45s, --bg-color-2 0.45s, --bg-stop-1 0.45s, --bg-stop-2 0.45s;
transition: 0.3s;
transition: opacity 0.15s ease-out 0.3s;
transition: transform 0.3s cubic-bezier(0.2, 0, 0.1, 1);
transition: opacity 0.2s;
transition: transform 0.2s;
transition: color 0.2s;
transition: 0.1s;
```

### Keyframe Animations

**gradient-shift**
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}
```

**fa-beat**
```css
@keyframes fa-beat {
  0%, 90% { transform: scale(1); }
  45% { transform: scale(var(--fa-beat-scale,1.25)); }
}
```

**fa-beat**
```css
@keyframes fa-beat {
  0%, 90% { transform: scale(1); }
  45% { transform: scale(var(--fa-beat-scale,1.25)); }
}
```

**fa-bounce**
```css
@keyframes fa-bounce {
  0% { transform: scale(1) translateY(0px); }
  10% { transform: scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0); }
  30% { transform: scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em)); }
  50% { transform: scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0); }
  57% { transform: scale(1) translateY(var(--fa-bounce-rebound,-.125em)); }
  64% { transform: scale(1) translateY(0px); }
  100% { transform: scale(1) translateY(0px); }
}
```

**fa-bounce**
```css
@keyframes fa-bounce {
  0% { transform: scale(1) translateY(0px); }
  10% { transform: scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0); }
  30% { transform: scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em)); }
  50% { transform: scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0); }
  57% { transform: scale(1) translateY(var(--fa-bounce-rebound,-.125em)); }
  64% { transform: scale(1) translateY(0px); }
  100% { transform: scale(1) translateY(0px); }
}
```

**fa-fade**
```css
@keyframes fa-fade {
  50% { opacity: var(--fa-fade-opacity,.4); }
}
```

**fa-fade**
```css
@keyframes fa-fade {
  50% { opacity: var(--fa-fade-opacity,.4); }
}
```

**fa-beat-fade**
```css
@keyframes fa-beat-fade {
  0%, 100% { opacity: var(--fa-beat-fade-opacity,.4); transform: scale(1); }
  50% { opacity: 1; transform: scale(var(--fa-beat-fade-scale,1.125)); }
}
```

**fa-beat-fade**
```css
@keyframes fa-beat-fade {
  0%, 100% { opacity: var(--fa-beat-fade-opacity,.4); transform: scale(1); }
  50% { opacity: 1; transform: scale(var(--fa-beat-fade-scale,1.125)); }
}
```

**fa-flip**
```css
@keyframes fa-flip {
  50% { transform: rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg)); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (19 instances)

```css
.button {
  background-color: rgb(238, 79, 39);
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Cards (15 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px 0px;
  padding-top: 16px;
  padding-right: 0px;
}
```

### Inputs (4 instances)

```css
.input {
  color: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  border-radius: 0px;
  font-size: 13.3333px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (167 instances)

```css
.link {
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 400;
}
```

### Navigation (60 instances)

```css
.navigatio {
  background-color: rgb(27, 23, 40);
  color: rgb(255, 255, 255);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
}
```

### Footer (119 instances)

```css
.foote {
  color: rgb(228, 228, 228);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 14px;
}
```

### Modals (1 instances)

```css
.modal {
  background-color: rgb(27, 23, 40);
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.35) 1px 2px 8px 0px;
  padding-top: 12px;
  padding-right: 60px;
}
```

### Dropdowns (22 instances)

```css
.dropdown {
  border-radius: 0px;
  border-color: rgb(255, 255, 255);
  padding-top: 0px;
}
```

### Tables (3 instances)

```css
.table {
  border-color: rgb(255, 255, 255);
  cell-style: [object Object];
}
```

### Badges (5 instances)

```css
.badge {
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Avatars (1 instances)

```css
.avatar {
  border-radius: 0px;
}
```

### Tabs (2 instances)

```css
.tab {
  background-color: rgb(254, 254, 254);
  color: rgb(238, 79, 39);
  font-size: 12px;
  font-weight: 500;
  padding-top: 9px;
  padding-right: 0px;
  border-color: rgb(238, 79, 39);
  border-radius: 0px;
}
```

### ProgressBars (1 instances)

```css
.progressBar {
  color: rgb(255, 255, 255);
  border-radius: 0px;
  font-size: 16px;
}
```

### Switches (7 instances)

```css
.switche {
  border-radius: 0px;
  border-color: rgb(255, 255, 255);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Card — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Card — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Card — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Card — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(33, 172, 232, 0.12);
  color: rgb(255, 255, 255);
  padding: 19.2px 25.6px 19.2px 25.6px;
  border-radius: 8px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Link — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgb(27, 23, 40);
  color: rgb(255, 255, 255);
  padding: 16px 16px 16px 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  font-size: 16px;
  font-weight: 400;
```

### Button — 5 instances, 1 variant

**Variant 1** (5 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(228, 228, 228);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(228, 228, 228);
  font-size: 14px;
  font-weight: 400;
```

## Layout System

**1 grid containers** and **111 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1286px | 0px |
| 100% | 0px |
| 700px | 0px |
| 1088px | 0px |
| 1230px | 32px |
| 65% | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 3-column | 1x |

### Grid Templates

```css
grid-template-columns: 378px 378px 378px;
gap: 16px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 64x |
| column/nowrap | 41x |
| row/wrap | 6x |

**Gap values:** `12px`, `16px`, `20px`, `24px`, `32px`, `48px`, `4px`, `64px`, `6px`, `8px`, `8px 12px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 12 passing, 0 failing color pairs

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#4b4b4b` | `#f5f5f5` | 8:1 | AAA |

## Design System Score

**Overall: 84/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 92/100 |
| Typography Consistency | 50/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 5 font families — consider limiting to 2 (heading + body)
- 127 !important rules — prefer specificity over overrides
- 95% of CSS is unused — consider purging
- 22649 duplicate CSS declarations

## Gradients

**10 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| radial | — | 3 | bold |
| linear | to top | 2 | brand |
| linear | — | 3 | bold |
| linear | 63.9655deg | 2 | brand |
| linear | 141deg | 2 | brand |
| linear | 135deg | 3 | bold |
| linear | — | 2 | brand |
| linear | 90deg | 2 | brand |
| linear | 139.215deg | 2 | brand |
| linear | — | 4 | bold |

```css
background: radial-gradient(67.82% 89.62% at 86.97% 105.17%, rgb(64, 6, 167) 0%, rgb(98, 31, 4) 100%);
background: linear-gradient(to top, rgba(38, 33, 73, 0), rgba(0, 0, 0, 0.42));
background: linear-gradient(rgba(255, 255, 255, 0) 100%, rgb(255, 155, 38) 100%, rgba(0, 0, 0, 0) 100%);
background: linear-gradient(63.9655deg, rgb(253, 137, 37) 7.171%, rgb(255, 12, 0) 86.297%);
background: linear-gradient(141deg, rgb(7, 122, 199), rgb(107, 33, 239));
```

## Z-Index Map

**9 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 1000,999998 | nav.m.o.b.i.l.e.-.n.a.v.i.g.a.t.i.o.n, div.g.l.o.b.a.l.-.n.o.t.i.f.i.c.a.t.i.o.n, div.l.i.g.h.t.e.n.s.e.-.b.a.c.k.d.r.o.p |
| sticky | 90,90 | progress.p.o.s.t.-.p.r.o.g.r.e.s.s |
| base | -1,1 | div.h.e.r.o.-.b.a.c.k.g.r.o.u.n.d.-.d.e.c.o.r.a.t.i.o.n, main.g.l.o.b.a.l.-.m.a.i.n, header.h.e.a.d.e.r.-.s.e.c.t.i.o.n |

**Issues:**
- [object Object]

## SVG Icons

**11 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 1 |
| md | 10 |

**Icon colors:** `currentColor`, `#E8E5EB`, `rgb(255, 255, 255)`, `rgb(0, 0, 0)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Font Awesome 6 Free | self-hosted | 900 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 7 | objectFit: fill, borderRadius: 0px, shape: square |
| general | 4 | objectFit: cover, borderRadius: 7px, shape: rounded |
| hero | 2 | objectFit: cover, borderRadius: 8px, shape: rounded |

**Aspect ratios:** 1:1 (5x), 3:2 (2x), 5.65:1 (1x), 4.2:1 (1x), 2.07:1 (1x), 5.48:1 (1x), 3.7:1 (1x), 5.58:1 (1x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `90ms` | 90 |
| `sm` | `180ms` | 180 |
| `md` | `300ms` | 300 |
| `lg` | `450ms` | 450 |

### Easing Families

- **ease-in-out** (4 uses) — `ease`
- **custom** (12 uses) — `cubic-bezier(0.2, 0, 0.1, 1)`, `cubic-bezier(0.4, 0, 0.6, 1)`
- **ease-out** (2 uses) — `cubic-bezier(0, 0, 0.2, 1)`

## Component Anatomy

### card — 8 instances


### button — 6 instances

**Slots:** label, icon
**Variants:** link

| variant | count | sample label |
|---|---|---|
| link | 5 |  |
| default | 1 | SHARE |

### link — 2 instances


## Brand Voice

**Tone:** friendly · **Pronoun:** you-only · **Headings:** Title Case (balanced)

### Top CTA Verbs

- **share** (1)
- **react** (1)
- **human** (1)

### Button Copy Patterns

- "share" (1×)
- "react agent: architecture, implementation, and tradeoffs
newer post" (1×)
- "human-in-the-loop vs. human-on-the-loop: when to use each system
older post" (1×)

### Sample Headings

> Build and Update Workflows with n8n's MCP Server
> Using it: a real example
> How it works
> Connecting your MCP client
> Getting the most out of it
> ReAct Agent: Architecture, Implementation, and Tradeoffs
> Human-in-the-Loop vs. Human-on-the-Loop: When To Use Each System

## Page Intent

**Type:** `blog-post` (confidence 0.83)
**Description:** Get a ready-to-run workflow in a few minutes, built directly in n8n. No more copy-paste, no more back-and-forth.

Alternates: blog (0.3)

## Section Roles

Reading order (top→bottom): logo-wall → nav → footer → nav → steps → footer → comparison → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | logo-wall | — | 0.85 |
| 1 | nav | — | 0.9 |
| 2 | nav | — | 0.9 |
| 3 | steps | Build and Update Workflows with n8n's MCP Server | 0.75 |
| 4 | comparison | ReAct Agent: Architecture, Implementation, and Tradeoffs | 0.7 |
| 5 | footer | — | 0.95 |
| 6 | footer | — | 0.95 |
| 7 | footer | — | 0.4 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.264 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 1057px |
| backdrop-filter in use | no |
| Gradients | 10 |

## Imagery Style

**Label:** `mixed` (confidence 0.077)
**Counts:** total 13, svg 7, icon 7, screenshot-like 0, photo-like 0
**Dominant aspect:** ultra-wide
**Radius profile on images:** square

## Component Screenshots

6 retina crops written to `screenshots/`. Index: `*-screenshots.json`.

| Cluster | Variant | Size (px) | File |
|---------|---------|-----------|------|
| card--default | 0 | 700 × 456 | `screenshots/card-default-0.png` |
| card--default | 1 | 700 × 198 | `screenshots/card-default-1.png` |
| card--default | 2 | 700 × 370 | `screenshots/card-default-2.png` |
| button--default | 0 | 700 × 50 | `screenshots/button-default-0.png` |
| button--default | 1 | 72 × 21 | `screenshots/button-default-1.png` |
| button--default | 2 | 72 × 21 | `screenshots/button-default-2.png` |

Full-page: `screenshots/full-page.png`

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Geomanist` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration

# Graph Report - C:/Users/Dell/.claude/The-Pivot  (2026-05-05)

## Corpus Check
- Corpus is ~7,795 words - fits in a single context window. You may not need a graph.

## Summary
- 90 nodes · 78 edges · 8 communities detected
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.78)
- Token cost: 2,800 input · 950 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Core App Architecture|Core App Architecture]]
- [[_COMMUNITY_TowerScroll Internal Functions|TowerScroll Internal Functions]]
- [[_COMMUNITY_UI Component Design System|UI Component Design System]]
- [[_COMMUNITY_Project Config & Docs|Project Config & Docs]]
- [[_COMMUNITY_HeroCanvas Internal Functions|HeroCanvas Internal Functions]]
- [[_COMMUNITY_Button & Utility Layer|Button & Utility Layer]]
- [[_COMMUNITY_Scroll Animation Stack|Scroll Animation Stack]]
- [[_COMMUNITY_TowerScroll Component|TowerScroll Component]]

## God Nodes (most connected - your core abstractions)
1. `Home Page` - 6 edges
2. `GSAP lib wrapper` - 6 edges
3. `HeroCanvas` - 5 edges
4. `Navbar` - 4 edges
5. `PillCTA (referenced in Navbar/Hero/HeroCanvas)` - 4 edges
6. `RootLayout` - 3 edges
7. `Hero` - 3 edges
8. `Services` - 3 edges
9. `TowerScroll` - 3 edges
10. `Preloader` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Project Configuration` --conceptually_related_to--> `Project Overview (Next.js bootstrapped)`  [INFERRED]
  next.config.ts → README.md
- `Button()` --calls--> `cn()`  [INFERRED]
  src\components\ui\button.tsx → src\lib\utils.ts
- `HeroCanvas` --semantically_similar_to--> `TowerScroll`  [INFERRED] [semantically similar]
  src/components/sections/HeroCanvas.tsx → src/components/sections/TowerScroll.tsx
- `PostCSS Configuration (Tailwind v4)` --conceptually_related_to--> `Button Variants (CVA)`  [INFERRED]
  postcss.config.mjs → src/components/ui/button.tsx
- `ESLint Configuration` --conceptually_related_to--> `Next.js Project Configuration`  [INFERRED]
  eslint.config.mjs → next.config.ts

## Hyperedges (group relationships)
- **GSAP ScrollTrigger Scroll Animation Pattern** — herocanvas_herocanvas, services_services, workgrid_workgrid, towerscroll_towerscroll [INFERRED 0.90]
- **Page Entry Preload Animation Sequence** — layout_rootlayout, preloader_preloader, pageloader_pageloader [INFERRED 0.82]
- **Home Page Section Composition** — page_home, herocanvas_herocanvas, services_services, workgrid_workgrid, footer_footer [EXTRACTED 1.00]
- **Scroll Animation Integration (Lenis + GSAP + ScrollTrigger)** — lenis_LenisProvider, gsap_gsapSetup, lenis_LenisGsapSync [EXTRACTED 1.00]
- **UI Component Design System (Button + PillCTA + cn util)** — button_Button, pillcta_PillCTA, utils_cn [INFERRED 0.85]
- **Project Configuration Cluster (Next.js + ESLint + PostCSS)** — nextconfig_NextConfig, eslint_eslintConfig, postcss_PostCSSConfig [INFERRED 0.90]

## Communities

### Community 0 - "Core App Architecture"
Cohesion: 0.18
Nodes (17): AnimatedCTA, Footer, Hero, HeroCanvas, RootLayout, GSAP lib wrapper, LenisProvider, MegaDropdown COLUMNS service data (+9 more)

### Community 2 - "TowerScroll Internal Functions"
Cohesion: 0.33
Nodes (2): drawFrame(), resizeCanvas()

### Community 3 - "UI Component Design System"
Cohesion: 0.4
Nodes (6): Button Component, Button Brand Color System, Button Variants (CVA), PillCTA Component, PostCSS Configuration (Tailwind v4), cn Utility (clsx + tailwind-merge)

### Community 4 - "Project Config & Docs"
Cohesion: 0.33
Nodes (6): Next.js Agent Rules, Claude AI Instructions, ESLint Configuration, Next.js Project Configuration, Next.js TypeScript Environment Declarations, Project Overview (Next.js bootstrapped)

### Community 6 - "HeroCanvas Internal Functions"
Cohesion: 0.67
Nodes (2): drawFrame(), resizeCanvas()

### Community 7 - "Button & Utility Layer"
Cohesion: 0.5
Nodes (2): cn(), Button()

### Community 8 - "Scroll Animation Stack"
Cohesion: 0.67
Nodes (4): GSAP Setup with ScrollTrigger, Lenis-GSAP Ticker Synchronization, LenisProvider Context Component, useLenis Hook

### Community 10 - "TowerScroll Component"
Cohesion: 0.67
Nodes (3): TowerScroll ANNOTATIONS data, SpecCard (sub-component of TowerScroll), TowerScroll

## Knowledge Gaps
- **11 isolated node(s):** `Footer`, `AnimatedCTA`, `LenisProvider`, `TowerScroll ANNOTATIONS data`, `SpecCard (sub-component of TowerScroll)` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `TowerScroll Internal Functions`** (7 nodes): `done()`, `drawFrame()`, `FRAME_PATH()`, `onScroll()`, `resizeCanvas()`, `updateAnnotations()`, `TowerScroll.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `HeroCanvas Internal Functions`** (4 nodes): `drawFrame()`, `frameSrc()`, `resizeCanvas()`, `HeroCanvas.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button & Utility Layer`** (4 nodes): `cn()`, `button.tsx`, `utils.ts`, `Button()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `HeroCanvas` connect `Core App Architecture` to `TowerScroll Component`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `HeroCanvas` (e.g. with `Hero` and `TowerScroll`) actually correct?**
  _`HeroCanvas` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Footer`, `AnimatedCTA`, `LenisProvider` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
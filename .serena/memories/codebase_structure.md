# Codebase Structure

```
src/
  app/
    layout.tsx        # RootLayout — fonts, LenisProvider, Preloader, PageLoader
    page.tsx          # Home — composes all sections
    globals.css       # Tailwind v4 base styles
  components/
    nav/
      Navbar.tsx      # Top nav with MegaDropdown
      MegaDropdown.tsx
    sections/
      HeroCanvas.tsx  # Canvas frame-sequence animation (frames-hero/*.jpg)
      Services.tsx    # Services section with GSAP ScrollTrigger
      TowerScroll.tsx # Canvas scroll animation (frames/*.jpg + annotations)
      WorkGrid.tsx    # Work/portfolio grid
      Footer.tsx
    ui/
      Preloader.tsx   # GSAP intro animation (fill sweep + zoom cutout)
      PillCTA.tsx     # Pill-shaped CTA button
      button.tsx      # CVA button variants
  lib/
    gsap.ts           # GSAP + ScrollTrigger setup
    lenis.tsx         # LenisProvider context + useLenis hook
    utils.ts          # cn() utility (clsx + tailwind-merge)

public/
  frames/         # 120 JPGs for TowerScroll canvas animation
  frames-hero/    # 41 JPGs for HeroCanvas frame sequence
  frames/videos/  # MP4 videos (concrete, glass, hybrid, etc.)
```

## Key Patterns
- All sections use `useGSAP` hook with `scope` ref
- Canvas animations use `requestAnimationFrame` via GSAP ticker
- Lenis smooth scroll synced to GSAP via `lenis.on('scroll', ScrollTrigger.update)`
- `isolation: 'isolate'` + `mix-blend-mode: destination-out` for Preloader punch effect

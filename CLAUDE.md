# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Warning

**Read `node_modules/next/dist/docs/` before writing any Next.js code.** This project uses Next.js 16 which has breaking changes from training data — APIs, conventions, and file structure may differ. Heed deprecation notices.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint (eslint-config-next/core-web-vitals + typescript)
npm run start    # serve production build
```

No test runner is configured.

## Architecture

### App Router structure

```
src/app/
  layout.tsx              # root layout — fonts, Preloader, LenisProvider, PageTransition
  page.tsx                # home: Navbar + HeroCanvas + VerticalLoopHero + Footer
  services/[slug]/        # individual service pages (statically generated from ALL_SERVICES)
  capabilities/[slug]/    # category pages (statically generated from SERVICE_CATEGORIES)
  contact/                # contact page
```

### Animation stack

Two libraries are wired together and must stay in sync:

- **Lenis** (`src/lib/lenis.tsx`) — smooth scroll. Provided via `LenisProvider` in root layout. Hooks into `gsap.ticker` so ScrollTrigger receives Lenis scroll events via `instance.on('scroll', ScrollTrigger.update)`. Access the Lenis instance with `useLenis()`.
- **GSAP + ScrollTrigger** (`src/lib/gsap.ts`) — animation engine. Import from `@/lib/gsap` (not directly from `gsap`) to ensure ScrollTrigger is registered before use. Use `useGSAP` from `@gsap/react` for component-scoped animations.

All scroll-driven animations depend on Lenis being initialized first. ScrollTrigger is registered client-side only (`typeof window !== 'undefined'`).

### Data layer

All service/category data lives in `src/lib/services-data.ts` as static TypeScript arrays — no API calls. `SERVICE_CATEGORIES` (4 categories) → each has `.items` (ServiceItem[]). Helpers: `getServiceBySlug()`, `getCategoryBySlug()`, `ALL_SERVICES` flat array. Dynamic routes use `generateStaticParams()` from these arrays for full static generation.

### Design tokens

Defined in `src/app/globals.css` `:root`. Brand palette: `--color-bg: #F2F4E7`, `--color-ink: #0A211F`, `--color-accent: #D8FF85`, `--color-dark-bg: #12211D`. Font variables: `--font-display` (Instrument Serif), `--font-body` (Inter Tight). Tailwind v4 is used — config is in `globals.css` via `@theme inline`, not `tailwind.config.js`.

### Page transition

`PageTransition` (`src/components/ui/PageTransition.tsx`) wraps all page content in root layout. On route change it plays a curtain wipe (GSAP timeline, `#0A211F` overlay sliding out) then fades in new content. On initial load it fades content in only.

### Preloader

`Preloader` (`src/components/ui/Preloader.tsx`) renders fixed over everything (`z-index: 99999`). Plays `/videos/preloader.mp4` then fades out via GSAP. Falls back to 3s timeout. Unmounts after exit.

### HeroCanvas

Scroll-driven canvas animation in `src/components/sections/HeroCanvas.tsx`. Preloads 40 JPEG frames from `/frames-hero/frame_000.jpg`–`frame_039.jpg` and paints them to a `<canvas>` element driven by ScrollTrigger scrub.

### Component conventions

- Client components that use hooks/GSAP are marked `'use client'`
- Server components handle data fetching and static generation (service/category pages)
- `cn()` utility in `src/lib/utils.ts` — standard `clsx` + `tailwind-merge` helper
- `@base-ui/react` available for accessible primitives

"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 16;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(2, "0")}.png`;

type SpecRow = {
  label: string;
  value?: string;
  pill?: { tag: string; text: string };
};

type Annotation = {
  id: string;
  show: number;
  hide: number;
  era: string;
  title: string;
  rows: SpecRow[];
  point: { x: number; y: number };
  card: { x: number; y: number };
};

const ANNOTATIONS: Annotation[] = [
  {
    id: "sketch",
    show: 0.05,
    hide: 0.35,
    era: "Phase 01 · Foundation",
    title: "The first mark",
    rows: [
      { label: "Stage", value: "Architectural Sketch" },
      { label: "Medium", pill: { tag: "ORIGIN", text: "CONCEPT TO STRUCTURE" } },
    ],
    point: { x: 50, y: 72 },
    card: { x: 6, y: 52 },
  },
  {
    id: "structure",
    show: 0.38,
    hide: 0.68,
    era: "Phase 02 · Engineering",
    title: "Steel meets intention",
    rows: [
      { label: "Material", value: "Structural steel + concrete" },
      { label: "Phase", pill: { tag: "BUILD", text: "FOUNDATION → ELEVATION" } },
    ],
    point: { x: 50, y: 48 },
    card: { x: 58, y: 12 },
  },
  {
    id: "completion",
    show: 0.7,
    hide: 1.0,
    era: "Phase 03 · The Pivot",
    title: "Built to last",
    rows: [
      { label: "Facade", value: "Full glass curtain wall" },
      { label: "Status", pill: { tag: "COMPLETE", text: "IMPOSSIBLE TO IGNORE" } },
    ],
    point: { x: 50, y: 22 },
    card: { x: 6, y: 14 },
  },
];

function SpecCard({ a }: { a: Annotation }) {
  return (
    <div
      className="absolute w-[78vw] max-w-[360px] md:w-[26vw] md:max-w-[380px]"
      style={{ left: `${a.card.x}%`, top: `${a.card.y}%` }}
    >
      <div
        className="rounded-[22px] p-5 md:p-6"
        style={{
          border: "1px solid rgba(216,255,133,0.15)",
          backgroundColor: "rgba(10,33,31,0.75)",
          boxShadow: "0 24px 60px -20px rgba(0,0,0,0.7)",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
        }}
      >
        <div
          className="font-mono text-[9px] uppercase"
          style={{ letterSpacing: "0.28em", color: "rgba(216,255,133,0.55)" }}
        >
          {a.era}
        </div>
        <h3
          className="mt-2 text-2xl font-medium leading-[0.98] tracking-tight md:text-[28px]"
          style={{ color: "#E8ECE9", fontFamily: "var(--font-display)" }}
        >
          {a.title}
        </h3>

        <div className="mt-5 space-y-3.5">
          {a.rows.map((row, i) => (
            <div key={i}>
              <div
                className="flex items-center gap-2 font-mono text-[9px] uppercase"
                style={{ letterSpacing: "0.22em", color: "rgba(216,255,133,0.5)" }}
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ backgroundColor: "#A8885A" }}
                />
                {row.label}
              </div>
              {row.value && (
                <div
                  className="mt-1 text-sm font-medium leading-tight tracking-tight md:text-base"
                  style={{ color: "#E8ECE9" }}
                >
                  {row.value}
                </div>
              )}
              {row.pill && (
                <div
                  className="mt-1.5 inline-flex items-center gap-1.5 rounded-full py-0.5 pl-1 pr-2.5"
                  style={{
                    border: "1px solid rgba(216,255,133,0.2)",
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                >
                  <span
                    className="rounded-full px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: "#A8885A", color: "#0A211F" }}
                  >
                    {row.pill.tag}
                  </span>
                  <span
                    className="font-mono text-[9.5px] uppercase"
                    style={{ letterSpacing: "0.18em", color: "rgba(216,255,133,0.85)" }}
                  >
                    {row.pill.text}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TowerScroll() {
  const sectionRef     = useRef<HTMLElement | null>(null);
  const canvasRef      = useRef<HTMLCanvasElement | null>(null);
  const introRef       = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const framesRef      = useRef<HTMLImageElement[]>([]);
  const tickingRef     = useRef(false);
  const prevVisibleRef = useRef<string>("");

  const [loaded, setLoaded]   = useState(false);
  const [visible, setVisible] = useState<Set<string>>(new Set());

  // Preload frames
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      const done = () => {
        if (cancelled) return;
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      img.onload = done;
      img.onerror = done;
      imgs.push(img);
    }
    framesRef.current = imgs;
    return () => { cancelled = true; };
  }, []);

  // Canvas engine — identical to big-bang-devini approach
  useEffect(() => {
    if (!loaded) return;
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentFrame = { current: 0 };

    const drawFrame = (index: number) => {
      const img = framesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let drawW: number, drawH: number;
      if (canvasRatio > imgRatio) { drawW = cw; drawH = cw / imgRatio; }
      else { drawH = ch; drawW = ch * imgRatio; }
      if (window.innerWidth <= 768) { drawW *= 1.3; drawH *= 1.3; }
      const drawX = (cw - drawW) / 2;
      const drawY = (ch - drawH) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrame.current);
    };

    const updateAnnotations = (progress: number) => {
      const next = new Set<string>();
      for (const a of ANNOTATIONS) {
        if (progress >= a.show && progress < a.hide) next.add(a.id);
      }
      const key = [...next].sort().join(",");
      if (key !== prevVisibleRef.current) {
        prevVisibleRef.current = key;
        setVisible(next);
      }
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)));

        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        if (frameIndex !== currentFrame.current) {
          currentFrame.current = frameIndex;
          drawFrame(frameIndex);
        }

        if (introRef.current) {
          const opacity = Math.max(0, 1 - progress / 0.08);
          introRef.current.style.opacity = String(opacity);
          introRef.current.style.transform = `translateY(${progress * 40}px)`;
        }

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress})`;
        }

        updateAnnotations(progress);
        tickingRef.current = false;
      });
    };

    resizeCanvas();
    drawFrame(0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      className="scroll-animation relative"
      style={{ backgroundColor: "#0A211F", height: "600vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,33,31,0.6)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0A211F]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A211F]/80 to-transparent" />

        {/* Progress bar */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px]"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            ref={progressBarRef}
            className="h-full origin-left"
            style={{
              background: "linear-gradient(to right, #A8885A, #A8885A)",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-10">
          <div
            className="font-mono text-[11px] uppercase"
            style={{ letterSpacing: "0.28em", color: "rgba(216,255,133,0.6)" }}
          >
            The Pivot / Build
          </div>
          <div
            className="hidden font-mono text-[11px] uppercase md:block"
            style={{ letterSpacing: "0.28em", color: "rgba(216,255,133,0.3)" }}
          >
            From foundation to ambition
          </div>
        </div>

        {/* Intro — fades out on scroll */}
        <div
          ref={introRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <p
            className="font-mono text-[10px] uppercase mb-6"
            style={{ letterSpacing: "0.3em", color: "rgba(216,255,133,0.5)" }}
          >
            Tower Construction Sequence
          </p>
          <h2
            className="max-w-[20ch] text-4xl font-semibold leading-[1.02] tracking-tighter md:text-6xl lg:text-[80px]"
            style={{ fontFamily: "var(--font-display)", color: "#F7F9F2" }}
          >
            The anatomy
            <br />
            <span style={{ color: "#A8885A" }}>of ambition.</span>
          </h2>
          <p
            className="mt-6 max-w-[48ch] text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(247,249,242,0.55)" }}
          >
            From the first line on paper to glass catching the morning light —
            scroll to watch it rise.
          </p>
          <div
            className="mt-12 flex flex-col items-center gap-2"
            style={{ color: "rgba(216,255,133,0.4)" }}
          >
            <div className="font-mono text-[10px] uppercase" style={{ letterSpacing: "0.32em" }}>
              Scroll
            </div>
            <div
              className="h-10 w-[1px]"
              style={{ background: "linear-gradient(to bottom, rgba(216,255,133,0.4), transparent)" }}
            />
          </div>
        </div>

        {/* Annotation cards + connector dots */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {ANNOTATIONS.map((a) => {
            const isVisible = visible.has(a.id);
            return (
              <div
                key={a.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={!isVisible}
              >
                {/* Connector dot */}
                <div
                  className="absolute"
                  style={{ left: `${a.point.x}%`, top: `${a.point.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  {/* Outer pulse ring */}
                  <div
                    className="absolute rounded-full animate-ping"
                    style={{
                      width: 20, height: 20,
                      top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "rgba(216,255,133,0.2)",
                    }}
                  />
                  {/* Inner solid dot */}
                  <div
                    className="relative rounded-full"
                    style={{
                      width: 8, height: 8,
                      backgroundColor: "#A8885A",
                      boxShadow: "0 0 0 2px rgba(216,255,133,0.3), 0 0 12px rgba(216,255,133,0.6)",
                    }}
                  />
                </div>
                <SpecCard a={a} />
              </div>
            );
          })}
        </div>

        {/* Bottom right label */}
        <div
          className="absolute bottom-6 right-6 z-20 hidden font-mono text-[10px] uppercase md:block"
          style={{ letterSpacing: "0.28em", color: "rgba(216,255,133,0.3)" }}
        >
          Build · Phase 01 → 03
        </div>
      </div>
    </section>
  );
}

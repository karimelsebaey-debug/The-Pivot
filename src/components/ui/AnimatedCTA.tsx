"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface AnimatedCTAProps {
  href: string;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "accent" | "dark";
}

export function AnimatedCTA({ href, label, size = "md", variant = "accent" }: AnimatedCTAProps) {
  const labelPad = size === "sm" ? "px-4 py-2" : size === "lg" ? "px-8 py-4" : "px-6 py-3";
  const iconSize  = size === "sm" ? "!w-9 !h-9"  : size === "lg" ? "!w-12 !h-12" : "";
  const textSize  = size === "sm" ? "!text-xs"   : size === "lg" ? "!text-base"  : "";
  const isDark    = variant === "dark";

  return (
    <Link href={href} className="cta-pill" style={isDark ? {
      "--cta-bg":    "var(--color-ink)",
      "--cta-hover": "var(--color-accent)",
      "--cta-fg":    "var(--color-bg)",
      "--cta-fg-hover": "var(--color-ink)",
    } as React.CSSProperties : {}}>
      <span className={`cta-pill-label ${labelPad} ${textSize}`}
        style={isDark ? { backgroundColor: "var(--color-ink)", color: "var(--color-bg)" } : {}}>
        {label}
      </span>
      <div className={`cta-pill-icon ${iconSize}`}
        style={isDark ? { backgroundColor: "var(--color-ink)", color: "var(--color-bg)" } : {}}>
        <ArrowUpRight className="arr-out" size={15} />
        <ArrowUpRight className="arr-in"  size={15} />
      </div>
    </Link>
  );
}

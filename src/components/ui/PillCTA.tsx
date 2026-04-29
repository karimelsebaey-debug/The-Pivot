"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PillCTAProps {
  href: string;
  label: string;
  className?: string;
}

export function PillCTA({ href, label, className = "" }: PillCTAProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex cursor-pointer items-center justify-center gap-0 no-underline ${className}`}
    >
      {/* Text pill — lime bg, dark text → on hover: dark bg, lime text */}
      <span
        className="rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-500 ease-in-out"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-ink)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-ink)'
          ;(e.currentTarget as HTMLElement).style.color = 'var(--color-accent)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-accent)'
          ;(e.currentTarget as HTMLElement).style.color = 'var(--color-ink)'
        }}
      >
        {label}
      </span>

      {/* Arrow circle */}
      <div
        className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-500 ease-in-out"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-ink)',
        }}
      >
        <ArrowUpRight className="absolute size-4 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
        <ArrowUpRight className="absolute size-4 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
      </div>
    </Link>
  );
}

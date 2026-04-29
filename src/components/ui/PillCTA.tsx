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
      className={`group inline-flex cursor-pointer items-center justify-center gap-0 rounded-full ${className}`}
      style={{ textDecoration: "none" }}
    >
      {/* Text pill */}
      <span
        className="rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-500 ease-in-out group-hover:bg-[--color-ink] group-hover:text-[--color-bg]"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--color-ink)",
        }}
      >
        {label}
      </span>

      {/* Arrow circle */}
      <div
        className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full p-3.5 transition-colors duration-500 ease-in-out group-hover:bg-[--color-ink] group-hover:text-[--color-bg]"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--color-ink)",
        }}
      >
        {/* Arrow exits right on hover */}
        <ArrowUpRight
          className="absolute h-4 w-4 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10"
          aria-hidden
        />
        {/* Arrow enters from left on hover */}
        <ArrowUpRight
          className="absolute h-4 w-4 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2"
          aria-hidden
        />
      </div>
    </Link>
  );
}

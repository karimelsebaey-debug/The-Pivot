"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface AnimatedCTAProps {
  href: string;
  label: string;
  size?: "sm" | "md" | "lg";
}

export function AnimatedCTA({ href, label, size = "md" }: AnimatedCTAProps) {
  const padding = size === "sm" ? "px-4 py-2.5" : size === "lg" ? "px-8 py-4" : "px-6 py-3";
  const iconSize = size === "sm" ? "p-2.5" : size === "lg" ? "p-4" : "p-3";
  const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-base" : "text-sm";

  return (
    <Link
      href={href}
      className="group inline-flex cursor-pointer items-center justify-center gap-0"
      style={{ textDecoration: "none" }}
    >
      <span
        className={`rounded-full font-semibold ${padding} ${textSize} duration-500 ease-in-out group-hover:transition-colors`}
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--color-ink)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-ink)";
          (e.currentTarget as HTMLElement).style.color = "var(--color-bg)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent)";
          (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
        }}
      >
        {label}
      </span>
      <div
        className={`relative flex cursor-pointer items-center overflow-hidden rounded-full ${iconSize} duration-500 ease-in-out group-hover:transition-colors`}
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--color-ink)",
        }}
      >
        <ArrowUpRight
          className="absolute h-4 w-4 transition-all duration-500 ease-in-out"
          style={{ transform: "translate(-50%, 0)" }}
        />
        <ArrowUpRight
          className="absolute h-4 w-4 transition-all duration-500 ease-in-out"
          style={{ transform: "translate(-250%, 0)" }}
        />
      </div>
    </Link>
  );
}

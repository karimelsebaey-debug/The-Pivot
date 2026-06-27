"use client";

import Link from "next/link";

interface PillCTAProps {
  href: string;
  label: string;
  className?: string;
  variant?: 'solid' | 'outline';
}

export function PillCTA({ href, label, className = "", variant = "solid" }: PillCTAProps) {
  return (
    <Link href={href} className={`cta-pill ${variant === 'outline' ? 'cta-pill-outline' : ''} ${className}`}>
      <span className="cta-pill-text">{label}</span>
      <span className="cta-pill-text-hover" aria-hidden="true">{label}</span>
    </Link>
  );
}

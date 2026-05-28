"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface PillCTAProps {
  href: string;
  label: string;
  className?: string;
}

export function PillCTA({ href, label, className = "" }: PillCTAProps) {
  return (
    <MagneticButton strength={0.22}>
      <Link href={href} className={`cta-pill ${className}`}>
        <span className="cta-pill-label">{label}</span>
        <div className="cta-pill-icon">
          <ArrowUpRight className="arr-out" size={15} />
          <ArrowUpRight className="arr-in"  size={15} />
        </div>
      </Link>
    </MagneticButton>
  );
}

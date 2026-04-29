"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PillCTAProps {
  href: string;
  label: string;
  className?: string;
}

export function PillCTA({ href, label, className = "" }: PillCTAProps) {
  return (
    <Button
      className={`group not-disabled:inset-shadow-none mx-auto flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent ${className}`}
      render={<Link href={href} />}
    >
      <span className="rounded-full bg-primary px-6 py-3 text-sm font-semibold duration-500 ease-in-out group-hover:bg-secondary group-hover:text-primary group-hover:transition-colors"
        style={{ color: 'var(--primary-foreground)' }}
      >
        {label}
      </span>
      <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-primary p-3.5 duration-500 ease-in-out group-hover:bg-secondary group-hover:text-primary group-hover:transition-colors"
        style={{ color: 'var(--primary-foreground)' }}
      >
        <ArrowUpRight className="absolute h-4 w-4 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
        <ArrowUpRight className="absolute h-4 w-4 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
      </div>
    </Button>
  );
}

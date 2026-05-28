"use client";
import React from "react";

interface TextColorProps {
  words: [string, string, string];
  className?: string;
}

export function TextColor({ words, className = "" }: TextColorProps) {
  return (
    <span className={`flex flex-col ${className}`}>
      <span data-content={words[0]} className="hero-text-bg-1 relative">
        <span
          className="hero-text-fg-1 relative z-10 bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, #407271 0%, #80B1B0 100%)" }}
        >
          {words[0]}
        </span>
      </span>
      <span data-content={words[1]} className="hero-text-bg-2 relative">
        <span
          className="hero-text-fg-2 relative z-10 bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, #407271 0%, #80B1B0 100%)" }}
        >
          {words[1]}
        </span>
      </span>
      <span data-content={words[2]} className="hero-text-bg-3 relative">
        <span
          className="hero-text-fg-3 relative z-10 bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, #80B1B0 0%, #407271 100%)" }}
        >
          {words[2]}
        </span>
      </span>
    </span>
  );
}

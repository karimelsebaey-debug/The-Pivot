"use client";
import React from "react";

interface TextColorProps {
  words: [string, string, string];
  className?: string;
  color?: string;
}

export function TextColor({ words, className = "", color = '#A8885A' }: TextColorProps) {
  return (
    <span className={`flex flex-col ${className}`}>
      <span style={{ color }}>{words[0]}</span>
      <span style={{ color }}>{words[1]}</span>
      <span style={{ color }}>{words[2]}</span>
    </span>
  );
}

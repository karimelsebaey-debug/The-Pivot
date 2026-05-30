"use client";
import React from "react";

interface TextColorProps {
  words: [string, string, string];
  className?: string;
}

export function TextColor({ words, className = "" }: TextColorProps) {
  return (
    <span className={`flex flex-col ${className}`}>
      <span style={{ color: '#A8885A' }}>{words[0]}</span>
      <span style={{ color: '#A8885A' }}>{words[1]}</span>
      <span style={{ color: '#A8885A' }}>{words[2]}</span>
    </span>
  );
}

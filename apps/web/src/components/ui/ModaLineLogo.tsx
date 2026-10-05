"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showIcon?: boolean;
  inverted?: boolean; // True when on dark background
  variant?: "horizontal" | "vertical" | "icon-only";
  size?: "sm" | "md" | "lg";
  href?: string;
}

/**
 * Modaline Haute-Couture Monogram Symbol (Interlocking M & L)
 */
export function ModaLineIcon({
  size = 28,
  className = "",
  inverted = false
}: {
  size?: number;
  className?: string;
  inverted?: boolean;
}) {
  const strokeColor = inverted ? "#FAF9F6" : "#0E0E0E";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
    >
      {/* Outer subtle geometric accent */}
      <circle cx="50" cy="50" r="46" stroke={strokeColor} strokeWidth="1.5" strokeOpacity={inverted ? 0.25 : 0.15} />

      {/* Haute Couture Interlocking M & L Monogram */}
      <g stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Architectural Left Pillar of M */}
        <line x1="28" y1="30" x2="28" y2="70" strokeWidth="4.2" />
        <line x1="35" y1="30" x2="35" y2="70" strokeWidth="2.5" strokeOpacity="0.75" />

        {/* Diagonal Chevron */}
        <polyline points="35,32 50,56 65,32" strokeWidth="4.2" />

        {/* Right Pillar */}
        <line x1="65" y1="30" x2="65" y2="70" strokeWidth="2.5" strokeOpacity="0.75" />
        <line x1="72" y1="30" x2="72" y2="70" strokeWidth="4.2" />

        {/* Flowing Couturier Line & L Base Loop */}
        <path
          d="M 44,70 C 44,58 52,46 60,46 C 68,46 68,58 60,66 L 76,66"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
}

/**
 * Modaline Complete Brand Identity Logo (Icon + High-Fashion Wordmark)
 */
export function ModaLineLogo({
  className = "",
  showIcon = true,
  inverted = false,
  variant = "horizontal",
  size = "md",
  href = "/"
}: LogoProps) {
  const iconSizes = {
    sm: 22,
    md: 28,
    lg: 36
  };

  const textSizes = {
    sm: "text-lg tracking-[0.2em]",
    md: "text-2xl xl:text-3xl tracking-[0.22em]",
    lg: "text-3xl xl:text-4xl tracking-[0.25em]"
  };

  const content = (
    <div
      className={`inline-flex items-center group select-none transition-opacity hover:opacity-85 ${
        variant === "vertical" ? "flex-col gap-1.5 text-center" : "gap-2.5"
      } ${className}`}
    >
      {showIcon && (
        <ModaLineIcon
          size={iconSizes[size]}
          inverted={inverted}
          className="group-hover:scale-105 transition-transform"
        />
      )}

      {variant !== "icon-only" && (
        <div className="flex flex-col items-start leading-none">
          <span
            className={`font-serif font-medium uppercase ${textSizes[size]} ${
              inverted ? "text-white" : "text-neutral-950"
            }`}
          >
            MODALINE
          </span>
          <span
            className={`text-[8px] uppercase tracking-[0.38em] font-mono mt-0.5 ${
              inverted ? "text-neutral-400" : "text-neutral-500"
            } ${variant === "vertical" ? "self-center" : ""}`}
          >
            ATELIER
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="MODALINE Ana Sayfa">
        {content}
      </Link>
    );
  }

  return content;
}

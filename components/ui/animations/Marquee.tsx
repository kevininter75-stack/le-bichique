"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Durée d'un cycle complet en secondes (plus petit = plus rapide) */
  duration?: number;
  /** Sens de défilement */
  reverse?: boolean;
};

/** Bandeau défilant infini. Le contenu est dupliqué pour boucler sans couture. */
export default function Marquee({ children, className, duration = 22, reverse = false }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = track.current;
    if (reduced || !el) return;
    const tween = gsap.to(el, {
      xPercent: reverse ? 50 : -50,
      duration,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [reduced, duration, reverse]);

  return (
    <div className={`overflow-hidden ${className ?? ""}`} aria-hidden="true">
      <div ref={track} className="flex w-max whitespace-nowrap">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}

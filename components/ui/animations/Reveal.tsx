"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Décalage vertical de départ en px */
  y?: number;
};

/** Fade-up générique déclenché à l'entrée dans le viewport. */
export default function Reveal({ children, className, delay = 0, y = 44 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (reduced || !el) return;
    const tween = gsap.fromTo(
      el,
      { y, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1.05,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

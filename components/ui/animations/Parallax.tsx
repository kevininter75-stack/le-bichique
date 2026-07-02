"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Amplitude du déplacement en % de la hauteur (ex. 12 → de -12% à +12%) */
  strength?: number;
};

/**
 * Parallax au scroll : l'enfant glisse verticalement pendant que le bloc traverse
 * le viewport. Mettre un enfant plus grand que le conteneur (ex. scale-115 sur
 * l'image) et overflow-hidden sur le conteneur pour éviter les bords vides.
 */
export default function Parallax({ children, className, strength = 12 }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !outer.current || !inner.current) return;
    const tween = gsap.fromTo(
      inner.current,
      { yPercent: -strength },
      {
        yPercent: strength,
        ease: "none",
        scrollTrigger: {
          trigger: outer.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, strength]);

  return (
    <div ref={outer} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={inner} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}

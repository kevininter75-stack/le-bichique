"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Délai en secondes avant la révélation une fois visible */
  delay?: number;
};

/** Titre/texte révélé ligne par ligne sous masque (style Edem), au scroll. */
export default function TextReveal({ children, as = "h2", className, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (reduced || !el) return;
    const split = SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true });
    const tween = gsap.from(split.lines, {
      yPercent: 115,
      duration: 1.15,
      stagger: 0.09,
      ease: "power4.out",
      delay,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [reduced, delay]);

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}

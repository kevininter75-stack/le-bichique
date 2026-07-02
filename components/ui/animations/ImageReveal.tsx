"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Révélation d'image en clip-path (rideau qui s'ouvre de bas en haut) + dézoom léger. */
export default function ImageReveal({ children, className, delay = 0 }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = wrapper.current;
    if (reduced || !el) return;
    const img = el.firstElementChild;
    if (!img) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      delay,
    });
    tl.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" }
    ).fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.3, ease: "power4.inOut" }, 0);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduced, delay]);

  return (
    <div ref={wrapper} className={className}>
      {children}
    </div>
  );
}

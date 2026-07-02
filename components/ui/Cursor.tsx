"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

const POINTER_QUERY = "(pointer: fine)";

function subscribePointer(callback: () => void) {
  const mq = window.matchMedia(POINTER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * Curseur décoratif : un point précis + un anneau qui suit avec inertie.
 * L'anneau grossit sur les éléments interactifs (liens, boutons, [data-cursor]).
 * Purement décoratif : le curseur natif reste affiché. Desktop uniquement.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(POINTER_QUERY).matches,
    () => false // rendu serveur : pas de curseur custom
  );
  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a, button, [data-cursor]");

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target) && ring.current) {
        gsap.to(ring.current, { scale: 2.1, opacity: 0.5, duration: 0.3 });
      }
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target) && ring.current) {
        gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-or"
      />
      <div
        ref={ring}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-or/70"
      />
    </div>
  );
}

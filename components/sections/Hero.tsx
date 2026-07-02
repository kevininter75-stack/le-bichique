"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { restaurant } from "@/lib/data";
import { gsap, SplitText } from "@/lib/gsap";
import { usePerfTier } from "@/lib/usePerfTier";
import { useReducedMotion } from "@/lib/useReducedMotion";

const Experience = dynamic(() => import("@/components/canvas/Experience"), { ssr: false });

export default function Hero() {
  const tier = usePerfTier();
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const section = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);

  // Chorégraphie d'entrée une fois la scène 3D prête (le voile couvre l'attente)
  useEffect(() => {
    if (!ready || reduced || !section.current) return;
    const ctx = gsap.context(() => {
      const split = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines" });
      gsap
        .timeline()
        .from("[data-hero-kicker]", { y: 24, autoAlpha: 0, duration: 0.8, ease: "power3.out" })
        .from(
          split.lines,
          { yPercent: 115, duration: 1.2, stagger: 0.12, ease: "power4.out" },
          0.15
        )
        .from("[data-hero-text]", { y: 30, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, 0.6)
        .from(
          "[data-hero-cta] > *",
          { y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" },
          0.8
        );

      // Sortie : le contenu remonte et s'estompe quand on scrolle
      gsap.to(content.current, {
        yPercent: -20,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom 45%",
          scrub: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, [ready, reduced]);

  return (
    <section ref={section} className="relative min-h-svh overflow-hidden" aria-label="Accueil">
      {/* Ciel de fin de journée (dégradé CSS, gratuit en perf) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #041f2b 0%, #0a3e58 30%, #4f93a8 45%, #e8a643 52%, #e19b3c 57%, #083247 62%, #083247 100%)",
        }}
      />
      {/* Halo du soleil couchant */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 42% 26% at 32% 50%, rgba(242, 185, 80, 0.42), transparent 70%)",
        }}
      />

      {/* Scène 3D — ou océan statique si reduced-motion */}
      {reduced ? (
        <div
          className="absolute inset-x-0 bottom-0 h-[45%]"
          style={{
            background: "linear-gradient(to bottom, #e8a643 0%, #083247 12%, #17958d 100%)",
          }}
        />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          <Experience tier={tier} onReady={() => setReady(true)} />
        </div>
      )}

      {/* Voile de lisibilité derrière le contenu */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-abysse/65 via-abysse/25 to-transparent" />
      {/* Fondu vers la section suivante pour une transition sans couture */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-56 bg-gradient-to-b from-transparent to-abysse" />

      {/* Voile de chargement, s'efface dès que la scène est prête */}
      {!reduced && (
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center bg-abysse transition-opacity duration-1000 ${
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          <p className="font-display text-2xl text-turquoise animate-pulse">Le Ti Mahi Mahi</p>
        </div>
      )}

      {/* Contenu */}
      <div
        ref={content}
        className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pt-24 pb-16"
      >
        <p
          data-hero-kicker
          className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-ecume"
          style={{ textShadow: "0 1px 16px rgba(4, 31, 43, 0.7)" }}
        >
          Poisson frais &bull; Port de Saint-Gilles, La Réunion
        </p>
        <h1
          data-hero-title
          className="font-display text-6xl leading-[0.95] text-ecume md:text-8xl"
          style={{ textShadow: "0 2px 30px rgba(4, 31, 43, 0.45)" }}
        >
          Le Ti
          <br />
          Mahi Mahi
        </h1>
        <p
          data-hero-text
          className="mt-6 max-w-md text-lg text-ecume md:text-xl"
          style={{ textShadow: "0 1px 18px rgba(4, 31, 43, 0.75)" }}
        >
          {restaurant.tagline}{" "}
          Amarré juste en bas, il ramène le poisson tous les deux ou trois jours — autant dire
          qu&apos;il n&apos;a pas le temps de s&apos;ennuyer.
        </p>
        <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`tel:${restaurant.phoneIntl}`}
            className="rounded-full bg-corail px-8 py-4 font-semibold text-ecume shadow-lg transition-transform hover:scale-105"
          >
            Réserver — {restaurant.phone}
          </a>
          <a
            href="#carte"
            className="rounded-full border-2 border-ecume/70 px-8 py-4 font-semibold text-ecume backdrop-blur-sm transition-colors hover:bg-ecume/10"
          >
            Voir la carte
          </a>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ecume/80"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-ecume/60 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-ecume/80" />
        </div>
      </div>
    </section>
  );
}

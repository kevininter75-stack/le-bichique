"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { restaurant } from "@/lib/data";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Hero photo cinématique : littoral de La Réunion au crépuscule (photo libre de
 * droits, à remplacer par une photo du port de Saint-Gilles / du bateau).
 * Chorégraphie : la photo « se pose » (dézoom), le titre se révèle ligne par
 * ligne sous masque, puis parallax de sortie au scroll.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded || reduced || !section.current) return;
    const ctx = gsap.context(() => {
      // La photo apparaît et se pose doucement
      gsap.fromTo(
        media.current,
        { autoAlpha: 0, scale: 1.12 },
        { autoAlpha: 1, scale: 1, duration: 2.2, ease: "power2.out" }
      );

      const split = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines" });
      gsap
        .timeline({ delay: 0.35 })
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

      // Sortie au scroll : la photo descend moins vite, le contenu remonte
      gsap.to(media.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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
  }, [loaded, reduced]);

  return (
    <section ref={section} className="relative min-h-svh overflow-hidden bg-abysse" aria-label="Accueil">
      {/* Photo plein cadre */}
      <div ref={media} className={`absolute inset-0 ${reduced ? "" : "opacity-0"}`}>
        <Image
          src="/images/hero-ocean-2.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Voiles de lisibilité : haut (nav), gauche (contenu), bas (transition) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-40 bg-gradient-to-b from-abysse/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-abysse/70 via-abysse/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-56 bg-gradient-to-b from-transparent to-abysse" />

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
          Leurs bateaux accostent juste en bas : ce qu&apos;ils remontent du large finit dans vos
          assiettes quelques heures plus tard.
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

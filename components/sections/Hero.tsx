"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { restaurant } from "@/lib/data";
import { usePerfTier } from "@/lib/usePerfTier";
import { useReducedMotion } from "@/lib/useReducedMotion";

const Experience = dynamic(() => import("@/components/canvas/Experience"), { ssr: false });

export default function Hero() {
  const tier = usePerfTier();
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <section className="relative min-h-svh overflow-hidden" aria-label="Accueil">
      {/* Ciel de fin de journée (dégradé CSS, gratuit en perf) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #062736 0%, #0d5d7d 32%, #6fb0c2 45%, #f7c473 52%, #f2b950 57%, #0a4d68 62%, #0a4d68 100%)",
        }}
      />
      {/* Halo du soleil couchant */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 42% 26% at 32% 50%, rgba(255, 217, 138, 0.55), transparent 70%)",
        }}
      />

      {/* Scène 3D — ou océan statique si reduced-motion */}
      {reduced ? (
        <div
          className="absolute inset-x-0 bottom-0 h-[45%]"
          style={{
            background: "linear-gradient(to bottom, #f2b950 0%, #0a4d68 12%, #2ec4b6 100%)",
          }}
        />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          <Experience tier={tier} onReady={() => setReady(true)} />
        </div>
      )}

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
      <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pt-24 pb-16">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-ecume/90">
          Poisson frais &bull; Port de Saint-Gilles, La Réunion
        </p>
        <h1
          className="font-display text-6xl leading-[0.95] text-ecume md:text-8xl"
          style={{ textShadow: "0 2px 30px rgba(4, 31, 43, 0.45)" }}
        >
          Le Ti
          <br />
          Mahi Mahi
        </h1>
        <p className="mt-6 max-w-md text-lg text-ecume/95 md:text-xl">
          {restaurant.tagline}{" "}
          Amarré juste en bas, il ramène le poisson tous les deux ou trois
          jours — autant dire qu&apos;il n&apos;a pas le temps de s&apos;ennuyer.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
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
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ecume/80" aria-hidden="true">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-ecume/60 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-ecume/80" />
        </div>
      </div>
    </section>
  );
}

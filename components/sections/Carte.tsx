"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { carteNote, entrees, mezzes, plats, restaurant, type Dish } from "@/lib/data";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useFinePointer } from "@/lib/useFinePointer";
import { useReducedMotion } from "@/lib/useReducedMotion";
import TextReveal from "@/components/ui/animations/TextReveal";
import Reveal from "@/components/ui/animations/Reveal";

type Service = "midi" | "soir";

export default function Carte() {
  const [service, setService] = useState<Service>("midi");
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const previewEnabled = finePointer && !reduced;

  const preview = useRef<HTMLDivElement>(null);
  const previewVisible = useRef(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const hidePreview = useCallback(() => {
    if (!previewVisible.current || !preview.current) return;
    previewVisible.current = false;
    gsap.to(preview.current, { autoAlpha: 0, scale: 0.92, duration: 0.25, ease: "power2.in" });
  }, []);

  // Les listes remontent à la bascule midi/soir : on force ScrollTrigger à
  // réévaluer les nouveaux éléments déjà visibles, sinon ils restent masqués.
  useEffect(() => {
    ScrollTrigger.refresh();
    hidePreview(); // la ligne survolée vient de disparaître
  }, [service, hidePreview]);

  // Au scroll, la page bouge sous le curseur sans déclencher de mouseleave,
  // et Chrome redéclenche un survol sur la ligne qui atterrit sous la souris.
  // Règle : l'aperçu ne s'affiche que si la souris a vraiment bougé depuis le
  // dernier scroll — un survol sans mouvement réel est un survol fantôme.
  const lastMoveAt = useRef(0);
  const lastScrollAt = useRef(0);
  useEffect(() => {
    if (!previewEnabled) return;
    const onScroll = () => {
      lastScrollAt.current = Date.now();
      hidePreview();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [previewEnabled, hidePreview]);

  // L'aperçu photo suit le curseur avec un léger retard (effet Edem)
  useEffect(() => {
    if (!previewEnabled || !preview.current) return;
    const xTo = gsap.quickTo(preview.current, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(preview.current, "y", { duration: 0.5, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      lastMoveAt.current = Date.now();
      xTo(e.clientX + 28);
      yTo(e.clientY - 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [previewEnabled]);

  const showPreview = (e: React.MouseEvent, src?: string) => {
    if (!previewEnabled || !src || !preview.current) return;
    if (lastMoveAt.current <= lastScrollAt.current) return; // survol induit par le scroll
    setPreviewSrc(src);
    if (!previewVisible.current) {
      // Positionne l'aperçu sur le curseur avant de l'afficher (jamais de position fantôme)
      gsap.set(preview.current, { x: e.clientX + 28, y: e.clientY - 100 });
    }
    previewVisible.current = true;
    gsap.to(preview.current, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" });
  };

  return (
    <section
      id="carte"
      className="relative bg-sable py-28 text-encre md:py-40"
      aria-label="La carte"
      onMouseLeave={hidePreview}
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-lagon">
            La carte
          </p>
        </Reveal>
        <TextReveal
          as="h2"
          className="max-w-3xl font-display text-4xl leading-[1.05] md:text-6xl"
        >
          Courte, vivante, jamais figée.
        </TextReveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg text-encre/70">{carteNote}</p>
        </Reveal>

        {/* Bascule Midi / Soir */}
        <Reveal delay={0.25}>
          <div
            className="mt-12 inline-flex rounded-full border border-encre/15 bg-ecume/60 p-1.5"
            role="tablist"
            aria-label="Service"
          >
            {(["midi", "soir"] as const).map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={service === s}
                onClick={() => setService(s)}
                className={`rounded-full px-7 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  service === s ? "bg-corail text-ecume shadow-md" : "text-encre/60 hover:text-encre"
                }`}
              >
                {s === "midi" ? "Le midi" : "Le soir — mezze"}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Listes de plats */}
        {service === "midi" ? (
          <div key="midi">
            <DishGroup
              title="Les entrées"
              note="Toujours trois : une végétale, une iodée, une au poulpe quand la pêche le permet."
              dishes={entrees}
              onShow={showPreview}
              onHide={hidePreview}
            />
            <DishGroup
              title="Les plats"
              dishes={plats}
              onShow={showPreview}
              onHide={hidePreview}
            />
          </div>
        ) : (
          <div key="soir">
            <DishGroup
              title="Les mezze"
              note="Le soir, tout se pose au milieu de la table et se partage. Lumière tamisée comprise."
              dishes={mezzes}
              onShow={showPreview}
              onHide={hidePreview}
            />
          </div>
        )}

        <Reveal delay={0.1}>
          <a
            href={`tel:${restaurant.phoneIntl}`}
            className="mt-16 inline-block rounded-full bg-lagon px-8 py-4 font-semibold text-ecume shadow-lg transition-transform hover:scale-105"
          >
            Réserver une table — {restaurant.phone}
          </a>
        </Reveal>
      </div>

      {/* Aperçu photo flottant qui suit le curseur (desktop uniquement) */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-30 h-44 w-36 origin-center scale-90 overflow-hidden rounded-xl opacity-0 shadow-2xl"
        style={{ visibility: "hidden" }}
        aria-hidden="true"
      >
        {previewSrc && (
          <Image src={previewSrc} alt="" fill className="object-cover" sizes="144px" />
        )}
      </div>
    </section>
  );
}

function DishGroup({
  title,
  note,
  dishes,
  onShow,
  onHide,
}: {
  title: string;
  note?: string;
  dishes: Dish[];
  onShow: (e: React.MouseEvent, src?: string) => void;
  onHide: () => void;
}) {
  return (
    <div className="mt-16">
      <Reveal>
        <h3 className="font-display text-2xl text-lagon md:text-3xl">{title}</h3>
        {note && <p className="mt-2 max-w-xl text-sm text-encre/60">{note}</p>}
      </Reveal>
      <ul className="mt-6">
        {dishes.map((dish, i) => (
          <li key={dish.name}>
            <Reveal delay={Math.min(i * 0.06, 0.35)} y={28}>
              <div
                className="group flex items-start gap-4 border-b border-encre/10 py-6"
                onMouseEnter={(e) => onShow(e, dish.image)}
                onMouseLeave={onHide}
                data-cursor
              >
                {/* Miniature visible sur mobile/tactile uniquement */}
                {dish.image && (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg md:hidden">
                    <Image src={dish.image} alt="" fill className="object-cover" sizes="48px" />
                  </div>
                )}
                <div>
                  <h4 className="font-display text-xl transition-colors duration-300 group-hover:text-corail md:text-2xl">
                    {dish.name}
                    {dish.badge && (
                      <span className="ml-3 inline-block translate-y-[-3px] rounded-full border border-lagon/40 px-2.5 py-0.5 align-middle text-[11px] font-sans font-semibold uppercase tracking-wider text-lagon">
                        {dish.badge}
                      </span>
                    )}
                  </h4>
                  <p className="mt-1.5 max-w-xl text-encre/70">{dish.description}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

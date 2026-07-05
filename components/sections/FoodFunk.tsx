import Image from "next/image";
import { foodAndFunk, restaurant } from "@/lib/data";
import TextReveal from "@/components/ui/animations/TextReveal";
import Reveal from "@/components/ui/animations/Reveal";
import Parallax from "@/components/ui/animations/Parallax";
import ImageReveal from "@/components/ui/animations/ImageReveal";
import Marquee from "@/components/ui/animations/Marquee";

const marqueeItems = ["FUNKY LAGON", "DJ sets open air", "Maï Taï", "Bières pression", "Face au port"];

export default function FoodFunk() {
  return (
    <section
      id="funkylagon"
      className="relative overflow-hidden bg-abysse py-28 md:py-40"
      aria-label="FUNKY LAGON, le brunch électro"
    >
      {/* Lueur rose piment : la section festive change de température */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 25% 20%, rgba(233, 79, 100, 0.16), transparent 65%), radial-gradient(ellipse 50% 40% at 85% 80%, rgba(242, 185, 80, 0.10), transparent 70%)",
        }}
      />

      {/* Marquee géant d'ouverture */}
      <Marquee className="relative border-y border-piment/20 py-4" duration={18}>
        {marqueeItems.map((item) => (
          <span
            key={item}
            className="mx-8 flex items-center gap-16 font-display text-4xl uppercase text-piment/60 md:text-6xl"
          >
            {item} <span className="text-or">✶</span>
          </span>
        ))}
      </Marquee>

      <div className="relative mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <Reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-piment">
            {foodAndFunk.frequency}
          </p>
        </Reveal>
        <TextReveal
          as="h2"
          className="max-w-3xl font-display text-5xl leading-[0.98] text-ecume md:text-7xl"
        >
          Le dimanche où le port se met à danser.
        </TextReveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg text-ecume/85">{foodAndFunk.pitch}</p>
        </Reveal>

        {/* Déroulé de la journée */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {foodAndFunk.timeline.map((step, i) => (
            <Reveal key={step.label} delay={i * 0.12}>
              <article className="h-full rounded-2xl border border-ecume/10 bg-ecume/[0.04] p-7 backdrop-blur-sm">
                <p className="font-display text-3xl text-or">{step.time}</p>
                <h3 className="mt-3 font-display text-2xl text-ecume">{step.label}</h3>
                <p className="mt-2 leading-relaxed text-ecume/70">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Les deux bars */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {foodAndFunk.bars.map((bar, i) => (
            <Reveal key={bar.name} delay={i * 0.12}>
              <article className="flex h-full items-baseline justify-between gap-6 rounded-2xl border border-piment/25 bg-piment/[0.06] p-7">
                <h3 className="font-display text-2xl text-ecume">{bar.name}</h3>
                <p className="text-right text-ecume/75">{bar.items}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Photos de l'énergie du rendez-vous */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Parallax className="h-full" strength={10}>
              <div className="relative h-full w-full scale-[1.15]">
                <Image
                  src="/images/funky-lagon.jpg"
                  alt="DJ aux platines au coucher du soleil"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Parallax>
          </ImageReveal>
          <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-2xl" delay={0.15}>
            <Parallax className="h-full" strength={10}>
              <div className="relative h-full w-full scale-[1.15]">
                <Image
                  src="/images/funky-lagon-2.jpg"
                  alt="La foule qui danse en plein air face à la mer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Parallax>
          </ImageReveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-5">
            <a
              href={restaurant.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-piment px-8 py-4 font-semibold text-abysse shadow-lg transition-transform hover:scale-105"
            >
              La prochaine date tombe sur Instagram
            </a>
            <p className="text-sm text-ecume/60">
              Repas sur réservation, après-midi en entrée libre.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

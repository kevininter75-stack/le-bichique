import Image from "next/image";
import TextReveal from "@/components/ui/animations/TextReveal";
import Reveal from "@/components/ui/animations/Reveal";
import Parallax from "@/components/ui/animations/Parallax";
import ImageReveal from "@/components/ui/animations/ImageReveal";

export default function Ambiance() {
  return (
    <section id="ambiance" className="relative overflow-hidden bg-abysse py-28 md:py-40" aria-label="L'ambiance">
      {/* Lueur turquoise discrète pour différencier la section de l'Histoire */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 78% 18%, rgba(46, 196, 182, 0.09), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2 md:gap-20">
        {/* Texte */}
        <div>
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-turquoise">
              L&apos;ambiance
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            className="font-display text-4xl leading-[1.05] text-ecume md:text-6xl"
          >
            Les pieds au-dessus du port, la tête en vacances.
          </TextReveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ecume/80">
              Une terrasse suspendue au-dessus du port de plaisance, des parasols à franges, des
              guirlandes qui s&apos;allument quand le soleil descend. Le midi, ça rigole fort ;
              le soir, la lumière se tamise et les mezze se partagent au milieu de la table.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ecume/80">
              Entre amis, en amoureux, en tribu — la maison est tenue par une équipe de pépitas
              qui vous reçoit comme à la maison, en mieux équipé côté poisson.
            </p>
          </Reveal>
        </div>

        {/* Collage photos décalées */}
        <div className="relative">
          <ImageReveal className="relative aspect-[3/4] w-4/5 overflow-hidden rounded-2xl">
            <Parallax className="h-full" strength={8}>
              <div className="relative h-full w-full scale-[1.15]">
                <Image
                  src="/images/terrasse-timahimahi.jpg"
                  alt="La terrasse du Ti Mahi Mahi : parasols à franges, guirlandes et fleurs sur les tables"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </div>
            </Parallax>
          </ImageReveal>
          <ImageReveal
            className="absolute -bottom-12 right-0 aspect-square w-1/2 overflow-hidden rounded-2xl shadow-2xl"
            delay={0.2}
          >
            <Parallax className="h-full" strength={12}>
              <div className="relative h-full w-full scale-[1.15]">
                <Image
                  src="/images/terrasse-soir.jpg"
                  alt="Dîner au bord de l'eau à la tombée de la nuit"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>
            </Parallax>
          </ImageReveal>
        </div>
      </div>

      {/* Bandeau océan doré plein cadre */}
      <div className="mx-auto mt-32 max-w-6xl px-6 md:mt-40">
        <ImageReveal className="relative h-56 overflow-hidden rounded-2xl md:h-80">
          <Parallax className="h-full" strength={14}>
            <div className="relative h-full w-full scale-[1.25]">
              <Image
                src="/images/hero-ocean.jpg"
                alt="Baignade dans le lagon doré au coucher du soleil"
                fill
                className="object-cover object-[50%_65%]"
                sizes="(max-width: 768px) 100vw, 1152px"
              />
            </div>
          </Parallax>
        </ImageReveal>
      </div>
    </section>
  );
}

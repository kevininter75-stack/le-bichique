import Image from "next/image";
import TextReveal from "@/components/ui/animations/TextReveal";
import Reveal from "@/components/ui/animations/Reveal";
import Parallax from "@/components/ui/animations/Parallax";
import ImageReveal from "@/components/ui/animations/ImageReveal";
import Marquee from "@/components/ui/animations/Marquee";

const beats = [
  {
    n: "01",
    title: "Les pêcheurs larguent les amarres",
    text: "Les bateaux de pêche artisanale de Saint-Gilles partent traquer le poisson au large — à la ligne, pas au chalut. On travaille main dans la main avec eux depuis le premier jour.",
    img: "/images/bateau.jpg",
    alt: "Bateau de pêche artisanale sur l'eau",
  },
  {
    n: "02",
    title: "Le poisson touche le quai",
    text: "Tous les deux ou trois jours, on choisit le meilleur de leur retour de pêche, à quelques mètres du restaurant : thon, mahi-mahi, poissons du large. On tranche, on ne triche pas.",
    img: "/images/poisson-frais.jpg",
    alt: "Poissons frais sur glace au retour de pêche",
  },
  {
    n: "03",
    title: "Et file droit en cuisine",
    text: "Carte courte, produits de saison, assiettes qui bougent selon la pêche. Quand on écrit « poisson du jour », le jour compte vraiment.",
    img: "/images/assiette.jpg",
    alt: "Assiette de poisson dressée par la cuisine du Bichique",
  },
];

const marqueeItems = ["Pêcheurs locaux", "Circuits courts", "Carte courte", "Produits péi", "Poisson du jour"];

export default function Histoire() {
  return (
    <section id="histoire" className="relative bg-abysse py-28 md:py-40" aria-label="Notre histoire">
      {/* Intro */}
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-turquoise">
            Notre histoire
          </p>
        </Reveal>
        <TextReveal
          as="h2"
          className="max-w-3xl font-display text-4xl leading-[1.05] text-ecume md:text-6xl"
        >
          Du large à l&apos;assiette, sans détour.
        </TextReveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg text-ecume/80">
            Ici, le circuit court n&apos;est pas un argument marketing : c&apos;est une ligne
            droite entre les bateaux des pêcheurs de Saint-Gilles et votre table.
          </p>
        </Reveal>
      </div>

      {/* Bandeau défilant */}
      <Marquee className="mt-20 border-y border-ecume/10 py-5 md:mt-28">
        {marqueeItems.map((item) => (
          <span
            key={item}
            className="mx-6 flex items-center gap-12 font-display text-2xl uppercase text-ecume/50 md:text-4xl"
          >
            {item} <span className="text-or">✶</span>
          </span>
        ))}
      </Marquee>

      {/* Les 3 temps */}
      <div className="mx-auto mt-24 flex max-w-6xl flex-col gap-24 px-6 md:mt-36 md:gap-40">
        {beats.map((beat, i) => (
          <article
            key={beat.n}
            className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Parallax className="h-full" strength={9}>
                <div className="relative h-full w-full scale-[1.15]">
                  <Image
                    src={beat.img}
                    alt={beat.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </Parallax>
            </ImageReveal>
            <div>
              <Reveal>
                <span className="font-display text-6xl text-or/50 md:text-7xl">{beat.n}</span>
              </Reveal>
              <TextReveal
                as="h3"
                className="mt-4 font-display text-3xl leading-[1.1] text-ecume md:text-5xl"
              >
                {beat.title}
              </TextReveal>
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-ecume/80">{beat.text}</p>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

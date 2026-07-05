import { foodAndFunk, restaurant } from "@/lib/data";
import TextReveal from "@/components/ui/animations/TextReveal";
import Reveal from "@/components/ui/animations/Reveal";

const { address, hours } = restaurant;

export default function Infos() {
  return (
    <section id="infos" className="bg-sable py-28 text-encre md:py-40" aria-label="Infos pratiques">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:gap-20">
        {/* Horaires, adresse, contact */}
        <div>
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-lagon">
              Infos pratiques
            </p>
          </Reveal>
          <TextReveal as="h2" className="font-display text-4xl leading-[1.05] md:text-6xl">
            On vous garde une table ?
          </TextReveal>

          <div className="mt-10 space-y-6">
            {[hours.midi, hours.soir].map((h) => (
              <Reveal key={h.label}>
                <div className="flex items-baseline justify-between gap-6 border-b border-encre/10 pb-5">
                  <div>
                    <h3 className="font-display text-2xl">{h.label}</h3>
                    <p className="mt-1 text-encre/60">{h.days}</p>
                  </div>
                  <p className="whitespace-nowrap font-display text-xl text-lagon">{h.time}</p>
                </div>
              </Reveal>
            ))}
            <Reveal>
              <div className="flex items-baseline justify-between gap-6 border-b border-encre/10 pb-5">
                <div>
                  <h3 className="font-display text-2xl">{foodAndFunk.name}</h3>
                  <p className="mt-1 text-encre/60">{foodAndFunk.frequency}</p>
                </div>
                <p className="whitespace-nowrap font-display text-xl text-piment">12h — 22h</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <address className="mt-8 not-italic leading-relaxed text-encre/75">
              {address.street}
              <br />
              {address.postalCode} {address.city}, {address.region}
              <br />
              Juste au-dessus du port de plaisance.
            </address>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${restaurant.phoneIntl}`}
                className="rounded-full bg-corail px-8 py-4 font-semibold text-ecume shadow-lg transition-transform hover:scale-105"
              >
                Réserver — {restaurant.phone}
              </a>
              <a
                href={restaurant.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-encre/25 px-8 py-4 font-semibold transition-colors hover:border-lagon hover:text-lagon"
              >
                Instagram
              </a>
            </div>
          </Reveal>
        </div>

        {/* Plan */}
        <Reveal delay={0.15} className="min-h-[380px]">
          <div className="h-full min-h-[380px] overflow-hidden rounded-2xl border border-encre/10 shadow-lg">
            <iframe
              title="Plan d'accès au Bichique, port de Saint-Gilles-les-Bains"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=55.2130%2C-21.0655%2C55.2325%2C-21.0500&layer=mapnik&marker=${restaurant.geo.lat}%2C${restaurant.geo.lng}`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { restaurant } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mentions légales — La Bichique",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-28">
      <Link href="/" className="text-sm text-turquoise hover:text-or">
        ← Retour au site
      </Link>
      <h1 className="mt-6 font-display text-4xl text-ecume md:text-5xl">Mentions légales</h1>

      <div className="mt-10 space-y-8 leading-relaxed text-ecume/80">
        <section>
          <h2 className="font-display text-2xl text-ecume">Site de démonstration</h2>
          <p className="mt-2">
            {restaurant.name} est un <strong className="text-ecume">restaurant fictif</strong>.
            Ce site est un projet de démonstration réalisé dans le cadre d&apos;un portfolio de
            développeur web. L&apos;adresse, le numéro de téléphone, les horaires et la carte
            présentés sont inventés ; toute ressemblance avec un établissement existant serait
            fortuite.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ecume">Éditeur du site</h2>
          <p className="mt-2">
            Kevin — développeur web
            <br />
            Contact : kevin.inter75@gmail.com
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ecume">Hébergement</h2>
          <p className="mt-2">
            Vercel Inc.
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
            <br />
            vercel.com
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ecume">Crédits & propriété intellectuelle</h2>
          <p className="mt-2">
            Les photographies proviennent d&apos;Unsplash (utilisées conformément à leur
            licence) ou de l&apos;auteur du site. Typographies Fraunces et
            Outfit via Google Fonts. Plan d&apos;accès fourni par OpenStreetMap.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ecume">Données personnelles</h2>
          <p className="mt-2">
            Ce site ne collecte aucune donnée personnelle et n&apos;utilise pas de cookies de
            suivi.
          </p>
        </section>
      </div>
    </main>
  );
}

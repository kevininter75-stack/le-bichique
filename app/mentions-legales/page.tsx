import type { Metadata } from "next";
import Link from "next/link";
import { restaurant } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mentions légales — Le Ti Mahi Mahi",
  robots: { index: false },
};

/**
 * ⚠️ Les champs entre crochets sont à compléter avec les informations
 * officielles du restaurant avant la mise en ligne publique.
 */
export default function MentionsLegales() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-28">
      <Link href="/" className="text-sm text-turquoise hover:text-or">
        ← Retour au site
      </Link>
      <h1 className="mt-6 font-display text-4xl text-ecume md:text-5xl">Mentions légales</h1>

      <div className="mt-10 space-y-8 leading-relaxed text-ecume/80">
        <section>
          <h2 className="font-display text-2xl text-ecume">Éditeur du site</h2>
          <p className="mt-2">
            {restaurant.name}
            <br />
            [Forme juridique — ex. SARL, SAS] au capital de [montant] €
            <br />
            {restaurant.address.street}, {restaurant.address.postalCode}{" "}
            {restaurant.address.city}, {restaurant.address.region}
            <br />
            SIRET : [numéro SIRET]
            <br />
            Téléphone : {restaurant.phone}
            <br />
            Directeur de la publication : [nom du gérant]
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
          <h2 className="font-display text-2xl text-ecume">Propriété intellectuelle</h2>
          <p className="mt-2">
            L&apos;ensemble des contenus de ce site (textes, photographies, identité visuelle)
            est la propriété du {restaurant.name} ou de leurs auteurs respectifs. Certaines
            photographies d&apos;illustration proviennent d&apos;Unsplash et sont utilisées
            conformément à leur licence.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ecume">Données personnelles</h2>
          <p className="mt-2">
            Ce site ne collecte aucune donnée personnelle et n&apos;utilise pas de cookies de
            suivi. Le plan d&apos;accès est fourni par OpenStreetMap ; sa consultation est
            soumise aux conditions de la fondation OpenStreetMap.
          </p>
        </section>
      </div>
    </main>
  );
}

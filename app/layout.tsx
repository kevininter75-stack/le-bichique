import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import { restaurant } from "@/lib/data";
import "./globals.css";

// Données structurées schema.org pour le référencement local
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  servesCuisine: ["Poisson", "Fruits de mer", "Créole", "Asiatique"],
  telephone: restaurant.phoneIntl,
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address.street,
    addressLocality: restaurant.address.city,
    postalCode: restaurant.address.postalCode,
    addressRegion: restaurant.address.region,
    addressCountry: restaurant.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: restaurant.geo.lat,
    longitude: restaurant.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "12:00",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "19:00",
      closes: "21:30",
    },
  ],
  acceptsReservations: "True",
  sameAs: [restaurant.social.instagram],
};

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ⚠️ à remplacer par l'URL Vercel réelle après le déploiement
  metadataBase: new URL("https://le-bichique.vercel.app"),
  title: "Le Bichique — Poisson frais & mezze au port de Saint-Gilles",
  description:
    "Restaurant fictif de poisson frais au-dessus du port de Saint-Gilles-les-Bains, La Réunion. Poisson des pêcheurs locaux : tartares signature le midi, mezze à partager le soir, et le brunch électro FUNKY LAGON tous les 2-3 mois. Site de démonstration.",
  openGraph: {
    title: "Le Bichique — Poisson frais & mezze au port de Saint-Gilles",
    description:
      "Le poisson arrive du port. Pas du congélateur. Tartares signature le midi, mezze le soir, brunch électro FUNKY LAGON tous les 2-3 mois.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#041f2b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Lien d'évitement pour la navigation clavier */}
        <a
          href="#contenu"
          className="sr-only z-50 rounded-full bg-or px-6 py-3 font-semibold text-abysse focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}

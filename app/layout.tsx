import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "Le Ti Mahi Mahi — Poisson frais & mezze au port de Saint-Gilles",
  description:
    "Restaurant de poisson frais au-dessus du port de Saint-Gilles-les-Bains, La Réunion. Notre bateau pêche, vous vous régalez : tartares signature le midi, mezze à partager le soir, et le brunch électro FOOD&FUNK tous les deux mois.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

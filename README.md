# Le Bichique 🐟

Site vitrine d'un **restaurant fictif** de poisson frais au port de Saint-Gilles-les-Bains (La Réunion) — un projet de démonstration front-end orienté **motion design**.

**🌊 Démo en ligne : [le-bichique.vercel.app](https://le-bichique.vercel.app)**

> Le Bichique n'existe pas : nom, adresse, téléphone et carte sont inventés. Toute ressemblance avec un établissement réel serait fortuite.

## Le concept

Un restaurant qui travaille avec les pêcheurs locaux : la carte change au rythme de la pêche, mezze à partager le soir, et un brunch électro (« FUNKY LAGON ») un dimanche tous les 2-3 mois. Le site raconte cette histoire avec une direction artistique « créole chic » : palette lagon/crépuscule, typographies Fraunces & Outfit, textes écrits sur mesure dans un ton complice.

## Points techniques

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **Animations** : GSAP (ScrollTrigger, SplitText) + Lenis
  - Titres révélés ligne par ligne sous masque
  - Images en clip-reveal + parallax différencié au scroll
  - Marquees infinis, curseur personnalisé
  - Carte interactive : bascule Midi/Soir animée, aperçu photo qui suit le curseur au survol des plats (avec gestion des survols fantômes déclenchés par le scroll)
- **Accessibilité** : `prefers-reduced-motion` respecté (site utilisable en statique), navigation clavier, lien d'évitement, contrastes AA, canvas et éléments décoratifs `aria-hidden`
- **SEO** : métadonnées Open Graph, image de partage 1200×630 générée au build (`next/og`), JSON-LD `Restaurant` (schema.org), sitemap, robots
- **Performance** : images optimisées (`next/image` + sources compressées mozjpeg), fonts self-hostées via `next/font`, zéro dépendance superflue

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run lint       # ESLint
```

## Structure

```
app/                  # layout (fonts, SEO, JSON-LD), page, OG image, 404, mentions légales
components/
  sections/           # Hero, Histoire, Carte, Ambiance, FoodFunk, Infos, Footer
  ui/animations/      # TextReveal, Reveal, Parallax, ImageReveal, Marquee (réutilisables)
  ui/                 # Nav, Cursor
  providers/          # SmoothScroll (Lenis + ScrollTrigger)
lib/                  # data.ts (contenu du restaurant), gsap.ts, hooks
public/images/        # photos (Unsplash, licence libre)
```

## Crédits

Photographies : [Unsplash](https://unsplash.com) (licence libre). Typographies : Fraunces & Outfit (Google Fonts). Plan : OpenStreetMap.

---

Développé par **Kevin** — kevin.inter75@gmail.com

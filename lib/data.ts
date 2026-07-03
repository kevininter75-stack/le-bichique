/**
 * Source unique de vérité pour les infos du restaurant.
 * ⚠️ Les horaires et liens réseaux sont des valeurs provisoires à confirmer avec le restaurant.
 * La carte change très souvent : les plats ci-dessous illustrent la STRUCTURE
 * (entrées vg/poisson/poulpe, tartares, carpaccio, poisson en cuisson, une viande,
 * un plat végétal, poulpe/calamar selon la pêche) — pas le menu du jour.
 */

export const restaurant = {
  name: "Le Ti Mahi Mahi",
  tagline: "Les pêcheurs du coin pêchent. Vous, vous régalez.",
  address: {
    street: "167 rue du Général de Gaulle",
    city: "Saint-Gilles-les-Bains",
    commune: "Saint-Paul",
    postalCode: "97434",
    region: "La Réunion",
    country: "FR",
  },
  geo: { lat: -21.0578, lng: 55.2227 },
  phone: "0692 10 90 66",
  phoneIntl: "+262692109066",
  // À confirmer avec le restaurant
  hours: {
    midi: { label: "Le midi", days: "Du mardi au dimanche", time: "12h — 14h30" },
    soir: { label: "Le soir", days: "Du jeudi au samedi", time: "19h — 22h" },
  },
  social: {
    instagram: "https://www.instagram.com/letimahimahi/",
    facebook: "https://www.facebook.com/", // à compléter
  },
} as const;

export type Dish = {
  name: string;
  description: string;
  badge?: "Végé" | "Poisson" | "Viande" | "Selon la pêche" | "Signature" | "À partager";
  image?: string;
};

export const carteNote =
  "La carte change au rythme de la pêche et des saisons — ce qui suit donne le ton, pas le menu du jour.";

/** Les 3 entrées types : une végétale, une iodée, une au poulpe quand la pêche le permet. */
export const entrees: Dish[] = [
  {
    name: "Vapeurs du moment",
    description:
      "Ravioles vapeur aux légumes péi, bouillon citronnelle-gingembre. La touche asiatique de la maison, dès l'entrée.",
    badge: "Végé",
    image: "/images/table-partage.jpg",
  },
  {
    name: "Gravlax combava",
    description: "Poisson mariné 48 heures, crème coco-raifort, herbes du jardin.",
    badge: "Poisson",
    image: "/images/gravlax.jpg",
  },
  {
    name: "Poulpe snacké",
    description:
      "Grillé au feu vif, vinaigrette tamarin, cacahuètes torréfiées. Quand la mer le veut bien — sinon une deuxième entrée végétale prend le relais.",
    badge: "Selon la pêche",
    image: "/images/salade.jpg",
  },
];

/** Les plats types de la carte du midi. */
export const plats: Dish[] = [
  {
    name: "Tartare de thon « Ti Classique »",
    description:
      "Thon de la pêche locale, gingembre, combava, huile de sésame. Notre signature depuis le premier jour — le poisson a dormi en mer avant-hier.",
    badge: "Signature",
    image: "/images/tartare-thon.jpg",
  },
  {
    name: "Tartare de mahi-mahi coco-passion",
    description:
      "Le poisson qui a donné son nom à la maison, réveillé par le lait coco, la passion et un tour de piment doux.",
    badge: "Signature",
    image: "/images/tartare-mahi.jpg",
  },
  {
    name: "Carpaccio du retour de pêche",
    description:
      "Tranché minute selon ce que les pêcheurs ont remonté. Huile d'olive citronnée, fleur de sel, point final.",
    image: "/images/carpaccio.jpg",
  },
  {
    name: "Poisson du jour en cuisson",
    description:
      "Snacké ou rôti selon la pièce, beurre blanc au combava, légumes de saison. Quand le poisson est de cette fraîcheur, on ne le dérange pas trop.",
    image: "/images/poisson-grille.jpg",
  },
  {
    name: "Poulpe ou calamar, selon la pêche",
    description:
      "Flammé au wok, laqué soja-tamarin, riz croustillant. C'est la mer qui décide, pas nous.",
    badge: "Selon la pêche",
    image: "/images/mezze.jpg",
  },
  {
    name: "Le plat végétal",
    description:
      "Curry doux de légumes péi au lait coco, condiment mangue verte. Végétarien, mais personne ne s'en plaint.",
    badge: "Végé",
    image: "/images/plat-fleurs.jpg",
  },
  {
    name: "La viande du moment",
    description:
      "Une seule viande, bien choisie : caramélisée façon bò khô ou rôtie aux épices douces, selon l'humeur des pépitas.",
    badge: "Viande",
    image: "/images/assiette-signature.jpg",
  },
];

/** Le soir : format mezze, à partager. */
export const mezzes: Dish[] = [
  {
    name: "Rillettes de poisson fumé maison",
    description: "Fumées doucement au bois, à tartiner sans compter.",
    badge: "À partager",
    image: "/images/mezze.jpg",
  },
  {
    name: "Samoussas péi",
    description: "Pliés à la main, garnis du poisson de la semaine.",
    image: "/images/table-partage.jpg",
  },
  {
    name: "Tataki flammé",
    description: "Saisi une poignée de secondes, servi tiède, sauce soja-tamarin.",
    image: "/images/tataki.jpg",
  },
  {
    name: "Achards de légumes péi",
    description: "Croquants, safranés, le compagnon de tout le reste.",
    badge: "Végé",
    image: "/images/salade.jpg",
  },
  {
    name: "Bao du moment",
    description: "Moelleux, garni du poisson du jour ou des légumes du marché.",
    image: "/images/poisson-grille.jpg",
  },
  {
    name: "La douceur du moment",
    description: "Le dessert change selon l'humeur des pépitas en cuisine. Faites confiance.",
    image: "/images/dessert.jpg",
  },
];

export const foodAndFunk = {
  name: "FOOD&FUNK",
  frequency: "Tous les deux mois",
  brunch: "Brunch de 12h à 14h30",
  after: "DJ set open air jusqu'au coucher du soleil",
  pitch:
    "Un brunch iodé, puis les platines prennent le relais face au port. Ça c'est plutôt cool non ?",
} as const;

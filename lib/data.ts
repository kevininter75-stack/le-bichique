/**
 * Source unique de vérité pour les infos du restaurant.
 * ⚠️ Les horaires et liens réseaux sont des valeurs provisoires à confirmer avec le restaurant.
 */

export const restaurant = {
  name: "Le Ti Mahi Mahi",
  tagline: "Notre bateau pêche. Vous, vous régalez.",
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
    instagram: "https://www.instagram.com/", // à compléter
    facebook: "https://www.facebook.com/", // à compléter
  },
} as const;

export type Dish = {
  name: string;
  description: string;
  badge?: string;
  image?: string;
};

export const menuMidi: Dish[] = [
  {
    name: "Tartare de thon rouge « Ti Classique »",
    description:
      "Notre signature depuis le premier jour : thon du bateau, gingembre, combava, huile de sésame. Le poisson a dormi en mer avant-hier.",
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
      "Tranché minute selon ce que le capitaine a remonté. Huile d'olive citronnée, fleur de sel, point final.",
    image: "/images/carpaccio.jpg",
  },
  {
    name: "Poisson grillé du jour",
    description:
      "Entier ou en filet, grillé simplement — quand le poisson est de cette fraîcheur, on ne le dérange pas trop.",
    image: "/images/poisson-grille.jpg",
  },
  {
    name: "Le Pain Bateau",
    description:
      "Notre sandwich marin : poisson snacké, achards croquants, sauce des pépitas. À manger face au port, évidemment.",
    image: "/images/pain-bateau.jpg",
  },
  {
    name: "Salade fraîcheur lagon",
    description:
      "Poisson mi-cuit, mangue verte, herbes du jardin, vinaigrette combava. Légère comme un après-midi à l'Ermitage.",
    image: "/images/salade.jpg",
  },
];

export const menuSoir: Dish[] = [
  {
    name: "Rillettes de poisson fumé maison",
    description: "Fumées doucement au bois, à tartiner sans compter.",
    image: "/images/rillettes.jpg",
  },
  {
    name: "Samoussas du capitaine",
    description: "Pliés à la main, garnis du poisson de la semaine.",
    image: "/images/samoussas.jpg",
  },
  {
    name: "Gravlax combava",
    description: "Mariné 48h, tranché fin, parfumé comme un jardin créole.",
    image: "/images/gravlax.jpg",
  },
  {
    name: "Achards de légumes péi",
    description: "Croquants, safranés, le compagnon de tout le reste.",
    image: "/images/achards.jpg",
  },
  {
    name: "Tataki flammé au feu de bois",
    description: "Saisi une poignée de secondes, servi tiède, sauce soja-tamarin.",
    image: "/images/tataki.jpg",
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

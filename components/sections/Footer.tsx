import { restaurant } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-ecume/10 bg-abysse py-14">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-10 px-6">
        <div>
          <p className="font-display text-2xl text-ecume">Le Ti Mahi Mahi</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ecume/60">
            {restaurant.tagline}
          </p>
        </div>
        <div className="text-sm leading-relaxed text-ecume/60">
          <p>
            {restaurant.address.street}
            <br />
            {restaurant.address.postalCode} {restaurant.address.city}, {restaurant.address.region}
          </p>
          <a href={`tel:${restaurant.phoneIntl}`} className="mt-2 inline-block text-ecume/80 transition-colors hover:text-or">
            {restaurant.phone}
          </a>
        </div>
        <div className="text-sm">
          <a
            href={restaurant.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ecume/80 transition-colors hover:text-or"
          >
            Instagram — @letimahimahi
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-ecume/10 px-6 pt-6">
        <p className="text-xs text-ecume/40">
          © {new Date().getFullYear()} Le Ti Mahi Mahi — Fait avec le cœur (et du poisson frais)
          au-dessus du port de Saint-Gilles.
        </p>
      </div>
    </footer>
  );
}

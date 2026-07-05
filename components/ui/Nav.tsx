import { restaurant } from "@/lib/data";

const links = [
  { href: "#histoire", label: "L'histoire" },
  { href: "#carte", label: "La carte" },
  { href: "#funkylagon", label: "FUNKY LAGON" },
  { href: "#infos", label: "Infos" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Navigation principale"
      >
        <a href="#" className="font-display text-xl text-ecume">
          La Bichique
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ecume/90 transition-colors hover:text-or"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`tel:${restaurant.phoneIntl}`}
          className="rounded-full bg-ecume/15 px-5 py-2 text-sm font-semibold text-ecume backdrop-blur-md transition-colors hover:bg-corail"
        >
          Réserver
        </a>
      </nav>
    </header>
  );
}

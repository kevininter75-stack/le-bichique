import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";

/** Sections à venir dans les prochaines phases — ancres déjà en place. */
function PlaceholderSection({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-32">
      <h2 className="font-display text-4xl text-ecume/40">{title}</h2>
      <p className="mt-3 text-sm text-ecume/30">Section en cours de construction…</p>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <PlaceholderSection id="histoire" title="L'histoire" />
      <PlaceholderSection id="carte" title="La carte" />
      <PlaceholderSection id="ambiance" title="L'ambiance" />
      <PlaceholderSection id="foodfunk" title="FOOD&FUNK" />
      <PlaceholderSection id="infos" title="Infos pratiques" />
    </main>
  );
}

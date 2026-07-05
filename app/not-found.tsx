import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-turquoise">Erreur 404</p>
      <h1 className="mt-4 font-display text-5xl leading-[1.02] text-ecume md:text-7xl">
        Cette page a filé
        <br />
        entre les mailles du filet.
      </h1>
      <p className="mt-6 max-w-md text-lg text-ecume/75">
        Même nos pêcheurs ne l&apos;ont pas retrouvée. Le poisson, lui, est toujours à la carte.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-corail px-8 py-4 font-semibold text-abysse shadow-lg transition-transform hover:scale-105"
      >
        Retour au port
      </Link>
    </main>
  );
}

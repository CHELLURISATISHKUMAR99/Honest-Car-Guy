import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-red">
          404 · Page not found
        </p>
        <h1 className="headline text-6xl text-black sm:text-7xl">
          Wrong turn.
        </h1>
        <p className="serif mt-4 text-lg text-gray">
          We couldn’t find that one. Let’s get you back on the road.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/car-finder" className="btn btn-ghost">
            Try the Car Finder
          </Link>
        </div>
      </div>
    </section>
  );
}

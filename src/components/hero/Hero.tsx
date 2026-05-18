import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-cream">
      <div className="mx-auto max-w-7xl px-[5%] py-32 sm:py-40">
        <p className="mb-6 inline-block rounded-full border border-cream/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          The Honest Car Guy Podcast
        </p>
        <h1 className="headline max-w-4xl text-6xl leading-[0.95] sm:text-7xl md:text-8xl">
          Car buying advice that works for <span className="text-red">you</span>,
          <span className="serif normal-case text-gold"> not the dealership.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-cream/80">
          A weekly podcast, a 7-step Car Finder, and a directory of dealers who post their prices in public.
          Built independently. Sponsorships are clearly labeled.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/car-finder" className="btn btn-primary">
            Find your next car
          </Link>
          <Link
            href="/podcast"
            className="btn border border-cream/30 text-cream hover:bg-cream hover:text-black"
          >
            Listen to the podcast
          </Link>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-red/20 blur-3xl" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
    </section>
  );
}

import Link from 'next/link';
import { Hero } from '@/components/hero/Hero';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { EpisodeGrid } from '@/components/podcast/EpisodeGrid';
import { DealerGrid } from '@/components/dealers/DealerGrid';
import { episodes } from '@/lib/data/episodes';
import { dealers } from '@/lib/data/dealers';

const FINDER_STEPS = [
  { n: 1, label: 'Budget', text: 'Tell us your out-the-door comfort zone.' },
  { n: 2, label: 'Body style', text: 'Sedan, SUV, truck, minivan, or open.' },
  { n: 3, label: 'Fuel', text: 'Gas, hybrid, EV, or no preference.' },
  { n: 4, label: 'Seats', text: 'How many people you regularly carry.' },
  { n: 5, label: 'Primary use', text: 'Commute, family, work, or adventure.' },
  { n: 6, label: 'Priorities', text: 'Pick up to three things that matter most.' },
  { n: 7, label: 'ZIP', text: 'So we can match nearby trusted dealers.' },
];

export default function HomePage() {
  const recent = episodes.slice(-3).reverse();
  const certified = dealers
    .filter((d) => d.tier !== 'listed')
    .slice(0, 3);

  return (
    <>
      <Hero />

      <section className="section">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="On the show"
            title="Latest episodes"
            description="Independent reviews, dealership tactics decoded, and real shopper questions answered weekly."
          />
          <EpisodeGrid episodes={recent} />
          <div className="mt-10">
            <Link href="/podcast" className="btn btn-ghost">
              All episodes
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-black text-cream">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Car Finder"
            title="7 questions. Your top 5 cars."
            description="A guided flow that scores every vehicle in our database against your budget, your priorities, and how you actually live."
            className="text-cream [&_h2]:text-cream [&_p]:text-cream/70"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FINDER_STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-cream/15 bg-cream/[0.03] p-5"
              >
                <div className="headline text-3xl text-gold">
                  {String(s.n).padStart(2, '0')}
                </div>
                <div className="mt-2 font-semibold">{s.label}</div>
                <p className="mt-1 text-sm text-cream/70">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link href="/car-finder" className="btn btn-primary">
              Start the Car Finder
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Vetted dealers"
            title="Dealers who post their prices in public."
            description="Every certified and premier dealer has signed our transparency pledge: out-the-door pricing, no hidden add-ons, and inspection reports on request."
          />
          <DealerGrid dealers={certified} />
          <div className="mt-10">
            <Link href="/dealers" className="btn btn-ghost">
              Browse the directory
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-red text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              For dealers
            </p>
            <h2 className="headline text-4xl sm:text-5xl">
              Get in front of buyers who actually intend to buy.
            </h2>
            <p className="serif mt-4 text-lg text-cream/85">
              Three transparent tiers. Real leads with full ZIP, budget, and priorities — never scraped, never resold.
            </p>
          </div>
          <Link
            href="/packages"
            className="btn bg-cream text-red hover:bg-black hover:text-cream"
          >
            See dealer packages
          </Link>
        </div>
      </section>
    </>
  );
}

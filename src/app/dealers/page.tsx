import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { DealerGrid } from '@/components/dealers/DealerGrid';
import { dealers } from '@/lib/data/dealers';

export const metadata: Metadata = {
  title: 'Certified dealers',
  description:
    'A directory of independently vetted dealerships that post out-the-door pricing and welcome pre-purchase inspections.',
};

export default function DealersPage() {
  const tiers = ['premier', 'certified', 'listed'] as const;
  const ordered = [...dealers].sort(
    (a, b) => tiers.indexOf(a.tier) - tiers.indexOf(b.tier),
  );

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Dealer directory"
          title="Find a dealer who acts like one of us."
          description="Premier and certified dealers have signed our transparency pledge. Listed dealers are vetted by our team but have not committed to the full pledge."
        />

        <div className="mb-10 flex flex-wrap gap-4 text-xs">
          <span className="badge badge-gold">Premier — featured + pledge</span>
          <span className="badge badge-red">Certified — pledge signed</span>
          <span className="badge badge-gray">Listed — vetted</span>
        </div>

        <DealerGrid dealers={ordered} />

        <div className="mt-16 rounded-2xl border border-black/10 bg-white p-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="headline text-2xl text-black sm:text-3xl">Run a dealership?</h3>
            <p className="mt-2 max-w-xl text-sm text-gray">
              Read the pledge, then apply to be listed. We review every application — paying doesn’t guarantee approval.
            </p>
          </div>
          <div className="mt-6 flex gap-3 sm:mt-0">
            <Link href="/dealers/pledge" className="btn btn-ghost">
              Read pledge
            </Link>
            <Link href="/dealers/apply" className="btn btn-primary">
              Apply
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

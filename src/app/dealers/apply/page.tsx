import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { DealerApplyFlow } from '@/components/dealers/DealerApplyFlow';

export const metadata: Metadata = {
  title: 'Apply to join the directory',
  description:
    'Apply to be listed in the AutoInfo4U dealer directory. Every application is reviewed personally.',
};

const TIERS = ['listed', 'certified', 'premier'] as const;
type Tier = (typeof TIERS)[number];

interface Props {
  searchParams?: { tier?: string };
}

export default function ApplyPage({ searchParams }: Props) {
  const requestedTier = searchParams?.tier as Tier | undefined;
  const initialTier = requestedTier && TIERS.includes(requestedTier) ? requestedTier : undefined;

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Dealer application"
          title="Apply to join the directory."
          description={
            <>
              We review every application personally. Paying doesn’t guarantee approval — and we mean
              that.{' '}
              <Link href="/dealers/pledge" className="font-semibold text-red hover:underline">
                Read the pledge first
              </Link>
              .
            </>
          }
        />
        <DealerApplyFlow initialTier={initialTier} />
      </div>
    </section>
  );
}

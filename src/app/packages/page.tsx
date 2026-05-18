import type { Metadata } from 'next';
import { SectionHeader } from '@/components/shared/SectionHeader';
import {
  PackageGrid,
  dealerPackages,
  sponsorPackages,
} from '@/components/packages/PackageGrid';

export const metadata: Metadata = {
  title: 'Packages',
  description:
    'Dealer directory tiers and podcast sponsorship packages. Transparent pricing, real audience, clearly labeled placements.',
};

export default function PackagesPage() {
  return (
    <>
      <section className="section">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="For dealers & sponsors"
            title="Reach buyers who already did their homework."
            description="The shoppers who use our Car Finder show up to dealerships informed and ready. Choose a tier that fits your goals."
          />
          <PackageGrid
            title="Dealer directory packages"
            description="Tiered placement in the directory, with optional certification and lead routing."
            packages={dealerPackages}
          />
        </div>
      </section>

      <section className="section bg-black text-cream">
        <div className="mx-auto max-w-7xl">
          <PackageGrid
            title="Podcast sponsorship"
            description="Read by the host, recorded fresh per arc, and clearly labeled. No surprise endorsements."
            packages={sponsorPackages}
          />
        </div>
      </section>
    </>
  );
}

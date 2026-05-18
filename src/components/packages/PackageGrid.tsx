import { cn } from '@/lib/utils/cn';

interface Pkg {
  name: string;
  price: number;
  cadence: string;
  highlight?: boolean;
  bullets: string[];
}

interface Props {
  title: string;
  description?: string;
  packages: Pkg[];
}

export const dealerPackages: Pkg[] = [
  {
    name: 'Listed',
    price: 99,
    cadence: 'per month',
    bullets: [
      'Public listing in the dealer directory',
      'Name, location, contact, specialties',
      'Up to 5 inventory highlights',
    ],
  },
  {
    name: 'Certified',
    price: 199,
    cadence: 'per month',
    highlight: true,
    bullets: [
      'Everything in Listed',
      'Independent vetting + certified badge',
      'Priority in Car Finder matches',
      'Lead routing via SMS + email',
    ],
  },
  {
    name: 'Premier',
    price: 399,
    cadence: 'per month',
    bullets: [
      'Everything in Certified',
      'Featured dealer on the home page',
      'One sponsored podcast mention per quarter',
      'Dedicated dealer page with reviews',
    ],
  },
];

export const sponsorPackages: Pkg[] = [
  {
    name: 'Episode Spot',
    price: 500,
    cadence: 'per episode',
    bullets: [
      '60-second mid-roll read',
      'Show notes link',
      'One social call-out',
    ],
  },
  {
    name: 'Series Sponsor',
    price: 1500,
    cadence: 'per 4-episode arc',
    highlight: true,
    bullets: [
      'Mid-roll in 4 consecutive episodes',
      'Pre-roll mention',
      'Logo on episode artwork',
    ],
  },
  {
    name: 'Season Sponsor',
    price: 4500,
    cadence: 'per quarter',
    bullets: [
      'Title sponsor for a 12-episode season',
      'Pre- and mid-roll in every episode',
      'Featured placement on the site',
      'Quarterly performance report',
    ],
  },
];

export function PackageGrid({ title, description, packages }: Props) {
  return (
    <div>
      <h3 className="headline text-3xl sm:text-4xl">{title}</h3>
      {description && (
        <p className="mt-3 max-w-2xl opacity-80">{description}</p>
      )}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={cn(
              'card flex h-full flex-col',
              pkg.highlight && 'ring-2 ring-red',
            )}
          >
            {pkg.highlight && (
              <span className="badge badge-red mb-4 self-start">Most popular</span>
            )}
            <h4 className="headline text-2xl text-black">{pkg.name}</h4>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-black">
                ${pkg.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray">{pkg.cadence}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-black/80">
              {pkg.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-red">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={cn(
                'btn mt-8',
                pkg.highlight ? 'btn-primary' : 'btn-ghost',
              )}
            >
              Get started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

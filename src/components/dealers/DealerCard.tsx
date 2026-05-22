import type { Dealer } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

interface Props {
  dealer: Dealer;
}

const TIER_LABEL: Record<Dealer['tier'], string> = {
  premier: 'Premier',
  certified: 'Certified',
  listed: 'Listed',
};

const TIER_BADGE: Record<Dealer['tier'], string> = {
  premier: 'badge-gold',
  certified: 'badge-red',
  listed: 'badge-gray',
};

export function DealerCard({ dealer }: Props) {
  return (
    <article className="card flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-black">{dealer.name}</h3>
          <p className="mt-1 text-sm text-gray">
            {dealer.city}, {dealer.state}
            {dealer.yearsInBusiness && ` · ${dealer.yearsInBusiness} yrs`}
          </p>
        </div>
        <span className={cn('badge', TIER_BADGE[dealer.tier])}>
          {TIER_LABEL[dealer.tier]}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm text-black/80">{dealer.blurb}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {dealer.specialties.map((s) => (
          <span
            key={s}
            className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-gray"
          >
            {s}
          </span>
        ))}
      </div>

      {(dealer.phone || dealer.website || dealer.inventoryUrl) && (
        <div className="mt-6 border-t border-black/10 pt-4">
          {dealer.inventoryUrl && (
            <a
              href={dealer.inventoryUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mb-3 w-full text-xs"
            >
              View their inventory
            </a>
          )}
          <div className="flex items-center justify-between text-xs text-gray">
            {dealer.phone && <span>{dealer.phone}</span>}
            {dealer.website && (
              <a
                href={dealer.website}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-red hover:underline"
              >
                Visit site →
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

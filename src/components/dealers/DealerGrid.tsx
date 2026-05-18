import type { Dealer } from '@/lib/types';
import { DealerCard } from './DealerCard';

interface Props {
  dealers: Dealer[];
}

export function DealerGrid({ dealers }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dealers.map((dealer) => (
        <DealerCard key={dealer.id} dealer={dealer} />
      ))}
    </div>
  );
}

import type { Episode } from '@/lib/types';
import { EpisodeCard } from './EpisodeCard';

interface Props {
  episodes: Episode[];
}

export function EpisodeGrid({ episodes }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}

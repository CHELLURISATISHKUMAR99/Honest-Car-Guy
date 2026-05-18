import type { Episode } from '@/lib/types';

interface Props {
  episode: Episode;
}

export function EpisodeCard({ episode }: Props) {
  return (
    <article className="card flex h-full flex-col">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray">
        <span>Episode {String(episode.number).padStart(3, '0')}</span>
        <span>{episode.durationMinutes} min</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-black">
        {episode.title}
      </h3>
      {episode.guest && (
        <p className="serif mt-2 text-sm text-red">with {episode.guest}</p>
      )}
      <p className="mt-3 flex-1 text-sm text-gray">{episode.summary}</p>
      <div className="mt-6 flex items-center justify-between text-xs text-gray">
        <span className="badge badge-gray">{episode.topic}</span>
        <time dateTime={episode.publishedAt}>
          {new Date(episode.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </div>
    </article>
  );
}

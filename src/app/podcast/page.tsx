import type { Metadata } from 'next';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { EpisodeGrid } from '@/components/podcast/EpisodeGrid';
import { episodes } from '@/lib/data/episodes';

export const metadata: Metadata = {
  title: 'Podcast',
  description:
    'Every episode of Info For You Auto — independent car-buying advice, dealership tactics decoded, and listener questions answered.',
};

export default function PodcastPage() {
  const ordered = [...episodes].sort((a, b) => b.number - a.number);

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The podcast"
          title="Every episode."
          description="No sponsored picks, no dealership ghost-writers. Real shopper questions, real teardowns of what the industry hopes you don’t notice."
        />
        <EpisodeGrid episodes={ordered} />
      </div>
    </section>
  );
}

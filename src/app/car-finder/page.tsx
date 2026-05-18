import type { Metadata } from 'next';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FinderFlow } from '@/components/finder/FinderFlow';

export const metadata: Metadata = {
  title: 'Car Finder',
  description:
    'Answer 7 questions and get the 5 cars that actually fit your budget, your priorities, and how you live.',
};

export default function CarFinderPage() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="7 questions"
          title="Find the car that actually fits you."
          description="No make/model guesswork. Tell us how you live and we’ll rank our database against your priorities."
          align="center"
        />
        <FinderFlow />
      </div>
    </section>
  );
}

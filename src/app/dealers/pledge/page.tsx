import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeader } from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Transparency pledge',
  description:
    'The six commitments every Info For You Auto certified and premier dealer signs. Read it before you walk into one of our partner lots.',
};

const COMMITMENTS = [
  {
    title: 'Out-the-door pricing on first contact',
    body: 'Every quote includes the doc fee, taxes, and any dealer-installed accessories. No new numbers introduced at the finance desk.',
  },
  {
    title: 'No market adjustments above MSRP',
    body: 'New vehicles are sold at or below the manufacturer’s suggested retail price. No "additional dealer markup" line items.',
  },
  {
    title: 'Reply to leads within 4 business hours',
    body: 'Real human replies, not autoresponders. Response time is tracked and published on the dealer’s profile.',
  },
  {
    title: 'Pre-purchase inspections always welcome',
    body: 'Buyers can take any used vehicle to an outside mechanic before signing — no questions, no extra fees, no pressure to skip it.',
  },
  {
    title: 'No mandatory add-ons',
    body: 'Paint protection, nitrogen fills, VIN etching, extended warranties — all optional. Refusing them never changes the advertised price.',
  },
  {
    title: 'Free vehicle history report on every used car',
    body: 'CarFax or AutoCheck provided to every shopper, every time, without asking. Accidents and prior use disclosed up front.',
  },
];

const PERFORMANCE_THRESHOLDS = [
  { metric: 'Lead response time', certified: 'Median < 2 hours', premier: 'Median < 60 minutes' },
  { metric: 'Lead response rate', certified: '≥ 90%', premier: '≥ 95%' },
  { metric: '90-day shopper NPS', certified: '≥ 50', premier: '≥ 70' },
  { metric: 'Quote → contract price delta', certified: 'Median ≤ $100', premier: 'Median ≤ $50' },
  { metric: 'Complaint rate', certified: '< 3 per 100 leads', premier: '< 1 per 100 leads' },
];

export default function PledgePage() {
  return (
    <>
      <section className="section">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Editorial standard"
            title="The Transparency Pledge."
            description="Six commitments. Every Certified and Premier dealer signs them publicly. We monitor them with hard metrics. Fall below the bar and the badge is removed."
          />

          <div className="space-y-5">
            {COMMITMENTS.map((c, i) => (
              <div key={c.title} className="card">
                <div className="flex items-start gap-5">
                  <span className="headline text-4xl text-red">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{c.title}</h3>
                    <p className="mt-2 text-sm text-gray">{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-black text-cream">
        <div className="mx-auto max-w-4xl">
          <h3 className="headline text-3xl text-cream sm:text-4xl">
            We measure it.
          </h3>
          <p className="serif mt-3 text-lg text-cream/80">
            Pledges without measurement are marketing. Here’s the bar every certified and premier dealer must clear, every month.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-cream/15">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream/[0.03] text-xs uppercase tracking-widest text-gold">
                <tr>
                  <th className="px-5 py-4">Metric</th>
                  <th className="px-5 py-4">Certified</th>
                  <th className="px-5 py-4">Premier</th>
                </tr>
              </thead>
              <tbody>
                {PERFORMANCE_THRESHOLDS.map((row) => (
                  <tr key={row.metric} className="border-t border-cream/10">
                    <td className="px-5 py-4 font-semibold">{row.metric}</td>
                    <td className="px-5 py-4 text-cream/85">{row.certified}</td>
                    <td className="px-5 py-4 text-cream/85">{row.premier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-sm text-cream/70">
            Dealers below threshold for 60 days are demoted. Bait-and-switch pricing, fake reviews,
            hidden accident history, or refusing a pre-purchase inspection trigger immediate removal
            from the directory — regardless of tier or payment status.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="headline text-3xl text-black sm:text-4xl">
            Run a dealership that already operates this way?
          </h3>
          <p className="mt-4 text-gray">
            Apply to join the directory. We review every application — paying doesn’t guarantee approval.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dealers/apply" className="btn btn-primary">
              Apply to join
            </Link>
            <Link href="/packages" className="btn btn-ghost">
              See packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

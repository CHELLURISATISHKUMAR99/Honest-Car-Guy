'use client';

import { useMemo, useState } from 'react';
import { vehicles } from '@/lib/data/vehicles';
import { dealers } from '@/lib/data/dealers';
import type {
  BodyStyle,
  FinderAnswers,
  Fuel,
  PrimaryUse,
  Priority,
  ScoredVehicle,
} from '@/lib/types';
import { scoreVehicles } from '@/lib/utils/scoring';
import {
  directionsUrl,
  findDealersForUser,
  type DealerMatch,
} from '@/lib/utils/dealer-match';
import { cn } from '@/lib/utils/cn';

const STEPS = [
  'Budget',
  'Primary use',
  'Seats',
  'Priorities',
  'Body style',
  'Fuel',
  'ZIP code',
] as const;

const BUDGETS: number[] = [20000, 30000, 40000, 55000, 80000];

const BODY_OPTIONS: { value: BodyStyle | 'any'; label: string }[] = [
  { value: 'any', label: 'Open to anything' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'truck', label: 'Truck' },
  { value: 'minivan', label: 'Minivan' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'wagon', label: 'Wagon' },
];

const FUEL_OPTIONS: { value: Fuel | 'any'; label: string }[] = [
  { value: 'any', label: 'No preference' },
  { value: 'gas', label: 'Gas' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'phev', label: 'Plug-in hybrid' },
  { value: 'ev', label: 'Electric' },
  { value: 'diesel', label: 'Diesel' },
];

const SEATS: number[] = [2, 4, 5, 6, 7, 8];

const USE_OPTIONS: { value: PrimaryUse; label: string; sub: string }[] = [
  { value: 'commute', label: 'Daily commute', sub: 'Efficient, easy to live with' },
  { value: 'family', label: 'Family hauler', sub: 'Safety and space first' },
  { value: 'work', label: 'Work / hauling', sub: 'Payload and durability' },
  { value: 'adventure', label: 'Weekend adventure', sub: 'AWD, cargo, capability' },
  { value: 'mixed', label: 'A bit of everything', sub: 'Balanced all-rounder' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'reliability', label: 'Reliability' },
  { value: 'fuel-economy', label: 'Fuel economy' },
  { value: 'safety', label: 'Safety' },
  { value: 'cargo', label: 'Cargo / space' },
  { value: 'tech', label: 'Tech' },
  { value: 'performance', label: 'Performance' },
  { value: 'comfort', label: 'Comfort' },
  { value: 'value', label: 'Value' },
];

const DEFAULT_ANSWERS: FinderAnswers = {
  budgetMax: 30000,
  bodyStyle: 'any',
  fuel: 'any',
  seats: 5,
  primaryUse: 'mixed',
  priorities: [],
  zip: '',
};

export function FinderFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>(DEFAULT_ANSWERS);
  const [submitted, setSubmitted] = useState(false);

  const zipValid = /^\d{5}$/.test(answers.zip);
  const canNext = useMemo(() => {
    const name = STEPS[step];
    if (name === 'Priorities') return answers.priorities.length >= 1 && answers.priorities.length <= 3;
    if (name === 'ZIP code') return zipValid;
    return true;
  }, [step, answers.priorities.length, zipValid]);

  const results: ScoredVehicle[] = useMemo(
    () => (submitted ? scoreVehicles(answers, vehicles) : []),
    [submitted, answers],
  );

  const dealerMatches: DealerMatch[] = useMemo(
    () => (submitted ? findDealersForUser(answers, dealers, 4) : []),
    [submitted, answers],
  );

  function update<K extends keyof FinderAnswers>(key: K, value: FinderAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function togglePriority(p: Priority) {
    setAnswers((prev) => {
      const next = prev.priorities.includes(p)
        ? prev.priorities.filter((x) => x !== p)
        : prev.priorities.length >= 3
          ? prev.priorities
          : [...prev.priorities, p];
      return { ...prev, priorities: next };
    });
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function next() {
    if (step === STEPS.length - 1) {
      setSubmitted(true);
      return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  function restart() {
    setAnswers(DEFAULT_ANSWERS);
    setStep(0);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <Results
        results={results}
        dealerMatches={dealerMatches}
        zip={answers.zip}
        onRestart={restart}
      />
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-gray">
          <span>
            Step {step + 1} of {STEPS.length}
          </span>
          <span>{STEPS[step]}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full bg-red transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="card">
        {STEPS[step] === 'Budget' && (
          <Step title="What’s your top-end budget?" subtitle="Out-the-door price you’d be comfortable with.">
            <Choices
              options={BUDGETS.map((b) => ({ value: b, label: `Up to $${b.toLocaleString()}` }))}
              value={answers.budgetMax}
              onChange={(v) => update('budgetMax', v)}
            />
          </Step>
        )}

        {STEPS[step] === 'Primary use' && (
          <Step title="How will you mostly use the vehicle?">
            <div className="grid gap-3 sm:grid-cols-2">
              {USE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update('primaryUse', opt.value)}
                  className={cn(
                    'rounded-2xl border-2 p-5 text-left transition-colors',
                    answers.primaryUse === opt.value
                      ? 'border-red bg-red/5'
                      : 'border-black/10 hover:border-black/30',
                  )}
                >
                  <div className="font-semibold text-black">{opt.label}</div>
                  <div className="mt-1 text-sm text-gray">{opt.sub}</div>
                </button>
              ))}
            </div>
          </Step>
        )}

        {STEPS[step] === 'Seats' && (
          <Step title="How many seats do you need?">
            <Choices
              options={SEATS.map((s) => ({ value: s, label: `${s} seats` }))}
              value={answers.seats}
              onChange={(v) => update('seats', v)}
            />
          </Step>
        )}

        {STEPS[step] === 'Priorities' && (
          <Step
            title="Pick your top 3 priorities"
            subtitle={`Selected ${answers.priorities.length}/3`}
          >
            <div className="flex flex-wrap gap-2">
              {PRIORITY_OPTIONS.map((p) => {
                const active = answers.priorities.includes(p.value);
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => togglePriority(p.value)}
                    className={cn(
                      'rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'border-red bg-red text-cream'
                        : 'border-black/15 text-black hover:border-black/40',
                    )}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {STEPS[step] === 'Body style' && (
          <Step title="Which body style fits your life?">
            <Choices
              options={BODY_OPTIONS}
              value={answers.bodyStyle}
              onChange={(v) => update('bodyStyle', v)}
            />
          </Step>
        )}

        {STEPS[step] === 'Fuel' && (
          <Step title="What kind of fuel?">
            <Choices
              options={FUEL_OPTIONS}
              value={answers.fuel}
              onChange={(v) => update('fuel', v)}
            />
          </Step>
        )}

        {STEPS[step] === 'ZIP code' && (
          <Step title="What’s your ZIP code?" subtitle="So we can show nearby dealers with your matches.">
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={answers.zip}
              onChange={(e) =>
                update('zip', e.target.value.replace(/\D/g, '').slice(0, 5))
              }
              placeholder="e.g. 78704"
              className="w-full max-w-xs rounded-xl border-2 border-black/15 px-4 py-3 text-lg tracking-widest outline-none focus:border-red"
            />
            {!zipValid && answers.zip.length > 0 && (
              <p className="mt-2 text-xs text-red">Enter a valid 5-digit ZIP.</p>
            )}
          </Step>
        )}

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="btn btn-ghost disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="btn btn-primary disabled:opacity-40"
          >
            {step === STEPS.length - 1 ? 'See my top 5' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="headline text-3xl text-black sm:text-4xl">{title}</h3>
      {subtitle && <p className="mt-2 text-sm text-gray">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

interface Option<T> {
  value: T;
  label: string;
}

function Choices<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-2xl border-2 px-5 py-3 text-sm font-medium transition-colors',
              active
                ? 'border-red bg-red text-cream'
                : 'border-black/15 text-black hover:border-black/40',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Results({
  results,
  dealerMatches,
  zip,
  onRestart,
}: {
  results: ScoredVehicle[];
  dealerMatches: DealerMatch[];
  zip: string;
  onRestart: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-red">
          Your top 5
        </p>
        <h3 className="headline text-4xl text-black sm:text-5xl">
          Here are the cars that fit you.
        </h3>
        <p className="mt-3 text-gray">
          Ranked against your budget, use case, and the priorities you picked.
        </p>
      </div>

      <ol className="space-y-4">
        {results.map((r, i) => (
          <li key={r.vehicle.id} className="card flex flex-col gap-4 sm:flex-row">
            <div className="flex w-16 items-start justify-center">
              <span className="headline text-5xl text-red">{i + 1}</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-xl font-semibold text-black">
                  {r.vehicle.year} {r.vehicle.make} {r.vehicle.model}
                  {r.vehicle.trim && (
                    <span className="text-gray"> {r.vehicle.trim}</span>
                  )}
                </h4>
                <span className="text-sm font-semibold text-red">
                  From ${r.vehicle.msrpFrom.toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-black/80">{r.vehicle.blurb}</p>
              {r.reasons.length > 0 && (
                <ul className="mt-4 space-y-1.5 border-l-2 border-gold pl-4 text-sm text-gray">
                  {r.reasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>

      {dealerMatches.length > 0 && (
        <div className="mt-16">
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-red">
              Trusted dealers
            </p>
            <h3 className="headline text-3xl text-black sm:text-4xl">
              Where to actually buy near {zip}.
            </h3>
            <p className="mt-2 text-gray">
              Ranked by proximity to your ZIP, your specialty match, and our transparency tier.
            </p>
          </div>

          <ul className="space-y-4">
            {dealerMatches.map((m) => (
              <li key={m.dealer.id} className="card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold text-black">
                      {m.dealer.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray">
                      {m.dealer.city}, {m.dealer.state}
                      {m.dealer.yearsInBusiness &&
                        ` · ${m.dealer.yearsInBusiness} yrs`}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'badge',
                      m.dealer.tier === 'premier' && 'badge-gold',
                      m.dealer.tier === 'certified' && 'badge-red',
                      m.dealer.tier === 'listed' && 'badge-gray',
                    )}
                  >
                    {m.dealer.tier}
                  </span>
                </div>

                <p className="mt-3 text-sm text-black/80">{m.dealer.blurb}</p>

                {m.reasons.length > 0 && (
                  <ul className="mt-4 space-y-1.5 border-l-2 border-gold pl-4 text-sm text-gray">
                    {m.reasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={directionsUrl(m.dealer)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary text-xs"
                  >
                    Get directions
                  </a>
                  {m.dealer.phone && (
                    <a
                      href={`tel:${m.dealer.phone.replace(/\D/g, '')}`}
                      className="btn btn-ghost text-xs"
                    >
                      Call {m.dealer.phone}
                    </a>
                  )}
                  {m.dealer.website && (
                    <a
                      href={m.dealer.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-red hover:underline"
                    >
                      Visit website →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <button type="button" onClick={onRestart} className="btn btn-ghost">
          Start over
        </button>
      </div>
    </div>
  );
}

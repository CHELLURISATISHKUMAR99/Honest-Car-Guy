'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils/cn';

const TIER_OPTIONS = [
  {
    value: 'listed',
    label: 'Listed',
    price: 99,
    summary: 'Directory listing. Real-business verification only.',
    requiresPledge: false,
  },
  {
    value: 'certified',
    label: 'Certified',
    price: 199,
    summary: 'Signed pledge + monitored performance. Red badge.',
    requiresPledge: true,
  },
  {
    value: 'premier',
    label: 'Premier',
    price: 399,
    summary: 'Top performers. Featured on home page. Gold badge.',
    requiresPledge: true,
  },
] as const;

type Tier = (typeof TIER_OPTIONS)[number]['value'];

const SPECIALTY_OPTIONS = [
  'New vehicles',
  'Used vehicles',
  'Certified pre-owned',
  'Trucks',
  'Family SUVs',
  '3-row SUVs',
  'Minivans',
  'Sedans',
  'Hybrids',
  'EVs',
  'PHEVs',
  'Diesel',
  'Work vehicles',
  'European',
  'Performance',
];

const PLEDGE_ITEMS = [
  { key: 'pricingOTD', label: 'Out-the-door pricing on first contact (doc fee, taxes, accessories included)' },
  { key: 'noMarketAdjustments', label: 'No market adjustments above MSRP on new vehicles' },
  { key: 'responseTime', label: 'Reply to leads within 4 business hours, ≥ 90% response rate' },
  { key: 'inspectionsWelcome', label: 'Pre-purchase inspections always welcome on used vehicles' },
  { key: 'noMandatoryAddOns', label: 'No mandatory dealer add-ons — refusing never changes the advertised price' },
  { key: 'freeVehicleHistory', label: 'Free CarFax or AutoCheck on every used vehicle' },
] as const;

type PledgeKey = (typeof PLEDGE_ITEMS)[number]['key'];

interface FormState {
  tier: Tier;
  dealership: {
    name: string;
    licenseNumber: string;
    yearsInBusiness: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    website: string;
    inventoryType: 'new' | 'used' | 'both';
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  details: {
    specialties: string[];
    blurb: string;
  };
  pledge: Record<PledgeKey, boolean>;
}

const INITIAL: FormState = {
  tier: 'certified',
  dealership: {
    name: '',
    licenseNumber: '',
    yearsInBusiness: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    website: '',
    inventoryType: 'both',
  },
  contact: { name: '', email: '', phone: '', role: '' },
  details: { specialties: [], blurb: '' },
  pledge: {
    pricingOTD: false,
    noMarketAdjustments: false,
    responseTime: false,
    inspectionsWelcome: false,
    noMandatoryAddOns: false,
    freeVehicleHistory: false,
  },
};

const STEPS = ['Tier', 'Dealership', 'Contact', 'Details', 'Pledge', 'Review'] as const;

export function DealerApplyFlow({ initialTier }: { initialTier?: Tier }) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>(() => ({
    ...INITIAL,
    tier: initialTier ?? INITIAL.tier,
  }));
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requiresPledge = useMemo(
    () => TIER_OPTIONS.find((t) => t.value === state.tier)?.requiresPledge ?? false,
    [state.tier],
  );

  const visibleSteps = useMemo(
    () => (requiresPledge ? STEPS : STEPS.filter((s) => s !== 'Pledge')),
    [requiresPledge],
  );

  const currentStepName = visibleSteps[step];
  const progress = ((step + 1) / visibleSteps.length) * 100;

  const canNext = useMemo(() => {
    if (currentStepName === 'Tier') return true;
    if (currentStepName === 'Dealership') {
      const d = state.dealership;
      return (
        d.name.trim() &&
        d.licenseNumber.trim() &&
        d.yearsInBusiness &&
        d.address.trim() &&
        d.city.trim() &&
        d.state.length === 2 &&
        /^\d{5}$/.test(d.zip)
      );
    }
    if (currentStepName === 'Contact') {
      const c = state.contact;
      return (
        c.name.trim() &&
        /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c.email) &&
        c.phone.replace(/\D/g, '').length >= 7 &&
        c.role.trim()
      );
    }
    if (currentStepName === 'Details') {
      return state.details.specialties.length > 0 && state.details.blurb.trim().length >= 20;
    }
    if (currentStepName === 'Pledge') {
      return PLEDGE_ITEMS.every((p) => state.pledge[p.key]);
    }
    return true;
  }, [currentStepName, state]);

  function setD<K extends keyof FormState['dealership']>(
    key: K,
    value: FormState['dealership'][K],
  ) {
    setState((prev) => ({ ...prev, dealership: { ...prev.dealership, [key]: value } }));
  }

  function setC<K extends keyof FormState['contact']>(key: K, value: FormState['contact'][K]) {
    setState((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }));
  }

  function toggleSpecialty(s: string) {
    setState((prev) => {
      const next = prev.details.specialties.includes(s)
        ? prev.details.specialties.filter((x) => x !== s)
        : [...prev.details.specialties, s];
      return { ...prev, details: { ...prev.details, specialties: next } };
    });
  }

  function togglePledge(key: PledgeKey) {
    setState((prev) => ({ ...prev, pledge: { ...prev.pledge, [key]: !prev.pledge[key] } }));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        tier: state.tier,
        dealership: {
          ...state.dealership,
          yearsInBusiness: Number(state.dealership.yearsInBusiness) || 0,
          website: state.dealership.website.trim() || undefined,
        },
        contact: state.contact,
        details: state.details,
        pledge: requiresPledge ? state.pledge : undefined,
      };
      const res = await fetch('/api/dealer-application', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? 'Submission failed');
      }
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-red">
          Application received
        </p>
        <h2 className="headline text-4xl text-black sm:text-5xl">Thanks — we’ll be in touch.</h2>
        <p className="serif mt-4 text-lg text-gray">
          We review every application personally. You’ll hear back within 2 business days at{' '}
          <span className="text-black">{state.contact.email}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-gray">
          <span>
            Step {step + 1} of {visibleSteps.length}
          </span>
          <span>{currentStepName}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
          <div className="h-full bg-red transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="card">
        {currentStepName === 'Tier' && (
          <Step title="Which tier are you applying for?" subtitle="You can be upgraded later as you build a track record.">
            <div className="grid gap-3">
              {TIER_OPTIONS.map((t) => {
                const active = state.tier === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setState((prev) => ({ ...prev, tier: t.value }))}
                    className={cn(
                      'rounded-2xl border-2 p-5 text-left transition-colors',
                      active ? 'border-red bg-red/5' : 'border-black/10 hover:border-black/30',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-black">{t.label}</div>
                      <div className="text-sm font-semibold text-red">
                        ${t.price}/mo
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray">{t.summary}</div>
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {currentStepName === 'Dealership' && (
          <Step title="About your dealership">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Dealership name" required>
                <input
                  type="text"
                  value={state.dealership.name}
                  onChange={(e) => setD('name', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="State dealer license #" required>
                <input
                  type="text"
                  value={state.dealership.licenseNumber}
                  onChange={(e) => setD('licenseNumber', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Years in business" required>
                <input
                  type="number"
                  min={0}
                  value={state.dealership.yearsInBusiness}
                  onChange={(e) => setD('yearsInBusiness', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Inventory type" required>
                <select
                  value={state.dealership.inventoryType}
                  onChange={(e) =>
                    setD('inventoryType', e.target.value as 'new' | 'used' | 'both')
                  }
                  className={inputCls}
                >
                  <option value="both">New &amp; used</option>
                  <option value="new">New only</option>
                  <option value="used">Used only</option>
                </select>
              </Field>
              <Field label="Street address" required className="sm:col-span-2">
                <input
                  type="text"
                  value={state.dealership.address}
                  onChange={(e) => setD('address', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="City" required>
                <input
                  type="text"
                  value={state.dealership.city}
                  onChange={(e) => setD('city', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="State (2 letters)" required>
                <input
                  type="text"
                  maxLength={2}
                  value={state.dealership.state}
                  onChange={(e) => setD('state', e.target.value.toUpperCase())}
                  className={inputCls}
                />
              </Field>
              <Field label="ZIP" required>
                <input
                  type="text"
                  maxLength={5}
                  value={state.dealership.zip}
                  onChange={(e) =>
                    setD('zip', e.target.value.replace(/\D/g, '').slice(0, 5))
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Website (optional)">
                <input
                  type="text"
                  value={state.dealership.website}
                  onChange={(e) => setD('website', e.target.value)}
                  className={inputCls}
                  placeholder="https://"
                />
              </Field>
            </div>
          </Step>
        )}

        {currentStepName === 'Contact' && (
          <Step title="Primary contact" subtitle="Who we reach out to about this application.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required>
                <input
                  type="text"
                  value={state.contact.name}
                  onChange={(e) => setC('name', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Role / title" required>
                <input
                  type="text"
                  value={state.contact.role}
                  onChange={(e) => setC('role', e.target.value)}
                  className={inputCls}
                  placeholder="e.g. General Manager"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  value={state.contact.email}
                  onChange={(e) => setC('email', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Direct phone" required>
                <input
                  type="tel"
                  value={state.contact.phone}
                  onChange={(e) => setC('phone', e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          </Step>
        )}

        {currentStepName === 'Details' && (
          <Step title="What do you specialize in?" subtitle="Pick everything that applies. Shoppers use this to match.">
            <div className="flex flex-wrap gap-2">
              {SPECIALTY_OPTIONS.map((s) => {
                const active = state.details.specialties.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSpecialty(s)}
                    className={cn(
                      'rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'border-red bg-red text-cream'
                        : 'border-black/15 text-black hover:border-black/40',
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <div className="mt-6">
              <Field label="One paragraph about your dealership" required>
                <textarea
                  value={state.details.blurb}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      details: { ...prev.details, blurb: e.target.value },
                    }))
                  }
                  rows={4}
                  className={inputCls}
                  placeholder="What makes your dealership different? Be specific. Min 20 characters."
                />
              </Field>
            </div>
          </Step>
        )}

        {currentStepName === 'Pledge' && (
          <Step
            title="Sign the Transparency Pledge"
            subtitle="You must agree to all six commitments to be considered for Certified or Premier."
          >
            <div className="space-y-3">
              {PLEDGE_ITEMS.map((p) => {
                const active = state.pledge[p.key];
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => togglePledge(p.key)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition-colors',
                      active ? 'border-red bg-red/5' : 'border-black/10 hover:border-black/30',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2',
                        active ? 'border-red bg-red text-cream' : 'border-black/30',
                      )}
                    >
                      {active && (
                        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                          <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L9 11.6l6.3-6.3a1 1 0 0 1 1.4 0z" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm text-black/85">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {currentStepName === 'Review' && (
          <Step title="Review and submit" subtitle="We’ll review every detail before approving.">
            <dl className="divide-y divide-black/10 text-sm">
              <Row label="Tier">{state.tier}</Row>
              <Row label="Dealership">
                {state.dealership.name} — {state.dealership.city}, {state.dealership.state}{' '}
                {state.dealership.zip}
              </Row>
              <Row label="License #">{state.dealership.licenseNumber}</Row>
              <Row label="Years in business">{state.dealership.yearsInBusiness}</Row>
              <Row label="Inventory">{state.dealership.inventoryType}</Row>
              <Row label="Contact">
                {state.contact.name} ({state.contact.role}) · {state.contact.email} ·{' '}
                {state.contact.phone}
              </Row>
              <Row label="Specialties">
                {state.details.specialties.join(', ') || '—'}
              </Row>
              <Row label="Blurb">{state.details.blurb}</Row>
              {requiresPledge && (
                <Row label="Pledge">All six commitments agreed.</Row>
              )}
            </dl>
            {error && (
              <p className="mt-6 rounded-xl bg-red/10 p-3 text-sm text-red">{error}</p>
            )}
          </Step>
        )}

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || submitting}
            className="btn btn-ghost disabled:opacity-40"
          >
            Back
          </button>
          {currentStepName === 'Review' ? (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="btn btn-primary disabled:opacity-40"
            >
              {submitting ? 'Submitting…' : 'Submit application'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(visibleSteps.length - 1, s + 1))}
              disabled={!canNext}
              className="btn btn-primary disabled:opacity-40"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border-2 border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-red';

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

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-gray">
        {label}
        {required && <span className="ml-1 text-red">*</span>}
      </span>
      {children}
    </label>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-widest text-gray">{label}</dt>
      <dd className="col-span-2 text-black/85">{children}</dd>
    </div>
  );
}

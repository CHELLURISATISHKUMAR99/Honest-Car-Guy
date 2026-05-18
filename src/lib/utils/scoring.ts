import type {
  FinderAnswers,
  Priority,
  ScoredVehicle,
  Vehicle,
} from '@/lib/types';

const PRIORITY_LABEL: Record<Priority, string> = {
  reliability: 'long-term reliability',
  'fuel-economy': 'fuel economy',
  safety: 'safety scores',
  cargo: 'cargo room',
  tech: 'tech and infotainment',
  performance: 'performance',
  comfort: 'ride comfort',
  value: 'overall value',
};

const USE_PRIORITY_HINTS: Record<FinderAnswers['primaryUse'], Priority[]> = {
  commute: ['fuel-economy', 'reliability', 'value'],
  family: ['safety', 'cargo', 'comfort'],
  work: ['performance', 'cargo', 'reliability'],
  adventure: ['cargo', 'performance', 'safety'],
  mixed: ['value', 'reliability', 'comfort'],
};

export function scoreVehicles(
  answers: FinderAnswers,
  catalog: Vehicle[],
): ScoredVehicle[] {
  return catalog
    .map((vehicle) => scoreOne(vehicle, answers))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function scoreOne(vehicle: Vehicle, answers: FinderAnswers): ScoredVehicle {
  let score = 0;
  const reasons: string[] = [];

  if (vehicle.msrpFrom <= answers.budgetMax) {
    score += 25;
    reasons.push(
      `Starts at $${vehicle.msrpFrom.toLocaleString()} — within your $${answers.budgetMax.toLocaleString()} budget.`,
    );
  } else {
    const over = vehicle.msrpFrom - answers.budgetMax;
    const penalty = Math.min(40, Math.round((over / answers.budgetMax) * 100));
    score -= penalty;
    reasons.push(
      `About $${over.toLocaleString()} above your stated budget.`,
    );
  }

  if (answers.bodyStyle === 'any' || answers.bodyStyle === vehicle.bodyStyle) {
    score += 15;
    if (answers.bodyStyle !== 'any') {
      reasons.push(`Matches the ${vehicle.bodyStyle} body style you chose.`);
    }
  } else {
    score -= 12;
  }

  if (answers.fuel === 'any' || answers.fuel === vehicle.fuel) {
    score += 12;
    if (answers.fuel !== 'any') {
      reasons.push(`Runs on ${vehicle.fuel.toUpperCase()} as requested.`);
    }
  } else {
    score -= 8;
  }

  if (vehicle.seats >= answers.seats) {
    score += 10;
    if (answers.seats >= 6) {
      reasons.push(`Seats ${vehicle.seats} — covers your ${answers.seats}-seat need.`);
    }
  } else {
    score -= 15;
    reasons.push(`Only seats ${vehicle.seats}; you asked for ${answers.seats}.`);
  }

  const useHints = USE_PRIORITY_HINTS[answers.primaryUse];
  const useMatches = vehicle.strengths.filter((s) => useHints.includes(s));
  if (useMatches.length > 0) {
    score += useMatches.length * 4;
  }

  const priorityMatches = answers.priorities.filter((p) =>
    vehicle.strengths.includes(p),
  );
  for (const match of priorityMatches) {
    score += 8;
    reasons.push(`Strong on ${PRIORITY_LABEL[match]} — one of your priorities.`);
  }

  if (vehicle.mpgCombined && vehicle.mpgCombined >= 35) {
    score += 3;
  }

  return { vehicle, score, reasons: reasons.slice(0, 4) };
}

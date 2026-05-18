import type { Dealer, FinderAnswers } from '@/lib/types';

const STATE_TO_ZIP_PREFIX: Record<string, number> = {
  CT: 0, MA: 0, ME: 0, NH: 0, NJ: 0, RI: 0, VT: 0,
  DE: 1, NY: 1, PA: 1,
  DC: 2, MD: 2, NC: 2, SC: 2, VA: 2, WV: 2,
  AL: 3, FL: 3, GA: 3, MS: 3, TN: 3,
  IN: 4, KY: 4, MI: 4, OH: 4,
  IA: 5, MN: 5, MT: 5, ND: 5, SD: 5, WI: 5,
  IL: 6, KS: 6, MO: 6, NE: 6,
  AR: 7, LA: 7, OK: 7, TX: 7,
  AZ: 8, CO: 8, ID: 8, NM: 8, NV: 8, UT: 8, WY: 8,
  AK: 9, CA: 9, HI: 9, OR: 9, WA: 9,
};

const TIER_BONUS: Record<Dealer['tier'], number> = {
  premier: 15,
  certified: 10,
  listed: 5,
};

export interface DealerMatch {
  dealer: Dealer;
  score: number;
  proximity: 'in-region' | 'nearby' | 'long-distance';
  reasons: string[];
}

export function findDealersForUser(
  answers: FinderAnswers,
  catalog: Dealer[],
  limit = 4,
): DealerMatch[] {
  const userRegion = Number(answers.zip[0]);
  if (Number.isNaN(userRegion)) return [];

  return catalog
    .map((dealer) => scoreDealer(dealer, answers, userRegion))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function scoreDealer(
  dealer: Dealer,
  answers: FinderAnswers,
  userRegion: number,
): DealerMatch {
  const dealerRegion = STATE_TO_ZIP_PREFIX[dealer.state.toUpperCase()] ?? 5;
  const diff = Math.abs(userRegion - dealerRegion);

  let score = TIER_BONUS[dealer.tier];
  const reasons: string[] = [];
  let proximity: DealerMatch['proximity'];

  if (diff === 0) {
    score += 30;
    proximity = 'in-region';
    reasons.push(`In your ZIP region (${dealer.city}, ${dealer.state}).`);
  } else if (diff === 1) {
    score += 12;
    proximity = 'nearby';
    reasons.push(`Adjacent region — ${dealer.city}, ${dealer.state}.`);
  } else {
    score += 0;
    proximity = 'long-distance';
    reasons.push(`Ships nationwide from ${dealer.city}, ${dealer.state}.`);
  }

  if (dealer.tier === 'premier') {
    reasons.push('Premier dealer — featured + transparency pledge signed.');
  } else if (dealer.tier === 'certified') {
    reasons.push('Certified — transparency pledge signed.');
  }

  const specialtyText = dealer.specialties.join(' ').toLowerCase();
  if (answers.bodyStyle !== 'any' && specialtyText.includes(answers.bodyStyle)) {
    score += 10;
    reasons.push(`Specializes in ${answers.bodyStyle}s.`);
  }
  if (answers.fuel === 'ev' && /ev|electric/.test(specialtyText)) {
    score += 12;
    reasons.push('EV specialist.');
  }
  if (answers.fuel === 'hybrid' && specialtyText.includes('hybrid')) {
    score += 8;
    reasons.push('Stocks hybrids.');
  }
  if (
    answers.primaryUse === 'family' &&
    /family|minivan|3-row|suv/.test(specialtyText)
  ) {
    score += 6;
    reasons.push('Strong on family vehicles.');
  }
  if (
    answers.primaryUse === 'work' &&
    /truck|work|diesel/.test(specialtyText)
  ) {
    score += 6;
    reasons.push('Work-truck specialist.');
  }

  return { dealer, score, proximity, reasons: reasons.slice(0, 3) };
}

export function directionsUrl(dealer: Dealer): string {
  const destination = encodeURIComponent(
    `${dealer.name}, ${dealer.city}, ${dealer.state}`,
  );
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

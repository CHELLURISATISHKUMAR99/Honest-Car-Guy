export type Episode = {
  id: string;
  number: number;
  title: string;
  slug: string;
  publishedAt: string;
  durationMinutes: number;
  guest?: string;
  topic: string;
  summary: string;
  audioUrl?: string;
  artworkUrl?: string;
  youtubeId?: string;
};

export type DealerTier = 'listed' | 'certified' | 'premier';

export type Dealer = {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  tier: DealerTier;
  specialties: string[];
  blurb: string;
  phone?: string;
  website?: string;
  inventoryUrl?: string;
  inventoryUrlPattern?: string;
  yearsInBusiness?: number;
};

export type BodyStyle =
  | 'sedan'
  | 'suv'
  | 'truck'
  | 'minivan'
  | 'hatchback'
  | 'coupe'
  | 'wagon';

export type Fuel = 'gas' | 'hybrid' | 'phev' | 'ev' | 'diesel';

export type Priority =
  | 'reliability'
  | 'fuel-economy'
  | 'safety'
  | 'cargo'
  | 'tech'
  | 'performance'
  | 'comfort'
  | 'value';

export type PrimaryUse = 'commute' | 'family' | 'work' | 'adventure' | 'mixed';

export type Vehicle = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  bodyStyle: BodyStyle;
  fuel: Fuel;
  seats: number;
  msrpFrom: number;
  mpgCombined?: number;
  strengths: Priority[];
  blurb: string;
};

export type FinderAnswers = {
  budgetMax: number;
  bodyStyle: BodyStyle | 'any';
  fuel: Fuel | 'any';
  seats: number;
  primaryUse: PrimaryUse;
  priorities: Priority[];
  zip: string;
};

export type ScoredVehicle = {
  vehicle: Vehicle;
  score: number;
  reasons: string[];
};

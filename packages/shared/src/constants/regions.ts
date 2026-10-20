export interface RegionOption {
  id: string;
  label: string;
  subRegion?: string;
}

export const REGIONS: RegionOption[] = [
  { id: 'kerala', label: 'Kerala (Malayali)', subRegion: 'South Asia' },
  { id: 'north_india', label: 'North India (Hindi / Punjabi / Gujarati)', subRegion: 'South Asia' },
  { id: 'tamil_nadu', label: 'Tamil Nadu (Tamil)', subRegion: 'South Asia' },
  { id: 'andhra_telangana', label: 'Andhra / Telangana (Telugu)', subRegion: 'South Asia' },
  { id: 'karnataka', label: 'Karnataka (Kannada)', subRegion: 'South Asia' },
  { id: 'arab_emirati', label: 'UAE / GCC Local', subRegion: 'Middle East' },
  { id: 'arab_levant', label: 'Levant Arab (Lebanon, Syria, Jordan, Palestine)', subRegion: 'Middle East' },
  { id: 'arab_egypt', label: 'Egypt / North Africa', subRegion: 'Middle East' },
  { id: 'pakistan', label: 'Pakistan (Urdu / Punjabi / Pashto)', subRegion: 'South Asia' },
  { id: 'philippines', label: 'Philippines (Tagalog / Filipino)', subRegion: 'Southeast Asia' },
  { id: 'europe_uk', label: 'UK & Europe', subRegion: 'Europe' },
  { id: 'other', label: 'Other International', subRegion: 'Global' }
];

export const DUBAI_AREAS = [
  'Downtown Dubai',
  'Dubai Marina',
  'Business Bay',
  'JLT (Jumeirah Lakes Towers)',
  'Deira',
  'Bur Dubai',
  'Al Barsha',
  'Jumeirah',
  'DIFC',
  'Dubai Silicon Oasis',
  'Dubai Academic City',
  'Al Karama',
  'Dubai Hills',
  'Mirdif',
  'Palm Jumeirah'
];

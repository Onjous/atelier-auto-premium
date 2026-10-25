import type {
  AddOn,
  ConditionId,
  PackageComparison,
  PricingPackage,
  ServiceId,
  VehicleCondition,
  VehicleSize,
  VehicleSizeId,
} from '@/types/content';

/** All prices are editable demonstration values in PLN. */

export const vehicleSizes: VehicleSize[] = [
  { id: 'compact', label: 'Compact / Coupé', examples: 'Porsche 911, BMW M2, Audi TT', multiplier: 1 },
  { id: 'sedan', label: 'Sedan', examples: 'BMW M5, Mercedes-AMG E 63, Audi RS 6', multiplier: 1.15 },
  { id: 'suv', label: 'SUV', examples: 'Porsche Macan, BMW X5, Audi Q8', multiplier: 1.3 },
  { id: 'large', label: 'Large SUV / Luxury', examples: 'Mercedes-Maybach S, Range Rover, Lamborghini Urus', multiplier: 1.5 },
];

export const vehicleConditions: VehicleCondition[] = [
  { id: 'well-kept', label: 'Well kept', description: 'Garaged, carefully washed, few visible swirls.', factor: 1 },
  { id: 'average', label: 'Average', description: 'Daily use, automatic washes, visible swirls in sunlight.', factor: 1.15 },
  { id: 'attention', label: 'Needs attention', description: 'Heavy marring, oxidation, or contamination.', factor: 1.35 },
];

export const pricingPackages: PricingPackage[] = [
  // Paint protection film
  {
    id: 'ppf-front',
    serviceId: 'ppf',
    name: 'Front Protection',
    summary: 'The areas that take most stone strikes.',
    basePrice: 6900,
    sizeSensitive: true,
    conditionSensitive: false,
    duration: '2 days',
    features: ['Full front bumper', 'Full bonnet and front wings', 'Mirror caps and headlights', 'Enhancement polish of covered panels'],
  },
  {
    id: 'ppf-track',
    serviceId: 'ppf',
    name: 'Track Pack',
    summary: 'Front protection plus every leading edge behind it.',
    basePrice: 9900,
    sizeSensitive: true,
    conditionSensitive: false,
    duration: '3 days',
    features: ['Everything in Front Protection', 'Sills and lower doors', 'Rear arch leading edges', 'A-pillars and roof edge'],
    recommended: true,
  },
  {
    id: 'ppf-full',
    serviceId: 'ppf',
    name: 'Full Body',
    summary: 'Every painted panel, edges wrapped wherever possible.',
    basePrice: 21900,
    sizeSensitive: true,
    conditionSensitive: false,
    duration: '5–6 days',
    features: ['All painted exterior panels', 'Wrapped edges where safe', 'Door shuts on request', 'Two-step correction before install'],
  },
  // Ceramic coating
  {
    id: 'ceramic-essential',
    serviceId: 'ceramic',
    name: 'Essential',
    summary: 'A single-layer coating on enhanced paint.',
    basePrice: 2900,
    sizeSensitive: true,
    conditionSensitive: true,
    duration: '2 days',
    features: ['Full decontamination', 'One-step enhancement polish', 'Single coating layer on paint', 'Glass treatment on windscreen'],
  },
  {
    id: 'ceramic-advanced',
    serviceId: 'ceramic',
    name: 'Advanced',
    summary: 'Two layers, wheels and glass, on corrected paint.',
    basePrice: 4400,
    sizeSensitive: true,
    conditionSensitive: true,
    duration: '3 days',
    features: ['Two-step correction', 'Base and top coating layers', 'Wheel faces and calipers', 'All exterior glass'],
    recommended: true,
  },
  {
    id: 'ceramic-signature',
    serviceId: 'ceramic',
    name: 'Signature',
    summary: 'Our most complete coating, wheels off.',
    basePrice: 6900,
    sizeSensitive: true,
    conditionSensitive: true,
    duration: '4 days',
    features: ['Multi-stage correction', 'Multi-layer paint coating', 'Wheels removed: barrels, calipers, arches', 'Trim, glass and leather protection'],
  },
  // Paint correction
  {
    id: 'correction-enhancement',
    serviceId: 'correction',
    name: 'Enhancement',
    summary: 'One step for a significant gain in gloss.',
    basePrice: 1900,
    sizeSensitive: true,
    conditionSensitive: true,
    duration: '1 day',
    features: ['Paint depth readings', 'Single-stage machine polish', 'Removes light marring', 'Sealant protection'],
  },
  {
    id: 'correction-two-step',
    serviceId: 'correction',
    name: 'Two-Step Correction',
    summary: 'Cut and refine for a deep, clear finish.',
    basePrice: 3400,
    sizeSensitive: true,
    conditionSensitive: true,
    duration: '2–3 days',
    features: ['Paint depth readings per panel', 'Compounding stage', 'Refining stage', 'Inspection under multiple light sources'],
    recommended: true,
  },
  {
    id: 'correction-concours',
    serviceId: 'correction',
    name: 'Concours',
    summary: 'As close to defect-free as the paint safely allows.',
    basePrice: 5400,
    sizeSensitive: true,
    conditionSensitive: true,
    duration: '4–5 days',
    features: ['Wet sanding where appropriate', 'Multi-stage polishing', 'Jewelling finish', 'Written paint report'],
  },
  // Exterior detailing
  {
    id: 'exterior-wash',
    serviceId: 'exterior',
    name: 'Signature Wash',
    summary: 'A safe-contact wash with wheels and glass.',
    basePrice: 700,
    sizeSensitive: true,
    conditionSensitive: false,
    duration: '3 hours',
    features: ['Foam pre-wash', 'Two-bucket contact wash', 'Wheel faces and tyres', 'Glass and spray sealant'],
  },
  {
    id: 'exterior-detail',
    serviceId: 'exterior',
    name: 'Exterior Detail',
    summary: 'Wash plus full decontamination and sealant.',
    basePrice: 1300,
    sizeSensitive: true,
    conditionSensitive: true,
    duration: '1 day',
    features: ['Everything in Signature Wash', 'Iron and tar removal', 'Clay treatment', 'Durable paint sealant'],
    recommended: true,
  },
  // Interior
  {
    id: 'interior-refresh',
    serviceId: 'interior',
    name: 'Interior Refresh',
    summary: 'Thorough clean of every surface.',
    basePrice: 800,
    sizeSensitive: true,
    conditionSensitive: true,
    duration: '4 hours',
    features: ['Vacuum and brush detail', 'Leather wipe-down', 'Glass and screens', 'Mats cleaned'],
  },
  {
    id: 'interior-deep',
    serviceId: 'interior',
    name: 'Deep Interior',
    summary: 'Extraction, steam and leather care.',
    basePrice: 1500,
    sizeSensitive: true,
    conditionSensitive: true,
    duration: '1 day',
    features: ['Hot-water extraction', 'Steam cleaning', 'Leather deep clean and protection', 'Alcantara care'],
    recommended: true,
  },
  {
    id: 'interior-leather',
    serviceId: 'interior',
    name: 'Leather Restoration',
    summary: 'For worn bolsters and tired hides.',
    basePrice: 2400,
    sizeSensitive: false,
    conditionSensitive: true,
    duration: '2 days',
    features: ['Leather assessment', 'Deep cleaning and preparation', 'Colour-matched touch-up of wear', 'Protective top coat'],
  },
  // Maintenance
  {
    id: 'maintenance-visit',
    serviceId: 'maintenance',
    name: 'Care Visit',
    summary: 'Safe wash and top-up for protected cars.',
    basePrice: 400,
    sizeSensitive: true,
    conditionSensitive: false,
    duration: '3 hours',
    features: ['Safe-contact wash', 'Coating booster', 'Wheel faces and glass', 'Short condition note'],
  },
  {
    id: 'maintenance-seasonal',
    serviceId: 'maintenance',
    name: 'Seasonal Inspection',
    summary: 'Decontamination, top-up and full report.',
    basePrice: 900,
    sizeSensitive: true,
    conditionSensitive: false,
    duration: '6 hours',
    features: ['Everything in Care Visit', 'Iron and tar decontamination', 'Film edge inspection', 'Written condition report'],
    recommended: true,
  },
];

export const addOns: AddOn[] = [
  { id: 'matte-film', name: 'Satin finish film', description: 'Satin instead of gloss film.', price: 2400, sizeSensitive: true, serviceIds: ['ppf'] },
  { id: 'wheels-off', name: 'Wheels-off coating', description: 'Barrels, faces and calipers coated with wheels removed.', price: 900, sizeSensitive: false, serviceIds: ['ceramic', 'exterior', 'maintenance'] },
  { id: 'glass-coating', name: 'Full glass coating', description: 'All exterior glass treated for water repellency.', price: 450, sizeSensitive: true },
  { id: 'interior-protection', name: 'Interior protection', description: 'Leather and fabric coating against spills and dye transfer.', price: 650, sizeSensitive: true },
  { id: 'trim-coating', name: 'Trim & plastics coating', description: 'Exterior trims restored and protected.', price: 350, sizeSensitive: false },
  { id: 'engine-bay', name: 'Engine bay detail', description: 'Careful low-moisture engine bay cleaning and dressing.', price: 450, sizeSensitive: false },
  { id: 'odour', name: 'Odour neutralisation', description: 'Ozone-free treatment for persistent cabin odours.', price: 300, sizeSensitive: false, serviceIds: ['interior'] },
  { id: 'collection', name: 'Enclosed collection & delivery', description: 'Covered transport to and from the studio (local area).', price: 250, sizeSensitive: false },
];

export const packageComparisons: PackageComparison[] = [
  {
    serviceId: 'ppf',
    title: 'Paint protection film coverage',
    rows: [
      { label: 'Bumper, bonnet, front wings', values: { 'ppf-front': true, 'ppf-track': true, 'ppf-full': true } },
      { label: 'Mirrors & headlights', values: { 'ppf-front': true, 'ppf-track': true, 'ppf-full': true } },
      { label: 'Sills & lower doors', values: { 'ppf-front': false, 'ppf-track': true, 'ppf-full': true } },
      { label: 'Rear arch leading edges', values: { 'ppf-front': false, 'ppf-track': true, 'ppf-full': true } },
      { label: 'Doors, roof, rear panels', values: { 'ppf-front': false, 'ppf-track': false, 'ppf-full': true } },
      { label: 'Pre-install polishing', values: { 'ppf-front': 'Enhancement', 'ppf-track': 'Enhancement', 'ppf-full': 'Two-step' } },
    ],
  },
  {
    serviceId: 'ceramic',
    title: 'Ceramic coating tiers',
    rows: [
      { label: 'Paint preparation', values: { 'ceramic-essential': 'One-step', 'ceramic-advanced': 'Two-step', 'ceramic-signature': 'Multi-stage' } },
      { label: 'Coating layers on paint', values: { 'ceramic-essential': '1', 'ceramic-advanced': '2', 'ceramic-signature': '3' } },
      { label: 'Wheels', values: { 'ceramic-essential': false, 'ceramic-advanced': 'Faces', 'ceramic-signature': 'Wheels off' } },
      { label: 'Glass', values: { 'ceramic-essential': 'Windscreen', 'ceramic-advanced': 'All', 'ceramic-signature': 'All' } },
      { label: 'Trim & leather', values: { 'ceramic-essential': false, 'ceramic-advanced': false, 'ceramic-signature': true } },
    ],
  },
];

export const ESTIMATE_ROUNDING = 50;
/** Upper bound of the estimate range: typical variance found at inspection. */
export const ESTIMATE_SPREAD = 0.12;

export const defaultSize: VehicleSizeId = 'compact';
export const defaultCondition: ConditionId = 'well-kept';

export const packagesForService = (serviceId: ServiceId) => pricingPackages.filter((p) => p.serviceId === serviceId);

export const packageById = (id: string) => pricingPackages.find((p) => p.id === id);

export const startingPrice = (serviceId: ServiceId) =>
  Math.min(...packagesForService(serviceId).map((p) => p.basePrice));

import type { Service, ServiceId } from '@/types/content';

export const services: Service[] = [
  {
    id: 'ppf',
    slug: 'paint-protection-film',
    index: '01',
    name: 'Paint Protection Film',
    shortName: 'PPF',
    category: 'protection',
    tagline: 'An invisible layer between your paint and the road.',
    summary:
      'Optically clear urethane film, patterned and hand-finished to every panel edge, absorbing stone chips and light abrasion before they reach the paint.',
    description: [
      'Paint protection film is a thermoplastic urethane layer — typically around 150–200 microns thick — applied over the factory clear coat. It is the only treatment we offer that physically absorbs impacts: the film takes the stone chip, the paint underneath does not.',
      'Every installation starts with decontamination and, where needed, a correction polish, because film preserves whatever is beneath it. We work from pre-cut patterns refined by hand, wrapping edges wherever the panel geometry allows so seams disappear from normal viewing distance.',
      'Modern films carry a self-healing top coat: fine wash marring relaxes with warmth from the sun or warm water. Gloss and satin finishes are available, and film can be removed later without harming healthy factory paint.',
    ],
    heroImage: 'porsche-white-showroom',
    previewImage: 'applicator-white',
    gallery: [
      { image: 'applicator-white', caption: 'Edge work around a headlight — the area most exposed to stone strikes.' },
      { image: 'hood-white', caption: 'Front wing and bonnet: the leading edges where film earns its keep.' },
      { image: 'porsche-gt3-red', caption: 'Track-oriented cars benefit from extended coverage of sills and rear arches.' },
    ],
    benefits: [
      { title: 'Impact absorption', description: 'Reduces chips from gravel and road debris on the most exposed surfaces.' },
      { title: 'Self-healing top coat', description: 'Light swirls and wash marring relax with heat; the finish recovers its clarity.' },
      { title: 'Reversible', description: 'Film can be removed by a professional, leaving healthy original paint beneath.' },
      { title: 'Finish options', description: 'Gloss to preserve depth, or satin to give gloss paint a matte character.' },
    ],
    limitations: [
      'Film does not make paint chip-proof. Large or sharp impacts can still damage the film and, occasionally, the paint beneath.',
      'Seams may be visible on certain complex panels where wrapping an edge is not safe or possible.',
      'Film preserves the condition beneath it — defects should be corrected before installation.',
      'Removal on resprayed or poorly adhered paint carries a risk of lifting paint; we inspect before advising.',
    ],
    idealFor: ['New vehicles before first use', 'Track and motorway drivers', 'Rare or original-paint cars'],
    process: [
      { title: 'Paint inspection', description: 'Paint depth readings and lighting inspection identify resprays and defects.' },
      { title: 'Decontamination & correction', description: 'Chemical and mechanical decontamination; correction polish where required.' },
      { title: 'Pattern & installation', description: 'Patterns adjusted per vehicle; film installed panel by panel in a dust-controlled bay.' },
      { title: 'Edge finishing & curing', description: 'Edges wrapped and sealed; the vehicle rests while adhesive settles before handover.' },
    ],
    duration: '2–6 days',
    packageIds: ['ppf-front', 'ppf-track', 'ppf-full'],
    faqs: [
      {
        id: 'ppf-yellow',
        question: 'Will the film turn yellow?',
        answer:
          'Current premium urethane films are formulated to resist yellowing, but UV exposure, pollution and maintenance all influence ageing. We only use films with manufacturer-backed warranties and explain their terms in writing.',
      },
      {
        id: 'ppf-wash',
        question: 'When can I wash the car after installation?',
        answer: 'We recommend waiting seven days before the first wash and avoiding pressure-washer jets close to film edges.',
      },
      {
        id: 'ppf-ceramic',
        question: 'Can film be ceramic coated?',
        answer:
          'Yes. A coating designed for film adds slickness and makes washing easier. It does not change how the film handles impacts.',
      },
    ],
    related: ['ceramic', 'correction', 'maintenance'],
    seo: {
      title: 'Paint Protection Film (PPF)',
      description:
        'Self-healing paint protection film installed by hand with wrapped edges. Front, track and full-body coverage — sample prices from 6,900 PLN.',
    },
  },
  {
    id: 'ceramic',
    slug: 'ceramic-coating',
    index: '02',
    name: 'Ceramic Coating',
    shortName: 'Ceramic',
    category: 'protection',
    tagline: 'Depth you can see. Slickness you can feel.',
    summary:
      'A hard, glass-like layer bonded to the clear coat that sharpens reflections, sheds water and makes every future wash shorter and safer.',
    description: [
      'A ceramic coating is a liquid polymer — usually silica or silicon-carbide based — that cures into a thin, hard film on top of the clear coat. It is measured in single microns, so its role is chemical, not physical: it resists etching from bird droppings and road salts, repels water, and gives contamination far less to grip.',
      'The result most owners notice first is optical. A well-prepared, coated surface reflects with more clarity and colour saturation, and stays that way longer because it is easier to clean without inflicting marks.',
      'Coating amplifies what is beneath it, good or bad. That is why every coating package includes paint correction proportionate to the car’s condition — the preparation is most of the work.',
    ],
    heroImage: 'porsche-turbo-rear',
    previewImage: 'paint-macro-blue',
    gallery: [
      { image: 'paint-macro-blue', caption: 'Coated paint holds long, unbroken reflections.' },
      { image: 'microfiber-red', caption: 'Final levelling of the coating with fresh microfibre on every panel.' },
      { image: 'porsche-turbo-rear', caption: 'Hydrophobic behaviour: water beads and sheets off the engine cover.' },
    ],
    benefits: [
      { title: 'Optical clarity', description: 'Sharper reflections and richer colour on properly prepared paint.' },
      { title: 'Chemical resistance', description: 'A sacrificial barrier against bird droppings, insects, salt and fallout.' },
      { title: 'Easier maintenance', description: 'Dirt releases with less agitation, reducing wash-induced marring.' },
      { title: 'Whole-vehicle options', description: 'Formulations for paint, wheels, glass, trim and interior surfaces.' },
    ],
    limitations: [
      'A coating will not stop stone chips, deep scratches or door dings — that is the role of film.',
      'It is not maintenance-free. Poor wash technique still causes swirls, and contamination still needs removing.',
      'Lifespan depends on the product, climate, mileage and care routine; claims of permanence are not credible.',
      'Water spots can still form if mineral-rich water is left to dry on the surface.',
    ],
    idealFor: ['Daily-driven performance cars', 'Owners who wash their own car', 'Freshly corrected paint'],
    process: [
      { title: 'Wash & decontamination', description: 'Iron, tar and bonded contamination removed; panels clayed.' },
      { title: 'Correction', description: 'Enhancement or multi-step polishing chosen from paint readings.' },
      { title: 'Panel wipe', description: 'Polishing oils removed so the coating bonds to bare clear coat.' },
      { title: 'Application & cure', description: 'Applied panel by panel, levelled under inspection lights, infrared-cured.' },
    ],
    duration: '2–4 days',
    packageIds: ['ceramic-essential', 'ceramic-advanced', 'ceramic-signature'],
    faqs: [
      {
        id: 'ceramic-years',
        question: 'How long does a coating last?',
        answer:
          'It depends on the product, how the car is used and how it is washed. We give realistic expectations for your use at consultation and recommend a maintenance visit schedule rather than quoting a headline number.',
      },
      {
        id: 'ceramic-wax',
        question: 'Do I still need to wax the car?',
        answer: 'No. Wax will sit on top of the coating and mask its behaviour. A compatible maintenance spray is enough.',
      },
      {
        id: 'ceramic-new',
        question: 'Does a brand-new car need polishing first?',
        answer:
          'Often, yes. New cars frequently arrive with transport marks, dealer-wash swirls or holograms. We inspect and quote correction only where it is needed.',
      },
    ],
    related: ['correction', 'ppf', 'maintenance'],
    seo: {
      title: 'Ceramic Coating',
      description:
        'Professionally prepared ceramic coatings for paint, wheels and glass. Honest guidance on durability and care — sample prices from 2,900 PLN.',
    },
  },
  {
    id: 'correction',
    slug: 'paint-correction',
    index: '03',
    name: 'Paint Correction',
    shortName: 'Correction',
    category: 'correction',
    tagline: 'Remove only what is necessary. Measure everything.',
    summary:
      'Machine polishing that levels swirls, holograms and light scratches from the clear coat — guided by paint depth readings so material removal stays within safe limits.',
    description: [
      'Most gloss loss is not in the colour, it is in the clear coat: thousands of fine scratches that scatter light. Correction removes a microscopically thin layer of clear coat until the surface is level again and reflections become sharp.',
      'Clear coat is finite — on many modern cars it is only a few dozen microns thick. We record paint depth across every panel before polishing and choose the least aggressive combination of pad, compound and machine that achieves the agreed result.',
      'Correction can be an enhancement (one step, meaningful gloss gain), a two-step correction (cut and refine), or a multi-stage concours finish where time is spent until the panel is as close to defect-free as is safe.',
    ],
    heroImage: 'ferrari-red-studio',
    previewImage: 'polisher-black',
    gallery: [
      { image: 'polisher-black', caption: 'Cutting stage on dark paint, where defects are most visible.' },
      { image: 'polish-blue', caption: 'Refining pass with a dual-action polisher.' },
      { image: 'paint-macro-brown', caption: 'The goal: clean, undistorted reflections.' },
    ],
    benefits: [
      { title: 'Restored gloss', description: 'Levelled clear coat reflects light cleanly instead of scattering it.' },
      { title: 'Measured approach', description: 'Paint depth logged per panel; removal kept within safe margins.' },
      { title: 'Defect-specific', description: 'Swirls, holograms, buffer trails and oxidation addressed individually.' },
      { title: 'Ideal foundation', description: 'The essential preparation for coating or film.' },
    ],
    limitations: [
      'Scratches through the clear coat into the base colour cannot be polished out — they need paint repair.',
      'Some deep marks are only reduced, not removed, if full removal would compromise clear coat safety.',
      'Soft or resprayed paint behaves differently; results are confirmed after a test section.',
      'Without protection and correct washing, new swirls will return over time.',
    ],
    idealFor: ['Dark colours showing swirl marks', 'Pre-sale or concours preparation', 'Before coating or film'],
    process: [
      { title: 'Measure', description: 'Paint depth gauge readings taken across every panel.' },
      { title: 'Test section', description: 'Pad and compound combinations trialled on a small area.' },
      { title: 'Cut & refine', description: 'Panels polished in stages under multiple light sources.' },
      { title: 'Inspect', description: 'Surface wiped down and checked under sun-simulating light.' },
    ],
    duration: '1–5 days',
    packageIds: ['correction-enhancement', 'correction-two-step', 'correction-concours'],
    faqs: [
      {
        id: 'correction-safe',
        question: 'Does polishing damage paint?',
        answer:
          'Every polish removes a small amount of clear coat, which is why we measure first and use the least aggressive method that works. Done properly, a correction uses only a fraction of the available clear coat.',
      },
      {
        id: 'correction-all',
        question: 'Will every scratch disappear?',
        answer:
          'Not always. If a scratch is deeper than the clear coat can safely allow, we reduce it and tell you exactly why it remains.',
      },
    ],
    related: ['ceramic', 'ppf', 'exterior'],
    seo: {
      title: 'Paint Correction',
      description:
        'Measured, multi-stage machine polishing to remove swirls and holograms safely. Enhancement to concours — sample prices from 1,900 PLN.',
    },
  },
  {
    id: 'exterior',
    slug: 'exterior-detailing',
    index: '04',
    name: 'Exterior Detailing',
    shortName: 'Exterior',
    category: 'detailing',
    tagline: 'A wash that leaves the paint better than it found it.',
    summary:
      'Safe-contact washing, full decontamination and protection for wheels, glass and bodywork — the thorough version of what a car wash pretends to be.',
    description: [
      'Most swirl marks are put into paint during washing. Our exterior detail uses pre-wash foam, pH-appropriate chemistry and a two-bucket contact wash with clean media for every panel, so dirt is lifted rather than dragged across the surface.',
      'Bonded contamination — iron particles, tar, tree sap — is removed chemically and with a clay medium. Wheels are cleaned face, barrel and arch, and the vehicle is protected with a durable sealant appropriate to its finish.',
    ],
    heroImage: 'foam-wheel',
    previewImage: 'foam-wheel',
    gallery: [
      { image: 'foam-mercedes', caption: 'Pre-wash foam loosens grit before anything touches the paint.' },
      { image: 'wheel-wash', caption: 'Wheel barrels and faces cleaned with dedicated brushes.' },
      { image: 'tyre-brush', caption: 'Tyres scrubbed and dressed to a satin, not greasy, finish.' },
    ],
    benefits: [
      { title: 'Safe wash method', description: 'Minimises contact marring during cleaning.' },
      { title: 'Full decontamination', description: 'Iron fallout, tar and bonded residue removed.' },
      { title: 'Wheels & arches', description: 'Faces, barrels, calipers and arch liners cleaned.' },
      { title: 'Sealant protection', description: 'Durable layer that makes the next wash easier.' },
    ],
    limitations: [
      'An exterior detail does not remove swirls or scratches — that requires paint correction.',
      'Sealant protection is shorter-lived than a ceramic coating.',
    ],
    idealFor: ['Seasonal refresh', 'After winter', 'Before an event or sale'],
    process: [
      { title: 'Pre-wash', description: 'Snow foam and detail brushing of emblems, seams and grilles.' },
      { title: 'Contact wash', description: 'Two-bucket method with fresh mitts per section.' },
      { title: 'Decontamination', description: 'Iron remover, tar remover and clay treatment.' },
      { title: 'Protection', description: 'Sealant, glass treatment and tyre finish.' },
    ],
    duration: '1 day',
    packageIds: ['exterior-wash', 'exterior-detail'],
    faqs: [
      {
        id: 'exterior-matte',
        question: 'Can you detail matte or satin paint?',
        answer: 'Yes. Matte finishes need dedicated chemistry and no polishing or wax; we adapt the process accordingly.',
      },
    ],
    related: ['interior', 'maintenance', 'ceramic'],
    seo: {
      title: 'Exterior Detailing',
      description:
        'Safe-contact washing, decontamination and sealant protection for premium vehicles. Sample prices from 700 PLN.',
    },
  },
  {
    id: 'interior',
    slug: 'interior-detailing',
    index: '05',
    name: 'Interior Detailing',
    shortName: 'Interior',
    category: 'interior',
    tagline: 'The cabin is where you actually spend your time.',
    summary:
      'Deep cleaning, conditioning and protection for leather, Alcantara, carbon and piano-black surfaces — handled with the same care as paint.',
    description: [
      'Modern cabins combine materials that each need different treatment: semi-aniline and coated leather, Alcantara, open-pore wood, carbon fibre and easily marked gloss-black plastics. We identify each material before choosing chemistry and tools.',
      'Leather is cleaned with pH-balanced cleaners and soft brushes to lift dirt from the grain, then protected. Alcantara is cleaned and re-fluffed, carpets extracted, and vents, seams and switchgear detailed with soft brushes.',
    ],
    heroImage: 'interior-black',
    previewImage: 'leather-perforated',
    gallery: [
      { image: 'leather-perforated', caption: 'Perforated leather cleaned without flooding the perforations.' },
      { image: 'interior-dash', caption: 'Soft brushes lift dust from vents, seams and switchgear.' },
      { image: 'steering-wheel', caption: 'High-touch surfaces cleaned and returned to a factory satin.' },
    ],
    benefits: [
      { title: 'Material-specific care', description: 'Leather, Alcantara, wood and carbon each treated correctly.' },
      { title: 'Protection', description: 'Leather and fabric protection to resist dye transfer and spills.' },
      { title: 'Hygiene', description: 'Steam and extraction for carpets and high-touch areas.' },
      { title: 'Factory finish', description: 'No greasy dressings — surfaces returned to their original sheen.' },
    ],
    limitations: [
      'Worn or cracked leather can be cleaned and protected but may need professional colour repair.',
      'Some stains — dye transfer set into leather, bleach marks — can be reduced but not always removed.',
    ],
    idealFor: ['Light-coloured leather', 'Family and daily use', 'Pre-owned purchases'],
    process: [
      { title: 'Material survey', description: 'Each surface identified and tested before cleaning.' },
      { title: 'Dry & deep clean', description: 'Vacuum, brush, steam and hot-water extraction.' },
      { title: 'Leather care', description: 'Gentle cleaning followed by protection.' },
      { title: 'Final detail', description: 'Glass, screens and trim finished streak-free.' },
    ],
    duration: '1–2 days',
    packageIds: ['interior-refresh', 'interior-deep', 'interior-leather'],
    faqs: [
      {
        id: 'interior-screens',
        question: 'Are screens and gloss-black trim safe?',
        answer: 'We use dedicated screen cleaners and plush microfibre, and never dry-wipe gloss-black plastics.',
      },
    ],
    related: ['exterior', 'maintenance', 'ceramic'],
    seo: {
      title: 'Interior Detailing',
      description:
        'Material-specific interior detailing for leather, Alcantara and carbon. Deep cleaning and protection — sample prices from 800 PLN.',
    },
  },
  {
    id: 'maintenance',
    slug: 'premium-maintenance',
    index: '06',
    name: 'Premium Maintenance',
    shortName: 'Maintenance',
    category: 'maintenance',
    tagline: 'Keep the finish exactly as it left the studio.',
    summary:
      'Scheduled care visits for coated and filmed vehicles: safe washing, decontamination, coating top-ups and a written condition report.',
    description: [
      'Protection performs best when it is maintained. Our maintenance visits use the same safe-wash method as a full detail, remove the contamination that builds up between visits and refresh the top layer of coatings with compatible products.',
      'Each visit ends with an inspection under studio lighting and a short condition report, so small issues — a chip in film, early water spotting — are caught while they are still small.',
    ],
    heroImage: 'detailer-work',
    previewImage: 'tyre-brush',
    gallery: [
      { image: 'detailer-wax', caption: 'Top-up layers applied and levelled by hand.' },
      { image: 'microfiber-red', caption: 'Fresh microfibre for every section of the car.' },
      { image: 'water-beading', caption: 'Foam pre-wash protects the finish during maintenance.' },
    ],
    benefits: [
      { title: 'Preserves protection', description: 'Keeps coatings and film performing as intended.' },
      { title: 'Condition reports', description: 'A written record of the finish at every visit.' },
      { title: 'Priority scheduling', description: 'Reserved slots for maintenance clients.' },
      { title: 'Consistent care', description: 'The same method, every time.' },
    ],
    limitations: [
      'Maintenance visits do not include paint correction; marring found during inspection is quoted separately.',
    ],
    idealFor: ['Coated or filmed vehicles', 'Owners without wash facilities', 'Collections and garaged cars'],
    process: [
      { title: 'Safe wash', description: 'Foam, two-bucket contact wash and touch-free drying.' },
      { title: 'Decontamination', description: 'Iron and tar removal as required.' },
      { title: 'Top-up', description: 'Compatible coating booster applied to paint and glass.' },
      { title: 'Report', description: 'Inspection and written notes on condition.' },
    ],
    duration: '3–6 hours',
    packageIds: ['maintenance-visit', 'maintenance-seasonal'],
    faqs: [
      {
        id: 'maintenance-frequency',
        question: 'How often should a coated car be maintained?',
        answer:
          'For daily-driven cars, every eight to twelve weeks works well; garaged weekend cars may need only two or three visits a year.',
      },
    ],
    related: ['ceramic', 'ppf', 'exterior'],
    seo: {
      title: 'Premium Maintenance',
      description:
        'Scheduled maintenance for coated and PPF-protected vehicles with condition reports. Sample prices from 400 PLN.',
    },
  },
];

export const serviceById = (id: ServiceId): Service => {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
};

export const getServiceBySlug = (slug: string): Service | undefined => services.find((s) => s.slug === slug);

export const serviceHref = (service: Service) => `/services/${service.slug}`;

/** Which outcome each service addresses — drives the comparison matrix on /services. */
export const serviceGoals: { goal: string; values: Record<ServiceId, 'primary' | 'partial' | null> }[] = [
  { goal: 'Defends against stone chips', values: { ppf: 'primary', ceramic: null, correction: null, exterior: null, interior: null, maintenance: null } },
  { goal: 'Removes swirls & light scratches', values: { ppf: null, ceramic: 'partial', correction: 'primary', exterior: null, interior: null, maintenance: null } },
  { goal: 'Adds gloss & depth', values: { ppf: 'partial', ceramic: 'primary', correction: 'primary', exterior: 'partial', interior: null, maintenance: 'partial' } },
  { goal: 'Makes washing easier', values: { ppf: 'partial', ceramic: 'primary', correction: null, exterior: 'partial', interior: null, maintenance: 'partial' } },
  { goal: 'Restores the cabin', values: { ppf: null, ceramic: null, correction: null, exterior: null, interior: 'primary', maintenance: null } },
  { goal: 'Preserves existing protection', values: { ppf: null, ceramic: null, correction: null, exterior: 'partial', interior: null, maintenance: 'primary' } },
];

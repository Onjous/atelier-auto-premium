import type { Article, ArticleCategory } from '@/types/content';

export const articleCategories: { id: ArticleCategory; label: string }[] = [
  { id: 'protection', label: 'Protection' },
  { id: 'paint', label: 'Paint' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'interior', label: 'Interior' },
  { id: 'seasonal', label: 'Seasonal' },
];

const EDITORIAL = 'Atelier Auto Editorial';

export const articles: Article[] = [
  {
    slug: 'ppf-vs-ceramic-coating',
    title: 'PPF vs Ceramic Coating: Different Tools, Different Jobs',
    dek: 'Film and coatings are often sold as rivals. They are not. Here is what each one physically does — and when you need both.',
    category: 'protection',
    publishedAt: '2026-09-18',
    author: EDITORIAL,
    heroImage: 'hood-white',
    featured: true,
    relatedServices: ['ppf', 'ceramic'],
    blocks: [
      {
        type: 'p',
        text: 'The most common question we hear at consultation is “should I get PPF or ceramic?” It is a reasonable question built on a misleading premise. Paint protection film and ceramic coatings sit at different thicknesses, are made from different materials and defend against different threats. Choosing between them is less like choosing between two brands of the same product and more like choosing between a helmet and sunscreen.',
      },
      { type: 'h2', id: 'what-film-is', text: 'What paint protection film actually is' },
      {
        type: 'p',
        text: 'Paint protection film is a thermoplastic urethane sheet with an adhesive layer beneath and a clear top coat above. Typical premium films are in the region of 150–200 microns thick — several times the thickness of a modern clear coat. That thickness is the point. When a stone strikes a filmed bonnet, the urethane deforms and absorbs energy that would otherwise crack the paint.',
      },
      {
        type: 'p',
        text: 'Most current films also carry a “self-healing” top coat. Fine marring from washing relaxes when the film is warmed by sun or warm water. This is genuinely useful, but it is worth being precise: self-healing addresses light surface marks, not cuts or impact craters.',
      },
      { type: 'h2', id: 'what-coating-is', text: 'What a ceramic coating actually is' },
      {
        type: 'p',
        text: 'A ceramic coating is a liquid that cures into a very thin, hard layer bonded to the clear coat — measured in single microns rather than hundreds. It cannot absorb an impact in any meaningful way. What it does well is chemical and optical: it resists etching from bird droppings and road salts, repels water, makes dirt release more easily and sharpens the reflections of well-prepared paint.',
      },
      {
        type: 'callout',
        title: 'The short version',
        text: 'Film is physical protection against chips. Coating is chemical protection and ease of cleaning. Neither replaces the other.',
      },
      { type: 'h2', id: 'side-by-side', text: 'Side by side' },
      {
        type: 'table',
        caption: 'Typical characteristics. Exact values vary by product and installation.',
        head: ['', 'Paint protection film', 'Ceramic coating'],
        rows: [
          ['Typical thickness', '≈150–200 µm', 'Single microns'],
          ['Stone-chip protection', 'Yes — absorbs impacts', 'No'],
          ['Gloss enhancement', 'Slight', 'Significant on prepared paint'],
          ['Ease of washing', 'Good', 'Excellent'],
          ['Reversible', 'Yes, by a professional', 'Wears away; can be polished off'],
          ['Relative cost', 'Higher', 'Lower'],
        ],
      },
      { type: 'h2', id: 'which-do-you-need', text: 'Which do you need?' },
      {
        type: 'p',
        text: 'Start with how the car is used. Motorway miles, track days and low-slung bodywork all mean stone strikes on the leading edges, and only film addresses that. A garaged weekend car used on clean roads may be perfectly served by correction and a coating.',
      },
      {
        type: 'ul',
        items: [
          'Daily driver on fast roads: film on the front end, coating on the rest.',
          'Track car: extended film coverage including sills and rear arches.',
          'Garaged collector car: correction and coating, or full-body film for long-term preservation.',
          'Matte or satin paint: film, because matte finishes cannot be polished to remove damage.',
        ],
      },
      { type: 'h2', id: 'installation', text: 'What installation actually involves' },
      {
        type: 'p',
        text: 'The quality of a film installation is decided long before the film is unrolled. Paint is decontaminated and, where needed, polished, because any defect left beneath the film is preserved under a clear layer for years. Panels are then wiped free of oils so the adhesive can bond evenly.',
      },
      {
        type: 'p',
        text: 'Most studios start from pre-cut patterns generated for each model, then adjust them by hand. The craft is in the edges: wherever panel geometry allows, film is wrapped around the edge so the seam disappears. Where wrapping is not safe — tight radii, badges, sensors — the film is finished just short of the edge, and that line is visible if you look for it. Ask to see edge work on a finished car before you commit.',
      },
      {
        type: 'p',
        text: 'Freshly installed film needs time. Small amounts of moisture used during installation evaporate through the film over days, and adhesive reaches full strength over weeks. That is why we ask owners to avoid washing for the first week and to keep pressure-washer jets away from edges.',
      },
      { type: 'h2', id: 'cost', text: 'Cost and value over time' },
      {
        type: 'p',
        text: 'Film costs considerably more than a coating because it is a physical material installed by hand, panel by panel. The value calculation depends on what you are protecting. Respraying a modern bumper and bonnet to factory standard is expensive, rarely an exact match, and permanently changes a car’s originality. For cars where original paint matters, front-end film is often the most economical protection available.',
      },
      {
        type: 'ul',
        items: [
          'Myth: a coating makes paint scratch-proof. Reality: coatings resist light marring slightly better than bare clear coat; they do not prevent scratches.',
          'Myth: film always looks like a sticker. Reality: modern films are optically clear; edges and seams are the only tell.',
          'Myth: film damages paint when removed. Reality: removal is safe on healthy factory paint; poorly adhered resprays are the risk.',
        ],
      },
      { type: 'h2', id: 'combining', text: 'Combining both' },
      {
        type: 'p',
        text: 'The most popular configuration in our studio is film on the impact zones and a coating over everything — including the film itself, using a coating formulated for urethane. The film handles chips; the coating makes the whole car, filmed and unfilmed panels alike, easier to clean and more consistent in appearance.',
      },
      {
        type: 'quote',
        text: 'The question is never “which is better?” It is “what is going to happen to this car, and what will defend against it?”',
      },
      {
        type: 'p',
        text: 'Whichever route you take, preparation decides the result. Both film and coatings preserve whatever is beneath them, so swirls and contamination should be removed first. That is why every protection quote we give includes the preparation the paint actually needs — no more, no less.',
      },
    ],
  },
  {
    slug: 'how-paint-correction-works',
    title: 'How Paint Correction Works — and Why We Measure First',
    dek: 'Swirls are not in the colour. They are in a clear coat thinner than a sheet of paper. Understanding that changes how you think about polishing.',
    category: 'paint',
    publishedAt: '2026-08-27',
    author: EDITORIAL,
    heroImage: 'polisher-black',
    relatedServices: ['correction', 'ceramic'],
    blocks: [
      {
        type: 'p',
        text: 'Under direct sunlight, a dark car often looks as though it is wrapped in a fine spider’s web of circular scratches. These swirl marks are the single most common reason clients come to us, and they are almost always caused by washing — automatic brushes, dirty mitts, or drying with the wrong towel.',
      },
      { type: 'h2', id: 'anatomy', text: 'The anatomy of a paint finish' },
      {
        type: 'p',
        text: 'A modern factory finish is a stack of layers: the metal or composite panel, a corrosion-protective primer, the base coat that carries the colour, and a transparent clear coat on top. The clear coat provides gloss and UV protection. On many cars it is only a few dozen microns thick — for scale, a human hair is roughly 70 microns across.',
      },
      {
        type: 'p',
        text: 'Swirls and light scratches live in that clear coat. They scatter light instead of reflecting it cleanly, which is why marred paint looks dull and grey even when the colour beneath is perfect.',
      },
      { type: 'h2', id: 'levelling', text: 'Correction is levelling, not filling' },
      {
        type: 'p',
        text: 'Genuine paint correction removes a microscopically thin layer of clear coat until the surface is level with the bottom of the defects. Once level, reflections become sharp again. Glazes and filler products can hide swirls for a few washes, but they do not remove anything — the marks reappear as soon as the fillers wash away.',
      },
      {
        type: 'callout',
        title: 'Why clear coat is a budget',
        text: 'Every correction spends some clear coat. It does not grow back. Professional correction is about achieving the result while spending as little of that budget as possible.',
      },
      { type: 'h2', id: 'measure', text: 'Why we measure first' },
      {
        type: 'p',
        text: 'Before any machine touches the car, we take paint depth readings across every panel with an electronic gauge. The readings tell us whether a panel is original, whether it has been refinished, and how much total paint is present. Unusually high readings suggest a respray; unusually low readings suggest previous heavy polishing.',
      },
      {
        type: 'p',
        text: 'A gauge measures total paint film, not clear coat alone, so readings are interpreted alongside the car’s history and a test section. The test section is where we find the least aggressive combination of pad, compound and machine that achieves the result.',
      },
      { type: 'figure', image: 'polish-blue', caption: 'A refining pass with a dual-action polisher, after the cutting stage.' },
      { type: 'h2', id: 'stages', text: 'One step, two steps, or more' },
      {
        type: 'ol',
        items: [
          'Enhancement — a single polishing step that removes light marring and significantly improves gloss. Ideal for newer or well-kept cars.',
          'Two-step correction — a cutting stage to remove deeper swirls, followed by a refining stage to restore clarity.',
          'Multi-stage or concours — additional cutting and refining, sometimes localised wet sanding, for the closest possible approach to a defect-free finish.',
        ],
      },
      { type: 'h2', id: 'light', text: 'Light decides what you can see' },
      {
        type: 'p',
        text: 'Defects are only as visible as the light used to look for them. Diffuse overhead lighting flatters paint; a single point source shows everything. We inspect under several light temperatures — warm, neutral and cold — and with a handheld “sun gun” that mimics direct sunlight, because different defects reveal themselves under different light. Holograms left by a previous rotary polish, for example, often only appear in hard, low-angle sun.',
      },
      {
        type: 'p',
        text: 'This is also why the same car can look perfect in a showroom and disappointing on a sunny forecourt. A correction is judged against the harshest light the car will see, not the kindest.',
      },
      { type: 'h2', id: 'tools', text: 'Machines, pads and compounds' },
      {
        type: 'p',
        text: 'Correction combines three variables: the machine, the pad and the abrasive. A rotary polisher spins on a single axis and cuts quickly, but it builds heat and can leave holograms if not finished correctly. A dual-action polisher oscillates as it spins, which is gentler and more forgiving, and is the workhorse for most modern clear coats.',
      },
      {
        type: 'p',
        text: 'Pads range from aggressive microfibre and wool for cutting to soft foam for finishing. Compounds contain abrasives that break down as they are worked, cutting less as they go. The skill lies in matching all three to the paint in front of you — modern ceramic-hardened clear coats and soft Japanese paints behave very differently under the same combination.',
      },
      { type: 'h2', id: 'duration', text: 'How long a correction lasts' },
      {
        type: 'p',
        text: 'Removed defects do not come back on their own; new ones are added. The finish will last exactly as long as the car is washed and dried carefully. Pairing correction with a coating or self-healing film, and with a safe washing routine, is how a correction stays a correction.',
      },
      { type: 'h2', id: 'limits', text: 'What correction cannot do' },
      {
        type: 'p',
        text: 'If a scratch has gone through the clear coat into the colour, no amount of polishing will remove it — only paint repair can. A useful test: if your fingernail catches in the scratch, it is likely too deep to remove completely. In those cases we reduce the scratch’s visibility and explain exactly why it remains.',
      },
      {
        type: 'quote',
        text: 'An honest correction leaves a little clear coat behind for the next owner. A reckless one leaves nothing.',
      },
      {
        type: 'p',
        text: 'Finally, correction is only half the job. Without protection and a safe washing routine, swirls return. That is why most corrections are followed by a coating or film — and by a conversation about how the car will be washed.',
      },
    ],
  },
  {
    slug: 'protecting-a-luxury-vehicle-finish',
    title: 'Protecting a Luxury Vehicle’s Finish: A Practical Framework',
    dek: 'Protection works best as a system. A simple way to decide what your car needs, in what order, and why.',
    category: 'protection',
    publishedAt: '2026-07-30',
    author: EDITORIAL,
    heroImage: 'porsche-black-garage',
    relatedServices: ['ppf', 'ceramic', 'maintenance'],
    blocks: [
      {
        type: 'p',
        text: 'Owners of high-end cars are often presented with a menu: film, coatings, sealants, glass treatments, wheel coatings. The menu is less useful than a framework. We think about protection in four layers — inspection, correction, protection and maintenance — and every recommendation we make maps to one of them.',
      },
      { type: 'h2', id: 'inspect', text: '1. Inspect before you protect' },
      {
        type: 'p',
        text: 'New cars are not necessarily perfect. Transport, storage and pre-delivery washing frequently leave marring, light scratches or contamination. A pre-protection inspection under proper lighting, with paint depth readings, establishes the real starting point and identifies any refinished panels.',
      },
      { type: 'h2', id: 'correct', text: '2. Correct only what is necessary' },
      {
        type: 'p',
        text: 'Both film and coatings lock in the condition beneath them. A light enhancement polish is usually enough for a new car; an older car may need a two-step correction. Over-polishing a new car wastes clear coat for no visible gain.',
      },
      { type: 'h2', id: 'protect', text: '3. Match protection to real threats' },
      {
        type: 'table',
        caption: 'A simple threat-to-protection map.',
        head: ['Threat', 'Best defence'],
        rows: [
          ['Stone chips on the front end', 'Paint protection film'],
          ['Bird droppings, insects, salt', 'Ceramic coating (or film)'],
          ['Wash-induced swirls', 'Safe wash method + coating or self-healing film'],
          ['Brake dust on wheels', 'Wheel coating'],
          ['Dye transfer on light leather', 'Leather protection'],
          ['UV fading of interior trim', 'Interior protection, shade, garaging'],
        ],
      },
      { type: 'h2', id: 'maintain', text: '4. Maintain, or lose the benefit' },
      {
        type: 'p',
        text: 'No coating or film is maintenance-free. Protection reduces the effort of keeping a car clean; it does not remove it. A car that is regularly washed with the right method and periodically decontaminated will look better for longer than one with expensive protection and poor care.',
      },
      {
        type: 'callout',
        title: 'Be wary of permanence',
        text: 'Any product marketed as permanent, scratch-proof or maintenance-free is overselling. Realistic lifespans depend on use, climate and care.',
      },
      { type: 'h2', id: 'new-or-used', text: 'New car or established car?' },
      {
        type: 'p',
        text: 'For a new car, the window between delivery and first use is the best moment to protect it. The paint has not yet been chipped, the interior has not yet been marked, and only a light enhancement is usually needed before film or coating. Some owners arrange for the car to come straight from the dealer to the studio.',
      },
      {
        type: 'p',
        text: 'For an established car, the order matters more. Existing chips should be assessed — small ones can often be touched in before film is applied — and the paint should be measured, because earlier polishing or refinishing changes what is safe. The aim is to protect the car as it is today, honestly documented, rather than to pretend it is new.',
      },
      { type: 'h2', id: 'budget', text: 'Where to start on a budget' },
      {
        type: 'ol',
        items: [
          'A safe washing routine and the right equipment — the cheapest, most effective protection there is.',
          'Front-end film on the areas that take stone strikes, if the car is driven at speed.',
          'A coating on the remaining paintwork, wheels and glass for easier cleaning.',
          'Interior protection for light leather or a car used daily by a family.',
          'Scheduled maintenance visits to keep everything above performing.',
        ],
      },
      { type: 'figure', image: 'detailer-work', caption: 'Protection is only as good as the preparation beneath it.' },
      { type: 'h2', id: 'questions', text: 'Questions worth asking any detailer' },
      {
        type: 'ul',
        items: [
          'Will you measure paint depth before polishing, and will I see the readings?',
          'Which film or coating will you use, and what does its warranty actually cover?',
          'How are edges finished, and where will seams be visible?',
          'What will the treatment not do for my car?',
          'What maintenance do you recommend, and what will it cost?',
        ],
      },
      {
        type: 'p',
        text: 'A studio that answers these clearly, in writing, is a studio that expects to be held to its work.',
      },
      { type: 'h2', id: 'storage', text: 'Storage matters more than most products' },
      {
        type: 'p',
        text: 'A dry, ventilated garage and a breathable indoor cover protect paint, leather and rubber seals better than any product applied to them. If the car lives outdoors, prioritise coatings for chemical resistance and park away from trees where sap and droppings collect.',
      },
      {
        type: 'p',
        text: 'Put together, the framework is simple: know the starting point, fix only what needs fixing, protect against the threats you actually face, and keep up the care. Everything else is detail.',
      },
    ],
  },
  {
    slug: 'maintenance-after-ceramic-coating',
    title: 'Proper Maintenance After a Ceramic Coating',
    dek: 'The first month, the weekly wash and the yearly check-up — how to keep a coating performing.',
    category: 'maintenance',
    publishedAt: '2026-06-12',
    author: EDITORIAL,
    heroImage: 'microfiber-red',
    relatedServices: ['maintenance', 'ceramic'],
    blocks: [
      {
        type: 'p',
        text: 'A ceramic coating changes how a car gets dirty and how easily it gets clean. It does not change the need to wash it properly. Most coating failures we see are not product failures — they are the result of automatic car washes, aggressive chemicals or long gaps between cleans.',
      },
      { type: 'h2', id: 'first-week', text: 'The first seven days' },
      {
        type: 'ul',
        items: [
          'Avoid washing the car for at least seven days while the coating completes its cure.',
          'If water lands on the car, let it run off; dab away bird droppings gently with a damp microfibre as soon as possible.',
          'Do not apply waxes, sealants or detail sprays unless the studio has supplied them.',
        ],
      },
      { type: 'h2', id: 'washing', text: 'The routine wash' },
      {
        type: 'ol',
        items: [
          'Rinse thoroughly to remove loose grit.',
          'Apply a pH-neutral snow foam or pre-wash and let it dwell, then rinse.',
          'Wash top to bottom with a clean mitt using two buckets — one with shampoo, one with clean rinse water.',
          'Use separate mitts and brushes for wheels; never let them touch the paint.',
          'Dry with a plush microfibre towel or filtered air, blotting rather than dragging.',
        ],
      },
      {
        type: 'callout',
        title: 'Water spots',
        text: 'Hard water left to dry on a hydrophobic surface can leave mineral spots. Wash in the shade, dry promptly, and consider filtered water if your supply is hard.',
      },
      { type: 'h2', id: 'avoid', text: 'What to avoid' },
      {
        type: 'ul',
        items: [
          'Automatic brush car washes — they cause marring regardless of coating.',
          'Strong alkaline traffic-film removers used routinely; they can degrade the coating’s top layer.',
          'Polishes and abrasive cleaners, which remove the coating.',
          'Washing in direct sun on hot panels.',
        ],
      },
      { type: 'h2', id: 'decon', text: 'Decontamination and top-ups' },
      {
        type: 'p',
        text: 'Over time, iron particles from brakes and traffic film bond to the surface and mute the coating’s water behaviour. Two to four times a year, an iron remover and gentle decontamination restore it. A compatible booster spray, applied after washing, refreshes the top layer.',
      },
      { type: 'h2', id: 'products', text: 'Choosing the right products' },
      {
        type: 'p',
        text: 'Coated paint does not need specialist chemistry so much as gentle chemistry. A pH-neutral shampoo without added waxes or gloss enhancers cleans without leaving a film that masks the coating’s behaviour. Plush, edgeless microfibre mitts hold grit away from the surface; a large twisted-loop drying towel absorbs water with very little pressure.',
      },
      {
        type: 'p',
        text: 'Keep separate, colour-coded microfibres for paint, wheels, glass and interiors, and wash them separately without fabric softener, which clogs the fibres. A worn or dropped towel should be demoted to wheels — never returned to paint.',
      },
      { type: 'h2', id: 'warning-signs', text: 'Signs the coating needs attention' },
      {
        type: 'ul',
        items: [
          'Water no longer beads or sheets quickly on horizontal panels after a thorough wash.',
          'Dirt clings after rinsing, especially on the lower doors and rear.',
          'The surface feels rough to a clean hand inside a plastic bag — a sign of bonded contamination.',
          'Visible spots that remain after washing, often on the roof and bonnet.',
        ],
      },
      {
        type: 'p',
        text: 'Most of these are contamination, not coating failure. A decontamination wash usually restores the behaviour; if it does not, a top-up layer may be due.',
      },
      { type: 'h2', id: 'wheels-glass', text: 'Wheels, glass and trim' },
      {
        type: 'p',
        text: 'Coated wheels release brake dust with a pH-neutral wheel cleaner and a soft brush; strong acidic wheel cleaners are rarely needed and can shorten the coating’s life. Coated glass benefits from regular cleaning with a dedicated glass cleaner, and wiper blades should be replaced when they begin to judder, as worn rubber abrades the coating faster.',
      },
      { type: 'figure', image: 'foam-mercedes', caption: 'A foam pre-wash removes most grit before anything touches the paint.' },
      { type: 'h2', id: 'inspection', text: 'The annual inspection' },
      {
        type: 'p',
        text: 'Once a year, have the coating inspected under proper lighting. A professional can identify early wear on horizontal surfaces, deal with water spotting before it etches, and advise whether a top-up layer is worthwhile. Our Seasonal Inspection was designed for exactly this.',
      },
      {
        type: 'quote',
        text: 'A coating makes good habits easier. It does not make bad habits harmless.',
      },
    ],
  },
  {
    slug: 'interior-leather-care',
    title: 'Interior Leather Care: Clean Gently, Protect Often',
    dek: 'Most modern car leather is coated. Treat it like a finish, not a hide — and avoid the greasy products that do more harm than good.',
    category: 'interior',
    publishedAt: '2026-05-21',
    author: EDITORIAL,
    heroImage: 'leather-brown',
    relatedServices: ['interior'],
    blocks: [
      {
        type: 'p',
        text: 'The leather in most modern cars is not the soft, porous material of a vintage saddle. It is typically finished with a pigmented, protective top coat. That coating is what wears, cracks and shines with age — and it is what your care routine should be designed around.',
      },
      { type: 'h2', id: 'types', text: 'Know what you are cleaning' },
      {
        type: 'ul',
        items: [
          'Pigmented (coated) leather — the most common. Durable, with a protective surface coating.',
          'Semi-aniline — a lighter coating that reveals more natural grain; more sensitive to stains.',
          'Aniline — little or no protective coating; rare in cars and very absorbent.',
          'Alcantara and microsuede — synthetic, not leather at all, with entirely different needs.',
        ],
      },
      { type: 'h2', id: 'why-shine', text: 'Why leather turns shiny' },
      {
        type: 'p',
        text: 'Factory leather usually has a low, satin sheen. When it starts to look glossy, that is rarely “conditioned” leather — it is a build-up of body oils, dirt and old dressings sitting on the surface. Cleaning, not conditioning, restores the original matte finish.',
      },
      { type: 'figure', image: 'leather-perforated', caption: 'Perforated leather needs a soft brush and very little moisture.' },
      { type: 'h2', id: 'routine', text: 'A safe routine' },
      {
        type: 'ol',
        items: [
          'Vacuum seams and perforations with a soft brush attachment.',
          'Apply a pH-balanced leather cleaner to a soft brush, not directly to the seat.',
          'Work gently in small sections, then wipe with a clean, damp microfibre.',
          'Dry the area and apply a dedicated leather protectant — not an oily dressing.',
        ],
      },
      {
        type: 'callout',
        title: 'Perforated and ventilated seats',
        text: 'Never spray liquid directly onto perforated leather. Moisture can be drawn into the perforations and the ventilation system beneath.',
      },
      { type: 'h2', id: 'frequency', text: 'How often' },
      {
        type: 'table',
        caption: 'A starting point; adjust for use, climate and leather colour.',
        head: ['Use', 'Light clean', 'Deep clean & protect'],
        rows: [
          ['Daily driver, dark leather', 'Monthly', 'Every 3–4 months'],
          ['Daily driver, light leather', 'Every 2 weeks', 'Every 2–3 months'],
          ['Weekend car', 'Every 2 months', 'Twice a year'],
          ['Stored / collection car', 'Before and after storage', 'Yearly'],
        ],
      },
      { type: 'h2', id: 'alcantara', text: 'Alcantara and microsuede' },
      {
        type: 'p',
        text: 'Alcantara is a synthetic microfibre, not leather, and it is ruined by the habits that suit leather. Body oils flatten the pile, leaving shiny, matted patches on steering wheels and bolsters. Clean it with a dedicated, lightly applied cleaner and a soft brush, working gently in one direction, then allow it to dry fully before brushing the pile back up. Never saturate it, and never use leather conditioners on it.',
      },
      { type: 'h2', id: 'avoid', text: 'Products to avoid' },
      {
        type: 'ul',
        items: [
          'All-purpose cleaners and kitchen wipes, which can strip the protective top coat.',
          'Silicone dressings that leave a slippery, glossy film and attract dust.',
          'Household leather “feeds” designed for furniture or saddlery.',
          'Magic-eraser sponges, which are abrasive and remove colour.',
        ],
      },
      { type: 'h2', id: 'screens', text: 'Screens, gloss-black trim and carbon' },
      {
        type: 'p',
        text: 'Modern cabins are full of surfaces that mark more easily than paint. Gloss-black plastics scratch if wiped dry; touchscreens carry anti-glare coatings that dislike ammonia-based cleaners; exposed carbon fibre usually has a lacquer that behaves like clear coat. Use a lightly dampened plush microfibre, a dedicated interior cleaner and no pressure. Interior coatings for these surfaces can reduce fingerprinting and fine marking.',
      },
      { type: 'h2', id: 'dye-transfer', text: 'Dye transfer' },
      {
        type: 'p',
        text: 'New denim is the enemy of light leather. Dye transfer starts as a surface stain that cleans away easily, but left for months it can migrate into the coating. A leather protectant applied every few months makes transfer far easier to remove.',
      },
      {
        type: 'p',
        text: 'Where leather is genuinely worn — cracked bolsters, lost colour — cleaning and protection will improve it, but a colour-matched repair is needed to make the wear disappear. That is a specialist job, and worth doing before the damage spreads.',
      },
    ],
  },
  {
    slug: 'seasonal-vehicle-protection',
    title: 'Seasonal Vehicle Protection: A Year in Four Visits',
    dek: 'Winter salt, spring pollen, summer insects and autumn leaves each attack a car differently. A season-by-season approach.',
    category: 'seasonal',
    publishedAt: '2026-04-08',
    author: EDITORIAL,
    heroImage: 'water-beading',
    relatedServices: ['maintenance', 'exterior', 'ceramic'],
    blocks: [
      {
        type: 'p',
        text: 'In a central European climate, a car faces a different set of threats every few months. Treating care as a seasonal rhythm — rather than an occasional deep clean — keeps protection performing and prevents small problems from becoming permanent.',
      },
      { type: 'h2', id: 'autumn', text: 'Autumn: prepare for winter' },
      {
        type: 'p',
        text: 'Autumn is the most important season for preparation. Leaves and sap stain paint if left; wet, cold weather makes washing harder. This is the time for a thorough decontamination and a fresh layer of protection before road salt arrives.',
      },
      {
        type: 'ul',
        items: [
          'Full decontamination and a coating top-up or sealant.',
          'Glass treatment for visibility in rain.',
          'Wheel protection to resist brake dust and salt.',
          'Check film edges and repair any lifting before frost.',
        ],
      },
      { type: 'h2', id: 'winter', text: 'Winter: rinse the salt away' },
      {
        type: 'p',
        text: 'Road salt and de-icing brine are corrosive and abrasive. Regular rinsing — particularly of the underbody, wheels and arches — matters more than a perfect finish. A touch-free pre-wash removes most salt before any contact is made with the paint.',
      },
      {
        type: 'callout',
        title: 'Garaged cars',
        text: 'A heated garage can accelerate corrosion on a salty car. Rinse before storing it warm, or keep it in a cool, dry space.',
      },
      { type: 'h2', id: 'visibility', text: 'Glass, wipers and lights in the dark months' },
      {
        type: 'p',
        text: 'Winter is when visibility matters most and glass suffers most. Road film builds up on the inside of the windscreen as well as the outside, causing glare from oncoming headlights. A glass coating on the exterior helps rain clear at speed and makes ice easier to remove; the interior simply needs regular cleaning with a dedicated glass cleaner and a clean towel.',
      },
      {
        type: 'p',
        text: 'Never scrape ice from a coated or filmed headlight with a hard scraper, and avoid hot water on frozen glass. Replace wiper blades before the season rather than during it — worn rubber smears, judders and abrades glass coatings faster.',
      },
      { type: 'h2', id: 'cabin', text: 'The cabin through the year' },
      {
        type: 'p',
        text: 'Interiors follow their own seasonal pattern. Winter brings salt, grit and moisture into carpets on every pair of shoes; rubber mats and a deep clean in spring prevent salt from staining and corroding beneath. Summer brings heat and UV: leather dries, dashboards fade and screens glare. Shade, a windscreen screen and a leather protectant applied before summer do more than any restorative treatment afterwards.',
      },
      { type: 'h2', id: 'spring', text: 'Spring: the reset' },
      {
        type: 'p',
        text: 'Spring is the time to undo winter. A full exterior detail with iron and tar removal, a deep interior clean to lift salt residue from carpets, and an inspection for any chips or damage picked up over the cold months.',
      },
      { type: 'h2', id: 'summer', text: 'Summer: heat and insects' },
      {
        type: 'p',
        text: 'Insect residue and bird droppings become acidic in heat and can etch clear coat in days. Remove them promptly with a dedicated cleaner and a soft microfibre. Wash early or late, never on a hot panel, and protect interiors from UV with shade or a windscreen screen.',
      },
      { type: 'h2', id: 'storage', text: 'Storing a car for the season' },
      {
        type: 'p',
        text: 'Many performance cars spend the coldest months off the road. Storage protects a car from salt, but it introduces its own risks: flat-spotted tyres, drained batteries, damp interiors and contamination left to bond for months. Preparation is what makes the difference between a car that wakes up well in spring and one that needs a detail before it can be enjoyed.',
      },
      {
        type: 'ol',
        items: [
          'Wash and decontaminate thoroughly; never store a car dirty.',
          'Clean and dry the interior completely; moisture trapped inside encourages mould.',
          'Inflate tyres to the manufacturer’s storage pressure, or use tyre cradles.',
          'Connect a maintenance charger suited to the car’s battery.',
          'Use a breathable, soft-lined indoor cover — never a plastic sheet.',
          'Keep the space dry and ventilated; a dehumidifier helps in unheated garages.',
        ],
      },
      {
        type: 'p',
        text: 'Before the first drive of spring, check tyre pressures, inspect the paint and film edges under good light, and give the car a gentle wash to remove storage dust before anything abrasive touches it.',
      },
      {
        type: 'table',
        caption: 'A simple annual rhythm for a daily-driven, protected car.',
        head: ['Season', 'Main threat', 'Recommended visit'],
        rows: [
          ['Autumn', 'Sap, leaves, coming salt', 'Seasonal Inspection + top-up'],
          ['Winter', 'Salt and brine', 'Care Visits as needed'],
          ['Spring', 'Accumulated contamination', 'Exterior Detail + Deep Interior'],
          ['Summer', 'Insects, droppings, UV', 'Care Visit'],
        ],
      },
      {
        type: 'p',
        text: 'Four planned visits a year, plus sensible care in between, will keep most protected cars looking as they did on the day of handover.',
      },
    ],
  },
];

const WORDS_PER_MINUTE = 220;

export function readingMinutes(article: Article): number {
  const words = article.blocks
    .flatMap((b) => {
      switch (b.type) {
        case 'ul':
        case 'ol':
          return b.items;
        case 'table':
          return [...b.head, ...b.rows.flat(), b.caption];
        case 'figure':
          return [b.caption];
        case 'callout':
          return [b.title, b.text];
        default:
          return [b.text];
      }
    })
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export const categoryLabel = (id: ArticleCategory) => articleCategories.find((c) => c.id === id)?.label ?? id;
export const getArticleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const articleHref = (a: Article) => `/journal/${a.slug}`;
export const articlesByDate = () => [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

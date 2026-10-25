import type { FaqTopic, TopicFaq } from '@/types/content';

export const faqTopics: { id: FaqTopic; label: string }[] = [
  { id: 'booking', label: 'Booking & visits' },
  { id: 'protection', label: 'Film & coatings' },
  { id: 'correction', label: 'Paint correction' },
  { id: 'aftercare', label: 'Aftercare' },
  { id: 'pricing', label: 'Pricing' },
];

export const faqs: TopicFaq[] = [
  {
    id: 'consultation',
    topic: 'booking',
    featured: true,
    question: 'Do I need a consultation before booking?',
    answer:
      'For film, coatings and correction, yes. We inspect the paint in person, take depth readings and agree the scope before quoting. Washes and maintenance visits can be booked directly.',
  },
  {
    id: 'how-long',
    topic: 'booking',
    question: 'How long will you keep my car?',
    answer:
      'From a few hours for maintenance to around six days for full-body film. You will receive a confirmed schedule before work begins, and we will tell you immediately if anything changes.',
  },
  {
    id: 'secure',
    topic: 'booking',
    question: 'Where is my car kept while it is with you?',
    answer:
      'Vehicles stay indoors in the studio for the full duration of the work. Specific insurance and security arrangements will be confirmed by the studio before launch.',
  },
  {
    id: 'collection',
    topic: 'booking',
    question: 'Can you collect and deliver the car?',
    answer: 'Enclosed collection and delivery is available locally as an add-on. Longer distances are quoted on request.',
  },
  {
    id: 'ppf-vs-ceramic',
    topic: 'protection',
    featured: true,
    question: 'Should I choose PPF or a ceramic coating?',
    answer:
      'They solve different problems. Film physically absorbs stone chips; a coating improves gloss and makes cleaning easier but will not stop chips. Many owners combine film on the front with a coating everywhere else.',
  },
  {
    id: 'self-healing',
    topic: 'protection',
    question: 'What does “self-healing” film actually mean?',
    answer:
      'The film’s top coat can recover from fine marring, such as wash swirls, when warmed. It does not repair cuts, deep scratches or impact damage.',
  },
  {
    id: 'permanent',
    topic: 'protection',
    featured: true,
    question: 'Is any protection permanent?',
    answer:
      'No. Film and coatings wear with use, weather and washing. We give realistic expectations based on how you use the car, and maintenance extends their life considerably.',
  },
  {
    id: 'correction-thin',
    topic: 'correction',
    question: 'Is polishing safe for thin paint?',
    answer:
      'We measure paint depth on every panel before polishing. Where clear coat is thin or a panel has been refinished, we adjust the approach — or advise against polishing.',
  },
  {
    id: 'correction-all-scratches',
    topic: 'correction',
    featured: true,
    question: 'Will paint correction remove every scratch?',
    answer:
      'Most swirls and light scratches can be removed. Defects that go through the clear coat cannot be polished away safely; we will show you which ones before we start.',
  },
  {
    id: 'aftercare-wash',
    topic: 'aftercare',
    question: 'How should I wash a coated car?',
    answer:
      'Use a pH-neutral shampoo, a two-bucket method and clean microfibre. Avoid automatic brush washes. Our handover includes a written care guide.',
  },
  {
    id: 'aftercare-first-wash',
    topic: 'aftercare',
    question: 'When can I wash the car after treatment?',
    answer: 'Wait seven days after film or coating before the first wash, so adhesives and coatings can fully cure.',
  },
  {
    id: 'pricing-final',
    topic: 'pricing',
    featured: true,
    question: 'Why can’t you give an exact price online?',
    answer:
      'Size is easy to account for; condition is not. Two identical cars can need very different amounts of correction. Our calculator gives a transparent estimate, and the inspection confirms the final figure.',
  },
  {
    id: 'pricing-sample',
    topic: 'pricing',
    question: 'Are the prices on this website real?',
    answer:
      'Not yet. This is a demonstration website and all prices are editable sample values in PLN. They illustrate how pricing will be presented.',
  },
  {
    id: 'pricing-deposit',
    topic: 'pricing',
    question: 'Do you require a deposit?',
    answer: 'Deposit terms will be confirmed by the studio and shown clearly before any booking is finalised.',
  },
];

export const featuredFaqs = faqs.filter((f) => f.featured);

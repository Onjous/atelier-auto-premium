export interface StudioStep {
  index: string;
  title: string;
  description: string;
  instrument: string;
}

export const studioProcess: StudioStep[] = [
  {
    index: '01',
    title: 'Consultation',
    description:
      'A conversation about how the car is used, stored and washed. Protection only makes sense in the context of a real life with the vehicle.',
    instrument: 'Usage profile · goals · budget',
  },
  {
    index: '02',
    title: 'Vehicle Inspection',
    description:
      'Paint depth readings on every panel, inspection under multiple light temperatures, and a record of existing chips, resprays and wear.',
    instrument: 'Depth gauge · inspection lights · photo log',
  },
  {
    index: '03',
    title: 'Surface Preparation',
    description:
      'Safe washing and chemical decontamination, then clay. Nothing is polished or protected until the surface is genuinely clean.',
    instrument: 'pH-neutral foam · iron remover · clay',
  },
  {
    index: '04',
    title: 'Precision Treatment',
    description:
      'Correction, coating or film — performed by one specialist per vehicle, in a controlled bay, at whatever pace the work requires.',
    instrument: 'Test sections · panel-by-panel work',
  },
  {
    index: '05',
    title: 'Quality Control',
    description:
      'A second specialist inspects every panel under sun-simulating light. Anything that does not meet the standard goes back to stage four.',
    instrument: 'Second-person inspection · checklist',
  },
  {
    index: '06',
    title: 'Vehicle Handover',
    description:
      'We walk around the car with you under the lights, explain what was done and what to expect, and hand over a written care guide.',
    instrument: 'Walk-round · care guide · follow-up',
  },
];

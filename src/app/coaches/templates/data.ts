export type TemplateSummary = {
  id: string;
  title: string;
  focus: string;
  duration: string;
  rating: number;
  coaches: number;
  price: number;
  summary: string;
  modules: string[];
  requirements: string[];
};

export const TEMPLATE_DATA: ReadonlyArray<TemplateSummary> = [
  {
    id: "force-phase-2",
    title: "Force Phase 2",
    focus: "Strength & velocity",
    duration: "4 weeks",
    rating: 4.9,
    coaches: 86,
    price: 149,
    summary:
      "A four-week acceleration block combining heavy triples, velocity tracking, and targeted accessory work.",
    modules: [
      "Week 1: Heavy accumulation",
      "Week 2: Velocity contrast",
      "Week 3: Power triphasic",
      "Week 4: Deload & testing",
    ],
    requirements: ["Barbell", "Velocity tracker", "Sled or prowler"],
  },
  {
    id: "altitude-engine",
    title: "Altitude Engine",
    focus: "Endurance + strength hybrid",
    duration: "6 weeks",
    rating: 4.8,
    coaches: 64,
    price: 179,
    summary:
      "Build capacity with polarized endurance sessions and strength maintenance lifts across a six-week climb.",
    modules: [
      "Week 1-2: Aerobic base + low-volume strength",
      "Week 3-4: Threshold ladder",
      "Week 5: Peak simulation",
      "Week 6: Taper & testing",
    ],
    requirements: ["Bike or rower", "Dumbbells", "HR monitor"],
  },
  {
    id: "reset-72",
    title: "Reset 72",
    focus: "Recovery & mobility",
    duration: "2 weeks",
    rating: 5,
    coaches: 112,
    price: 89,
    summary:
      "A 72-hour rotating recovery protocol with mobility, tissue care, and nervous system resets.",
    modules: [
      "Day 1: Tissue + mobility",
      "Day 2: CNS downshift",
      "Day 3: Aerobic flush",
    ],
    requirements: ["Foam roller", "Bands", "Low-impact cardio"],
  },
  {
    id: "hybrid-power",
    title: "Hybrid Power",
    focus: "Strength + conditioning",
    duration: "8 weeks",
    rating: 4.7,
    coaches: 48,
    price: 199,
    summary:
      "Alternate powerlifting emphasis with high-intensity intervals to develop force and engine.",
    modules: [
      "Week 1-2: Heavy + short intervals",
      "Week 3-4: Speed + threshold",
      "Week 5-6: Strength endurance",
      "Week 7-8: Peak & deload",
    ],
    requirements: ["Barbell", "Conditioning rig", "Timer"],
  },
  {
    id: "corporate-resilience",
    title: "Corporate Resilience",
    focus: "Team durability",
    duration: "6 weeks",
    rating: 4.6,
    coaches: 37,
    price: 129,
    summary:
      "Team-based durability sprints designed for distributed corporate groups with minimal gear.",
    modules: [
      "Week 1-2: Movement foundations",
      "Week 3-4: Strength endurance",
      "Week 5-6: Mobility focus",
    ],
    requirements: ["Light dumbbells", "Bands", "Mat"],
  },
  {
    id: "velocity-ramp",
    title: "Velocity Ramp",
    focus: "Speed & plyometrics",
    duration: "3 weeks",
    rating: 4.8,
    coaches: 54,
    price: 119,
    summary:
      "Short-cycle plan to prime speed, reactivity, and jumping mechanics before competition.",
    modules: [
      "Week 1: Plyometric prep",
      "Week 2: Max velocity",
      "Week 3: Reactivity & taper",
    ],
    requirements: ["Track or turf", "Boxes", "Timing gates optional"],
  },
] as const;

export function getTemplateById(id: string) {
  return TEMPLATE_DATA.find((template) => template.id === id) ?? null;
}
export type TrackKind = "school" | "university" | "engineer" | "cert";
export type Accent = "cyan" | "mint" | "amber" | "violet";

export type FormationNode = {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  specialization: string;
  years: string;
  timelineLabel: string;
  city: string;
  status: "obtained" | "in_progress";
  kind: TrackKind;
  modules: string[];
  skills: { label: string; value: number }[];
  projects: { id: string; name: string; state?: "Production" | "Developpement" }[];
  mention?: string;
  accent: Accent;
};

export type AccentStyle = {
  border: string;
  softBg: string;
  text: string;
  dot: string;
  glow: string;
  progress: string;
};

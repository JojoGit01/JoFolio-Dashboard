export type FilterKey = "all" | "pro" | "perso";
export type SortKey = "recent" | "impact";

export type ExperienceKind = "CDI" | "FREELANCE" | "STAGE" | "PERSO";
export type ExperienceViewMode = "timeline" | "cards";

export type ExperienceRecord = {
  id: string;
  role: string;
  period: string;
  timelineLabel: string;
  badge: string;
  kind: ExperienceKind;
  org: string;
  city: string;
  impacts: string[];
  stack: string[];
  highlights: {
    delivery: number;
    backend: number;
    apiPerf: number;
    security: number;
  };
  metrics: {
    deliveryGainPercent: number;
    automationGainPercent: number;
    reliabilityGainPercent: number;
    costReductionPercent: number;
    usersImpacted: number;
    projectsCount: number;
  };
  projects: { id: string; title: string; status: "PROD" | "DEV" }[];
  featured?: boolean;
};

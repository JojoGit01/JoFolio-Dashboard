import { PORTFOLIO_DATA } from "@/app/data/portfolioData";

import type { ExperienceRecord, FilterKey, SortKey } from "./types";

export function buildExperienceItems(): ExperienceRecord[] {
  const statusMap = { LIVE: "PROD", WIP: "DEV", DONE: "PROD", BETA: "DEV", ARCHIVE: "PROD" } as const;
  const kindMap = {
    CDI: "CDI",
    CDD: "CDI",
    Freelance: "FREELANCE",
    Stage: "STAGE",
    Personnel: "PERSO",
  } as const;

  return PORTFOLIO_DATA.experiences.map((exp, index) => ({
    id: exp.id,
    role: exp.title,
    period: `${exp.startYear} - ${exp.endYear}`,
    timelineLabel: exp.startYear === exp.endYear ? `${exp.startYear}` : `${exp.startYear}-${exp.endYear}`,
    badge: exp.contractType === "Personnel" ? "Projet Perso" : exp.contractType,
    kind: kindMap[exp.contractType],
    org: exp.company,
    city: exp.location,
    impacts: [...exp.projects.flatMap((p) => p.actions.slice(0, 1)), ...exp.projects.flatMap((p) => p.results.slice(0, 2))].slice(0, 3),
    stack: exp.technologies.slice(0, 8),
    highlights: {
      delivery: Math.max(1, exp.globalImpact.deliveryGainPercent, ...exp.projects.map((p) => p.qualityGainPercent)),
      backend: Math.max(1, exp.globalImpact.automationGainPercent),
      apiPerf: Math.max(1, exp.globalImpact.reliabilityGainPercent, ...exp.projects.map((p) => p.qualityGainPercent)),
      security: Math.max(1, exp.globalImpact.costReductionPercent, ...exp.projects.map((p) => p.costReductionPercent)),
    },
    metrics: {
      deliveryGainPercent: Math.max(
        1,
        exp.globalImpact.deliveryGainPercent,
        ...exp.projects.map((p) => {
          const before = p.deliveryTimeBeforeHours * 60;
          return before > 0 ? Math.round(((before - p.deliveryTimeAfterMinutes) / before) * 100) : 1;
        })
      ),
      automationGainPercent: Math.max(1, exp.globalImpact.automationGainPercent),
      reliabilityGainPercent: Math.max(1, exp.globalImpact.reliabilityGainPercent, ...exp.projects.map((p) => p.qualityGainPercent)),
      costReductionPercent: Math.max(1, exp.globalImpact.costReductionPercent, ...exp.projects.map((p) => p.costReductionPercent)),
      usersImpacted: Math.max(1, exp.projects.reduce((acc, p) => acc + p.usersImpacted, 0)),
      projectsCount: exp.projects.length,
    },
    projects: exp.projects.map((p) => ({
      id: p.id,
      title: p.name,
      status: statusMap[p.status],
    })),
    featured: index === 0,
  }));
}

export function filterAndSortExperienceItems(items: ExperienceRecord[], activeFilter: FilterKey, sortKey: SortKey) {
  const filtered =
    activeFilter === "all"
      ? items
      : activeFilter === "pro"
        ? items.filter((item) => item.kind !== "PERSO")
        : items.filter((item) => item.kind === "PERSO");

  return [...filtered].sort((a, b) => {
    if (sortKey === "recent") {
      const aEnd = Number(a.period.split("-").at(1)?.trim() ?? 0);
      const bEnd = Number(b.period.split("-").at(1)?.trim() ?? 0);
      return bEnd - aEnd;
    }
    const impactA = a.metrics.deliveryGainPercent + a.metrics.automationGainPercent + a.metrics.costReductionPercent + a.metrics.reliabilityGainPercent;
    const impactB = b.metrics.deliveryGainPercent + b.metrics.automationGainPercent + b.metrics.costReductionPercent + b.metrics.reliabilityGainPercent;
    return impactB - impactA;
  });
}

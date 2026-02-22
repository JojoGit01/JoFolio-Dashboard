import { PORTFOLIO_DATA } from "@/app/data/portfolioData";

import type { Accent, FormationNode, TrackKind } from "./types";

export function buildFormationNodes(): FormationNode[] {
  const accentOrder: Accent[] = ["cyan", "mint", "amber", "violet"];
  const currentYear = new Date().getFullYear();
  const mapStatus = (year: number): FormationNode["status"] => (year <= currentYear ? "obtained" : "in_progress");
  const mapKind = (level: string): TrackKind => {
    if (level.toLowerCase().includes("master")) return "engineer";
    if (level.toLowerCase().includes("licence")) return "university";
    return "school";
  };
  const projectState = (status: string): "Production" | "Developpement" => (status === "WIP" ? "Developpement" : "Production");
  const metricFromSeed = (seed: number) => Math.max(1, seed);

  const formationNodes: FormationNode[] = PORTFOLIO_DATA.formations.map((f, idx) => ({
    id: f.id,
    title: f.title,
    subtitle: f.school,
    level: f.level,
    specialization: f.specialization,
    years: `${f.startYear} - ${f.endYear}`,
    timelineLabel: `${f.endYear}`,
    city: `${f.city}, ${f.country}`,
    status: mapStatus(f.endYear),
    kind: mapKind(f.level),
    modules: f.modules.slice(0, 6),
    skills: [
      { label: "Frontend", value: metricFromSeed(f.specialization.toLowerCase().includes("mobile") ? 78 : 1) },
      { label: "Backend", value: metricFromSeed(f.specialization.toLowerCase().includes("develop") ? 74 : 1) },
      { label: "DevOps", value: 1 },
      { label: "Architecture", value: metricFromSeed(f.level.toLowerCase().includes("master") ? 80 : 1) },
    ],
    projects: PORTFOLIO_DATA.projects.slice(idx, idx + 2).map((p) => ({
      id: p.id,
      name: p.name,
      state: projectState(p.status),
    })),
    mention: f.grade === "a remplir" ? undefined : f.grade,
    accent: accentOrder[idx % accentOrder.length],
  }));

  formationNodes.push({
    id: "certifications-node",
    title: "Certifications",
    subtitle: PORTFOLIO_DATA.skills.slice(0, 3).map((s) => s.name).join(" - "),
    level: "Certifications",
    specialization: "Validation continue des competences techniques",
    years: "2024 - 2026",
    timelineLabel: "2026",
    city: "Online",
    status: "obtained",
    kind: "cert",
    modules: PORTFOLIO_DATA.skills.slice(0, 6).map((s) => s.name),
    skills: [
      { label: "Frontend", value: 1 },
      { label: "Backend", value: 1 },
      { label: "DevOps", value: 1 },
      { label: "Architecture", value: 1 },
    ],
    projects: PORTFOLIO_DATA.projects.slice(0, 2).map((p) => ({
      id: p.id,
      name: p.name,
      state: projectState(p.status),
    })),
    mention: "a remplir",
    accent: "violet",
  });

  return formationNodes;
}

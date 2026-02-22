import { Box, Code2, Database, Wrench } from "lucide-react";
import { PORTFOLIO_DATA, type SkillRecord } from "@/app/data/portfolioData";
import type { Category, CategoryKey, RoleKey, Skill } from "./types";

const CURRENT_YEAR = new Date().getFullYear();

export const CATEGORIES: Category[] = [
  { key: "frontend", label: "Front-End", accent: "green", icon: <Code2 size={20} /> },
  { key: "backend", label: "Back-End", accent: "blue", icon: <Database size={20} /> },
  { key: "tools", label: "Outils & ++", accent: "purple", icon: <Wrench size={20} /> },
  { key: "others", label: "Autres", accent: "yellow", icon: <Box size={20} /> },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function mapCategory(category: SkillRecord["category"]): CategoryKey {
  if (category === "Frontend") return "frontend";
  if (category === "Backend" || category === "Database") return "backend";
  if (category === "MobileDesktop") return "others";
  return "tools";
}

function inferRoles(record: SkillRecord): RoleKey[] {
  if (record.category === "Frontend") return ["frontend_lead", "full_stack"];
  if (record.category === "MobileDesktop") return ["frontend_lead", "full_stack"];
  if (record.category === "Backend" || record.category === "Database" || record.category === "SecurityNetwork") {
    return ["backend", "full_stack"];
  }
  if (record.category === "DevOps" || record.category === "TestingQuality") return ["backend", "full_stack"];
  return ["frontend_lead", "full_stack", "backend"];
}

function mapIconKey(name: string): Skill["iconKey"] | undefined {
  const n = name.toLowerCase();
  if (n.includes("react") && !n.includes("native")) return "react";
  if (n.includes("next")) return "next";
  if (n.includes("typescript")) return "ts";
  if (n.includes("tailwind")) return "tailwind";
  if (n.includes("redux")) return "redux";
  if (n.includes("styled")) return "styled";
  if (n.includes("node")) return "node";
  if (n.includes("fastapi")) return "fastapi";
  if (n.includes("docker")) return "docker";
  if (n === "git") return "git";
  if (n.includes("figma")) return "uiux";
  return undefined;
}

function scorePercent(record: SkillRecord) {
  const levelBase: Record<SkillRecord["level"], number> = {
    Beginner: 52,
    Intermediate: 68,
    Advanced: 81,
    Expert: 91,
  };
  const confidenceBonus: Record<SkillRecord["confidence"], number> = {
    Core: 5,
    Strong: 2,
    Working: -3,
  };
  const yearsBonus = Math.min(6, Math.floor(record.years));
  return clamp(levelBase[record.level] + confidenceBonus[record.confidence] + yearsBonus, 45, 99);
}

function scoreImpact(record: SkillRecord) {
  const base = record.priorityScore * 16 + record.years * 4;
  const confidence = record.confidence === "Core" ? 8 : record.confidence === "Strong" ? 4 : 0;
  return clamp(Math.round(base + confidence), 35, 99);
}

function recencyMonths(lastUsedYear: number) {
  return clamp((CURRENT_YEAR - lastUsedYear) * 12, 0, 60);
}

function normalize(s: string) {
  return s.toLowerCase().replace(/\./g, "").trim();
}

function relatedProjects(record: SkillRecord) {
  const skillToken = normalize(record.name);
  return PORTFOLIO_DATA.projects
    .filter((p) => p.stack.some((stack) => normalize(stack).includes(skillToken.split(" ")[0])))
    .slice(0, 2)
    .map((p) => ({
      id: p.id,
      name: p.name,
      stack: p.stack.slice(0, 3),
      status: p.status === "WIP" ? "Developpement" : "Production",
    })) satisfies NonNullable<Skill["projects"]>;
}

function relatedProofs(record: SkillRecord) {
  const related = relatedProjects(record);
  return related.map((p, idx) => {
    const source = PORTFOLIO_DATA.projects.find((project) => project.id === p.id);
    const impact = source?.businessImpact;

    let impactLabel = "Contribution technique appliquee";
    if (impact) {
      if ((impact.deliveryGainPercent ?? 0) > 1) {
        impactLabel = `${impact.deliveryGainPercent > 0 ? "-" : "+"}${Math.abs(impact.deliveryGainPercent)}% temps delivery`;
      } else if ((impact.automationGainPercent ?? 0) > 1) {
        impactLabel = `+${impact.automationGainPercent}% automatisation`;
      } else if ((impact.usersImpacted ?? 0) > 1) {
        impactLabel = `${impact.usersImpacted}+ utilisateurs touches`;
      } else if ((impact.reliabilityGainPercent ?? 0) > 1) {
        impactLabel = `+${impact.reliabilityGainPercent}% fiabilite`;
      }
    }

    return {
      id: `${record.id}-proof-${idx + 1}`,
      project: p.name,
      impact: impactLabel,
    };
  }) satisfies NonNullable<Skill["proofs"]>;
}

function inferExposure(record: SkillRecord, projects: NonNullable<Skill["projects"]>): Skill["exposure"] {
  const hasProd = projects.some((p) => p.status === "Production");
  const hasSideSignals = projects.length > 0;
  const recency = recencyMonths(record.lastUsedYear);
  if (hasProd && (record.confidence === "Core" || record.confidence === "Strong")) return "Prod";
  if (hasSideSignals) return "Side";
  if (record.confidence === "Working" || recency > 18) return "Learning";
  return "Side";
}

function inferUseCases(record: SkillRecord): string[] {
  const name = record.name.toLowerCase();
  if (name.includes("react")) {
    return [
      "Interfaces dashboard riches en etats et composants reutilisables",
      "Mise en place de flows UI orientés productivite",
    ];
  }
  if (name.includes("next")) {
    return [
      "Applications web full-stack avec routing, pages produit et layouts complexes",
      "Structuration front-end orientee maintenabilite et delivery rapide",
    ];
  }
  if (name.includes("typescript")) {
    return [
      "Modelisation des contrats de donnees et reduction des regressions front/back",
      "Refactors plus rapides sur codebases evolutives",
    ];
  }
  if (name.includes("node") || name.includes("nest") || name.includes("express")) {
    return [
      "APIs metier, automatisation de workflows et orchestration de services",
      "Structuration back-end orientee robustesse et exploitation",
    ];
  }
  if (name.includes("postgres") || name.includes("mysql") || name.includes("mongo")) {
    return [
      "Conception de schemas et requetes pour apps produit et dashboards",
      "Optimisation des echanges de donnees et lisibilite des models",
    ];
  }
  if (name.includes("docker") || name.includes("aws") || name.includes("ci/cd")) {
    return [
      "Standardisation des environnements et fluidification des deployements",
      "Automatisation de la livraison et de l'execution des workflows",
    ];
  }
  if (record.category === "Frontend") {
    return [
      "Interfaces orientees conversion et experience utilisateur",
      "Composants reutilisables et design systems pragmatiques",
    ];
  }
  if (record.category === "Backend" || record.category === "Database") {
    return [
      "Couches metier et APIs pour outils internes et plateformes produit",
      "Fiabilisation des traitements et logique serveur",
    ];
  }
  return [
    "Support de la delivery et de la qualite d'execution sur les projets",
    "Acceleration des iterations avec des outils adaptes au contexte",
  ];
}

function toSkill(record: SkillRecord): Skill {
  const projects = relatedProjects(record);
  return {
    id: record.id,
    name: record.name,
    category: mapCategory(record.category),
    percent: scorePercent(record),
    impactScore: scoreImpact(record),
    recencyMonths: recencyMonths(record.lastUsedYear),
    experienceYears: record.years,
    levelLabel: record.level,
    confidence: record.confidence,
    exposure: inferExposure(record, projects),
    roles: inferRoles(record),
    iconKey: mapIconKey(record.name),
    tags: [record.category, `${record.years} ans`, `Recence ${record.lastUsedYear}`],
    useCases: inferUseCases(record),
    projects,
    proofs: relatedProofs(record),
  };
}

export const SKILLS: Skill[] = PORTFOLIO_DATA.skills.map(toSkill);

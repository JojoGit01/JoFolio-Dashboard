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
  return related.map((p, idx) => ({
    id: `${record.id}-proof-${idx + 1}`,
    project: p.name,
    impact: `${record.priorityScore >= 4 ? "+ impact produit" : "a remplir"} (${record.name})`,
  })) satisfies NonNullable<Skill["proofs"]>;
}

function toSkill(record: SkillRecord): Skill {
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
    roles: inferRoles(record),
    iconKey: mapIconKey(record.name),
    tags: [record.category, `${record.years} ans`, `Recence ${record.lastUsedYear}`],
    projects: relatedProjects(record),
    proofs: relatedProofs(record),
  };
}

export const SKILLS: Skill[] = PORTFOLIO_DATA.skills.map(toSkill);

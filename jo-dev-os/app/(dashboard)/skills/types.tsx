// components/skills/types.ts
import type { ReactNode } from "react";

export type CategoryKey = "frontend" | "backend" | "tools" | "others";
export type AccentKey = "green" | "blue" | "purple" | "yellow";
export type RoleKey = "frontend_lead" | "full_stack" | "backend";
export type ConfidenceLevel = "Core" | "Strong" | "Working";

export type Project = {
  id: string;
  name: string;
  stack: string[];
  status?: "Live" | "WIP";
};

export type SkillProof = {
  id: string;
  project: string;
  impact: string;
};

export type Skill = {
  id: string;
  name: string;
  category: CategoryKey;
  percent: number; // 0-100
  impactScore: number; // 0-100
  recencyMonths: number; // months since last production usage (lower is better)
  experienceYears: number;
  levelLabel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  confidence: ConfidenceLevel;
  roles: RoleKey[];
  tags?: string[];
  projects?: Project[];
  proofs?: SkillProof[];

  // Optional key used to render a logo-like badge.
  iconKey?:
    | "react"
    | "next"
    | "ts"
    | "tailwind"
    | "redux"
    | "styled"
    | "node"
    | "docker"
    | "git"
    | "fastapi"
    | "uiux";
};

export type Category = {
  key: CategoryKey;
  label: string;
  accent: AccentKey;
  icon: ReactNode;
};

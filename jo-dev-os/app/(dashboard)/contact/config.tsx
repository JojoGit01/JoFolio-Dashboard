import type { Variants } from "framer-motion";
import {
  BriefcaseBusiness,
  FolderKanban,
  Lightbulb,
  PenTool,
  Smartphone,
  UserRound,
} from "lucide-react";

import { PORTFOLIO_DATA, TOTAL_PROJECTS_WITH_EXPERIENCE } from "@/app/data/portfolioData";

export const LINKEDIN = PORTFOLIO_DATA.contact.linkedin;
export const GITHUB = PORTFOLIO_DATA.contact.github;
export const EMAIL = PORTFOLIO_DATA.contact.email;
export const CALENDLY = "#";
export const TOTAL_PROJECTS = TOTAL_PROJECTS_WITH_EXPERIENCE;

export const REASONS = [
  {
    title: "Architecture scalable",
    desc: "Clean code, patterns, separation claire des responsabilites",
    icon: BriefcaseBusiness,
    accent: "cyan",
  },
  {
    title: "Vision produit",
    desc: "Priorites, UX, performance, livraison rapide",
    icon: Lightbulb,
    accent: "violet",
  },
  {
    title: "UI premium",
    desc: "Dashboard coherent, micro-interactions",
    icon: PenTool,
    accent: "amber",
  },
  {
    title: "Web + Mobile",
    desc: "Next.js, React Native, API, tooling moderne",
    icon: Smartphone,
    accent: "emerald",
  },
] as const;

export const STATS = [
  {
    label: "Projets",
    value: String(TOTAL_PROJECTS),
    width: "86%",
    icon: FolderKanban,
    color: "from-amber-200 via-yellow-200 to-emerald-200",
  },
  {
    label: "Experience pro",
    value: `${PORTFOLIO_DATA.profile.yearsPro} ans`,
    width: "32%",
    icon: BriefcaseBusiness,
    color: "from-cyan-200 to-sky-300",
  },
  {
    label: "Experience perso",
    value: `${PORTFOLIO_DATA.profile.yearsPersonal} ans`,
    width: "84%",
    icon: UserRound,
    color: "from-emerald-200 to-cyan-300",
  },
] as const;

export const REASON_LIST_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const REASON_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

export function getReasonIconClass(accent: (typeof REASONS)[number]["accent"]) {
  if (accent === "cyan") return "text-cyan-200";
  if (accent === "violet") return "text-violet-200";
  if (accent === "amber") return "text-amber-200";
  return "text-emerald-200";
}

export function getStatIconClass(label: (typeof STATS)[number]["label"]) {
  if (label === "Projets") return "text-amber-200";
  if (label === "Experience pro") return "text-cyan-200";
  return "text-emerald-200";
}

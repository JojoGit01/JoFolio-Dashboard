import type { ConfidenceLevel, ExposureLevel, Skill, SkillSortKey } from "./types";

export type CanonicalLevel = "beginner" | "intermediate" | "advanced" | "expert";

export function levelBarTheme(level: CanonicalLevel) {
  if (level === "expert") {
    return {
      fill: "linear-gradient(90deg, rgba(95,241,214,0.95), rgba(121,214,255,0.95))",
      glow: "0 0 14px rgba(95,241,214,0.2)",
      text: "text-[#84f1df]",
    };
  }
  if (level === "advanced") {
    return {
      fill: "linear-gradient(90deg, rgba(255,214,112,0.95), rgba(255,155,96,0.92))",
      glow: "0 0 12px rgba(255,194,120,0.14)",
      text: "text-[#ffd68a]",
    };
  }
  if (level === "intermediate") {
    return {
      fill: "linear-gradient(90deg, rgba(100,207,255,0.95), rgba(122,158,255,0.92))",
      glow: "0 0 14px rgba(100,207,255,0.18)",
      text: "text-[#8bd7ff]",
    };
  }
  return {
    fill: "linear-gradient(90deg, rgba(189,157,255,0.9), rgba(120,157,241,0.88))",
    glow: "0 0 12px rgba(175,145,255,0.12)",
    text: "text-[#ccb2ff]",
  };
}

export function parseLevel(levelLabel: Skill["levelLabel"]): CanonicalLevel {
  const raw = String(levelLabel).toLowerCase();
  if (raw.includes("begin")) return "beginner";
  if (raw.includes("inter")) return "intermediate";
  if (raw.includes("advan")) return "advanced";
  return "expert";
}

export function levelLabelEN(level: CanonicalLevel) {
  if (level === "beginner") return "Beginner";
  if (level === "intermediate") return "Intermediate";
  if (level === "advanced") return "Advanced";
  return "Expert";
}

export function levelIndex(level: CanonicalLevel) {
  if (level === "beginner") return 0;
  if (level === "intermediate") return 1;
  if (level === "advanced") return 2;
  return 3;
}

export function formatRecency(months: number) {
  if (months <= 0) return "Actif maintenant";
  if (months === 1) return "Il y a 1 mois";
  return `Il y a ${months} mois`;
}

export function sortSkills(list: Skill[], sortBy: SkillSortKey = "impact") {
  const copy = [...list];
  copy.sort((a, b) => {
    if (sortBy === "mastery") {
      return b.percent - a.percent || b.impactScore - a.impactScore || a.recencyMonths - b.recencyMonths;
    }
    if (sortBy === "recent") {
      return a.recencyMonths - b.recencyMonths || b.impactScore - a.impactScore || b.percent - a.percent;
    }
    return b.impactScore - a.impactScore || b.percent - a.percent || a.recencyMonths - b.recencyMonths;
  });
  return copy;
}

export function confidenceClass(confidence: ConfidenceLevel) {
  if (confidence === "Core") return "border-[#72dbc4]/35 bg-[#72dbc4]/12 text-[#a6e8da]";
  if (confidence === "Strong") return "border-[#84b7de]/35 bg-[#84b7de]/10 text-[#b8d7ed]";
  return "border-[#b49ed2]/35 bg-[#b49ed2]/10 text-[#d7cce8]";
}

export function exposureClass(exposure: ExposureLevel) {
  if (exposure === "Prod") return "border-emerald-300/30 bg-emerald-300/10 text-emerald-200";
  if (exposure === "Side") return "border-cyan-300/30 bg-cyan-300/10 text-cyan-200";
  return "border-violet-300/30 bg-violet-300/10 text-violet-200";
}

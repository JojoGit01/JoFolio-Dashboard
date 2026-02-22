import { Bike, Code2, Dumbbell, MoonStar } from "lucide-react";

import type { AdventureItem, BalanceItem, GoalItem, InterestAccent, TopCard } from "./types";

export const TOP_CARDS: TopCard[] = [
  {
    id: "code",
    title: "CODE",
    subtitle: "Fullstack • IA • DevOps",
    meta: "20h / semaine",
    image: "/images/interets/interet_code.png",
    imagePosition: "center",
    accent: "cyan",
    chips: [],
    rows: ["Next.js  •  TypeScript", "React  •  Node.js", "AI & Automation"],
    cta: "Voir mes projets",
  },
  {
    id: "moto",
    title: "MOTO",
    subtitle: "Freedom • Road • Travel",
    meta: "15 000+ km / an",
    image: "/images/interets/interet_moto.png",
    imagePosition: "center",
    accent: "amber",
    chips: ["Track Days", "Road Trips", "Mecanique"],
    bullets: ["Alps", "Pyrenees", "Italian coast"],
  },
  {
    id: "muscu",
    title: "MUSCU",
    subtitle: "5x / semaine",
    meta: "5x / semaine",
    image: "/images/interets/interet_muscu.png",
    imagePosition: "center",
    accent: "mint",
    chips: ["Force", "Endurance", "Discipline", "PRs", "Bench 120kg", "Squat 160kg"],
  },
  {
    id: "chill",
    title: "CHILL & FOOD",
    subtitle: "Balance & Recharge",
    meta: "Balance & Recharge",
    image: "/images/interets/interet_manger.png",
    imagePosition: "center",
    accent: "violet",
    chips: ["Sleep 8h", "Foodie", "Series", "Travel"],
  },
];

export const ACCENT = {
  cyan: {
    glow: "rgba(90,218,255,0.38)",
    border: "border-cyan-300/35",
    line: "from-cyan-300 via-sky-300 to-blue-300",
    chip: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
  },
  amber: {
    glow: "rgba(255,192,101,0.34)",
    border: "border-amber-300/35",
    line: "from-amber-300 via-orange-300 to-yellow-300",
    chip: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  },
  mint: {
    glow: "rgba(100,255,212,0.34)",
    border: "border-emerald-300/35",
    line: "from-emerald-300 via-lime-300 to-cyan-300",
    chip: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  },
  violet: {
    glow: "rgba(175,137,255,0.34)",
    border: "border-violet-300/35",
    line: "from-violet-300 via-fuchsia-300 to-indigo-300",
    chip: "border-violet-300/25 bg-violet-300/10 text-violet-100",
  },
} as const satisfies Record<InterestAccent, { glow: string; border: string; line: string; chip: string }>;

export const BALANCE: BalanceItem[] = [
  { label: "Code", value: 40, color: "#38bdf8" },
  { label: "Moto", value: 25, color: "#fb923c" },
  { label: "Muscu", value: 20, color: "#34d399" },
  { label: "Chill & Food", value: 15, color: "#a78bfa" },
];

export const ADVENTURES: AdventureItem[] = [
  { title: "Ride - Alps", date: "March 2024", tag: "Moto", image: "/images/interets/interet_moto.png", accent: "from-amber-300/80 to-transparent" },
  { title: "PR Squat 160kg", date: "April 2024", tag: "Muscu", image: "/images/interets/interet_muscu.png", accent: "from-emerald-300/80 to-transparent" },
  { title: "Hackathon AI Project", date: "Feb 2024", tag: "Code", image: "/images/interets/interet_code.png", accent: "from-cyan-300/80 to-transparent" },
  { title: "Beach Day", date: "Rest", tag: "Chill", image: "/images/interets/interet_manger.png", accent: "from-violet-300/80 to-transparent" },
];

export const GOALS: GoalItem[] = [
  { label: "Track Day - Juillet", area: "Moto", progress: 80, color: "from-cyan-300 to-blue-300" },
  { label: "Mass +5kg", area: "Muscu", progress: 62, color: "from-amber-300 to-orange-300" },
  { label: "Open Source App", area: "Code", progress: 72, color: "from-cyan-300 to-violet-300" },
  { label: "Trip - Italie", area: "Road Trip", progress: 55, color: "from-emerald-300 to-cyan-300" },
];

export function topCardIcon(id: TopCard["id"]) {
  if (id === "code") return <Code2 size={14} className="text-cyan-200" />;
  if (id === "moto") return <Bike size={14} className="text-amber-200" />;
  if (id === "muscu") return <Dumbbell size={14} className="text-emerald-200" />;
  return <MoonStar size={14} className="text-violet-200" />;
}

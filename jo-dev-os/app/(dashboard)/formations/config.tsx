import { BriefcaseBusiness, GraduationCap, School, Star } from "lucide-react";

import type { Accent, AccentStyle, TrackKind } from "./types";

export const ACCENT: Record<Accent, AccentStyle> = {
  cyan: {
    border: "border-cyan-300/35",
    softBg: "bg-cyan-300/10",
    text: "text-cyan-200",
    dot: "bg-cyan-200",
    glow: "rgba(93,223,255,0.34)",
    progress: "from-cyan-300 to-sky-300",
  },
  mint: {
    border: "border-emerald-300/35",
    softBg: "bg-emerald-300/10",
    text: "text-emerald-200",
    dot: "bg-emerald-200",
    glow: "rgba(98,255,216,0.3)",
    progress: "from-emerald-300 to-cyan-300",
  },
  amber: {
    border: "border-amber-300/35",
    softBg: "bg-amber-300/10",
    text: "text-amber-200",
    dot: "bg-amber-200",
    glow: "rgba(255,211,110,0.3)",
    progress: "from-amber-300 to-orange-300",
  },
  violet: {
    border: "border-violet-300/35",
    softBg: "bg-violet-300/10",
    text: "text-violet-200",
    dot: "bg-violet-200",
    glow: "rgba(185,142,255,0.28)",
    progress: "from-violet-300 to-indigo-300",
  },
};

export function nodeIcon(kind: TrackKind) {
  if (kind === "school") return <School size={15} className="text-white/88" />;
  if (kind === "university") return <GraduationCap size={15} className="text-white/88" />;
  if (kind === "engineer") return <BriefcaseBusiness size={15} className="text-white/88" />;
  return <Star size={15} className="text-white/88" />;
}

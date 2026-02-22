import {
  Atom,
  Box,
  Braces,
  Circle,
  Code2,
  Database,
  Layers,
  Sparkles,
  Triangle,
  Wrench,
} from "lucide-react";

import type { AccentKey, Skill } from "./types";

export const ACCENT: Record<
  AccentKey,
  {
    title: string;
    accentText: string;
    glow: string;
    border: string;
    strip: string;
    ring: string;
    chip: string;
    progress: string;
  }
> = {
  green: {
    title: "text-[#71e7cf]",
    accentText: "text-[#8fdccd]",
    glow: "rgba(78,210,183,0.16)",
    border: "border-[#3bbda4]/40",
    strip: "from-[#4acfb3] to-[#62d7c6]",
    ring: "ring-[#3bbda4]/35",
    chip: "border-[#3bbda4]/35 bg-[#3bbda4]/10 text-[#9ae7d8]",
    progress: "from-[#56cfc6] to-[#76c8ef]",
  },
  blue: {
    title: "text-[#7ec8f1]",
    accentText: "text-[#9dd3ef]",
    glow: "rgba(90,176,232,0.16)",
    border: "border-[#4d9dce]/40",
    strip: "from-[#5cb8e8] to-[#6da8d8]",
    ring: "ring-[#4d9dce]/35",
    chip: "border-[#4d9dce]/35 bg-[#4d9dce]/10 text-[#addbf3]",
    progress: "from-[#63c5f1] to-[#6c8fe4]",
  },
  purple: {
    title: "text-[#bf9add]",
    accentText: "text-[#cfb3e6]",
    glow: "rgba(163,118,196,0.15)",
    border: "border-[#8f6cb2]/40",
    strip: "from-[#9c7ac4] to-[#b08ccb]",
    ring: "ring-[#8f6cb2]/35",
    chip: "border-[#8f6cb2]/35 bg-[#8f6cb2]/10 text-[#d2c2e4]",
    progress: "from-[#8f8ce1] to-[#74a5e5]",
  },
  yellow: {
    title: "text-[#d7b887]",
    accentText: "text-[#e2cbab]",
    glow: "rgba(187,148,93,0.15)",
    border: "border-[#9d7f55]/40",
    strip: "from-[#b89462] to-[#caad81]",
    ring: "ring-[#9d7f55]/35",
    chip: "border-[#9d7f55]/35 bg-[#9d7f55]/10 text-[#e8d6bc]",
    progress: "from-[#8db8db] to-[#6d92ca]",
  },
};

export function skillIcon(skill: Skill) {
  const iconClass = "h-6 w-6";
  switch (skill.iconKey) {
    case "react":
      return <Atom className={`${iconClass} text-[#66d8ea]`} />;
    case "next":
      return <Circle className={`${iconClass} text-white/85`} />;
    case "ts":
      return <Braces className={`${iconClass} text-[#78b8f0]`} />;
    case "tailwind":
      return <Sparkles className={`${iconClass} text-[#7acde7]`} />;
    case "redux":
      return <Layers className={`${iconClass} text-[#b8a0de]`} />;
    case "styled":
      return <Triangle className={`${iconClass} text-[#d8a3cb]`} />;
    case "node":
      return <Code2 className={`${iconClass} text-[#9ed9b1]`} />;
    case "fastapi":
      return <Database className={`${iconClass} text-[#89dbc9]`} />;
    case "docker":
      return <Box className={`${iconClass} text-[#89bde2]`} />;
    case "git":
      return <Wrench className={`${iconClass} text-[#d4b08e]`} />;
    default:
      return <Code2 className={`${iconClass} text-white/75`} />;
  }
}

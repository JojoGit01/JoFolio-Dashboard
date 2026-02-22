"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

export default function ExperienceMetricBadge({
  icon,
  value,
  label,
  tone,
  delay = 0,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  tone: "cyan" | "emerald" | "indigo";
  delay?: number;
}) {
  const toneClass =
    tone === "cyan"
      ? "border-cyan-300/28 bg-cyan-300/10"
      : tone === "emerald"
        ? "border-emerald-300/28 bg-emerald-300/10"
        : "border-indigo-300/28 bg-indigo-300/10";

  return (
    <motion.div
      initial={{ y: 12, scale: 0.96 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: "easeOut", delay }}
      whileHover={{ y: -1 }}
      className={["transform-gpu will-change-transform rounded-xl border px-2 py-2 backdrop-blur-sm sm:px-3 sm:py-2.5", toneClass].join(" ")}
    >
      <div className="flex items-center gap-1.5 text-white/75">
        {icon}
        <span className="text-[10px] uppercase tracking-wide">Stats</span>
      </div>
      <div className="mt-1 flex items-end gap-1">
        <span className="text-lg font-semibold leading-none text-white/92 sm:text-xl">{value}</span>
        <span className="text-[11px] text-white/72 sm:text-xs">{label}</span>
      </div>
    </motion.div>
  );
}

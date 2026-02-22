"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { REASONS } from "../config";

export function SocialCard({
  title,
  value,
  href,
  icon,
  accent,
}: {
  title: string;
  value: string;
  href: string;
  icon: ReactNode;
  accent: "cyan" | "violet";
}) {
  const accentClass = accent === "cyan" ? "border-cyan-300/35 bg-cyan-300/10" : "border-violet-300/35 bg-violet-300/10";
  const hoverBorder = accent === "cyan" ? "hover:border-cyan-300/40" : "hover:border-violet-300/40";
  const scanColor = accent === "cyan" ? "via-cyan-200/35" : "via-violet-200/35";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className={[
        "group relative block overflow-hidden rounded-[22px] border border-white/12 bg-[#081529]/84 p-3.5 backdrop-blur-xl transition md:p-4",
        hoverBorder,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(116,217,255,0.12),transparent_42%)] opacity-80" />
      <div
        className={[
          "pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[130%] bg-gradient-to-r from-transparent to-transparent opacity-0 blur-xl transition-all duration-700 group-hover:translate-x-[390%] group-hover:opacity-100",
          scanColor,
        ].join(" ")}
      />
      <div className="flex items-center gap-3">
        <div className={["grid h-10 w-10 place-items-center rounded-xl border", accentClass].join(" ")}>{icon}</div>
        <div className="min-w-0">
          <p className="text-[clamp(16px,1.18vw,21px)] font-semibold text-white/92">{title}</p>
          <p className="mt-0.5 truncate text-[clamp(12px,0.85vw,15px)] text-white/68">{value}</p>
        </div>
        <ArrowRight size={16} className="ml-auto text-white/58 transition group-hover:translate-x-1" />
      </div>
    </motion.a>
  );
}

export function ReasonCard({
  icon,
  title,
  desc,
  accent,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  accent: (typeof REASONS)[number]["accent"];
}) {
  const accentMap: Record<typeof accent, { icon: string; line: string }> = {
    cyan: {
      icon: "border-cyan-300/35 bg-cyan-300/10",
      line: "bg-cyan-300/80",
    },
    violet: {
      icon: "border-violet-300/35 bg-violet-300/10",
      line: "bg-violet-300/80",
    },
    amber: {
      icon: "border-amber-300/35 bg-amber-300/10",
      line: "bg-amber-300/80",
    },
    emerald: {
      icon: "border-emerald-300/35 bg-emerald-300/10",
      line: "bg-emerald-300/80",
    },
  };

  return (
    <div className="relative rounded-[16px] border border-white/12 bg-black/20 p-3 transition hover:border-white/20">
      <div className={["absolute inset-y-4 left-0 w-[2px] rounded-full opacity-80", accentMap[accent].line].join(" ")} />
      <div className="flex items-start gap-3">
        <div className={["grid h-9 w-9 place-items-center rounded-xl border", accentMap[accent].icon].join(" ")}>{icon}</div>
        <div>
          <p className="text-[clamp(15px,1vw,20px)] font-semibold text-white/90">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/68 md:text-[13px]">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export function StatRow({
  icon,
  label,
  value,
  width,
  color,
  index,
  reduceMotion,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  width: string;
  color: string;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="rounded-[14px] border border-white/12 bg-black/22 px-3 py-2.5">
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-white/5">{icon}</div>
        <p className="text-[clamp(14px,0.95vw,18px)] text-white/84">{label}</p>
        <p className="ml-auto text-[clamp(16px,1.2vw,22px)] font-semibold text-white/92">{value}</p>
      </div>
      <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-white/12">
        {reduceMotion ? (
          <div className={["h-full rounded-full bg-gradient-to-r", color].join(" ")} style={{ width }} />
        ) : (
          <motion.div
            className={["h-full rounded-full bg-gradient-to-r", color].join(" ")}
            initial={{ width: 0, opacity: 0.55 }}
            whileInView={{ width, opacity: 1 }}
            viewport={{ once: true, amount: 0.75 }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          />
        )}
      </div>
    </div>
  );
}

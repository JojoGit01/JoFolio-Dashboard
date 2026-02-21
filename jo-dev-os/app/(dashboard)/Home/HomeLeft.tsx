"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Briefcase, Code2, FolderKanban } from "lucide-react";
import { PORTFOLIO_DATA, TOTAL_PROJECTS_WITH_EXPERIENCE } from "@/app/data/portfolioData";

const TOTAL_PROJECTS = TOTAL_PROJECTS_WITH_EXPERIENCE;

type CardId = "building" | "projects" | "contact" | "experience";

export default function HomeLeft({
  active,
  setActive,
}: {
  active: CardId;
  setActive: (id: CardId) => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative z-40 col-span-12 lg:col-span-5"
    >
      <h1 className="mt-4 text-4xl font-bold leading-tight">Hi, I&apos;m Jo</h1>

      <p className="mt-4 text-lg leading-relaxed text-[#E6EDF7]">
        Developpeur full-stack, je concois et developpe des applications web et
        mobiles performantes, fiables et orientees produit.
      </p>

      <p className="mt-4 leading-relaxed text-[#9FB3D1]">
        {PORTFOLIO_DATA.profile.bio}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Briefcase size={18} className="text-[#7fd4ff]" />}
          value={PORTFOLIO_DATA.profile.yearsPro}
          suffix=" Ans"
          label="Experience Pro"
          hint="CDI / Missions"
          accent="blue"
        />
        <StatCard
          icon={<Code2 size={18} className="text-emerald-300" />}
          value={PORTFOLIO_DATA.profile.yearsPersonal}
          suffix=" Ans"
          label="Experience Perso"
          hint="Build & apprentissage"
          accent="green"
        />
        <StatCard
          icon={<FolderKanban size={18} className="text-amber-200" />}
          value={TOTAL_PROJECTS}
          label="Projets"
          hint="Web & Mobile"
          accent="amber"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          onClick={() => setActive("projects")}
          className="
            group relative overflow-hidden
            rounded-2xl border border-[#7fd4ff]/25
            bg-[linear-gradient(90deg,rgba(127,212,255,0.35),rgba(127,212,255,0.15))]
            px-6 py-3 font-semibold text-white
            shadow-[0_0_30px_rgba(127,212,255,0.25)]
            transition-all duration-300
            hover:-translate-y-[2px]
            hover:shadow-[0_0_45px_rgba(127,212,255,0.45)]
            active:scale-[0.98]
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            Voir mes projets
            <ArrowUpRight size={16} />
          </span>
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)] opacity-0 transition duration-300 group-hover:opacity-100" />
        </button>

        <button
          onClick={() => setActive("experience")}
          className="
            group relative rounded-2xl border border-white/15 bg-white/[0.04]
            px-6 py-3 font-semibold text-white/80 backdrop-blur-xl
            transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.07]
            hover:text-white active:scale-[0.98]
          "
        >
          Mes experiences
        </button>

        <button
          onClick={() => setActive("contact")}
          className="
            group relative rounded-2xl border border-white/15 bg-white/[0.04]
            px-6 py-3 font-semibold text-white/80 backdrop-blur-xl
            transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.07]
            hover:text-white active:scale-[0.98]
          "
        >
          Me contacter
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 text-xs text-[#9FB3D1]">
        <Chip id="building" active={active} setActive={setActive} label="En cours" />
        <Chip id="projects" active={active} setActive={setActive} label="Projets" />
        <Chip id="experience" active={active} setActive={setActive} label="Experience" />
        <Chip id="contact" active={active} setActive={setActive} label="Contact" />
      </div>
    </motion.section>
  );
}

type Accent = "blue" | "green" | "amber";

const ACCENT: Record<Accent, { ring: string; glow: string; bar: string; dot: string }> = {
  blue: {
    ring: "ring-[#7fd4ff]/35",
    glow: "shadow-[0_0_0_1px_rgba(127,212,255,0.22),0_18px_70px_rgba(0,0,0,0.35)]",
    bar: "bg-[#7fd4ff]/70",
    dot: "bg-[#7fd4ff]",
  },
  green: {
    ring: "ring-emerald-300/30",
    glow: "shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_18px_70px_rgba(0,0,0,0.35)]",
    bar: "bg-emerald-300/70",
    dot: "bg-emerald-300",
  },
  amber: {
    ring: "ring-amber-200/25",
    glow: "shadow-[0_0_0_1px_rgba(251,191,36,0.16),0_18px_70px_rgba(0,0,0,0.35)]",
    bar: "bg-amber-200/70",
    dot: "bg-amber-200",
  },
};

function StatCard({
  icon,
  value,
  prefix = "",
  suffix = "",
  label,
  hint,
  accent,
}: {
  icon: ReactNode;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  hint: string;
  accent: Accent;
}) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 120, damping: 18, mass: 0.6 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    mv.set(value);
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [mv, rounded, value]);

  const a = useMemo(() => ACCENT[accent], [accent]);

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-xl",
        "ring-1 ring-transparent transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.06]",
        `hover:${a.ring} ${a.glow}`,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.18),transparent_55%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className={["pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-30 blur-2xl", a.bar].join(" ")} />

      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/25">{icon}</div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <div className="text-[20px] font-semibold text-white/90">
              {prefix}
              {display}
              {suffix}
            </div>
            <span className={["h-2 w-2 rounded-full", a.dot].join(" ")} />
          </div>
          <div className="text-[12px] text-white/60">{label}</div>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-[#9FB3D1]">{hint}</div>

      <div className="mt-3 h-[3px] w-14 overflow-hidden rounded-full bg-white/10">
        <div className={["h-full w-8 rounded-full", a.bar].join(" ")} />
      </div>
    </div>
  );
}

function Chip({
  id,
  label,
  active,
  setActive,
}: {
  id: CardId;
  label: string;
  active: CardId;
  setActive: (id: CardId) => void;
}) {
  const isOn = active === id;

  return (
    <button
      onClick={() => setActive(id)}
      className={[
        "rounded-full border bg-white/[0.03] px-3 py-1 transition",
        isOn ? "border-[#7fd4ff]/40 bg-[#7fd4ff]/10 text-white" : "border-white/10 hover:bg-white/[0.06]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Briefcase, Clock3, Code2, FolderKanban, MapPin, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA, TOTAL_PROJECTS_WITH_EXPERIENCE } from "@/app/data/portfolioData";

const TOTAL_PROJECTS = TOTAL_PROJECTS_WITH_EXPERIENCE;

type CardId = "building" | "projects" | "contact" | "experience";

export default function HomeLeft({
  active,
  setActive,
  requestFocusSync,
}: {
  active: CardId;
  setActive: (id: CardId) => void;
  requestFocusSync?: () => void;
}) {
  const handleFocus = (id: CardId) => {
    setActive(id);
    requestFocusSync?.();

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      window.requestAnimationFrame(() => {
        document.getElementById("home-right-panel")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative z-40 col-span-12 lg:col-span-5"
    >
      <h1 className="font-display mt-2 text-2xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
        Bonjour, je suis Jo
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-[#E6EDF7] sm:mt-4 sm:text-lg">
        Developpeur full-stack, je conçois et fais evoluer des produits web et
        mobiles de bout en bout, avec un haut niveau d&apos;exigence sur l&apos;architecture,
        la fiabilite et l&apos;experience utilisateur.
      </p>

      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[#9FB3D1] sm:mt-4 sm:text-base">
        {PORTFOLIO_DATA.profile.bio}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:grid-cols-3">
        <PresencePill
          icon={<Sparkles size={13} className="text-emerald-200" />}
          label="Statut"
          value={PORTFOLIO_DATA.profile.availability}
          accent="emerald"
        />
        <PresencePill
          icon={<MapPin size={13} className="text-cyan-200" />}
          label="Base"
          value={`${PORTFOLIO_DATA.profile.city}, ${PORTFOLIO_DATA.profile.country}`}
          accent="cyan"
        />
        <PresencePill
          icon={<Clock3 size={13} className="text-amber-200" />}
          label="Reponse"
          value={`< ${PORTFOLIO_DATA.contact.responseTimeHours}h`}
          accent="amber"
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
        <StatCard
          icon={<Briefcase size={18} className="text-[#7fd4ff]" />}
          value={PORTFOLIO_DATA.profile.yearsPro}
          suffix=" Ans"
          label="Experience Pro"
          hint="CDI / Missions"
          accent="blue"
          compact
        />
        <StatCard
          icon={<Code2 size={18} className="text-emerald-300" />}
          value={PORTFOLIO_DATA.profile.yearsPersonal}
          suffix=" Ans"
          label="Experience Perso"
          hint="Build & apprentissage"
          accent="green"
          compact
        />
        <StatCard
          icon={<FolderKanban size={18} className="text-amber-200" />}
          value={TOTAL_PROJECTS}
          label="Projets"
          hint="Web & Mobile"
          accent="amber"
          compact
          className="col-span-2 sm:col-span-1"
        />
      </div>

      <div className="mt-6 sm:mt-8">
        <button
          onClick={() => handleFocus("projects")}
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
            w-full sm:w-auto
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            Voir mes projets
            <ArrowUpRight size={16} />
          </span>
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)] opacity-0 transition duration-300 group-hover:opacity-100" />
        </button>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-0 sm:inline-flex sm:flex-wrap sm:items-center sm:gap-4 sm:pl-4">
          <button
            onClick={() => handleFocus("experience")}
            className="
              group relative rounded-2xl border border-white/15 bg-white/[0.04]
              px-4 py-3 text-sm font-semibold text-white/80 backdrop-blur-xl
              transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.07]
              hover:text-white active:scale-[0.98] sm:px-6 sm:text-base
            "
          >
            Mes experiences
          </button>

          <button
            onClick={() => handleFocus("contact")}
            className="
              group relative rounded-2xl border border-white/15 bg-white/[0.04]
              px-4 py-3 text-sm font-semibold text-white/80 backdrop-blur-xl
              transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.07]
              hover:text-white active:scale-[0.98] sm:px-6 sm:text-base
            "
          >
            Me contacter
          </button>
        </div>
      </div>

      <div className="mt-8 hidden flex-wrap gap-2 text-xs text-[#9FB3D1] sm:flex">
        <Chip id="building" active={active} setActive={handleFocus} label="En cours" />
        <Chip id="projects" active={active} setActive={handleFocus} label="Projets" />
        <Chip id="experience" active={active} setActive={handleFocus} label="Experience" />
        <Chip id="contact" active={active} setActive={handleFocus} label="Contact" />
      </div>
    </motion.section>
  );
}

function PresencePill({
  icon,
  label,
  value,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  accent: "emerald" | "cyan" | "amber";
}) {
  const accentClass: Record<"emerald" | "cyan" | "amber", string> = {
    emerald: "from-emerald-300/25 to-transparent border-emerald-300/15",
    cyan: "from-cyan-300/25 to-transparent border-cyan-300/15",
    amber: "from-amber-200/25 to-transparent border-amber-200/15",
  };

  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl border bg-[#0A1528]/70 p-3 backdrop-blur-xl",
        accentClass[accent],
      ].join(" ")}
    >
      <div className={["pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r", accentClass[accent].split(" ")[0], "via-white/0"].join(" ")} />
      <div className="font-data flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/45">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-xs font-medium text-white/88 sm:text-[13px]">{value}</div>
    </div>
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
  compact = false,
  className = "",
}: {
  icon: ReactNode;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  hint: string;
  accent: Accent;
  compact?: boolean;
  className?: string;
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
        compact ? "px-3 py-3 sm:px-4 sm:py-4" : "",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.18),transparent_55%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className={["pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-30 blur-2xl", a.bar].join(" ")} />

      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-black/25 sm:h-10 sm:w-10">{icon}</div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <div className={["font-data tabular-nums font-semibold text-white/90", compact ? "text-[17px] sm:text-[20px]" : "text-[20px]"].join(" ")}>
              {prefix}
              {display}
              {suffix}
            </div>
            <span className={["h-2 w-2 rounded-full", a.dot].join(" ")} />
          </div>
          <div className="font-data text-[11px] text-white/60 sm:text-[12px]">{label}</div>
        </div>
      </div>

      <div className={["font-data mt-2 text-[#9FB3D1]", compact ? "text-[10px] sm:text-[11px]" : "text-[11px]"].join(" ")}>{hint}</div>

      <div className={["mt-3 h-[3px] overflow-hidden rounded-full bg-white/10", compact ? "w-10 sm:w-14" : "w-14"].join(" ")}>
        <div className={["h-full rounded-full", a.bar, compact ? "w-6 sm:w-8" : "w-8"].join(" ")} />
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
        "font-data rounded-full border bg-white/[0.03] px-3 py-1 transition",
        isOn ? "border-[#7fd4ff]/40 bg-[#7fd4ff]/10 text-white" : "border-white/10 hover:bg-white/[0.06]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

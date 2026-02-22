"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  ChevronDown,
  Check,
  Download,
  GraduationCap,
  MapPin,
  School,
  Star,
  X,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/app/data/portfolioData";

type TrackKind = "school" | "university" | "engineer" | "cert";
type Accent = "cyan" | "mint" | "amber" | "violet";

type FormationNode = {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  specialization: string;
  years: string;
  timelineLabel: string;
  city: string;
  status: "obtained" | "in_progress";
  kind: TrackKind;
  modules: string[];
  skills: { label: string; value: number }[];
  projects: { id: string; name: string; state?: "Production" | "Developpement" }[];
  mention?: string;
  accent: Accent;
};

const ACCENT = {
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
} as const;

function nodeIcon(kind: TrackKind) {
  if (kind === "school") return <School size={15} className="text-white/88" />;
  if (kind === "university") return <GraduationCap size={15} className="text-white/88" />;
  if (kind === "engineer") return <BriefcaseBusiness size={15} className="text-white/88" />;
  return <Star size={15} className="text-white/88" />;
}

export default function FormationsPage() {
  const reduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<"track" | "list">("track");
  const nodes = useMemo<FormationNode[]>(() => {
    const accentOrder: Accent[] = ["cyan", "mint", "amber", "violet"];
    const mapStatus = (year: number): FormationNode["status"] => (year <= new Date().getFullYear() ? "obtained" : "in_progress");
    const mapKind = (level: string): TrackKind => {
      if (level.toLowerCase().includes("master")) return "engineer";
      if (level.toLowerCase().includes("licence")) return "university";
      return "school";
    };
    const projectState = (status: string): "Production" | "Developpement" =>
      status === "WIP" ? "Developpement" : "Production";
    const metricFromSeed = (seed: number) => Math.max(1, seed);

    const formationNodes: FormationNode[] = PORTFOLIO_DATA.formations.map((f, idx) => ({
      id: f.id,
      title: f.title,
      subtitle: f.school,
      level: f.level,
      specialization: f.specialization,
      years: `${f.startYear} - ${f.endYear}`,
      timelineLabel: `${f.endYear}`,
      city: `${f.city}, ${f.country}`,
      status: mapStatus(f.endYear),
      kind: mapKind(f.level),
      modules: f.modules.slice(0, 6),
      skills: [
        { label: "Frontend", value: metricFromSeed(f.specialization.toLowerCase().includes("mobile") ? 78 : 1) },
        { label: "Backend", value: metricFromSeed(f.specialization.toLowerCase().includes("develop") ? 74 : 1) },
        { label: "DevOps", value: 1 },
        { label: "Architecture", value: metricFromSeed(f.level.toLowerCase().includes("master") ? 80 : 1) },
      ],
      projects: PORTFOLIO_DATA.projects.slice(idx, idx + 2).map((p) => ({
        id: p.id,
        name: p.name,
        state: projectState(p.status),
      })),
      mention: f.grade === "a remplir" ? undefined : f.grade,
      accent: accentOrder[idx % accentOrder.length],
    }));

    formationNodes.push({
      id: "certifications-node",
      title: "Certifications",
      subtitle: PORTFOLIO_DATA.skills.slice(0, 3).map((s) => s.name).join(" - "),
      level: "Certifications",
      specialization: "Validation continue des competences techniques",
      years: "2024 - 2026",
      timelineLabel: "2026",
      city: "Online",
      status: "obtained",
      kind: "cert",
      modules: PORTFOLIO_DATA.skills.slice(0, 6).map((s) => s.name),
      skills: [
        { label: "Frontend", value: 1 },
        { label: "Backend", value: 1 },
        { label: "DevOps", value: 1 },
        { label: "Architecture", value: 1 },
      ],
      projects: PORTFOLIO_DATA.projects.slice(0, 2).map((p) => ({
        id: p.id,
        name: p.name,
        state: projectState(p.status),
      })),
      mention: "a remplir",
      accent: "violet",
    });

    return formationNodes;
  }, []);

  const [activeId, setActiveId] = useState(() => {
    const preferred = nodes.find((n) => n.kind === "university");
    return preferred?.id ?? nodes[0]?.id ?? "";
  });
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [showAllModules, setShowAllModules] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];
  const topRouteNodes = nodes.filter((n) => n.kind !== "cert");
  const totalStudyYears = useMemo(
    () => PORTFOLIO_DATA.formations.reduce((acc, f) => acc + Math.max(1, f.endYear - f.startYear), 0),
    []
  );
  const visibleModules = showAllModules ? active.modules : active.modules.slice(0, 4);
  const visibleSkills = showAllSkills ? active.skills : active.skills.slice(0, 3);

  const selectFormation = (id: string, openSheetOnMobile = false) => {
    setActiveId(id);
    setShowAllModules(false);
    setShowAllSkills(false);
    if (openSheetOnMobile) setMobileSheetOpen(true);
  };

  return (
    <section className="relative px-2 pb-3 pt-4 text-white sm:px-3 sm:pt-7 lg:px-4 lg:pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[24px] bg-[#040a17]" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[24px] bg-[radial-gradient(circle_at_20%_14%,rgba(81,210,255,0.14),transparent_28%),radial-gradient(circle_at_76%_30%,rgba(255,212,118,0.10),transparent_30%),linear-gradient(180deg,rgba(6,13,25,0.97),rgba(4,8,16,0.99))]" />
      <motion.div
        initial={reduceMotion ? false : { x: "-25%" }}
        animate={reduceMotion ? undefined : { x: "115%" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="pointer-events-none absolute top-14 h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
      />
      <motion.div
        initial={reduceMotion ? false : { x: "120%" }}
        animate={reduceMotion ? undefined : { x: "-25%" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.08 }}
        className="pointer-events-none absolute top-28 h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent via-amber-200/80 to-transparent"
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 space-y-4 lg:col-span-8">
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -1 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-[20px] border border-white/12 bg-[#061022]/74 p-3 backdrop-blur-xl sm:p-4"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(96,220,255,0.14),transparent_42%)]" />

            <div className="relative mb-3 hidden items-center justify-between gap-2 md:flex">
              <div className="inline-flex rounded-xl border border-white/12 bg-black/20 p-1">
                <button
                  onClick={() => setViewMode("track")}
                  className={[
                    "rounded-lg px-3 py-1.5 text-xs transition sm:text-sm",
                    viewMode === "track" ? "bg-cyan-300/14 text-cyan-100" : "text-white/70 hover:text-white/90",
                  ].join(" ")}
                >
                  Parcours
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={[
                    "rounded-lg px-3 py-1.5 text-xs transition sm:text-sm",
                    viewMode === "list" ? "bg-cyan-300/14 text-cyan-100" : "text-white/70 hover:text-white/90",
                  ].join(" ")}
                >
                  Liste
                </button>
              </div>
              <div className="hidden text-xs text-white/55 sm:block">Clique pour voir les details</div>
            </div>

            <motion.div
              initial={false}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="relative flex gap-2 overflow-x-auto pb-1 touch-pan-x overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
            >
              {topRouteNodes.map((node) => {
                const tone = ACCENT[node.accent];
                const isActive = activeId === node.id;
                return (
                  <motion.button
                    key={`mobile-top-${node.id}`}
                    initial={{ y: 8, scale: 0.985 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    onClick={() => selectFormation(node.id, true)}
                    className={[
                      "relative min-w-[170px] rounded-xl border px-3 py-2 text-left transition",
                      isActive ? `${tone.border} ${tone.softBg}` : "border-white/10 bg-black/20",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-lg border border-white/14 bg-black/25">
                        {nodeIcon(node.kind)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-white/58">{node.years}</p>
                        <p className={["truncate text-sm font-medium", isActive ? tone.text : "text-white/82"].join(" ")}>
                          {node.title}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            <div className="relative hidden grid-cols-3 gap-3 md:grid">
              <svg className="pointer-events-none absolute left-[12%] right-[12%] top-[16px] h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="route-main" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(110,255,220,0.8)" />
                    <stop offset="52%" stopColor="rgba(93,223,255,0.86)" />
                    <stop offset="100%" stopColor="rgba(255,210,120,0.8)" />
                  </linearGradient>
                </defs>
                <path d="M 2 13 Q 50 3 98 13" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" />
                <motion.path
                  d="M 2 13 Q 50 3 98 13"
                  fill="none"
                  stroke="url(#route-main)"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={reduceMotion ? undefined : { pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
                />
              </svg>

              {topRouteNodes.map((node, idx) => {
                const tone = ACCENT[node.accent];
                const isActive = activeId === node.id;
                return (
                  <motion.button
                    key={`top-${node.id}`}
                    initial={reduceMotion ? false : { y: 12, scale: 0.985 }}
                    animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
                    transition={{ duration: 0.24, ease: "easeOut", delay: 0.05 + idx * 0.05 }}
                    onClick={() => selectFormation(node.id)}
                    className={[
                      "relative rounded-2xl border px-3 pb-3 pt-2 text-center transition",
                      isActive ? `${tone.border} ${tone.softBg}` : "border-white/10 bg-black/18 hover:border-white/25",
                    ].join(" ")}
                    style={isActive ? { boxShadow: `0 0 14px ${tone.glow}` } : undefined}
                  >
                    <div className="mx-auto grid h-9 w-9 place-items-center rounded-xl border border-white/14 bg-black/25">
                      {nodeIcon(node.kind)}
                    </div>
                    <p className="mt-1 text-[11px] text-white/58">{node.years}</p>
                    <p className={["truncate text-sm font-medium", isActive ? tone.text : "text-white/82"].join(" ")}>
                      {node.title}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            className="space-y-2 md:hidden"
          >
            {nodes.map((node) => {
              const tone = ACCENT[node.accent];
              const isActive = activeId === node.id;
              const isOpen = mobileExpandedId === node.id;

              return (
                <motion.div
                  key={`mobile-accordion-${node.id}`}
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={[
                    "overflow-hidden rounded-2xl border bg-black/20",
                    isActive ? `${tone.border} ${tone.softBg}` : "border-white/12",
                  ].join(" ")}
                >
                  <button
                    onClick={() => {
                      selectFormation(node.id, true);
                      setMobileExpandedId((prev) => (prev === node.id ? null : node.id));
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
                  >
                    <div className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-black/28">
                      {nodeIcon(node.kind)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-white/62">{node.years}</p>
                      <p className={["truncate text-sm font-semibold", isActive ? tone.text : "text-white/88"].join(" ")}>{node.title}</p>
                    </div>
                    <ChevronDown
                      size={15}
                      className={["text-white/65 transition", isOpen ? "rotate-180" : ""].join(" ")}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0 }}
                      animate={reduceMotion ? undefined : { height: "auto" }}
                      exit={reduceMotion ? undefined : { height: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden border-t border-white/10 px-3 pb-3 pt-2"
                    >
                      <p className="text-xs text-white/72">{node.subtitle}</p>
                      <p className="mt-1 text-[11px] text-white/58">{node.specialization}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {node.modules.slice(0, 3).map((m) => (
                          <span key={`${node.id}-${m}`} className="rounded-md border border-white/12 bg-black/20 px-2 py-0.5 text-[11px] text-white/80">
                            {m}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {viewMode === "track" ? (
          <div className="relative hidden overflow-hidden rounded-[22px] border border-white/10 bg-[#071124]/32 p-3 sm:p-4 md:block md:p-5">
            <motion.div
              initial={reduceMotion ? false : { scaleY: 0.08 }}
              animate={reduceMotion ? undefined : { scaleY: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ transformOrigin: "top center" }}
              className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-200/10 via-cyan-200/40 to-transparent md:block"
            />

            <motion.div
              initial={false}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } }}
              className="space-y-4 md:space-y-5"
            >
              {nodes.map((node, index) => {
                const tone = ACCENT[node.accent];
                const isActive = node.id === activeId;
                const right = index % 2 === 1;
                const prevLabel = index > 0 ? nodes[index - 1].timelineLabel : null;
                const showYearMarker = node.timelineLabel !== prevLabel;

                return (
                  <motion.div
                    key={node.id}
                    initial={{ y: 12, scale: 0.992 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="relative min-h-[88px] sm:min-h-[100px]"
                  >
                    {showYearMarker && (
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-100">
                          {node.timelineLabel}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/40 to-transparent" />
                      </div>
                    )}
                    <div className={["relative", right ? "md:pl-[calc(50%+30px)]" : "md:pr-[calc(50%+30px)]"].join(" ")}>
                      <motion.button
                        whileHover={reduceMotion ? undefined : { y: -2, scale: 1.004 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        onClick={() => selectFormation(node.id)}
                        className={[
                          "relative w-full rounded-[16px] border px-3 py-2.5 text-left transition md:max-w-[350px] md:px-4 md:py-3",
                          isActive ? `${tone.border} ${tone.softBg}` : "border-white/12 bg-black/22 hover:border-white/25",
                        ].join(" ")}
                        style={isActive ? { boxShadow: `0 0 18px ${tone.glow}` } : undefined}
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-black/28 sm:h-9 sm:w-9 sm:rounded-xl">
                            {nodeIcon(node.kind)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-white/62">{node.years}</p>
                            <p className="truncate text-base font-semibold text-white/92 sm:text-lg">{node.title}</p>
                            <p className={["mt-0.5 truncate text-xs sm:text-sm", isActive ? tone.text : "text-white/65"].join(" ")}>
                              {node.subtitle}
                            </p>
                          </div>
                          <span className={["h-2.5 w-2.5 rounded-full", isActive ? tone.dot : "bg-white/25"].join(" ")} />
                        </div>
                      </motion.button>
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                      <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-cyan-200/28" />
                      <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-cyan-200/85 shadow-[0_0_14px_rgba(104,227,255,0.9)]" />
                    </div>

                    {right ? (
                      <span className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-cyan-200/70 to-transparent md:block" />
                    ) : (
                      <span className="pointer-events-none absolute right-1/2 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-l from-cyan-200/70 to-transparent md:block" />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          ) : (
            <motion.div
              initial={false}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="hidden grid-cols-1 gap-3 md:grid"
            >
              {nodes.map((node, idx) => {
                const tone = ACCENT[node.accent];
                const isActive = node.id === activeId;
                return (
                  <motion.button
                    key={`list-${node.id}`}
                    initial={{ y: 8 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: idx * 0.02 }}
                    onClick={() => selectFormation(node.id)}
                    className={[
                      "group relative overflow-hidden rounded-2xl border p-4 text-left transition",
                      isActive ? `${tone.border} ${tone.softBg}` : "border-white/12 bg-black/22 hover:border-white/20",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-black/25">
                        {nodeIcon(node.kind)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-base font-semibold text-white/92">{node.title}</p>
                          <span className="rounded-full border border-white/12 bg-black/20 px-2 py-0.5 text-[10px] text-white/72">
                            {node.level}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-white/65">{node.subtitle}</p>
                        <p className="mt-1 text-[11px] text-white/55 line-clamp-2">{node.specialization}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-white/70">
                          <span className="inline-flex items-center gap-1"><Calendar size={12} />{node.years}</span>
                          <span className="inline-flex items-center gap-1"><MapPin size={12} />{node.city}</span>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-white/40 transition group-hover:translate-x-1" />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          <motion.div
            initial={reduceMotion ? false : { y: 12, scale: 0.995 }}
            animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
            transition={{ duration: 0.28, ease: "easeOut", delay: 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-[#2d4868]/75 bg-[linear-gradient(180deg,rgba(8,18,36,0.97),rgba(4,11,24,0.97))] p-2 backdrop-blur-xl shadow-[0_16px_44px_rgba(0,0,0,0.45),0_0_28px_rgba(90,210,255,0.12)] sm:rounded-none sm:p-2.5 sm:[clip-path:polygon(16px_0,calc(100%-16px)_0,100%_50%,calc(100%-16px)_100%,16px_100%,0_50%)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-30%,rgba(140,220,255,0.16),transparent_48%)]" />
            <div className="pointer-events-none absolute inset-[6px] rounded-xl border border-dashed border-white/12 sm:rounded-none sm:[clip-path:polygon(16px_0,calc(100%-16px)_0,100%_50%,calc(100%-16px)_100%,16px_100%,0_50%)]" />

            <div className="pointer-events-none absolute bottom-0 left-[8%] h-[3px] w-[27%] rounded-full bg-cyan-300/92 blur-[0.3px]" />
            <div className="pointer-events-none absolute bottom-0 left-[38.5%] h-[3px] w-[23%] rounded-full bg-cyan-300/78 blur-[0.3px]" />
            <div className="pointer-events-none absolute bottom-0 left-[68%] h-[3px] w-[25%] rounded-full bg-cyan-300/88 blur-[0.3px]" />

            <div className="pointer-events-none absolute left-1/3 top-1/2 h-[64%] w-px -translate-y-1/2 [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.36)_0px,rgba(255,255,255,0.36)_2px,transparent_2px,transparent_7px)]" />
            <div className="pointer-events-none absolute left-2/3 top-1/2 h-[64%] w-px -translate-y-1/2 [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.36)_0px,rgba(255,255,255,0.36)_2px,transparent_2px,transparent_7px)]" />

            <motion.div
              initial={false}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              className="relative -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 touch-pan-x overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-0 sm:overflow-visible sm:px-0"
            >
              <BottomMetric
                icon={<GraduationCap size={15} className="text-cyan-200" />}
                value={String(PORTFOLIO_DATA.quickStats.totalFormations)}
                label="Formations"
                delay={0.02}
              />
              <BottomMetric
                icon={<BriefcaseBusiness size={15} className="text-cyan-200" />}
                value={String(totalStudyYears)}
                label="Ans d'Etudes"
                delay={0.08}
              />
              <BottomMetric
                icon={<Star size={15} className="text-cyan-200" />}
                value={String(PORTFOLIO_DATA.quickStats.totalCertifications)}
                label="Certifications"
                delay={0.14}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="col-span-12 hidden lg:col-span-4 lg:block">
          <aside className="relative overflow-hidden rounded-[22px] border border-white/14 bg-[#081529]/86 p-3 backdrop-blur-xl sm:p-4 md:p-5 lg:sticky lg:top-5 lg:max-h-[calc(100dvh-8.5rem)] lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(94,220,255,0.15),transparent_36%)]" />
            <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { y: 14, scale: 0.992 }}
              animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { y: -8, scale: 0.996 }}
              transition={{
                y: { type: "spring", stiffness: 220, damping: 24 },
                scale: { duration: 0.2, ease: "easeOut" },
              }}
              className="transform-gpu will-change-transform"
            >
            <div className="relative border-b border-white/12 pb-4">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/12 bg-black/24">{nodeIcon(active.kind)}</div>
                <div className="min-w-0">
                  <p className="truncate text-xl font-semibold leading-tight text-white/92 sm:text-2xl">{active.title}</p>
                  <p className="mt-0.5 text-xs text-white/68 sm:text-sm">{active.subtitle}</p>
                  <p className="mt-1 text-[11px] text-white/56 sm:text-xs">{active.level} - {active.specialization}</p>
                </div>
                <span
                  className={[
                    "ml-auto inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs",
                    active.status === "obtained"
                      ? "border-emerald-300/30 bg-emerald-300/12 text-emerald-200"
                      : "border-amber-300/30 bg-amber-300/12 text-amber-200",
                  ].join(" ")}
                >
                  {active.status === "obtained" ? <Check size={12} /> : <Calendar size={12} />}
                  {active.status === "obtained" ? "Diplome obtenu" : "En cours"}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/72">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} className="text-white/55" /> {active.years}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} className="text-white/55" /> {active.city}
                </span>
              </div>
            </div>

            <section className="relative mt-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-white/88 sm:text-xl">Modules cles</h3>
                {active.modules.length > 4 && (
                  <button
                    onClick={() => setShowAllModules((v) => !v)}
                    className="text-xs text-cyan-200 transition hover:text-cyan-100"
                  >
                    {showAllModules ? "Voir moins" : "Voir plus"}
                  </button>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {visibleModules.map((module) => (
                  <span key={module} className="rounded-lg border border-white/13 bg-black/22 px-3 py-1 text-xs text-white/82">
                    {module}
                  </span>
                ))}
              </div>
            </section>

            <section className="relative mt-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-white/88 sm:text-xl">Competences</h3>
                {active.skills.length > 3 && (
                  <button
                    onClick={() => setShowAllSkills((v) => !v)}
                    className="text-xs text-cyan-200 transition hover:text-cyan-100"
                  >
                    {showAllSkills ? "Voir moins" : "Voir plus"}
                  </button>
                )}
              </div>
              <div className="mt-3 space-y-2.5">
                {visibleSkills.map((skill) => (
                  <div key={skill.label} className="grid grid-cols-[82px_1fr_40px] items-center gap-2 sm:grid-cols-[92px_1fr_42px]">
                    <p className="text-xs text-white/80 sm:text-sm">{skill.label}</p>
                    <div className="h-[6px] overflow-hidden rounded-full bg-white/14">
                      <motion.div
                        key={`${active.id}-${skill.label}`}
                        initial={reduceMotion ? false : { width: 0 }}
                        animate={{ width: `${skill.value}%` }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className={[
                        "h-full rounded-full bg-gradient-to-r",
                        ACCENT[active.accent].progress,
                      ].join(" ")}
                      />
                    </div>
                    <p className="text-right text-xs text-white/86 sm:text-sm">{skill.value}%</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative mt-4">
              <h3 className="text-lg font-semibold text-white/88 sm:text-xl">Projets realises</h3>
              <div className="mt-3 space-y-2">
                {active.projects.map((project) => (
                  <div key={project.id} className="flex items-center gap-3 rounded-lg border border-white/12 bg-black/22 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-200" />
                    <p className="text-xs text-white/86 sm:text-sm">{project.name}</p>
                    {project.state && (
                      <span
                        className={[
                          "ml-auto rounded-full px-2 py-0.5 text-[11px]",
                          project.state === "Production"
                            ? "bg-emerald-300/12 text-emerald-200"
                            : "bg-cyan-300/14 text-cyan-200",
                        ].join(" ")}
                      >
                        {project.state}
                      </span>
                    )}
                    <ArrowRight size={14} className="text-white/45" />
                  </div>
                ))}
              </div>
            </section>

            <section className="relative mt-5 border-t border-white/12 pt-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-white/64">Notes</p>
                  <p className="text-lg font-semibold text-amber-200">{active.mention ?? "Mention"}</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/14 bg-white/8 px-4 py-2 text-sm text-white/88 transition hover:bg-white/12">
                  Voir le diplome <Download size={14} className="text-cyan-200" />
                </button>
              </div>
            </section>
            </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {mobileSheetOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button
              aria-label="Fermer details formation"
              className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
              onClick={() => setMobileSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute inset-x-0 bottom-0 max-h-[86dvh] overflow-y-auto rounded-t-[22px] border border-white/12 bg-[#081529]/96 p-3 pb-[calc(1rem+env(safe-area-inset-bottom))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-semibold text-white/82">Details formation</div>
                <button
                  onClick={() => setMobileSheetOpen(false)}
                  className="rounded-lg border border-white/15 bg-black/20 p-2 text-white/70"
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="rounded-2xl border border-white/12 bg-black/20 p-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-black/25">{nodeIcon(active.kind)}</div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-white/92">{active.title}</p>
                    <p className="text-xs text-white/68">{active.subtitle}</p>
                    <p className="mt-1 text-[11px] text-white/55">{active.level} - {active.specialization}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/75">
                  <span className="rounded-full border border-white/12 bg-black/20 px-2 py-1">{active.years}</span>
                  <span className="rounded-full border border-white/12 bg-black/20 px-2 py-1">{active.city}</span>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-white/88">Modules cles</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {active.modules.map((m) => (
                      <span key={`sheet-${m}`} className="rounded-md border border-white/12 bg-black/20 px-2 py-0.5 text-[11px] text-white/80">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-white/88">Competences</p>
                  <div className="mt-2 space-y-2">
                    {active.skills.map((skill) => (
                      <div key={`sheet-skill-${skill.label}`} className="grid grid-cols-[70px_1fr_34px] items-center gap-2">
                        <span className="text-xs text-white/72">{skill.label}</span>
                        <div className="h-[5px] rounded-full bg-white/12 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.value}%` }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className={["h-full rounded-full bg-gradient-to-r", ACCENT[active.accent].progress].join(" ")}
                          />
                        </div>
                        <span className="text-right text-[11px] text-white/78">{skill.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-semibold text-white/88">Projets realises</p>
                  <div className="mt-2 space-y-2">
                    {active.projects.map((project) => (
                      <div key={`sheet-project-${project.id}`} className="flex items-center gap-2 rounded-lg border border-white/12 bg-black/20 px-2.5 py-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-200" />
                        <p className="min-w-0 flex-1 truncate text-xs text-white/86">{project.name}</p>
                        {project.state && (
                          <span
                            className={[
                              "shrink-0 rounded-full px-2 py-0.5 text-[10px]",
                              project.state === "Production"
                                ? "bg-emerald-300/12 text-emerald-200"
                                : "bg-cyan-300/14 text-cyan-200",
                            ].join(" ")}
                          >
                            {project.state}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-white/60">Notes</p>
                      <p className="text-base font-semibold text-amber-200">{active.mention ?? "Mention"}</p>
                    </div>
                    <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/14 bg-white/8 px-3 py-1.5 text-xs text-white/88">
                      Voir le diplome <Download size={12} className="text-cyan-200" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

function BottomMetric({
  icon,
  value,
  label,
  delay = 0,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 12, scale: 0.97 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.26, ease: "easeOut", delay }}
      whileHover={{ y: -1 }}
      className="min-w-[156px] shrink-0 snap-start px-2 py-2 sm:min-w-0 sm:px-4 sm:py-2.5"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-300/38 bg-cyan-300/12 shadow-[0_0_12px_rgba(112,233,255,0.24)] sm:h-9 sm:w-9 sm:rounded-xl">
          {icon}
        </div>
        <div>
          <p className="text-[20px] leading-none font-semibold text-white/95 sm:text-[30px]">{value}</p>
          <p className="mt-0.5 text-[12px] leading-tight text-white/84 sm:text-[16px]">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

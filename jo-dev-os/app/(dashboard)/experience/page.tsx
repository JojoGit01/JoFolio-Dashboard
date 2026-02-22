"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness, FolderKanban, UserRound, X } from "lucide-react";
import ExperienceTimelineLeft, { ExperienceRecord, ExperienceViewMode } from "./ExperienceTimelineLeft";
import ExperienceDetailsRight from "./ExperienceDetailsRight";
import { PORTFOLIO_DATA, TOTAL_PROJECTS_WITH_EXPERIENCE } from "@/app/data/portfolioData";

type FilterKey = "all" | "pro" | "perso";
type SortKey = "recent" | "impact";

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "pro", label: "Pro" },
  { id: "perso", label: "Perso" },
];

export default function ExperiencePage() {
  const reduceMotion = useReducedMotion();
  const items = useMemo<ExperienceRecord[]>(() => {
    const statusMap = { LIVE: "PROD", WIP: "DEV", DONE: "PROD", BETA: "DEV", ARCHIVE: "PROD" } as const;
    const kindMap = {
      CDI: "CDI",
      CDD: "CDI",
      Freelance: "FREELANCE",
      Stage: "STAGE",
      Personnel: "PERSO",
    } as const;

    return PORTFOLIO_DATA.experiences.map((exp, index) => ({
      id: exp.id,
      role: exp.title,
      period: `${exp.startYear} - ${exp.endYear}`,
      timelineLabel: exp.startYear === exp.endYear ? `${exp.startYear}` : `${exp.startYear}-${exp.endYear}`,
      badge: exp.contractType === "Personnel" ? "Projet Perso" : exp.contractType,
      kind: kindMap[exp.contractType],
      org: exp.company,
      city: exp.location,
      impacts: [
        ...exp.projects.flatMap((p) => p.actions.slice(0, 1)),
        ...exp.projects.flatMap((p) => p.results.slice(0, 2)),
      ].slice(0, 3),
      stack: exp.technologies.slice(0, 8),
      highlights: {
        delivery: Math.max(1, exp.globalImpact.deliveryGainPercent, ...exp.projects.map((p) => p.qualityGainPercent)),
        backend: Math.max(1, exp.globalImpact.automationGainPercent),
        apiPerf: Math.max(1, exp.globalImpact.reliabilityGainPercent, ...exp.projects.map((p) => p.qualityGainPercent)),
        security: Math.max(1, exp.globalImpact.costReductionPercent, ...exp.projects.map((p) => p.costReductionPercent)),
      },
      metrics: {
        deliveryGainPercent: Math.max(
          1,
          exp.globalImpact.deliveryGainPercent,
          ...exp.projects.map((p) => {
            const before = p.deliveryTimeBeforeHours * 60;
            return before > 0 ? Math.round(((before - p.deliveryTimeAfterMinutes) / before) * 100) : 1;
          })
        ),
        automationGainPercent: Math.max(1, exp.globalImpact.automationGainPercent),
        reliabilityGainPercent: Math.max(1, exp.globalImpact.reliabilityGainPercent, ...exp.projects.map((p) => p.qualityGainPercent)),
        costReductionPercent: Math.max(1, exp.globalImpact.costReductionPercent, ...exp.projects.map((p) => p.costReductionPercent)),
        usersImpacted: Math.max(1, exp.projects.reduce((acc, p) => acc + p.usersImpacted, 0)),
        projectsCount: exp.projects.length,
      },
      projects: exp.projects.map((p) => ({
        id: p.id,
        title: p.name,
        status: statusMap[p.status],
      })),
      featured: index === 0,
    }));
  }, []);

  const [activeFilter, setActiveFilter] = useState<FilterKey>("pro");
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [viewMode, setViewMode] = useState<ExperienceViewMode>("timeline");
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? items
        : activeFilter === "pro"
          ? items.filter((item) => item.kind !== "PERSO")
          : items.filter((item) => item.kind === "PERSO");

    return [...filtered].sort((a, b) => {
      if (sortKey === "recent") {
        const aEnd = Number(a.period.split("-").at(1)?.trim() ?? 0);
        const bEnd = Number(b.period.split("-").at(1)?.trim() ?? 0);
        return bEnd - aEnd;
      }
      const impactA =
        a.metrics.deliveryGainPercent + a.metrics.automationGainPercent + a.metrics.costReductionPercent + a.metrics.reliabilityGainPercent;
      const impactB =
        b.metrics.deliveryGainPercent + b.metrics.automationGainPercent + b.metrics.costReductionPercent + b.metrics.reliabilityGainPercent;
      return impactB - impactA;
    });
  }, [activeFilter, items, sortKey]);

  const resolvedSelectedId =
    filteredItems.find((item) => item.id === selectedId)?.id ?? filteredItems[0]?.id ?? "";

  const selectedItem = filteredItems.find((item) => item.id === resolvedSelectedId);

  const handleSelectExperience = (id: string) => {
    setSelectedId(id);
    setMobileSheetOpen(true);
  };

  return (
    <section className="relative mt-2 min-h-[780px] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[26px] bg-[#040914]" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[26px] bg-[radial-gradient(circle_at_72%_38%,rgba(129,225,255,0.20),transparent_42%),radial-gradient(circle_at_24%_76%,rgba(164,226,255,0.10),transparent_38%),linear-gradient(180deg,rgba(11,21,38,0.85),rgba(4,9,20,0.95))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:3px_3px]" />
      <motion.div
        initial={{ x: -120 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="pointer-events-none absolute left-3 right-3 top-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-300/70 via-sky-300/50 to-transparent"
      />
      <motion.div
        initial={reduceMotion ? false : { x: "-30%" }}
        animate={reduceMotion ? undefined : { x: "120%" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="pointer-events-none absolute top-20 h-[2px] w-32 rounded-full bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
      />
      <motion.div
        initial={reduceMotion ? false : { x: "130%" }}
        animate={reduceMotion ? undefined : { x: "-20%" }}
        transition={{ duration: 0.95, ease: "easeOut", delay: 0.08 }}
        className="pointer-events-none absolute top-36 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-emerald-200/80 to-transparent"
      />

      <div className="flex flex-col gap-4 px-1 py-2 sm:px-2 lg:gap-5 lg:px-4">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full">
            <motion.div
              initial={reduceMotion ? false : { y: 10 }}
              animate={reduceMotion ? undefined : { y: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="mt-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-2 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:gap-3"
            >
              {FILTERS.map((filter) => {
                const active = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={[
                      "shrink-0 rounded-2xl border px-3.5 py-1.5 text-xs transition sm:px-6 sm:py-2 sm:text-sm",
                      active
                        ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-200 shadow-[0_0_22px_rgba(127,212,255,0.28)]"
                        : "border-white/15 bg-black/20 text-white/72 hover:border-white/30 hover:text-white/90",
                    ].join(" ")}
                  >
                    {filter.label}
                  </button>
                );
              })}
              <button
                onClick={() => setSortKey((prev) => (prev === "recent" ? "impact" : "recent"))}
                className="shrink-0 rounded-2xl border border-white/15 bg-black/20 px-3.5 py-1.5 text-xs text-white/75 transition hover:border-white/30 hover:text-white sm:px-5 sm:py-2 sm:text-sm"
              >
                Tri: {sortKey === "recent" ? "Recent" : "Impact"}
              </button>
              <button
                onClick={() => setViewMode((prev) => (prev === "timeline" ? "cards" : "timeline"))}
                className="shrink-0 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-3.5 py-1.5 text-xs text-cyan-100 transition hover:bg-cyan-300/15 sm:px-5 sm:py-2 sm:text-sm"
              >
                Vue: {viewMode === "timeline" ? "Timeline" : "Cards"}
              </button>
            </motion.div>
          </div>

          <div className="quickview-hide grid grid-cols-3 gap-2 sm:gap-3 lg:w-[370px]">
            <MetricBadge
              icon={<BriefcaseBusiness size={14} className="text-cyan-200" />}
              value={`${PORTFOLIO_DATA.profile.yearsPro}`}
              label="ans pro"
              tone="cyan"
              delay={0.02}
            />
            <MetricBadge
              icon={<FolderKanban size={14} className="text-emerald-200" />}
              value={`${TOTAL_PROJECTS_WITH_EXPERIENCE}`}
              label="projets"
              tone="emerald"
              delay={0.08}
            />
            <MetricBadge
              icon={<UserRound size={14} className="text-indigo-200" />}
              value={`${PORTFOLIO_DATA.profile.yearsPersonal}`}
              label="ans perso"
              tone="indigo"
              delay={0.14}
            />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={viewMode}
                initial={{ y: 10, scale: 0.998 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: -6, scale: 0.998 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="transform-gpu will-change-transform"
              >
                <ExperienceTimelineLeft
                  items={filteredItems}
                  selectedId={resolvedSelectedId}
                  onSelect={handleSelectExperience}
                  viewMode={viewMode}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <ExperienceDetailsRight details={selectedItem} />
          </div>
        </div>

        <AnimatePresence>
          {mobileSheetOpen && selectedItem && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <button
                aria-label="Fermer le panneau detail experience"
                className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"
                onClick={() => setMobileSheetOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-y-auto rounded-t-[24px] border border-white/12 bg-[#0A1528]/96 p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/80">Details experience</div>
                  <button
                    onClick={() => setMobileSheetOpen(false)}
                    className="rounded-lg border border-white/15 bg-black/20 p-2 text-white/75"
                    aria-label="Fermer"
                  >
                    <X size={16} />
                  </button>
                </div>
                <ExperienceDetailsRight details={selectedItem} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function MetricBadge({
  icon,
  value,
  label,
  tone,
  delay = 0,
}: {
  icon: React.ReactNode;
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

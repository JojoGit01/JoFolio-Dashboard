"use client";

import { useMemo, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { PORTFOLIO_DATA } from "@/app/data/portfolioData";

import { buildFormationNodes } from "./data-mappers";
import { FormationDetailsPanel } from "./components/FormationDetailsPanel";
import { FormationMobileSheet } from "./components/FormationMobileSheet";
import { FormationsStatsBar } from "./components/FormationsStatsBar";
import {
  FormationsListView,
  FormationsMobileAccordion,
  FormationsTopSelector,
  FormationsTrackView,
} from "./components/FormationViews";

export default function FormationsPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [viewMode, setViewMode] = useState<"track" | "list">("track");
  const nodes = useMemo(() => buildFormationNodes(), []);

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

  if (!active) return null;

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
          <FormationsTopSelector
            nodes={topRouteNodes}
            activeId={activeId}
            onSelect={selectFormation}
            reduceMotion={reduceMotion}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          <FormationsMobileAccordion
            nodes={nodes}
            activeId={activeId}
            mobileExpandedId={mobileExpandedId}
            setMobileExpandedId={setMobileExpandedId}
            onSelect={selectFormation}
            reduceMotion={reduceMotion}
          />

          {viewMode === "track" ? (
            <FormationsTrackView nodes={nodes} activeId={activeId} onSelect={(id) => selectFormation(id)} reduceMotion={reduceMotion} />
          ) : (
            <FormationsListView nodes={nodes} activeId={activeId} onSelect={(id) => selectFormation(id)} />
          )}

          <FormationsStatsBar totalStudyYears={totalStudyYears} reduceMotion={reduceMotion} />
        </div>

        <div className="col-span-12 hidden lg:col-span-4 lg:block">
          <FormationDetailsPanel
            active={active}
            visibleModules={visibleModules}
            visibleSkills={visibleSkills}
            showAllModules={showAllModules}
            showAllSkills={showAllSkills}
            setShowAllModules={setShowAllModules}
            setShowAllSkills={setShowAllSkills}
            reduceMotion={reduceMotion}
          />
        </div>
      </div>

      <FormationMobileSheet open={mobileSheetOpen} onClose={() => setMobileSheetOpen(false)} active={active} />
    </section>
  );
}

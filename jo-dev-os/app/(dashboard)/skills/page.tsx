"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { CATEGORIES, SKILLS } from "./data";
import { ACCENT } from "./config";
import { sortSkills } from "./helpers";
import type { CategoryKey, SkillSortKey } from "./types";
import { SkillsAdditionalPanel } from "./components/SkillsAdditionalPanel";
import { SkillsCategoryCards, getFirstCategorySkillId } from "./components/SkillsCategoryCards";
import { SkillsDetailsPanel } from "./components/SkillsDetailsPanel";
import { SkillsMobileSheet } from "./components/SkillsMobileSheet";
import { MobileSelectedSkillSummary, SkillsGrid, SkillsSectionHeader } from "./components/SkillsGrid";

export default function SkillsPage() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("frontend");
  const [additionalOpen, setAdditionalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SkillSortKey>("impact");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const categoryCounts = useMemo(() => {
    const map: Record<CategoryKey, number> = {
      frontend: 0,
      backend: 0,
      tools: 0,
      others: 0,
    };
    for (const s of SKILLS) map[s.category] += 1;
    return map;
  }, []);

  const skillsByCategory = useMemo(() => {
    const list = SKILLS.filter((s) => s.category === activeCategory);
    return sortSkills(list, sortBy);
  }, [activeCategory, sortBy]);

  const visibleSkills = useMemo(() => {
    if (showAllSkills) return skillsByCategory;
    return skillsByCategory.slice(0, 6);
  }, [showAllSkills, skillsByCategory]);

  const [selectedId, setSelectedId] = useState(() => SKILLS.find((s) => s.category === "frontend")?.id ?? SKILLS[0]?.id ?? "react");

  const selectedSkill = useMemo(() => {
    if (skillsByCategory.length === 0) return null;
    return skillsByCategory.find((s) => s.id === selectedId) ?? skillsByCategory[0];
  }, [selectedId, skillsByCategory]);

  const activeCat = CATEGORIES.find((c) => c.key === activeCategory) ?? CATEGORIES[0];
  const A = ACCENT[activeCat.accent];

  const sectionTitle =
    activeCategory === "frontend" ? "Front-End" : activeCategory === "backend" ? "Back-End" : activeCategory === "tools" ? "Outils & ++" : "Autres";

  const handleSelectSkill = (id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1280) {
      setMobileSheetOpen(true);
    }
  };

  return (
    <section className="relative px-1 py-2 text-white sm:px-2 sm:py-3 lg:px-3">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[22px] bg-[#050d19]" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[22px] bg-[radial-gradient(circle_at_20%_8%,rgba(93,186,228,0.09),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(132,111,190,0.07),transparent_32%),linear-gradient(180deg,rgba(7,14,28,0.94),rgba(4,8,17,0.96))]" />

      {!reduceMotion && (
        <>
          <motion.span
            className="pointer-events-none absolute left-3 right-20 top-2 z-10 h-px rounded-full bg-gradient-to-r from-transparent via-[#7fd4ff]/65 to-transparent"
            initial={{ scaleX: 0.15, x: -20 }}
            animate={{ scaleX: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" as const }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span
            className="pointer-events-none absolute right-6 top-6 z-10 h-14 w-[2px] rounded-full bg-gradient-to-b from-transparent via-[#7fd4ff]/55 to-transparent"
            initial={{ scaleY: 0.2 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.38, delay: 0.06, ease: "easeOut" as const }}
            style={{ transformOrigin: "top" }}
          />
        </>
      )}

      <motion.div
        initial={reduceMotion ? false : { y: 12, scale: 0.996 }}
        animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
        transition={reduceMotion ? undefined : { duration: 0.26, ease: "easeOut" as const }}
      >
        <SkillsCategoryCards
          categories={CATEGORIES}
          activeCategory={activeCategory}
          categoryCounts={categoryCounts}
          onSelectCategory={(key) => {
            setActiveCategory(key);
            setShowAllSkills(false);
            setMobileSheetOpen(false);
            const nextId = getFirstCategorySkillId(SKILLS, key);
            if (nextId) setSelectedId(nextId);
          }}
        />
      </motion.div>

      <div className="mt-4 grid grid-cols-12 gap-3 sm:mt-5 sm:gap-4">
        <motion.div
          initial={reduceMotion ? false : { y: 14, x: -4, scale: 0.997 }}
          animate={reduceMotion ? undefined : { y: 0, x: 0, scale: 1 }}
          transition={reduceMotion ? undefined : { duration: 0.3, delay: 0.05, ease: "easeOut" as const }}
          className="col-span-12 xl:col-span-8"
        >
          <SkillsSectionHeader
            titleClass={A.title}
            sectionTitle={sectionTitle}
            totalCount={skillsByCategory.length}
            visibleCount={visibleSkills.length}
            showAll={showAllSkills}
            onToggleShowAll={() => setShowAllSkills((v) => !v)}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <MobileSelectedSkillSummary selectedSkill={selectedSkill} onOpenDetails={() => setMobileSheetOpen(true)} />

          <SkillsGrid
            skillsByCategory={visibleSkills}
            selectedId={selectedSkill?.id}
            onSelectSkill={handleSelectSkill}
            accentKey={activeCat.accent}
          />

          <SkillsAdditionalPanel additionalOpen={additionalOpen} setAdditionalOpen={setAdditionalOpen} titleClass={A.title} />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { y: 14, x: 6, scale: 0.997 }}
          animate={reduceMotion ? undefined : { y: 0, x: 0, scale: 1 }}
          transition={reduceMotion ? undefined : { duration: 0.3, delay: 0.1, ease: "easeOut" as const }}
          className="col-span-12 hidden xl:col-span-4 xl:block"
        >
          <SkillsDetailsPanel selectedSkill={selectedSkill} skillsByCategory={skillsByCategory} setSelectedId={setSelectedId} accentKey={activeCat.accent} />
        </motion.div>
      </div>

      <SkillsMobileSheet
        open={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
        selectedSkill={selectedSkill}
        skillsByCategory={skillsByCategory}
        setSelectedId={setSelectedId}
        accentKey={activeCat.accent}
      />
    </section>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";

import { ACCENT, skillIcon } from "../config";
import { confidenceClass, exposureClass, levelBarTheme, levelLabelEN, parseLevel } from "../helpers";
import type { Skill, SkillSortKey } from "../types";

export function SkillsGrid({
  skillsByCategory,
  selectedId,
  onSelectSkill,
  accentKey,
}: {
  skillsByCategory: Skill[];
  selectedId?: string;
  onSelectSkill: (id: string) => void;
  accentKey: keyof typeof ACCENT;
}) {
  const A = ACCENT[accentKey];
  const reduceMotion = useReducedMotion();
  const containerVariants = reduceMotion
    ? undefined
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: 0.02,
          },
        },
      };
  const itemVariants = reduceMotion
    ? undefined
    : {
        hidden: { y: 8, scale: 0.994, opacity: 0.98 },
        show: {
          y: 0,
          scale: 1,
          opacity: 1,
          transition: { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  if (skillsByCategory.length === 0) {
    return (
      <div className="mt-3 rounded-[14px] border border-white/10 bg-[#081327]/68 p-6 text-center text-white/62">
        Aucune competence disponible dans cette categorie.
      </div>
    );
  }

  return (
    <motion.div
      key={`skills-grid-${skillsByCategory.map((s) => s.id).join("-")}`}
      className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-2.5 xl:grid-cols-3"
      variants={containerVariants}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "show"}
    >
      {skillsByCategory.map((skill) => {
        const isActive = selectedId === skill.id;
        const hasSelection = Boolean(selectedId);
        const parsed = parseLevel(skill.levelLabel);
        const firstProof = skill.proofs?.[0];
        const percentTheme = levelBarTheme(parsed);

        return (
          <motion.button
            key={skill.id}
            variants={itemVariants}
            onClick={() => onSelectSkill(skill.id)}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.006 }}
            whileTap={reduceMotion ? undefined : { scale: 0.992 }}
            className={[
              "group relative overflow-hidden rounded-[14px] border bg-[#081327]/72 p-2.5 text-left transition sm:p-3",
              "will-change-transform",
              "min-h-[118px] sm:min-h-0",
              isActive
                ? `${A.border} ring-1 ${A.ring} scale-[1.01] shadow-[0_10px_24px_rgba(0,0,0,0.3)]`
                : "border-white/10 hover:border-white/20",
              hasSelection && !isActive ? "opacity-80 saturate-50 hover:opacity-95 hover:saturate-100" : "",
            ].join(" ")}
            style={{
              boxShadow: isActive
                ? `0 0 0 1px rgba(255,255,255,0.05), 0 0 16px ${A.glow}`
                : "0 0 0 1px rgba(255,255,255,0.02)",
            }}
          >
            <span className="pointer-events-none absolute inset-x-4 top-0 h-px -translate-x-[130%] bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-500 group-hover:translate-x-[130%] group-hover:opacity-100" />
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/30 sm:h-12 sm:w-12 sm:rounded-xl">
                {skillIcon(skill)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <p className="line-clamp-2 text-[11px] font-semibold leading-tight text-white/90 sm:truncate sm:text-[17px]">{skill.name}</p>
                  <span className={["hidden rounded-full border px-2 py-0.5 text-[10px] sm:inline-flex", confidenceClass(skill.confidence)].join(" ")}>
                    {skill.confidence}
                  </span>
                  <span className={["hidden rounded-full border px-2 py-0.5 text-[10px] xl:inline-flex", exposureClass(skill.exposure)].join(" ")}>
                    {skill.exposure}
                  </span>
                </div>
                <p
                  className={[
                    "mt-0.5 hidden text-[11px] sm:block sm:text-xs",
                    parsed === "expert" ? A.accentText : parsed === "advanced" ? "text-[#d9c08a]" : "text-white/62",
                  ].join(" ")}
                >
                  {levelLabelEN(parsed)}
                </p>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
              <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-white/12">
                <motion.div
                  key={`${skill.id}-bar`}
                  className="h-full rounded-full origin-left"
                  initial={reduceMotion ? false : { width: 0 }}
                  animate={{ width: `${skill.percent}%` }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 0.5,
                          ease: [0.2, 0.8, 0.2, 1],
                          delay: 0.03,
                        }
                  }
                  whileHover={reduceMotion ? undefined : { filter: "brightness(1.08)" }}
                  style={{
                    backgroundImage: percentTheme.fill,
                    boxShadow: percentTheme.glow,
                  }}
                />
              </div>
              <span className={["font-data text-[11px] font-semibold sm:text-base", percentTheme.text].join(" ")}>
                {skill.percent}%
              </span>
            </div>

            <div className="font-data mt-2 hidden items-center justify-between text-[10px] text-white/55 sm:flex sm:text-[11px]">
              <span>Impact {skill.impactScore}</span>
              <span>{skill.experienceYears} ans</span>
            </div>

            {firstProof && (
              <div className="mt-2 hidden items-center gap-1.5 rounded-lg border border-white/8 bg-black/25 px-2 py-1.5 text-[11px] text-white/68 sm:flex">
                <Play size={10} className="text-[#86cde7]" />
                <span className="truncate">{firstProof.project}</span>
                <span className="ml-auto truncate text-[#9fcbde]">{firstProof.impact}</span>
              </div>
            )}

            <div className="mt-2 flex items-center justify-between sm:hidden">
              <div className="flex items-center gap-1">
                <span className={["rounded-full border px-1.5 py-0.5 text-[9px]", confidenceClass(skill.confidence)].join(" ")}>
                  {skill.confidence}
                </span>
                <span className={["rounded-full border px-1.5 py-0.5 text-[9px]", exposureClass(skill.exposure)].join(" ")}>
                  {skill.exposure}
                </span>
              </div>
              <span className="font-data text-[9px] text-white/50">{skill.experienceYears}a</span>
            </div>

            {isActive && (
              <>
                <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full bg-[#93d9cf]" />
                <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              </>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export function MobileSelectedSkillSummary({
  selectedSkill,
  onOpenDetails,
}: {
  selectedSkill: Skill | null;
  onOpenDetails?: () => void;
}) {
  if (!selectedSkill) return null;
  return (
    <div className="mt-3 rounded-[14px] border border-white/10 bg-[#081529]/74 p-3 xl:hidden">
      <div className="flex items-center gap-2.5">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/5">{skillIcon(selectedSkill)}</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white/92">{selectedSkill.name}</p>
          <p className="mt-0.5 text-xs text-white/62">
            {levelLabelEN(parseLevel(selectedSkill.levelLabel))} - {selectedSkill.confidence}
          </p>
        </div>
        <p className="font-data text-lg font-semibold text-[#7de5d0]">{selectedSkill.percent}%</p>
      </div>
      <button
        onClick={onOpenDetails}
        className="mt-2 inline-flex w-full items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/78"
      >
        Voir le detail <ChevronRight size={14} />
      </button>
    </div>
  );
}

export function SkillsSectionHeader({
  titleClass,
  sectionTitle,
  totalCount,
  visibleCount,
  showAll,
  onToggleShowAll,
  sortBy,
  onSortChange,
}: {
  titleClass: string;
  sectionTitle: string;
  totalCount: number;
  visibleCount: number;
  showAll: boolean;
  onToggleShowAll: () => void;
  sortBy: SkillSortKey;
  onSortChange: (value: SkillSortKey) => void;
}) {
  return (
    <div className="border-b border-white/10 pb-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold text-white/90 sm:text-2xl md:text-[34px]">
          Skills <span className={titleClass}>{sectionTitle}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <label className="font-data inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#081327]/65 px-2.5 py-1.5 text-[11px] text-white/70">
            Tri
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SkillSortKey)}
              className="rounded-md border border-white/10 bg-[#0a1426] px-2 py-1 text-[11px] text-white/85 outline-none"
            >
              <option value="impact">Impact</option>
              <option value="mastery">Maitrise</option>
              <option value="recent">Recent</option>
            </select>
          </label>
          <button
            onClick={onToggleShowAll}
            className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[#8bcce8] transition hover:text-[#a2d9ef]"
          >
            {showAll ? "Top Skills" : "Voir tout"} ({visibleCount}/{totalCount}) <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

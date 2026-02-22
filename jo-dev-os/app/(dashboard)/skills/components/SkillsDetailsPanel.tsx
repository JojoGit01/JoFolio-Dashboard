import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

import { ACCENT, skillIcon } from "../config";
import { confidenceClass, exposureClass, levelBarTheme, levelIndex, levelLabelEN, parseLevel } from "../helpers";
import type { Skill } from "../types";
import { SkillsMatrix } from "./SkillsMatrix";

export function SkillsDetailsPanel({
  selectedSkill,
  skillsByCategory,
  setSelectedId,
  accentKey,
}: {
  selectedSkill: Skill | null;
  skillsByCategory: Skill[];
  setSelectedId: (id: string) => void;
  accentKey: keyof typeof ACCENT;
}) {
  const reduceMotion = useReducedMotion();

  if (!selectedSkill) {
    return (
      <aside className="rounded-[18px] border border-white/10 bg-[#081529]/74 p-4 text-sm text-white/62 backdrop-blur-md">
        Selectionne une categorie pour afficher des details.
      </aside>
    );
  }

  return (
    <aside className="relative overflow-hidden rounded-[16px] border border-white/10 bg-[#081529]/74 p-3 backdrop-blur-md sm:rounded-[18px] sm:p-4">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selectedSkill.id}
          initial={reduceMotion ? false : { y: 10, scale: 0.992 }}
          animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { y: -8, scale: 0.996 }}
          transition={reduceMotion ? undefined : { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
        >
          <SkillsDetailsContent
            selectedSkill={selectedSkill}
            skillsByCategory={skillsByCategory}
            setSelectedId={setSelectedId}
            accentKey={accentKey}
            mode="desktop"
          />
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}

export function SkillsDetailsContent({
  selectedSkill,
  skillsByCategory,
  setSelectedId,
  accentKey,
  mode = "desktop",
}: {
  selectedSkill: Skill;
  skillsByCategory: Skill[];
  setSelectedId: (id: string) => void;
  accentKey: keyof typeof ACCENT;
  mode?: "desktop" | "mobile";
}) {
  const A = ACCENT[accentKey];
  const reduceMotion = useReducedMotion();
  const compact = mode === "mobile";
  const parsedLevel = parseLevel(selectedSkill.levelLabel);
  const proofs = (selectedSkill.proofs ?? []).slice(0, compact ? 3 : 2);
  const linkedProjects = (selectedSkill.projects ?? []).slice(0, compact ? 3 : 2);
  const proficiencyPercent = (levelIndex(parsedLevel) + 1) * 25;
  const proficiencyTheme = levelBarTheme(parsedLevel);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_10%,rgba(100,190,215,0.14),transparent_36%)]" />

      <div className="relative flex items-start justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/5 sm:h-14 sm:w-14">
            {skillIcon(selectedSkill)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[20px] font-semibold leading-none text-white/90 sm:text-[28px]">{selectedSkill.name}</p>
            <p className="mt-1">
              <span className="font-data text-[28px] font-semibold leading-none text-[#7de5d0] sm:text-[42px]">
                <span className={proficiencyTheme.text}>{selectedSkill.percent}%</span>
              </span>
              <span className="ml-1 text-sm text-white/58">Mastery</span>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className={["rounded-2xl border px-3 py-1 text-xs", A.chip].join(" ")}>{levelLabelEN(parsedLevel)}</span>
          <span className={["rounded-full border px-2 py-0.5 text-[10px]", confidenceClass(selectedSkill.confidence)].join(" ")}>{selectedSkill.confidence}</span>
          <span className={["rounded-full border px-2 py-0.5 text-[10px]", exposureClass(selectedSkill.exposure)].join(" ")}>{selectedSkill.exposure}</span>
        </div>
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2">
        <MetricMini label="Impact" value={selectedSkill.impactScore} suffix="/100" />
        <MetricMini label="Recence" value={selectedSkill.recencyMonths} suffix="m" />
        <MetricMini label="Exp." value={selectedSkill.experienceYears} suffix=" ans" />
        <MetricMini label="Role fit" value={selectedSkill.roles.length} suffix=" roles" />
      </div>

      <div className="relative mt-4">
          <p className="text-[20px] font-semibold leading-none text-white/88 sm:text-[24px]">Proficiency</p>
        <div className="mt-3 h-[4px] w-full rounded-full bg-white/15">
          <motion.div
            key={`${selectedSkill.id}-proficiency`}
            className="h-full rounded-full"
            initial={reduceMotion ? false : { width: 0 }}
            animate={{ width: `${proficiencyPercent}%` }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 0.45,
                    ease: [0.2, 0.8, 0.2, 1],
                  }
            }
            style={{
              backgroundImage: proficiencyTheme.fill,
              boxShadow: proficiencyTheme.glow,
            }}
          />
        </div>
        <div className="font-data mt-2 grid grid-cols-4 gap-2 text-[10px] text-white/55 sm:text-[11px]">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Advanced</span>
          <span className="text-[#8ad2ea]">Expert</span>
        </div>
      </div>

      {!compact && (
        <div className="relative mt-4">
          <p className="text-[20px] font-semibold leading-none text-white/88 sm:text-[24px]">Maitrise x Experience</p>
          <SkillsMatrix skills={skillsByCategory} selectedId={selectedSkill.id} onSelect={setSelectedId} />
        </div>
      )}

      <div className="relative mt-4">
        <p className="text-[20px] font-semibold leading-none text-white/88 sm:text-[24px]">Project proofs</p>
        <div className="mt-2 space-y-2">
          {proofs.length > 0 ? (
            proofs.map((proof) => (
              <div key={proof.id} className="rounded-xl border border-white/10 bg-black/22 px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-white/82">
                  <Play size={11} className="text-[#7ecde8]" />
                  <span className="truncate">{proof.project}</span>
                </div>
                <div className="font-data mt-1 text-xs text-[#a9cfde]">{proof.impact}</div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 px-3 py-2 text-xs text-white/50">Preuves a completer</div>
          )}
        </div>
      </div>

      <div className="relative mt-4">
        <p className="text-[20px] font-semibold leading-none text-white/88 sm:text-[24px]">Use cases</p>
        <div className="mt-2 space-y-2">
          {(selectedSkill.useCases ?? []).slice(0, 2).map((useCase) => (
            <div key={useCase} className="rounded-xl border border-white/10 bg-black/22 px-3 py-2 text-sm text-white/76">
              <div className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#88d4ea]" />
                <span>{useCase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-4">
        <p className="text-[20px] font-semibold leading-none text-white/88 sm:text-[24px]">Technologies / projets lies</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(selectedSkill.tags ?? []).slice(0, compact ? 4 : 6).map((tag) => (
            <span key={tag} className="font-data rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/65">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2 space-y-2">
          {linkedProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects?project=${project.id}`}
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/22 px-3 py-2 text-sm text-white/82 transition hover:border-white/20 hover:bg-black/28"
            >
              <Play size={10} className="text-[#7ecde8]" />
              <span className="truncate">{project.name}</span>
              <span className="ml-auto font-data text-[10px] text-white/55">{project.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function MetricMini({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-2.5 py-2">
      <div className="font-data text-[10px] uppercase tracking-[0.16em] text-white/45">{label}</div>
      <div className="mt-1 font-data text-sm font-semibold text-white/85">
        {value}
        <span className="ml-0.5 text-white/50">{suffix}</span>
      </div>
    </div>
  );
}

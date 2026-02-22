import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, Check, Download, MapPin } from "lucide-react";

import { ACCENT, nodeIcon } from "../config";
import type { FormationNode } from "../types";

type Props = {
  active: FormationNode;
  visibleModules: string[];
  visibleSkills: { label: string; value: number }[];
  showAllModules: boolean;
  showAllSkills: boolean;
  setShowAllModules: (updater: (v: boolean) => boolean) => void;
  setShowAllSkills: (updater: (v: boolean) => boolean) => void;
  reduceMotion: boolean;
};

export function FormationDetailsPanel({
  active,
  visibleModules,
  visibleSkills,
  showAllModules,
  showAllSkills,
  setShowAllModules,
  setShowAllSkills,
  reduceMotion,
}: Props) {
  return (
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
                <p className="mt-1 text-[11px] text-white/56 sm:text-xs">
                  {active.level} - {active.specialization}
                </p>
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
                <button onClick={() => setShowAllModules((v) => !v)} className="text-xs text-cyan-200 transition hover:text-cyan-100">
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
                <button onClick={() => setShowAllSkills((v) => !v)} className="text-xs text-cyan-200 transition hover:text-cyan-100">
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
                      className={["h-full rounded-full bg-gradient-to-r", ACCENT[active.accent].progress].join(" ")}
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
                        project.state === "Production" ? "bg-emerald-300/12 text-emerald-200" : "bg-cyan-300/14 text-cyan-200",
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
  );
}
